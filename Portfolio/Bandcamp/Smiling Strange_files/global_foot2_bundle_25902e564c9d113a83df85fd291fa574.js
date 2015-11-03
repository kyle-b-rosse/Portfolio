/* concatenation of: utils.js, identities.js, menubar.js, jquery.event.move.js, popup_image.js, crumb.js, form.js, cookie_comm.js, playlist.js, title_play_indicator.js, playerviews.js, image_utils.js, templ.js, share_external.js, social_controls.js, footer.js, webapp_selector.js, nudialog.js, tpl_global_templates, contact.js, tpl_contact, val_all */
var _jsb=(_jsb||[]);_jsb.push({n:"global_foot2_bundle"});
/* ------------- BEGIN utils.js --------------- */;
// Copyright 2008 Bandcamp, Inc. All rights reserved.


/////////////////////////////////////////////////////////////
/// Utility APIs
///

var Dom = {
    
    _init: function( initElem ) {
        initElem = elt( initElem );
        if ( !initElem ) return false;

        
        // Do some one-time-only initialization to reduce the amount of
        // of logical branching at runtime.
        
        if ( !Y.lang.isUndefined( initElem.textContent ) ) {
            // W3C
            Dom.getText = function( elem ) { 
                elem = elt( elem );
                return elem ? elem.textContent : "";
            };
            Dom.setText = function( elem, text ) { 
                elem = elt( elem );
                if ( elem ) elem.textContent = text; 
            }; 
        }  
        else {
            // IE proprietary
            Dom.getText = function( elem ) { 
                elem = elt( elem );
                return elem ? elem.innerText : "";
            };
            Dom.setText = function( elem, text ) { 
                elem = elt( elem );
                if ( elem ) elem.innerText = text; 
            };
        }
        
        if ( Y.util.Dom.getStyle( initElem, "userSelect" ) ) {
            // proposed CSS3
            Dom.setUnselectable = function( elem ) {
                elem = elt( elem );
                if ( elem ) elem.style.userSelect = "none";
            };  
        }
        else if ( Y.util.Dom.getStyle( initElem, "MozUserSelect" ) ) {
            // Firefox 2
            Dom.setUnselectable = function( elem ) {
                // It appears that this cannot be undone by setting back
                // to "normal".
                elem = elt( elem );
                if ( elem ) elem.style.MozUserSelect = "none";
            }; 
        }
        else if ( typeof initElem.style.WebkitUserSelect !== 'undefined' ) {
            // Safari, Chrome
            Dom.setUnselectable = function( elem ) {
                elem = elt( elem );
                if ( elem ) elem.style.WebkitUserSelect = "none";
            };
        }
        else {
            // IE proprietary
            Dom.setUnselectable = function( elem ) {
                // Note that the unselectable property doesn't inherit,
                // so descendents of this one could still be selectable. 
                // If this turns out to be a problem, we could recurse here. 
                elem = elt( elem );
                if ( elem ) elem.unselectable = "on";
            };
        }
        
        initElem = null; // free the elem from closures
        return true;
    },
    
    // Returns the text content contained by the element.
    getText: function( elem ) {
        if ( Dom._init( elem )) // init lazily; this will overwrite us
            return Dom.getText( elem );
        else
            return "";
    },
    
    // Removes all children and adds a single text node containing
    // the specified text.
    setText: function( elem, text ) {
        if ( Dom._init( elem )) // init lazily; this will overwrite us
            Dom.setText( elem, text );
    },
    
    // Special handling for radio buttons and checkboxes, otherwise just returns formElem.value
    // radios: returns value of selected radio in the group
    // checkboxes: returns the value of the checkbox, only if it is currently checked, else null
    //
    // if you're passing in a string, it needs to be an ID, not a NAME (esp. important for radios)
    getValue: function( formElem ) {
        formElem = elt( formElem );

        switch ( formElem.type ) {
        case "checkbox":
            return ( formElem.checked ? formElem.value : null );

        case "radio":
            var radios = document.getElementsByName( formElem.name );
            for( var i=0, n=radios.length; i<n; i++ ) {
                if ( radios[i].checked ) {
                    return radios[i].value;
                }
            }
            return null; // none selected
        }

        return formElem.value;
    },
    
    // Mark an element as permanently unselectable.
    setUnselectable: function( elem ) {
        if ( Dom._init( elem )) // init lazily; this will overwrite us
            Dom.setUnselectable( elem );        
    },
    
    // For browsers which don't support document.activeElement (like Firefox
    // versions <= 2), simulate it.
    initActiveElement: function() {
        
        var noActiveElement = false;
        try {
            noActiveElement = Y.lang.isUndefined( document.activeElement );
        }
        catch (e) {
            // IE throws exceptions if we access document.activeElement too early
            return;
        }
        
        if ( noActiveElement && document.addEventListener ) {
            
            function handleFocus( event ) {
                var node = Y.util.Event.getTarget( event );
                if ( node )
                    document.activeElement = node;                    
            }
            
            function handleBlur( event ) {
                var node = Y.util.Event.getTarget( event );
                if ( node == document.activeElement )
                    document.activeElement = null;
            }

            document.activeElement = null; // guarantee we don't run again
            
            // The standard DOM focus/blur events don't bubble out of
            // form elements, so we can't listen for them at the document 
            // level using bubbling. We could instead listen for 
            // DOMFocusIn/DOMFocusOut, but at least Firefox <= 2 doesn't 
            // support those. Instead, we listen for focus/blur during the
            // capture stage instead of the bubble stage (the 'true' param
            // in these method calls). Note that we can't use Y.util.Event 
            // here, as their API doesn't expose event capturing.
            document.addEventListener( "focus", handleFocus, true );
            
            // Why listen for blur at all? Because other event handlers might
            // be listening for blur, which fires before focus. Unless we 
            // update activeElement during blur, those other handlers might
            // get an activeElement which is in effect obsolete.
            document.addEventListener( "blur", handleBlur, true );
        }  
    },
    
    // The element.focus method can fail because the element is hidden (IE)
    // or for esoteric reasons I've never understood (Firefox).
    focus: function( elem ) {
        elem = elt( elem );
        try {
            elem.focus();
        }
        catch (e) {}
    },

    // Not sure if the same is true of element.select, but let's be careful.
    select: function( elem, doFocus ) {
        elem = elt( elem );
        try {
            elem.select();
            if ( doFocus )
                elem.focus();
        }
        catch (e) {}
    },    
    
    // Similar to Y.util.Dom.getDocumentHeight, but corrects for a problem I
    // see in FF in which the document's scrollHeight value will not shrink after
    // DHTML updates result in a shorter page. OffsetHeight seems not to have
    // that problem.
    getDocumentHeight: function() {
        return document.documentElement[ Browser.type == "gecko" ? "offsetHeight" : "scrollHeight" ];
    },
    
    // Copy one or more style values from srcElem to destElem.
    copyStyles : function( srcElem, destElem /* prop1, prop2, ... */ ) {
        
        var destStyle = destElem.style;
        var getStyle = Y.util.Dom.getStyle;
        for ( var i=2; i < arguments.length; i++ ) {
            var propName = arguments[i];
            destStyle[propName] = getStyle( srcElem, propName );
        }
    },

    // Replaces the given elem with the wrapper, making elem a child of wrapper.
    // elem: element ref or id
    // wrapperElem: element ref, or tagName (not id) to create a new element
    // returns: the wrapperElem
    wrapElem: function( elem, wrapperElem ) {
        if ( Y.lang.isString( wrapperElem ) )
            wrapperElem = document.createElement( wrapperElem );
        Y.util.Dom.insertBefore( wrapperElem, elem ).appendChild( elem );
        return wrapperElem;
    },
    
    // Replaces one element with another.
    replaceElem: function( oldElem, newElem ) {
        
        Y.util.Dom.insertAfter( newElem, oldElem );
        oldElem.parentNode.removeChild( oldElem );         
    },

	removeElem: function( elem ) {
		elem.parentNode.removeChild(elem);
	},


    // We pass "null" through (including undefined)-- to clear the value
    // and return to whatever the value for the current CSS.
    // For false/0, we map to "none"; for true/non-zero we map to "block",
    // except for SPANs which map to "inline".
    // Pass "inline" if that's what you want in other cases.
    //
    display: function( elemOrId, displayValue ) {

        if ( Y.lang.isArray ( elemOrId )) {
            
            return Y.util.Dom.batch( elemOrId,
                                     function ( el ) {
                                        this.display( el, displayValue );
                                     },
                                     this,
                                     true );
        }


        elemOrId = Y.util.Dom.get( elemOrId );
        if ( !elemOrId ) return;

        if ( displayValue == undefined ) // null/undefined
            displayValue = "";
        else if ( displayValue == false ) // false/0
            displayValue = "none";
        else if ( displayValue && typeof displayValue != "string" ) // true-ish, but not a string
            displayValue = ( elemOrId.tagName == "SPAN" || elemOrId.tagName == "INPUT" ) ? "inline" : "block";
        
        if ( Browser.type != "ie" &&
                ( displayValue == "block" || displayValue == "inline" )) {

            switch ( elemOrId.tagName.toLowerCase() ) {
            case "tr": displayValue = "table-row"; break;
            case "td": displayValue = "table-cell"; break;
            }
        }

        Y.util.Dom.setStyle( elemOrId, "display", displayValue );

        //Log.debug( Y.util.Dom.get( elemOrId ).id + " display: " + Y.util.Dom.get( elemOrId ).style.display );
    },

    disable: function( elemOrId, disableValue ) {

        if ( Y.lang.isArray ( elemOrId )) {
            
            return Y.util.Dom.batch( elemOrId,
                                     function ( el ) {
                                        this.disable( el, disableValue );
                                     },
                                     this,
                                     true );
        }

        var el = elt( elemOrId );
        if ( el ) {
            el.disabled = disableValue;
        }
    },

    // Find the first ancestor (inclusive of self) with the given class
    //
    // See Y.util.Dom.getElementsByClassName( className, tag, root, apply )
    // for getting children
    //
    getParentByClassName: function( elemOrId, className ) {
        var D = Y.util.Dom;

        var el = elt( elemOrId );
        while( el ) {
            if( D.hasClass( el, className ))
                return el;
            el = el.parentNode; 
        }
        
        return el;
    },

    // Find the first cousin (any element with shared ancestor, inclusive of self)
    // with the given cousin-class, under the given parent-class.
    //
    getCousinByClassName: function( elemOrId, parentClassName, cousinClassName ) {
        var el = this.getParentByClassName( elemOrId, parentClassName );
        if ( !el ) return null;

        return Y.util.Dom.getElementsByClassName( cousinClassName, null, el )[0];
    },

    // This has one purpose: scroll the body or document element vertically to show
    // the given element on screen, with some clearance on top (negative).
    // If you want it to be more general, have at it!
    //
    scrollToElement: function ( revealElt, clearance, gently ) {

        // support for older, non-jquery-aware callers
        if ( revealElt.charAt && revealElt.charAt(0) != "#" )
            revealElt = "#" + revealElt;
        
        revealElt = $( revealElt );
        if ( !revealElt.length ) return;
        
        // Expose all parents.  Assumes hidden elements are done so with inline styles,
        // not CSS, and they can be shown be clearing the inline display style.
        revealElt.parents().each( function( i, domElem ) {
            if ( domElem.style && domElem.style.display == "none" )
                Dom.display( domElem );
        } );

        // was only testing document.documentElement.scrollTop != null here,
        // but on Safari that is 0 (non-null), and the body controls the scrolling
        // UPDATE: have to browser-branch here, as far as I can tell -- kj
        var animElt = Browser.type == "webkit" ? document.body :
                      (( document.documentElement && document.documentElement.scrollTop != null ) ?
                       document.documentElement : document.body );

        if ( clearance == null ) clearance = -10

        // Logic for "gently": don't scroll elements that are fully visible,
        // and if speced in the params, only scroll to show it whole, not
        // to the top of the view.  Jarring in most mobile scenarios, otherwise.
        // Note: Webkit has a "scrollIntoViewIfNeeded"... though their
        // scrollIntoView is lame (scrolls too much in some cases). --kj 
        if ( gently ) {
            var viewHeight = document.documentElement.clientHeight,
                eltHeight = revealElt.height();
            
            var viewTop = animElt.scrollTop,
                viewBottom = animElt.scrollTop + viewHeight,
                eltTop = revealElt.offset().top,
                eltBottom = revealElt.offset().top + eltHeight;

            if ( eltTop >= viewTop ) {
                if ( eltBottom < viewBottom ) {
                    // already fully visible-- don't scroll at all
                    return;
                }
                // item is fully or partially offscreen to the bottom; scroll enough to show the full element:
                clearance += eltBottom - viewHeight;
            } else {
                // item above the view-- simple scroll-to-top
                clearance += eltTop;
            }
        } else {
            // simple scroll-to-top
            clearance += revealElt.offset().top;
        }

        $(animElt).animate( {"scrollTop": clearance}, 500 );
    },
    
    // Look for the parameter in the current location, treat it as an element id to scroll to.
    // param defaults to 'goto'.  This survives round-tripping through login, unlike # url anchors
    scrollToParamElt: function( id_param ) {
        var e;
        id_param = id_param || "goto";

        try {
            // ignore if we came in with a #anchor on the url
            if ( window.location.search && window.location.href.indexOf( "#" ) == -1 ) {
                params = window.location.search.slice(1).split("&");
                for ( i=0, n=params.length; i<n; i++ ) {
                    param = params[i].split("=");
                    if ( param[0] == id_param && param[1] ) {
                        // Typically called during onDOMReady-- give some breathing room
                        Y.lang.later( 10, window, function(){ Dom.scrollToElement( elt( param[1] ) ); } );
                        break;
                    }
                }
            }
        } catch( e ) { }
    },
    
    // Disable (DOM property 'disable') all 'tagName's in the given element tree.
    // Useful along with enableControls for taking items in and out of the validation
    // process at submit time.
    // - tag can be a string or array of strings and defaults to form elements if missing
    disableControls: function ( rootElt, tag ) {
        tag = tag || [ "INPUT", "TEXTAREA", "SELECT", "BUTTON" ];

        if ( Y.lang.isArray( tag )) {
            for ( var i=0, n=tag.length; i<n; ++i ) {
                this.disableControls( rootElt, tag[i] )
            }
            return;
        }

        if ( Y.lang.isArray( rootElt )) {
            for ( var i=0, n=rootElt.length; i<n; ++i ) {
                this.disableControls( rootElt[i], tag )
            }
            return;
        }

        rootElt = elt( rootElt );
        if ( !rootElt ) return;

        var e, elts = rootElt.getElementsByTagName( tag );

        for ( var i=0, n=elts.length; i<n; ++i ) {
            try { elts[i].disabled = true; } catch ( e ) { }
        }
    },
    
    // Enable (DOM property 'disable') all 'tagName's in the given element tree.
    // Useful along with enableControls for taking items in and out of the validation
    // process at submit time.
    // - tag can be a string or array of strings and defaults to form elements if missing
    enableControls: function ( rootElt, tag ) {
        tag = tag || [ "INPUT", "TEXTAREA", "SELECT", "BUTTON" ];

        if ( Y.lang.isArray( tag )) {
            for ( var i=0, n=tag.length; i<n; ++i ) {
                this.enableControls( rootElt, tag[i] )
            }
            return;
        }

        if ( Y.lang.isArray( rootElt )) {
            for ( var i=0, n=rootElt.length; i<n; ++i ) {
                this.enableControls( rootElt[i], tag )
            }
            return;
        }

        rootElt = elt( rootElt );
        if ( !rootElt ) return;

        var e, elts = rootElt.getElementsByTagName( tag );

        for ( var i=0, n=elts.length; i<n; ++i ) {
            try { elts[i].disabled = false; } catch ( e ) { }
        }
    },

    // Assume a parent of the given class, with an ID ending
    // in an integer.  Returns the parsed integer.  Operates on
    // the given element directly if className is missing.
    //
    elementToIndex: function( element, className ) {
        element = className ? Dom.getParentByClassName( element, className ) : element;
        if ( !element || !element.id ) return null;
        
        var match = element.id.match( /\w(\d+)$/ );
        if ( !match || !match[1] ) return null;

        return parseInt( match[1] );
    },

    hideEverythingStack: [],
    
    // Generalized from the original Dialog version.  Pass in the elts. you want explicitly visible.
    // You can stack these calls (e.g. for nested dialogs). The api is strict, as it allows nesting--
    // to prevent unbalanced calls, you have to pass in at least one of the same elts at unhide time.  --kj
    // 
    // Android Browser, at least in OS versions 2.3 and below, has what appears to be a family of related 
    // bugs with layered elements. In general, tapping on something which is layered above another
    // tappable thing will sometimes result in no tap action, or the tap going to the wrong element
    // (flashback to the bad old days...). In the case I saw, a <select> layered above a link, button, etc. 
    // couldn't be activated. Several possible workarounds are detailed here:
    //    http://code.google.com/p/android/issues/detail?id=6721
    // but I found the only reliable solution was to hide every active element which could possibly 
    // interfere. The brute-force implementation here is obviously limited to dialogs, although the 
    // problem will likely show up in other scenarios. - sdg 2012.05.23
    // 
    hideEverythingThanksAndroid: function( /* pass elts to make visible over the body */ ) {
        if ( Browser.make == "androidbrowser" ) {
            var args = Array.prototype.slice.call( arguments );
            if ( args.length == 0 )
                return;
            
            var devlog = $( '.logView' )[0];
            if ( devlog ) args.push( devlog );
            // Log.note( "hide params: " + args.length );
            
            // make the current head inherit from the body:
            $( this.hideEverythingStack[0] ).css( "visibility", "inherit" );

            // show the items after hiding the old ones, to handle dupes e.g. the floating dev log
            $( args ).css( "visibility", "visible" );
            $( args ).each( function(i, elt) {
                    // Log.note( "hide: " + [ i, elt.tagName, elt.className, elt.id || 'no id', elt.style.visibility ].join( ', ' ) ); 
                } );

            this.hideEverythingStack.unshift( args );

            // Note that if any other element has an explicit visibility:visible, then this won't hide it:
            $( document.body ).css( "visibility", "hidden" );
        }
    },
    
    unhideEverythingThanksAndroid: function( /* pass in at least one of the elts you passed in at hide time */ ) {
        if ( Browser.make == "androidbrowser" ) {
            var args = Array.prototype.slice.call( arguments );
            var top = this.hideEverythingStack[0];
            var found_one = false;
            if ( top && top.length > 0 ) {
                $( args ).each( function(i, elti) {
                    $( top ).each( function(j, eltj) {
                            found_one = found_one || ( elti == eltj );
                        } );
                    } );
            }
 
            if ( !found_one ) {
                Log.error( "Elt not found unhiding for android fixup" );
                return;
            }
 
            // discard top item-- caller is responsible for clean-up
            this.hideEverythingStack.shift();
            
            // show the next item down, or the body:
            elems = this.hideEverythingStack[0] || document.body;
            $( elems ).css( "visibility", "visible" );
            $( elems ).each( function(i, elt) {
                    // Log.note( "unhide: " + [ i, elt.tagName, elt.className, elt.id || 'no id', elt.style.visibility ].join( ', ' ) ); 
                } );

            // Log.note( "unhide params: " + $( elems ).length );
        }
    },

    // When hijacking <a>'s for dthml-age, this will suppress some annoying
    // mobile-Safari-only behavior: the browser drops down the location field briefly,
    // even though the navigation is being prevented.  User can still press-hold to
    // open the link in a new tab.
    // 
    // Pass in your click handler, to ensure it's called after we restore the href.
    //
    hackLinkClicksThanksSafari: function( elts, clickHandler ) {
        elts = $( elts );

        if ( Browser.platform != "iphone" ) {
            if ( clickHandler )
                elts.on("click", clickHandler);
            return;
        }

        elts.on( {
            // on touchend, before the click event, mangle the href
            "touchend": function( ev ) {
                var href = this.getAttribute('href');
                if ( href && href.substring(0,1) != '#' ) {
                    this.setAttribute('href','#' + href);
                }
            },

            // restore it on click then call the handler
            "click": function( ev ) {
                var href = this.getAttribute('href');
                if ( href && href.substring(0,1) == '#' ) {
                    this.setAttribute('href',href.substring(1));
                }

                if ( clickHandler )
                    return clickHandler.apply( this, arguments );  // handler can 'return false'
            }
        } );
    },

    // Check if an item is visible in the viewport
    inViewport: function(el) {
        var top = el.offsetTop,
            left = el.offsetLeft,
            width = el.offsetWidth,
            height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    },

    xxx: null
};


/////////////////////////////////////////////////////////////
/// Text field hints
///

var FieldHints = {
        
    WRAPPER_CLASS: "fieldHintWrapper",
    ACTIVE_CLASS: "fieldHintActive",
    HINT_CLASS: "fieldHint",
    
    // On browsers that support it, we just set the placeholder attribute.
    NATIVE_PLACEHOLDER: ('placeholder' in document.createElement('input')),
    
    // By default we get the hint text from the title attribute. Set this to false for templates that use placeholder.
    USE_TITLE_ATTR: true,
    
    // Finds all text fields under the rootNode and, if appropriate, 
    // displays hints in those fields. Call this once during page load, and
    // again whenever new fields are added to the document.
    init: function( rootNode ) {

        var FH = FieldHints;
        Iter.each( FH._getFieldElements( rootNode ), function( elem ) {
            if ( FH._getHintText(elem) ) {
                FH._setupHint( elem );
                FH._showHint( elem );
            }
        });
    },
    
    _getFieldElements: function( rootNode ) {
		rootNode = rootNode ? elt(rootNode) : null;
        rootNode = rootNode || document;
        var inputElems = rootNode.getElementsByTagName( "INPUT" );
        inputElems = Iter.findAll( inputElems, function( elem ) {
            return elem.type == "text";
        });
        var textareaElems = rootNode.getElementsByTagName( "TEXTAREA" );
        return inputElems.concat( Iter.collect( textareaElems ) );
    },
    
    _handleFocus: function( event ) {
        FieldHints._hideHint( this );
    },
    
    _handleBlur: function( event ) {
        FieldHints._showHint( this );
    },
    
    _handleHintClick: function( event ) {
        var elem = Y.util.Dom.getNextSibling( this );
        $assert( ( elem.tagName == "INPUT" && elem.type == "text" ) ||
                 elem.tagName == "TEXTAREA" );
        // Sometimes -- in certain fields -- IE7 refuses to keep focus
        // in the field if we call directly; a timeout appears to fix this:
        setTimeout( function() { Dom.focus( elem ); }, 10 );
    },

    updateHint : function( elem ) {
        elem = elt( elem );
        if ( !elem ) return;

        var wrapperEl = elem.parentNode;
        if ( Y.util.Dom.hasClass( wrapperEl, FieldHints.WRAPPER_CLASS ) )
            // already set up, just update title text
            Dom.setText(elem._fieldhint, this._getHintText(elem));
        else
            FieldHints._setupHint( elem );
    },
    
    _setupHint: function( elem ) {
    
        if (this.NATIVE_PLACEHOLDER) {
            if (this.USE_TITLE_ATTR) {
                elem.placeholder = elem.title;
            }
            return;
        }
        
        // The basic strategy here is to display the hint by overlaying
        // an element above the input field. This is a modified version
        // of the technique detailed in the following article:
        //
        //   http://www.alistapart.com/articles/makingcompactformsmoreaccessible
        //
        // In that case the author uses <label> elements to hold the hint text.
        // That makes sense if the hint is in effect the "name" of the field, but
        // in our design the hint is more often an example or supplementary info. 
        // By not relying on <label>s to build the hints, we remain free to
        // provide field labels whenever appropriate.
        
        var wrapperEl = elem.parentNode;
        if ( Y.util.Dom.hasClass( wrapperEl, FieldHints.WRAPPER_CLASS ) )
            return; // already set up
        
        // If the parent is already relatively positioned, repurpose it as the 
        // hint wrapper. This makes us compatible with the YUI autocomplete 
        // DOM structure.
        if ( Y.util.Dom.getStyle( wrapperEl, "position" ) != "relative" ) {
			// have to wrap textarea in a div b/c of valgeir's safari bug (where auto-adjusting textarea height caused
			// greek characters to appear). side-effect is that we won't be able to have inline textareas.
			var wrapperTagName = (elem.tagName == "TEXTAREA") ? "div" : "span";
            wrapperEl = Dom.wrapElem( elem, wrapperTagName );
		}
        Y.util.Dom.addClass( wrapperEl, FieldHints.WRAPPER_CLASS );
        
        var hintEl = document.createElement( "span" );
        // I'd prefer to insert the hint after the field, so that screen-readers
        // would announce the field first. But putting it first resolves some
        // difficult layout glitches in Safari. - sdg 2008.05.05
        Y.util.Dom.insertBefore( hintEl, elem );
        hintEl.className = FieldHints.HINT_CLASS;
        Dom.setText( hintEl, this._getHintText(elem) );
        Dom.setUnselectable( hintEl );
        elem._fieldhint = hintEl;
        
        // Make sure we line up vertically with the actual field text by
        // matching box and font properties.
        Dom.copyStyles( elem, hintEl, "paddingTop", "paddingLeft", 
                                      "borderTopWidth", "borderLeftWidth", 
                                      "marginTop", "marginLeft", 
                                      "fontSize", "lineHeight" );        

        var ieLessThan7 = ( Browser.type == "ie" && Browser.version[0] < 7 );
        
        // I'm not sure why this is necessary, but it helps (at least in FF)
        // to ensure that the top of the wrapper aligns with the top of the field.
        if ( !ieLessThan7 ) // it hurts in IE 6
            Dom.copyStyles( elem, wrapperEl, "paddingTop" );
        
        if ( Browser.type == "gecko" ) {
            
            // Firefox appears to have a problem in which it doesn't recognize
            // the relatively-positioned, inline wrapperEl as the Y-coord context 
            // for hintEl. Assuming hintEl.top is "auto", all the hints on the page
            // smash together somewhere far above where they should be. The best
            // solution is to set position:relative on a *block* ancestor, but I don't
            // want to make that a requirement for this class, as that would limit
            // our layout flexibility. Instead we make a manual correction here. Note
            // that this can look bad if the user resizes the font size. - sdg 2008.05.05
            hintEl.style.top = elem.offsetTop + "px";
            
            // More strangeness: if the field has a top margin, it creates an
            // equivalent error in the hint position. Using a negative margin
            // of the same amount corrects for it. - sdg 2008.05.05
            var marginTop = Y.util.Dom.getStyle( elem, "marginTop" );
            var marginTopInt = parseInt( marginTop );
            if ( !isNaN( marginTopInt ) )
                hintEl.style.marginTop = "-" + marginTop;
        }
        else if ( ieLessThan7 ) {
            hintEl.style.border = "none"; // no transparent borders in IE 6?
        }
        
        Y.util.Event.on( elem, "focus", FieldHints._handleFocus );
        Y.util.Event.on( elem, "blur", FieldHints._handleBlur );
        Y.util.Event.on( hintEl, "click", FieldHints._handleHintClick );
    },
    
    // HACK: if hints are created inside a display:none container in FF,
    // they can be slightly offset.  Call this to fix up position at show time.
    // Complaints about this solution will be cheerfully ignored.
    jiggleHint: function( elem ) {
        
        elem = elt( elem );
        if ( !elem ) return;
        
        var wrapperEl = elem.parentNode;
        if ( !Y.util.Dom.hasClass( wrapperEl, FieldHints.WRAPPER_CLASS ) )
            return; // only applies if already set up
        
        if ( Browser.type == "gecko" ) {
        
            var hintEl = elem.previousSibling;
            
            // Firefox appears to have a problem in which it doesn't recognize
            // the relatively-positioned, inline wrapperEl as the Y-coord context 
            // for hintEl. Assuming hintEl.top is "auto", all the hints on the page
            // smash together somewhere far above where they should be. The best
            // solution is to set position:relative on a *block* ancestor, but I don't
            // want to make that a requirement for this class, as that would limit
            // our layout flexibility. Instead we make a manual correction here. Note
            // that this can look bad if the user resizes the font size. - sdg 2008.05.05
            hintEl.style.top = elem.offsetTop + "px";
            
            // More strangeness: if the field has a top margin, it creates an
            // equivalent error in the hint position. Using a negative margin
            // of the same amount corrects for it. - sdg 2008.05.05
            var marginTop = Y.util.Dom.getStyle( elem, "marginTop" );
            var marginTopInt = parseInt( marginTop );
            if ( !isNaN( marginTopInt ) )
                hintEl.style.marginTop = "-" + marginTop;
        }
    },
    
    // My shame knows no bounds
    jiggleAll: function( rootElem ) {
        Y.util.Dom.getElementsByClassName( FieldHints.WRAPPER_CLASS, null, rootElem, function(elem) {
            if ( elem.firstChild && elem.firstChild.nextSibling ) FieldHints.jiggleHint( elem.firstChild.nextSibling );
        });
    },
    
    _getHintText: function (elem) {
        // All browsers support elem.title.
        // All browsers we tested except IE9 supports elem.placeholder, but everyone (including IE9) supports
        // getAttribute('placeholder').
        return (this.USE_TITLE_ATTR ? elem.title : elem.getAttribute('placeholder'));
    },
    
    _showHint: function( elem ) {
        if ( !this.NATIVE_PLACEHOLDER && this._getHintText(elem) && !elem.value && ( elem != document.activeElement ) )
            Y.util.Dom.addClass( elem.parentNode, FieldHints.ACTIVE_CLASS );
    },
    
    _hideHint: function( elem ) {
        if ( FieldHints._isHintVisible( elem ) )
            Y.util.Dom.removeClass( elem.parentNode, FieldHints.ACTIVE_CLASS );
    },
    
    _isHintVisible: function( elem ) {
        return Y.util.Dom.hasClass( elem.parentNode, FieldHints.ACTIVE_CLASS );
    }
};

/////////////////////////////////////////////////////////////
/// Ellipsis helper
///

//TODO: hook font resize event from YUI to recalc ellipses

var Ellipses = {
    _outerClass : "ellipsizer",
    _innerClass : "ellipsizee",
    _moreClass : "ellipsisWrapper",
    _spacerClass : "ellipsisSpacer",

    // Prerequisites: 
    // 1. Assign the classname "ellipsizer" to the elements you wish to affect.
    // 2. Make sure the elements have a line-height defined somewhere, either
    //    directly or inherited.
    // 3. Assign a max-height to each element. IMPORTANT: the max-height must be
    //    an even multiple of the line-height. For example, if the line-height 
    //    is 1.5em, then acceptable max-heights are 1.5em, 3em, 4.5em, etc. This
    //    is done in CSS so there is no visible jump when the JS code is run.
    //    To avoid truncation in non-JS clients, it's best to use a CSS rule 
    //    beginning with the ".js" selector.
    init : function( rootNode ) {
        
        rootNode = rootNode || document.body;

        if ( rootNode.style.maxHeight == null )
            return; // probably IE 6, which doesn't support max-height

        var elems = Y.util.Dom.getElementsByClassName(Ellipses._outerClass, null, rootNode, function(elem) {
            
            // Insert an inner element between the original element and the
            // text content. This inner element will be used to measure the
            // natural height of the text.
            var innerEl = document.createElement( "span" );
            innerEl.className = Ellipses._innerClass;
            var children = elem.childNodes;
            while ( children.length )
                innerEl.appendChild( children[0] );
            elem.appendChild( innerEl );
    
            Ellipses._updateElement(elem);
        });
    },

    _updateElement : function(elem) {
        var child = Y.util.Dom.getElementsByClassName(Ellipses._innerClass, null, elem)[0];

        if(child.offsetHeight > elem.offsetHeight)
        {
            Ellipses._show(elem);
        }
        else
        {
            Ellipses._hide(elem);
            
            // Even if the text is not truncated currently, it might be after the 
            // user increases the browser font size. Because we don't yet detect 
            // font size adjustments, let's at least make sure that all the text
            // will be visible in that case.
            elem.style.maxHeight = "none";
        }
    },

    _show : function(elem) {
        var moreElem = Y.util.Dom.getElementsByClassName(Ellipses._moreClass, null, elem)[0];
        var spacerElem = Y.util.Dom.getElementsByClassName(Ellipses._spacerClass, null, elem)[0];
        if(moreElem)
        {
            moreElem.style.display = "block";
            spacerElem.style.display = "block";
        }
        else
        {
            moreElem = document.createElement("div");
            moreElem.className = Ellipses._moreClass;
            elem.insertBefore(moreElem, elem.firstChild);
            // UISTRING
            moreElem.innerHTML = '<a class="morelink" href="#">&hellip;more</a>';

            var linkElem = Y.util.Dom.getElementsByClassName("morelink", null, elem)[0];
            Y.util.Event.addListener(linkElem, "click", Ellipses._toggle, elem, false);

            spacerElem = document.createElement("div");
            spacerElem.className = Ellipses._spacerClass;
            elem.insertBefore(spacerElem, elem.firstChild);
        }
        
        // Use the moreElem as a measuring stick to determine how many lines
        // are visible. This assumes that moreElem has the same line height and
        // font size as the rest of the text.
        //
        // The ratio here doesn't come out to an even number: there's some 
        // small error in both FF and IE which forces us to round the result.
        // I'm using round() because in one browser the ratio is slightly high,
        // and in the other it's slightly low.
        var numLines = Math.max( 1, Math.round( elem.offsetHeight / moreElem.offsetHeight ) );
        
        var numSpacerLines = numLines - 1;
        var brs = [];
        for ( var i=0; i < numSpacerLines; i++ )
            brs.push( "<br>" );
        // Using <br> elements means that the moreElem will be correctly positioned
        // (although not necessarily correctly visible) after the user resizes the
        // browser font.
        spacerElem.innerHTML = brs.join("");
    },

    _hide : function(elem) {
        var moreElem = Y.util.Dom.getElementsByClassName(Ellipses._moreClass, null, elem)[0];
        var spacerElem = Y.util.Dom.getElementsByClassName(Ellipses._spacerClass, null, elem)[0];
        if(moreElem)
        {
            moreElem.style.display = "none";
            spacerElem.style.display = "none";
        }
    },

    // todo (not important): this function handles collapsing
    //   the ellipsis, but _show() needs to replace the "(more)"
    //   link with a "(less)" link in order for that to look right,
    //   so that's currently disabled.
    
    _toggle : function(evt, elem) {
        var moreElem = Y.util.Dom.getElementsByClassName(Ellipses._moreClass, null, elem)[0];
        if(moreElem)
        {
            if(moreElem.oldHeight)
            {
                elem.style.maxHeight = "";
                elem.style.maxHeight = moreElem.oldHeight;
                moreElem.oldHeight = null;
            }
            else
            {
                moreElem.oldHeight = elem.style.maxHeight;
                elem.style.maxHeight = "none";
            }

            Ellipses._updateElement(elem);
        }
        Y.util.Event.stopEvent(evt);
    }

};


/////////////////////////////////////////////////////////////
/// Dialog helper
///
/// To add iframe dialog support, pull in cookie_comm.js.

var Dialog = {
    
    _id: 0,
    instances: [],
    
    // opens a dialog inside of faceboook Asynchronously -- after polling Facebook (yes, Asynchronously) 
    // for the correct scroll position. Use this to open a dialog when you don't need a reference to 
    // the dialog after it has opened. 
    asycnOpenOnFB: function( title, body, buttons, width, options ) {
        if (window.FacebookData) {
           var patchYui = false;
           FacebookUtils.correctSrollThen( patchYui, Dialog, Dialog.open_inner, title, body, buttons, width, options );
        } else {
            return Dialog.open(title, body, buttons, width, options);
        }
    },
    
    // Opens a basic dialog. Note that the any insecure parts of the body string 
    // should be HTML-escaped before calling this method.
    open: function( title, body, buttons, width, options ) {
    
        var elemId = "dlg" + Dialog._id++;
        var opts;
        var dlg;
        // var tr_corner;
        var attr;
        var phoneView = window.MediaView && window.MediaView.mode == "phone";
        
        opts = {
            width: ( !phoneView ? width || "30em" : null ),  // width is handled in CSS for phone view
            modal: true,
            close: true,
            underlay: "none",
            dragOnly: true,
            // Defer displaying the dialog until after it has been centered in the current viewport.
            // Otherwise, YUI focuses the default button, which scrolls the viewport to the top.
            visible: false
        };
        $.extend(opts, options || {});

        dlg = new Y.widget.Dialog(elemId, opts);

        dlg.setHeader( '<div class="content">' +
                          Text.escapeHtml( Text.collate( title, "Bandcamp" ) ) + //UISTRING 
                          '</div>' );

        dlg.setBody( Text.collate( body, "&nbsp;" ) ); // nbsp is a placeholder 

        if ( buttons && !Y.lang.isArray( buttons ) )
            buttons = [buttons];
        if (!buttons)
            buttons = Dialog.buttons.standardSet();
        dlg.cfg.queueProperty( "buttons", buttons );
        dlg.cfg.queueProperty( "keylisteners", Dialog.keyListeners.standardSet( dlg ) );
        dlg.cfg.queueProperty( "constraintoviewport", true );
        
        if ( window.MediaView && MediaView.mode == "phone" )
            dlg.cfg.addProperty( "autofocus", {value: false} );  // we invented this property; see below
        
        // Autocentering doesn't work correctly with zoomed-in mobile browsers. The
        // iphone/android test here is a crummy, short-term solution. - sdg 2012.03.28
        // Updated to respect a fixedcenter value passed in - dh 2014.01.22
        var useAutoCentering = !window.FacebookData && !phoneView && 
                               !(Browser.platform == "iphone" || Browser.platform == "android") &&
                               opts.fixedcenter === undefined;

        if ( useAutoCentering )
            dlg.cfg.queueProperty( "fixedcenter", true );
        
        dlg.hideEvent.subscribe( function() {
            Dialog.destacken(dlg);
            if ( phoneView )
                Dom.unhideEverythingThanksAndroid( dlg.element, dlg.mask );
            
            // destroy on a timeout, as the YUI code throws errors otherwise
            Y.lang.later( 0, dlg, dlg.destroy );

            $.event.trigger("bc_dialog_close");
        });
        
        dlg.destroyEvent.subscribe( function() {
            if ( phoneView )
                Dom.unhideEverythingThanksAndroid( dlg.element, dlg.mask );
            Dialog.destacken(dlg);
        });
        
        dlg.hideMaskEvent.subscribe( function() {
            // fix a YUI bug: don't remove the body's "masked" classname if there remain other open dialogs
            if ( Dialog.instances.length )
                $(document.body).addClass("masked");
        });
        
        // fix for IE-specific bug 468830.
        // (expanded to gecko 9/2011 - RS)
        // YUI dialogs have a document-level focus listener which is used
        // to make sure focus stays in a modal dialog.  Whenever an element
        // is focused, YUI checks to see if it's in the dialog, and if not,
        // focus is reset to the dialog.  In IE, flash objects also seem
        // to want to forcibly focus themselves when you click in them,
        // and the result is that they take turns stealing focus back and
        // forth for a while, with the browser hung all the while.  Eventually,
        // this times out, but it's on the order of minutes. We see this problem
        // when users click on the flash "OK" button in the upload confirmation dialog.
        //
        // This fix monkey-patches YUI's focus listener
        // (dialog._onElementFocus) and simply ignores these focus events
        // if they're on <object> or <embed> tags.
        if ( Browser.type == "ie" || Browser.type == "gecko" ) {
            // monkey patch dlg._onElementFocus to ignore focus events on object tags
            // (in our case, the flash nugget)
            dlg._onElementFocus_orig = dlg._onElementFocus;
            dlg._onElementFocus = function(e) {
                if ( Y.util.Event.getTarget(e).tagName != "OBJECT" && Y.util.Event.getTarget(e).tagName != "EMBED" )
                    dlg._onElementFocus_orig(e);
            };
        }
        
        dlg.render( document.body );
        
        if (buttons.length == 0) {
            dlg.footer.style.display = "none";
            Y.util.Dom.addClass(dlg.body, "footerless");
        } else {
            Y.util.Dom.addClass(dlg.body, "footered");
            // Insert divs inside the dialog buttons; this gives us better
            // CSS formatting control.
            Y.util.Dom.batch( dlg.footer.getElementsByTagName( "button" ), function( elem ) {
                elem.innerHTML = "<div>" + Text.escapeHtml( Dom.getText( elem ) ) + "</div>";
            });
        }
        
        // Fix bug 253: dialog doesn't show up in Opera until we re-center
        // (not sure why).  - sdg 2009.06.11
        if ( !useAutoCentering || Browser.type == "opera" )
            dlg.center();
        
        dlg.show();
        $.event.trigger("bc_dialog_open");
        
        if ( phoneView ) {
            
            // On phones, the dialog is allowed to scroll out of view. To mitigate this, taps on the
            // mask element should scroll it back.
            Y.util.Event.on( dlg.mask, "click", function() {
                Dom.scrollToElement( dlg.element );
            } );
            
            Dom.hideEverythingThanksAndroid( dlg.element, dlg.mask );
        }

        Dialog.enstacken( dlg );
        return dlg;
    },
    
    // Opens a dialog whose body contents are derived from a template.
    openTemplate: function( title, templName, hash, buttons, width, options ) {
        
        var body = Templ.render( templName, hash );
        return Dialog.open( title, body, buttons, width, options );
    },
    
    // Opens a dialog with a title, message, and an OK button.
    // message: you must HTML-escape this as necessary
    // onClose: if provided, this is called after the dialog closes
    // if showCancel is set, a cancel button will be added, and
    // onClose will NOT be called if it is clicked.
    alert: function( title, message, onClose, showCancel ) {
        if( window.FacebookData ) {
            var patchYui = false;
            return FacebookUtils.correctSrollThen( patchYui, Dialog, Dialog.alert_inner,  title, message, onClose, showCancel );
        } else {
            return Dialog.alert_inner(title, message, onClose, showCancel); 
        }
        
    },
    
    alert_inner: function( title, message, onClose, showCancel ) {

        var buttons = showCancel ? Dialog.buttons.standardSet() : [ Dialog.buttons.ok() ];
        if ( onClose )
            buttons[0].handler = function() { this.cancel(); onClose.call( this ) };
        var dlg = Dialog.open( title, message, buttons, null, {close: false} );
        Y.util.Dom.addClass( dlg.body, "alertDlg" ); // tweak to top margin
        return dlg;
    },
    
    
    buttons: {
        
        standardSet: function( okHandler, okText, cancelHandler, cancelText ) {
            return [
                Dialog.buttons.ok( okHandler, okText ),
                Dialog.buttons.cancel( cancelHandler, cancelText )
            ];
        },

        // a provided handler should not dismiss the dialog
        //         
        ok: function( okHandler, okText ) {

            okHandlerWrapper = function() {
                this.cancel();
                if ( okHandler ) okHandler();
            };
            
            return {
                text: ( okText || "OK" ), //UISTRING
                isDefault: true,
                handler: okHandlerWrapper
            };
        },
        
        // a provided handler should not dismiss the dialog
        //         
        cancel: function( cancelHandler, cancelText ) {

            cancelHandlerWrapper = function() {
                this.cancel();
                if ( cancelHandler ) cancelHandler();
            };

            return {
                text: ( cancelText || "Cancel" ), //UISTRING
                handler: cancelHandlerWrapper
            };
        }        
    },
    
    keyListeners: {
        
        standardSet: function( dlg ) {
            return [ Dialog.keyListeners.escape( dlg ) ];
        },
        
        escape: function( dlg ) {
            return new Y.util.KeyListener(
                document,
                { keys: Y.util.KeyListener.KEY.ESCAPE },
                { fn: function( type, args ) {
                        // if a SELECT in the dialog is focussed and open on FF3-Mac,
                        // we badly snarl the browser if we cancel right away.  See IRC 2009.06.09.
                        // Is there anything setTimeout cannot do?
                        // I love you, setTimeout.
                        setTimeout( function() { dlg.cancel(); }, 1 );
                      },
                  scope: dlg, correctScope: true }
            ); 
        }
    },
    
    enstacken: function( dlg ) {
        Dialog.instances.push( dlg );
    },
    
    destacken: function( dlg ) {
        var index = Iter.index( Dialog.instances, dlg );
        if ( index >= 0 )
            Dialog.instances.splice( index, 1 );  
    }
};

// Invent an "autofocus" config property for YUI dialogs. Set this to false to suppress the default
// behavior of focusing the first element/button when the dialog is shown.
if ( Y && Y.widget && Y.widget.Dialog ) {
    Y.widget.Dialog.prototype._focusOnShow = function() {
        if ( this.cfg.getProperty("autofocus") !== false )
            Y.widget.Panel.prototype._focusOnShow.apply( this, arguments );
    };
}

var Time = {
    
    // Formats a Date object as a full, UI-ready date-time string.
    // NOTE: duplicates functionality in Time.to_ui (TimeHacks.rb).
    toUi: function( date, fourDigitYear, asUTC, as24 ) {
        if ( Y.lang.isString( date ) )
            date = new Date( date );
        //sdg TODO: uncertain what do do with timezones here
        // UISTRING
        var hour = date[ asUTC ? "getUTCHours" : "getHours" ]();
        var min = date[ asUTC ? "getUTCMinutes" : "getMinutes" ]();
        min = min < 10 ? "0" + min : min;
		if (as24) {
			hour = hour < 10 ? "0" + hour : hour;
			var ampm = '';
		} else {
	        var hour12 = hour > 12 ? hour - 12 : hour;
	        if (hour12 == 0)
	            hour12 = 12;  // midnight
	        var ampm = hour >= 12 ? "pm" : "am";
			hour = hour12;
		}
        return Time.toUiDate( date, fourDigitYear, asUTC ) + " " + hour + ":" + min + ampm;
    },
    
    // Formats a Date object as a full, UI-ready date-only string.
    // NOTE: duplicates functionality in Time.to_ui_date (Time.rb).
    toUiDate: function( date, fourDigitYear, asUTC ) {
        if ( Y.lang.isString( date ) )
            date = new Date( date );        
        //sdg TODO: uncertain what to do with timezones here
        var year = date[ asUTC ? "getUTCFullYear" : "getFullYear" ]().toString();
        if ( !fourDigitYear )
            year = year.substr( 2 );
        // UISTRING
        return ( date[ asUTC ? "getUTCMonth" : "getMonth" ]() + 1 ) + "/" + 
                 date[ asUTC ? "getUTCDate" : "getDate" ]() + "/" + 
                 year; 
    },
    
    relative_day: function(date, format) {
        if ( Y.lang.isString( date ) )
            date = new Date( date );

        var days_ago = Math.floor((new Date() - date) / (60*60*24*1000));
        var day;
        switch (days_ago) {
            case 0: day = "today"; break;
            case 1: day = "yesterday"; break;
            default: 
                if (format)
                    day = Time.strftime(date, '' + format);
                else
                    day = "" + days_ago + " days ago";
        }
        return day;
    },

    relative_time: function(date, format) {
        var relativeDay = this.relative_day(date, format);

        if ( relativeDay !== 'today' ) {
            return relativeDay;
        }

        if ( Y.lang.isString(date) ) {
            date = new Date(date);
        }

        // If it is today, try and figure out with better resolution how long
        // ago it was.
        var secondsAgo = (new Date() - date) / 1000;
        var minutesAgo = secondsAgo / 60;
        var hoursAgo = minutesAgo / 60;

        secondsAgo = Math.floor(secondsAgo);
        minutesAgo = Math.floor(minutesAgo);
        hoursAgo = Math.floor(hoursAgo);

        if (hoursAgo > 4) {
            return 'today';
        } else if (hoursAgo > 0) {
            return hoursAgo + ' hour'+(hoursAgo > 1 ? 's' : '')+' ago';
        }

        if (minutesAgo > 0) {
            return minutesAgo + ' minute'+(minutesAgo > 1 ? 's' : '')+' ago';
        }

        if (secondsAgo > 15) {
            return secondsAgo + ' seconds ago';
        }
        return 'just now';
    },

    // Formats a Date for near term (no year), returned as string, as in "Nov 15"
    toUpcomingDate: function( date, asUTC ) {
        if ( Y.lang.isString( date ) )
            date = new Date( date );  
        // UISTRING
        /* return ( date[ asUTC ? "getUTCMonth" : "getMonth" ]() + 1 ) + "/" + 
                 date[ asUTC ? "getUTCDate" : "getDate" ]() ;  */     
        // UISTRING
        return ( 
                Time.getMonthName( date[ asUTC ? "getUTCMonth" : "getMonth" ]()  ) + " " +  date[ asUTC ? "getUTCDate" : "getDate" ]()  ); 
    },    
    
    getMonthName : function(i) {
        // UISTRING
        var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul',
        'Aug','Sep','Oct','Nov','Dec'];
        
        return m[i];
    },
    
    strToDate: function( str ) {
        if ( !str ) return null; // short-circuit empty strings

        // JS (at least in FF) doesn't support the mm-dd-yy format, so convert
        // to slashes.
        str = str.replace( /-/g, "/" );

        // Serialized dates from the server contain the timezone (UTC), so they get parsed correctly
        // as UTC.  User-entered dates won't specify timezone, and in any case we always want our dates
        // represented as UTC time, so we'll slap on a "UTC" to the end of the string to make the Date
        // constructor parse it as a UTC time.
        if (!~str.indexOf('UTC') && !~str.indexOf('GMT')) {
            str += ' UTC';
        }
        
        var d = new Date(str);
        
        // When confronted with a datestring missing a year, like 
        //    new Date("3/7")
        // most browsers will return NaN. Some however (notably Chrome 9) will return 
        // a valid Date anyway, with a year picked seemingly randomly (in my tests
        // it was 2001). For Chrome, then, we can't use NaN as a test to fall into
        // our nice year-picking logic, below. So for those browsers we just fall into
        // that logic anyway, every time. Crazy!  - sdg 2011.03.07
        var missingYearResultsInNaN = isNaN( new Date( "3/7" ) );
        var tryAddingYear = isNaN(d) || !missingYearResultsInNaN;

        // if it is not already a valid date, and
        // if adding a year would make it a valid date,
        // figure out if this year, last year or next year
        // makes the most sense (which date is nearest to now)
        if ( tryAddingYear )
        {
            var recentMonths = 3;
            var mindate = new Date();
            mindate.setMonth(mindate.getMonth() - recentMonths);
            var year = new Date().getFullYear() - 1;

            // try dates from last year, this year
            // and next year, and take the first one
            // which is greater than 'recentMonths' months ago.
            //
            // This means if you enter a date with
            // no year, we will use the closest matching
            // in the recent past or near future
            for(var y = year; y < year + 3; y++)
            {
                var candiDate = new Date(str + " " + y);
                if(candiDate > mindate)
                {
                    d = candiDate;
                    break;
                }
            }
            
            if(isNaN(d))
            {
                return null;
            }            
        }
        else {
            // JS interprets all two-digit years as 19xx. We instead want to
            // allow two-digit years in the 21st Century, up to a certain point.
            var fullYear = d.getFullYear();
            if ( fullYear < 2000 && str.indexOf( fullYear ) == -1 ) {
                var twoDigitYearStr = fullYear.toString().substr( 2, 2 );
                var twoDigitYear = parseInt( twoDigitYearStr );
                // Our moving range will extend 25 years into the future. This
                // logic should be good until 2075, at which point this should
                // all done via wirelessly-enabled cerebral cortex nanobots anyway.
                var offset = 25; 
                var twoDigitCutoff = parseInt( ( new Date().getFullYear() + 25 ).toString().substr( 2, 2 ) ); 
                if ( twoDigitYear <= twoDigitCutoff )
                    d.setFullYear( fullYear + 100 );
            }
        }

        return d;
    },

    tables: {
    	a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    	A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    	b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    	B: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    	p: ['AM', 'PM'],
    	P: ['A', 'P']
    },

    // See Ruby's Time.strftime for documentation of formats.
    formats: {
    	'a': function(d) { return Time.tables.a[d.getUTCDay()] },
    	'A': function(d) { return Time.tables.A[d.getUTCDay()] },
    	'b': function(d) { return Time.tables.b[d.getUTCMonth()] },
    	'B': function(d) { return Time.tables.B[d.getUTCMonth()] },
    	'd': function(d) { return TextFormat.pad(d.getUTCDate(), '0', 10) },
    	'e': function(d) { return TextFormat.pad(d.getUTCDate(), ' ', 10) },
    	'H': function(d) { return TextFormat.pad(d.getUTCHours(), '0', 10) },
    	'I': function(d) {
    	        var I = d.getUTCHours() % 12;
    	        return TextFormat.pad(I === 0 ? 12 : I, '0', 10);
    	    },
    	'l': function(d) {
    	        var I = d.getUTCHours() % 12;
    	        return I === 0 ? 12 : I;
				//return TextFormat.pad(I === 0 ? 12 : I, '0', 10);
    	    },
    	'j': function(d) {
    			var ms = d - new Date(d.getUTCFullYear() + '/1/1 GMT');
                // ms += d.getTimezoneOffset()*60000;  assume UTC
    			var doy = parseInt(ms/60000/60/24, 10)+1;
    			return TextFormat.pad(doy, '0', 100);
    		},
    	'm': function(d) { return TextFormat.pad(d.getUTCMonth()+1, '0', 10) },
    	'M': function(d) { return TextFormat.pad(d.getUTCMinutes(), '0', 10) },
    	'p': function(d) { return Time.tables.p[d.getUTCHours() >= 12 ? 1 : 0 ] },
    	'P': function(d) { return Time.tables.P[d.getUTCHours() >= 12 ? 1 : 0 ] },
    	's': function(d) { return parseInt(d.getTime() / 1000) },
    	'S': function(d) { return TextFormat.pad(d.getUTCSeconds(), '0', 10) },
        'u': function(d) {
                var dow = d.getUTCDay();
                return dow === 0 ? 7 : dow;
            },
    	'U': function(d) {
    			var doy = parseInt(Time.formats.j(d), 10);
    			var rdow = 6-d.getUTCDay();
    			var woy = parseInt((doy+rdow)/7, 10);
    			return TextFormat.pad(woy, '0', 10);
    		},
    	'w': function(d) { return d.getUTCDay().toString() },
    	'W': function(d) {
    			var doy = parseInt(Time.formats.j(d), 10);
    			var rdow = 7-Time.formats.u(d);
    			var woy = parseInt((doy+rdow)/7, 10);
    			return TextFormat.pad(woy, '0', 10);
    		},
    	'y': function(d) { return TextFormat.pad(d.getUTCFullYear() % 100, '0', 10) },
    	'Y': function(d) { return d.getUTCFullYear().toString() },
    	'Z': function(d) { return "UTC" },  // assume UTC; use Ruby's abbrev.
    	'%': function(d) { return '%'; }
    },

    aggregates: {
    	'c': '%a %b %e %X %Y',
    	'x': '%m/%d/%y',
    	'X': '%H:%M:%S'
    },

    strftime: function( date, fmt ) {
    	// first replace aggregates
    	while (fmt.match(/%[cDhnrRtTxX]/)) {
    		fmt = fmt.replace(/%([cDhnrRtTxX])/g, function(m0, m1) { return Time.aggregates[m1] });
    	}
        // then replace formats
    	return fmt.replace(/%([aAbBCdegGHIjlmMpPsSuUVwWyYzZ%])/g, function(m0, m1) { return Time.formats[m1](date) });
    }
};

var TextFormat = {

    // this is set up to default to "US$####.##" if only num is given - old behavior
    //       
    // Note: this returns HTML, not plain text, for some currencies -- the currency symbol can be an HTML entity 
    currency : function( num, currencyInfo, numericOnly, informal, terse ) {
        if (num.is_money) {
            currencyInfo = window.CurrencyData.info[num.currency];
            num = num.amount / 100.0;
        }

        var fmt = currencyInfo || { prefix: "$", symbol: "USD", places: 2 }; // UISTRING

        var places = ( num >= 1 || num == 0 ) ? fmt.places : 2;
            // to handle (rare) oddball cases like small fractional yen

        // "informal" means format without decimals if the number is round, e.g -- "$6"
        if ( informal && num >= 1 && ( Math.round( num ) == num )) 
            places = 0;

        var base = num.toFixed( places );

        if ( numericOnly ) return base;
            // for error messages, we want the option to only show the number (no symbols)
            
        base = TextFormat.commafyNumber(base);

        if ( fmt.symbol && !terse )
            base += " " + fmt.symbol;

        return fmt.prefix + base;
    },

    // Yet another currency formatter. Add your own format #s instead of method args...
    // Formats --
    //   1: $4.00, $1,234.56
    //   2: $4, $1,234.56
    //   3: 4.00, 1,234.56, -1,234.56
    //   4: 4.00, 1,234.56, (1,234.56)  <-- accounting style
    money: function (input, currency, format) {
        'use strict';
        if (input && input.is_money) {
            if ('number' === typeof currency) {
                format = currency;
            }
            currency = input.currency;
            input = input.amount / 100.0;
        }
        // unlike currency(), money() defaults to 0 on nil to match the ruby version.
        input = input || 0.0;
        currency = currency || 'USD';
        format = format || 1;
        var fmt = CurrencyData.info[currency];
        var places = fmt.places;
        var isWholeNumber = input === Math.round(input);
        if (isWholeNumber) {
            if (format === 2) places = 0;
        }
        else {
            // we always round zero-decimal currencies (like yen) to the nearest whole unit, unless we happen to have a fractional value
            if (places === 0) places = 2;
        }
        var s = input.toFixed(places);
        s = this.commafyNumber(s);
        if (format === 4) {
            if (s[0] === '-') {
                s = '(' + s.substr(1) + ')';
            }
        }
        else if (format !== 3) {
            s = fmt.prefix_informal_utf8 + s;
        }
        return s;
    },
    
    toMb: function( num ) {
        var d = 1;
        var n = 1024;
        var m = Iter.find( [" bytes", "K", "MB", "GB", "TB", "PB"], function() {
            if ( num < n )
                return true;
            else {
                d = n;
                n *= 1024;
                return false;
            }
        } );
        if ( !m )
            return num.toString();

        var a = Math.round( (num/d)*10 );
        if ( a % 10 == 0 )
            return (a/10) + m;
        else
            return (a/10).toFixed(1) + m;
    },

    // prefix x with str chars until x is the same width as r
    // eg, pad(5, ' ', 100)  ->  '  5'
    // eg, pad(5, '0', 10)   ->  '05'
    pad: function(x, str, r) {
        x = x.toString();
    	for ( ; parseInt(x, 10) < r && r > 1; r /= 10)
    		x = str + x;
    	return x;
    },

    _determine_locale_separators : function() {
        var test = 1.2.toFixed(1);
        if(test.indexOf('.') >= 0) {
            TextFormat._separators = {
                decimal : '.',
                thousands : ','
            }
        } else {
            TextFormat._separators = {
                decimal : ',',
                thousands : '.'
            }
        }
    },

    // take a formatted number string and add thousands separators
    commafyNumber : function(str) {
        if(!TextFormat._separators) {
            TextFormat._determine_locale_separators();
        }

        var parts = str.split(TextFormat._separators.decimal);
        var out = "";
        var intpart = parts[0];
        var decimalpart = parts[1] ? (TextFormat._separators.decimal + parts[1]) : "";
        var length = intpart.length;
        var i = 0;

        while((length - i) % 3 > 0) {
            out += intpart.substr(i,1);
            i++;
        }

        if(out.length > 0 && (length - i) > 0) {
            out += TextFormat._separators.thousands;
        }

        while((length - i) > 3) {
            out += intpart.substr(i,3) + TextFormat._separators.thousands;
            i+=3;
        }

        if((length - i) > 0) {
            out += intpart.substr(i);
        }

        return out + decimalpart;
    },

    // Replaces the space between the last two words of a string with a non-breaking space.
    noOrphan: function(str) {
        return str.replace(/([^ ]+) +([^ ]+)$/, "$1\u00A0$2");
    }

};
/*
var HiddenParams = {};
function HiddenParamsInit(){
    var COOKIE_NAME = "hiddenParams";
    var cookie = Cookie.get(COOKIE_NAME);
    if (cookie)
    {
        Cookie.clear(COOKIE_NAME);
        var query = Url.parseQuery(cookie);
        if (query)
        {
            HiddenParams = query;
        }
    }
}
HiddenParamsInit();
*/

function addExpandEventListeners( field ) {
    $(field).off(".bcExpand").on("paste.bcExpand keyup.bcExpand focus.bcExpand", updateFieldHeight);
}

function updateFieldHeight( event ) {
	var field = event.target;
	var maxHeight = 250;
	
	var clientHeight = parseInt( field.clientHeight );
	var scrollHeight = parseInt( field.scrollHeight );
	
	if ( scrollHeight > clientHeight ) {

		if ( scrollHeight > maxHeight )
			scrollHeight = maxHeight;

		field.style.height = scrollHeight + "px";
	}
}

function addShrinkEventListeners( field, maxInactiveHeight ) {
    $(field).blur(function(event) {
        shrinkFieldHeight(event, maxInactiveHeight);
        }
    );
}

function shrinkFieldHeight( event, maxInactiveHeight ) {
    var field = event.target;
    var contentHeight = parseInt( field.scrollHeight );
    
    if ( contentHeight > maxInactiveHeight ) {
        field.style.height = maxInactiveHeight + "px";
    }
}

// deprecated: prefer using knockout for new text input stuff.
function addCharacterCountdownEventListeners(field, counterDiv, max) {
    $(field).on('input', function () {
        update(true);
    });
    // IE9 has a particularly broken input event (dosen't fire when deleting text) so use the legacy method there too.
    if (!('oninput' in field) || (Browser.make === 'ie' && Browser.version[0] <= 9)) {
        $(field).on('paste cut keyup', function () {
            setTimeout(update, 0, true);
        });
    }
    update(false);

    function update(doTruncate) {
        var remaining = max - $(field).val().length;
        $(counterDiv).toggleClass('notable', remaining <= 0);
        if (remaining < 0 && doTruncate) {
            $(field).val($(field).val().substr(0, max));
            remaining = 0;
        }
        $(counterDiv).find('.counter').text(''+remaining);
    }
}

// Easily interrupt a pending setTimeout with another.
function InterruptibleTimer() {
    this._timer = null;
}
InterruptibleTimer.prototype = {
    
    start: function( code, delay ) {
        this.stop();
        this._timer = setTimeout( code, delay );
    },
    
    stop: function() {
        clearTimeout( this._timer );
    }
};

// call FarbLoader.whenready( callback )
// in order to have callback called after
// the Farbtastic css and scripts have been
// loaded.  Can be used by multiple callers
// without worrying about multiple loadings

var FarbLoader = {
    _ready : false,

    whenready: function( callback ) {
        if(FarbLoader._ready) {
            callback();
            return;
        }

        var cssLoaded = false;
        var scriptLoaded = false;
        
        var checkinit = function() {
            if(cssLoaded && scriptLoaded)
            {
                FarbLoader._ready = true;
                callback();
            }
        }

        var cssSuccessFn = function() { Log.debug("farb css loaded"); cssLoaded = true; checkinit(); };
        var scriptSuccessFn = function() { Log.debug("farb script loaded"); scriptLoaded = true; checkinit(); };

        YAHOO.util.Get.css( FarbtasticUrls.css, { onSuccess: cssSuccessFn } );
        YAHOO.util.Get.script( FarbtasticUrls.js, { onSuccess: scriptSuccessFn });
    }
};

var PopupPicker = {
    pick : function(x, y, startcolor, onchange) {
        // generate an event at x,y to pass as a positioning param
        var event = $.Event("click", { pageX: x, pageY: y });

        if(!startcolor) startcolor = "#FF0000";

        var dialog = $('<div>').dialog({
                dialogClass: 'popuppicker',
                width: "225",
                modal: true,
                position: { my: "center", at: "center", of: event }
            });
        dialog.html("<div id='popup_picker'><div id='picker_container'></div><div class='swatches'><span id='picker_oldcolor' class='swatch'></span><span id='picker_newcolor' class='swatch'></span></div></div>");

        var oldswatch = $("#picker_oldcolor");
        var newswatch = $("#picker_newcolor");
        var currentcolor = startcolor;

        dialog.on( "dialogbeforeclose", function() {
                onchange(currentcolor, true);
            });

        var colorpicked = function(color) {
            newswatch.css("background", color);
            currentcolor = color;
            onchange(currentcolor, false);
        };

        FarbLoader.whenready( function() {
                var farb = $.farbtastic("#picker_container", colorpicked);
                farb.setColor(startcolor);
                $("#picker_oldcolor,#picker_newcolor").css("background", farb.color);
                oldswatch.click(function() {
                        currentcolor = startcolor;
                        farb.setColor(currentcolor);
                    });
            });

        return dialog;
    },
    destroy : function(picker) {
        picker.remove();
    }
};


// --------------------------------------------------

// Add input-watching to any object using Y.lang.augmentObject( OtherClassOrObject, WatchInput )
// Supply a method inputChanged( newAmt, eltId ).  newAmt will be undefined if unparseable. 
// type defaults to "float", can be "integer" or any other string for just raw string value
// 
var WatchInput = { 
    
    watchInput: function ( eltID, defaultValue, valueType ) {
        $assert( typeof eltID == "string" ) // dont hold a reference

        if ( this.__watching == null )
            this.__watching = { }; // we're applied to various classes, don't create until invoked

        var stuff = this.__watching[ eltID ] = {};

        stuff.__watchInput_elt = eltID;
        stuff.__watchInput_default = defaultValue;
        stuff.__watchInput_type = valueType || "float";

        var Self = this;
        setTimeout( function () { Self.__watchInput( eltID ) }, 500 );
    },

    __watchInput: function ( whichID ) {
        var stuff = this.__watching[ whichID ];
        if ( !stuff ) return;

        var e, el = elt( stuff.__watchInput_elt );
        if ( !el ) {
            this.__watching[ whichID ] = null;
            return; // self-terminating once the watched element goes away
        }

        var val = ( el.value == undefined ) ? el.innerHTML : el.value 
        switch ( stuff.__watchInput_type ) {
        case "float":
            var amt = parseFloat( val );
            if ( isNaN( amt ))
                amt = stuff.__watchInput_default;
            break;
        case "integer":
            var amt = parseInt( val );
            if ( isNaN( amt ))
                amt = stuff.__watchInput_default;
            break;
        default:
            var amt = val;
            break;
        }

        if ( amt != stuff.__watchInput_Last && this.inputChanged ) {
            try {
                this.inputChanged( amt, stuff.__watchInput_elt );
            } catch (e) {   
                Log.error(e);
            }
        }

        stuff.__watchInput_Last = amt;

        var Self = this;
        setTimeout( function () { Self.__watchInput( whichID ) }, 500 );
    }
    
}
    

// --------------------------------------------------

// Implementation of Expression.rb -- number 6!

var Expression = {

    eval: function(expr, eval_lambda, handle_constants) {
        var p = this.init(expr, eval_lambda, handle_constants);

        var value = this.parse_top(p);
        if (this.next_token(p).kind != 'end')
            throw "Expression error: '" + p.expr + "' -- end expected";
        return value;
    },

    dump: function(expr, eval_lambda, handle_constants) {
        var p = this.init(expr, eval_lambda, handle_constants);
        
        while (true) {
            var t = this.next_token(p);
            console.log(t.kind + " " + t.value);
            if (t.kind == 'end')
                break;
        }
    },

    init: function(expr, eval_lambda, handle_constants) {
        var p = {};

        p.expr = expr;
        p.handle_constants = handle_constants;
        p.eval_lambda = eval_lambda;

        p.return_prev_token = false;
        p.short_circuit = false;
        return p;
    },

    OPERATORS: ['||', '&&', '<=', '==', '!=', '>=', '<', '>', '+', '-', '*', '/', '%', '!', '(', ')'],

    next_token: function(p) {
        if (p.return_prev_token) {
            p.return_prev_token = false;
            return p.previous_token;
        }

        var token = {};
        
        p.expr = p.expr.replace(/^\s+/, "");
        if (p.expr == "")
            token.kind = 'end';
        else {
            for (var i = 0; i < this.OPERATORS.length; ++i) {
                var op = this.OPERATORS[i];
                if (p.expr.substr(0, op.length) == op) {
                    token.kind = op;
                    p.expr = p.expr.slice(op.length);
                    break;
                }
            }
            
            if (!token.kind) {
                var m;
                m = p.expr.match(/^(\'[^\']*\')/) || p.expr.match(/^(\"[^\"]*\")/) || p.expr.match(/([^\s\+\-\*\/\%\(\)\<\=\>\!\&\|\'\"]+)/);
                if (m) {
                    token.value = m[1];
                    token.kind = 'term';
                    p.expr = p.expr.slice(token.value.length);
                }
            }
        }

        p.previous_token = token;
        return token;
    },

    backup: function(p) {
        p.return_prev_token = true;
    },

    // PARSE

    is_true: function(val) {
        return val !== false && val != null; // 0 and "" are true
    },

    parse_top: function(p) {
        return this.parse_boolean_op(p);
    },

    parse_boolean_op: function(p) {
        var value = this.parse_comparison_op(p);
        while (true) {
            switch (this.next_token(p).kind) {
            case '||':
                if (this.is_true(value)) {
                    var s = p.short_circuit;
                    p.short_circuit = true;
                    this.parse_boolean_op(p);  // short circuit (not interested in result)
                    p.short_circuit = s;
                } else
                    value = this.parse_comparison_op(p);
                break;
            case '&&':
                if (!this.is_true(value)) {
                    var s = p.short_circuit;
                    p.short_circuit = true;
                    this.parse_boolean_op(p);  // short circuit (not interested in result)
                    p.short_circuit = s;
                } else
                    value = this.parse_comparison_op(p);
                break;
            default:
                this.backup(p);
                return value;
            }
        }
    },

    parse_comparison_op: function(p) {
        var value = this.parse_additive_op(p);
        var op;

        while (true) {
            switch ( (op = this.next_token(p).kind) ) {
            case '<':
            case '<=':
            case '==':
            case '!=':
            case '>=':
            case '>':
                value = this.evaluate_comparison(op, value, this.parse_additive_op(p));
                break;
            default:
                this.backup(p);
                return value;
            }
        }
    },

    evaluate_comparison: function(op, l, r) {
        if (op === '==') {
            if (l && l.is_money) {
                return r && r.is_money && l.currency === r.currency && l.amount === r.amount;
            }
            else return l == r;
        }
        else if (op === '!=') {
            return !this.evaluate_comparison('==', l, r);
        }
        else {
            if (('undefined' === typeof l) || ('undefined' === typeof r)) {
                // This raises an error in server-side liquid but maintain backwards compatibility in JS by returning false.
                Log.error("Expression: inequality comparison with an undefined operand will always return false");
            }

            if (l && l.is_money) {
                if (!(r && r.is_money)) {
                    throw "money cannot be compared with non-money";
                }
                if (l.currency !== r.currency) {
                    throw "money comparison currency mismatch";
                }
                l = l.amount;
                r = r.amount;
            }
            switch (op) {
                case '<': return l < r;
                case '>': return l > r;
                case '<=': return l <= r;
                case '>=': return l >= r;
                default: throw "invalid comparison operator: " + op;
            }
        }
    },

    parse_additive_op: function(p) {
        var value = this.parse_multiplicative_op(p);
        while (true) {
            switch (this.next_token(p).kind) {
            case '+':
                value += this.parse_multiplicative_op(p);
                break;
            case '-':
                value -= this.parse_multiplicative_op(p);
                break;
            default:
                this.backup(p);
                return value;
            }
        }
    },

    parse_multiplicative_op: function(p) {
        var value = this.parse_term(p);
        while (true) {
            switch (this.next_token(p).kind) {
            case '*':
                value *= this.parse_term(p);
                break;
            case '/':
                value /= this.parse_term(p);
                break;
            case '%':
                value %= this.parse_term(p);
                break;
            default:
                this.backup(p);
                return value;
            }
        }
    },

    parse_term: function(p) {
        var token = this.next_token(p);
        var value;
        switch (token.kind) {
        case '(':
            value = this.parse_top(p);
            if (this.next_token(p).kind != ')')
                throw "Expression error: '" + p.expr + "' -- unbalanced parentheses";
            break;
        case '+':
            value = this.parse_term(p);
            break;
        case '-':
            value = -this.parse_term(p);
            break;
        case '!':
            value = !this.is_true(this.parse_term(p));
            break;
        case 'term':
            if (!p.short_circuit) {
                var con = p.handle_constants;
                if (con) {
                    con = this.constant(token.value);
                    if (con)
                        value = con.v;
                }
                if (!con) {
                    if (p.eval_lambda)
                        value = p.eval_lambda(token.value);
                    else
                        throw "Expression error: '" + p.expr + "' -- not a term";
                }
            }
        }
        return p.short_circuit ? 1 : value;  // 1 is a benign value
    },

    constant: function(x) {
        var m;
        if (x.match(/^\d/)) {
            if (x.match(/e|E|\./))
                return {'v': parseFloat(x)};
            else
                return {'v': parseInt(x)};
        } else if (m = (x.match(/^\'(.*)\'$/) || x.match(/^\"(.*)\"$/)))
            return {'v': m[1]};
        else if (x == 'true')
            return {'v': true};
        else if (x == 'false')
            return {'v': false};
        else if (x == 'nil')
            return {'v': null};
        else
            return null;
    }
}

//----------------------------------------------------------------------

// Status message
// (all method arguments are optional)
// 
// show:
//      -> show speed:      'fast', 'slow' or millisec
//      -> show spinner:    boolean
//      -> message:         string
//      -> timeout:         millisec    (will hide after timeout)
//          -> showing message with spinner:
//              StatusSpinny.show( 'fast', true, 'Saving...', 5000);
//          -> showing spinner with no message:
//              StatusSpinny.show( 'fast', true, '');
//          -> showing message with no spinner:
//              StatusSpinny.show( 'fast', false, 'Saving...');
// 
// show after delay:
//      -> show delay:      millisec
//      -> return:  cancelID    (used to cancel before status is shown);
//      StatusSpinny.wouldShowAfter( 1500, 'fast', true, 'Saving...');
// 
// hide:
//      -> hide speed:      'fast', 'slow' or millisec
//      -> cancelID:        return value of .wouldShowAfter(), could be used to cancel status before it is shown
//      -> animCB:          post hide animation callback
//      StatusSpinny.hide('fast');
// 
var StatusSpinny = {
    
    spinnyID: 'status-spinny',
    spinningClass: 'spinning',
    timeouts: [],
    showQueue: [],
    showingQueue: false,
    isShown: false,
    
    spinny: function(spins) {
        var spinnyEl = $('#'+StatusSpinny.spinnyID);
        if (spinnyEl.length === 0)
            spinnyEl = $('<div id="'+StatusSpinny.spinnyID+'"></div>').appendTo(document.body);
        
        if (typeof spins == 'boolean') spinnyEl[spins?'addClass':'removeClass'](StatusSpinny.spinningClass);
        
        return spinnyEl;
    },
    
    show: function( speed, spins, message, duration ) {
        if (message === undefined || message == null) message = '';
        StatusSpinny.resetTimeouts();
        
        var showFn = function() {
            StatusSpinny.isShown = true;
            StatusSpinny.spinny(spins).html(message).fadeIn(speed);

            if (typeof duration == 'number') StatusSpinny.timeout(duration);
        };
        if (StatusSpinny.isShown) StatusSpinny.scheduleShow(message,showFn);
        else showFn();
    },
    
    scheduleShow: function(message,showFn) {
        StatusSpinny.showQueue.push({ message: message, fn: showFn });
        
        if (!StatusSpinny.showingQueue) {
            StatusSpinny.showingQueue = true;
            var runShowScheduler = function() {
                StatusSpinny.hide(100, null, function() {
                    if (StatusSpinny.showQueue.length > 2) {
                        var queuedShow = StatusSpinny.showQueue.shift();
                        while (StatusSpinny.showQueue.length > 1 && queuedShow.message == StatusSpinny.showQueue[1].message) {
                            StatusSpinny.showQueue = StatusSpinny.showQueue.slice(2);
                        }
                        queuedShow.fn();
                        
                    } else if (StatusSpinny.showQueue.length > 0) {
                        StatusSpinny.showQueue.shift().fn();
                        
                    } else {
                        StatusSpinny.showingQueue = false;
                        return null;
                    }
                    
                    window.setTimeout(runShowScheduler,1500);
                });
            }
            runShowScheduler();
        }
    },
    
    wouldShowAfter: function( afterTime, speed, spins, message, duration ) {
        var uniqueTimeoutID = StatusSpinny.timeoutId(),
            spinny = StatusSpinny.spinny();
        
        spinny.on(uniqueTimeoutID, function(){ StatusSpinny.show( speed, spins, message, duration ); });
        window.setTimeout(function(){ spinny.trigger( uniqueTimeoutID ); }, afterTime);
        
        return uniqueTimeoutID;
    },
    
    hide: function( speed, cancelID, animCB) {
        if (cancelID !== undefined && typeof cancelID == 'string') StatusSpinny.spinny().off( cancelID );
        
        if (speed === undefined) speed = 'fast';
        StatusSpinny.spinny().fadeOut(speed,animCB);
        StatusSpinny.isShown = false;
    },
    
    timeout: function(duration) {
        var uniqueTimeoutID = StatusSpinny.timeoutId(),
            spinny = StatusSpinny.spinny();
        
        spinny.on( uniqueTimeoutID, StatusSpinny.hide );
        StatusSpinny.timeouts.push( uniqueTimeoutID );
        
        window.setTimeout(function(){ spinny.trigger( uniqueTimeoutID ); }, duration);
    },
    
    resetTimeouts: function() {
        while (StatusSpinny.timeouts.length > 0) { StatusSpinny.spinny().off( StatusSpinny.timeouts.shift() ); };
    },
    
    timeoutId: function() {
        return (new Date()).getTime() + '' + Math.random();
    },
    
    zzz: null
};

$.extend( Url, {
    // Given a URL pointing to a YouTube or Vimeo video, returns an object with 'id' and 'type' properties.
    parseVideoURL: function(url) {
        var parts       = Url.toHash(url),
            params      = Url.parseQuery(parts.search),
            path        = parts.pathname.replace(/^\/*(.*?)\/*$/, "$1"),
            youtubeIDRe = /^[\w,\-]+$/, // could be tightened up
            vimeoIDRe   = /^\d+$/,
            id          = null,
            type        = null;
        if (parts.protocol) {
            // http://www.youtube.com/watch?v=nR6CY3pFjYM
            // https://www.youtube.com/watch?v=-MdTldrkJqE
            if ( /(^|\.)youtube\.com$/.test(parts.host) ) {
                if ( /^\/watch\/?$/.test(parts.pathname) && youtubeIDRe.test(params["v"]) ) {
                    id = params["v"];
                    type = "y";
                }
            }
            // http://youtu.be/nR6CY3pFjYM
            else if ( /(^|\.)youtu\.be$/.test(parts.host) ) {
                if ( youtubeIDRe.test(path) ) {
                    id = path;
                    type = "y";
                }
            }
            // http://vimeo.com/16981453
            else if ( /(^|\.)vimeo\.com$/.test(parts.host) ) {
                if ( vimeoIDRe.test(path) ) {
                    id = path;
                    type = "v";
                }
            }
        }
        return { id: id, type: type };
    },

    makeVideoUrl: function(videoID, videoType) {
        if (videoID) {
            switch (videoType) {
            case "y":
                return "http://www.youtube.com/watch?v=" + encodeURIComponent(videoID);
            case "v":
                return "http://vimeo.com/" + encodeURIComponent(videoID);
            }
        }
        return null;
    }
});
;
/* ------------- BEGIN identities.js --------------- */;
// The Identities global object provides a way for JS code to get information about the logged-in user 
// and their permissions with regards to the current page band.  It's similar to LoginIdentities on the 
// server-side.  This object can be initialized by calling enable_page_identities from the server-side 
// controller, which happens automatically when using enable_menubar.

/* exported Identities */
var Identities = (function ($) {
    'use strict';

    var instance = new IdentitiesVM( ($('#pagedata').data('blob') || {}).identities || {} );
    instance.BandVM = BandVM;
    instance.BandsMgr = BandsMgr;
    return instance;

    function IdentitiesVM(data) {
        var self = this;

        this.initialData = data;

        // User identities
        this.user = ko.observable(data.user);
        this.fan = ko.observable(data.fan);
        this.partner = ko.observable(data.partner);
        this.isAdmin = ko.observable(data.is_admin);

        // Which band/label's page are we on?
        this.pageBand = data.page_band && new BandVM(data.page_band);
        // Identities.bmgr - a BandsMgr for all the user's linked bands and labels
        this.bmgr = new BandsMgr(data.bands);

        // Identities.lmgr - a LabelsMgr that holds the data for the user's labels (including member bands)
        this.lmgr = new LabelsMgr(data.labels);

        // Identities.labels() - an array of labelVMs representing each of the user's labels
        this.labels = this.lmgr.labels;

        // Identities.labelIds() - an array of the user's label's IDs
        this.labelIds = ko.computed(function () {
            return Iter.collect(self.labels(), function (label) {
                return label.id;
            });
        });

        // Identities.linkedNonLabelBands() - an array of bands that are not label member bands (but might be labels)
        this.linkedNonLabelMemberBands = ko.computed(function () {
            return Iter.findAll(self.bmgr.bands(), function (b) {
                return !self.lmgr.isLabelMemberBand(b.id);
            });
        });

        // Identities.linkedNonLabelBands() - an array of bands that are neither labels nor label member bands
        this.linkedNonLabelBands = ko.computed(function () {
            return Iter.findAll(self.linkedNonLabelMemberBands(), function (b) {
                return $.inArray(b.id, self.labelIds()) === -1;
            });
        });

        // Identities.hasLabels() - (bool) does the user own any labels?
        this.hasLabels = ko.computed(function () {
            return self.labels().length > 0;
        });

        // If the user control's the page band's parent label, this is it.
        this.pageBandParentLabel = ko.computed(function () {
            return Iter.find(self.labels(), function (label) {
                return label.id === data.page_band_parent_label_id;
            });
        });
        // Identities.pageLabel() - either the page's label or the page band's parent label.
        var pageLabelForAdmin = data.page_label && new LabelVM(data.page_label);
        this.pageLabel = ko.computed(function () {
            return self.pageBandParentLabel() || (self.pageBand && self.labels() && Iter.find(self.labels(), function (label) {
                return label.id === self.pageBand.id;
            })) || pageLabelForAdmin;
        });


        // Who is the user?
        this.isPageBandMember = ko.observable(data.is_page_band_member);
        this.isParentLabel = ko.computed(function () {
            return !!self.pageBandParentLabel();
        });
        this.hasFullAccess = ko.computed(function () {
            return self.isPageBandMember() || self.isAdmin();
        });
        this.hasLimitedAccess = ko.computed(function () {
            return self.isParentLabel() && data.page_band && !data.page_band.authed;
        });

        this.isPageBand = function (bandID) {
            return self.pageBand && bandID === self.pageBand.id;
        };
        this.isMemberOfBand = function (bandID) {
            return self.bmgr.bandByID(bandID) || self.lmgr.isMemberBandAuthed(bandID);
        };

        this.subscribedToPageBand = ko.observable(data.subscribed_to_page_band || false);

        this.updateFromHash = function (updateHash) {
            if (updateHash.bands) {
                self.bmgr.updateBands(Iter.collect(updateHash.bands, function (b) {
                    return new BandVM(b);
                }));
            }
            if (updateHash.page_band && self.pageBand) {
                if (updateHash.page_band.name) {
                    self.pageBand.name(updateHash.page_band.name);
                }
                if (updateHash.page_band.photo) {
                    self.pageBand.photo(updateHash.page_band.photo);
                }
                if (updateHash.page_band.trackpipe_local_url) {
                    self.pageBand.trackpipeLocalUrl(updateHash.page_band.trackpipe_local_url);
                }
            }
        };

        /* Add a label/band to the user's identities. Takes an object with optional
         * properties 'labels' and 'bands':
         *      {
         *          'labels': [<label data object>, <label data object>, etc.]
         *          'bands': [<band data object>, <band data object>, etc.]
         *      }
         */
        this.add = function (newEntities) {
            if (newEntities.bands && newEntities.bands.length > 0) {
                self.bmgr.addBands(newEntities.bands);
            }
            if (newEntities.labels && newEntities.labels.length > 0) {
                self.lmgr.addLabels(newEntities.labels);
            }
        };

        /* Remove a label/band from the user's identities. Takes an object with optional
         * properties 'labels' and 'bands':
         *      {
         *          'labels': [<label id>, <label id>, etc.]
         *          'bands': [<band id>, <band id>, etc.]
         *      }
         */
        this.remove = function (entities) {
            if (entities.bands && entities.bands.length > 0) {
                self.bmgr.removeBands(entities.bands);
            }
            if (entities.labels && entities.labels.length > 0) {
                self.lmgr.removeLabels(entities.labels);
                self.bmgr.removeBands(entities.labels);
            }
        };
    }


    // The param to new() is an array of band objects, with:
    //      id, name, photo (image_id),
    //      trackpipe_url, trackpipe_local_url,
    //      is_pro, has_service, service_name, service_url_fragment
    function BandVM(data) {
        var self = this;

        this.id = data.id;
        this.name = ko.observable(data.name);
        this.photo = ko.observable(data.photo || (data.bio && data.bio.image_id));
        this.trackpipeUrl = ko.observable(data.trackpipe_url || data.url);
        this.trackpipeLocalUrl = ko.observable(data.trackpipe_local_url || data.url || data.trackpipe_url);
        this.trackpipeUrlHttps = ko.observable(data.trackpipe_url_https);
        this.isPro = ko.observable(data.is_pro);
        this.hasService = ko.observable(data.has_service);
        this.serviceName = ko.observable(data.service_name);
        this.serviceUrlFragment = ko.observable(data.service_url_fragment);
        this.isLabel = ko.observable(data.is_label);
        this.isLabelMemberBand = ko.observable(false);
    }


    // Utility object to maintain the view-model of a user's bands.
    //
    //      b = new BandsMgr(identity.bands);
    //
    // Returned object has:
    //      b.bands() -- knockout observable array of bands, sorted by name
    //      b.hasAnyShares() -- if any bands are co-managed by another user
    //      b.anyPro() -- if any bands are pro
    //      plus methods addBands(), bandByID(), removeBands()
    function BandsMgr(initial_bands) {
        var self = this,
            bandsArray;

        this.addBands = function (bands) {
            var newBandVMs, args;
            newBandVMs = Iter.collect(bands, function (b) {
                return (b instanceof BandVM) ? b : new BandVM(b);
            });
            args = [Number.MAX_VALUE, 0].concat(newBandVMs);
            bandsArray.splice.apply(bandsArray, args);
        };

        this.bandByID = function (band_id) {
            return Iter.find(bandsArray(), function (b) {
                return b.id === band_id;
            });
        };

        this.removeBands = function (band_ids) {
            var bandsToRemove = Iter.findAll(bandsArray(), function (b) {
                    return !!Iter.find(band_ids, function (id) {return id === b.id; });
                });
            bandsArray.removeAll(bandsToRemove);
        };

        this.updateBandName = function (bandId, newBandName) {
            var bandToUpdate = self.bandByID(bandId);
            if (bandToUpdate) {
                bandToUpdate.name(newBandName);
            }
        };

        this.updateBands = function (newArray) {
            bandsArray(newArray);
        };

        // We have an internal bands array that's used for all of the manipulations,
        // and then keep a throttled array for the rest of the world to see,
        // so that the view model that's linked to the bands array isn't thrashed
        // by sorting, inserting, etc.
        bandsArray = ko.observableArray(Iter.collect(initial_bands || [], function (b) {
            return new BandVM(b);
        }));

        this.bands = ko.computed(function () {
            var bands = bandsArray.slice(0);
            bands.sort(function (a, b) {
                a = a.name().toLowerCase();
                b = b.name().toLowerCase();
                return a < b ? -1 : a > b ? 1 : 0;
            });
            return bands;
        }).extend({throttle: 1});

        this.anyPro = ko.computed(function () {
            return !!Iter.find(bandsArray(), function (b) {
                return b.isPro();
            });
        });
    }


    function LabelVM(data) {
        var self = this;

        this.id = data.id;
        this.name = ko.observable(data.name);
        this.url = ko.observable(data.url);
        this.memberBands = ko.observableArray(Iter.collect(data.member_bands, function (band) {
            var bandVM = new BandVM(band);
            bandVM.isLabelMemberBand(true);
            bandVM.isAuthed = ko.observable(band.authed);
            return bandVM;
        }));
        this.memberBandIds = ko.computed(function () {
            return Iter.collect(self.memberBands(), function (memberBand) {
                return memberBand.id;
            });
        });
    }


    function LabelsMgr(initialLabels) {
        var self = this;

        this.labels = ko.observableArray(Iter.collect(initialLabels || [], function (label) {
            return new LabelVM(label);
        }));

        var memberBandsAuthHash = ko.computed(function () {
            var hash = {};
            Iter.each(self.labels(), function (label) {
                Iter.each(label.memberBands(), function (band) {
                    hash[band.id] = hash[band.id] || band.isAuthed();
                });
            });
            return hash;
        });
        this.isMemberBandAuthed = function (memberBandID) {
            return memberBandsAuthHash()[memberBandID];
        };
        this.isLabelMemberBand = function (memberBandID) {
            return memberBandID in memberBandsAuthHash();
        };

        this.labelByID = function (labelId) {
            return Iter.find(self.labels(), function (l) {
                return l.id === labelId;
            });
        };

        this.addLabels = function (labels) {
            var newLabelVMs = Iter.collect(labels, function (l) {
                    return new LabelVM(l);
                }),
                args = [Number.MAX_VALUE, 0].concat(newLabelVMs);
            self.labels.splice.apply(self.labels, args);
        };

        this.removeLabels = function (labelIds) {
            Iter.each(labelIds, function (labelId) {
                var labelToRemove = self.labelByID(labelId);
                self.labels.remove(labelToRemove);
            });
        };
    }
}(jQuery));
;
/* ------------- BEGIN menubar.js --------------- */;
/* global MenubarAdmin, Identities, AddExistingArtistDialog, AddNewArtistDialog, LabelAddItemDialog, Identities */

(function () {
'use strict';

function initializeMenuBar() {
    var mb = $("#menubar-vm");
    if (mb[0]) {
        var adminLevel = mb.data("initial-values").admin_level;
        if (adminLevel > 0) {
            MenubarAdmin.addMenuItems($("#user-nav .user-menu"), adminLevel);
        }

        var menubarVM = new MenubarVM();
        ko.applyBindings(menubarVM, mb[0]);
        mb.removeClass("loading");

        $("#menubar").bcmenubar({
            menu_position: {
                phone: {my: 'top', at: 'bottom', collision: 'flipfit'},
                other: {my: 'left top', at: 'left bottom'}
            }
        });

        $("#search-field").placeholder(); // polyfill hint text for older browsers.
    }
}

window.Menubar = {
    initialize: initializeMenuBar
};

$(function() {
    initializeMenuBar();
});

function MenubarVM() {
    var self;
    self = this;

    this.root = $("#menubar-vm");
    this.data = this.root.data("initial-values");
    this.forceNoControl = self.data.force_no_control;

    // Alias some properties and methods from Identities for succinctness.
    Iter.each([
            'fan',
            'isAdmin',
            'pageBand',
            'partner',
            'user'
        ], function (key) {
            self[key] = Identities[key];
        });

    this.showBandControls = ko.computed(function () {
        return Identities.pageBand && Identities.hasFullAccess() && !self.forceNoControl;
    });

    this.showLimitedAccessControls = ko.computed(function () {
        return Identities.pageBand && Identities.hasLimitedAccess() && !self.forceNoControl;
    });

    // Search
    this.search = new MenubarSearchVM();

    // Artists menu
    this.artistsMenu = new ArtistsMenuVM(this);

    // Stats
    this.statsLinkHref = ko.computed(function () {
        if (!self.pageBand) return '';
        if (Identities.isParentLabel()) {
            return Identities.pageBandParentLabel().url() + '/stats?band=' + self.pageBand.id;
        } else {
            return self.pageBand.trackpipeLocalUrl() + '/stats';
        }
    });

    // Orders
    this.ordersLinkHref = ko.computed(function () {
       if (!self.pageBand) return '';
       if (Identities.isParentLabel()) {
           return Identities.pageBandParentLabel().url() + '/merch_orders';
       } else {
           return self.pageBand.trackpipeLocalUrl() + '/merch_orders';
       }
    });

    this.fanWalkthroughClick = function () {
        Cookie.set('fan_walkthrough_restart_' + self.data.walkthrough_version, JSON.stringify({restart: true, fan_id: Identities.fan().id}), 60 * 60 * 24 * 7);
        return true; // continue with standard href navigation.
    };

    this.addAlbumClick = function () {
        return !LabelAddItemDialog.showDialog('album');
    };
    this.addTrackClick = function () {
        return !LabelAddItemDialog.showDialog('track');
    };
    this.addMerchClick = function () {
        // On edit_tralbum pages we open a new tab that automatically assigns the merch to the current album.
        if (window.EditTralbum && window.EditTralbum.viewModel && window.EditTralbum.viewModel.createNewMerch) {
            window.EditTralbum.viewModel.createNewMerch();
            return false;
        }
        else {
            return !LabelAddItemDialog.showDialog('merch');
        }
    };

    this.addNewArtist = function () {
        if (self.data.lapsed_or_cancelled_label) {
            window.location = self.data.lapsed_redirect_url;
            return;
        }
        AddNewArtistDialog.showDialog();
    };
    this.addExistingArtist = function () {
        if (self.data.lapsed_or_cancelled_label) {
            window.location = self.data.lapsed_redirect_url;
            return;
        }
        AddExistingArtistDialog.showDialog();
    };
}

function ArtistsMenuVM(menubar) {
    var self = this,
        maxRows = 9,
        maxCols = 3;
    this.menubar = menubar;

    // Alias some properties and methods from Identities for succinctness.
    Iter.each([
        'bmgr',
        'hasLabels',
        'isPageBand',
        'isPageBandMember',
        'isParentLabel',
        'linkedNonLabelMemberBands',
        'pageBandParentLabel',
        'pageLabel'
    ], function (key) {
        self[key] = Identities[key];
    });

    // Keep this display logic in sync with menubar.liquid!
    this.toolsProfileBand = ko.computed(function () {
        if (menubar.showBandControls() || menubar.showLimitedAccessControls()) {
            return menubar.pageBand;
        } 
        else if (self.bmgr.bands().length === 1) {
            return self.bmgr.bands()[0];
        } 
        else return null;
    });

    this.options = ko.computed(function () {
        var b = self.toolsProfileBand();
        return {
            title: b ? b.name() : 'artists',
            showPhoto: !!b,
            photo: b ? b.photo() : null,
            showPro: b ? b.isPro() : self.bmgr.anyPro(),
            toolsProfileEditable: b && (Identities.isMemberOfBand(b.id) || menubar.isAdmin()),
            adminAccess: b && !self.isPageBandMember() && menubar.isAdmin()
        };
    });

    this.pageLabelMemberBands = ko.computed(function () {
        if (self.pageLabel()) {
            return self.pageLabel().memberBands();
        }
        else if (Identities.lmgr && Identities.lmgr.labels()) {
            var memberBands = [];
            Iter.each(Identities.lmgr.labels(), function(label) {
                memberBands = memberBands.concat(label.memberBands());
            });
            return memberBands;
        } 
        else return [];
    });

    // override to remove the page label – we don't want it in the "other linked artists/labels" section
    this.otherLinkedAccounts = ko.computed(function () {
        return Iter.findAll(self.linkedNonLabelMemberBands(), function (band) {
            return (!self.pageLabel() || band.id !== self.pageLabel().id) && (!self.toolsProfileBand() || band.id !== self.toolsProfileBand().id);
        });
    });

    this.columns = ko.computed(function () {
        var numLabelBands = self.pageLabelMemberBands().length,
            numLinkedBands = self.otherLinkedAccounts().length,
            totalBands = numLabelBands + numLinkedBands;

        if (!self.hasLabels()) return 1;
        if (totalBands > (maxRows * maxCols - 1)) return maxCols;
        return Math.floor((totalBands - 1) / maxRows) + 1;
    });

    function numberOfBandsToShow() {
        var numLabelBands = self.pageLabelMemberBands().length,
            numLabelBandRows = Math.ceil(numLabelBands / self.columns()),
            numLinkedBands = self.otherLinkedAccounts().length,
            numLinkedBandRows = Math.ceil(numLinkedBands / self.columns()),
            totalRows = numLabelBandRows + numLinkedBandRows,
            labelBandsDisplayed,
            linkedBandsDisplayed;

        if (totalRows < maxRows || !self.hasLabels()) {
            return {
                'labelBands': numLabelBands,
                'linkedBands': numLinkedBands
            };
        }
        if (numLinkedBands < numLabelBands) {
            labelBandsDisplayed = ((maxRows - numLinkedBandRows) * self.columns()) - 1;
            return {
                'labelBands': labelBandsDisplayed,
                'labelBandsOverflow': numLabelBands - labelBandsDisplayed,
                'linkedBands': numLinkedBands
            };
        } else {
            linkedBandsDisplayed = ((maxRows - numLabelBandRows) * self.columns()) - 1;
            return {
                'labelBands': numLabelBands,
                'linkedBands': linkedBandsDisplayed,
                'linkedBandsOverflow': numLinkedBands - linkedBandsDisplayed
            };
        }
    }

    // return an array of arrays ready for the multi-column artist menu
    function columnize(bands, limit) {
        var lbands, colHeight, columns;
        lbands = bands.slice(0, limit);
        // sort band names alphabetically
        lbands = lbands.sort(function (a,b) {
            if (a.name() < b.name())
                return -1;
            if (a.name() > b.name())
                return 1;
            return 0;
        });

        colHeight = Math.ceil(lbands.length / self.columns());
        columns = [];

        while (lbands.length > 0) {
            columns.push({bands: lbands.splice(0, colHeight)});
        }
        return columns;
    }

    this.labelBands = ko.computed(function () {
        return self.hasLabels() ? columnize(self.pageLabelMemberBands(), numberOfBandsToShow().labelBands) : null;
    });

    this.labelBandsOverflow = ko.computed(function () {
        return numberOfBandsToShow().labelBandsOverflow;
    });

    this.linkedBands = ko.computed(function () {
        return columnize(self.otherLinkedAccounts(), numberOfBandsToShow().linkedBands);
    });

    this.linkedBandsOverflow = ko.computed(function () {
        return numberOfBandsToShow().linkedBandsOverflow;
    });
}

function MenubarSearchVM() {
    var self = this;

    this.inputField = ko.observable('');
    this.userInput = ko.computed(function () {
        return (self.inputField() === self.hint) ? "" : self.inputField();
    });
    this.validate = function () {
        if (/^\s*$/.test(self.userInput())) {
            window.alert("Please enter an artist name, track or album name.");
            return false;
        }
        return true;
    };
}

})();
;
/* ------------- BEGIN jquery.event.move.js --------------- */;
// jquery.event.move
//
// 1.0.2
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function(jQuery, undefined){
	var threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };
	
	// Constructors
	
	function Timer(fn){
		var callback = fn,
				active = false,
				running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}
	
	// Functions
	
	function returnFalse(e) {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}

	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			pageX: e.pageX,
			pageY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, removeMouse);
	}

	function touchstart(e) {
		var touch, data;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so let's copy the data. This object will act as a template for
		// movestart, move and moveend events.
		data = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			pageX: touch.pageX,
			pageY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, data);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, data);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var data = e.data,
		    touch = identifiedTouch(e.changedTouches, data.identifier);

		if (!touch) { return; }

		removeTouch(data);
	}

	function removeTouch(touchstart) {
		remove(document, '.' + touchstart.identifier, touchmove);
		remove(document, '.' + touchstart.identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, data, touch, fn) {
		var distX = touch.pageX - data.startX,
		    distY = touch.pageY - data.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		return triggerStart(e, data, touch, distX, distY, fn);
	}

	function triggerStart(e, data, touch, distX, distY, fn) {
		var node = data.target,
		    events, touches, time;

		// Climb the parents of this target to find out if one of the
		// move events is bound somewhere. This is an optimisation that
		// may or may not be good. I should test.
		while (node !== document.documentElement) {
			events = jQuery.data(node, 'events');
			
			// Test to see if one of the move events has been bound.
			if (events && (events.movestart || events.move || events.moveend)) {
				touches = e.targetTouches;
				time = e.timeStamp - data.timeStamp;

				data.type = 'movestart';
				data.distX = distX;
				data.distY = distY;
				data.deltaX = distX;
				data.deltaY = distY;
				data.pageX = touch.pageX;
				data.pageY = touch.pageY;
				data.velocityX = distX / time;
				data.velocityY = distY / time;
				data.targetTouches = touches;
				data.finger = touches ? touches.length : 1;

				// Trigger the movestart event using data as a template, and pass
				// a clean copy of data for use as a template for the move and
				// moveend events. Also, pass the touchmove event so it can be
				// prevented when movestart is fired.
				trigger(data.target, data, [data, e]);

				return fn(data);
			}
			
			node = node.parentNode;
		}
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var event = e.data.event,
		    timer = e.data.timer;

		updateEvent(event, e, e.timeStamp, timer);
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		updateEvent(event, touch, e.timeStamp, timer);
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		// Average the velocity of the last few events over a decay curve
		// to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;

		timer.kick();
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}


	// jQuery special event definition

	function isSetup(events) {
        if (!events) return false;

		return ((events.movestart ? 1 : 0) +
		        (events.move ? 1 : 0) +
		        (events.moveend ? 1 : 0)) > 1;
	}

	function setup(data, namespaces, eventHandle) {
		var events = jQuery.data(this, 'events');

		// If another move event is already setup, don't setup again.
		if (isSetup(events)) { return; }
		
		// Stop the node from being dragged
		add(this, 'dragstart.move drag.move', preventDefault);
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.move', preventIgnoreTags);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function teardown(namespaces) {
		var events = jQuery.data(this, 'events');

		// If another move event is already setup, don't setup again.
		if (isSetup(events)) { return; }
		
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,

		_default: function(e, event, touchmove) {
			var data = {
			      event: event,
			      timer: new Timer(function(time){
			        trigger(e.target, event);
			      })
			    };

			if (event.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(event.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				touchmove.preventDefault();
				
				add(document, touchevents.move + '.' + event.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + event.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move =
	jQuery.event.special.moveend = {
		setup: setup,
		teardown: teardown
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);
	
})(jQuery);


// Make jQuery copy touch event properties over to the jQuery event
// object, if they are not already listed. But only do the ones we
// really need.

(function(jQuery, undefined){
	var props = ["changedTouches", "targetTouches"],
	    l = props.length,
        eprops = jQuery.event.props;

	while (l--) {
// BANDCAMP: I changed a usage of array.indexOf to a manual search; not avail on IE8 --kj 2012-08-10
        var prop = props[l];
        var found = false;
        for(var i=0,n=eprops.length; i<n; ++i) {
            if( eprops[l] == prop ) {
                found = true;
                break;
            }
        }
		if (!found) {
			eprops.push(prop);
		}
	}
})(jQuery);
;
/* ------------- BEGIN popup_image.js --------------- */;

// Shows an image over the page, generally a large image popping up from a thumbnail.
/* For easiest use with best visual results, create markup like so:

    <div class="popupImageGallery">
        <a class="popupImage" href="largeImage1.jpg" data-image-size="<width>,<height>">
            <img src="thumbImage1.jpg">
        </a>
        <a class="popupImage" href="largeImage2.jpg" data-image-size="<width>,<height>">
            <img src="thumbImage2.jpg">
        </a>
        ...
    </div>

    ...where "<width>,<height>" is the size of the large image, e.g. "700,500".  This
    provides an aspect ratio that allows the frame to be shown immediately and show
    the image progressively.  If size info is missing (some older image stores don't
    have it handy) the library will show a loading indicator on top of the thumb image.

    Attach like so:

        PopupImage.attach( "a.popupImage" );
            or
        PopupImage.attach( arrayOfElementsIAlreadyHaveHandy );

    For dynamic content inside a container, you can call install once at page load like so,
    if your links have class popupImage:

        PopupImage.delegate( "containerSpec" );
            or
        PopupImage.delegate( containerJustLyingAround );

    A container element (any one, doesn't have to be the one doing the delegation) has to
    have the class popupImageGallery if you want next/prev navigation.

    When attaching directly, the target image will be preloaded if the data-image-preload
    attribute is set.  This is not supported for delegated handling.

    Requires: 
    - jquery_moveswipe/jquery.event.move.js for the phone gallery

*/

var PopupImage = {

    _urls: [],
    _imgs: [],
    _preloading: false,
    _imgSizes: {},

    // Attach as a click handler on a set of elements (generally anchors).
    // If the elements have data-image-preload attributes, the image will be fetched immediately.
    //
    attach: function( elts ) {
        elts = $( elts );

        Dom.hackLinkClicksThanksSafari( elts, PopupImage.click );

        this.preload( elts, true );
    },

    // Attach to the container element as a delegate, applied to all "a.popupImage" therein.
    // Apply once for dynamic content.
    //
    delegate: function( container ) {
        // TODO: This does not yet support the "hackLinkClicksThanksSafari" fix for
        // mobile-Safari's spastic location bar.  It is not needed for tralbum pages,
        // which is our first mobile focus; we can revisit this for mobile discovery.
        // kj 2012-07-20

        $( container ).delegate( "a.popupImage", "click", PopupImage.click );
    },

    // Call on a batch of elements whose popup images you want preloaded.
    // Called automatically for links that have been attached.
    //
    preload: function( elts, check_attribute ) {
        if ( window.MediaView && MediaView.mode != "desktop" )
            return;

        var self = this;
        $( elts ).each( function( index, elt ) {
                if ( !check_attribute || ( elt.getAttribute( "data-image-preload" ) == "true" ) ) {
                    // TODO: ideally this would come back and set the element's data-image-size
                    self._urls.push( elt.getAttribute( "href" ));
                }
            } );

        if ( this._urls.length && !this._preloading ) {
            this._preloader();
        }
    },

    // If you have your own URLs for the preloader, call this.
    // TODO: split out the image preloading into it's own lib.
    preload_url: function( url ) {
        this._urls.push( url );
        if ( !this._preloading ) {
            this._preloader();
        }
    },

    // --------------------------------------------------

    _preloader: function() {
        if ( this._urls.length ) {
            this._preloading = true;
            this._imgs.push( CommUtils.loadImage( this._urls.shift() ) );
            // Log.debug( "PopupImage preloading " + this._imgs[ this._imgs.length-1 ].src );
            if ( this._urls.length ) {
                var self = this;
                // we don't wait for each to load, but we do stagger them out
                setTimeout( function() { self._preloader(); self = null; }, 100 );
            } else {
                this._preloading = false;
                // Log.debug( "PopupImage stopping preload" );
            }
        }
    },

    // Click handler to attach directly to elements
    //
    click: function( ev ) {
        if ( ev.ctrlKey || ev.metaKey ) return;

        var targetLink = ev.currentTarget;
        if ( targetLink && targetLink.tagName != "A" ) {
            targetLink = $( targetLink ).parents( "A" )[0];
        }

        if ( PopupImage.showFor( targetLink, false )) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    },

    // Call with a source element in <a><img></a> form
    //
    showFor: function( targetLink, skipZoom ) {
        this.dismiss();

        var url = targetLink && targetLink.href;
        if ( !url ) return false;

        var statclick = targetLink.getAttribute("data-statclick");
        if (statclick && statclick.length > 0) {
            Stats.record({kind:"click", click: statclick});
        }

        if ( targetLink.getAttribute("data-image-error") ) {
            Log.debug( "bailing on popup due to image load error: " + url );
            // error during previous load attempt
            return false;
        }

        var size = PopupImage.getCachedImageSize(targetLink);
        var test_ui = false;
        if ( size && size.w && size.h && !test_ui) {
            // We have width and height info-- can show it directly
            Log.debug("PopupImage.showFor: got cached image size; showing image immediately");
            PopupImage.show( url, size.w, size.h, targetLink, skipZoom );
            return true;
        }
        Log.debug("PopupImage.showFor: no cached image size; delaying image display");

        // We don't have width and height info-- load the image, then show it

        // By default (inline layout), A's have no size when all they contain is an image.
        // Use the image for geometry.
        
        var targetItem = $( targetLink ).find( "IMG" )[0] || targetLink

        var loading_indicator = document.createElement( "div" );

        loading_indicator.className = "popupimage_loading";
        loading_indicator.style.top = targetItem.offsetTop + "px";
        loading_indicator.style.left = targetItem.offsetLeft + "px";
        loading_indicator.style.width = targetItem.offsetWidth + "px";
        loading_indicator.style.height = targetItem.offsetHeight + "px";

        if ( targetItem.offsetWidth < 200 || targetItem.offsetHeight < 200 )
            loading_indicator.innerHTML = "<div class='popupimage_spinny_sm'></div>";
        else
            loading_indicator.innerHTML = "<div class='popupimage_spinny_lg'></div>";

        loading_indicator.style.opacity = 0;
        targetItem.offsetParent.appendChild( loading_indicator );

        $( loading_indicator ).delay( 500 ).fadeTo( "fast", 0.5 );

        var img;
        
            var dismiss_loading = function() {
                if ( loading_indicator )
                    loading_indicator.parentNode.removeChild( loading_indicator );
                loading_indicator = null;
            };

            var finishit = function() {
                img = new Image();

                img.onload = function() {
                    PopupImage._imgSizes[img.src] = { w: img.width, h: img.height };
                    PopupImage.show( img.src, img.width, img.height, targetLink, skipZoom );
    
                    img.onload = img.onerror = null;
                    targetLink = img = url = null; // break closure
                    dismiss_loading();
                };
                img.onerror = function() {
                    Log.debug( "image load error: " + url );
                    targetLink.setAttribute( "data-image-error", "1" );
                    img.onload = img.onerror = null;
                    targetLink = img = url = null;
                    dismiss_loading();
                }

                img.src = url;
            };

            var cancelit = function() {
                img.onload = img.onerror = null;
                img.src = null;
                img = null;
                dismiss_loading();
            };

        if ( test_ui ) {
            loading_indicator.onclick = finishit;
        } else {
            loading_indicator.onclick = cancelit;
            finishit();
        }
        
        return true;
    }, 

    // Roll-your-own popup image-- provide URL, size and src element to zoom from
    //
    show: function( url, width, height, src_image, skipZoom ) {
        if( window.FacebookData ) {
            var patchYui = true;
            FacebookUtils.correctSrollThen( patchYui, PopupImage, PopupImage.show_inner,  url, width, height, src_image, skipZoom );
        } else {
            this.show_inner(url, width, height, src_image, skipZoom); 
        }
    }, 
    
    show_inner: function( url, width, height, src_image, skipZoom ) {
        
        if ( window.MediaView && window.MediaView.mode == "phone" ) {
            return this.show_mobile( url, width, height, src_image, skipZoom );
        }

        var lib = this;
        
        lib.dismiss();
        
        // Could combine this event listener and the lib function, but
        // I'm wary of 'this' confusion (lib versus element)
        var dismiss = function() {
            lib.dismiss( this );
        };
        
        var D = Y.util.Dom;
        var vwrheight = D.getDocumentHeight();
        var vwrleft = D.getDocumentScrollLeft();
        var vwrtop = D.getDocumentScrollTop() + 40;
            // default placement from top of window;
            // results in a little more than 40, visually,
            // because of a table row that holds the close box

        if ( width && height ) { // old [dev-only] images don't have these
            
            // minimum gutter 20px all around, plus extra clearance for the close box
            var portwidth = D.getViewportWidth() - 60, portheight = D.getViewportHeight() - 60;

            if (( portwidth / portheight ) > ( width / height )) {
                // port has wider aspect ratio, adjust to fit the height:
                if ( height > portheight ) {
                    width *= portheight / height;
                    height = portheight;
                } // else show natural size
            } else {
                // port has taller aspect ratio, adjust to fit the width:
                if ( width > portwidth ) {
                    height *= portwidth / width;
                    width = portwidth;
                } // else show natural size
            }

            // larger images? less breathing room at the top
            if ( height > portheight - 80 ) {
                var idealtop = ( portheight - height ) / 2;
            } else
                var idealtop = 60

            // we've computed an ideal placement based on image size.
            // adjust for the fact that the table has a row above the image
            // which is largely invisible (holds the close box, which is offset downwards)
            vwrtop = D.getDocumentScrollTop() + idealtop - 20;
        }
        
        var do_zoom = !skipZoom && ( src_image != null );
        // Log.debug( "popup image zoom: " + do_zoom );

        url = url.replace( /'/g, "\\'" );
        var img_vwr = document.createElement( "div" );
        img_vwr.className = "imageviewer_top";
        img_vwr.onclick = dismiss;
        
        if ( window.FacebookData )
            var tableDef = "<table align=center style='position:absolute; top:" + vwrtop + "px;left:" + "20px'><tr><td>" ;
        else
            var tableDef = "<table align=center style='position:relative; top:" + vwrtop + "px;left:" + vwrleft + "px'><tr><td>";
        
        var disableNav = !!window.FacebookData
        var hasNext = ( !disableNav ) && this.hasNext( src_image );
        var hasPrev = ( !disableNav ) && this.hasPrev( src_image );
        
        img_vwr.innerHTML = "<div id='popupimage_back' class='imageviewer_back' style='" + ( do_zoom ? "visibilityx: hidden; " : "" ) + 
                                "height:" + vwrheight + "px;width:100%'></div>" +
                             tableDef +
                            "<div id='popupimage_dismiss' class='imageviewer_dismiss'" + ( do_zoom ? "style='visibility: hidden;' " : "" ) + "></div>" +
                            // sizing the TD reduces the cost of the animation, since the table won't have to be re-laid-out:
                            "</td></tr><tr><td " + ( width ? (" width='" + width + "px'") : "" ) + ( height ? (" height='" + height + "px'") : "" ) + ">" +
                            "<a onclick='return false' target='_blank' style='position:relative;display:inline-block;' href='" + url + "'>" +
                                "<img id='popupimage_image' class='imageviewer_image' src='" + url + "'" +
                                    ( width ? (" width='" + width + "px'") : "" ) + ( height ? (" height='" + height + "px'") : "" ) +
                                    ( do_zoom ? "style='position: relative; visibility: hidden; opacity: 0.5; filter: alpha(opacity=50);' " : "" ) + " />" +
                                ( hasPrev ? ( "<span class='imageviewer_nav prev' " + (do_zoom?"style='display:none;'":"") +
                                                                " onclick='PopupImage.goPrev(event);'><span class='imageviewer_navicon prev'></span></span>" ) : "" ) +
                                ( hasNext ? ( "<span class='imageviewer_nav next' " + (do_zoom?"style='display:none;'":"") +
                                                                " onclick='PopupImage.goNext(event);'><span class='imageviewer_navicon next'></span></span>" ) : "" ) +
                            "</a>" +
                            "</td></tr></table>" +
                            "</div>";

        document.body.appendChild( img_vwr );

        lib._current = img_vwr;
        lib._currentSrc = src_image;

        if ( !lib._keys ) {
            var kl = Y.util.KeyListener;
            lib._keys = new kl(
                document,
                { ctrl: false,
                  meta: false, 
                  keys: [ kl.KEY.ESCAPE, kl.KEY.ENTER, kl.KEY.SPACE,
                          kl.KEY.DOWN, kl.KEY.LEFT, kl.KEY.RIGHT, kl.KEY.UP ] },
                { fn: function( type, args ) {
                        if( type == "keyPressed" ) {
                            switch ( args[0] ) {
                            case kl.KEY.ESCAPE:
                            case kl.KEY.ENTER:
                            case kl.KEY.SPACE:
                                lib.dismiss();
                                break;
                            case kl.KEY.LEFT:
                            case kl.KEY.UP:
                                if ( !disableNav ) lib.goPrev();
                                break;
                            case kl.KEY.RIGHT:
                            case kl.KEY.DOWN:
                                if ( !disableNav ) lib.goNext();
                                break;
                            };
                        }
                      } }
            );
        }
        lib._keys.enable();

        if ( do_zoom ) {
            // optional zoom-up behavior if given a source element

            var the_image = elt( "popupimage_image" );
            var dest_xy = Y.util.Dom.getXY( the_image );
            var dest_wh = [ the_image.width, the_image.height ]
            var aspect = ( the_image.width * 1.0 ) / the_image.height;

            var src_xy = Y.util.Dom.getXY( src_image );
                
            var center_by_width = src_image.offsetHeight > src_image.offsetWidth;
            
            start_width = src_image.offsetWidth;
            start_height = src_image.offsetHeight;
            var src_wh = center_by_width ? [ start_width, start_width / aspect ] :
                                           [ start_height * aspect, start_height ]
            // src aspect might be different (square), compute small-image bounds from center point:
            if ( center_by_width ) {
                src_xy[1] += ( src_image.offsetHeight / 2 ) - Math.round( ( src_wh[0] / aspect ) / 2 );
            } else {
                src_xy[0] += ( src_image.offsetWidth / 2 ) - Math.round( ( src_wh[1] * aspect ) / 2 );
            }

            // The above calculations give a full zoom from thumb size to full size.
            // Testing something different: Move to the halfway point of a full animation.
            src_xy[0] += Math.round(( dest_xy[0] - src_xy[0] ) / 2 );
            src_xy[1] += Math.round(( dest_xy[1] - src_xy[1] ) / 2 );
            src_wh[0] += Math.round(( dest_wh[0] - src_wh[0] ) / 2 );
            src_wh[1] += Math.round(( dest_wh[1] - src_wh[1] ) / 2 );

            the_image.width = src_wh[0] + "px";
            the_image.height = src_wh[1] + "px";
            the_image.left = ( src_xy[0] - dest_xy[0] ) + "px";
            the_image.top = ( src_xy[1] - dest_xy[1] ) + "px";
            the_image.style.visibility = 'visible';

            var atts = {
                opacity: { to: 0.90, from: 0.33 },
                width: { to: dest_wh[0], from: src_wh[0] },
                height: { to: dest_wh[1], from: src_wh[1] },
                left: { to: 0, from: src_xy[0] - dest_xy[0] },
                top: { to: 0, from: src_xy[1] - dest_xy[1] }
            };
            anim = new YAHOO.util.Anim ( the_image, atts, 0.20 );
            
            anim.onComplete.subscribe( function(){
                    elt( "popupimage_dismiss" ).style.visibility = 'visible';
                    var st = elt( "popupimage_image" ).style;
                    st.position = st.opacity = st.filter = '';
                    $( ".imageviewer_nav" ).css( "display", "inline-block" );
                    // Log.debug( "zoom done; popup image top: " + elt('popupimage_image').style.top );
                } );
            anim.animate();

            the_image = src_image = null; // kill closures
        }

        img_vwr = null; // kill closure

        return  elt( "popupimage_image" );
    },
    
    show_mobile: function( url, width, height, srcImage, skipZoom ) {
        // Dumped unceremoniously into the middle of the old code.
        // Will move out after it's polished. -- kj
        var phoneView = window.MediaView && window.MediaView.mode == "phone";

        // HACK: we shouldn't popup already-large things on mobile; it's pointless.  (Unless we add zooming.)
        // Maybe we should determine this up front and add a hint to the markup, but for now we skip
        // things (chiefly tralbum page cover art) that are bigger than half the viewport width.
        // 
        // Ordinary (non-block-fied) links that contain images have zero-size width/height.  Use the image.
        // 
        if ( phoneView && ( $( srcImage ).find('img').outerWidth() > ( $( window ).width() / 2 ))) {
            // Additional check: if this image is part of a gallery, go ahead and show it
            var gallery = $( srcImage ).closest( ".popupImageGallery" )
            if ( gallery.find( '.popupImage' ).length <= 1 ) // could be zero if no enclosing gallery
                return false;
        }

        // Fun fact: Firefox actually has some issues with hoisting functions declared inside non-function
        // blocks (e.g. try or if).  So I heavily restructured this from a previous revision to move most
        // declarations forward.  --kj 2012-08-01

        var galleryElt = null, currentItem = null, widgets = null;


        // --- builds and shows the gallery

            function getPortSize() {
                var size = {
                    w: $( window ).width(),
                    h: $( window ).height()
                };
                if ( !phoneView ) {
                    // TODO: cheap way to get some spacing around the image, on desktops
                    // (we prefer flush-fullscreen on phones).  Can this be achieved in CSS?
                    // Put padding on the gallery, measure the inner width of it? --kj
                    size.w -= 40;
                    size.h -= 60;
                }
                return size;
            }

            function build( goto_url ) {
                Log.debug("PopupImage.build; goto_url: ", goto_url);

                var src_thumb = $( srcImage ).closest( ".popupImage" );
                var src_gallery = $( srcImage ).closest( ".popupImageGallery" )
                if ( src_gallery.length > 0 )
                    var all_thumbs = src_gallery.find( ".popupImage" );
                else
                    var all_thumbs = $( src_thumb );

                var portSize = getPortSize();

                // Log.note( goto_url ? ( 'passed-in go url: ' + goto_url ) :
                //                     ( 'src image url: ' + ( srcImage ? srcImage.getAttribute('src') : "not found" )));
                // Log.note( [ "w:", portSize.w, "h:", portSize.h, "o:", window.orientation ].join(" ") );
    
                // --- render
    
                galleryElt = $( "<div class='popupimage_gallery'></div>" );
    
                $( "<span class='popupimage_widget popupimage_nav dismiss'><span class='popupimage_navicon dismiss'></span></span>" )
                        .appendTo( galleryElt )
                        .bind( "click", function(e){ dismiss() } );
    
                $( "<span class='popupimage_widget popupimage_nav prev'><span class='popupimage_navicon prev'></span></span>" )
                        .appendTo( galleryElt )
                        .bind( "click", function(e){ goPrev( e, currentItem ) } );
    
                $( "<span class='popupimage_widget popupimage_nav next'><span class='popupimage_navicon next'></span></span>" )
                        .appendTo( galleryElt )
                        .bind( "click", function(e){ goNext( e, currentItem ) } );

                widgets = galleryElt.find( ".popupimage_widget" );
    
                var galleryCtr = $( "<ul class='popupimage_container'></ul>" )
                                 .css( "width", ( 101 * all_thumbs.length ) + "%" )
                                 .appendTo( galleryElt );
        
                // I'm taking a shortcut here and always rendering the entire gallery; a
                // more-general solution would render at most three elements, and swirl them
                // around on navigation-- better for large galleries on limited-capability
                // devices.  We max out at 5 items for all galleries, currently. -- kj
                // 
                // UPDATE: the non-current urls are stuffed into a data attribute at initial render,
                // then we update the actual img source (and neighbors) as we navigate.
        
                goto_url = goto_url || src_thumb.attr( 'href' );

                all_thumbs.each( function(i) {
                    var this_thumb = $(this),
                        this_url = this_thumb.attr( 'href' ),
                        this_size = PopupImage.limitImageSize( 
                            ( PopupImage.getCachedImageSize(this_thumb) || {} ), 
                            portSize 
                        ),
                        show_image = (this_url == goto_url) && this_size.w && this_size.h;

                    var html = ( "<li class='popupimage_item' id='popupimage_item_" + i + "' style='width:" + portSize.w + "px;'>" + 
                                       "<img " + (( this_url == goto_url ) ? "src" : "data-src" ) + "='" + this_url + "'" +
                                            " style='display:" + (show_image ? "block" : "none") + ";" + 
                                                " width:" + (show_image ? this_size.w + "px" : "auto") + ";" +
                                                " height:" + (show_image ? this_size.h + "px" : "auto") + ";" +
                                            "'>" +
                                   "</li>" );
                    // Log.debug(html);
                    galleryCtr.append(html);
                } );

                // --- bind events
        
                var container_left = 0;
                var start_x = null, min_x = null, max_x = null;
                var touch_action = null;

                galleryCtr.find( ".popupimage_item" )
                    .bind('touchstart', function(ev) {
                        touch_action = "start";

                        // immediately load neighbors in case this image is still loading
                        loadNeighbors( self );

                        // Not using these currently-- could use the min/max to
                        // compute a better "total distance moved" in conjunction
                        // with the final velocity-- this would let you start a
                        // move in one direction then finish it in another, which
                        // the iOS app screens do. --kj
                        // 
                        // if ( ev.targetTouches.length == 1 ) {
                        //     start_x = min_x = max_x = ev.targetTouches[0].clientX;
                        // }
                    })
                    .bind('touchmove', function(ev) {
                        touch_action = "moving";
                        // if ( ev.targetTouches.length == 1 ) {
                        //     min_x = Math.min( min_x, ev.targetTouches[0].clientX );
                        //     max_x = Math.max( max_x, ev.targetTouches[0].clientX );
                        // }
                    })
                    .bind('movestart', function(ev) {
                        container_left = $( this ).closest('.popupimage_container')[0].offsetLeft;
                        currentItem = $(this);
                        touch_action = "start";
                        // Log.note( "move start: " + touch_action );
                    })
                    .bind('move', function(ev) {
                        try {
                            if (( touch_action == "ignore" ) || ( Math.abs( ev.distY ) > Math.abs( ev.distX ))) {
                                goTo( ev, currentItem );
                                touch_action = "ignore";
                                return false;
                            }
    
                            touch_action = "moving";
                            var the_ctr = $(this).closest( ".popupimage_container" );
    
                            // for reasons i haven't figured out (related to nested elements?), the
                            // accumulated delta is less than the total distance reported, leading
                            // to drag-lagging if you use it to track the move; this was the original code:
                            // the_ctr.css({ left: ( the_ctr[0].offsetLeft + ev.deltaX ) + "px" });
                            // turns out i need the overall dist for other things, anyway.
    
                            var dist = ev.distX
                            // show end-of-the-road feedback: half-speed dragging
                            if ( dist > 0 && !hasPrev( $(this) )) {
                                dist = Math.round( dist / 2.5 );
                            } else if ( dist < 0 && !hasNext( $(this) )) {
                                dist = Math.round( dist / 2.5 );
                            }
    
                            the_ctr.css({ left: container_left + dist });
                        } catch( e ) {
                            Log.note( "move error: " + e.message );
                        }
                    }).bind('moveend', function(ev) {
                        if ( touch_action == "moving" ) {
                            // Log.note( "moveend moving", ev );
                            touch_action = ( finishMove( ev, this ) ? "moved" : "revert" );
                        } else {
                            Log.note( "moveend not moving: " + touch_action );
                        }
                    }).bind('click', function(ev){
                        if ( ev.target == this ) {
                            // direct tap/click on LI, not on image? dismiss
                            dismiss();
                            return;
                        }
                    
                        ev.stopPropagation();
                        switch ( touch_action ) {
                        case "moved": case "moving":
                        case "revert": case "ignore":
                            // Log.note ( "click: ignoring because: " + touch_action );
                            break; // nada
    
                        default:
                            touch_action = "click";
                            var elt = $(this);
                            if ( ev.clientX > ( this.offsetWidth * 0.67 ))
                                goNext( ev, this );
                            else if ( ev.clientX < ( this.offsetWidth * 0.33 ))
                                goPrev( ev, this );
                            else
                                dismiss();
                        }
                    });

                galleryCtr.find( ".popupimage_item img" ).bind('load', imgLoaded);

                globalListenersOn();
                
                $( document.body ).append( galleryElt );
                Dom.hideEverythingThanksAndroid( galleryElt[0] );
                
                // navigate to the popup image matching the clicked item that spawned us:
                galleryElt.find( ".popupimage_item" ).each( function( index, elt ) {
                        elt = $( elt );
                        if ( elt.find( 'img' ).attr( 'src' ) == goto_url ) {
                            currentItem = elt;
                        }
                    });
    
                goTo( null, currentItem, true );

            }


        // --- image loading

            function imgLoaded( ev ) {
                var img = $(this),
                    imgEl = this;

                clearBusy( img.closest(".popupimage_item") );

                if (imgEl && (imgEl.style.width == "auto") && (imgEl.style.height == "auto")) {
                    // in IE 10, it appears we need to remove display:none *before* we can measure the image dimensions.
                    // In Mobile Safari this causes visible jumping, so we do it below.
                    // We previously hid it to avoid broken img icons.
                    if (Browser.type == "ie")
                        img.css({display: "block" });

                    var size = { w: img.prop("width"), h: img.prop("height") };
                    PopupImage._imgSizes[ img.attr("src") ] = size;

                    // adjust the display size of the image, now that we have its intrinsic dimensions
                    var limitedSize = PopupImage.limitImageSize(size, getPortSize());
                    img.css({ width: limitedSize.w + "px", height: limitedSize.h + "px", display: "block" });
                   
                    Log.debug( "PopupImage: image loaded -- width: ", size.w, "height: ", size.h, imgEl );
                }

                loadNeighbors( this );
            }

            // called when an image finishes loading, or when we start a navigation
            // if that happens before we get the load event
            // 
            function loadNeighbors( item ) {
                var item = $( item ).closest( ".popupimage_item" );
                // load neighbors in either direction
                loadImg( item.prev( ".popupimage_item"));
                loadImg( item.next( ".popupimage_item"));
            }

            function loadImg( item ) {
                // Log.debug( "load 1" );
                var img = $( item ).find( "img" );
                var img_url = img.attr( "data-src" );
                if ( !img_url ) return;

                // Log.debug( "load 2 " + img.css( "display" ));

                // for testing: delay the url setting, to test loading UIL
                // setTimeout( function(){
                    img.attr( "src", img_url );
                // }, 5000 );
                img.attr( "data-src", null );

                // Log.debug( "load 3" );
            }


        // --- navigation functions

            function dismiss() {
                $( ".popupimage_gallery" ).remove();

                globalListenersOff()

                if ( galleryElt )
                    Dom.unhideEverythingThanksAndroid( galleryElt[0] );

                galleryElt = currentItem = widgets = null;
            }

            function goTo( ev, elt, hard ) {
                elt = $( elt );
                if ( ev ) {
                    ev.preventDefault();
                    // ev.stopPropagation(); // parent element will navigate
                }
        
                var ctr = elt.closest( ".popupimage_container" );
                if ( ctr ) {
                    try {
                        if ( elt[0] ) {
                            hard ? ctr.css( { left: (-elt[0].offsetLeft) + "px" } ) :
                                   ctr.animate( { left: (-elt[0].offsetLeft) + "px" }, 100, "linear" );
                        }
                    } catch(e) {
                        Log.note( "goTo error: " + e.message );
                    }
                }

                startBusy(elt);
                fadeWidgets( elt );
                
                currentItem = elt;
            }
            
            function goNext( ev, elt ) {
                elt = $( elt || currentItem );
                if ( elt.is( ".popupimage_container" )) {
                    Log.note( "hmmm container got event: " + ev.which );
                    elt = $( ev.target ).closest( ".popupimage_item" );
                }
        
                goTo( ev, $( elt.next( ".popupimage_item" )[0] || elt ) );
            }
            
            function goPrev( ev, elt ) {
                elt = $( elt || currentItem );
                if ( elt.is( ".popupimage_container" )) {
                    Log.note( "hmmm container got event: " + ev.which );
                    elt = $( ev.target ).closest( ".popupimage_item" );
                }
        
                goTo( ev, $( elt.prev( ".popupimage_item" )[0] || elt ) );
            }
            
            function hasNext( el ) {
                return $( el ).next( '.popupimage_item' )[0] != null;
            }
            
            function hasPrev( el ) {
                return $( el ).prev( '.popupimage_item' )[0] != null;
            }
            
            function finishMove( ev, elt ) {
                try {
                    // Log.note( "finishMove d: " + ev.distX + " v: " + ev.velocityX + " elt: " + $(elt)[0].id );

                    // Pretty short value here to call it a "swipe"-- note iOS' own app
                    // screens switch with just a little nudge.  Check against the velocity--
                    // if there's a pull back at the last second, don't count it as a swipe.

                    if ( ev.distX < -35 && ev.velocityX <= 0 ) {
                        goNext( null, elt );
                        return true;
                    } else if ( ev.distX > 35 && ev.velocityX >= 0 ) {
                        goPrev( null, elt );
                        return true;
                    }

                    goTo( null, elt );
                    return false;
                } catch(e) {
                    Log.note( "finishMove error: " + e.message );
                }
            }

            // display a loading indicator, but after a short delay
            function startBusy(elt) {
                elt = $(elt);
                if (!elt.hasClass("loaded")) {
                    elt.data( "loading-timer", setTimeout( function() {
                        elt.addClass("loading");
                    }, 250 ) );
                }
            }

            function clearBusy(elt) {
                elt = $(elt);
                clearTimeout( elt.data("loading-timer") );
                elt.removeClass("loading");
                elt.addClass("loaded");
            }

        // --- widget show/hide (next, prev, close)

            var anim_widgets = null;
            var anim_timer = null;

            function fadeWidgets( elt, fadeUp ) {
                elt = $( elt || currentItem );
                try {
                    if ( anim_widgets ) {
                        anim_widgets.stop( true );
                        anim_widgets = null;
                    }
                    if ( anim_timer ) {
                        clearTimeout( anim_timer );
                        anim_timer = null;
                    }

                    var these_widgets = widgets.find('.popupimage_navicon');

                    // reset all to visible: 
                    these_widgets.css({ opacity: 1, display: "inline-block" });

                    if ( !hasNext( elt )) {
                        these_widgets.filter( '.next' ).css({ opacity: 0 });
                        these_widgets = these_widgets.not( '.next' );
                    }

                    if ( !hasPrev( elt )) {
                        // yep, both could be true-- single-image case
                        these_widgets.filter( '.prev' ).css({ opacity: 0 });
                        these_widgets = these_widgets.not( '.prev' );
                    }

                    if ( fadeUp ) {
                        these_widgets.fadeIn( 100, "swing" );
                    } else {
                        these_widgets.css({ opacity: 1.0 });
                    }

                    // $(...).delay() items can't be stopped/cleared out, need to run our own timeout:
                    anim_timer = setTimeout( function(){ these_widgets.fadeOut( 2000, "swing" ) }, 2100 );
                    // however, we may also want to cancel the currently active animation later:
                    anim_widgets = these_widgets;
                } catch( e ) {
                    Log.note( "fadeWidgets error: " + e.message );
                }
            }

            
        // --- set up global listeners

            function popupKeys( ev ) {
                if ( ev.ctrlKey || ev.metaKey ) return;

                switch ( ev.keyCode ) {
                case 13: /* ENTER */ case 27: /* ESCAPE */ case 32: /* SPACE */
                    dismiss(); break;
                case 39: /* RIGHT */ case 40: /* DOWN */
                    goNext( null, currentItem ); break;
                case 37: /* LEFT */ case 38: /* UP */
                    goPrev( null, currentItem ); break;
                }
            }

            var rotatedTimeout = null;

            function rotated( dontStallIt, which ) {

                if ( !dontStallIt ) {
                    // we might get a shower of calls, esp. for 'resize', so continually post and cancel
                    // the actual resize operation on a timer

                    if ( rotatedTimeout )
                        clearTimeout( rotatedTimeout );

                    // Log.note( [ which, "w:", $( window ).width(), "h:", $( window ).height(), "o:", window.orientation ].join(" ") );

                    rotatedTimeout = setTimeout( function() { rotated( true ); }, 500 );
                    return;
                }

                // in case we're called via timeout after being dismissed:
                if ( !galleryElt )
                    return;

                // taking the coward's way out: all the images and their containing cells have to be resized,
                // just rerender it all:
                var img_url = $( currentItem ).find( 'img' ).attr( 'src' );
                dismiss();
                build( img_url );
            }

            function globalListenersOn() {
                $( document ).on( "keydown", popupKeys );
                    // keypress doesnt work with arrow keys
                $( document.body ).on( "orientationchange", function(){ rotated( false, "orientation" ) } );

                // orientationchange is all we need on safari. android does not fire it reliably,
                // but it does resize the window (unlike Safari).  Additional research indicates
                // that neither event might fire on a 180-degree turn-- in which case you need
                // to poll for changes to window.orientation.  We don't need that for this feature.
                // Because some events fire multiple times, we stall the response for a second--
                // and it's just as well, because the viewport size isn't always updated at the
                // time 'resize' fires.  Also too: we want to honor resizes on the desktop, unlike
                // the previous version of PopupImage.  There again we want to stall in the face
                // of the storm of resize events the browser sends us.
                
                $( window ).on( "resize", function(){ rotated( false, "resize" ) } );
            }

            function globalListenersOff() {
                $( document ).off( "keydown", popupKeys );
                    // keypress doesnt work with arrow keys
                $( document.body ).off( "orientationchange", rotated );
                $( window ).off( "resize", rotated );
            }


        // --- zoom animation at startup

            function zoomIt() {
                // optional zoom-up behavior if given a source element
    
                var the_image = currentItem.find( "img" );
                var dest_xy = the_image.offset();
                var dest_wh = { width: the_image.outerWidth(), height: the_image.outerHeight() };
                var dest_aspect = ( dest_wh.width * 1.0 ) / dest_wh.height;

                var container = galleryElt.find( ".popupimage_container" )
                var old_display = container.css( 'display' );
                container.css({ 'display': 'none' });
    
                var src_xy = $( srcImage ).offset();
                var src_wh = { width: $( srcImage ).outerWidth(), height: $( srcImage ).outerHeight() };
                var src_aspect = ( src_wh.width * 1.0 ) / src_wh.height;

                // src is usually a thumbnail with different A/R.
                // determine whether we should match the width or height of the src
                center_by_width = dest_aspect < src_aspect;
                if ( dest_aspect < src_aspect ) {
                    // move the top to the center:
                    src_xy.top += Math.round( src_wh.height / 2 );
                    // then map the height:
                    src_wh.height = Math.round( src_wh.width / dest_aspect );
                    // now move to the new top:
                    src_xy.top -= Math.round( src_wh.height / 2 );
                } else {
                    // move the left to the middle:
                    src_xy.left += Math.round( src_wh.width / 2 );
                    // then map the width:
                    src_wh.width = Math.round( src_wh.height * dest_aspect );
                    // now move to the new left:
                    src_xy.left -= Math.round( src_wh.width / 2 );
                }
    
                // The above calculations give a full zoom from thumb size to full size.
                // Testing something different: Move to the halfway point of a full animation.
                src_xy.left += Math.round(( dest_xy.left - src_xy.left ) / 2 );
                src_xy.top += Math.round(( dest_xy.top - src_xy.top ) / 2 );
                src_wh.width += Math.round(( dest_wh.width - src_wh.width ) / 2 );
                src_wh.height += Math.round(( dest_wh.height - src_wh.height ) / 2 );

                var zoom_image = $( "<img/>" );
                zoom_image.attr({ src: the_image.attr( 'src' ) });
                zoom_image.css({ position: 'absolute', 'z-index': galleryElt.css( 'z-index' ) + 1,
                                 opacity: 0.33,
                                 width: src_wh.width + 'px', height: src_wh.height + 'px',
                                 left: src_xy.left + 'px', top: src_xy.top + 'px' });
                zoom_image.appendTo( document.body );

                zoom_image.animate( { opacity: 0.90,
                                      width: dest_wh.width + 'px', height: dest_wh.height + 'px',
                                      left: dest_xy.left + 'px', top: dest_xy.top + 'px'
                                    },
                                    150,
                                    "swing",
                                    function() {
                                        zoom_image.remove();
                                        container.css({ display: old_display });
                                    } );
            }


        var e;
        try {
            // Make sure there's not an instance lying around        
            dismiss();
            
            // build it/show it       
            build();

            // zoom, on desktops
            if ( !phoneView && srcImage && currentItem )
                zoomIt();
    
        } catch( e ) {
            Log.note ( "show_mobile error: " + e.message );
            return false;
        }

        return true;
    }, // end show_mobile

    limitImageSize: function(size, portSize) {
        if ( size && size.w && size.h ) {
            size = { w: size.w, h: size.h }; // clone
            // Log.note( "show_mobile size 2: " + [ portSize.w, portSize.h, size.w, size.h ].join(" ") );

            if (( portSize.w / portSize.h ) > ( size.w / size.h )) {
                // port has wider aspect ratio, adjust to fit the height:
                if ( size.h > portSize.h ) {
                    size.w *= portSize.h / size.h;
                    size.h = portSize.h;
                } // else show natural size
                // TODO: might want to always enlarge, on mobile --kj
            } else {
                // port has taller aspect ratio, adjust to fit the width:
                if ( size.w > portSize.w ) {
                    size.h *= portSize.w / size.w;
                    size.w = portSize.w;
                } // else show natural size
            }
        }
        return size;
    },

    getCachedImageSize: function(elt) {
        elt = $(elt);
        var url = elt.attr("href"),
            size = PopupImage.getPresuppliedImageSize(elt) || PopupImage._imgSizes[url] || null;
        if (size)
            Log.debug("PopupImage: found cached size for image: ", url, "width: ", size.w, "height: ", size.h);
        return size;
    },
    
    getPresuppliedImageSize: function( elt ) {
        elt = $(elt);
        var sizeStr = elt.attr( "data-image-size" );
        // Log.note( "getPresuppliedImageSize: " + size );
        var e, sizeArr, size = null;
        try {
            if ( sizeStr ) {
                sizeArr = sizeStr.toString().split( "," );
                if ( sizeArr.length == 2 ) {
                    size = {
                        w: parseInt( sizeArr[0] ),
                        h: parseInt( sizeArr[1] )
                    };
                }
            }
        } catch( e ) {
            Log.note( "getPresuppliedImageSize error: " + e.message );
            // caller should just continue with render-after-loading
        }

        return size;
    },

    hasNext: function( el ) {
        el = el || this._currentSrc;
        if ( !el ) return false;

        var sibs = $( el ).closest( ".popupImageGallery" ).find( ".popupImage" );
        var index = $.inArray( el, sibs );
        return ( index > -1 && index < sibs.length - 1 );
    },
    
    goNext: function( event, el ) {
        if ( event )
            Y.util.Event.stopEvent( event );

        el = el || this._currentSrc;
        if ( !el ) return;

        var sibs = $( el ).closest( ".popupImageGallery" ).find( ".popupImage" );
        var index = $.inArray( el, sibs );
        if ( index > -1 && index < sibs.length - 1 ) {
            if ( event )
                Y.util.Event.preventDefault( event );
            this.showFor( sibs[ index + 1 ], true );
        }
    },
    
    hasPrev: function( el ) {
        el = el || this._currentSrc;
        if ( !el ) return false;

        var sibs = $( el ).closest( ".popupImageGallery" ).find( ".popupImage" );
        var index = $.inArray( el, sibs );
        return ( index > 0 );
    },
    
    goPrev: function( event, el ) {
        if ( event )
            Y.util.Event.stopEvent( event );

        el = el || this._currentSrc;
        if ( !el ) return;

        var sibs = $( el ).closest( ".popupImageGallery" ).find( ".popupImage" );
        var index = $.inArray( el, sibs );
        if ( index > 0 ) {
            if ( event )
                Y.util.Event.preventDefault( event );
            this.showFor( sibs[ index - 1 ], true );
        }
    },
    
    dismiss: function( el ) {
        el = el || this._current;
        if ( el && el.parentNode ) el.parentNode.removeChild( el );
        if ( el == this._current ) {
            this._current = null;
            this._currentSrc = null;
        }
        if ( this._keys ) this._keys.disable();
    },
    
    zzz: null

};
;
/* ------------- BEGIN crumb.js --------------- */;
/* global _crumbs, Url */
/* exported Crumb */

var Crumb = {
    // A thin wrapper around jQuery.ajax which adds automatic crumb handling.
    // The appropriate crumb value is taken from the _crumbs array, based on
    // the request URL, and appended to the request. If there are any
    // crumb-related errors in response, then the request is resubmitted
    // using the updated crumb supplied by the server.
    //
    // The paramaters hash passed in is passed through to jQuery with only
    // minor modifications, so you should be able to do anything jQuery.ajax
    // lets you do.
    //
    // The data can be sent as a query string or as JSON. To send it as a 
    // query string just pass a string or an object for the data. Objects
    // will get converted to a string. But if you want your object to be sent
    // as JSON include dataAs: "JSON" in the settings hash. In either
    // case the crumb will be attached.
    
    ajax: function(settings) {
        var retries = 0;
        var endpoint = Url.toHash(settings.url).pathname.substring(1); 
        var asJSON = (settings.dataAs === "JSON");
        var originalData = settings.data;

        if (!originalData)
            originalData = asJSON ? {} : "";

        function addCrumb() {
            if (asJSON) {
                originalData.crumb = _crumbs[endpoint];
                settings.data = ko.toJSON(originalData);  // NOTE: uses knockout!
            } else {
                // before proceeding, standardise on formatting data as a query string
                // jQuery.param can flatten out complex multi-level arrays, which Url.joinQuery chokes on
                // we use this ability in edit_album/edit_track
                if (typeof originalData !== "string")
                    originalData = $.param(originalData);
                if (_crumbs[endpoint])
                    settings.data = originalData + "&" + Url.joinQuery({crumb: _crumbs[endpoint]});
            }
        }

        // we want to be able to do a retry for XHRs that don't trigger a .error - namely error responses that come back as 200s
        function retryCrumb(crumb){
            _crumbs[endpoint] = crumb;
            // retry!
            retries = retries + 1;
            addCrumb();
            $.ajax(settings);
        }

        function eachCallback(callbacks, fn) {
            if (!callbacks)
                return;
            if (!$.isArray(callbacks)) {
                callbacks = [callbacks];
            }
            for (var i = 0; i < callbacks.length; i++) {
                fn( callbacks[i] );
            }
        }
 

        var originalErrorCallback = settings.error;
        var originalSuccessCallback = settings.success;
        var originalCompleteCallback = settings.complete;

        addCrumb();

        // just check for an invalid crumb error and do a retry, otherwise call the original success callback
        // though we're supposed to supply this in the hash to Crumb.ajax, sometimes that doesn't happen, so only call the original
        // success callback if it's there.
        settings.success = function(data, status, xhr){
            var response  = jQuery.parseJSON(xhr.responseText);
            if (response.error == "invalid_crumb" && retries < 2){
                retryCrumb(response.crumb);
                return;
            } 
            var self = this;
            eachCallback(originalSuccessCallback, function(cb) {
                cb.apply(self, [data, status, xhr]);
            });
            eachCallback(originalCompleteCallback, function(cb) {
                cb.apply(self, [xhr, status]);
            });
        };

        settings.error = function(xhr, status, error) {
            var self = this;
            if (xhr.status == 403) {
                try {
                    var response = jQuery.parseJSON(xhr.responseText);
                    if (response.error == "invalid_crumb" && retries < 2) {
                        retryCrumb(response.crumb);
                        return;
                    } 
                } catch(e) {
                    // do nothing -- just fall through to the caller's error handler below
                }
            }  
            eachCallback(originalErrorCallback, function(cb) {
                cb.apply(self, [xhr, status, error]);
            });
            eachCallback(originalCompleteCallback, function(cb) {
                cb.apply(self, [xhr, status]);
            });
        };

        settings.complete = null;
        
        return ($.ajax(settings));  
    },
    
    // returns the crumb for a given endpoint URL, or an empty string if none was found
    get: function(url) {
        var endpoint = Url.toHash(url).pathname.substring(1);
        if (_crumbs[endpoint]) {
            return _crumbs[endpoint];
        } else {
            return "";
        }
    },

    // Stashes crumbs returned via an API call -- generally only login or signup does this, and only
    // if the same page needs to make subsequent API calls without a reload. The parameter here is a 
    // hash of endpoints to crumbs.
    put: function(crumbs) {
        $.extend(_crumbs, crumbs);
    }
};
;
/* ------------- BEGIN form.js --------------- */;
/////////////////////////////////////////////////////////////
/// Form library: handles form submission, field validation, lifeboat-izing, etc.
///
///               For notes on typical usage, in which the library will
///               handle all of validation, lifeboat-izing, and submission,
///               see Form.init(). 
///
///               For notes on using only validation, see the validate object
///               below. (search for "The validate object", around line 615).
    
Y.lang.augmentObject( Form, {

    _lifeBoatEnabled : false,
    _formElem : null,
    _validateSections : null,
    _validateMessages : null,
    _onValidate : null,
    _customSubmitter : null,
    _submitOnEnter : false,
    _allowSubmit : false,
    _submitBlock : null,
    _cancellationListeners : null,
    _stack : new Array(),
    _auxillaryValidationErrors : {},
    
    INTL_FLOAT_PATTERN : /^\d*,\d?\d?$/,

    // Form.init() 
    //    Tells the Form library which of its services you want: lifeboating,  
    // validation, submission, and support for the ENTER key as a submitter. 
    //
    //  elem -- (required) the form's id in text, or a reference to the element
    //.
    //  lifeBoatMessage -- (optional) what message to display during lifeboat. If not provided,
    //          the Form library will not lifeboat.
    //          Note: if client is taking advantage of lifeboating, then it is the 
    //          responsibility of the client's customSubmitter to call Form.enableLifeboat()
    //          in the event it decides to cancel the submit event and not submit the form.
    //  cancelUrl -- (optional) a url to navigate the page to, when any button whose name 
    //          is "cancel" is clicked. To take advantage of this, you'd define one or more buttons
    //          like so:
    //          <button type="button" name="cancel" value="Cancel"><div>Cancel</div></button> 
    //          and then pass in a parameter that you want the page to navigate to (usually, return
    //          to) when the cancel button is clicked. The Form library looks through the page,
    //          adding specialized listeners to buttons that meet that one criterion.
    //  validateInfo -- (optional) validation info in the same format as used elsewhere in the client
    //          If not provided, the Form library won't provide validation.
    //  customSubmitter -- (optional) a function that submits the form -- in whatever way 
    //          makes sense - XHR, set location, or a simple form submit. It should 
    //          probably stop the event too, to keep it from bubblin up to the browser's
    //          default form submission. Along those same lines, if no custom submitter
    //          ever was registered, then the event will bubble up to the browser's 
    //          default form submission. 
    //          Note: if client is taking advantage of lifeboating, then it is the client's
    //          responsibility  Form.enableLifeboat() in the event it decides to cancel 
    //          the submit event and not submit the form.
    // submitOnEnter --(optional, default = false) True indicates to interpret an ENTER keydown
    //          a submit event. (case 128208)
    //
    // Note: If you are concerned that a user might submit the form before the DOM is  
    // ready, take a look at Form.delaySubmitUntilReady(), below.
    //
    // Note: As things stand now, this library supports multiple forms, but only one active form at a time. 
    // If you call Form.init() more than once on the same instance of a page, the previous form's
    // "init" settings are remembered on a stack -- in this way, you can show a dialog with a form
    // in it, and then restore the previous form when you dismiss the dialog.  
    // 
    // If you use the form library in that manner, you must call Form.detach() in order 
    // to restore the previous form. For instance, the Contact dialog (see show_form() ~ln 185 of
    // contact.js) calls Form.detach() in response to the destroyEvent, which is a custom
    // YUI event fired when a YUI dialog goes away.
    
    // Other times to call Form.detach() : 
    // - to detach the event listeners that Form.init associates with a form 
    // = to disable the lifeboat, (or restores the lifeboat setting of the previous form on the stack).
    //
    // In simple cases, there is no reason to call detach -- for instance, when there is 
    // only one form to a page.
    
    init : function( elem, lifeBoatMsg, cancelUrl, validateInfo, customSubmitter, submitOnEnter, notReady ) {
        
        if( Form._formElem )
            Form._push();
        
        elem = elt(elem);
        Form._formElem = elem;
        window.onbeforeunload = Form._navigate;
        Form._cancellationListeners = new Array();

        var elems = elem.elements;
        for(var i=0; i<elems.length; i++) {
            var x = elems[i];
            if(x.type == "submit" || x.type == "button") { 
                if (Form._isCancelButton(x)) {
                    anon = function(event) {
                        Form._cancelled(event, cancelUrl);
                    };
                    Y.util.Event.addListener(x, "click", anon);
                    Form._cancellationListeners.push({ "elt" : x, "listener" : anon});
                }
            }
        }
        
        // apply onchange handlers for certain field types
        if (validateInfo) {
            for ( var sectionName in validateInfo.sections ) {
                var prefix = validateInfo.sections[ sectionName ].prefix;
                if ( prefix )
                    prefix = prefix + ".";
                else
                    prefix = "";

                if ( !window.Validators ) {
                    Log.debug("Form.init: no form Validators installed");
                } else {
                    var validators = Validators[ sectionName ];
                    for ( var fieldName in validators ) {
                        var validator = validators[ fieldName ];
    
                        if ( validator.type == "date" )
                            Form.interpretDateFieldOnChange( prefix + fieldName );
                        else if ( validator.type == "float" )
                            Form.interpretFloatSeparatorOnChange( prefix + fieldName );
                        else if ( validator.implicit_type == "url" )
                            Form.qualifyUrlFieldOnChange( prefix + fieldName );
                        else if ( validator.type == "isrc" )
                            Form.interpretISRCFieldOnChange( prefix + fieldName );
                        else if ( validator.type == "upc" )
                            Form.interpretUPCFieldOnChange( prefix + fieldName );
                    }
                }
            }
        }
        //apply a keydown handler to the form (so it can validate on ENTER) 
        //case 128208
        Y.util.Event.addListener(elem, "keydown", Form.filter_returnkey);
        Y.util.Event.addListener(elem, "submit", Form._submitted);
        
        Form._lifeBoatEnabled = !!( lifeBoatMsg && lifeBoatMsg.length );
        Form._lifeBoatMsg = lifeBoatMsg || "There are unsaved changes here. If you continue, you will lose them."; //UISTRING

        var show = Url.getQueryParam(location.toString(), "show_alert");
        switch(show)
        {
            case null:
                break;
            case undefined:
                break;
            case "all":
                Y.util.Dom.getElementsByClassName("alert", null, null, function(elem) { Y.util.Dom.addClass(elem, "alertActive"); elem.innerHTML = "error text: " + elem.id + " lorem ipsum dolor sit amet."; });
                break;
            default:
                var elem = Form.validate.get_alert_elt(show) || elt(show);
                if(elem)
                {
                    Y.util.Dom.addClass(elem, "alertActive");
                    elem.innerHTML = "error text: " + elem.id + " lorem ipsum dolor sit amet.";
                }
                break;
        }

        if( validateInfo && ( Url.getQueryParam(location.href, "novalidate") == null ) )
        {
            Form._validateSections = validateInfo.sections;
            Form._validateMessages = validateInfo.messages;
            Form._onValidate = validateInfo.onValidate;
        }
        
        Form._customSubmitter = customSubmitter;
        Form._submitOnEnter = submitOnEnter;
        if( !notReady )
            Form._allowSubmit = true;
         
    },
    
    // For attaching listeners to form fields after the main init call,
    // to support dynamically extended forms with replicated form sections.
    // This is for iterated use of validate info over repeated form sections
    // (because the editor allows creation of multiple instances of an item).
    // Element ids are extended with a suffix.  This ONLY installs the 
    // general per-element data validators, does not setup submit or cancel
    // buttons nor alter other global state about the form.  Does not
    // allow passing in new validators, can only use ones already installed
    // with init.  Only works on the currently active form.
    extend: function( formID, sectionName, suffix ) {
        // Fun fact: if you have a form control with an id or name attribute of "id", then
        // formElem.id will refer to that element instead of the form's id attribute.
        // So, check explicitly with a getAttribute call.
        // UPDATE: even worse: on ie7, it STILL returns the form sub-element with name 'id'.
        // So, get it ourselves and compare the pointers:
        var theForm = elt( formID );
        if ( Form._formElem != theForm ) {
            Log.debug("Form.extend: Form not initted, or wrong form is active: " + formID );
            return;
        }

        var info = Form._validateSections[ sectionName ];
        if ( !info ) {
            Log.debug("Form.extend: sectionName not found");
            return;
        }

        var prefix = info.prefix;
        if ( prefix )
            prefix = prefix + ".";
        else
            prefix = "";

        if ( !window.Validators ) {
            Log.debug("Form.extend: no form Validators installed");

        } else {
            // Save the suffix, we'll iterate them at validation time
            Form._extensions = Form._extensions || { };
            Form._extensions[ sectionName ] = Form._extensions[ sectionName ] || [];
            
            // Don't push the suffix if it's there already to prevent validating the fields multiple times.
            if (Iter.index(Form._extensions[ sectionName ], suffix) == -1) {
                Form._extensions[ sectionName ].push( suffix );
            }

            var validators = Validators[ sectionName ];
            for ( var fieldName in validators ) {
                var validator = validators[ fieldName ];

                if ( validator.type == "date" )
                    Form.interpretDateFieldOnChange( prefix + fieldName + suffix );
                else if ( validator.type == "float" )
                    Form.interpretFloatSeparatorOnChange( prefix + fieldName + suffix );
                else if ( validator.implicit_type == "url" )
                    Form.qualifyUrlFieldOnChange( prefix + fieldName + suffix );
                else if ( validator.type == "isrc" )
                    Form.interpretISRCFieldOnChange( prefix + fieldName + suffix );
                else if ( validator.type == "upc" )
                    Form.interpretUPCFieldOnChange( prefix + fieldName + suffix );
            }
        }
    },
    
    allowSubmit: function() {
        Form._allowSubmit = true;
    },
    
    canSubmit: function() {
        return Form._allowSubmit == true && Form._submitBlock == null;
    },
    
    _push : function() {
        var thisForm = {
                lifeBoatEnabled : Form._lifeBoatEnabled,
                formElem : Form._formElem,
                validateSections : Form._validateSections,
                validateMessages : Form._validateMessages,
                onValidate : Form._onValidate,
                customSubmitter : Form._customSubmitter,
                submitOnEnter : Form._submitOnEnter,
                allowSubmit : Form._allowSubmit,
                submitBlock : Form._submitBlock,
                cancellationListeners : Form._cancellationListeners,
                extensions : Form._extensions
        };
        Form._stack.push( thisForm );   
    },
    
    detach : function(){
        Form._lifeBoatEnabled = false;
        
        Form._validateSections = null;
        Form._validateMessages = null;
        Form._onValidate = null;

        Form._submitOnEnter = false;
        Form._allowSubmit = false;
        Form._submitBlock = null;
        Form._extensions = null;
        
        if( Form._formElem ){
            Y.util.Event.removeListener(Form._formElem, "keydown", Form.filter_returnkey);
            Y.util.Event.removeListener(Form._formElem, "submit", Form._submitted);
            for(var i=0; i<Form._cancellationListeners.length; i++){
                var pair = Form._cancellationListeners[i];
                Y.util.Event.removeListener( pair["elt"], "click", pair["listener"]);
            }
        }
        Form._cancellationListeners = null;
        Form._formElem = null;  
        Form._pop();
    },
    
    //     "A brutish but effective way to prevent save before Dom is ready."  
    //                                           -- comment in the original code
    //      If clients want to guarantee that their form is not submitted until 
    // the DOM is ready, they should set the form's onsubmit handler to this function 
    // and then make certain to call Form.init() from an onDomReady handler. Like so:
    // <script>
    // Y.util.Event.onDOMReady( function() {
    //   ....
    //   Form.init("form_x", lifeboatMsg, cancelUrl, validateInfo, submitFormX );
    // }
    // </script>
    // <form id="form_x" ... onsubmit="Form.delaySubmitUntilReady(event)">
    // 
    // edit_album is a good example of this. 
    // NOTE that the client does not have to do use delaySubmitUntilReady, or call Form.init
    // from a DomReady handler. There are plenty of examples of calls to Form.init 
    // at a global level, outside any other function, method, or event handler.
    //

    // NOTE: We do NOT handle multiple, nested callers here!
    // A single external entity can block, then unblock (pass null)
    // the form submission.  In practice this works for is, in principle
    // we would need to handle this case (e.g. we if wanted to block on
    // both ongoing audio and image uploads, currently we block only
    // on the audio). -- kj 2010.05.11
    setSubmitBlock : function ( msg ) {
        Form._submitBlock = msg;
    },

    // Given the name of a field in the form that accepts a date, parse the entry
    // and update the value with a normalized form whenever the user edits the field.
    // Note this is done automatically when a field has a date validation rule, but
    // this can be called on any non-validated field as well.
    interpretDateFieldOnChange : function( fieldName ) {
        var inputElem = Form._formElem.elements[ fieldName ];
        if ( inputElem ) {
            Y.util.Event.on( inputElem, "change", function() {
                var date = Time.strToDate( this.value ); 
                if ( date ) {
                    var dateStr = Time.toUiDate( date, true, true );
                    if ( dateStr != this.value ) {
                        Log.debug( "normalizing date value '" + this.value + "' to '" + dateStr + "'" );
                        this.value = dateStr;
                    }
                }
                // otherwise we don't recognize it as a date; do nothing
            });
        }
        inputElem = null; // don't hang on to this in the closure
    },
    
    // We provide some intl-friendliness by interpreting nn,nn as nn.nn for float input.
    interpretFloatSeparatorOnChange : function( fieldName ) {
        var inputElem = Form._formElem.elements[ fieldName ];
        if ( inputElem )
            Y.util.Event.on( inputElem, "change", Form.validate.priceOnChangeHandler);
        inputElem = null; // don't hang on to this in the closure      
    },
    
    // Given the name of a field in the form that accepts a URL, supply a URL scheme
    // if the user hasn't entered one. Note this is done automatically when a field 
    // has a URL validation rule, but this can be called on any non-validated field as well.    
    qualifyUrlFieldOnChange : function( fieldName ) {
        var inputElem = Form._formElem.elements[ fieldName ];
        if ( inputElem ) {
            Y.util.Event.on( inputElem, "change", function() {
                var value = Y.lang.trim( this.value );
                // Fix users entering "http:foobar.com/baz"
                value = value.replace(/^(https?:)(\w)/i, '$1//$2');
                // Ad missing http:// prefix.
                if ( value != "" && ( value.search( /^https?:\/\//i ) == -1 ) )
                    value = "http://" + value;                
                this.value = value;
            });
        }
        inputElem = null; // don't hang on to this in the closure      
    },

    // Given the name of a field in the form that accepts an ISRC code, parse the entry
    // and update the value with a normalized form whenever the user edits the field.
    interpretISRCFieldOnChange : function(fieldName) {
        var inputElem = Form._formElem.elements[fieldName];
        if (inputElem) {
            Y.util.Event.on(inputElem, "change", function() {
                var isrc = Form.validate.isrc(this.value);
                if (isrc)
                    this.value = isrc;
                // otherwise we don't recognize it as an ISRC code; do nothing
            });
        }
        inputElem = null; // don't hang on to this in the closure
    },

    // Given the name of a field in the form that accepts a UPC code, parse the entry
    // and update the value with a normalized form whenever the user edits the field.
    interpretUPCFieldOnChange : function(fieldName) {
        var inputElem = Form._formElem.elements[fieldName];
        if (inputElem) {
            Y.util.Event.on(inputElem, "change", function() {
                var upc = Form.validate.upc(this.value);
                if (upc)
                    this.value = upc;
                // otherwise we don't recognize it as a UPC code; do nothing
            });
        }
        inputElem = null; // don't hang on to this in the closure
    },

    disableLifeboat : function() {
        Form._lifeBoatEnabled = false;
    },
    
    _isCancelButton: function( button ) {
        return ( button.name == "cancel" );
    },
    
    // In Safari, hitting the return key can early-submit the dialog, before
    // validation. So, unless the target of the event is a TextArea, where ENTER
    // means carriage-return, not submit, even on Safari, go ahead and stop the event. 
    // If you do want ENTER to submit the form, then you must pass in a parameter
    // to that effect in Form.init()
    filter_returnkey : function(e) {
        
        if (e && e.keyCode == 13) {            
            if( Y.util.Event.getTarget(e).tagName != "TEXTAREA" ){
                Y.util.Event.stopEvent(e);
            }
            if(Form._submitOnEnter)
                Form._submitted(e);
        }
        
        return true;
    },

    // called when the user attempts to submit the form
    _submitted : function(event) {
        
        var target = Y.util.Event.getTarget(event);
        
        if ( target != Form._formElem && Y.util.Dom.getAncestorByTagName( target, "FORM" ) != Form._formElem ) {
            // this is a hack to make multiple forms to work.
            // bail if this is not the active, currently installed form
            return;
        }

        Form.validate.clear_alerts();

        var errlist = null;
        if(Form._validateSections && !Form._isCancelButton(target))
        {
            errlist = Form.validateAndShowErrors();
        }

        if(errlist && errlist.length > 0)
        {
            Y.util.Event.stopEvent(event);
            return errlist;
        }

        if( Form._customSubmitter )
            Form._customSubmitter( event );
    },
    
    _pop : function() {      
        if (Form._stack.length > 0) {
            var prevForm = Form._stack.pop();
            Form._lifeBoatEnabled = prevForm.lifeBoatEnabled; 
            Form._formElem = prevForm.formElem; 
            Form._validateSections = prevForm.validateSections; 
            Form._validateMessages = prevForm.validateMessages; 
            Form._onValidate = prevForm.onValidate; 
            Form._customSubmitter = prevForm.customSubmitter; 
            Form._submitOnEnter = prevForm.submitOnEnter; 
            Form._allowSubmit = prevForm.allowSubmit;
            Form._submitBlock = prevForm.submitBlock; 
            Form._cancellationListeners = prevForm.cancellationListeners; 
            Form._extensions = prevForm.extensions;
        }
    },
    
    _cancelled: function(event, url) {
        Y.util.Event.stopEvent(event);
        Form._lifeBoatEnabled = false;
        if ( window != top && Dialog.iframeComm )
            Dialog.iframeComm.close( false );        
        else if ( url )
            location.href = url;
    },
    
    validateAndShowErrors: function( sections ) {
        if ( !sections )
            sections = Form._validateSections;
        $assert( sections );
        var errlist = []
        for(var sectionName in sections)
        {
            var sectionInfo = sections[sectionName];
            var extensions = Form._extensions ? Form._extensions[sectionName] : null;
            if ( extensions && extensions.length > 0 ) {
                var errors = [];

                // TODO: Multiple packages - finish me
                for ( var i=0, n=extensions.length; i<n; ++i ) {
                    errors = errors.concat( Form.validate.check_field_errors(sectionName, sectionInfo, extensions[i]) || [] );
                }

                if ( errors.length == 0 ) errors = null;
            } else
                var errors = Form.validate.check_field_errors(sectionName, sectionInfo);

            if(errors)
            {
                for(var i=0; i < errors.length; i++)
                {
                    var err = errors[i]
                    Log.warn("error in field \"" + err.field + "\": " + err.reason, err);
                    Form.validate.show_alert(err)
                    errlist.push(err);
                }
            }
        } 

        if( errlist && errlist.length )
            this.revealError()

        return errlist;
    }, 
    
    // simple function to register an auxillary validation failure in the form of an error object.
    // these auxillary errors are inspected and honored by check_field_errors
    // params:
    //      fieldName should be the full name of the field, i.e., sectionPrefix.fieldName
    //      error is a hash of the form {fieldName: 'section.field', reason: 'duplicate'}
    registerAuxillaryValidationError: function(fieldName, err) {
        this._auxillaryValidationErrors[fieldName] = err;
    },
    
    // clears a previously registered auxillary validation error
    // param:
    //      fieldName should be the full name of the field, i.e., sectionPrefix.fieldName
    clearAuxillaryValidationError: function(fieldName) {
        delete this._auxillaryValidationErrors[fieldName];
    },

    revealError: function () {
        try {
            var dom = Y.util.Dom;

            // we'll just go to the first one in DOM order
            var altElt = null, errElt = dom.getElementsByClassName( "alertActive" )[0];

            var idMatch = errElt.id.match( /^(.*)[\_\-]alert$/ );

            if ( idMatch ) {
                altElt = dom.get( idMatch[1] );
                Log.warn( altElt ? "using alt elt" : "using err elt" );
            }
                
            var y = altElt ? -10 : -50;
                // if we have the actual reference element, scroll up a little above it.
                // if we only have the alert element, scroll up a lot above it.

            Dom.scrollToElement( altElt || errElt, y );

        } catch (e) {
            Log.error("validate: error scrolling to reveal error message");
        };
    },

    // check to see if the specified form is "dirty"
    formIsDirty : function(elem) {
        elem = elt(elem);

        if(elem.lifeboatDirty) {
            return true;
        }

        var elems = elem.elements;
        for(var i=0; i<elems.length; i++) {
            var x = elems[i];
            if(Form.fieldIsDirty(x)) {
                Log.info("Form element " + x.name + " is dirty.");
                return true;
            }
        }

        return false;
    },

    formIsNotDirty : function(elem) {
        elem = elt(elem);
        if(elem.lifeboatDirty) {
            elem.lifeboatDirty = false;
        }
        var elems = elem.elements;
        for(var i=0; i<elems.length; i++) {
            var x = elems[i];
            Form.fieldIsNotDirty(x);
        }
        $(elem).triggerHandler('undirty');
    },

    dirtyForm : function(elem) {
        elem = elem ? elt(elem) : Form._formElem;
        if ( elem && elem.tagName.toUpperCase() != "FORM" )
            elem = Y.util.Dom.getAncestorByTagName( elem, "form" );
        if ( elem ) {
            elem.lifeboatDirty = true;
            $(elem).triggerHandler('dirty');
        }
    },

    // set the current form's default values to their current values so the
    // "formIsDirty" check will return false unless values are changed from
    // the current ones.  Useful if you submit form data but leave the form
    // visible and want the lifeboat to do the right thing.
    unDirty : function() {
        if( Form._lifeBoatEnabled ) {
            Form.formIsNotDirty( Form._formElem );
        }
    },

    fieldHasLink : function(elem) {
        var linkregex = "(\\s|^)(http://|https://)?([^/\\s\\/]+(\\.[a-zA-Z]{2,4}))(/[^?\\s]*)?(\\?[^#\\s]*)?(#[^\\s]*)?(\\s|$)";

        rex = new RegExp(linkregex, "i");

        return rex.exec(elem.value) != null;
    },

    fieldIsDirty : function(elem) {

        // elements without names do not get
        // submitted so they are never dirty
        if(!elem.name) return false;

        if ( elem.tagName.toLowerCase() == "button" )
            return false;
        
        //fixme: there are more cases in this switch
        //statement.  These are just the minimum ones
        //needed for the club edit page
        switch(elem.type) {
            case "checkbox":
            case "radio":
                if(elem.checked != elem.defaultChecked)
                    return true;
                break;
            case "submit":
            case "reset":
            case "image":                
            case "button":
                return false;
                break;
            case "select-one":
                var o = elem.options;
                var dirtyIndex;
                var foundDefaultSelected = false;
                for(var i=0; i<o.length; i++) {
                    var option = o[i];
                    if ( option.defaultSelected )
                    {
                        foundDefaultSelected = true;
                    }
                    if(option.defaultSelected != option.selected)
                    {
                        dirtyIndex = i;
                    }
                }
                if ( dirtyIndex != null )
                {
                    // If no option had a "selected" attribute specified originally,
                    // then the browser assigns that attribute implicitly to the first
                    // option. However , it doesn't also give that option 
                    // defaultSelected=true, so it comes up as a false positive.
                    // We avoid that here by saying "if the list doesn't specify a
                    // defaultSelected, a selected item with index 0 isn't dirty."
                    if ( foundDefaultSelected || dirtyIndex > 0 )
                        return true;
                }
                break;
            case "hidden":
                // Note: hidden fields can never be considered
                // dirty because the "defaultValue" property does
                // not work correctly when "value" is modified via
                // the DOM.  If you are modifying the value of a
                // hidden field, you must indicate that the form
                // is dirty in another way, e.g. by calling
                // Form.dirtyForm(formElem)

                return false;
            default:
                if(elem.defaultValue != elem.value)
                {
                    return true;
                }
                break;
        }
        return false;
    },

    // set the element's .defaultXXX property so that its current
    // value will not be considered "dirty".  This is a direct analog
    // to fieldIsDirty, which compares .value with the default state
    fieldIsNotDirty : function(elem) {
        switch(elem.type) {
            case "checkbox":
            case "radio":
                elem.defaultChecked = elem.checked;
                break;
            case "submit":
            case "reset":
            case "image":                
            case "button":
                break;
            case "select-one":
                var o = elem.options;
                var dirtyIndex;
                var foundDefaultSelected = false;
                for(var i=0; i<o.length; i++) {
                    var option = o[i];
                    option.defaultSelected = option.selected;
                }
                break;
            case "hidden":
                break;
            default:
                elem.defaultValue = elem.value;
                break;
        }
    },

    _navigate : function() {
        if( Form._lifeBoatEnabled && Form.formIsDirty( Form._formElem ) ){
            return Form._lifeBoatMsg;
        }
    },
    
    // The validate object is used by the rest of the Form library, however clients 
    // can use it in a more stand alone way.  
    //
    // For example:
    //  Form.init("my_form", null, null, my_validation_info); /* notice: not using lifeboating or submission */
    //  ....
    //  Y.util.Connect.setForm(my_form');
    //  Y.util.Connect.asyncRequest('POST', "/primary_action", primary_cb....
    //  function primary_cb() {
    //    success: function(o) {
    //        ...   
    //    },
    //    failure: function(o) {
    //        Form.validate.show_alerts( { field: "generic", reason: "generic" } );
    //        
    //    }        
    // }
    //
    //  Y.util.Connect.setForm(my_form');
    //  Y.util.Connect.asyncRequest('POST', "/secondary_action", secondary_cb....
    //  function secondary_cb() {
    //    success: function(o) {
    //        ...   
    //    },
    //    failure: function(o) {
    //        Form.validate.show_alerts( { field: "generic", reason: "generic" } );
    //        
    //    }        
    // }
    
    // Some values checked for lifeboat purposes against the element's "default" 
    // defaultValue will never match the input's unedited value, since it's fixed up by the
    // client for display. If that's the case, call Form.fieldIsNotDirty()
    
    validateField: function (field) {
        var prefixMatch = field.name.match(/^([^\.]+)\./),
            prefix = prefixMatch && prefixMatch[1],
            sectionName = Form.sectionNameForPrefix(prefix),
            extensions = Form._extensions && Form._extensions[sectionName],
            fieldName = prefix ? field.name.substr(prefix.length + 1) : field.name;
            suffix = null;
        if (extensions) {
            for (var i = 0; i < extensions.length; i++) {
                var ext = extensions[i];
                if (fieldName.lastIndexOf(ext) === fieldName.length - ext.length) {
                    suffix = ext;
                    fieldName = fieldName.substr(0, fieldName.length - ext.length);
                    break;
                }
            }
        }
        var validator = Validators[sectionName][fieldName];
        if (!validator) return;
        
        var error = Form.validate._check_value_error_inner(field.name, validator, field);
        if (error) {
            error.suffix = suffix;
            Form.validate.show_alert(error);
        }
        return error;
    },
    
    sectionNameForPrefix: function (prefix) {
        for (var name in Form._validateSections) {
            var section = Form._validateSections[name];
            if (section.prefix === prefix || (!prefix && !section.prefix)) {
                return name;
            }
        }
        return null;
    },
        
    validate : {
    
        // this is named opposite of the server side check_fields because
        // it actually returns a blob of information about the errors, rather
        // than just true/false.  So null is success.
    
        check_field_errors : function(sectionName, sectionInfo, suffix) {
            if ( !window.Validators ) {
                Log.debug("Form.validate: no form Validators installed");
                return null;
            }

            suffix = suffix || "";
            var validators = Validators[sectionName];
            var result = null;
            for(var fieldName in validators)
            {
                var validator = validators[fieldName];
                if (sectionInfo.prefix) {
                    fieldName = sectionInfo.prefix + "." + fieldName + suffix;
                }
                
                // check for any normal/known validation error as well as any flagged by auxillary validation routines
                var err = Form.validate.check_value_error(fieldName, validator) || Form._auxillaryValidationErrors[fieldName];
                if(err)
                {
                    if(suffix) err.suffix = suffix;

                    if(!result)
                    {
                        result = []
                    }
                    result[result.length] = err;
                    Log.info("field failed validation: " + fieldName);
                }
            }
            return result;
        },
    
        check_value_error : function(fieldname, validator) {
            var elem = Form._formElem.elements[ fieldname ];
            if(!elem)
            {
                //Log.debug("element " + fieldname + " not found");
                return null;
            }
            if(elem.type == "hidden")
            {
                //Log.debug("skipping client-side check on hidden field " + fieldname);
                return null;
            }
            if(elem.disabled)
            {
                //Log.debug("skipping client-side check on disabled field " + fieldname);
                return null;
            }            
            if(!validator)
            {
                Log.debug("no validator");
                return null;
            }            

            var err = Form.validate._check_value_error_inner( fieldname, validator, elem );
            
            // If an onValidate handler was specified, it gets a chance to override
            // the failure with another error (or success).
            if ( Form._onValidate )
            {
                var overrideErr = Form._onValidate( elem, fieldname, validator, err );
                if ( typeof overrideErr != "undefined" ) {
                    Log.debug( "onValidate override for field: " + fieldname + "; previous error: " + ( err ? err.reason : 'none' ) ); 
                    err = overrideErr;
                }
            } 
            
            return err;
        },
        
        _check_value_error_inner: function(fieldname, validator, elem, value) {   
            var value = Y.lang.trim( typeof value === 'undefined' ? elem.value : value );
            var emptyValue = ( 
                !value || ( elem.type == "checkbox" && !elem.checked )
            );
            if( emptyValue )
            {
                if( validator["req"] )
                {
                    // Client-side only hack: the 'req' value can be a function, eval'd dynamically
                    if ( typeof validator["req"] != "function" || validator["req"]( fieldname ) ) 
                    {
                        Log.warn("required field " + fieldname + " empty");
                        return { reason : "missingValue", field : fieldname, validator : validator }
                    }
                }
                return null;
            }
    
            var type = validator["type"];
            switch(type)
            {
                case "int":
                    var num = parseInt(value);
                    if( isNaN(num)
                            || (validator.max != null && num > validator.max)
                            || (validator.min != null && num < validator.min)
                            || !value.match( /^\d+$/ ) )
                    {
                        Log.warn("bad number: " + fieldname);
                        return { reason : "badNumber", field : fieldname, max : validator.max, min : validator.min, validator : validator };
                    }
                    break;
                case "float":
                    var num = parseFloat(value);
                    if( isNaN(num)
                            || (validator.max != null && num > validator.max)
                            || (validator.min != null && num < validator.min)
                            || !value.match( /^\d*(\.\d+)?$/ ) )
                    {
                        Log.warn("bad float: " + fieldname);
                        return { reason : "badNumber", field : fieldname, max : validator.max, min : validator.min, validator : validator };
                    }
                    break;
                case "text":
                    if((validator.max != null && value.length > validator.max)
                        || (validator.min != null && value.length < validator.min) )
                    {
                        Log.warn("string length out of range: " + fieldname);
                        return { reason : "stringLength", field : fieldname, max : validator.max, min : validator.min, validator : validator };
                    }
                    break;
                case "date":
                    // interpret/reformat dates in place
                    var newdate = Form.validate.validate_date(value);
                    if ( Y.lang.isString( newdate ) ) {
                        Log.warn("bad date: " + fieldname);
                        return { reason : newdate, field : fieldname, validator : validator };
                    }
                    $assert( newdate );
                    var dateStr = Time.toUiDate( newdate, true, true );
                    if ( dateStr != value ) {
                        elem.value = dateStr;
                    }
                    break;
                case "isrc":
                    var newisrc = Form.validate.isrc(value, validator);
                    if (newisrc) {
                        // This breaks edit_album_v2 because it depends on input change events to mark tracks as dirty, but
                        // this event doesn't fire if JS changes the value before the element has blurred.  As a short-term
                        // workaround, let's just not reformat on validate.
                        //elem.value = newisrc;
                    }
                    else {
                        Log.warn("bad isrc: " + fieldname);
                        return { reason : "badisrc", field : fieldname, validator : validator };
                    }
                    break;
                case "upc":
                    var newupc = Form.validate.upc(value, validator);
                    if (newupc)
                        elem.value = newupc;
                    else {
                        Log.warn("bad upc: " + fieldname);
                        return { reason : "badupc", field : fieldname, validator : validator };
                    }
                    break;
            }
    
            if(validator["match"])
            {
                rex = new RegExp(validator["match"])
                if(!rex.test(value))
                {
                    Log.warn("failed pattern match: " + fieldname);
                    return { reason : "badFormat", field : fieldname, customMessage : validator["message"], validator : validator };
                }
            }

            if(validator["clientproc"])
            {
                try
                {
                    var fn = eval(validator["clientproc"])
                    var result = fn(fieldname, value);
                    if(result)
                    {
                        result.validator = validator;
                        return result;
                    }
                }
                catch(e)
                {
                    Log.error("validate: error executing clientproc: " + validator["clientproc"]);
                }
            }
    
            return null;
        },
    
        parsePrice : function(value) {
            value = Y.lang.trim( value );
            if ( value.search( Form.INTL_FLOAT_PATTERN ) == 0 )
                value = value.replace( ",", "." );
                // allow e.g. '1,00' for intl friendliness
            return parseFloat(value);
        },
    
        validate_date : function(value) {
            var d = Time.strToDate(value);
            
            if (d) {
                var fullYear = d.getFullYear();
                // Enforce the 32-bit time restriction on dates: approx. 1902-2038.
                if ( fullYear > 2037 || fullYear < 1902 )
                    return "dateOutOfRange";
                return d;
            }
            return "dateFormat";
        },


        // NOTE: This is a convenience utility for calling  *outside*  the form
        // utility; there is no built-in support for price validation.  Price
        // validation requires contextual knowledge, namely currency.  It is
        // written as an adjunct to normal validation, i.e. does not test for
        // non-parseability or normal range checking.
        //
        // Assumes you have validators set up to verify the values once it's entered,
        // but they may not be set to 'required' since you want one of a group.
        // So we check for missing, but not for unparseable, nor normal range checking,
        // but we handle the special case for "name your price" scenarios where zero is
        // allowed, but there is a non-zero minimum (smallest processable price).  We
        // could build this into the Validator as a special extension of float; however
        // the validation on the server is not currency-aware and needs special handling
        // at save anyway.
        //
        // id - id of the number text field
        // nonzero_min - if present, assume zero is allowed, and this is the smallest
        //  nonzero entry allowed
        //
        // Has hard-coded UISTRINGs.  These could be paramterized.
        //
        validate_price: function( id, required, nonzero_min, alert_id, alert1, alert2, zeroAlert, nonzero ) {
    
            var priceAlert = alert_id ? elt(alert_id) : Form.validate.get_alert_elt(id);
            //if ( priceAlert ) FormUtils.showHideAlert( priceAlert, null );
    
            var priceElem = elt( id ) || Form._formElem.elements[id];
            //Y.util.Dom.removeClass(priceElem, "has-validation-error");
            if ( priceElem ) {
                var value = Y.lang.trim(priceElem.value);
                if ( value.length == 0 && priceAlert ) {
                    if ( required ) {
                        Log.debug('Missing required price for ', id);
                        FormUtils.showHideAlert( priceAlert, alert1 || "Please provide the price." );
                        Y.util.Dom.addClass(priceElem, "has-validation-error");
                        return false;
                    }
                } else if ( nonzero_min && priceAlert ) {
                    price = Form.validate.parsePrice( value );
                    if ( !isNaN(price) ) {
                        if (nonzero && price == 0 && zeroAlert) {
                            Log.debug('Zero price is not allowed for ', id);
                            FormUtils.showHideAlert(priceAlert, zeroAlert);
                            Y.util.Dom.addClass(priceElem, "has-validation-error");
                            return false;
                        }
                        else if (price < nonzero_min && (nonzero || price != 0)) {
                            Log.debug('Price out of range for ', id);
                            var msg =  alert2 || "This price is too small to process.  Please enter " + (nonzero ? "" : "either zero, or ") + TextFormat.currency(nonzero_min, CurrencyData.current, false, true, true) + " or more.";
                            FormUtils.showHideAlert( priceAlert, msg );
                            Y.util.Dom.addClass(priceElem, "has-validation-error");
                            return false;
                        }
                    }
                }
            }
    
            return true;
        },
        
        // same as above, only zero not allowed either.
        validate_price_nonzero: function( id, required, nonzero_min, alert_id, alert1, alert2, zeroAlert ) {
            return Form.validate.validate_price(id, required, nonzero_min, alert_id, alert1, alert2, zeroAlert, true);
        },

        // onchange handler to convert nn,nn to nn.nn
        priceOnChangeHandler: function(event) {
            var value = Y.lang.trim( this.value );
            if ( value != "" && ( value.search( Form.INTL_FLOAT_PATTERN ) == 0 ) )
                this.value = value.replace( ",", "." );
        },

        // keep this in sync with UPC.rb
        isrc : function(value, validator) {
            var i, ct;
            i = value.replace(/ |-|\//g, '').toUpperCase();
            if (i.length != 12)
                return null;
            ct = i.substr(0,2);                         // first two characters are valid country code
            // disable country code checking; see [341966]
            if (false && validator) {
                var found = Iter.find(validator["country_codes"], function(item) {return item == ct});
                if (!found)
                    return null;
            } else {
                if (!ct.match(/[A-Z]{2,2}/))  // first two are alpha
                    return null;
            }
            if (!i.substr(2,3).match(/[0-9A-Z]{3,3}/))  // next three are alphanum
                return null;
            if (!i.substr(5,7).match(/[0-9]{7,7}/))     // the rest are numeric
                return null;
            return i.substr(0,2) + "-" + i.substr(2,3) + "-" + i.substr(5,2) + "-" + i.substr(7,5);
        },

        // keep this in sync with UPC.rb
        upc : function(value, validator) {
            var i;
            i = value.replace(/ |-|\//g, '');
            if (i.length != 12 && i.length != 13)
                return null;
            if (i.match(/[^0-9]/))     // all numeric
                return null;
            if (i.length == 12)
                return i.substr(0,6) + " " + i.substr(6,6);
            else
                return i.substr(0,7) + " " + i.substr(7,6);
        },

        clear_alerts : function() {
            var elems = Y.util.Dom.getElementsByClassName("alertActive", null, null);
            Iter.each( elems, Form.validate.clear_alert );
            $('.has-validation-error', Form._formElem).removeClass('has-validation-error');
        },
        
        clear_alert : function( elem ) {
            FormUtils.showHideAlert( elem, null );
        },

        onchange_maybe_hide_alert : function(event, errobj) {
            var targetEl = Y.util.Event.getTarget( event );

            // if the validator which failed for this field is now
            // happy, hide the alert and stop watching this field
            if(errobj.validator && !Form.validate.check_value_error(errobj.field, errobj.validator))
            {
                var alertEl = Form.validate.get_alert_elt(errobj.field);
                Y.util.Dom.removeClass(targetEl, "has-validation-error");
                Y.util.Dom.removeClass(alertEl, "alertActive");
                Form.validate.remove_onchange_listeners( targetEl );
            }
        },
        
        remove_onchange_listeners: function( elem ) {
            Y.util.Event.removeListener( elem, "keyup", Form.validate.onchange_maybe_hide_alert );
            Y.util.Event.removeListener( elem, "change", Form.validate.onchange_maybe_hide_alert );
        },
        
        show_alerts : function( errors ) {
            if ( !errors )
                errors = [ { field: "generic", reason: "generic" } ];
            else if ( !Y.lang.isArray( errors ) )
                errors = [errors];
            for ( var i=0; i < errors.length; i++ )
                Form.validate.show_alert( errors[i] );
            Form.revealError();
        },
    
        show_alert : function(err) {
            // find the corresponding _alert element for the field
            var elem = Form.validate.get_alert_elt(err.field);
            var errortext = Form.validate.get_error_text(err);
            if(elem)
            {
                FormUtils.showHideAlert( elem, errortext );
                if(window != top && Dialog.iframeComm)
                {
                    Dialog.iframeComm.updateDialogHeight();
                }

                var fieldElem = Form._formElem.elements[ err.field ];
                Y.util.Dom.addClass(fieldElem, "has-validation-error");
                Y.util.Event.addListener(fieldElem, "keyup", Form.validate.onchange_maybe_hide_alert, err);
                Y.util.Event.addListener(fieldElem, "change", Form.validate.onchange_maybe_hide_alert, err);
                
            }
            else
            {
                var e;
                try {
                    Dialog.alert("Oops!", errortext);
                } catch(e) {
                    // Dialog should always be around, but I'm being paranoid as I've
                    // added this on 2012-08-27 (!).
                    alert(errortext);
                }
            }
        },
        
        get_alert_elt : function(field) {
            return (
                elt(field + '_alert') || elt(field + '-alert') ||
                $(Form._formElem.elements[field]).siblings('.alert')[0] ||
                $(Form._formElem.elements[field]).closest('label').siblings('.alert')[0] ||
                $(Form._formElem.elements[field]).closest('.fieldHintWrapper').siblings('.alert')[0] ||
                $(Form._formElem.elements[field]).closest('.jquery-placeholder-wrapper').siblings('.alert')[0] ||
                $(Form._formElem.elements[field]).closest('.acWidget').siblings('.alert')[0]
            );
        },
    
        get_error_text : function(error) {
            var reason = error.reason;
            
            //UISTRING all over the place in this function
            var fieldName = error.field;

            // check for supplied id suffix (typically, numerical indexing for arrays of
            // similar values), look up the base field name:
            if ( error.suffix ) {
                if ( fieldName.lastIndexOf( error.suffix ) == fieldName.length - error.suffix.length )
                    fieldName = fieldName.substring( 0, fieldName.length - error.suffix.length );
            }

            var displayName = fieldName;
            if ( window.Validators && Validators._fieldNames && Validators._fieldNames[displayName] )
                displayName = Validators._fieldNames[displayName];
            
            // check for a custom message defined on the client
            if ( Form._validateMessages ) {
                var messages = Form._validateMessages[ fieldName ];
                if ( messages ) {
                    var message = messages[ reason ];
                    if ( message )
                        return message;
                }
            }
            
            // check for a message defined by the validator on the server
            if(error.customMessage)
            {
                return error.customMessage;
            }

            switch(reason)
            {
                case "missingValue":
                    if(displayName)
                    {
                        return "Required field: " + displayName + ".";
                    }
                    else
                    {
                        return "Required field."
                    }
                case "badNumber":
                    if(error.min != null && error.max != null)
                    {
                        return "A number between " + error.min + " and " + error.max + " is required.";
                    }
                    else if(error.min != null)
                    {
                        return "A number (at least " + error.min + ") is required.";
                    }
                    else if(error.max != null)
                    {
                        return "A number (up to " + error.max + ") is required.";
                    }
                    else
                    {
                        return "A number is required.";
                    }
                case "stringLength":
                    if ( error.min != null && error.max != null )
                        return "This value must be between " + error.min + " and " + error.max + " characters.";
                    else if ( error.min != null )
                        return "This value is too short (minimum length: " + error.min + " characters).";
                    else {
                        $assert( error.max != null );
                        return "This value is too long (maximum length: " + error.max + " characters).";
                    }
                case "badFormat":
                    return "Invalid " + displayName + " format.";
                case "dateFormat":
                    return "Please enter a date in the form mm/dd/yyyy.";
                case "dateOutOfRange":
                    return "Please enter a date between 1902 and 2037.";
                case "badisrc":
                    return "Please enter a valid ISRC code (or leave blank).";
                case "badupc":
                    return "Please enter a valid UPC/EAN code (or leave blank).";
            }

            if(displayName)
            {
                return "error: field=" + displayName + ", reason=" + reason;
            }
            else
            {
                // worst case scenario: just show the ugly reason
                return "error: " + reason;
            }
        }
    }
});

var SimpleForm = {
    submit: function(path, params, method) {
        method = method ? method : "post"; // Set method to post by default, if not specified.
    
        var temp_form = document.createElement("form");
        temp_form.setAttribute("method", method);
        temp_form.setAttribute("action", path);
    
        for(var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
    
            temp_form.appendChild(hiddenField);
        }
        document.body.appendChild(temp_form);
        temp_form.submit();
    }
};




;
/* ------------- BEGIN cookie_comm.js --------------- */;
// This file requires Cookie to be loaded first.


// A cookie-based communication channel used to pass data between two or
// more frames or in-process windows from different origins (protocols, hostnames, 
// and/or ports). This requires that communicating documents be served from the 
// same primary domain. To listen for messages, register a message handler using
// the .subscribe method and call the startListening method. When a message arrives,
// subscribers will be called with the following array parameter:
//    [sendingChannelId, messageName, arg1, arg2...]
// To send a message, call the send method.
// channelName: an identifier for the communication channel. Each participant in
//    the conversation must specify the same name.
// uniquify: if true, the passed-in name will be suffixed with a globally
//    unique ID. You can discover the resulting name with the getName() method.
//    A randomized name is useful if you can pass it to the other instances in
//    the conversation (for example, via a URL), because then the conversation 
//    won't overlap with any other in other windows or tabs.
if( !window.Cookie )
    throw "expected Cookie library";

Cookie.CommChannel = function( channelName, uniquify ) {
    
    $assert( Text.notEmpty( channelName ) );

    this._id = Math.round( Math.random() * 1e9 );
    if ( uniquify )
        channelName += this._id;
    this._channelName = channelName;
    var namePrefix = Cookie.CommChannel.COOKIE_NAME_PREFIX + channelName;
    this._cookieName = namePrefix + "_" + this._id;
    this._namePattern = new RegExp( "^" + Text.regexpEscape( namePrefix ) + "_(\\d+)$" );
    this._queue = { last: 0, msgs: [] }; // serialized and stored in our cookie
    this._lastSeen = {}; // a hash of remote ids mapped to the last seen index for each
    this._scanTimer = null;
    
    Cookie.clear( this._cookieName );
};

Cookie.CommChannel.EVENT_NAME = "cookiecomm_message";
Cookie.CommChannel.COOKIE_NAME_PREFIX = "_comm_";
Cookie.CommChannel.MAX_QUEUE_SIZE = 5; // conservatively small to limit cookie size
Cookie.CommChannel.SCAN_TIMEOUT = 250; // 4 scans per second
Cookie.CommChannel.COOKIE_MAX_AGE = 5; // Give listeners 5 seconds to recv messages

Cookie.CommChannel.prototype = {
        
    getName: function() {
    
        return this._channelName;
    },
        
    // Starts scanning for messages from remote instances.  
    startListening: function() {
        
        if ( !this._scanTimer ) {
            var that = this;
            var timerCallback = function() { that._scanAllQueues() };
            this._scanTimer = setInterval(timerCallback, Cookie.CommChannel.SCAN_TIMEOUT); 
            Log.info('Cookie comm channel ' + this.getName() + ' started listening.');
        }
    },
    
    // Stops scanning for messages
    stopListening: function() {
        
        if ( this._scanTimer ) {
            clearInterval(this._scanTimer);
            this._scanTimer = null;
            Log.info('Cookie comm channel ' + this.getName() + ' stopped listening.');
        }
    },

    subscribe : function(callback) {
        $(document).on(Cookie.CommChannel.EVENT_NAME + "_" + this._id, callback);
    },
    unsubscribe : function(callback) {
        $(document).off(Cookie.CommChannel.EVENT_NAME + "_" + this._id, callback);
    },
    
    // Adds a message to this object's queue and publishes it to all remote listeners.
    // They will a chance to receive the new data the next time they poll.
    // Note that if you call this method many times in a short period, it's 
    // possible that older messages will drop off the queue before they're seen 
    // by remote listeners.
    // msgName: a string identifying the message. Recognized names include
    //    "close" (for closing the dialog) and "height" (for updating the 
    //    dialog height). For custom messages, pick any name you prefer.
    // arg1, arg2...: any additional parameters associated with the message.
    //    This data should be JSON-compatiable.
    send: function( msgName /* arg1, arg2... */ ) {

        $assert( U.isString( msgName ) );
        
        // convert the arguments object to a real array
        // (otherwise, the json serializer doesn't treat it as such)
        var msg = Iter.collect( arguments );
        Log.debug('Cookie comm channel ' + this.getName() + ' sending message ' + msg[0], msg);
        // for cookie compactness, strip off any null/undef values at
        // the end of the message array (they're probably unused optional params)
        for ( var i = msg.length - 1; i > 0; i-- ) {
            if ( msg[i] == null )
                msg.pop();
            else
                break;
        }
        
        var msgs = this._queue.msgs;
        msgs.push( msg );
        this._queue.last++;
        
        if ( msgs.length > Cookie.CommChannel.MAX_QUEUE_SIZE )
            this._queue.msgs = msgs.slice( 1 );
            
        // Write the cookie asynchronously so multiple sends within this tick
        // will be written to the cookie at once.
        if (this._writeTimeout) clearTimeout(this._writeTimeout);
        var self = this;
        this._writeTimeout = setTimeout(function () {
            self._writeQueue();
        }, 0);
    },
    
    // Stops the listening timer, clear data and removes the cookie associated 
    // with this instance.
    cleanup: function() {
        Cookie.clear( this._cookieName );
        this.stopListening();
        this._lastSeen = this._queue = null;
    },
    
    _writeQueue: function() {
        
        //sdg TODO: we run the risk of exceeding the browser's cookie length
        //   limits, depending on how much data is in the queue. We might want
        //   to complain if a message's serialization is too long.
        //sdg TODO: these cookies are intended for client-side only communication,
        //   but like all cookies, they are included in each HTTP request to
        //   the server. We could look into stripping these cookies out of
        //   XHR requests (by setting the Cookie header ourselves, if that works).
        //   There's nothing we can do to prevent them going out with non-XHR
        //   requests.

        var json = JSON.stringify( this._queue );
        Cookie.set( this._cookieName, json, Cookie.CommChannel.COOKIE_MAX_AGE );
    },
    
    // Examines all remote queues for new messages, notifying the listener
    // for each that has something new.
    _scanAllQueues: function() {
    
        var cookies = Cookie.getAll();
        for ( var name in cookies ) {
            var match = this._namePattern.exec( name );
            if ( !match )
                continue;
            var queueId = match[1] - 0;
            if ( queueId === this._id )
                continue; // ignore our own messages
            var json = cookies[ name ];
            $assert( !U.isArray( json ), "we expect only one cookie per name" );
            var queue = eval( "(" + json + ")" );
            this._scanOneQueue( queueId, queue );
        }
    },
    
    _scanOneQueue: function( queueId, queue ) {
        
        var lastIndex = queue.last;
        $assert( U.isNumber( lastIndex ) );
        var lastSeenIndex = this._lastSeen[ queueId ] || 0;
        var newCount = lastIndex - lastSeenIndex;
        if ( newCount > 0 ) {
            var newMsgs = queue.msgs.slice( -newCount );
            $assert( newMsgs.length );
            this._lastSeen[ queueId ] = lastIndex;
            
            // notify subscribers about each message in turn
            for ( var i=0; i < newMsgs.length; i++ ) {
                var msgArr = newMsgs[i];
                Log.debug('Cookie comm channel ' + this.getName() + ' received from ' + queueId + ' message ' + msgArr[0], msgArr);
                msgArr.unshift( queueId ); // add the sender ID as the first entry
                $.event.trigger( Cookie.CommChannel.EVENT_NAME + "_" + this._id, [msgArr] );
                if ( !this._scanTimer )
                    break; // a subscriber called cleanup while handling the event
            }
        }
    }
};

;
/* ------------- BEGIN playlist.js --------------- */;
var Player = {};

//fixme: factor out Cookie stuff

// the playlist class holds a list of trackinfo objects
// which contain metadata about the tracks, including keeping
// track of the playstate.  It is used by the various player
// 'view' classes to control a common playlist for the page

Player.TrackInfo = function(){
    function TrackInfo(hash) {
        this.update(hash);
    }
    TrackInfo.prototype = {
        update : function(hash) {
            var props = PROPS;
            for (var i=0; i<props.length; i++) {
                this[props[i]] = hash[props[i]];
            }
            return this;
        },
        is_playable : function() {
            return !!this.file;
        },
        is_busy : function() {
            return this.encoding_pending && !this.encoding_error;
        },
        mark_as_capped : function() {
            this['is_capped'] = true;
        },
        copy : function() {
            var result = {};
            var props = PROPS;
            for (var i=0; i<props.length; i++) {
                result[props[i]] = this[props[i]];
            }
            return result;
        }
    };
    TrackInfo.is_same = function(trackinfo_a, trackinfo_b) {
        var props = PROPS;
        for (var i=0; i<props.length; i++) {
            if (trackinfo_a[props[i]] != trackinfo_b[props[i]]) {
                return false;
            }
        }
        return true;
    };
    var PROPS = [   
        "tracknum", 
        "file", 
        "encoding_error", 
        "encoding_pending", 
        "title", 
        "title_link", 
        "id", 
        "has_lyrics", 
        "has_info", 
        "is_downloadable", 
        "free_album_download", 
        "has_free_download", 
        "duration",  
        "private", 
        "album_private", 
        "artist", 
        "album_preorder", 
        "unreleased_track", 
        "alt_link", 
        "continuous",
        "video_source_type", 
        "video_caption",
        "video_id", 
        "video_mobile_url",
        "is_capped"
    ];

    return TrackInfo;
}();
 
Player.Playlist = function() {
    /*
        options is a hash supporting the following options so far:
            .no_trackstate -> suppress tracking playstate in a cookie
                              to continue play across navigation
            .savepos       -> when PlaylistCoordinator automatically
                              stops this player, use pause() instead of stop() so
                              the position is not lost
    */
    function Playlist(player, playing_from, referer, options) {
        options = options || {};
        this._options = options;
        this._player = player;
        this._playlist = [];
        this._playing_from = playing_from;
        this._referer = referer;
        this._track = 0;
        this._loadedtrack = -1;
        this._loadpercent = 0;
        this._duration = null;
        this._state = "IDLE";
        this._unloaded = true;
        this._scrubbed = false;
        this._trackstate = !(options.no_trackstate); //controls whether or not state is saved/loaded in cookie
        this._trackchanged = EventSender.create(this, "trackchanged");
        this._trackplayed = EventSender.create(this, "trackplayed");
        this._trackcapped = EventSender.create(this, "trackcapped");
        this._scrubbedback = EventSender.create(this, "scrubbedback");
        this._completedplay = EventSender.create(this, "completedplay");
        this._playlistchanged = EventSender.create(this, "playlistchanged");
        this._statechanged = EventSender.create(this, "statechanged");
        this._loaded = EventSender.create(this, "loaded");
        this._timechanged = EventSender.create(this, "time");
        this.first_playable_track = -1;     // first and last *playable*
        this.last_playable_track = -1;      // tracks, since some have no audio.
        this._ui_listeners = new Object();  // whoever instantiates the playlist may want to listen for certain events.

        this._usecomm = true;

        var that = this;
        this._player.onstate(function(target, arg) {
            if (that._unloaded) return;
            // note: use that._state here for oldstate because we may have ignored
            // some player state changes due to being 'unloaded', so arg.oldstate
            // may not actually reflect the state we have reported to our listeners
            that._handle_state({ oldstate: that._state, newstate: arg.newstate });
        });
        this._player.ontime(function(target, arg) {
            if (that._unloaded) return;
            that._handle_time(arg);
        });
        this._player.onloaded(function(target, arg) {
            if (that._unloaded) return;
            that._handle_load(arg);
        });

        // automatically add all playlists to a global PlaylistCoordinator owned by
        // the Playlist class
        if (!Playlist.coordinator) {
            Playlist.coordinator = new Player.PlaylistCoordinator();
        }
        Playlist.coordinator.add(this);
    }

    Playlist.prototype = {
        getoption : function(key) {
            return this._options[key];
        },
        add_track : function(trackinfo) {
            var trackinfo = new Player.TrackInfo(trackinfo);
            var result = this._playlist.push(trackinfo) - 1;
            this._playlist[result].tracknum = result;
            if (trackinfo.is_playable()) {
                if (this.first_playable_track == -1) {
                    this.first_playable_track = result;
                    this._track = result;
                }
                this.last_playable_track = result;
            }

            this._playlistchanged();
            return result;
        },
        set_initial_track : function(i) {
            if (this._playlist[i] && this._playlist[i].is_playable()) {
                this._track = i;
            }
        },
        update_trackinfo : function(i, trackinfo) {
            trackinfo.tracknum = i;
            trackinfo = this._playlist[i].update(trackinfo);
            // force a reload-- might in fact be a completely different track
            this._loadedtrack = -1;
            
            // the first/last playable indices in the
            // playlist may have changed.  update them.
            if (trackinfo.is_playable()) {
                if (this.first_playable_track == -1 || i < this.first_playable_track) {
                    this.first_playable_track = i;
                }
                if(this.last_playable_track == -1 || i > this.last_playable_track) {
                    this.last_playable_track = i;
                }
            } else {
                if (i == this.first_playable_track) {
                    this.first_playable_track = -1;
                    for (var j = i+1; j<this._playlist.length; j++) {
                        if (this._playlist[j].is_playable()) {
                            this.first_playable_track = j;
                            break;
                        }
                    }
                }
                if (i == this.last_playable_track) {
                    this.last_playable_track = -1;
                    for (var j = i-1; j>=0; j--) {
                        if (this._playlist[j].is_playable()) {
                            this.last_playable_track = j;
                            break;
                        }
                    }
                }
            }

            this._playlistchanged();

            if (this._state == "BUSY" && trackinfo.is_playable()) {
                this.play();
            }
        },
        playpause : function() {
            var result = null;
            switch (this._state) {
                case "IDLE":
                case "COMPLETED":
                case "PAUSED":
                    this.play();
                    result = 1;
                    break;
                case "PLAYING":
                case "BUFFERING":
                    this._player.pause();
                    this._comm_stop();
                    result = -1;
                    break;
                case "BUSY":
                    this._player.stop();
                    this._comm_stop();
                    this._handle_state({ newstate: "IDLE", oldstate: this._state });
                    result = 0;
                    break;
            }
            return result;
        },

        play : function() {
            var tinfo = this._playlist[this._track];
            if (tinfo && tinfo.is_capped) {
                this._reset();
                this._trackcapped(tinfo.id);
                return;
            }

            switch (this._state) {
                case "IDLE":
                case "COMPLETED":
                case "BUSY":
                    Log.debug("playlist loading track " + this._track);

                    if (!tinfo) break; // happens with empty album

                    while (!tinfo.is_playable() && this._track < this.last_playable_track) {
                        this._track++;
                        tinfo = this._playlist[this._track];
                    }

                    //if this track is not playable and it
                    //is the only track and it is currently
                    //processing, go do the "BUSY" state
                    if (!tinfo.is_playable() && this._playlist.length == 1 && tinfo.encoding_pending) {
                        this._handle_state({ newstate: "BUSY", oldstate: this._state });
                    } else if (this._playlist[this._track].file) {
                        this._load();
                        this._player.play();
                        if (this._usecomm) {
                            try {
                                this._comm_start();
                                this._stop_other_players();
                            } catch (e) { }
                        }
                    }
                    break;
                case "PAUSED":
                case "BUFFERING":
                    this._player.play();
                    if (this._usecomm) {
                        try {
                            this._comm_start();
                            this._stop_other_players();
                        } catch (e) { }
                    }
                    break;
            }
            
            var idx = this._track;
            this._trackplayed(idx);
        },
        pause : function() {
            switch (this._state) {
                case "PLAYING":
                case "BUFFERING":
                    this._player.pause();
                    this._comm_stop();
                    break;
                case "BUSY":
                    this._player.stop();
                    this._comm_stop();
                    this._handle_state({ newstate: "IDLE", oldstate: this._state });
                    break;
            }
        },
        stop : function() {
            this._player.stop();
            this._handle_state({ newstate: "IDLE", oldstate: this._state });
        },
        seek : function(pos) {
            this._unloaded = false;

            var tinfo = this._playlist[this._track];
            if (tinfo && tinfo.is_capped) {
                this._reset();
                this._trackcapped(tinfo.id);
                return;
            }

            if (pos <= 2 && this._playstat == null) {
                var tinfo = this._playlist[this._track];
                if (tinfo && tinfo.is_capped) {
                    this._reset();
                    this._trackcapped(tinfo.id);
                    return;
                } else if (tinfo) {
                    this._scrubbedback(tinfo.id);
                }
                this._scrubbed = true;
            }

            this._player.seek(pos);
        },
        play_track : function(num, pos) {
            var tinfo = this.get_track_info(num);
            if (tinfo && tinfo.is_capped) {
                this._reset();
                this._trackcapped(tinfo.id);
                return;
            }

            if (this._loadedtrack != num) {
                this._state = "IDLE";
                this._player.stop();
                this._track = num;
                this._load();
            }
            this._unloaded = false;
            if (pos != null) {
                this.seek(pos)
            } else {
                this.play();
            }
        },
        percent_loaded : function() {
            return this._loadpercent || 0;
        },
        position : function() {
            return this._position;
        },
        duration : function() {
            if (this._duration != null) {    
                // prefer _duration because it comes back from sound as actual
                // duration of stream
                return this._duration;
            } else {
                // fall back to current track's stated duration if stream not actually
                // loaded yet
                var current_track = this.get_track_info();
                if (current_track) {
                    return current_track.duration;
                }
                return 0;
            }
        },

        // called to indicate the initialization is done
        // and all the tracks have been loaded
        init_complete : function() {
            if (this._trackstate && this._loadstate()) {
                // done
            } else {
                // otherwise, navigate to the first playable track; this makes views
                // that show track names more sensible in their initial, non-playing state
                // (i.e. don't show title of track 0 if we'll just be skipping it on Play).
                if(this._track > 0) {
                    this._trackchanged(this._playlist[this._track]);
                }
            }
        },
        
        register_listener : function(event_name, listener) {  
            var evlisteners = this._ui_listeners[event_name];
            if (evlisteners) {
                $assert($.isArray(evlisteners), "expected array of event listeners");
                evlisteners.push( listener );
            } else {
                evlisteners = new Array();
                evlisteners.push( listener );
                this._ui_listeners[event_name] = evlisteners;
            }  
        },
        player : function() {
            return this._player;
        },
        unload : function() {
            this.stop();
            this._unloaded = true;
            this._playlist = [];
            this._track = 0;
            this._loadedtrack = -1;
            this._loadpercent = 0;
            this._position = 0;
            this.first_playable_track = -1;
            this.last_playable_track = -1;
            this._playlistchanged();
            this._handle_state({ newstate: "IDLE", oldstate: this._state });
        },
        load : function(tracks) {
            this.unload();
            for (var i=0; i<tracks.length; i++) {
                this.add_track(tracks[i]);
            }
        },
        _reset : function() {
            this.stop();
            this._track = this.first_playable_track;
            this._trackchanged(this._playlist[this._track]);
            this._loadedtrack = -1;
        },
        _handle_state : function(arg) {
            if (this._state == arg.newstate) return;

            if (!(arg.newstate == "PLAYING" || arg.newstate == "BUFFERING")) {
                if(arg.newstate != "PAUSED") {
                    this._position = 0;
                }
                this._clearstate();
            }

            this._state = arg.newstate;
            if (arg.newstate == "COMPLETED" && (arg.oldstate == "PLAYING" || arg.oldstate == "BUFFERING" || arg.oldstate == "PAUSED")) {
                // special case where the playlist needs to be
                // aware of the UI: if the user is actively
                // seeking in a playing track, we don't want to do
                // anything when we get to the end, because when
                // he lets go of the thumb we will seek and want
                // to stay in the playing state.
                if (!this.seeking) {
                    if (this._track + 1 <= this.last_playable_track) {
                        this._state = "IDLE";
                        this._player.stop();
                        var current_track = this.get_track_info();
                        if (current_track && current_track.continuous == false) {                          
                            // leave this._track intact and fire off the state/track changed
                            this._statechanged(arg);
                        } else {
                            this.next_track();
                        }
                    } else {
                        // the last playable track has completed playback;
                        // reset to the first playable track so that subsequent
                        // plays function normally
                        this._track = 0;
                        this._loadedtrack = -1;
                        this._statechanged(arg);
                        this._trackchanged(this._playlist[this.first_playable_track]);
                    }
                }
            } else {
                this._statechanged(arg);
            }
        },
        _handle_load : function(arg) {
            if (arg.total == 0) {
                this._loadpercent = 0;
            } else {
                this._loadpercent = 100 * arg.loaded / arg.total;
            }

            this._loaded(this._loadpercent);
        },
        _handle_time : function(arg) {
            if (this._trackstate) {
                this._savestate(arg.position);
            }

            this._position = arg.position;
            this._duration = arg.duration;
            this._timechanged(arg);
            var trackinfo = this._playlist[this._track];
            
            if (this._playstat && arg.duration > 0) {
                if (!this._playstat.play_progress(arg.position, arg.duration)) {
                    this._playstat = null;
                    if (trackinfo && trackinfo != 'undefined') {
                        this._completedplay(trackinfo.id);
                    }
                }
            }

            var is_complete = Player.PlayStat.is_complete(arg.position, arg.duration);
            if (is_complete && this._scrubbed) {
                this._scrubbed = false;
                if (trackinfo && trackinfo != 'undefined') {
                    this._completedplay(trackinfo.id, true);
                }
            }
        },
        prev_track : function() {
            var idx = this._track;
            do {
                idx--;
            } while (idx >= 0 && !this._playlist[idx].file);

            if (idx == -1) {
                idx = 0;
            }

            this._track = idx;
            if (this._isplaying()) {
                this._state = "IDLE";
                this._player.stop();
            }

            this.play();
        },
        next_track : function() {
            var idx = this._track;
            do {
                idx++;
            } while (idx < this._playlist.length && !this._playlist[idx].file);

            if (idx == this._playlist.length) {
                idx = 0;
            }

            this._track = idx;
            if (this._isplaying()) {
                this._state = "IDLE";
                this._player.stop();
            }
            this.play();
        },
        get_state : function() { return this._state; },
        get_track : function() { return this._track; },

        // return a *copy* of the trackinfo hash for the specified
        // track (or the current track if none specified).
        get_track_info : function(index) {
            if (this._playlist.length == 0) return null;

            if (typeof index != "undefined") {
                return this._playlist[index].copy();
            }
            return this._playlist[this._track].copy();
        },

        cap_playback_for_track : function(track_id) {
            for (var i=0; this._playlist && i < this._playlist.length; i++) {
                var ti = this._playlist[i];
                if (ti.id == track_id) {
                    ti.mark_as_capped();
                    break;                  // what if this track_id is in this playlist multiple times?
                }
            }
        },

        length : function() { return this._playlist.length; },

        _notify_listeners : function( notification, idx ){

            var listeners = this._ui_listeners[notification];
            //this is a method that the client can add a listener for.
            if (listeners) {
                for (var i=listeners.length-1; i >= 0; i--){
                   listeners[i](idx);
                }
            } 
        },

        _load : function() {
            if (this._loadedtrack == this._track) { 
                this.seek(0);
                return;
            }

            this._loadedtrack = this._track;
            this._unloaded = false;
            this._player.load(this._playlist[this._track].file);
            this._loadpercent = 0;
            var trackinfo = this._playlist[this._track];
            this._trackchanged(trackinfo);
            this._playstat = new Player.PlayStat(trackinfo, this._playing_from, this._referer);
            this._scrubbed = false;
        },
        _isplaying : function() {
            return this._state == "PLAYING" || this._state == "PAUSED" || this._state == "BUFFERING";
        },

        _managestate: (Browser.platform != "iphone"),
        
        // check to see if there is a saved playerstate cookie
        // and if so, whether the track that was last playing
        // is in our playlist.  If so, load it up at the correct
        // time index and play.
        _loadstate : function () {
            if (!this._managestate) return false;
            Log.debug("reading/clearing playlist state");
            var used_saved_state = false;

            try {
                var state = Cookie.get(COOKIE_NAME);
                Cookie.clear(COOKIE_NAME);
                if (state = JSON.parse(state)) {
                    for (var i=0; i<this._playlist.length; i++) {
                        if (this._playlist[i].id == state.track_id) {
                            Log.debug("found player state, playing track " + i + " at pos " + state.pos);
                            this.play_track(i, state.pos);
                            used_saved_state = true;
                            break;
                        }
                    }
                }
            } catch (e) {}

            return used_saved_state;
        },
        _clearstate : function() {
            if (!this._managestate) return;
            try {
                Cookie.clear(COOKIE_NAME);
            } catch (e) {}
        },

        // if necessary, save the player state in a cookie in case
        // we switch pages and need to continue playing
        _savestate : function(pos) {
            if (!this._managestate || (this._state != "PLAYING" && this._state != "BUFFERING")) {
                return;
            }

            //cookie lifetime in seconds.  only needs to
            //live long enough to get us to the next page
            var track_id = this._playlist[this._track].id;

            // if the position has moved past the latency
            // threshold or if the track has changed, save
            // the state
            if (Math.abs(this._saved_pos - pos) > SAVE_LATENCY || track_id != this._saved_track_id) {
                this._saved_track_id = track_id;
                this._saved_pos = pos;

                var params = { track_id : track_id, pos : pos };
                try {
                    var value = JSON.stringify(params);
                    Cookie.set(COOKIE_NAME, value, COOKIE_LIFE);
                } catch(e) {}
            }
        },

        _comm_start : function() {
            if (!this._comm) {
                this._comm = new Cookie.CommChannel("playlist");
                this._comm.subscribe($.proxy(this._comm_recv, this));
            }
            this._comm.startListening();
        },

        _comm_stop : function() {
            if (this._comm) {
                this._comm.stopListening();
            }
        },

        _comm_recv : function(event, args) {
            switch (args[1]) {
                case "stop":
                    Log.debug("received cookie comm stop command.  stopping.");
                    this.stop();
                    break;
            }
        },

        _stop_other_players : function() {
            this._comm.send("stop");
        }
    };

    Playlist.timestr = function(sec) {
        var str = "";

        //match the behavior of the server: truncate fractions away.
        sec = Math.floor(sec);
        while (sec > 0) {
            var part = (sec % 60)
            var partstr = part.toString();
            if (partstr.length < 2) partstr = "0" + partstr;
            if (str.length > 0) {
                str = partstr + ":" + str;
            } else {
                str = partstr;
            }

            sec -= part;
            sec /= 60;
        }
        if(str.length == 0) {
            str = "00:00";
        } else if(str.length < 3) {
            str = "00:" + str;
        }

        return str;
    };

    var COOKIE_NAME = "playlist_state";
    var COOKIE_LIFE = 30; // in seconds. needs to last long enough for a page switch
    var SAVE_LATENCY = 1;  // in seconds.  how often we write the playstate
    var PLAY_TRACK = "play_track";

    Playlist.PLAY_TRACK = PLAY_TRACK;

    return Playlist;
}();

// PlaylistCoordinator's sole purpose is to make sure multiple playlists that live on
// a page are aware of each other and don't play at the same time.  It is assumed that
// starting playback happens due to some other event, and any time any playlist starts
// playback, all other playlists controlled by PlaylistCoordinator have their "stop"
// methods invoked.  PlaylistCoordinator's only public method is "add", which takes
// a Playlist as an argument.
Player.PlaylistCoordinator = function() {
    function constructor() {
        this._playlists = [];
        this._playingcount = 0;
        this._playing = EventSender.create(this, "playing");
        this._stopped = EventSender.create(this, "stopped");
    }
    constructor.prototype.add = function(pl) {
        var self = this;
        // if this playlist's state changes, call our _handle_playlist_statechange,
        // which may or may not fire our 'playing' event
        pl.onstatechanged(function(arg) {
            self._handle_playlist_statechanged(pl, arg);
        });

        // subscribe to the 'playing' event on this playlists' behalf, invoking
        // playlist.stop() if it's a different playlist playing
        this.onplaying(function(playingplaylist) {
            if (pl != playingplaylist) {
                // if the playlist has the 'savepos' option, use pause() instead of stop()
                if (pl.getoption("savepos")) {
                    pl.pause();
                } else {
                    pl.stop();
                }
            }
        });
    };
    constructor.prototype._handle_playlist_statechanged = function(playlist, arg) {
        var isplaying = arg.newstate == "PLAYING" || arg.newstate == "BUFFERING";
        var wasplaying = arg.oldstate == "PLAYING" || arg.oldstate == "BUFFERING";

        // track the number of playlists playing and issue a "stopped"
        // event when transitioning from n>0 to n==0.  Even though the whole
        // point of the playlist coordinator is to ensure only one playlist
        // is playing at once, this is done as a refcount because an individual
        // stop() is done in response to another play(), which means that while
        // looping through the listeners, multiple players are technically playing.
        // This allows us to not care about the ordering and just issue a "stopped"
        // event when it stabilizes at 0.

        if (isplaying && !wasplaying) {
            this._playingcount++;
        } else if (wasplaying && !isplaying) {
            this._playingcount--;
            if (this._playingcount == 0) {
                this._stopped();
            }
        }

        if (isplaying) {
            this._playing(playlist);
        }
    };

    return constructor;
}();

// PlayStat is reimplemented as bandcamp.stats.PlayStat in
// flash and these two implementations should always match
//
// ick! eek! ^^
Player.PlayStat = function() {

    function PlayStat(trackinfo, playing_from, referer) {
        params = { 
            kind : "track play",
            track_id : trackinfo.id,
            from : playing_from,
            from_url : referer || location.toString()
        };
        _super.call(this, params, "started");
    }

    // inherit methods and _super from PhasedStat
    var _super = Stats.PhasedStat;
    for (var k in Stats.PhasedStat.prototype) { PlayStat.prototype[k] = Stats.PhasedStat.prototype[k]; }

    PlayStat.prototype.play_progress = function(secs_played, secs_total) {
        // returns a boolean indicating if this needs to
        // be called any more.  (returns false once "complete" is sent)
        var partial = PlayStat.is_partial(secs_played, secs_total);
        var complete = PlayStat.is_complete(secs_played, secs_total);

        if (!this._partial_sent && partial) {
            // Log.info("partial play!");
            this._partial_sent = true;
            this.change_phase("partial");
        }
        if (!this._complete_sent && complete) {
            // Log.info("complete play!");
            this._complete_sent = true;
            this.change_phase("complete");
            return false;
        }

        return true;
    };

    // SKIP_WINDOW and COMPLETE_WINDOW define the starting
    // and ending windows for purposes of determining whether
    // a play is a "skip", a "partial", or a "complete" play.
    // They are expressed in percentage of total track length;
    PlayStat.is_partial = function(secs_played, secs_total) {
        var SKIP_WINDOW = 10;
        var is_it = false;
        if (secs_played && secs_total) {
            partial = secs_total * SKIP_WINDOW / 100;
            is_it = secs_played > partial;
        }
        return is_it;
    };

    PlayStat.is_complete = function(secs_played, secs_total) {
        var COMPLETE_WINDOW = 10;
        var is_it = false;
        if (secs_played && secs_total) {
            complete = secs_total * (100 - COMPLETE_WINDOW) / 100;
            is_it = secs_played > complete;
        }
        return is_it;
    };

    return PlayStat;
}();

;
/* ------------- BEGIN title_play_indicator.js --------------- */;
var TitlePlayIndicator = {
    playing: false,
    browser_supported: (!(Browser.make == "ie" && Browser.version[0] < 9)),
    
    play: function() {
        if (!this.playing) {
            this.playing = true;
            if (this.browser_supported) {
                document.title = "▶︎ " + document.title;
            }
        }
    },
    
    stop: function() {
        if (this.playing) {
            this.playing = false;
            if (this.browser_supported) {
                document.title = document.title.substring(3);
            }
        }
    }
};
;
/* ------------- BEGIN playerviews.js --------------- */;
// requires: playlist.js

// Player.init scours the page for elements of
// class 'inline_player' and 'track_row_view' and
// instantiates the corresponding view.  Each
// element's "rel" attribute is interpreted as
// a trackinfo object (querystring-style) and the
// track is added to a common playlist.
//
// trackinfo is optional on the inline_player:
// In the case where you want a single track to play,
// provide one inline_player with trackinfo attached.
// In the case where you want an entire playlist,
// provide N track_row_view elements, each with
// trackinfo, and leave the "rel" attribute off
// the inline_player.

//hang onto a copy of each of these for debugging in IE.
var gplaylist;
var gplayerviews = [];

Player.init = function( tralbumdata, post_init_cb ) {

    // fixme: this was changed from being a global but deserves better cleanup
    Player.tralbum_data = tralbumdata;
    
    Player.private_streaming = Player.tralbum_data.playing_from.slice(0,17) == 'private_streaming' ? true : false;
    
    var initplayer = function(status) {

            var player = null;
            var playlist = null;

            if(status.success) {
                player = new Sound.SoundPlayer();
                playlist = new Player.Playlist(player, Player.tralbum_data.playing_from);
            }
        
            gplaylist = playlist;
            
            // initialize inline players (if any)
            var elems = Y.util.Dom.getElementsByClassName("inline_player", null, document);
            // if ( !elems.length )
            //     return; // no inline player
            var relValue;
            if (elems.length) {
                for(var i=0; i<elems.length; i++)
                {
                    var elem = elems[i];
                    var options = {};
                    Log.debug("creating inline player view");
                    if (elem.attributes.rel)
                    {
                        // rel attribute with trackinfo indicates that
                        // this is a single track player
                        options['onetrack'] = true;
                        
                        // Awkward: the loop assumes one or more inline players, but until recently we never
                        // had more than one. Now two or more are possible, but here we'll assume they point
                        // to the same, single track and only use the first "rel" attribute found to seed
                        // the playlist, below.  - sdg 2012.03.18 
                        if (!relValue)
                            relValue = elem.attributes.rel.value;
                    }
                    
                    gplayerviews.push( new Player.InlinePlayerView(playlist, elem, options) );
                }
            }
            
            if(playlist && relValue)
            {
                var params = Url.parseQuery(relValue);
                var trackinfo = Player.tralbum_data.trackinfo[params.tracknum - 1];
                var index = playlist.add_track(trackinfo);
                if (trackinfo.id === Player.tralbum_data.featured_track_id)
                {
                    playlist.set_initial_track(index);
                }
            }

            // initialize track row players (if any)
            var initial_track_set = false;
            elems = Y.util.Dom.getElementsByClassName("track_row_view", null, document);
            for(var i=0; i<elems.length;i++)
            {
                var elem = elems[i];
                var params = Url.parseQuery(elem.attributes.rel.value);
                var trackinfo = Player.tralbum_data.trackinfo[params.tracknum - 1];
                var trackrow = new Player.TrackRowView(playlist, elem, trackinfo, Player.private_streaming);
                
                // attempt to honor the t=x url parm for initial track, otherwise fall through
                // to the featured track if it's available
                if (playlist && !initial_track_set) {
                    if (Player.tralbum_data.initial_track_num && trackinfo.track_num == Player.tralbum_data.initial_track_num && trackinfo.file) {
                        Log.debug("setting initial track to t=x override");
                        playlist.set_initial_track(trackrow._tracknum);
                        // we have a valid t=x track, stop checking
                        initial_track_set = true;
                    }
                    else if (trackinfo.id === Player.tralbum_data.featured_track_id){
                        Log.debug("setting initial track to featured track");
                        playlist.set_initial_track(trackrow._tracknum);
                    }
                }
            }
            
            // If the page wants to receive notification of player events, it should register 
            // listeners when it calls Player.init(). The function is passes in should 
            // return an *array* of objects that act as value pairs, mapping the event name
            // with a reference to the function:
            //
            // obj["play_track"] = listenerfn
            //
            // The signature of the listener depends on the event. 
            //
            // FIXME: robbie: One confusing thing: why does the page register it's listeners
            // with the player, which in turn re-register the listeners with the playlist?
            // Is there a way to handle the events without the playlist?
            if( post_init_cb ) {
                post_init_cb(playlist);
            }
            if( playlist ) {
                playlist.init_complete();
            }
        };

    Sound.whenloaded(initplayer);
};

Player.update = function(tralbumdata) {
    if (!gplaylist) {
        return;
    }

    // update tralbumdata
    Player.tralbum_data = tralbumdata;

    for (var i = 0; i < tralbumdata.trackinfo.length; i++) {
        gplaylist.update_trackinfo(i, tralbumdata.trackinfo[i]);
    }
};

// **************************************************************************
// CollectionView binds to a scattering of 'track_play_view' elements on the
// page and uses the data-trackid attribute of each to bind player controls for the
// specified track id.
//
// Play/Pause buttons and track names are injected into each resulting
// control element and toggling of button state is automatically handled
// based on current playback events.
//
// Additionally, 'track_play_hilite' elements may be included in the client
// page that will have a 'playing' class automatically added/removed by the
// player, allowing further visual indication of playback state in the UI.
// **************************************************************************
Player.CollectionView = function() {
    function CollectionView(playlist) {
        this._playlist = playlist;
        this._play_status_elements = [];
        this._play_hilite_elements = [];
        this._play_elapsed_time_elements = {};
        this._waypoints = [];
        this._play_elem_stash = {};
        this._track_list_ids = {};
        this._playing_state = "STOPPED";
        this._setup();

        if(playlist) {
            playlist.onstatechanged(this._handle_statechange, this );
            playlist.onplaylistchanged(this._handle_playlistchange, this);
            playlist.onloaded(this._handle_loaded, this);
            playlist.ontime(this._handle_time, this);
        }
    }

    CollectionView.prototype = {
        is_playing : function() {
            return (this._playing_state == 'PLAYING' || this._playing_state == 'BUFFERING');
        },
        currently_playing_track : function() {
            return (this.is_playing() ? this._current_track_list_entry() : null);
        },
        play : function() {
            this._playlist.play();
            return 1;
        },
        playpause : function(track_id) {
            if (track_id == null || track_id == '' || track_id == this._current_track_list_entry().id) {
                return this._playlist.playpause();
            }
            else {
                return this.play_track_id(track_id);
            }
        },
        play_track_num : function(track_num) {
            // BS: playlist tracknums are 0-based and this is flimsy
            track_num = track_num > 0 ? track_num - 1 : track_num;
            this._playlist.play_track(track_num);
            return 1;
        },
        play_track_id : function(track_id) {
            var trackinfo = this.get_track_info(track_id);
            if (trackinfo && typeof trackinfo != 'undefined' && trackinfo.track_num) {
                this.play_track_num(trackinfo.track_num);
            }
            return 1;
        },
        get_track_info : function(track_id) {
            // BS: TODO: weaksauce that track_list is a global page-level attribute.  should encapsulate it.
            for (var key in track_list) {
                if (track_list.hasOwnProperty(key) && track_list[key]['track_id'] == track_id) {
                    return track_list[key];
                }
            }
            return null;
        },
        // **************************************************************************
        // scan through the DOM for all 'track_play_view', 'track_play_auxiliary',
        // 'track_play_hilite', 'track_play_time', and 'track_play_waypoint' elements.  
        // for each one...
        //
        // track_play_view:
        // build a table-based track control for the trackid specified in the 
        // data-trackid attribute.
        //
        // track_play_auxiliary:
        // verify that there is a data-trackid attribute and add an onclick handler
        // to the element for playerview.playpause
        //
        // track_play_hilite:
        // verify that there is a data-trackid attribute and add the element to an 
        // array that we'll process during statechange events.
        //
        // track_play_time:
        // verify that there is a data-trackid attribute and add the element to an
        // array that we'll process during ontime events.
        //
        // track_play_waypoint:
        // add it to the array of waypoints that we process during statechange events
        // **************************************************************************
        _setup : function() {
            var track_play_views = Y.util.Dom.getElementsByClassName('track_play_view', null, null);
            for (var i=0, length=track_play_views.length; i<length; i++) {
                var elem = track_play_views[i];
                if (this._playlist && elem.attributes['data-trackid']) {
                    // get the trackid from the data-trackid attribute
                    var trackid = elem.attributes['data-trackid'].value;
                    if (!trackid || trackid == '') {
                        Log.debug("_setup(): ignoring track_play_view with missing trackid");
                        continue;
                    }

                    var trackinfo = this.get_track_info(trackid);
                    if (!trackinfo || trackinfo == 'undefined') {
                        Log.debug("_setup(): ignoring track_play_view with invalid trackid");
                        continue;
                    }

                    Log.debug("_setup(): building a track control for trackid = " + trackid);	

                    // create the table and player UI
                    var table = document.createElement('table');
                    table.setAttribute('style', 'border: none;');

                    var tr = document.createElement('tr');
                    tr.setAttribute('itemprop', 'tracks');
                    tr.setAttribute('itemscope', null);
                    tr.setAttribute('itemtype', 'http://www.schema.org/MusicRecording');

                    var td = document.createElement('td');
                    td.className = 'track_play_control';
                    var a = document.createElement('a');
                    function trackhandler(trackid) {
                        return function() {
                            playerview.playpause(trackid);
                        }
                    };
                    a.onclick = trackhandler(trackid);
                    var play_status = document.createElement('div');
                    play_status.className = 'play_status';
                    play_status.setAttribute('data-trackid', trackid);
                    a.appendChild(play_status);
                    td.appendChild(a);					
                    tr.appendChild(td);

                    var td = document.createElement('td');
                    td.className = 'track_play_name';
                    td.innerHTML = trackinfo.title;
                    tr.appendChild(td);
                    td.onclick = trackhandler(trackid);

                    table.appendChild(tr);

                    // replace the existing <a rel="trackid=x"> with the track play control
                    elem.parentNode.replaceChild(table, elem);

                    this._play_status_elements.push(play_status);
                }
            }
            
            var auxiliaryControls = Y.util.Dom.getElementsByClassName('track_play_auxiliary', null, null);
            this._setup_aux_controls(auxiliaryControls);

            var hilites = Y.util.Dom.getElementsByClassName('track_play_hilite', null, null);
            this._setup_hilites(hilites);
            
            var timeElems = Y.util.Dom.getElementsByClassName('track_play_time', null, null);
            this._setup_time_elems(timeElems);

            var waypoints = $('.track_play_waypoint');
            this._setup_waypoints(waypoints);
            
            for (var i=0, len=track_list.length; i<len; i++) {
                this._track_list_ids[track_list[i].track_id] = true;
            }
        },
        _setup_aux_controls : function(auxiliaryControls) {
            var self = this;

            if (auxiliaryControls == null || typeof auxiliaryControls == 'undefined') {
                return;
            }
            for (var i=0, len=auxiliaryControls.length; i<len; i++) {
                var elem = auxiliaryControls[i];
                var trackid = elem.attributes['data-trackid'].value;
                if (!trackid || trackid == '') {
                    Log.debug("_setup(): ignoring track_play_auxiliary with missing trackid");
                    continue;
                }
                function trackhandler_aux(elem) {
                    return function(event) {
                        Y.util.Event.stopEvent(event);
                        var trackid = elem.attributes['data-trackid'].value;
                        var played = playerview.playpause(trackid);

                        console.log("Played: ", played);

                        var clickstat = elem.attributes['data-clickstat'];
                        if (!!clickstat && (played == 0 || played == 1)) {
                            Stats.record({kind: 'click', click: clickstat.value});
                        }

                        return false;
                    }
                };
                if ( elem.tagName == "A" )
                    Dom.hackLinkClicksThanksSafari( elem, trackhandler_aux(elem) );
                else
                    elem.onclick = trackhandler_aux(elem);
            }
        },
        _setup_hilites : function(hilites) {
            if (hilites == null || typeof hilites == 'undefined') {
                return;
            }
            for (var i=0, len=hilites.length; i<len; i++) {
                var elem = hilites[i];
                if (elem.attributes['data-trackid']) {
                    var assoc_tid = elem.attributes['data-trackid'].value;
                    if (assoc_tid) {
                        this._play_hilite_elements.push(elem);
                    }
                }
            }
        },
        _setup_time_elems : function(timeElems) {
            if (timeElems == null || typeof timeElems == 'undefined') {
                return;
            }
            for (var i=0, len=timeElems.length; i<len; i++) {
                var elem = timeElems[i];
                if (elem.attributes['data-trackid']) {
                    var assoc_tid = elem.attributes['data-trackid'].value;
                    if (assoc_tid) {
                        var track_info = this.get_track_info(assoc_tid);
                        if (track_info) {
                            // push the time_elapsed element into a track-id keyed hash for later reference
                            // and go ahead and put the correctly formatted duration text in the time_total element
                            var elapsedElem = Y.util.Dom.getElementsByClassName('time_elapsed', 'span', elem)[0];
                            if (elapsedElem) {
                                if (!this._play_elapsed_time_elements[assoc_tid]) {
                                    this._play_elapsed_time_elements[assoc_tid] = [];
                                }
                                this._play_elapsed_time_elements[assoc_tid].push(elapsedElem);
                            }
                            
                            total_str = this._timestr(track_info.duration);
                            var totalElem = Y.util.Dom.getElementsByClassName('time_total', 'span', elem)[0];
                            if (totalElem) {
                                totalElem.innerHTML = total_str;
                            }
                        }
                    }
                }
            }
        },
        _setup_waypoints : function(waypoints) {
            if (waypoints == null || typeof waypoints == 'undefined') {
                return;
            }
            this._waypoints = waypoints;
        },
        _sleepyhead : function(aux_controls, hilites, time_elems, trackinfo) {
            this._add_trackinfo(trackinfo);
            this._setup_aux_controls(aux_controls);
            this._setup_hilites(hilites);
            this._setup_time_elems(time_elems);
        },
        _add_trackinfo : function(trackinfo) {
            if (trackinfo === null || typeof trackinfo === 'undefined') {
                return;
            }
            var trackid = trackinfo.track_id;
            if (this._track_list_ids[trackid] == null || !this._track_list_ids[trackid]) {
                //  playlist.js track numbers start with 1
                //  also, do some of the other scrubbing that's required to translate between track api and playlist
                Log.debug('Adding track ' + trackid + ' to playlist');
                trackinfo['track_num'] = track_list.length + 1;
                trackinfo['id'] = trackinfo['track_id'];
                trackinfo['file'] = trackinfo['file'] || trackinfo['streaming_url'];            
                trackinfo['continuous'] = false;
                this._playlist.add_track(trackinfo);
                track_list.push(trackinfo);
            }
        },
        // ************************************************************************************************
        // reassociates existing track_play_auxiliary controls and track_play_hilite elements with a new 
        // track_id, and adds new time_elems into the processing of time events.  also potentially adds a 
        // new trackinfo object to the playlist and track_list array.
        // 
        // this is useful for situations like the collection item editor where new tracks can be chosen 
        // from a drop-down and we want to reassign the actions of the associated player elements in the 
        // collection item container.
        //
        // NOTE: does not (yet) support track_play_view elements simply because I didn't have a need for
        //       that in the fan collection editor
        //
        // TODO: refactor this and _setup since they're so similar
        // ************************************************************************************************      
        _update_track_play_elements : function(trackinfo, aux_controls, hilites, time_elems) {
            if (!trackinfo || trackinfo == 'undefined') {
                Log.debug("_update_track_play_elements(): invalid/missing trackinfo, ignoring");
                return;
            }
            
            var trackid = trackinfo.track_id;

            this._add_trackinfo(trackinfo);
            
            // update the data-trackid attribute of aux controls
            if (aux_controls && typeof aux_controls != 'undefined') {
                for (var i=0, len=aux_controls.length; i<len; i++) {
                    var aux = aux_controls[i];
                    aux.attributes['data-trackid'].value = trackid;
                }
            }
            
            // we assume that the existing track_play_hilite element is already in the _play_hilite_elements array, so all
            // we need to do is just update the value of the data-trackid attribute here rather than reprocessing the
            // existing array
            if (hilites && typeof hilites != 'undefined') {
                for (var i=0, len=hilites.length; i<len; i++) {
                    hilites[i].attributes['data-trackid'].value = trackid;
                }
            }
            
            
            // liquid rendering will have wiped out the old elements and given us new ones, so
            // let's just do the normal and ignore the old (leaving them for gc)
            if (time_elems && typeof time_elems != 'undefined') {
                for (var i=0, len=time_elems.length; i<len; i++) {
                    var elem = time_elems[i];
                    var elapsedElem = Y.util.Dom.getElementsByClassName('time_elapsed', 'span', elem)[0];
                    if (elapsedElem) {
                        if (!this._play_elapsed_time_elements[trackid]) {
                            this._play_elapsed_time_elements[trackid] = [];
                        }
                        this._play_elapsed_time_elements[trackid].push(elapsedElem);
                    }
                    // TODO: protect against missing track_info
                    total_str = this._timestr(this.get_track_info(trackid).duration);
                    var totalElem = Y.util.Dom.getElementsByClassName('time_total', 'span', elem)[0];
                    if (totalElem) {
                        totalElem.innerHTML = total_str;
                    }
                }
            }
            
        },
        _handle_loaded : function(percent) {
            Log.debug("CollectionPlayerView._handle_loaded()");
        },
        _handle_playlistchange : function() {
            Log.debug("CollectionPlayerView._handle_playlistchange()");
        },
        _handle_statechange : function(arg) {
            var handling = true;
            Log.debug("statechange");
            this._playing_state = arg.newstate;
            var current = this._current_track_list_entry();

            // mark all the play_status_elements accordingly
            var elems = this._play_status_elements;
            for (var i=0, len=elems.length; i<len; i++) {
                var elem = elems[i];
                if (!elem.attributes['data-trackid']) {
                    continue;
                }
                var assoc_tid = elem.attributes['data-trackid'].value;
                if (!assoc_tid) {
                    continue;
                }
                if (assoc_tid == current.id && (arg.newstate == "PLAYING" || arg.newstate == "BUFFERING")) {
                    YAHOO.util.Dom.addClass(elem, "playing");
                }
                else {
                    YAHOO.util.Dom.removeClass(elem, "playing");
                }
            }

            // process all the elements that need hilites
            elems = this._play_hilite_elements;
            for (var i=0, len=elems.length; i<len; i++) {
                var elem = elems[i]
                if (!elem.attributes['data-trackid']) {
                    continue;
                }
                var assoc_tid = elem.attributes['data-trackid'].value;
                if (!assoc_tid) {
                    continue;
                }

                if ((assoc_tid == current.id) && (arg.newstate == "PLAYING" || arg.newstate == "BUFFERING")) {
                    YAHOO.util.Dom.addClass(elem, "playing");
                }
                else {
                    if ((assoc_tid == current.id) && (arg.newstate == "PAUSED")) {
                        YAHOO.util.Dom.addClass(elem, "paused");
                    }
                    YAHOO.util.Dom.removeClass(elem, "playing");
                }
            }

            // update any waypoints using img/title/artist from collection grid item
            elems = this._waypoints;
            for (var i=0, len=elems.length; i<len; i++) {
                var elem = elems[i];
                if (arg.newstate == "PLAYING" || arg.newstate == "BUFFERING") {
                    $(elem).removeClass('done').addClass('playing');
                } else {
                    $(elem).removeClass('playing').addClass('done');
                }

                var itemContainer = $("[data-trackid='" + current.id + "']");
                if (itemContainer.length === 0) {
                    continue;
                }
                var itemImg = $('.collection-item-art, .tralbum-art-large, .tralbum-art-medium', itemContainer)[0];
                var itemTitle = $('.collection-item-title', itemContainer)[0];
                var artistTitle = $('.collection-item-artist', itemContainer)[0];

                $('img', elem)[0].src = (itemImg != null ? itemImg.src : "");
                $('.waypoint-item-title', elem)[0].innerHTML = itemTitle.innerHTML;
                $('.waypoint-artist-title', elem)[0].innerHTML = artistTitle.innerHTML;
                $(elem).unbind('click').click(function(){Dom.scrollToElement(itemContainer.filter(':visible'), -30)});

                $.waypoints('destroy');
                //$('#track_play_waypoint').removeClass('activated');   
                $(itemImg)
                    .waypoint(function(direction) {
                        $('#track_play_waypoint').toggleClass('activated', direction === 'down');
                    })
                    .waypoint(function(direction) {
                        // workaround wonkiness with the bottom-sensitive waypoint w.r.t. player state changes and 
                        // related render events
                        if (!handling) {
                            $('#track_play_waypoint').toggleClass('activated', direction === 'up');
                        }
                    }, {offset: '80%'});
            }

            // prepend/remove-prepended  play icon
            var pageTitle = $('title').text();
            if(arg.newstate == "PLAYING" && arg.oldstate != "PLAYING") {
                pageTitle = '▶︎ '+pageTitle;
            } else {
                pageTitle = pageTitle.replace("▶︎ ", "");
            }
            $('title').text(pageTitle);

            handling = false;
        },
        _handle_time : function(arg) {            
            var tid = this._current_track_list_entry().id;
            if (this._play_elem_stash['time_elems_tid'] == null || this._play_elem_stash['time_elems_tid'] != tid) {
                this._play_elem_stash['time_elems_tid'] = tid;
                this._play_elem_stash['time_elems_elapsed'] = this._play_elapsed_time_elements[tid];
            }
            
            var elapsedElems = this._play_elem_stash['time_elems_elapsed'];
            if (elapsedElems) {
                var elapsed_str = this._timestr(arg.position);
                for (var i=0, len = elapsedElems.length; i < len; i++) {
                    elapsedElems[i].innerHTML = elapsed_str;
                }
            }
        },
        _current_track_list_entry : function() {
            var trackinfo = this._playlist.get_track_info();
            return trackinfo;
        },
        _timestr : function(sec) {
            var str = "";
            
            //match the behavior of the server: truncate fractions away.
            sec = Math.floor(sec); 
            while(sec > 0)
            {
                var part = (sec % 60)
                var partstr = part.toString();
                if(partstr.length < 2) partstr = "0" + partstr;
                if(str.length > 0)
                {
                    str = partstr + ":" + str;
                }
                else
                {
                    str = partstr;
                }

                sec -= part;
                sec /= 60;
            }
            if(str.length == 0)
                str = "00:00";
            else if(str.length < 3)
                str = "00:" + str;

            return str;
        }
    };

    return CollectionView;
}();

// TrackRowView is meant to be instantiated in a table row,
// as it uses <td> elements to layout its children
Player.TrackRowView = function() {
    function TrackRowView(playlist, elem, trackinfo, private_streaming) {
        this._elem = elem;
        this._playlist = playlist;
        this._trackinfo = trackinfo || {};
        this._private_streaming = private_streaming;

        if(playlist) {
            this._tracknum = playlist.add_track(trackinfo);
            this._trackinfo = playlist.get_track_info(this._tracknum);
        } else {
            this._tracknum = nexttrack++;
        }

        this._setup_elements();

        if(playlist) {
            playlist.onstatechanged(this._state_changed, this );
            playlist.onplaylistchanged(this._handle_playlistchange, this);
        }
    }
    TrackRowView.prototype = {
        _state_changed : function(arg) {
            var curTrack = this._playlist.get_track();
            var playing = (curTrack == this._tracknum) && (arg.newstate == "PLAYING" || arg.newstate == "BUFFERING" || arg.newstate == "PAUSED");

            if(playing)
                YAHOO.util.Dom.addClass(this._elem, "current_track");
            else
                YAHOO.util.Dom.removeClass(this._elem, "current_track");
                

            if(curTrack == this._tracknum)
            {
                switch(arg.newstate)
                {
                    case "PLAYING":
                    case "BUFFERING":
                        this._enable_button("pause");
                        break;
                    case "PAUSED":
                        this._enable_button("play");
                        break;
                }
            }
            else if(this._trackinfo.file)
            {
                this._enable_button("play");
            }
        },
        findelem : function(classname) {
            return Y.util.Dom.getElementsByClassName(classname, null, this._elem)[0];
        },
        play : function() {
            this._playlist.play_track(this._tracknum);
        },
        toString : function() {
            return "[TrackRowView: id=" + this._elem.id + ", title=" + this._trackinfo.title + "]";
        },
        activeNodes: function() {
            if ( window.MediaView && MediaView.mode == "phone" )
                return $(this._elem);
            return $(this._elems.playbutton);
        },

        _enable_button : function(playpause) {
			var playButton = $(this._elems.playbutton);
            if (!playButton.length) return;

            playButton.removeClass( "disabled" );
            
            if (this._playlist) {
                var self = this;
			    if ( playpause == "play" ) {
			        playButton.removeClass( "playing" );
			        this.activeNodes().off("click.player").on( "click.player", function() {
                        self.play();
                        return false;
			        } );
			    } else if (playpause == "pause") {
			        playButton.addClass( "playing" )
                    this.activeNodes().off("click.player").on( "click.player", function() {
                        self._playlist.playpause();
                        return false;
                    } );
			    }
            } else {
                // sdg TODO 2012.05.08: obsolete?  
                playButton.removeClass( "playing" );
                playButton.parent().attr( "href", this._trackinfo.file );
            }
        },
        _setup_elements : function() {
            var elems = {};
            this._elems = elems;

            Templ.renderTableRow(this._elem, '_track_row', { tracknum: this._tracknum + 1, 
                                                             track: this._trackinfo,
                                                             private_streaming : this._private_streaming });
            this._elems.playbutton = this.findelem("play_status");
            this._elems.title = this.findelem("title");

            if (this._trackinfo.file)
                this._enable_button( "play" );
            else
                this.activeNodes().off("click.player").on( "click.player", false);
            
            if ( window.Fixup && Fixup.trackRows )
                Fixup.trackRows( this._elem );
        },
        _handle_playlistchange : function() {
            correctinfo = this._playlist.get_track_info(this._trackinfo.tracknum);
            if(!Player.TrackInfo.is_same(this._trackinfo, correctinfo))
            {
                this._trackinfo = correctinfo
                this._setup_elements();
            }
        }
    };

    // used to keep track of track numbering when there is no playlist available.
    // fixme: this prevents us from having more than one set of TrackRowViews in
    // independent playlists on a single page.
    var nexttrack = 0;

    return TrackRowView;
}();

Player.InlinePlayerView = function(){
     function InlinePlayerView(playlist, elem, options) {
        this._playlist = playlist;
        this._options = options || {};
        this._elem = elem;
        this._elems = {};
        this._tracklength = this._trackpos = this._loadpercent = 0;

        var elems = this._elems;
        elems.next = this.find_elem("nextbutton");
        elems.prev = this.find_elem("prevbutton");
        elems.play = this.find_elem("playbutton");
        elems.title = this.find_elem("title");
		elems.title_link = this.find_elem("title_link");
        elems.prog = this.find_elem("progbar");
        elems.progthumb = this.find_elem("thumb");
        elems.progfill = this.find_elem("progbar_fill");
        elems.message = this.find_elem("message"); // optional element

        if ( this._playlist ) {
            this._playlist.onstatechanged(this._handle_playstate, this);
            this._playlist.ontime(this._handle_time, this);
            this._playlist.onloaded(this._handle_loaded, this);
            this._playlist.ontrackchanged(this._handle_trackchange, this);
            this._playlist.onplaylistchanged(this._handle_playlistchange, this);
            var that = this;
            var volhandler = function(o, arg) {
                that._handle_volumechange(arg);
            }
            this._playlist._player.onvolume(volhandler, this);
    
            var that = this;
            YAHOO.util.Event.addListener(elems.play, "click", this._handle_playclick, this, true);
            if(elems.next)
                YAHOO.util.Event.addListener(elems.next, "click", this._handle_nextclick, this, true);
            if(elems.prev)
                YAHOO.util.Event.addListener(elems.prev, "click", this._handle_prevclick, this, true);

            var thumbdrag = new YAHOO.util.DD(elems.progthumb);

            if( Browser.platform == "iphone" || ( window.MediaView && MediaView.mode == "phone" ) ) {
                var that = this;

                function touchstart(event) {
                    // don't eat touches on the controls
                    if ( $(event.target).closest(".playbutton, .nextbutton, .prevbutton").length )
                        return;

                    // we don't cancel this event, so we can bail out on a vertical drag
                    // and allow the page to scroll.  we'll cancel moves instead.

                    function winwidth() {
                        switch(window.orientation) {
                            case 0:
                            case 180:
                                return window.screen.width;
                                break;
                            default:
                                return window.screen.height;
                                break;
                        }
                    }

                    // this "rootX" business is due to the fact that I'd
                    // like to use the whole window width for swiping, but
                    // you're going to be putting your finger down at a
                    // specific spot which starts out as representing the
                    // current playback spot, but isn't actually positioned
                    // the same as the current spot when the timeline is
                    // scaled to the whole window.  The "root" is where you
                    // need to drag to in order to get the playhead back to
                    // its current spot.  The "desired root" is where the
                    // root would be if the timeline was scaled to the window.
                    // As you drag, if the root and the desired root are not
                    // the same, we slowly walk the root over to where we
                    // want it.  Except we only do that when you're traveling
                    // away from the desiredRoot, because otherwise you could
                    // end up with a weird situation where e.g. you're dragging
                    // to the left and the time is changing as if you were
                    // dragging to the right.

                    // I added some code to not interrupt page scrolling when you happen
                    // to start right on the player.  I added separate start vars to not
                    // interfere with the existing code.  --kj 2012-08-14
                    var initX = event.touches[0].screenX;
                    var initY = event.touches[0].screenY;

                    var rootPos = that._trackpos || 0;
                    var startX = null;
                    var rootX = null;
                    var viewWidth = winwidth();
                    var desiredRootX = Math.round(viewWidth * rootPos / that._tracklength);
                    var lastX = startX;


                    var seekMask = document.createElement("div");
                    var seekText = document.createElement("div");
                    seekMask.className = "seekMask"; // hidden in new mobile render, for now
                    seekText.className = "seekText"; // ditto
                    YAHOO.util.Dom.addClass(seekMask, "seekmask");
                    YAHOO.util.Dom.addClass(seekText, "seektext");
                    document.body.appendChild(seekMask);
                    document.body.appendChild(seekText);
                    var dispx = window.pageXOffset;
                    var dispy = window.pageYOffset;
                    var disph = window.innerHeight;
                    var dispw = window.innerWidth;
                    seekMask.style.width = dispw + "px";
                    seekMask.style.height = disph + "px";
                    seekMask.style.left = dispx + "px";
                    seekMask.style.top = dispy + "px";
                    seekText.style.width = dispw + "px";
                    seekText.style.height = disph + "px";
                    seekText.style.left = dispx + "px";
                    seekText.style.top = dispy + "px";

                    that._playlist.seeking = true;
                    that._dragging = true;

                    function finishdrag(doseek) {
                        that._elem.removeEventListener("touchend", touchend);
                        that._elem.removeEventListener("touchcancel", touchcancel);
                        that._elem.removeEventListener("touchmove", touchmove);
                        that._playlist.seeking = false;
                        that._dragging = false;
                        if(doseek) {
                            if(that._trackpos == that._tracklength) {
                                that._playlist.next_track();
                            } else if (that._trackpos == 0 && (rootPos < 3)) {
                                that._playlist.prev_track();
                            }else {
                                that._playlist.seek(that._trackpos);
                            }
                        }
                        document.body.removeChild(seekText);
                        document.body.removeChild(seekMask);
                    }

                    function touchmove(event) {
                        if ( startX == null ) { // first event
                            // vertical drag? bail out so we don't interfere with page scrolling
                            var thisY = event.changedTouches[0].screenY;
                            if ( Math.abs( event.changedTouches[0].screenY - initY ) >
                                    Math.abs( event.changedTouches[0].screenX - initX )) {
                                 finishdrag(false);
                                 return;
                            }
                        }

                        // cancel the moves we are consuming, which is all of them
                        // if we don't bail out for a vertical drag.
                        event.preventDefault();

                        var thisX = event.changedTouches[0].screenX;
                        // scale movement by +40%
                        thisX = thisX * 1.4 - viewWidth * 0.2;

                        if(startX == null) {
                            startX = rootX = thisX;
                        }

                        var curAmountPlayed = rootPos / that._tracklength;
                        if(rootX != desiredRootX) {
                            var movingAway = Math.abs(desiredRootX - thisX) > Math.abs(desiredRootX - lastX);
                            if(movingAway) {
                                if(rootX > desiredRootX)
                                    rootX--;
                                else
                                    rootX++;
                            }
                        }

                        var newPos = 0;
                        if(thisX <= rootX) {
                            if(rootX <= 0)
                                newPos = 0;
                            else
                                newPos = (thisX / rootX) * rootPos;

                            if(newPos < 0) newPos = 0;
                        } else {
                            newPos = (thisX - rootX) / (viewWidth - rootX) * (that._tracklength - rootPos) + rootPos;
                            if(newPos > that._tracklength) newPos = that._tracklength;
                        }
                        that._trackpos = newPos;
                        that._updateprog();

                        var disp = "";
                        if(newPos == that._tracklength)
                            disp = "&gt;&gt;";
                        else if (newPos == 0 && (rootPos < 3))
                            disp = "&lt;&lt;";
                        else
                            disp = that._timestr(that._trackpos);

                        seekText.innerHTML = disp;

                        lastX = thisX;
                    }

                    function touchend(event) { finishdrag(true); }
                    function touchcancel(event) { finishdrag(false); }
                    that._elem.addEventListener("touchmove", touchmove);
                    that._elem.addEventListener("touchend", touchend);
                    that._elem.addEventListener("touchcancel", touchcancel);
                }

                if (!!that._elem) that._elem.addEventListener("touchstart", touchstart);
            }
    
            thumbdrag.on('startDragEvent', function(ev) {
                    thumbdrag.resetConstraints();
                    thumbdrag.setYConstraint(0,0);
                    thumbdrag.setXConstraint(0,elems.prog.offsetWidth - elems.progthumb.offsetWidth+1);
                    this._dragging = true;
                    this._playlist.seeking = true;
                    this._dragoffset = ev.x - Y.util.Dom.getX(this._elems.progthumb);
                }, this, true);
    
            thumbdrag.on('dragEvent', function(ev) {  
                    var progLeft = Y.util.Dom.getX(this._elems.prog);
                    var progRange = this._elems.prog.offsetWidth - this._elems.progthumb.offsetWidth;
                    var pos = ev.e.clientX - progLeft - this._dragoffset;
                    if(pos < 0) pos = 0;
                    else if(pos > progRange) pos = progRange;
    
                    pos *= (this._tracklength / progRange);
                    this._trackpos = pos;
                    this._updateprog();
                }, this, true); 
    
            thumbdrag.on('endDragEvent', function(ev) {
                    this._playlist.seek(this._trackpos);
                    this._dragging = false;
                    this._playlist.seeking = false;
                }, this, true);
    
            this._showhide_nextprev();
        } else {
            var trackinfo = Player.tralbum_data.trackinfo[0];
            elems.play.parentNode.href = trackinfo.file;
        }
    }

    InlinePlayerView.prototype = {
        _handle_playclick : function(evt) {
            Y.util.Event.stopEvent(evt);
            this._playlist.playpause();
        },
        _handle_nextclick : function(evt) {
            Y.util.Event.stopEvent(evt);
            // hiddenelems might not be entirely hidden (they could be faded out, for example)
            if ( !$(this._elems.next).hasClass("hiddenelem") ) {
                this._playlist.next_track();
            }
        },
        _handle_thumb_grab : function() {
        },
        _handle_prevclick : function(evt) {
            Y.util.Event.stopEvent(evt);
            // hiddenelems might not be entirely hidden (they could be faded out, for example)
            if ( !$(this._elems.prev).hasClass("hiddenelem") ) {
                this._playlist.prev_track();
            }
        },
        _handle_playstate : function(arg) {
            switch(arg.newstate)
            {
                case "PLAYING":
                    YAHOO.util.Dom.removeClass(this._elems.play, "busy");
                    YAHOO.util.Dom.addClass(this._elems.play, "playing");
                    
                    TitlePlayIndicator.play();
                    break;
                case "BUFFERING":
                case "BUSY":
                    YAHOO.util.Dom.removeClass(this._elems.play, "playing");
                    YAHOO.util.Dom.addClass(this._elems.play, "busy");
                    break;
                default:
                    YAHOO.util.Dom.removeClass(this._elems.play, "busy");
                    YAHOO.util.Dom.removeClass(this._elems.play, "playing");
                    TitlePlayIndicator.stop();
                    break;
            }
        },
        _handle_trackchange : function(trackinfo) {
            this._showhide_nextprev();
            this._trackinfo = trackinfo;

            if(!this._options.onetrack) {
                // multi-track player shows track title inline
                $(this._elem).find(".title-section").removeClass("hiddenelem");
                this._elems.title.innerHTML = Text.escapeHtml( trackinfo.title );
            }
            else if (this._elems.message) {
                // single track player shows errors and progress inline
                if(trackinfo.encoding_error) {
                    var text = trackinfo.encoding_error;
                    text = Y.lang.JSON.stringify(text);  // this doesn't escape the ' which is the original problem, sigh...
                    text = text.slice(1, text.length-1);  // remove quotes
                    text = Text.escapeHtml( text );
                    var html = '<a style="color:red" href="#" onclick="Tracks.encoding_error(\'' + text + '\'); return false;">upload error</a>';
                    Log.debug(html);
                    YAHOO.util.Dom.removeClass(this._elems.message, "hiddenelem");
                    this._elems.message.innerHTML = html;
                }
                else if (trackinfo.encoding_pending) {
                    YAHOO.util.Dom.removeClass(this._elems.message, "hiddenelem");
                    var prog = "processing...";  // UISTRING
                    this._elems.message.innerHTML = Text.escapeHtml( prog );
                }
                else {
                    YAHOO.util.Dom.addClass(this._elems.message, "hiddenelem");
                }
            }
            if( (Browser.platform == "iPhone" || ( window.MediaView && MediaView.mode == "phone" )) && $(this._elem).find(".video-link")[0] ){
                if( trackinfo.video_id ){
                    var video_link = $(this._elem).find(".video-link");

                    video_link.attr("data-href-mobile", trackinfo.video_mobile_url );
                    video_link.attr("href", "#" );  // see tralbum_fixup_mobile for rationale

                    video_link.attr("data-caption", trackinfo.video_caption);

                    video_link.removeClass("is-hidden");

                }
                else{
                    $(this._elem).find(".video-link").addClass("is-hidden");
                }
            } 

            this._set_title_link(trackinfo.title_link);
               
            this._tracklength = this._playlist.get_track_info().duration || trackinfo.duration || 0;
            this._zero_time();
        },
        _set_title_link : function(href) {
            // if there is no title link we want to remove the <a> tag from around the title
            // and put it back if there is one.
            var link = this._elems.title_link;

            if(!link)
                return;

            var title = this._elems.title;
            link.href = href;

            if(href) {
                if(title.parentNode != link) {
                    title.parentNode.insertBefore(link, title);
                    link.appendChild(title);
                }
            } else {
                if(title.parentNode == link) {
                    link.parentNode.insertBefore(title, link);
                    link.parentNode.removeChild(link);
                }
            }
        },
        _handle_volumechange : function(arg) {
            this._display_volume(arg.volume);
        },
        _handle_playlistchange : function() {
            var trackinfo = this._playlist.get_track_info();
            if(trackinfo) {
                this._handle_trackchange(trackinfo);
            }
        },
        _zero_time : function() {
            // since _handle_time is now enforces that it's
            // only used during playback, provide a zero_time method
            // to unconditionally reset the UI
            this._trackpos = 0;
            this._updateprog();
        },
        _handle_time : function(arg) {
            if(!this._dragging && this._playlist.get_state() === "PLAYING") {
                this._trackpos = arg.position;
            }

            // sometimes the initial duration we are given
            // is not accurate. update the UI to reflect the
            // real duration as reported by the sound system

            if(arg.duration) {
                if(this._tracklength != arg.duration) {
                    //Log.debug("handle_time got duration: " + arg.duration);
                    this._tracklength = arg.duration;
                }
            }

            this._updateprog();
        },
        _showhide_nextprev : function() {
            var cur = this._playlist.get_track();
            var first = this._playlist.first_playable_track;
            var last = this._playlist.last_playable_track;

            if(this._elems.prev)
                this.showhide_elem(this._elems.prev, first >= 0 && cur > first);
            if(this._elems.next)
                this.showhide_elem(this._elems.next, last >= 0 && cur < last);
        },
        _timestr : function(sec) {
            var str = "";
            
            //match the behavior of the server: truncate fractions away.
            sec = Math.floor(sec); 
            while(sec > 0)
            {
                var part = (sec % 60)
                var partstr = part.toString();
                if(partstr.length < 2) partstr = "0" + partstr;
                if(str.length > 0)
                {
                    str = partstr + ":" + str;
                }
                else
                {
                    str = partstr;
                }

                sec -= part;
                sec /= 60;
            }
            if(str.length == 0)
                str = "00:00";
            else if(str.length < 3)
                str = "00:" + str;

            return str;
        },
        _handle_loaded : function(percent) {
            this._loadpercent = percent;

            this._updateprog();
        },
        _updateprog : function() {
            var fillwidth = this._elems.prog.offsetWidth;
            var thumbrange = fillwidth - this._elems.progthumb.offsetWidth;
            var thumbpos = this._tracklength ? ((this._trackpos / this._tracklength) * thumbrange) : 0;

            this._elems.progthumb.style.left = thumbpos + "px";
            this._elems.progfill.style.width = this._loadpercent + "%";
            
            $(this._elem).find(".time.hiddenelem").removeClass("hiddenelem");
            $(this._elem).find(".time_elapsed").text( this._timestr(this._trackpos) );
            $(this._elem).find(".time_total").text( this._timestr(this._tracklength) );
        },
        _display_volume : function(value) {
            if(this._voltimer) {
                clearTimeout(this._voltimer);
                this._voltimer = null;
            }
            var volbars = this._elems["volbars"];
            if(!volbars) {
                volbars = document.createElement("div");
                YAHOO.util.Dom.addClass(volbars, "volumebars");
                var barhtml = '<div class="volumebar"></div>';
                var inner = "";
                for(var i=0; i<12; i++) {
                    inner += barhtml;
                }
                inner += '<img class="volumebarimg" src="/img/volbang.png">'
                inner += '<img class="volumebarimg" src="/img/volbang.png">'
                inner += '<img class="volumebarimg" src="/img/volbang.png">'
                inner += '<img class="volumebarimg" src="/img/vol1.png">'

                volbars.innerHTML = inner;
                this._elems["volbars"] = volbars;
                document.body.appendChild(volbars);
            }

            YAHOO.util.Dom.removeClass(volbars, "hiddenelem");

            var children = volbars.childNodes;
            for(var i=0; i<children.length; i++) {
                if(i / children.length < value) {
                    YAHOO.util.Dom.removeClass(children[i], "hiddenelem");
                } else {
                    YAHOO.util.Dom.addClass(children[i], "hiddenelem");
                }
            }

            var that = this;
            var hider = function() {
                that._hide_volume();
            }
            this._voltimer = setTimeout(hider, 3000);
        },
        _hide_volume : function() {
            U.addClass(this._elems["volbars"], "hiddenelem");
            this._voltimer = null;
        }, 
        find_elem : function(classname) {
            return Y.util.Dom.getElementsByClassName(classname, null, this._elem)[0];
        },
        showhide_elem : function(elem, bShow) {
            if(bShow)
                U.removeClass(elem, "hiddenelem");
            else
                U.addClass(elem, "hiddenelem");
        },
        toString : function() {
            if(this._trackinfo)
                return "[InlinePlayerView: id=" + this._elem.id + ", title=" + this._trackinfo.title + "]";
            else
                return "[InlinePlayerView: id=" + this._elem.id + ", no track]";
        }
    };

    return InlinePlayerView;
}();

;
/* ------------- BEGIN image_utils.js --------------- */;
/* global TemplGlobals, uploadImage */
/* exported ImageUtils */

var ImageUtils = (function () {
    'use strict';

    var FORMAT_EXTENSIONS = {
            "JPEG": "jpg",
            "PNG": "png"
        };
    // This duplicates the url formatting of Image.dynamic_urls(). Keep them in sync!
    function dynamicURL(kind, image_id, format, is_https) {
        if (!image_id) {
            return TemplGlobals.static_siteroot + '/img/blank.gif';
        }

        format = getFormat(format);
        var siteroot = ImageUtils.imageRoot(is_https);
        var ext;
        if (format.file_format) {
            ext = "." + FORMAT_EXTENSIONS[format.file_format];
        }
        else {
            ext = "";
        }
        image_id = ("000000000" + image_id).slice(-10);
        return siteroot + "/img/" + kind + image_id + "_" + format.id + ext;
    }

    function getFormat(format) {
        if (typeof(format) === "object") return format;

        var fmts = TemplGlobals.image_formats;
        if (fmts) {
            for (var i = 0; i < fmts.length; ++i) {
                if (fmts[i].id == format || fmts[i].name == format) {
                    return fmts[i];
                }
            }
        }
        Log.error('bad image format', format);
        return null;
    }

    // This duplicates the computations in Image.dynamic_dimensions().
    function calculateDimensions(width, height, format) {
        format = getFormat(format);
        var format_width, format_height;

        if (!format || format.resize_algo == 'original') {
            format_width  = width;
            format_height = height;
        } else if (format.resize_algo == 'thumb') {
            format_width  = format.width;
            format_height = format.height;
        } else if (format.resize_algo == 'fit') {
            // resize image on one dimension to fit within a maximum size
            // make sure this logic matches the logic that ImageMagick itself applies
            if (width <= format.width && height <= format.height) {
                // maintain original dimensions if image is within max height and width
                format_width = width;
                format_height = height;
            } else {
                // FIXME: do we need to do any rounding here when scaling dimensions? -- leigh 2013-04-16
                if ((width / format.width) > (height / format.height)) {
                    // shrink width to max, shrink height to match
                    format_width  = format.width;
                    format_height = Math.round(height * (format.width / width));
                } else {
                    // shrink height to max, shrink width to match
                    format_width  = Math.round(width * (format.height / height));
                    format_height = format.height;
                }
            }
        } else {
            Log.error('bad image resize algo', format);
            format_width  = width;
            format_height = height;
        }

        return {width: format_width, height: format_height};
    }

    var returnVal = {
        imageURL: function (image_id, format, is_https) {
            return dynamicURL('', image_id, format, is_https);
        },

        artURL: function (art_id, format, is_https) {
            return dynamicURL('a', art_id, format, is_https);
        },

        imageFormat: getFormat,
        imageDimensions: calculateDimensions,

        imageRoot: function (is_https) {
            if ('undefined' === typeof is_https) {
                is_https = window.location.protocol === 'https:';
            }
            return is_https ? TemplGlobals.image_siteroot_https : TemplGlobals.image_siteroot;
        }
    };

    if ('uploadImage' in window) {
        // ImageUtils.uploadImage() is just an alias for the global uploadImage() function for now.
        returnVal.upload = uploadImage;
    }

    return returnVal;
})();
;
/* ------------- BEGIN templ.js --------------- */;
// Library for rendering Liquid templates via JavaScript. 
//
// General usage:
//     Templ.render( "template_name", { key1: value1, key2, value2, ... } )
//
// This assumes that the template "template_name" has already been registered
// using Templ.register, either in the initial page html, a script include, or
// via an xhr request.

/* global $assert, Y, TemplGlobals, elt, Expression, Text, TextFormat, Time, CurrencyData, ImageUtils */

// Relax jshint a bit
/* jshint eqnull:true, evil:true */

var Templ = (function () {
  'use strict';
  return {
        
    // Hash of template names to values. Each value is an array of token
    // strings and objects (a translation of Liquid's parse tree to JS).
    templates: {},
    globals: null,  // don't access directly; use getGlobals()
    
    // Add one or more templates to the local store.
    register: function( hashOfTemplates ) {
        $.extend( Templ.templates, hashOfTemplates ); 
    },

    // for debugging: refresh a set of templates from the server
    refresh: function( set ) {
        $assert( set );
        var url = '/js_templates?x=' + Math.random() + '&set=' + set;
        var head = document.getElementsByTagName("head")[0];
        var newscript = document.createElement("script");
        newscript.type = "text/javascript";
        newscript.src = url;
        head.appendChild(newscript);
    },

    getGlobals: function() {
        if (!Templ.globals) {
            var pageData = $("#pagedata").data("blob"),
                newGlobals = pageData && pageData.templglobals,
                // TODO: this global variable should migrate to the pagedata scheme
                oldGlobals = (typeof(TemplGlobals) != "undefined") ? TemplGlobals : null;
            Templ.globals = $.extend({}, oldGlobals, newGlobals);
        }
        return Templ.globals;
    },
       
    // Render the named template to a string, applying the variables in hash.
    // Equivalent to Liquid's Template.render.

    // Render speeds, 2011-04-22:
    // Rendering download_panel with expression eval for variables: 78-80ms; with context.resolve for variables: 78ms.
    
    RENDER_SPEED_TEST: false,

    render: function( templName, hash ) {

        var myhash = $.extend( {}, Templ.getGlobals(), hash ); // later objects take precedence over earlier ones
        var context = new Templ.Context( myhash );
        var out = [];

        if (this.RENDER_SPEED_TEST) {

            Log.debug(">>> start rendering " + templName);
            var start_date = new Date();
            for (var i = 0; i < 100; ++i) {
                out = [];
                Templ.renderInternal( templName, context, out );
            }
            var end_date = new Date();        
            Log.debug(">>> end rendering " + templName + " - " + ((end_date - start_date) / 100.0) + "ms");

        } else {

            // Make context available to filters
            Templ.current_context = context;
            Templ.renderInternal( templName, context, out );
            Templ.current_context = null;
        }

        return out.join("");        
    },

    // Convenience function which removes all event handlers from the given
    // element's descendents, then replaces the element content with the
    // rendered template.
    renderElem: function( el, templName, hash ) {
        
        el = elt( el );
        Y.util.Dom.batch( Y.util.Dom.getChildren( el ), function( thisEl ) {
            Y.util.Event.purgeElement( thisEl, true );            
        });
        el.innerHTML = Templ.render( templName, hash );
    },

    renderTableRow: function( el, templName, hash ) {

        el = elt( el );
        Y.util.Dom.batch( Y.util.Dom.getChildren( el ), function( thisEl ) {
            Y.util.Event.purgeElement( thisEl, true );            
        });

        var parent = document.createElement("DIV");
        parent.innerHTML = "<table><tbody><tr>" + Templ.render( templName, hash ) + "</tr></tbody></table>";

        var newrow = parent.firstChild.firstChild.firstChild;

        while(el.firstChild != null)
        {
            el.removeChild(el.firstChild);
        }

        while(newrow.firstChild != null)
        {
            el.appendChild(newrow.removeChild(newrow.firstChild));
        }
    },
    
    renderInternal: function( templName, context, out ) {
        
        // Log.debug("rendering template: " + templName);

        var tokens = Templ.templates[ templName ];
        if ( !tokens ) {
            var msg = "[template not found: " + templName + "]";
            out.push( msg );
            Log.error( msg );
        }
        else
            Templ.renderTokens( tokens, context, out );
    },
    
    renderTokens: function( tokens, context, out ) {
        
        if ( tokens ) {
            for ( var i=0; i < tokens.length; i++ ) {
                var token = tokens[i];
                if ( typeof token === "string" ) {
                    out.push( token );
                }
                else {
                    try {
                        Templ.renderOneToken( token, context, out );
                    }
                    catch (e) {
                        Log.error('Error rendering token', token, 'context', context);
                        throw e;
                    }
                }
            }
        }
    },
    
    // Evaulates a given token. In the Liquid code, this is done in render
    // methods in each token class (Variable, Assign, If, etc.). For now, it
    // seemed unnecessary to create separate token classes on the client; instead, 
    // all that logic is here in a switch statement.
    renderOneToken: function( token, context, out ) {

        var i, block;
                
        switch ( token.type ) {
        
        case "variable":
            if ( !token.name ) // not sure why, but Liquid does this check
                return;
            var value = Expression.eval(token.name, function(term) {return context.resolve(term);});  // context.resolve( token.name );
            var filters = Templ.filters;
            Iter.each( token.filters, function( filterToken ) {
                
                // resolve filter arguments
                var args = Iter.collect( filterToken[1], function( thisArg ) { 
                    return context.resolve( thisArg );
                } );
                var filterFn = filterToken[0] ? filters[ filterToken[0] ] : null;
                if ( !filterFn ) {
                    value = "[template error: filter not found: " + filterToken[0] + "]";
                    Log.error(value);
                }
                else {
                    // apply filter
                    args.unshift( value );
                    value = filterFn.apply( null, args );
                }
            } );

            if ( value != null ) {
                if ( $.isArray( value ) )
                    value = value.join(""); // matches Liquid's behavior
                out.push( value );
            }
            break;

        case "assign":
            //sdg TODO: handle nested scopes
            context.hash[ token.to ] = context.resolve( token.from );
            break;

        case "case":
        case "if":
            var blocks = token.blocks;
            for ( i=0; i < blocks.length; i++ ) {
                block = blocks[i];
                if ( Templ.evalCondition( block, context ) ) {
                    Templ.renderTokens( block.attachment, context, out );
                    break;
                }
            }
            break;

        case "for":
            var collection = context.resolve(token.collection_name);
            if (collection instanceof Templ.Range)
                collection = collection.expand();
            var nodelist = token.nodelist;
            var offset = token.attribs.offset != null ? context.resolve(token.attribs.offset) : 0;
            var limit = Math.max( collection.length - offset, 0 );
            if ( token.attribs.limit != null )
                limit = Math.min( limit, context.resolve(token.attribs.limit) );
            var collectionSlice = collection.slice( offset, offset + limit );
            if ( token.reversed )
                collectionSlice.reverse();
            context.stashLoopvars();
            for(i=0; i<limit; i++)
            {
                context.hash[token.variable_name] = collectionSlice[i];
                context.hash.forloop = {
                    'length':  limit,
                    'index':   i+1,
                    'index0':  i,
                    'rindex':  limit - i,
                    'rindex0': limit - i - 1,
                    'first':   (i === 0),
                    'last':    (i === limit - 1)
                };
                Templ.renderTokens(nodelist, context, out);
            }
            context.restoreLoopvars();
            break;
        case "include":
            var subtemplateName = context.resolve( token.template_name );
            Templ.renderInternal( subtemplateName, context, out );
            break;
        case "capture":
            var capture_out = [];
            Templ.renderTokens(token.nodelist, context, capture_out);
            var strval = "";
            for(i=0; i<capture_out.length; i++)
                strval += capture_out[i];

             context.hash[ token.to ] = strval;

            break;

        case "ef":
            blocks = token.blocks;
            for ( i=0; i < blocks.length; i++ ) {
                block = blocks[i];
                if ( Templ.evalNCondition( block, context ) ) {
                    Templ.renderTokens( block.attachment, context, out );
                    break;
                }
            }
            break;

        case "let":
            context.hash[ token.variable ] = Expression.eval(token.expression, function(term) {return context.resolve(term);});
            break;
        }
    },

    evalNCondition: function( block, context ) {
        if ( block.type == "else_ncondition" )
            return true;
        return Templ.isTrue(Expression.eval(block.expression, function(term) {return context.resolve(term);}));
    },

    evalCondition: function( block, context ) {
        
        if ( block.type == "else_condition" )
            return true;
        
        var result;
        var left = context.resolve( block.left );
        var operator = block.operator;
        if ( !operator ) 
            result = Templ.isTrue( left ); // single variable
        else {
            var operatorFn = Templ.operators[ operator ];
            if ( !operatorFn ) {
                Log.error( "template: unrecognized operator: " + operator );
                return false;
            }
            var right = context.resolve( block.right );
            result = operatorFn( left, right );
        }
        
        if ( block.child_relation == 'or' )
            result = Templ.isTrue( result ) || Templ.isTrue( Templ.evalCondition( block.child_condition, context ) );
        else if ( block.child_relation == 'and' )
            result = Templ.isTrue( result ) && Templ.isTrue( Templ.evalCondition( block.child_condition, context ) );
        return result;
    },
    
    // matches the liquid (and ruby) definition of truth
    isTrue: function( val ) {
        return val !== false && val != null; // 0 and "" are true
    },

    EMPTY: {
        equals : function(other) {
            if(other == this) return true;

            return(!other || other.toString() === "");
        }
    },

    // an integral range; end is inclusive
    Range: function( start, end ) {
        //sdg TODO: error checking
        this.start = start;
        this.end = end;

        this.expand = function() {
            var out = [];
            for (var i = this.start; i <= this.end; i++)
                out.push(i);
            return out;
        };
    },
    
    // see Liquid's condition.rb
    operators: {
        '==': equalOperator,
        '!=': function (l, r) { return !equalOperator(l,r); },
        '<>': function (l, r) { return !equalOperator(l,r); },
        '<' : function (l, r) { return Expression.evaluate_comparison('<', l,r); },
        '>' : function (l, r) { return Expression.evaluate_comparison('>', l,r); },
        '<=': function (l, r) { return Expression.evaluate_comparison('<=',l,r); },
        '>=': function (l, r) { return Expression.evaluate_comparison('>=',l,r); },
        'contains': function( l, r ) {
            if ( typeof l === "string" )
                return l.indexOf(r) >= 0;
            if ( $.isArray( l ) ) {
                for ( var i=0; i < l.length; i++ ) {
                    if ( l[i] == r ) 
                        return true;
                }
                return false;
            }
            if ( l instanceof Templ.Range )
                return r >= l.start && r <= l.end;
            return false; //sdg TODO: log possible error here
        }
    },

    // see standardfilters.rb and LiquidFilters.rb
    filters: {
        
        // Return the size of an array or of an string
        size: function( input ) {
            return input ? input.length : 0;
        },
        
        // Convert to lowercase
        downcase: function( input ) {
            return input != null ? input.toString().toLowerCase() : "";
        },
        
        // Convert to uppercase
        upcase: function( input ) {
            return input != null ? input.toString().toUpperCase() : "";
        },
        
        // HTML escape
        escape: function( input ) {
            return input != null ? Text.escapeHtml( input.toString() ) : ""; 
        },
        
        escape_html_attr: function( input ) {
            return Templ.filters.escape( input );
        },

        noblanks: function( input, aggressive ) {
            var s;
            if (aggressive) {
                s = input.replace(/(\n *)+/g, "").replace(/\n--/g, "\n");
            }
            else {
                s = input.replace(/(\n *)+/g, "\n").replace(/\n--/g, "\n");
            }
            return s;
        },
        
        // HTML remove
        strip_html: function( input ) {
            return input != null ? input.toString().replace( /<.*?>/g, '' ) : "";
        },
        
        strip_newlines: function( input ) {
            return input != null ? input.toString().replace( /\n/g, '' ) : "";
        },
        
        newline_to_br: function( input ) {
            return input != null ? input.toString().replace( /\n/g, "<br />\n" ) : "";
        },
        
        // creates a half-height line gap for double-newlines:
        newline_to_gap: function( input ) {
            return input != null ? input.toString().replace( /\n[\r\t ]*\n/g, '<br /><span class="lightweightBreak" /></span><br />' ).replace( /\n/g, "<br />\n" ) : "";
        },
        
        replace: function( input, str, repl ) {
            return Templ.filters.replace_regex( input, Text.regexpEscape( str ), repl );
        },

        replace_regex: function( input, str, repl ) {
            if ( input == null )
                return '';
            if ( repl == null )
                repl = '';            
            input = input.toString();
            var result = input.replace( new RegExp( str, "gm" ), repl );
            return result;
        },
        
        replace_first: function( input, str, repl ) {
            if ( repl == null )
                repl = '';
            return input != null ? input.toString().replace( str, repl ) : "";
        },
        
        remove: function( input, str ) {
            return Templ.filters.replace( input, str );
        }, 
        
        remove_first: function( input, str ) {
            return Templ.filters.replace_first( input, str );
        },        
        
        // URI encode
        encode_uri_c: function( input ) {
            // NOTE: for some reason this doesn't escape single quotes, while
            // the server-side version does
            return input != null ? encodeURIComponent( input ).replace( /'/g, "%27" ) : "";
        },
        
        // Join elements of the array with a delimiter
        join: function( input, glue ) {
            if ( glue == null )
                glue = " ";
            return $.isArray( input ) ? input.join( glue ) : input;
        },

        // Sort elements of the array 
        sort: function( input ) {
            function comparator( a, b ) {
                if ( a > b ) return 1;
                if ( a < b ) return -1;
                return 0;
            }
            return $.isArray( input ) ? input.slice(0).sort( comparator ) : input;
        },
        
        // Returns the first element of the array
        first: function( input ) {
            return $.isArray( input ) ? input[0] : null;
        },
        
        // Returns the last element of the array
        last: function( input ) {
            return $.isArray( input ) && input.length ? input[input.length - 1] : null;
        },

        edit_if_empty : function(input, club_id, fieldname, linktext) {
            if(input && input.length > 0)
            {
                return input;
            }

            return Templ.filters.edit_field(linktext, club_id, fieldname);
        },

        edit_field : function(linktext, club_id, fieldname) {
            return '<a href="/edit?id=' + club_id + '&focus=' + fieldname + '">' + linktext + '</a>';
        },

        date: function(date, format) {
            if (typeof date == "string")
                date = new Date(Date.parse(date));
            return Time.strftime(date, format);
        },

        // formats a date as a datetime
        ui_datetime: function( input ) {
            return input ? Time.toUi( input, false, true ) : ''; // use UTC to match server behavior
        },
        
        // formats a date as a date only
        ui_date: function( input, fourDigitYear ) {
            return input ? Time.toUiDate( input, fourDigitYear, true ) : ''; // use UTC to match server behavior
        },
        
        to_date: function( input ) {
            return new Date(input * 1000);
        },

        relative_day: function( input, format ) {
            return input ? Time.relative_day(input, format) : '';
        },

        relative_time: function( input, format ) {
            return input ? Time.relative_time(input, format) : '';
        },

        json: function( input ) {
            return Y.lang.JSON.stringify( input );
        },

        plural: function(input, si, pl) {
            if (pl == null)
                pl = si + "s";
            return input == "1" ? si : pl;
        },

        capitalize: function(input) {
            return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
        },

        capitalize_first_character: function(input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        },

        currency: function(input, currency, numeric, informal, terse) {
            // gracelessly defaults to US if the CurrencyData global is missing...
            if ( input == null ) return "";
            return TextFormat.currency ( input, window.CurrencyData ? CurrencyData.info[ currency || 'USD' ] : null, numeric, informal, terse );
        },

        money: function(input, currency, format) {
            return TextFormat.money(input, currency, format);
        },

        negate: function(input) {
            if (input && input.is_money) {
                return {amount: -input.amount, currency: input.currency, is_money: true};
            }
            else if ('number' === typeof input) {
                return -input;
            }
            return '';
        },
        
        truncate: function( input, len, ellipsis ) {
            ellipsis = ellipsis || "...";
            return Text.truncate( input, len, ellipsis );
        },
        
        add_query_parm: function(input, query_parm) {
            if (!input) {
                return "";
            }
            if (query_parm === null || query_parm.length === 0) return input;
            return input + (input.indexOf('?') > -1 ? '&' : '?') + query_parm;
        },
        
        mb: TextFormat.toMb,
        
        url: function(input, isHttps, prefix) {
            var key = !isHttps ? "url" : "https_url";
            if ( prefix ) {
                prefix = prefix + "";
                if ( prefix.charAt(prefix.length - 1) != "_" ) 
                    prefix = prefix + "_";
                key = prefix + key;
            }
            return input[key];
        },
        
        commafy: function(input) { return TextFormat.commafyNumber(''+input); },
        
        fan_link: function(input, style) {
            return "<a href='" + input.trackpipe_url + "' style='" + style + "'>" + input.name + "</a>";
        },
        
        html_autolink: function(input, link_attribs) {
            if (link_attribs == null || typeof link_attribs == "undefined") {
                link_attribs = "";
            }

            // escape any markup inside the input before performing linkification
            input = Text.escapeHtml(input);
            
            // this implementation was borrowed/tweaked from a jquery plugin (http://code.google.com/p/jquery-linkifier/source/browse/jquery.gn.linkifier.js).
            // that plugin expects to be operating on already formed DOM elements, but our client-side rendering is a bit different than that, and
            // we'd like to be able to do things like chain different filters together.  so, imitation and flattery and all, thanks jquery linkifier.
            // BS: one difference between this and the server-side equivalent is that this one doesn't auto-strip the protocol from the displayed text.
            
            //URLs starting with http:// or https://
            var replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            var replacedText = input.replace(replacePattern1, '<a href="$1" ' + link_attribs + '>$1</a>');

            //URLs starting with www. (without // before it, or it'd re-link the ones done above)
            var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" ' + link_attribs + '>$2</a>');

            //Change email addresses to mailto:: links
            var replacePattern3 = /(\w+@[A-Z0-9_]+?\.[a-zA-Z]{2,6})/gim;
            replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
            
            return replacedText;
        },

        // aritmetic operations
        plus: function(a, b) {
            return(a + b);
        },
        minus: function(a, b) {
            return(a - b);
        },
        times: function(a, b) {
            return(a * b);
        },
        divided_by: function(a, b) {
            if(a == Math.floor(a) && b == Math.floor(b)) {
                return(Math.floor(a / b));
            } else {
                return(a / b);
            }
        },

        image: function(info, format) {
            var id_only = (typeof(info) == "number") || !info;
            var image_id = id_only ? info : info.image_id;

            var url = Templ.filters.image_url(image_id, format);

            if (id_only)
                return 'src="' + url + '"';
            else {
                var dims = ImageUtils.imageDimensions(info.width, info.height, format);
                return 'src="' + url + '" width="' + dims.width + '" height="' + dims.height + '"';
            }
        },
        image_url: function(image_id, format) {
            return ImageUtils.imageURL(image_id, format, Templ.current_context.resolve("is_https"));
        },

        art: function(art_id, format) {
            var url = Templ.filters.art_url(art_id, format);
            return 'src="' + url + '"';
        },
        art_url: function(art_id, format) {
            return ImageUtils.artURL(art_id, format, Templ.current_context.resolve("is_https"));
        },
        
        popup_image: function(info, format) {
            /* like image above, but for use in an <a> tag for popup images */
            var id_only = (typeof(info) == "number");
            var image_id = id_only ? info : info.image_id;

            var url = Templ.filters.image_url(image_id, format);

            if (id_only)
                return 'href="' + url + '"';
            else {
                var dims = ImageUtils.imageDimensions(info.width, info.height, format);
                return 'href="' + url + '" data-image-size="' + dims.width + ',' + dims.height + '"';
            }
        },
        
        image_width: function(info, format) {
            var dims = ImageUtils.imageDimensions(info.width, info.height, format);
            return dims.width;
        },
        
        image_height: function(info, format) {
            var dims = ImageUtils.imageDimensions(info.width, info.height, format);
            return dims.height;
        },

        possessify: function(name) {
            if (name === null || typeof name !== 'string'){
                return name;
            }
            return /s$/.test(name) ? (name + "'") : (name + "'s");
        },
        
        fan_page_url: function(username) {
            return Templ.current_context.resolve("siteroot_current") + "/" + username;
        },

        band_url: function (url_hints) {
            if (!url_hints) {
                return '';
            }
            // duplication of Domains.site_url_from_hash(url_hints, true, true, is_https)
            var customDomain = url_hints.custom_domain;
            var customDomainVerified = url_hints.custom_domain_verified;
            var subdomain = url_hints.subdomain;
            var customDomainsActive = Templ.current_context.resolve("custom_domains_active");
            var basePortStr = Templ.current_context.resolve("base_port_str") || '';
            var baseDomainWithPort = Templ.current_context.resolve("sitedomain");

            if (customDomainsActive && customDomain && customDomainVerified) {
                return 'http://' + customDomain + basePortStr;
            } else if (subdomain) {
                return location.protocol + '//' + subdomain + '.' + baseDomainWithPort;
            }
            return '';
        },

        tralbum_url: function (url_hints) {
            if (!url_hints) {
                return '';
            }
            // Duplication of Slug.page_url_from_slug(url_hints['item_type'], url_hints['slug'])
            var pagebase = "";
            if(url_hints.item_type === 'a') {
                pagebase = "/album/";
            } else if(url_hints.item_type === 't') {
                pagebase = "/track/";
            } else if(url_hints.item_type === 'p') {
                pagebase = "/merch/";
            }

            return Templ.filters.band_url(url_hints) + pagebase + url_hints.slug;
        },

        subscribe_url: function (url_hints) {
            if (!url_hints) {
                return '';
            }

            return Templ.filters.band_url(url_hints) + "/subscribe";
        },

        featured_track_url: function (url_hints, featured_track_number) {
            if (!url_hints) {
                return '';
            }

            return Templ.filters.tralbum_url(url_hints) + '?t=' + featured_track_number;
        },

        // NOTE: only supports #FFFFFF or FFFFFF - if you need shorthand, add it
        hex_to_rgb: function(hex) {
            if (!hex) {
                return null;
            }

            if (hex[0] === "#") {
                hex = hex.substring(1);
            }

            // double check that it's a hex
            if (!hex.match(/[0-9A-Fa-f]{6}/)) {
                return null;
            }

            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            return r + ", " + g + ", " + b; 
        }
    },

    // The template execution context; holds variable values.
    // Equivalent to Liquid's Context.
    Context: function (hash) {
        this.hash = hash || {};
        this.loopvars = null;
    }
  };

  function equalOperator(l, r) {
    if (l == Templ.EMPTY) return l.equals(r);
    else if (r == Templ.EMPTY) return r.equals(l);
    else return Expression.evaluate_comparison('==', l, r);
  }
})();

// aliases
Templ.filters.h = Templ.filters.escape; 
Templ.filters.a = Templ.filters.attr = Templ.filters.escape_html_attr;
Templ.filters.u = Templ.filters.encode_uri_c; 
    
Templ.Context.prototype = (function () {
  'use strict';
  return {
        
    // Resolves a literal value, or a variable reference, into a JS value.
    resolve: function( name ) {
        
        switch ( name ) {
        case null:
        case 'nil':
        case 'null':
        case '':
            return null;
        case 'true':
            return true;
        case 'false':
            return false;
        case 'empty':
            return Templ.EMPTY;
        }
        
        var match;
        // Single quoted strings
        if ( (match = /^'(.*)'$/.exec(name)) )
            return match[1];
        // Double quoted strings
        if ( (match = /^"(.*)"$/.exec(name)) )
            return match[1];
        // Integers
        if ( /^\d+$/.test(name) ) 
            return parseInt(name);
        // Ranges
        if ( (match = /^\((\S+)\.\.(\S+)\)$/.exec(name)) )
            return new Templ.Range( this.resolve(match[1]), this.resolve(match[2]) );
        // Floats (must follow Ranges, as its pattern also matches those)
        if ( /^(\d[\d\.]+)$/.test(name) ) 
            return parseFloat(name);
        
        return this.variable( name );
    },
    
    variable: function( nameExpr ) {
        
        // Our implementation here differs wildly from liquid's. It should
        // handle at least the common cases, however.
        
        // Look for the special .size, .first, or .last "methods".
        // Make an exception for the loop construct's forloop.first and forloop.last.
        var method;
        if ( !nameExpr.match( /^forloop[\[\.](first|last)$/ ) ) {
            var match = nameExpr.match( /\.(size|first|last)$/ );
            if ( match ) {
                method = match[1];
                nameExpr = nameExpr.substr( 0, match.index );
            }
        }
        
        //sdg TODO: these forms:
        //  foo.blah.fa (hash lookup)
        //  foo[blah][fa] (hash lookup)
        // TODO: this implements the above TODO, but is it safe?
        var val = null;
        try {
            val = eval("this.hash." + nameExpr);
        }
        catch (e) {
            try {
                //look for forms [xyz] and [abc.xyz] and add the context;
                //doesn't handle [abc[xyz]]
                val = eval("this.hash." + nameExpr.replace( /\[([\w.]+)\]/, "[this.hash.$1]" ));
            }
            catch (e2) {
                // Presumably we're trying to look up a nonexistent intermediate object.
                // Liquid's behavior in this case is to output nothing, so we'll 
                // do the same. 
                Log.debug( "Failed template hash lookup: [" + nameExpr + "]; message: " + e2.message );
            }
        }
        
        if ( method )
            val = Templ.filters[ method ]( val );
        
        return val;
    },

    stashLoopvars: function() {
        var vars = this.hash.forloop;
        if (vars) {
            this.loopvars = this.loopvars || [];
            this.loopvars.push(vars);
        }
    },

    restoreLoopvars: function() {
        if (this.loopvars)
            this.hash.forloop = this.loopvars.pop();
    }
  };
})();
;
/* ------------- BEGIN share_external.js --------------- */;

var FacebookUtils = {
    _sdkLoadPromise: null,
    resizeTimer: null,

    // Loads the FB JavaScript API, returning a jquery Promise object which callers can subscribe to.
    // Can be called safely multiple times.
    initSDK: function() {
        if (FacebookUtils._sdkLoadPromise)
            return FacebookUtils._sdkLoadPromise;

        var dfd = new $.Deferred();
        window.fbAsyncInit = function() {
            // Facebook's JS calls this method automatically when their API is ready
            Log.debug("Facebook SDK loaded");
            FB.init({appId: "165661066782720", status: true, cookie: true, xfbml: false});
            dfd.resolve();
        };
        $(document.body).prepend('<div id="fb-root"></div>'); // required by the API

        // NOTE: we are not using the #xfbml=1 hash on the URL. I *think* this means that the FB JS won't automatically
        // search the DOM for social plugins and such. Call FB.XFBML.parse after the API loads to do this manually.
        // - sdg 2012.10.25

        $.cachedScript("//connect.facebook.net/en_US/all.js");
        return FacebookUtils._sdkLoadPromise = dfd.promise();
    },

    initFbApp: function() {

        FacebookUtils.initSDK().done( function() {
                FacebookUtils.reportResize();
        });
    },
    
    onGeneric: function( response ) {
        Log.note("some sort of event");
    },

    reportResize: function() {

        if( FacebookUtils.resizeTimer ) {
            clearTimeout(FacebookUtils.resizeTimer);
        }

        FacebookUtils.resizeTimer = setTimeout( function() {

                if ( $("body.fb").height() ){
                    var dims = { height: $("body.fb").height() + 40, width: $("body.fb").width() } ;

                    Log.note( "reportResize cb: resize timer: " + FacebookUtils.resizeTimer + " setting height FB canvas tab to: " + dims.height + "," + dims.width );
                    FB.Canvas.setSize( dims );
                }

                clearTimeout( FacebookUtils.resizeTimer );
                FacebookUtils.resizeTimer = null;

            }, 50);
    },
    
    inAppNav: function(pageType, paths, params){
        // pageType : "album", "track", "merch"
        // paths: slugtext 
        // params: bid = < band_id > 
        
        var path = pageType;
        
        if ( paths && paths.length > 0 )
            path += ( "/" + paths.join("/") );
        
        if ( FacebookData && FacebookData.referer )
            params["ref"] = FacebookData.referer;

        SimpleForm.submit("/fb_tab/" + path, params, "GET");

        // avoid a jerky landing, or in an unexpected place
        if( FacebookData ) {
            $("body").hide();
            FB.Canvas.scrollTo(0,0);
        } 
    },
    
    correctSrollThen: function(patchYui, _this, interceptedFn /*, list all your functions arguments here: arg1, arg2, arg3, ...  */) {

        var args = Array.prototype.slice.call(arguments); 
        args.shift(), args.shift(), args.shift();
        
        FacebookData.positionInfo = null;

        FB.Canvas.getPageInfo( 
            function( info ) {
                
                FacebookData.positionInfo = info;
                
                if ( patchYui ) {
                    _getDocumentScrollTop = Y.util.Dom.getDocumentScrollTop;
                    _getViewportHeight = Y.util.Dom.getViewportHeight;
                    _getDocumentHeight = Y.util.Dom.getDocumentHeight;
                    
                    var iScrollTop = parseInt(info.scrollTop);
                    Y.util.Dom.getDocumentScrollTop = function(){ return iScrollTop; };
                    
                    var iClientHeight = parseInt(info.clientHeight);
                    Y.util.Dom.getViewportHeight = function(){ return iClientHeight; };
                    
                    //todo: bs: etc: get some metric on visible height. this number seems to be
                    //               artificially large for facebook pages. I'm faking it here.
                    Y.util.Dom.getDocumentHeight = function(){ return iClientHeight*3; };
                }
                
                if (interceptedFn) {
                    
                    el = interceptedFn.apply(_this, args );
                    if( el )
                        FacebookUtils.fixCentering( el ); /* sometimes required (ie, YUI Dialogs) */
                    
                    if ( patchYui ) {
                        Y.util.Dom.getDocumentScrollTop = _getDocumentScrollTop ;
                        Y.util.Dom.getViewportHeight = _getViewportHeight ;
                        Y.util.Dom.getDocumentHeight = _getDocumentHeight                        
                    }
                    return el;
                }
                    
            });
    }, 

    fixCentering: function( el ) { 

        if ( el.element )
            el = el.element;
            
        if ( window.FacebookData.positionInfo ) {
            var scrollTop = parseInt(FacebookData.positionInfo.scrollTop);
            $("#"+el.id).css( {top: scrollTop} ); 

            // hack: the yui seems to alter the page geometry (not always, but when scroll amount is relatively small)
            FB.Canvas.scrollTo( 0, scrollTop ); 
            
        }
             
    }, 
    
    xxx: null
};

var GPlusUtils = {
    _sdkLoadPromise: null,

    // Loads the Google Plus JavaScript API, returning a jquery Promise object which callers can subscribe to. 
    // Can be called safely multiple times.
    initSDK: function(fn) {
        if (GPlusUtils._sdkLoadPromise)
            return GPlusUtils._sdkLoadPromise;
        window.___gcfg = { parsetags: 'explicit' };
        var promise = $.cachedScript("https://apis.google.com/js/plusone.js").promise().done( function() {
            Log.debug("Google Plus SDK loaded");
        });
        return GPlusUtils._sdkLoadPromise = promise;
    },

    xxx: null
};

var EmailIMUtils = {
    
    alreadyStattedFromFocus : false,
    
    onFocus: function() {
        if (!self.alreadyStattedFromFocus) {
            Stats.record({kind:"click", click: "email_tralbum"});
            self.alreadyStattedFromFocus = true;
        }
        return false;
    },
    
    xxx: null
};



;
/* ------------- BEGIN social_controls.js --------------- */;
/*

SocialControls -- a module for easily generating social widgets: Facebook Like and Share buttons, Tweet buttons, Tumblr
and Google Plus buttons. There are two ways to use this module:

-- OPTION 1: Call methods directly

The static render* methods, below, can be called directly to render individual controls. See each method for 
supported options.

-- OPTION 2: DOM configuration

This module expects a specific HTML DOM structure and class names. When that DOM subtree is passed into
the initFromDOM() method, we generate the social controls. All options for the various controls are passed in 
either via data-* attributes or class names.

Here's the minimal HTML required to display all our supported controls. Note that the HTML does not need to be a list,
but it often makes sense to use one. Also notice that the HTML is basically empty -- since some of the controls are 
rendered client-side only (FB Like, GPlus), it made sense to handle all rendering in JS.

<ul class="social-controls">
    <li class="facebook-like-ctrl"></li>
    <li class="facebook-share-ctrl"></li>
    <li class="twitter-ctrl"></li>
    <li class="tumblr-ctrl"></li>
    <li class="gplus-plusone-ctrl"></li>
    <li class="gplus-share-ctrl"></li>
</ul>

The FB Like and GPlus buttons are rendered by the those services, subject to their supported options, so we have limited
control over how they appear. The other buttons are rendered as <a> tags, and can be styled however you like. For
twitter and tumblr, add a "btn" class to the *-ctrl element to pick up our standard CSS for that button.

Here's an example decorated with various options. Note that the data attributes can go at either level. At the top
level they're shared between all controls, and can be overridden at the lower level.

<ul class="social-controls" data-url="http://some.url.to.share" data-text="Check out this crazy thing!">
    <li class="facebook-like-ctrl" data-layout="standard" data-colorscheme="dark"></li>
    <li class="facebook-share-ctrl btn"></li>
    <li class="twitter-ctrl btn"></li>
    <li class="tumblr-ctrl btn" data-url="http://some.other.url.just.for.tumblr" data-title="My Cool Page"></li>
    <li class="gplus-plusone-ctrl" data-size="tall"></li>
</ul>

For a list of supported data attributes, see the comments above each of the render methods, below.

Prerequisites: share_external.js, share_controls.css (for .btn styles)

*/

var SocialControls = {

    initFromDOM: function(root) {
        var self = this,
            $root = $(root),
            $containers = $root.add(".social-controls", $root).filter(".social-controls");

        $containers.each( function() {
            var $cont = $(this);
            self._initControlsOfType($cont.find(".facebook-like-ctrl"), "renderFacebookLike");
            self._initControlsOfType($cont.find(".facebook-share-ctrl"), "renderFacebookShare");
            self._initControlsOfType($cont.find(".twitter-ctrl"), "renderTwitterShare");
            self._initControlsOfType($cont.find(".tumblr-ctrl"), "renderTumblrShare");
            self._initControlsOfType($cont.find(".gplus-ctrl, .gplus-plusone-ctrl"), "renderGPlusPlusOne");
            self._initControlsOfType($cont.find(".gplus-share-ctrl"), "renderGPlusShare");
            self._initControlsOfType($cont.find(".email-ctrl"), "renderEmailShare");
        });
    },

    //
    //// "static" render methods which can be called directly, if desired
    //

    // Renders a FB Like button.
    // data.url - optional, the URL to Like (defaults to current page)
    // data.stat - optional, the StatClick name to stat when the user Likes something
    // data.statOff - optional, the StatClick name to stat when the user unLikes something
    // Other, optional data properties match FB's documentation
    //    see: https://developers.facebook.com/docs/reference/plugins/like/
    renderFacebookLike: function(elem, data) {
        var self = this,
            $elem = $(elem),
            // The min width for the FB Like button is supposedly 90px, but it appears they do try to collapse 
            // it narrower when appropriate
            dataDefaults = { url: location.href, send: "false", layout: "button_count", width: "90", "show-faces": "false" },
            data = $.extend(dataDefaults, data),
            // create the Like button placeholder element
            $like = $('<div class="fb-like"></div>').appendTo($elem);

        // set up the Like button's HTML5 data attributes
        $.each(data, function(key, val) { 
            if (key == "url")
                key = "href";
            $like.attr("data-" + key, val);
        });

        FacebookUtils.initSDK().done( function() {
            FB.XFBML.parse( $elem[0] );
            self._registerFBEventHandlers(elem, data);
            $elem.data("scResolvedData", data);  // stash data for later use by FB event handlers
            Log.debug("SocialControls: rendered Facebook Like button");
        });
    },

    // Renders a Facebook "share" button or link (different from the Like button, above).
    // data.url - optional, the URL to share (defaults to current page)
    // data.stat - optional, the StatClick name to stat when the user clicks the button (data.statOff is not supported)
    renderFacebookShare: function(elem, data) {
        // TODO: we should probably use the newish "Feed Dialog" here instead: 
        // https://developers.facebook.com/docs/reference/dialogs/feed/
        var self = this,
            $elem = $(elem),
            dataDefaults = { url: location.href },
            data = $.extend(dataDefaults, data),
            params = { u: data.url },
            isDesktop = (!window.MediaView || MediaView.mode == "desktop"),
            fbUrl = Url.addQueryParams(isDesktop ? "http://www.facebook.com/sharer.php" : "http://m.facebook.com/sharer.php", params);

        // use the existing link element if it exists, otherwise add it
        var $fbLink = $elem.find(".facebook-link").first();
        if (!$fbLink.length)
            $fbLink = $('<a class="facebook-link" title="Share on Facebook">Share</a>').appendTo($elem);

        $fbLink.attr({"href": fbUrl, "target": "_blank"}).click( function(ev) {
            self._statClick(data, "on");
            if (isDesktop) {
                window.open(fbUrl, "share_fb", "toolbar=0,status=0,width=626,height=436");
                ev.preventDefault();
            }
            // else, for phones, fall back to the default link behavior
        });
        Log.debug("SocialControls: rendered Twitter share button");
    },

    // Renders a tweet button or link.
    // data.url - optional, the URL to share (defaults to current page)
    // data.text - optional, additional tweet text (subject to Twitter's length limit)
    // data.stat - optional, the StatClick name to stat when the user clicks the button (data.statOff is not supported)
    renderTwitterShare: function(elem, data) {
        var self = this,
            $elem = $(elem),
            dataDefaults = { url: location.href },
            data = $.extend(dataDefaults, data),
            params = { url: data.url },
            isDesktop = (!window.MediaView || MediaView.mode == "desktop");
        if (data.text)
            params.text = data.text;
        var twUrl = Url.addQueryParams("https://twitter.com/intent/tweet", params);

        // use the existing link element if it exists, otherwise add it
        var $twLink = $elem.find(".twitter-link").first();
        if (!$twLink.length)
            $twLink = $('<a class="twitter-link" title="Share on Twitter">Tweet</a>').appendTo($elem);

        $twLink.attr({"href": twUrl, "target": "_blank"}).click( function(ev) {
            self._statClick(data, "on");
            if (isDesktop) {
                window.open(twUrl, "share_tw", "toolbar=0,status=0,width=550,height=450");
                ev.preventDefault();
            }
            // else, for phones, fall back to the default link behavior
        });
        Log.debug("SocialControls: rendered Twitter share button");
    },

    // Renders a Tumblr share button or link.
    // data.type - optional, "link" or "audio" (shares an audio player); defaults to "link"
    // data.url - optional, the URL to share (defaults to current page)
    // data.text - optional, caption/description text
    // data.title - optional, the title of the page you're sharing (type == "link" only)
    // data.stat - optional, the StatClick name to stat when the user clicks the button (data.statOff is not supported)
    renderTumblrShare: function(elem, data) {
        var self = this,
            $elem = $(elem),
            dataDefaults = { url: location.href, type: "link" },
            data = $.extend(dataDefaults, data),
            params = {};

        if (data.type == "audio") {
            // I'm not sure why these param names differ from those used for link shares, below. I'm copying what
            // we currently use.  - sdg 2013.05.01
            params.external_url = data.url;
            if (data.text)
                params.caption = data.text;
        }
        else {
            params.url = data.url;
            if (data.title)
                params.name = data.title;
            if (data.text)
                params.description = data.text;
        }
        var tmUrl = Url.addQueryParams("http://www.tumblr.com/share/" + data.type, params);

        // use the existing link element if it exists, otherwise add it
        var $tmLink = $elem.find(".tumblr-link").first();
        if (!$tmLink.length)
            $tmLink = $('<a class="tumblr-link" title="Share on Tumblr">Share on Tumblr</a>').appendTo($elem);

        $tmLink.attr({"href": tmUrl, "target": "_blank"}).click( function(ev) {
            self._statClick(data, "on");
        });
        Log.debug("SocialControls: rendered Tumblr share button");
     },

    // Renders a Google Plus "+1" button
    // data.url - optional, the URL to Like (defaults to current page)
    // data.stat - optional, the StatClick name to stat when the user +1's something
    // data.statOff - optional, the StatClick name to stat when the user clears the +1
    // Other, optional data properties match Google's documentation
    //    see: https://developers.google.com/+/web/+1button/#plusonetag-parameters
    renderGPlusPlusOne: function(elem, data) {
        var self = this,
            $elem = $(elem),
            dataDefaults = { url: location.href, size: "medium", annotation: "none" },
            data = $.extend(dataDefaults, data),
            params = {};

        $.each(data, function(key, val) { 
            if (key == "url")
                key = "href";
            params[key] = val;
        });

        params.callback = function(info) {
            // data.state is "on" (+1) or "off" (removal of +1)
            self._statClick(data, info.state);
        };

        GPlusUtils.initSDK().done( function() {
            gapi.plusone.render($elem[0], params);
            Log.debug("SocialControls: rendered Google Plus +1 button");
        });
    },

    // Renders a G+ share button or link.
    // data.url - optional, the URL to share (defaults to current page)
    // data.stat - optional, the StatClick name to stat when the user clicks the button (data.statOff is not supported)
    renderGPlusShare: function(elem, data) {
        var self = this,
            $elem = $(elem),
            dataDefaults = { url: location.href },
            data = $.extend(dataDefaults, data),
            params = { url: data.url },
            isDesktop = (!window.MediaView || MediaView.mode == "desktop");
        var gpUrl = Url.addQueryParams("https://plus.google.com/share", params);

        // use the existing link element if it exists, otherwise add it
        var $gpLink = $elem.find(".gplus-link").first();
        if (!$gpLink.length)
            $gpLink = $('<a class="gplus-link" title="Share on Google+">Google+</a>').appendTo($elem);

        $gpLink.attr({"href": gpUrl, "target": "_blank"}).click( function(ev) {
            self._statClick(data, "on");
            if (isDesktop) {
                window.open(gpUrl, "share_gp", "menubar=0,toolbar=0,resizable=1,scrollbars=1,height=460,width=600");
                ev.preventDefault();
            }
            // else, for phones, fall back to the default link behavior
        });
        Log.debug("SocialControls: rendered G+ share button");
    },

    // Renders an Email button or link (primarily intended for use on phones).
    // data.url - optional, the URL to share (defaults to current page)
    // data.text - optional, additional email body text to come before the URL in the email body
    // data.subject - optional, the email subject text
    // data.stat - optional, the StatClick name to stat when the user clicks the button
    renderEmailShare: function(elem, data) {
        var self = this,
            $elem = $(elem),
            dataDefaults = { url: location.href },
            data = $.extend(dataDefaults, data),
            params = {"body": data.url};

        if (data.text)
            params.body = data.text + "\n\n" + params.body;
        if (data.subject)
            params.subject = data.subject;
        var emailUrl = "mailto:?" + Url.joinQuery(params);

        // use the existing link element if it exists, otherwise add it
        var $emailLink = $elem.find(".email-link").first();
        if (!$emailLink.length)
            $emailLink = $('<a class="email-link" title="Share via email">Email</a>').appendTo($elem);

        $emailLink.attr({"href": emailUrl}).click( function(ev) {
            // The stat call might not always work, because of the race condition with the page navigation.
            // To try to increase its chances, delay the page navigation for an instant.
            self._statClick(data, "on");
            setTimeout( function() { location.href = emailUrl; }, 100 );
            return false;
        });
        Log.debug("SocialControls: rendered Email share button");
    },

    //// end static utilities

    _initControlsOfType: function(elems, renderMethodName) {
        var self = this;
        $(elems).each( function() {
            self[renderMethodName](this, self._getData(this));
        });
    },

    _getData: function(elem, defaults) {
        var $elem = $(elem),
            elemData = $elem.data(),
            shareData = $elem.closest(".social-controls").data();
        return $.extend( (defaults || {}), shareData, elemData );
    },

    _statClick: function(data, eventType) {
        var clickName = null;
        if (eventType == "on")
            clickName = data.stat || data.statOn;
        else if (eventType == "off")
            clickName = data.statOff;

        if (clickName)
            Stats.record({kind:"click", click: clickName});
    },

    _initedFBEvents: false,

    _registerFBEventHandlers: function() {
        // FB's edge events are global (not specific to an individual Like button), so we register event handlers once
        // for the entire page. Previously we added new event handlers for each Like button we rendered, but there
        // was no easy way to unsubscribe from the FB events when we destroyed/detached those controls.
        var self = this;
        if (!this._initedFBEvents) {
            FacebookUtils.initSDK().done( function() {
                FB.Event.subscribe('edge.create', $.proxy(self, "_handleFBEvent", "on"));
                FB.Event.subscribe('edge.remove', $.proxy(self, "_handleFBEvent", "off"));
            });
            this._initedFBEvents = true;
        }
    },

    // eventType: "on" or "off" (for Like or Unlike) -- supplied by us in $.proxy in _registerFBEventHandlers
    // href, widget: supplied by the FB edge event
    _handleFBEvent: function(eventType, href, widget) {
        var self = this;
        Log.debug("SocialControls: got Facebook event; eventType: " + eventType + "; href: " + href + "; widget: ", widget);

        if (!widget || !widget.dom || !widget.dom.tagName) {
            // The widget param is undocumented; I found it here: 
            // http://stackoverflow.com/questions/9083719/how-to-track-which-like-button-widget-triggered-event-subscribe-edge-create-call
            // It's the only means I could find to distinguish between two Like buttons with the same href.
            // If FB has changed/removed the widget param, better to do nothing than to stat incorrectly:
            Log.error("SocialControls: can't stat FB Like/Unlike because event parameter 'widget' is missing or has changed");
            return;  
        }

        var data = $(widget.dom).closest(".facebook-like-ctrl").data("scResolvedData");
        if (!data || (href != data.url))
            return;
        self._statClick(data, eventType);
    },

    xxx: null
};;
/* ------------- BEGIN footer.js --------------- */;
/* global MediaView, Url */

var Footer = {

    enhance: function() {
        this.initViewSwitcher( $("#pgFt .view-switcher") );
    },

    initViewSwitcher: function(elems) {
        var $elems = $(elems);

        // Transitional: in desktop mode, the view switcher ("switch to mobile view") is now shown by default. However,
        // for pages using old-style (client-side) phone detection, it won't work in desktop browsers. This is because
        // for those pages, we've never supported forcing the phone view in a desktop browser -- all we do is give the
        // client the possibility of phone view and let the browser width determine the mode. So we need to hide it in
        // that case. Unfortunately, without using server-side detection, we can't easily differentiate between desktop
        // mode on a phone vs. desktop mode on a desktop (in desktop mode we remove the viewport meta tag, so we can't
        // use the browser width to make a decision). Instead, we'll use an imperfect test and assume that if we're in
        // desktop mode with no cookie (or with a "p" cookie), we should hide the view switcher. This can be removed
        // once all mobilized pages are using the new, server-side phone detection scheme.  - sdg 2013.06.04
        if (MediaView.initType == "client" && MediaView.mode == "desktop" && Cookie.get("mvp") != "d") {
            $elems.filter(".desktop").hide();
        }

        $elems.on( "click", function () {
            var cookieVal = $(this).hasClass("phone") ? "d" : "p";
            Cookie.set( "mvp", cookieVal, (60*60*24*30*3) );

            // Mobile Safari wants to restore the scroll position and zoom level after a
            // location.reload(), so reloading from a zoomed-in desktop view to the phone view
            // would result in a zoomed-in phone view. Navigating to the current URL
            // with a parameter appended seems to overcome this behavior, even if the overall
            // URL isn't changing.  - sdg 2012.08.14
            // Note that the server now pulls this parameter off and issues a redirect without it (see aspect.rb). 
            //  - sdg 2012.10.08
            location.href = Url.addQueryParams( location.href, { ".reload": new Date().getTime() } );
            return false;
        } );
    },
    
    zzz: null
};

$(document).ready( $.proxy( Footer, "enhance" ) );;
/* ------------- BEGIN webapp_selector.js --------------- */;
/* exported WebappSelector */
var WebappSelector = (function () {
    'use strict';

    if (typeof $ !== "undefined") {
        $(document).ready( function() {
            WebappSelector.create_ui(window.siteroot, Identities.isAdmin());
        });
    }

    return {
        backendname: "unknown webapp",
        bc_cookie_set: false,
        siteroot: null,
        
        create_ui: function (siteroot, show_selector) {
            if ((show_selector || Cookie.get("bc_webapp")) && siteroot) {
                WebappSelector.siteroot = siteroot;
                var displaytext = WebappSelector.backendname;
                
                if (Cookie.get("bc_webapp")) {
                    WebappSelector.backendname = Cookie.get("bc_webapp");
                    WebappSelector.bc_cookie_set = true;
                    displaytext = WebappSelector.backendname + " (forced)";
                } else if(Cookie.get("BACKENDID")) {
                    WebappSelector.backendname = displaytext = Cookie.get("BACKENDID");
                }
                
                WebappSelector.refresh_ui( displaytext );
            }
            else {
                $("#pgFt").one( "dblclick", function(event) {
                    if (event.target.tagName != "A") {
                        WebappSelector.create_ui( siteroot, true );
                        return false;
                    }
                } );
                $("#pgFt").on( "touchend", function(event) {
                    var now = new Date().getTime();
                    var last = $(this).data( "lastTap" ) || 0;
                    if ( now - last < 500 ) {
                        $(this).off( "touchend" );
                        WebappSelector.create_ui( siteroot, true );
                        return false;
                    }
                    $(this).data( "lastTap", now );
                } );
            }
        },
        
        refresh_ui: function( text ) {
            var $link = $(".webapp-selector-link").off('click');

            var $nonMenubarLinks = $link.filter('.footer-extras .webapp-selector-link, .icon-social .webapp-selector-link, .webapp-selector-ui .webapp-selector-link');
            if (!$nonMenubarLinks.length) {
                var $nonMenubarLink = $('<a href="#" class="webapp-selector-link">').text(text);
                // desktop footer (classic style)
                $(".webapp-selector-ui").css("display", "inline-block").append($nonMenubarLink);
                // desktop footer (new corp style)
                $(".icon-social").append('<li>').append( $('<li class="headroom">').append($nonMenubarLink.clone(true)) );
                // phone footer
                $(".pgft-phone .footer-extras").removeClass("hidden").find("ul").append( $('<li>').append($nonMenubarLink.clone(true)) );

                $link = $(".webapp-selector-link");
            }
            $link.text(text);

            $link.on('click', function (ev) {
                WebappSelector.show_form(ev);
                return false;
            });
        },
        
        show_form: function() {
            var dlg;
            var buttons = [ Dialog.buttons.ok(WebappSelector.ok_button) ];
            if ( WebappSelector.bc_cookie_set )
                buttons.unshift( { text: "Default webapp", handler: WebappSelector.clear_cookie_button } );
            
            dlg = Dialog.open("Select webapp backend",
                '<select id="webappselectordialog.item" style="width:100%"></select>',
                buttons,
                "320px",
                {"postmethod": "none", "hideaftersubmit": true});
              
            WebappSelector.populate_machine_list();
        },

        populate_machine_list: function () {
            var machines = [];

            /* we hard-code the machine names for now -- fix this later */

            var serverSpecs = [
                {
                    appNumbers: [1, 7],
                    hostnameBase: 'bender',
                    hostnameRange: [1, 12]
                }
            ];
            Iter.each(serverSpecs, function (spec) {
                for (var i = spec.hostnameRange[0]; i <= spec.hostnameRange[1]; i++) {
                    var hostname = spec.hostnameBase + (i < 10 ? '0' + i : i);
                    Iter.each(spec.appNumbers, function (appNumber) {
                        machines.push(hostname + '-' + appNumber);
                    });
                }
            });
            
            var sel = elt('webappselectordialog.item');
            sel.innerHTML="";
            
            var opt;
            
            for(var i=0; i < machines.length; i++) {
                opt = document.createElement("option");
                opt.value = machines[i];
                opt.innerHTML = Text.escapeHtml(machines[i]);
                
                if(machines[i] == WebappSelector.backendname) {
                    opt.selected = true;
                }
                sel.appendChild(opt);
            }
        },
        
        cookie_domain: function() {
            var cookie_domain = window.location.hostname;
            if(window.location.hostname.indexOf(WebappSelector.get_siteroot()) > -1) {
                cookie_domain = WebappSelector.get_siteroot();
            }
            return cookie_domain;
        },
        
        ok_button: function() {
            var sel = elt('webappselectordialog.item');
            var selected_backend = sel.options[sel.selectedIndex].value;
            var cookie_domain = WebappSelector.cookie_domain();
            Cookie.set("bc_webapp",  selected_backend, null, "/", cookie_domain, false);
            WebappSelector.refresh_ui( "reloading..." );
            window.location.reload();
        },
        
        clear_cookie_button: function() {
            var cookie_domain = WebappSelector.cookie_domain();
            Cookie.clear("bc_webapp", "/", cookie_domain, false);
            WebappSelector.refresh_ui( "reloading..." );
            this.cancel();
            window.location.reload();
        },
        
        get_siteroot: function() {
            var siteroot = WebappSelector.siteroot;
            if(siteroot) {
                siteroot = siteroot.replace("http://", "").replace("https://", "");
                if(siteroot.indexOf(":") > -1) {
                    siteroot = siteroot.substr(0, siteroot.indexOf(":"));
                }
                return(siteroot);
            }
            return "";
        }
    };
})();
;
/* ------------- BEGIN nudialog.js --------------- */;
/* global Browser, MediaView */
/* exported NuDialog */

/*  This is a replacement for Dialog defined in utils.js, but not a direct drop-in replacement.  Some key differences:
    - buttons aren't passed as arguments, rather set them in the dialogOptions according to the jquery-ui dialog specifications.
    - likewise, dialog width isn't passed as an argument; set it in dialogOptions to override the default.
    - NuDialog.alert() escapes the message text by default. Use NuDialog.alertHTML() to do your own escaping and markup.
    - NuDialog.showTemplate() is like Dialog.openTemplate() but the title (optional) is defined in the dialogOptions hash instead.
    - Returns the jquery wrapper for the element containing the dialog. You can use $.fn.dialog() on it to customize/close/etc.

    jQueryUI dialog documentation: http://api.jqueryui.com/dialog/
*/ 
var NuDialog = (function () {
    'use strict';

    $(document).on('dialogclose', function() { $.event.trigger('bc_dialog_close'); });
    $(document).on('dialogopen', function() { $.event.trigger('bc_dialog_open'); });

    return {
        DEFAULT_OPTIONS: {
            dialogClass: 'nu-dialog',
            draggable: true,
            width: "35em",
            position: "center",
            modal: true,
            buttons: {
                "OK": function() {
                    $(this).dialog("close");
                }
            },
            close: function () {
                // By default we remove the dialog element from the DOM when it's closed.
                $(this).remove();
            },
            defaultFocus: function () {
                //call this if you don't want random things to have focus when the dlg opens
                var buttons = $("div.nu-dialog").find("button");
                if(buttons){
                    if(buttons.length == 1){
                        buttons.focus();
                    }
                    else {
                        var defaultButton = $("div.nu-dialog").find("button.default");
                        if(defaultButton && defaultButton.length == 1 ){
                            defaultButton.focus();
                        }
                    }
                } else {
                    $("div.nu-dialog").focus();
                }
            }
        },
        MOBILE_OPTIONS: {
            width: 300,
            draggable: false
        },

    	alert: function(title, message, dialogOptions, messageIsRawHTML) {
            var opts = dialogOptions || NuDialog.DEFAULT_OPTIONS;
    		dialogOptions = mergeOptions($.extend({
                title: title,
                open: function () {
                    if ( opts.defaultFocus ) {
                        opts.defaultFocus();
                    }
                }
            }, dialogOptions));
            return $('<div>')[messageIsRawHTML ? 'html' : 'text'](message).dialog(dialogOptions);
    	},

        alertHTML: function(title, messageHTML, dialogOptions) {
            return NuDialog.alert(title, messageHTML, dialogOptions, true);
        },
        
        // Presents an error generated by emit_json_exception in a dialog, and returns true if it was an error.
        // Intended to be a drop-in replacement for Trackpipe.showXHRError() for use with old-school _cb endpoints.
        // For all new code, we should be using API endpoints and the corresponding .showAPIError() instead.
        showXHRError: function (json) {
            if (window.isDebug) window.alert('FIXME: NuDialog.showXHRError is deprecated. Now code should use API endpoints and .showAPIError() instead.');

            if (json.error === true) {
                // Hacky handling for alerts
                var ax = json.exception && json.exception.indexOf("ALERT: "),
                    dialogParams = {};

                if (ax && ax >= 0) {
                    json.alert_text = json.exception.slice(ax + 7 /* length of "ALERT: " */);
                    dialogParams.title = "Note";
                } else {
                    json.browser = Browser;
                    dialogParams.title = "Error";
                }
                NuDialog.showTemplate('xhr_error_dialog', json, dialogParams);

                return true;
            }
            return false;
        },

        // Shows an error dialog when an API has an error raised as a plain RuntimeError.
        showAPIError: function (json) {
            if (json.error) {
                NuDialog.alert('API Error', json.error_message || 'Unknown error.');
                return true;
            }
            return false;
        },

        // Shows a boring dialog for xhr network failures.
        showNetworkError: function (xhr, status, error) {
            NuDialog.alert('Network Error', 'There was a network error. Please try again.\n(Status: ' + status + ')');
        },

        // Returns the jquery element housing the dialog in case you want to mess with it some more using $.fn.dialog()
        showTemplate: function(templateName, hash, dialogOptions) {
            dialogOptions = mergeOptions(dialogOptions || {});
            hash = hash || {};
            return $('<div>').renderLiquid(templateName, hash).dialog(dialogOptions);
        },

        /*  showViewModel is a convenient way to show a dialog based on a knockout view model.
            viewModel should define the following methods:
                templateName() - the name of the client-side liquid template to render.
                templateHash() - optional; a hash of variables to use during liquid rendering.
                dialogOptions() - optional; a hash of jqueryui dialog options to override DEFAULT_OPTIONS.
                $dialog(d) - optional; if defined, it'll be called with the dialog element before applying bindings.

            One advantage to using this over showTemplate() followed my manually calling ko.applyBindings() is that
            the initial dialog position will work correctly with the knockout-rendered elements in
            place; otherwise, you need to re-position the dialog after applying bindings by doing e.g.
            $dialog.dialog('option', 'position', 'center').  
        */
        showViewModel: function(viewModel) {
            var template = viewModel.templateName(),
                hash = ('function' === typeof viewModel.templateHash) ? viewModel.templateHash() : {},
                dialogOptions = ('function' === typeof viewModel.dialogOptions) ? viewModel.dialogOptions() : {},
                $dialog = $('<div>').renderLiquid(template, hash);
            if ('function' === typeof viewModel.$dialog) {
                viewModel.$dialog($dialog);
            }
            ko.applyBindings(viewModel, $dialog[0]);
            dialogOptions = mergeOptions(dialogOptions);
            $dialog.dialog(dialogOptions);
            return $dialog;
        }

    };

    function mergeOptions(options) {
        var classOverride = {};
        if ('string' === typeof options.dialogClass) {
            classOverride.dialogClass = NuDialog.DEFAULT_OPTIONS.dialogClass + ' ' + options.dialogClass;
        }
        else if ($.isArray(options.dialogClass)) {
            classOverride.dialogClass = NuDialog.DEFAULT_OPTIONS + ' ' + options.dialogClass.join(' ');
        }
        var merged = $.extend({}, NuDialog.DEFAULT_OPTIONS);
        if (MediaView.mode === 'phone') {
            $.extend(merged, NuDialog.MOBILE_OPTIONS);
        }
        $.extend(merged, options, classOverride);
        return merged;
    }
})();
;
/* ------------- BEGIN tpl_global_templates --------------- */;
if (Templ) { Templ.register({
"xhr_error_dialog" : ["<div id=\"xhr-error-dialog\">\r\n    ",{"blocks":[{"attachment":["\r\n    <p>\r\n        ",{"filters":[["h",[]]],"name":"alert_text","type":"variable"},"\r\n    </p>\r\n    "],"expression":"alert_text ","type":"ncondition"},{"attachment":["\r\n    <h4>We regret to inform you that something odd happened.</h4>\r\n    \r\n    <p>\r\n        Please excuse the error.\r\n        ",{"blocks":[{"attachment":["\r\n            Artists: please  \r\n            <a href=\"/contact?subj=",{"filters":[["u",[]],["a",[]]],"name":"error_type","type":"variable"},"&amp;msg=",{"filters":[["a",[]]],"name":"error_for_email","type":"variable"},"\">click here</a> to let us know about the error. We'll get right on it.\r\n        "],"expression":"member_of_current_band ","type":"ncondition"}],"type":"ef"},"\r\n    </p>\r\n    \r\n    <div class=\"dlg_errorInfo\">\r\n    Some interesting stuff (to us):\r\n    <ul>\r\n        <li>url: ",{"filters":[["h",[]]],"name":"url","type":"variable"},"</li>\r\n        <li>error: ",{"filters":[["h",[]]],"name":"exception","type":"variable"},"</li>\r\n        <li>browser: ",{"filters":[["h",[]]],"name":"browser.make","type":"variable"}," ",{"filters":[["join",["'.'"]],["h",[]]],"name":"browser.version","type":"variable"}," ",{"filters":[["h",[]]],"name":"browser.platform","type":"variable"},"</li>\r\n        <li>date: ",{"filters":[["h",[]]],"name":"date","type":"variable"},"</li>\r\n        ",{"blocks":[{"attachment":["\r\n        <li>user: ",{"filters":[["h",[]]],"name":"user","type":"variable"},"</li>\r\n        "],"expression":"user ","type":"ncondition"}],"type":"ef"},"\r\n        <li>host: ",{"filters":[["h",[]]],"name":"host","type":"variable"},"</li>\r\n    </div>\r\n    "],"type":"else_ncondition"}],"type":"ef"},"\r\n</div>"]
}); };
/* ------------- BEGIN contact.js --------------- */;
/* global TemplGlobals, MediaView, Url,  FacebookUtils, Form, Dialog, Templ, Recaptcha */

// Hijack Bandcamp contact links 
$(document).ready(function(ev) {
    "use strict";
    
    var match_long_url = new RegExp(TemplGlobals.siteroot + "/contact");
    $("a[href*='contact']").each(function() {
        var current_url = $(this).attr('href');

        // we don't want to clobber links to contact pages on other (eg, band) websites, so match carefully
        if (current_url.match(match_long_url) || current_url.match(/^\/contact/)) {
            $(this).click(function(ev) {
                ev.preventDefault();
                var dr = new RegExp(TemplGlobals.sitedomain);
                var is_custom_domain = window.location.host.match(dr) === null;

                if (MediaView.mode == "phone" || is_custom_domain || Browser.make == "ie") {
                    // The modal form is not a nice experience on mobile,
                    // we can't use ReCaptcha on custom domains, 
                    // and we also can't use ReCaptcha in a modal in IE (Google's special-case IE code isn't very flexible),
                    // so in these cases we pop a form (on bandcamp.com) instead.

                    // presence of "p" lets the controller know contact page was (p)opped via another page, not visited directly
                    current_url = Url.addQueryParams(current_url, {p: location.href});
                    window.open(current_url); 
                } else {
                    var q = Url.toHash(current_url).search;
                    var params = Url.parseQuery(q);
                    var fields = Contact.message_defaults(params);
                    Contact.show_form_dlg(fields, ev);
                }
            });
        }
    });
});

var RecaptchaWrapper = {
    _sdkLoadPromise: null,
    _gapi: new $.Deferred(),
    _widget_id: null,

    // Loads the Google ReCaptcha API, returning a jquery Promise object. Because the api.js bootstrap loads its own
    // dependencies, there's a bit of spaghetti. Ultimtely, however, the contact form code only has to concern
    // itself with the promise returned by this function
    initSDK: function() {
        if (RecaptchaWrapper._sdkLoadPromise) {
            return RecaptchaWrapper._sdkLoadPromise;
        }

        var gbootstrap = $.cachedScript("https://www.google.com/recaptcha/api.js?onload=gcaptchaDependencyOnload&render=explicit")
            .done(function(){Log.debug("ReCaptcha bootstrap loaded");});
        return RecaptchaWrapper._sdkLoadPromise = $.when(gbootstrap, RecaptchaWrapper._gapi);
    },

    resolve_gapi_deferred: function() {
        Log.debug("ReCaptcha API loaded");
        RecaptchaWrapper._gapi.resolve();
    },

    public_key: function() {
        var pagedata = $("#pagedata").data("blob");
        return pagedata && pagedata.recaptcha_public_key;
    },

    is_rendered: function() {
        return (typeof($("#are-you-human iframe").attr("id")) !== 'undefined');
    },

    render: function() {
        if (RecaptchaWrapper.is_rendered()) {
            Log.debug("resetting");
            RecaptchaWrapper.reset();
        } else {
            RecaptchaWrapper._widget_id = grecaptcha.render("are-you-human",
                {
                    sitekey: RecaptchaWrapper.public_key(),
                    theme: "white",
                    callback: function() {
                        Log.debug("Valid ReCaptcha response");
                        Form.validate.clear_alert($("#contact\\.captcha_alert"));
                    }
                }
            );
        }
        Contact.enable_the_buttons();
    },

    reset: function() {
        grecaptcha.reset(RecaptchaWrapper._widget_id);
    },

    fail: function() {
        //note: we leave the form buttons disabled
        Form.validate.show_alerts({field: "contact.captcha", reason: "recaptcha-not-reachable"});
    },

    safe_destroy: function() {
        if (!Contact.use_recaptcha()) { return; };
        /*
        The noCaptcha ReCaptcha API lacks the .destroy() method of its predecessor, and isn't 
        otherwise equipped to deal with captchas being destroyed & remade within the same page. 
        In order to flush out stale stuff in the grecaptcha object & do away with crusty event 
        handlers we have to obliterate the contingent additional iframe & reset the captcha 
        BEFORE the parent elements (read: the contact form dialog) are removed.

        It's hacky, but it prevents gnarly (if silent) protocol mismatch errors from
        being thrown if the contact form is closed after interacting with the captcha.
        */
        $(".pls-container").remove();   // perilously unscoped, but works for x-domain iframe content...
        RecaptchaWrapper.reset();
    },

    xxx: null
};

var gcaptchaDependencyOnload = function() {
    RecaptchaWrapper.resolve_gapi_deferred();
};

var Contact = {
    
    // used by older pages (eg, /yum) to pop form
    show_form: function(params, ev) {
        var fields = Contact.message_defaults(params);

        var dr = new RegExp(TemplGlobals.sitedomain);
        var is_custom_domain = window.location.host.match(dr) === null;
        
        if (MediaView.mode == "phone" || is_custom_domain) {
            // presence of "p" lets the controller know contact page was (p)opped via another page, not visited directly
            fields["p"] = location.href; 
            var current_url = "/contact?" + Url.joinQuery(fields);
            window.open(current_url);
        } else {
            Contact.show_form_dlg(fields, ev);
        }
    },
    
    validation: {
        sections: {
            contact: {prefix: 'contact'}
        },
        messages: {  // UISTRING
            "contact.generic": {
                generic: "Sorry, there was an unexpected problem. Please try that again.",
                badBand: "Sorry, there was an unexpected problem. Please refresh the page and try again." // conditionally modified in case of stand-alone page
            },
            "contact.name": {
                missingValue: "please enter your name"
            },
            "contact.email": {
                missingValue: "please enter your email address",
                badFormat:    "that's not a valid email address",
                noFacebook:   "sorry, Facebook addresses are not supported.<br/>please enter a different email address."
            },
            "contact.message": {
                missingValue: "please enter your missive",
                stringLength: "that message is too long"
            },
            "contact.fan_urls": {
                missingValue: "please provide your Fan Page URL",
                badFormat:    "hmm, this Fan Page URL doesn't look right...",
                badFormats:   "hmm, not all of these Fan Page URLs look right..."
            },
            "contact.codes": {
                missingValue: "please provide your track/album code",
                badFormat:    "hmm, this doesn't look like a Bandcamp track/album code...",
                badFormats:   "hmm, not all of these track/album codes look right..."
            },
            "contact.fb_urls": {
                missingValue: "please provide your Facebook Page URL",
                badFormat:    "hmm, this Facebook Page URL doesn't look right...",
                badFormats:   "hmm, not all of these Facebook Page URLs look right..."
            },
            "contact.band_urls": {
                missingValue: "please provide your Bandcamp URL",
                badFormat:    "hmm, this Bandcamp URL doesn't look right...",
                badFormats:   "hmm, not all of these Bandcamp URLs look right..."
            },
            "contact.dls": {
                missingValue: "please provide your download link",
                badFormat:    "hmm, this download link doesn't look right...",
                badFormats:   "hmm, not all of these download links look right..."
                
            },
            "contact.preorders": {
                missingValue: "please provide a link to the album's page",
                badFormat:    "hmm, this album link doesn't look right...",
                badFormats:   "hmm, not all of these album links look right..."  
            },
            "contact.original_email": {
                missingValue: "please enter the email address currently linked to the account",
                badFormat:    "that's not a valid email address"
            },
            "contact.signup_date": {
                missingValue: "please enter the date you think you signed up"
            },
            "contact.captcha": {
                "incorrect-captcha-sol": "please try again",
                "captcha-timeout": "please try again",
                "recaptcha-not-reachable": "apologies — human detection service unavailable, please try again later",
                "malformed-api-response": "apologies — human detection service malfunctioning, please try again later",
                "invalid-request-cookie": "please try again",
                "missing-response": "please fill out the captcha"
            }
        }
    },
    
    /* If a specific key is present in the given subject's hash, we request & validate
       the corresponding additional bit of info in the contact form */
       
    // To pre-populate a field, set the corresponding key in Contact.subjects before opening the form.
    
    subjects: {
        "Help setting up my Facebook app": {
            band_urls: "",  
            fb_urls: ""
        },
        "Help! I can't log in!": {
            band_urls: "",
            original_email: "",
            signup_date: ""
        },
        "Expired download": {
            dls: ""
        },
        "Download code trouble": {
            codes: ""
        },
        "Help with my Fan Account": {
            fan_urls: ""
        },
        "Pre-order link not received": {
            preorders: ""
        },
        "Fulfillment Inquiry": {
            band_urls: ""
        },
        "Payment setup trouble": {
            band_urls: ""
        }
    },

    message_defaults: function(params) {
        var t;
        var band_id = (t = params["b"]) && (t = parseInt(t)) ? t : 1;

        return {
            subj: params["subj"] || "",
            msg:  params["msg"] || "",
            band_id: band_id,
            band_name: params["n"] || "Bandcamp",
            from_url: params["p"] || encodeURIComponent(location.href)
        };
    },
    
    populate_support_topic: function() {
        var subj = Contact.fields["subj"];
        if (subj in Contact.subjects) {
            $.extend(Contact.fields, Contact.subjects[subj]);
        }
        
        // Get the most recent support banner, if there is one
        if (Contact.fields["band_id"] == 1) {
            Contact.check_for_banner();
            if (Contact.banner_msg) {
                Contact.fields["banner_msg"] = Contact.banner_msg;
            }
        }
    },
    
    check_for_banner: function() {
        $.ajax({
            type: "POST",
            url: "/contact_banner_cb",
            dataType: "json",
            async: false,
            success: function(res) { 
                if (res.contact_banner_msg) {
                    Contact.banner_msg = res.contact_banner_msg;
                } else {
                    delete Contact.banner_msg;
                }
            },
            error: function(res) {
                Log.info("check_for_banner failed: " + res.status);
            }
        })
    },
    
    show_form_page: function(fields, popped_open, return_url) {
        Contact.fields = fields;
        Contact.populate_support_topic();
        Contact.fields["use_captcha"] = Contact.use_recaptcha();
        Contact.popped_open = popped_open;
        Contact.return_url = return_url;
        
        if (popped_open && Contact.fields["band_id"] != 1) {
            Contact.validation.messages["contact.generic"]["badBand"] = "Sorry, there was an unexpected problem. Please return to the artist\'s page and try again.";
        }
        
        Templ.renderElem("contact-form", "contact_form", Contact.fields);
        
        $("#contact\\.cancel").click(Contact.cancel_button);
        Form.init("contactForm", null, null, Contact.validation, function(ev) {Contact.submit_button(ev)});
        Contact.setup_recaptcha();
        Contact.make_stretchy_textareas();
    },

    show_form_dlg: function(fields, ev) {
        Contact.fields = fields;
    
        if (window.FacebookData) {
            var patchYui = false;
            FacebookUtils.correctSrollThen(patchYui, Contact, Contact.show_form_inner, ev);
        } else {
            this.show_form_inner(ev);
        }
    },
    
    show_form_inner: function(ev) {
        var dlg_width = window.FacebookData ? "450px" : "615px";    // conditional used to be {{facebook_app_page}}
        Contact.populate_support_topic();
        Contact.fields["use_captcha"] = Contact.use_recaptcha();


        // This is how to put a form inside of an alert
        dlg_options = {
            close: false,
            postmethod: "none",
            hideaftersubmit: false
        }

        var dlg = Dialog.openTemplate("Contact " + Contact.fields["band_name"], "contact_form", Contact.fields, [], dlg_width, dlg_options);
        
        $("#contact\\.cancel").click(function(ev) {Contact.cancel_button(ev, dlg);});
        Form.init("contactForm", null, null, Contact.validation, function(ev) {Contact.submit_button(ev, dlg);} );
        
        Contact.setup_recaptcha();
        Contact.make_stretchy_textareas();
        
        dlg.destroyEvent.subscribe( function() {
                Form.detach();
            });
        ev.stopPropagation();
        return dlg;
    },

    use_recaptcha: function() {
        if (Contact.fields["band_id"] != 1 && RecaptchaWrapper.public_key()) {
            return true;
        } else {
            return false;
        }
    },

    setup_recaptcha: function() {
        if (Contact.use_recaptcha()) {
            Contact.disable_the_buttons();
            RecaptchaWrapper.initSDK().then(RecaptchaWrapper.render, RecaptchaWrapper.fail);
        }
    },

    submit_button: function(ev, dlg) {
        $.Event(ev).preventDefault();
        Contact.disable_the_buttons();

         Crumb.ajax({
            type: 'POST',
            url: "/contact_cb",
            data: $("#contactForm").serialize(),
            dataType: "json",
            success:  function(res, code, req) {
                Contact.success(res, code, req, dlg);
            },
            error: function(res, code, error) {
                Contact.failure(res, code, error);
            }
        });
    },

    success: function(response, code, req, dlg) {
        if (response.errors || response.error) {
            Contact.enable_the_buttons();
            if (response.errors) {
                /* See note about extra_challenge_params in setup_recaptcha ^
                // look for, and handle, a captcha error
                for(var i=0; i < response.errors.length; i++) {
                    if (response.errors[i].field == "contact.captcha") {
                        captchaError = response.errors[i].reason;
                        response.errors.splice(i, 1);
                        break;
                    }
                } */
                Form.validate.show_alerts(response.errors);
            } else {
                Dialog.alert("Oops!", Contact.validation.messages["contact.generic"].generic);
            }
            RecaptchaWrapper.safe_destroy();
            Contact.setup_recaptcha();
        } else {
            if (dlg) {
                RecaptchaWrapper.safe_destroy();
                dlg.destroy();
                if ( !window.FacebookData ) {
                    Dialog.alert("Contact " + Contact.fields["band_name"], "Thanks, your message has been sent!");
                }
            } else if (Contact.popped_open) {
                window.close();
            } else {
                var url = Contact.return_url || TemplGlobals.siteroot;
                $("#contact-form").replaceWith("<h1>Thanks, your message has been sent!<br/><a href=" + url + ">Return to Bandcamp</a></h1>");
            }
    	}
    },

    failure: function(res, code, error) {
        Contact.enable_the_buttons();
        Form.validate.show_alerts({field: "contact.generic", reason: "generic"});
        Log.info("contact callback failure: status: " + res.status + "; statusText: " + error);
    },

    cancel_button: function(ev, dlg) {
        ev.stopPropagation();
        if (dlg) {
            RecaptchaWrapper.safe_destroy();
	        dlg.destroy();
        } else if (Contact.popped_open) {
            window.close();
        } else {
            var url = Contact.return_url || TemplGlobals.siteroot;
            window.location = url;
        }
    },

    disable_the_buttons: function() {
        $("#contact\\.send").addClass("disabled");
        $("#contact\\.send").prop("disabled", true);
        $("#contact\\.send").text = "Sending...";
        $("#contact\\.cancel").addClass("disabled");
        $("#contact\\.cancel").prop("disabled", true);
    },

    enable_the_buttons: function() {
        $("#contact\\.send").removeClass("disabled");
        $("#contact\\.send").prop("disabled", false);
        $("#contact\\.send").text = "Send";
        $("#contact\\.cancel").removeClass("disabled");
        $("#contact\\.cancel").prop("disabled", false);
    },
    
    make_stretchy_textareas: function() {
        $('#contactForm textarea').each(function () {
            addExpandEventListeners(this);

            var maxInactiveHeight = 52;     // when not in focus, textareas are at most x pixels tall
            if (this.name == "contact.message") {
                maxInactiveHeight = 170;    // except message body box, which remains larger
            }
            addShrinkEventListeners(this, maxInactiveHeight);
        });
    },
    
    zzz: null    
};
;
/* ------------- BEGIN tpl_contact --------------- */;
if (Templ) { Templ.register({
"contact_form" : ["<form id=\"contactForm\" action=\"/no_js\" method=\"post\" accept-charset=\"utf-8\">\n    \n    ",{"blocks":[{"attachment":["\n    <div id=\"contact.banner\">",{"filters":[["h",[]]],"name":"banner_msg","type":"variable"},"</div>\n    "],"expression":"banner_msg ","type":"ncondition"}],"type":"ef"},"\n\n    <input type=\"hidden\" name=\"contact.band_id\" value=\"",{"filters":[["a",[]]],"name":"band_id","type":"variable"},"\"/>\n    <input type=\"hidden\" name=\"contact.from_url\" value=\"",{"filters":[["a",[]]],"name":"from_url","type":"variable"},"\"/>\n\n    <div id=\"contact.generic\" class=\"alert\"></div>\n\n    <dl class=\"tableLayout\">\n        <dt>your name</dt>\n        <dd>\n            <input type=\"text\" class=\"textInput\" id=\"contact.name\" name=\"contact.name\" value=\"",{"filters":[["a",[]]],"name":"name","type":"variable"},"\"/>\n            <p id=\"contact.name_alert\" class=\"alert\"></p>\n        </dd>\n        <dt>email</dt>\n        <dd>\n            <input type=\"text\" class=\"textInput\" id=\"contact.email\" name=\"contact.email\" value=\"",{"filters":[["a",[]]],"name":"email","type":"variable"},"\"/>\n            <p id=\"contact.email_alert\" class=\"alert\"></p>\n        </dd>\n        <dt>subject</dt>\n        <dd>\n            <input type=\"text\" class=\"textInput\" id=\"contact.subject\" name=\"contact.subject\" value=\"",{"filters":[["a",[]]],"name":"subj","type":"variable"},"\"/>\n            <p id=\"contact.subject_alert\" class=\"alert\"></p>\n        </dd>\n        <dt>message</dt>\n        <dd>\n            <textarea rows=\"10\" class=\"textInput\" id=\"contact.message\" name=\"contact.message\">",{"filters":[["h",[]]],"name":"msg","type":"variable"},"</textarea>\n            <p id=\"contact.message_alert\" class=\"alert\"></p>\n        </dd>\n        ",{"blocks":[{"attachment":["\n        <dt>Fan Account URL</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.fan_urls\" name=\"contact.fan_urls\">",{"filters":[["h",[]]],"name":"fan_urls","type":"variable"},"</textarea>\n            <p id=\"contact.fan_urls_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"fan_urls","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n        <dt>download code</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.codes\" name=\"contact.codes\" >",{"filters":[["h",[]]],"name":"codes","type":"variable"},"</textarea>\n            <p id=\"contact.codes_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"codes","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n        <dt>facebook URLs</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.fb_urls\" name=\"contact.fb_urls\">",{"filters":[["h",[]]],"name":"fb_urls","type":"variable"},"</textarea>\n            <p id=\"contact.fb_urls_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"fb_urls","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n        <dt>band URLs</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.band_url\" name=\"contact.band_urls\">",{"filters":[["h",[]]],"name":"band_urls","type":"variable"},"</textarea>\n            <p id=\"contact.band_urls_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"band_urls","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n        <dt>current login email</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.original_email\" name=\"contact.original_email\">",{"filters":[["h",[]]],"name":"original_email","type":"variable"},"</textarea>\n            <p id=\"contact.orginal_email_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"original_email","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n        <dt>approximate signup date</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.signup_date\" name=\"contact.signup_date\">",{"filters":[["h",[]]],"name":"signup_date","type":"variable"},"</textarea>\n            <p id=\"contact.signup_date_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"signup_date","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n        <dt>download links</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.dls\" name=\"contact.dls\">",{"filters":[["h",[]]],"name":"dls","type":"variable"},"</textarea>\n            <p id=\"contact.dls_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"dls","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n        <dt>album page</dt>\n        <dd>\n            <textarea rows=\"2\" class=\"textInput\" id=\"contact.preorders\" name=\"contact.preorders\">",{"filters":[["h",[]]],"name":"preorders","type":"variable"},"</textarea>\n            <p id=\"contact.preorder_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"preorders","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n\n        ",{"blocks":[{"attachment":["\n        <dt>be human</dt>\n        <dd>\n            <div id=\"are-you-human\"></div>\n            <p id=\"contact.captcha_alert\" class=\"alert\"></p>\n        </dd>\n        "],"child_condition":null,"child_relation":null,"left":"use_captcha","operator":null,"right":null,"type":"condition"}],"type":"if"},"\n        \n        <div id=\"contact.support_alert\" class=\"alert\"></div>\n\n        <dt></dt>\n        <dd style=\"padding-top:1ex\">\n            <button type=\"submit\" name=\"contact.send\" value=\"OK\" id=\"contact.send\"><div id=\"contact.send.text\">Send</div></button>\n            <button type=\"button\" name=\"contact.cancel\" value=\"Cancel\" id=\"contact.cancel\"><div>Cancel</div></button>\n        </dd>\n    </dl>\n\n</form>\n"]
}); };
/* ------------- BEGIN val_all --------------- */;
Validators={"Account":{"paypal_email":{"max":100,"req":true,"type":"text"},"state":{"max":1,"type":"text"}},"Album":{"_tags":{"clientproc":"Tags.validate_tralbum_tags"},"about":{"type":"text"},"artist":{"max":100,"type":"text"},"audit":{"max":4294967295,"min":0,"type":"int"},"auto_repriced":{"type":"date"},"credits":{"type":"text"},"minimum_price":{"max":250000.0,"min":0.0,"type":"float"},"minimum_price_nonzero":{"type":"float"},"mod_date":{"type":"date"},"new_date":{"type":"date"},"price":{"max":250000.0,"min":0.0,"type":"float"},"publish_date":{"type":"date"},"purchase_title":{"max":200,"type":"text"},"purchase_url":{"implicit_type":"url","match":"(^)(\\()?(http://|https://)(([^@\\./\\s\\/'\"><&]+)(\\.[^@\\./\\s\\/'\"><&]+)*(\\.(?:local|root|abogado|ac|academy|accountants|active|actor|ad|adult|ae|aero|af|ag|agency|ai|airforce|al|allfinanz|alsace|am|amsterdam|an|android|ao|aq|aquarelle|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba|band|bank|bar|barclaycard|barclays|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bmw|bn|bnpparibas|bo|boo|boutique|br|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh|ca|cab|cal|camera|camp|cancerresearch|capetown|capital|caravan|cards|care|career|careers|cartier|casa|cash|cat|catering|cc|cd|center|ceo|cern|cf|cg|ch|channel|cheap|christmas|chrome|church|ci|citic|city|ck|cl|claims|cleaning|click|clinic|clothing|club|cm|cn|co|coach|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|credit|creditcard|cricket|crs|cruises|cu|cuisinella|cv|cw|cx|cy|cymru|cz|dabur|dad|dance|dating|day|dclk|de|deals|degree|delivery|democrat|dental|dentist|desi|design|dev|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|docs|domains|doosan|durban|dvag|dz|eat|ec|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|equipment|er|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|fail|farm|fashion|feedback|fi|finance|financial|firmdale|fish|fishing|fit|fitness|fj|fk|flights|florist|flowers|flsmidth|fly|fm|fo|foo|forsale|foundation|fr|frl|frogans|fund|furniture|futbol|ga|gal|gallery|garden|gb|gbiz|gd|ge|gent|gf|gg|ggee|gh|gi|gift|gifts|gives|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|goog|google|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|hangout|haus|healthcare|help|here|hermes|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|hosting|house|how|hr|ht|hu|ibm|id|ie|ifm|il|im|immo|immobilien|in|industries|info|ing|ink|institute|insure|int|international|investments|io|iq|ir|irish|is|it|iwc|jcb|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|kddi|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kyoto|kz|la|lacaixa|land|lat|latrobe|lawyer|lb|lc|lds|lease|legal|lgbt|li|lidl|life|lighting|limited|limo|link|lk|loans|london|lotte|lotto|lr|ls|lt|ltda|lu|luxe|luxury|lv|ly|ma|madrid|maison|management|mango|market|marketing|marriott|mc|md|me|media|meet|melbourne|meme|memorial|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda|moe|monash|money|mormon|mortgage|moscow|motorcycles|mov|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|navy|nc|ne|net|network|neustar|new|nexus|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra|nrw|nu|nyc|nz|okinawa|om|one|ong|onl|ooo|org|organic|osaka|otsuka|ovh|pa|paris|partners|parts|party|pe|pf|pg|ph|pharmacy|photo|photography|photos|physio|pics|pictures|pink|pizza|pk|pl|place|plumbing|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property|ps|pt|pub|pw|py|qa|qpon|quebec|re|realtor|recipes|red|rehab|reise|reisen|reit|ren|rentals|repair|report|republican|rest|restaurant|reviews|rich|rio|rip|ro|rocks|rodeo|rs|rsvp|ru|ruhr|rw|ryukyu|sa|saarland|sale|samsung|sarl|sb|sc|sca|scb|schmidt|schule|schwarz|science|scot|sd|se|services|sew|sexy|sg|sh|shiksha|shoes|shriram|si|singles|sj|sk|sky|sl|sm|sn|so|social|software|sohu|solar|solutions|soy|space|spiegel|sr|st|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy|sydney|systems|sz|taipei|tatar|tattoo|tax|tc|td|technology|tel|temasek|tf|tg|th|tienda|tips|tires|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|town|toys|tp|tr|trade|training|travel|trust|tt|tui|tv|tw|tz|ua|ug|uk|university|uno|uol|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|video|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wales|wang|watch|webcam|website|wed|wedding|wf|whoswho|wien|wiki|williamhill|wme|work|works|world|ws|wtc|wtf|xxx|xyz|yachts|yandex|ye|yoga|yokohama|youtube|yt|za|zip|zm|zone|zuerich|zw)))(/[^?\\s]*?)?(\\?[^#\\s]*?)?(#[^\\s]*?)?(\\))?($)","max":200,"message":"Invalid URL.","type":"text"},"release_date":{"type":"date"},"set_price":{"max":250000.0,"min":0.01,"type":"float"},"tags":{"clientproc":"Tags.validate_tralbum_tags"},"title":{"max":300,"req":true,"type":"text"},"upc":{"max":13,"type":"upc"}},"AreaTag":{"alt":{"max":256,"type":"text"},"coords":{"max":256,"type":"text"},"href":{"max":1028,"type":"text"},"shape":{"max":32,"type":"text"},"target":{"max":256,"type":"text"},"title":{"max":256,"type":"text"}},"Art":{"new_date":{"type":"date"}},"BCWeeklyShow":{"button_color":{"max":6,"type":"text"},"date":{"type":"date"},"desc":{"type":"text"},"image_caption":{"type":"text"},"mod_date":{"type":"date"},"published_date":{"type":"date"},"subtitle":{"type":"text"},"title":{"type":"text"}},"Band":{"activation_date":{"type":"date"},"auto_repriced":{"type":"date"},"bio":{"max":400,"type":"text"},"cache_date":{"type":"date"},"create_date":{"type":"date"},"currency":{"max":3,"type":"text"},"custom_domain":{"match":"^[a-z0-9][a-z0-9\\-]*(\\.[a-z0-9\\-]+){1,7}$","max":100,"type":"text"},"custom_domain_create":{"type":"date"},"custom_domain_last_check":{"type":"date"},"disabled_date":{"type":"date"},"fan_email":{"match":"(^)([^\\s\\(\\)\"'/><,@]+@\\w([^\\s\\(\\)\"'/><&,@]*\\w)?\\.\\w[^\\s\\(\\)\"'/><&,@]*\\w)($)","max":100,"message":"Invalid email address.","req":true,"type":"text"},"free_dl_ct":{"max":4294967295,"min":0,"type":"int"},"free_dl_limit":{"max":4294967295,"min":0,"type":"int"},"goods_country":{"max":2,"type":"text"},"goods_return_policy":{"type":"text"},"goods_shipping_info":{"type":"text"},"goods_state":{"max":2,"type":"text"},"goods_tax_rate":{"max":75,"min":0.0,"type":"float"},"home_page":{"max":1,"type":"text"},"last_mailing_list_export":{"type":"date"},"last_sales_export":{"type":"date"},"license_pref":{"max":65535,"min":0,"type":"int"},"name":{"max":100,"req":true,"type":"text"},"paypal_email":{"match":"(^)([^\\s\\(\\)\"'/><,@]+@\\w([^\\s\\(\\)\"'/><&,@]*\\w)?\\.\\w[^\\s\\(\\)\"'/><&,@]*\\w)($)","max":100,"message":"Invalid email address.","type":"text"},"promo_limit":{"max":4294967295,"min":0,"type":"int"},"subdomain":{"match":"^[a-z\\d][a-z\\d\\-]{2,}[a-z\\d]$","max":63,"min":4,"type":"text"},"website_url":{"max":100,"type":"text"}},"BandLocation":{},"BandNavbar":{},"BandSite":{"url":{"implicit_type":"url","match":"(^)(\\()?(http://|https://)(([^@\\./\\s\\/'\"><&]+)(\\.[^@\\./\\s\\/'\"><&]+)*(\\.(?:local|root|abogado|ac|academy|accountants|active|actor|ad|adult|ae|aero|af|ag|agency|ai|airforce|al|allfinanz|alsace|am|amsterdam|an|android|ao|aq|aquarelle|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba|band|bank|bar|barclaycard|barclays|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bmw|bn|bnpparibas|bo|boo|boutique|br|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh|ca|cab|cal|camera|camp|cancerresearch|capetown|capital|caravan|cards|care|career|careers|cartier|casa|cash|cat|catering|cc|cd|center|ceo|cern|cf|cg|ch|channel|cheap|christmas|chrome|church|ci|citic|city|ck|cl|claims|cleaning|click|clinic|clothing|club|cm|cn|co|coach|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|credit|creditcard|cricket|crs|cruises|cu|cuisinella|cv|cw|cx|cy|cymru|cz|dabur|dad|dance|dating|day|dclk|de|deals|degree|delivery|democrat|dental|dentist|desi|design|dev|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|docs|domains|doosan|durban|dvag|dz|eat|ec|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|equipment|er|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|fail|farm|fashion|feedback|fi|finance|financial|firmdale|fish|fishing|fit|fitness|fj|fk|flights|florist|flowers|flsmidth|fly|fm|fo|foo|forsale|foundation|fr|frl|frogans|fund|furniture|futbol|ga|gal|gallery|garden|gb|gbiz|gd|ge|gent|gf|gg|ggee|gh|gi|gift|gifts|gives|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|goog|google|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|hangout|haus|healthcare|help|here|hermes|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|hosting|house|how|hr|ht|hu|ibm|id|ie|ifm|il|im|immo|immobilien|in|industries|info|ing|ink|institute|insure|int|international|investments|io|iq|ir|irish|is|it|iwc|jcb|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|kddi|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kyoto|kz|la|lacaixa|land|lat|latrobe|lawyer|lb|lc|lds|lease|legal|lgbt|li|lidl|life|lighting|limited|limo|link|lk|loans|london|lotte|lotto|lr|ls|lt|ltda|lu|luxe|luxury|lv|ly|ma|madrid|maison|management|mango|market|marketing|marriott|mc|md|me|media|meet|melbourne|meme|memorial|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda|moe|monash|money|mormon|mortgage|moscow|motorcycles|mov|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|navy|nc|ne|net|network|neustar|new|nexus|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra|nrw|nu|nyc|nz|okinawa|om|one|ong|onl|ooo|org|organic|osaka|otsuka|ovh|pa|paris|partners|parts|party|pe|pf|pg|ph|pharmacy|photo|photography|photos|physio|pics|pictures|pink|pizza|pk|pl|place|plumbing|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property|ps|pt|pub|pw|py|qa|qpon|quebec|re|realtor|recipes|red|rehab|reise|reisen|reit|ren|rentals|repair|report|republican|rest|restaurant|reviews|rich|rio|rip|ro|rocks|rodeo|rs|rsvp|ru|ruhr|rw|ryukyu|sa|saarland|sale|samsung|sarl|sb|sc|sca|scb|schmidt|schule|schwarz|science|scot|sd|se|services|sew|sexy|sg|sh|shiksha|shoes|shriram|si|singles|sj|sk|sky|sl|sm|sn|so|social|software|sohu|solar|solutions|soy|space|spiegel|sr|st|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy|sydney|systems|sz|taipei|tatar|tattoo|tax|tc|td|technology|tel|temasek|tf|tg|th|tienda|tips|tires|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|town|toys|tp|tr|trade|training|travel|trust|tt|tui|tv|tw|tz|ua|ug|uk|university|uno|uol|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|video|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wales|wang|watch|webcam|website|wed|wedding|wf|whoswho|wien|wiki|williamhill|wme|work|works|world|ws|wtc|wtf|xxx|xyz|yachts|yandex|ye|yoga|yokohama|youtube|yt|za|zip|zm|zone|zuerich|zw)))(/[^?\\s]*?)?(\\?[^#\\s]*?)?(#[^\\s]*?)?(\\))?($)","message":"Invalid URL."}},"BandSocialPref":{"thanks_text":{"type":"text"}},"BlogUnit":{"date":{"type":"date"},"description":{"type":"text"},"mod_date":{"type":"date"},"published_date":{"type":"date"},"title":{"max":300,"type":"text"},"url":{"max":300,"type":"text"}},"CustomHeader":{"url":{"max":100,"type":"text"}},"Design":{"bg_color":{"match":"^[0-9A-F]{6,6}$","max":6,"type":"text"},"bg_file_name":{"max":200,"type":"text"},"body_color":{"match":"^[0-9A-F]{6,6}$","max":6,"type":"text"},"hd_ft_color":{"match":"^[0-9A-F]{6,6}$","max":6,"type":"text"},"link_color":{"match":"^[0-9A-F]{6,6}$","max":6,"type":"text"},"navbar_bg_color":{"match":"^[0-9A-F]{6,6}$","max":6,"type":"text"},"secondary_text_color":{"match":"^[0-9A-F]{6,6}$","max":6,"type":"text"},"text_color":{"match":"^[0-9A-F]{6,6}$","max":6,"type":"text"}},"DiscographyOrder":{"item_type":{"max":1,"req":true,"type":"text"},"order_number":{"max":65535,"min":0,"req":true,"type":"int"}},"DiscountCode":{"expire_date":{"type":"date"},"item_type":{"match":"^[pat]$","max":1,"type":"text"},"name":{"match":"^[a-z0-9_@#&\\*]+$","max":25,"req":true,"type":"text"},"new_date":{"req":true,"type":"date"},"percent":{"max":99,"min":1,"req":true,"type":"int"}},"DownloadDesc":{"hash":{"max":32,"min":32,"req":true,"type":"text"},"text":{"type":"text"}},"EmailAuth":{"address":{"match":"(^)([^\\s\\(\\)\"'/><,@]+@\\w([^\\s\\(\\)\"'/><&,@]*\\w)?\\.\\w[^\\s\\(\\)\"'/><&,@]*\\w)($)","max":100,"message":"Invalid email address.","req":true,"type":"text"},"country":{"max":100,"req":true,"type":"text"},"date_added":{"type":"date"},"postalcode":{"max":32,"req":true,"type":"text"}},"Encodings":{"aac_hi_file_size":{"max":4294967295,"min":0,"type":"int"},"aac_lo_file_size":{"max":4294967295,"min":0,"type":"int"},"aiff_lossless_file_size":{"max":4294967295,"min":0,"type":"int"},"alac_file_size":{"max":4294967295,"min":0,"type":"int"},"duration":{"type":"float"},"err_type":{"max":1,"type":"text"},"error":{"max":2147483647,"min":-2147483648,"type":"int"},"error_format":{"max":2147483647,"min":-2147483648,"type":"int"},"flac_file_size":{"max":4294967295,"min":0,"type":"int"},"mp3_128_file_size":{"max":4294967295,"min":0,"type":"int"},"mp3_320_file_size":{"max":4294967295,"min":0,"type":"int"},"mp3_v0_file_size":{"max":4294967295,"min":0,"type":"int"},"mp3_v2_file_size":{"max":4294967295,"min":0,"type":"int"},"new_date":{"type":"date"},"opus_lo_file_size":{"max":4294967295,"min":0,"type":"int"},"original_file_size":{"max":4294967295,"min":0,"type":"int"},"original_name":{"max":200,"type":"text"},"scrub_revision":{"max":32767,"min":-32768,"type":"int"},"scrubbed_flac_file_size":{"max":4294967295,"min":0,"type":"int"},"state":{"max":32767,"min":-32768,"type":"int"},"vorbis_file_size":{"max":4294967295,"min":0,"type":"int"},"vorbis_lo_file_size":{"max":4294967295,"min":0,"type":"int"},"wav_file_size":{"max":4294967295,"min":0,"type":"int"},"wav_lossless_file_size":{"max":4294967295,"min":0,"type":"int"}},"FacebookAppPref":{"fan_page_name":{"type":"text"},"mod_date":{"req":true,"type":"date"},"new_date":{"type":"date"}},"Fan":{"bio":{"max":400,"type":"text"},"name":{"max":60,"type":"text"},"website_url":{"max":60,"type":"text"}},"FanEmail":{"address":{"max":100,"type":"text"},"countrycode":{"max":2,"type":"text"},"date_added":{"type":"date"},"date_unsubscribed":{"type":"date"},"firstname":{"max":40,"type":"text"},"lastname":{"max":40,"type":"text"},"num_purchases":{"max":4294967295,"min":0,"type":"int"},"postalcode":{"max":32,"type":"text"}},"FanUnsubscribe":{"fan_email":{"max":100,"type":"text"}},"Fan_signup":{"password":{"min":3,"req":true,"type":"text"},"paypal_email":{"max":100,"req":true,"type":"text"},"username":{"max":60,"min":3,"req":true,"type":"text"}},"FeaturedAlbum":{"continue_html":{"type":"text"},"heading":{"type":"text"},"intro_html":{"type":"text"},"mod_date":{"type":"date"},"more_url":{"max":200,"type":"text"},"title":{"max":200,"type":"text"}},"FeaturedFan":{"bio":{"type":"text"},"date":{"type":"date"},"mod_date":{"type":"date"},"published_date":{"type":"date"}},"FeaturedFanItem":{"comment":{"type":"text"},"item_type":{"max":1,"type":"text"},"sequence":{"max":4294967295,"min":0,"type":"int"}},"GoogleAnalytics":{"mod_date":{"req":true,"type":"date"},"new_date":{"type":"date"}},"HomePageStats":{"album_count":{"max":4294967295,"min":0,"req":true,"type":"int"},"charity_album_1":{"max":4294967295,"min":0,"type":"int"},"date":{"req":true,"type":"date"},"downloads_count_all_time":{"max":4294967295,"min":0,"req":true,"type":"int"},"revenue_30d":{"max":4294967295,"min":0,"req":true,"type":"int"},"revenue_total":{"max":4294967295,"min":0,"type":"int"},"sales_count_all_time":{"max":4294967295,"min":0,"req":true,"type":"int"},"top_album_1":{"max":4294967295,"min":0,"type":"int"},"top_album_10":{"max":4294967295,"min":0,"type":"int"},"top_album_11":{"max":4294967295,"min":0,"type":"int"},"top_album_12":{"max":4294967295,"min":0,"type":"int"},"top_album_13":{"max":4294967295,"min":0,"type":"int"},"top_album_14":{"max":4294967295,"min":0,"type":"int"},"top_album_15":{"max":4294967295,"min":0,"type":"int"},"top_album_16":{"max":4294967295,"min":0,"type":"int"},"top_album_17":{"max":4294967295,"min":0,"type":"int"},"top_album_18":{"max":4294967295,"min":0,"type":"int"},"top_album_19":{"max":4294967295,"min":0,"type":"int"},"top_album_2":{"max":4294967295,"min":0,"type":"int"},"top_album_20":{"max":4294967295,"min":0,"type":"int"},"top_album_3":{"max":4294967295,"min":0,"type":"int"},"top_album_4":{"max":4294967295,"min":0,"type":"int"},"top_album_5":{"max":4294967295,"min":0,"type":"int"},"top_album_6":{"max":4294967295,"min":0,"type":"int"},"top_album_7":{"max":4294967295,"min":0,"type":"int"},"top_album_8":{"max":4294967295,"min":0,"type":"int"},"top_album_9":{"max":4294967295,"min":0,"type":"int"},"track_count":{"max":4294967295,"min":0,"req":true,"type":"int"}},"ImageMap":{},"Invitation":{"date_accepted":{"type":"date"},"date_recipient_revoked":{"type":"date"},"date_sender_revoked":{"type":"date"},"date_sent":{"req":true,"type":"date"},"emailed_to":{"max":100,"req":true,"type":"text"}},"Ipn":{"payload":{"type":"text"},"start_date":{"req":true,"type":"date"},"state":{"max":1,"type":"text"},"transaction_type":{"max":1,"type":"text"}},"Location":{"geo_precision":{"max":32767,"min":-32768,"type":"int"},"latitude":{"type":"float"},"longitude":{"type":"float"},"population":{"max":4294967295,"min":0,"type":"int"},"source_text":{"max":200,"type":"text"}},"NotableTralbum":{"date":{"type":"date"},"desc":{"type":"text"},"mod_date":{"type":"date"},"published_date":{"type":"date"},"tralbum_type":{"max":1,"type":"text"}},"Package":{"audit":{"max":4294967295,"min":0,"type":"int"},"description":{"type":"text"},"download_type":{"max":1,"type":"text"},"fulfillment_days":{"max":99,"min":1,"type":"int"},"grid_index":{"max":65535,"min":0,"type":"int"},"min_price":{"max":250000.0,"min":0.01,"type":"float"},"mod_date":{"type":"date"},"new_date":{"type":"date"},"options_title":{"max":50,"type":"text"},"price":{"max":250000.0,"min":0.01,"req":true,"type":"float"},"quantity":{"max":1000000,"min":0,"type":"int"},"quantity_adjusted":{"max":1000000,"min":0,"type":"int"},"release_date":{"type":"date"},"set_price":{"max":250000.0,"min":0.01,"type":"float"},"shipping_intl":{"max":250000.0,"min":0.0,"req":true,"type":"float"},"shipping_intl_incremental":{"max":250000.0,"min":0.0,"req":true,"type":"float"},"shipping_local":{"max":250000.0,"min":0.0,"req":true,"type":"float"},"shipping_local_incremental":{"max":250000.0,"min":0.0,"req":true,"type":"float"},"shipping_regional":{"max":250000.0,"min":0.0,"req":true,"type":"float"},"shipping_regional_incremental":{"max":250000.0,"min":0.0,"req":true,"type":"float"},"sku":{"max":20,"type":"text"},"title":{"max":200,"req":true,"type":"text"}},"PackageArt":{"file_name":{"max":200,"type":"text"},"height":{"max":4294967295,"min":0,"type":"int"},"index":{"max":65535,"min":0,"type":"int"},"size":{"max":4294967295,"min":0,"type":"int"},"width":{"max":4294967295,"min":0,"type":"int"}},"PackageOption":{"index":{"max":65535,"min":0,"type":"int"},"quantity":{"max":1000000,"min":0,"type":"int"},"sku":{"max":20,"type":"text"},"title":{"max":50,"req":true,"type":"text"}},"PasswordReset":{"create_date":{"type":"date"},"ip_address":{"max":100,"type":"text"},"token":{"max":60,"type":"text"}},"Payment":{"access_expires_date":{"type":"date"},"auth_type":{"max":20,"type":"text"},"buyer_type":{"max":1,"type":"text"},"create_date":{"type":"date"},"download_successes":{"max":65535,"min":0,"type":"int"},"download_trials":{"max":65535,"min":0,"type":"int"},"ip_address":{"max":4294967295,"min":0,"type":"int"},"purchase_subtype":{"max":20,"type":"text"}},"PaypalAuth":{"band_receipt_date":{"type":"date"},"checkout_date":{"type":"date"},"currency":{"max":3,"type":"text"},"currency_rate":{"type":"float"},"email_date":{"type":"date"},"fan_receipt_date":{"type":"date"},"fee_amt":{"type":"float"},"ip_address":{"max":39,"type":"text"},"item_credit":{"max":100,"type":"text"},"item_desc":{"max":127,"type":"text"},"item_detail":{"max":50,"type":"text"},"item_name":{"max":127,"type":"text"},"item_price":{"type":"float"},"item_title":{"max":300,"type":"text"},"item_title2":{"max":300,"type":"text"},"order_total":{"type":"float"},"payer_business":{"max":127,"type":"text"},"payer_countrycode":{"max":2,"type":"text"},"payer_firstname":{"max":40,"type":"text"},"payer_lastname":{"max":40,"type":"text"},"payer_note":{"max":255,"type":"text"},"payer_paypal_email":{"max":127,"type":"text"},"payer_paypal_status":{"max":10,"type":"text"},"payer_shiptocity":{"max":60,"type":"text"},"payer_shiptocountrycode":{"max":2,"type":"text"},"payer_shiptocountryname":{"max":60,"type":"text"},"payer_shiptoname":{"max":60,"type":"text"},"payer_shiptophonenum":{"max":30,"type":"text"},"payer_shiptostate":{"max":60,"type":"text"},"payer_shiptostreet":{"max":150,"type":"text"},"payer_shiptostreet2":{"max":150,"type":"text"},"payer_shiptozip":{"max":20,"type":"text"},"payment_date":{"type":"date"},"paypal_api_version":{"max":8,"type":"text"},"paypal_build":{"max":12,"type":"text"},"paypal_error_code":{"max":12,"type":"text"},"paypal_payment_date":{"type":"date"},"paypal_payment_type":{"max":7,"type":"text"},"paypal_pending_completed_date":{"type":"date"},"paypal_pending_reason":{"max":1,"type":"text"},"paypal_token":{"max":20,"type":"text"},"quantity":{"max":2147483647,"min":-2147483648,"type":"int"},"release_receipt_date":{"type":"date"},"seller_paypal_email":{"max":127,"type":"text"},"share":{"max":4294967295,"min":0,"type":"int"},"share_balance":{"max":2147483647,"min":-2147483648,"type":"int"},"ship_date":{"type":"date"},"ship_notes":{"type":"text"},"shipping":{"type":"float"},"sub_total":{"type":"float"},"tax":{"type":"float"},"usd_total":{"type":"float"}},"Promo":{"count":{"max":4294967295,"min":0,"req":true,"type":"int"},"create_date":{"req":true,"type":"date"},"item_type":{"max":20,"req":true,"type":"text"},"name":{"max":200,"req":true,"type":"text"},"promo_num":{"max":4294967295,"min":0,"req":true,"type":"int"},"seed":{"max":4294967295,"min":0,"req":true,"type":"int"}},"Recommendation":{"create_date":{"req":true,"type":"date"},"item_type":{"max":1,"req":true,"type":"text"},"score":{"max":4294967295,"min":0,"type":"int"},"why":{"max":200,"req":true,"type":"text"}},"RecommendationPref":{"headline":{"max":100,"req":true,"type":"text"},"mod_date":{"req":true,"type":"date"}},"SalesTax":{"date":{"req":true,"type":"date"},"rate":{"max":10,"req":true,"type":"text"},"zip":{"max":5,"req":true,"type":"text"}},"Slug":{"base_text":{"max":195,"type":"text"},"create_date":{"type":"date"},"item_type":{"max":1,"type":"text"},"lifetime":{"max":4294967295,"min":0,"type":"int"},"text":{"max":200,"req":true,"type":"text"},"unique_hash":{"max":32,"req":true,"type":"text"}},"Tag":{"name":{"max":32,"type":"text"},"norm_name":{"max":32,"type":"text"},"synonym_of":{"max":4294967295,"min":0,"type":"int"}},"TagBlurb":{"info_url":{"max":4096,"type":"text"},"text":{"type":"text"}},"TaggedItem":{"item_type":{"max":32767,"min":-32768,"type":"int"}},"TosAgreement":{"description":{"type":"text"},"effective_date":{"type":"date"}},"Track":{"_tags":{"clientproc":"Tags.validate_tralbum_tags"},"about":{"type":"text"},"artist":{"max":100,"type":"text"},"audit":{"max":4294967295,"min":0,"type":"int"},"auto_repriced":{"type":"date"},"credits":{"type":"text"},"file_name":{"max":200,"type":"text"},"isrc":{"country_codes":["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","MS","MA","MZ","MM","NA","NR","NP","NL","AN","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","SH","KN","LC","PM","VC","WS","SM","ST","SA","SN","RS","CS","SC","SL","SG","SK","SI","SB","SO","ZA","GS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","UK","GB","US","UM","UY","UZ","VU","VE","VN","VG","VI","WF","EH","YE","ZM","ZW","AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","FM","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","ME","MD","MH","MI","MN","MO","MP","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VI","VT","VA","WA","WI","WV","WY","AB","BC","MB","NB","NL","NT","NS","NU","ON","PE","QC","SK","YT","AG","BC","BS","CH","CL","CM","CO","CS","DF","DG","GR","GT","HG","JA","MI","MO","NA","NL","OA","PU","QR","QT","SI","SL","SO","TB","TL","TM","VE","YU","ZA"],"max":12,"type":"isrc"},"license_type":{"max":65535,"min":0,"type":"int"},"lyrics":{"type":"text"},"minimum_price":{"max":250000.0,"min":0.0,"type":"float"},"minimum_price_nonzero":{"type":"float"},"mod_date":{"type":"date"},"new_date":{"type":"date"},"price":{"max":250000.0,"min":0.0,"type":"float"},"publish_date":{"type":"date"},"release_date":{"type":"date"},"set_price":{"max":250000.0,"min":0.01,"type":"float"},"tags":{"clientproc":"Tags.validate_tralbum_tags"},"title":{"max":300,"req":true,"type":"text"},"track_number":{"max":65535,"min":0,"type":"int"}},"User":{"admin_level":{"max":32767,"min":-32768,"type":"int"},"create_date":{"type":"date"},"disabled_date":{"type":"date"},"email":{"match":"(^)([^\\s\\(\\)\"'/><,@]+@\\w([^\\s\\(\\)\"'/><&,@]*\\w)?\\.\\w[^\\s\\(\\)\"'/><&,@]*\\w)($)","max":100,"message":"Invalid email address.","req":true,"type":"text"},"group_type":{"max":20,"type":"text"},"ip_address":{"max":100,"type":"text"},"last_login_date":{"type":"date"},"name":{"max":60,"req":true,"type":"text"},"tos_accepted_date":{"type":"date"}},"change_password":{"new_password":{"min":3,"req":true,"type":"text"},"old_password":{"min":3,"req":true,"type":"text"}},"confirm_accept_tos":{"confirm_accept_tos":{"req":true}},"contact":{"email":{"match":"(^)([^\\s\\(\\)\"'/><,@]+@\\w([^\\s\\(\\)\"'/><&,@]*\\w)?\\.\\w[^\\s\\(\\)\"'/><&,@]*\\w)($)","message":"Invalid email address.","req":true},"message":{"max":1999,"min":1,"req":true,"type":"text"},"name":{"req":true},"subject":{"max":300,"type":"text"}},"fan_link_paypal_email":{"paypal_email":{"max":100,"req":true,"type":"text"}},"forgot_password":{"name":{"req":true}},"login":{"password":{"min":3,"req":true,"type":"text"}},"paypal_email_address":{"paypal_email":{"match":"(^)([^\\s\\(\\)\"'/><,@]+@\\w([^\\s\\(\\)\"'/><&,@]*\\w)?\\.\\w[^\\s\\(\\)\"'/><&,@]*\\w)($)","message":"Invalid email address."}},"pick_subdomain":{"subdomain":{"match":"^[a-z\\d][a-z\\d\\-]{2,}[a-z\\d]$","min":4,"req":true,"type":"text"}},"profile_custom_domain_test":{"custom_domain":{"match":"^[a-z0-9][a-z0-9\\-]*(\\.[a-z0-9\\-]+){1,7}$","req":true}},"report":{"email":{"match":"(^)([^\\s\\(\\)\"'/><,@]+@\\w([^\\s\\(\\)\"'/><&,@]*\\w)?\\.\\w[^\\s\\(\\)\"'/><&,@]*\\w)($)","message":"Invalid email address.","req":true},"message":{"max":1999,"min":1,"req":true,"type":"text"},"name":{"req":true},"subject":{"max":300,"type":"text"}},"signup":{"password":{"min":3,"req":true,"type":"text"},"tos":{"req":true}},"user":{"name":{"req":true}}};;
_jsb[_jsb.length-1].c=1;