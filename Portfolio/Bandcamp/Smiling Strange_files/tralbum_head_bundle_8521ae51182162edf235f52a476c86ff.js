/* concatenation of: cart_head.js, truncate.js, truncate_profiles.js */
var _jsb=(_jsb||[]);_jsb.push({n:"tralbum_head_bundle"});
/* ------------- BEGIN cart_head.js --------------- */;
var Cart = {
    init_data: null,  // filled in later

    writeCart: true,
    
    contentsScriptLoad: function() {
        if (window.ClientID) {
            var params = {
                client_id: ClientID,
                bust: new Date().getTime()
            };
            if ( window.MediaView )
                params.mm = MediaView.mode;
            var url = Url.addQueryParams( siteroot_current + "/cart/contents.js", params );
            document.write('<script type="text/javascript" src="' + url + '"></scr'+'ipt>');
        }  
    },
    
    renderInitial: function(html) {
        if ( Cart.writeCart == false )
            return;

        if ( window.MediaView && MediaView.mode == "phone" ) {

            // new version for pages which have the cart mixed in with menubar elements
            var newNavCartIcon = $( "#menubar #cart-item" )[0];
            if ( newNavCartIcon ) {

                Log.note( "inserting mobile cart after element #menubar" );
                $("#menubar").after(html);
                $("#sidecartHeader").remove();

                // take over the click (navigates away, otherwise)
                var cartLink = $( 'a', newNavCartIcon )[0];
                if ( cartLink ) {
                    Log.note( "hijacking click on cart element '#menubar #cart-item a':" );
                    $(cartLink).on("click", false);  // placeholder until Cart.init
                }

                // update menubar icon
                if (Cart.init_data && Cart.init_data.items && Cart.init_data.items.length) {
                    $("#menubar").removeClass("extended");
                    $("#cart-item").show().find(".cart-number").text( Cart.init_data.items.length );
                }
            } 
            else {
                // TODO: transitional-- other mobile pages like tralbums, but all are moving to the above shortly
                $("#propOpenWrapper").prepend(html);
            }
        } else
            document.write(html);
    }
};;
/* ------------- BEGIN truncate.js --------------- */;
// Truncates multiline text inside an element, adding a caller-defined ellipsis and more/less link.
// Text lines are measured geometrically, making the results very reliable: they are immune to variation
// in font, font size and container width. Supports arbitrary HTML (theoretically), with one significant
// restriction: the presence of block-level descendents will probably result in incorrect results.

// Usage as of August 2012: we're relying on this code in all browsers which support CSSOM, which is a CSS
// extension providing, among other things, an object model for reading the screen geometry of text. See
// the test for Capabilities.hasCSSOM below. For browsers which don't support this (for our purposes, basically 
// IE8), this code short-circuits and we fall back to the older PeekabooText server-side truncation scheme.
// See peekaboo_text.css for rules related to this fallback.

/* global Capabilities, Dom, MediaView, TimeIt */

(function($){
    "use strict";
    
    // global data
    var elapsed = 0;
    var elemCount = 0;
    
    $.fn.bcTruncate = function(opt) {
        
        // for external callers to toggle or set the truncation state
        // Note: currently incompatible with desktop view as it does
        // not swirl around the "more"/"less" text. -- kj
        // 
        function truncateDo( action, elems ) {
            elems = elems.filter( function() { return $(this).data("bcTruncate"); } ).toArray();
    
            $.each( elems, function(i, elem) { 
                var wrapper = $( elem ).find(".bcTruncateMore");
                var ellipsis = $( elem ).find(".bcTruncateEllipsis");
                if ( !wrapper ) {
                    Log.debug( "truncate more wrapper not found" );
                    return;
                }

                if ( action == "toggle" ) {
                    action = ( wrapper.css( "display" ) == "none" ) ? "expand" : "collapse";
                }
        
                if ( action == "expand" ) {
                    $( wrapper ).show();
                    $( ellipsis ).hide();
                    // more.find("a").html(opt.lessHTML);
                    Log.debug("bcTruncate: external expand " + ellipsis.html(), elem);
                } else {
                    $( wrapper ).hide();
                    $( ellipsis ).show();
                    // more.find("a").html(opt.moreHTML);
                    // No scrollToElement call here-- the caller might want to reveal a container
                    Log.debug("bcTruncate: external collapse", elem);
                }
            } );
        }

        if ( typeof opt == "string" ) {
            truncateDo( opt, this );
            return this;
        }
        
        var isPhone = window.MediaView && MediaView.mode == "phone";
        
        opt = opt || {};
        opt = $.extend( {
            truncate:     true,  // used to disable truncation
            click:        true,  // caller can turn off click handling (e.g. handle it themselves)
            textHints:    true,  // show hint text/link to expand
            splitTrigger: 16,    // text must exceed this number of lines before truncation occurs
            splitDisplay: 12,    // when truncation occurs, text is truncated to this many lines
            lastLineSlop: null,  // move the truncation point back at least this many characters; defaults to number of chars in the ellipsis and more/less link
            ellipsisHTML: "<span class='bcTruncateEllipsis'>...</span>",
            moreHTML: isPhone ? "see&nbsp;more" : "more",
            lessHTML: isPhone ? "see&nbsp;less" : "less"
        }, opt );
        
        if (!opt.truncate)
            return;
        
        if (!window.Capabilities || !Capabilities.hasCSSOM()) {
            Log.info("bcTruncate: browser doesn't have Range and ClientRect support; aborting");
            return;
        }
        
        var elems = this.filter( function() { return !$(this).data("bcTruncate"); } ).toArray(),
            deferredElems = [],
            deferredCount = 0,
            range = document.createRange();
        
        function textNodeIterator( startNode, fn, constrained, backward ) {
            var node = startNode,
                stopNode = constrained ? node : document,
                sibling = backward ? "previousSibling" : "nextSibling",
                child = backward ? "lastChild" : "firstChild";
            while (node) {
                if ( node.nodeType == 1 ) { // ELEMENT_NODE
                    var display = $(node).css("display");
                    // to reduce complexity, we completely ignore block and inline-block descendents
                    if ( display == "inline" || (node === startNode) ) {
                        if ( node[child] ) {
                            node = node[child];
                            continue;
                        }
                    }
                }
                else if ( node.nodeType == 3 ) { // TEXT_NODE
                    var result = fn(node);
                    if ( result === false )
                        return;
                }
                if ( node === stopNode )
                    return;
                while ( !node[sibling] ) {
                    node = node.parentNode;
                    if ( node === stopNode )
                        return;
                }
                node = node[sibling];
            }
        }
        
        function charIterator( node, offset, fn, backward ) {
            var str, len, c,
                loopTest = backward ? function() { return c >= 0; } : function() { return c < len; },
                loopNext = backward ? function() { c--; } : function() { c++; };
            textNodeIterator( node, function(node) {
                str = node.nodeValue;
                len = str.length;
                c = (offset !== null) ? offset : (backward ? len - 1 : 0);
                for ( ; loopTest(); loopNext() ) {
                    var result = fn( str.charAt(c), node, c );
                    if ( result === false ) return result;
                }
                offset = null;
            }, false, backward );
        }
        
        // Iterates over the geometric lines of text in an element or text node.
        // Each iteration yields two parameters: the index of the line, and an array of objects,
        // each representing one rect in the line and containing the following properties:
        // - rect: the ClientRect
        // - node: the text node associated with this rect
        // - nodeRects: a collection of all rects associated with this node (whether part of this line or not)
        // Useful stuff to remember:
        // - a line is made up of one or more rects
        // - each rect belongs to one, and only one, text node
        // - a text node can cross line boundaries, and therefore can associate with multiple rects
        function lineIterator( root, fn ) {
            var lineIndex = 0, line = [], prevRect = null, result = null;
            textNodeIterator( root, function(node) {
                range.selectNode(node);
                var rects = range.getClientRects();
                $.each( rects, function( i, rect ) {
                    if ( prevRect && !isSameLine(rect, prevRect) ) {
                        result = fn( lineIndex, line );
                        lineIndex++;
                        line = [];
                    }
                    if ( result !== false ) {
                        line.push( { rect:rect, node:node, nodeRects:rects } );
                        if (rect.height > 0) // in IE9, zero-height rects can overlap two consecutive lines and mess us up
                            prevRect = rect;
                    }
                    return result; // if false, cancel rect iteration
                } );
                return result; // if false, cancel node iteration
            }, true );
            if ( line.length )
                fn( lineIndex, line );
        }
        
        // Given a geometric line array (from lineIterator), returns the text node and approximate
        // character offset of the first character in the line. The performance of this approach
        // scales better than the brute-force (and more accurate) option of measuring the coordinates 
        // of each character in a text node.
        function lineToFirstChar( line ) {
            var first = line[0], rect = first.rect, node = first.node, nodeRects = first.nodeRects,
                nodeWidthPx = 0, priorLinesWidthPx = 0, foundRect = false;
            $.each( nodeRects, function(i, thisRect) { 
                nodeWidthPx += thisRect.width;
                if ( !foundRect ) {
                    if ( thisRect !== rect )
                        priorLinesWidthPx += thisRect.width;
                    else
                        foundRect = true;
                }
            } );
            
            // To get a reliable count of rendered characters in this text node, we need to collapse
            // adjacent whitespace characters, just like the browser does when rendering. This character
            // count might not be exact, but it's close enough for our purposes.
            var charCount = node.nodeValue.replace(/\s{2,}/g, ' ').length;
            
            // Estimate the character offset of the the first character on this line by converting 
            // from pixels to characters (using the average pixels-per-char for this node). Note
            // that all characters inside a text node should be rendered at the same font size (with
            // the possible, untested exception of CSS pseudo-elements).
            var offset = Math.floor( priorLinesWidthPx / (nodeWidthPx / charCount) );
            //Log.debug( "bcTruncate - lineToFirstChar", "node beginning", node.nodeValue.substr(0,20), "charCount", charCount, "priorLinesWidthPx", priorLinesWidthPx, "nodeWidthPx", nodeWidthPx, "offset", offset );
            return [node, offset];
        }
        
        function isSameLine( rectA, rectB ) {
            var result = ( rectA.top >= rectB.top && rectA.bottom <= rectB.bottom ) || 
                         ( rectB.top >= rectA.top && rectB.bottom <= rectA.bottom );
            //Log.debug( "bcTruncate - isSameLine", result, rectB.top, rectB.bottom, rectA.top, rectA .bottom );
            return result;
        }
        
        function backupToSplitPoint( node, offset, minDistance, maxDistance ) {
            var hardLoc, softLoc, distance = 0;
            charIterator( node, offset, function(chr, node, offset) {
                if ( distance > maxDistance )
                    return false; // cancel iteration
                if ( distance == minDistance )
                    hardLoc = [node, offset];
                if ( distance >= minDistance ) {
                    // Scan back to the last consecutive space or other word terminator.
                    // Note that to improve accuracy for non-western languages, I'm starting to
                    // include specific Unicode punctuation characters on an ad hoc basis.
                    // 0x3001: ideographic comma
                    // 0x3002: ideographic full stop
                    var isWordTerminator = (chr.search(/[\s\-\.,;\u3001\u3002]/) != -1);
                    if ( isWordTerminator )
                        softLoc = [node, offset];
                    else if ( softLoc )
                        return false;
                }
                distance++;
            }, true );
            return softLoc || hardLoc;
        }
        
        function surroundRange( newParent, range ) {
            newParent.appendChild( range.extractContents() );
            range.insertNode(newParent);
        }
        
        function truncate( root ) {
            var lines = [];
            lineIterator( root, function( lineIndex, line ) {
                lines.push( line );
                // $.each( line, function(i, p) { drawRect( root, p.rect, lineIndex+1 ); } ); // uncomment to outline lines visually, for debugging
                
                if ( lineIndex == opt.splitTrigger ) {
                    var wrapper = $('<span class="bcTruncateMore" style="display:none">'),
                        more = $( opt.textHints ? '<span>&nbsp; <a>' + opt.moreHTML + '</a></span>' : '' ),
                        ellipsis = $('<span>' + opt.ellipsisHTML + '</span>'),
                        loc = lineToFirstChar( lines[opt.splitDisplay] ),
                        lastLineSlop = opt.lastLineSlop !== null ? opt.lastLineSlop :
                            more.text().length + ellipsis.text().length + 2; // 2: fudge factor, to be safe
                    loc = backupToSplitPoint( loc[0], loc[1], lastLineSlop, 100 );
                    if ( loc ) {
                        range.selectNode( root.lastChild );
                        range.setStart( loc[0], loc[1] );
                        surroundRange( wrapper.get(0), range );
                        wrapper.before( ellipsis ).after( more );
                        
                        var target;
                        
                        if ( more.find("a").length > 0 ) {
                            // click/tap on the link
                            target = more;
                        } else {
                            // click/tap on the text (certain mobile cases with no link text)
                            target = $( root );
                        }

                        if ( opt.click ) {
                            target.toggle( function() {
                                $([wrapper, ellipsis]).toggle();
                                more.find("a").html(opt.lessHTML);
                                Log.debug("bcTruncate: expand", root);
                            }, function() {
                                $([wrapper, ellipsis]).toggle();
                                more.find("a").html(opt.moreHTML);
                                if (isPhone)
                                    Dom.scrollToElement(root, null, true); // otherwise we tend to get lost vertically on collapse
                                Log.debug("bcTruncate: collapse", root);
                            } );
                        }
                    }
                    return false; // stop iteration
                }
            } );
        }
        
        function doWork(elem, deferred) {
            var msec = TimeIt( function() { truncate(elem); } );
            elapsed += msec;
            $(elem).data("bcTruncate", true);
            Log.debug("bcTruncate " + (++elemCount) + " (" + (deferred ? "deferred; " : "") + msec + "ms; total: " + elapsed +"ms): ", elem);
        }
        
        function finishWork() {
            range.detach();
            range = null;
        }
        
        // uncomment to outline lines visually, for debugging
        //function drawRect(root, rect, contents, color) {
        //    root = $(root);
        //    var pos = root.offsetParent().offset(),
        //        top = rect.top - pos.top + (document.documentElement.scrollTop || document.body.scrollTop),
        //        left = rect.left - pos.left + (document.documentElement.scrollLeft || document.body.scrollLeft),
        //        width = rect.width - 2, // for border
        //        height = rect.height - 2,
        //        color = color || "red";
        //    $('<div></div>').text(contents).
        //        css( { position:"absolute", top:top, left:left, height:height, width:width, border:"1px solid " + color, color: color, textIndent: -17 } ).
        //        prependTo(root);            
        //}
        
        $.each( elems, function(i, elem) { 
            // limit the time we'll spend doing truncation work before domready, to help protect page load performance
            if ( elapsed > 25 )
                deferredElems.push(elem);
            else
                doWork(elem);
        } );
        deferredCount = deferredElems.length;
        if (deferredCount) {
            $(document).ready( function() {
                var tid = setInterval( function() {
                    var elem = deferredElems.shift();
                    doWork(elem, true);
                    if (!deferredElems.length) {
                        clearInterval(tid);
                        finishWork();
                    }
                }, 0 );
            } );
        } 
        else
            finishWork();

        return this;
    };
    
})(jQuery);

;
/* ------------- BEGIN truncate_profiles.js --------------- */;
var TruncateProfile = {
        
    buyItem: {
        desktop: {}, // use defaults
        phone: {
            splitTrigger: 8,
            splitDisplay: 5
        }
    },
    
    bio: {
        desktop: {
            splitTrigger: 12,
            splitDisplay: 7
        },
        phone: {
            splitTrigger: 10,
            splitDisplay: 7
        }
    },
    
    nmm: { // non-music merch
        desktop: {
            splitTrigger: 18,
            splitDisplay: 14
        },
        phone: {
            splitTrigger: 10,
            splitDisplay: 7
        }
    },
    
    tralbum_long: { // tralbum 'about', credits, lyrics
        desktop: {
            truncate: false  // no truncation on desktop
        },
        phone: {
            splitTrigger: 14,
            splitDisplay: 10
        }
    },
    
    fan_bio: {
        desktop: {
            truncate: false  // no truncation on desktop
        },
        phone: {
            textHints: false,
            splitTrigger: 5,
            splitDisplay: 3
        }
    },
    
    fan_why: {
        desktop: {
            truncate: false  // no truncation on desktop
        },
        phone: {
            textHints: false,
            click: false,
            splitTrigger: 6,
            splitDisplay: 3
        }
    },
    
    fan_why_mini: {
        desktop: {
            splitTrigger: 2,
            splitDisplay: 2
        },
        phone: {
            splitTrigger: 2,
            splitDisplay: 2
        }
    },

    subscribe: {
        desktop: {
            splitTrigger: 10,
            splitDisplay: 6
        },
        phone: {
            splitTrigger: 4,
            splitDisplay: 4
        }
    },
    
    get: function(type) {
        var mode = (window.MediaView && MediaView.mode) || "desktop";
        return this[type][mode];
    }
};
;
_jsb[_jsb.length-1].c=1;