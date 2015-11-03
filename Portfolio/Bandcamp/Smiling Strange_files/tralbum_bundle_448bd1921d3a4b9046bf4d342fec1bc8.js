/* concatenation of: share.js, share2.js, expando.js, peekaboo_list.js, shows.js, discography.js, tralbum_fixup_mobile.js, peekaboo_text.js, share_tralbum_phone.js, autolyrics.js, albumpage.js, api.js, tralbum_updater.js, inventory_updater.js, tralbumish.js, artists_page.js, tpl_label_band_selector, band_selector.js, grid_band_selector.js, cart.js, please_wait_panel.js, download_panel_vm.js, gift_panel_vm.js, download_panel.js, geo.js, tralbum_login.js, gift_panel.js, currency_codes.js, tpl_cart, fan_tralbum.js, collected_by.js, tpl_fan_tralbum, tpl_share_tralbum_phone, video_element_wrapper.js, video.js, crossframe.js, limits.js, owner_streaming.js */
var _jsb=(_jsb||[]);_jsb.push({n:"tralbum_bundle"});
/* ------------- BEGIN share.js --------------- */;
// EmbedCode:
// manage options for an embed code and handle the details of
// generating the hash to be passed to the embed code template
//
// given that we no longer do 1) direct SWF embeds, or 2) myspace variants, this EmbedCode
// business is way more complicated than it needs to be.  My next pass on this code is going
// to be to cut it down to a simple args hash.

var EmbedCode = LangUtils.makeclass({
    ctor : function(embeddata) {
        this._size = "venti";
        this._isdemo = false;
        this._scriptAccess = "never";
        this._embedData = embeddata;
        this._customLayout = null;
        this._customWidth = null;
        this._customHeight = null;
        this._variant = "other";
        this._vis = null;
    },
    prototype : {
        colors : {
            bgcolor : "#FFFFFF",
            linkcolor : "#0687f5"
        },
        getParams : function() {
            if(!this._embedData) {
                throw "you must set embed_info before you can get the embed code hash";
            }

            var result = {
                variant: this._variant,
                url : this._embedData.swf_base_url + "/EmbeddedPlayer",
                urlbase : this._embedData.swf_base_url,
                params : [
                    { name : "quality", value : "high" },
                    { name : "allowNetworking", value : "always" },
                    { name : "wmode", value : "transparent" }
                ],
                url_args : [
                ]
            };

            if(this._forceflash) {
                result.url += ".swf";
            }

            var scriptaccess = "never";
            var isAlbum = this._embedData.tralbum_param.name == "album";

            result.url_args.push(this._embedData.tralbum_param);
            var embed_data_params = [
                "tralbum_param", "art_id", "linkback", "title", "artist", "album_title"
            ];
            for(var i=0; i<embed_data_params.length; i++) {
                result[embed_data_params[i]] = this._embedData[embed_data_params[i]];
            }

            if(this._customLayout) {
                var layouturl = EmbedCode.encodeLayoutURL(this._customLayout);
                EmbedCode.pushParam(result, "url_args", "layout", layouturl);
                result.layout = layouturl;
                result.width = this._customWidth;
                result.height = this._customHeight;
            } else {
                if(this._customWidth && this._customHeight) {
                    result.width = this._customWidth;
                    result.height = this._customHeight;
                    result.include_dimensions = true;
                } else {
                    var dims = EmbedCode.getDims(this._size, isAlbum, this._variant);
                    if(!dims) {
                        throw "failed to find layout: " + this._size + '/' + this._variant;
                    }
                    result.width = dims.w;
                    result.height = dims.h;
                }

                result.size = this._size;
                EmbedCode.pushParam(result, "url_args", "size", this._size);
            }

            // the colors are used in various forms for different
            // portions of the embed(s).  Some places want it in
            // #-prefixed form, some want it without, and some want
            // it as a CSS rgb(x,y,z) value, so provide it all those
            // ways here rather than force the liquid to do the string
            // manipulation
                
            var bgcolor = this.colors.bgcolor.replace(/^#/, "");
            var linkcolor = this.colors.linkcolor.replace(/^#/, "");
            result.bgcolor = bgcolor;
            result.bgcolor_css = EmbedCode._hex_to_rgb(bgcolor);
            EmbedCode.pushParam(result, "params", "bgcolor", "#" + bgcolor);
            EmbedCode.pushParam(result, "url_args", "bgcol", bgcolor);

            result.linkcolor = linkcolor;
            result.linkcolor_css = EmbedCode._hex_to_rgb(linkcolor);
            EmbedCode.pushParam(result, "url_args", "linkcol", linkcolor);


            if(this._isDemo) {
                if(this._variant == "wordpress") {
                    result.variant = "other"
                }
                result.classname = "bcembed" + Math.round(Math.random()*10000);
                result.doproxy = true;
                scriptaccess = "always";

                // add "debug" flag to cause cache-busting of layouts
                EmbedCode.pushParam(result, "url_args", "debug", "true");
            }

            if(this._vis) {
                EmbedCode.pushParam(result, "url_args", "vis", this._vis);
            }

            if(this._transparent) {
                EmbedCode.pushParam(result, "url_args", "transparent", "true");
            }

            if(this._size == "biggie") {
                if(this._notracklist) {
                    result.notracklist = "true";
                    EmbedCode.pushParam(result, "url_args", "notracklist", "true");
                }
    
                if(this._packageid) {
                    result.package = this._packageid;
                    EmbedCode.pushParam(result, "url_args", "package", this._packageid);
                }
            }

            EmbedCode.pushParam(result, "params", "allowScriptAccess", scriptaccess);

            return result;
        },
        getEmbed : function(isDemo) {
            // as a convenience, allow isDemo to be
            // specified on getEmbed, since it is flipped
            // back and forth so frequently.  this is
            // implemented by saving and restoring the old value
            var oldDemoValue = this._isDemo;
            this._isDemo = isDemo;

            try
            {
                var params = this.getParams();
                var result = Templ.render('_embedded_player', params);
            } catch(e) {
                throw e;
            } finally {
                this._isDemo = oldDemoValue;
            }

            return result;
        },
        setEmbedData : function(ed) {
            this._embedData = ed;
        },
        setSize : function(s) {
            //validate size?
            this._customHeight = null;
            this._customWidth = null;
            this._customLayout = null;

            this._size = s;

        },
        getSize : function() {
            return this._size;
        },
        setVariant : function(v) {
            this._variant = v;
        },
        getVariant : function() {
            return this._variant;
        },
        setDims : function(w, h) {
            this._customHeight = h;
            this._customWidth = w;
        },
        getDims : function() {
            var result = { width: this._customWidth, height: this._customHeight };
    
            if(!(result.width && result.height)) {
                var isAlbum = this._embedData.tralbum_param.name == "album";
                var dims = EmbedCode.getDims(this._size, isAlbum, this._variant);
                if(!dims) {
                    throw "failed to find layout: " + this._size + '/' + this._variant;
                }
                result.width = dims.w;
                result.height = dims.h;
            }
            return result;
        },
        setPackage : function(pkgid) {
            this._packageid = pkgid;
        },
        getPackage : function() {
            return this._packageid;
        },
        setCustomLayout : function(url, h, w) {
            //assert(url && url.length > "http://".length, "invalid custom layout url");
            //assert(h > 0 && w > 0, "custom layout must have valid width and height");
            this._customHeight = h;
            this._customWidth = w;
            this._customLayout = url;

            this._size = null;
        },
        getCustomParams : function() {
            if(this._customLayout) {
                return {
                    layout : this._customLayout,
                    width : this._customWidth,
                    height : this._customHeight
                };
            }
            return null;
        },
        setTransparent : function(isTransparent) {
            this._transparent = isTransparent;
        },
        setVis : function(v) {
            // validate viz?
            this._vis = v;
        },
        setOptions : function(opts) {
            for(var x in opts) {
                Log.debug("EmbedCode option: " + x);
                switch(x) {
                    case "forceFlash":
                        this._forceflash = opts[x];
                        break;
                    case "size":
                        this.setSize(opts[x]);
                        break;
                    case "isDemo":
                        this._isDemo = true;
                        break;
                    case "notracklist":
                        this._notracklist = opts[x];
                        break;
                    case "vis":
                        this.setVis(opts[x]);
                        break;
                }
            }
        },
        getOption : function(name) {
            switch(name) {
                case "notracklist":
                    return this._notracklist;
                    break;
            }
        }
    },
    statics : {
        getDims : function(size,isAlbum,variant) {
            var dims = {
                normal : {
                    venti : { w : 400, h : 100 },
                    grande : { w : 300, h : 100 },
                    grande2 : { w : 300, h : 355 },
                    grande3 : { w : 300, h : 410 },
                    tall : { w : 150, h : isAlbum ? 295 : 270 },
                    tall2 : { w : 150, h : 450 },
                    short : { w : 46, h : 23 }
                },
                core : {
                    venti : { w : 287, h : 30 },
                    grande : { w : isAlbum ? 297 : 197, h : 30 },
                    tall : { w : 150, h : isAlbum ? 78 : 56 },
                    short : { w : 23, h : 23 }
                }
            };

            return dims["normal"][size];
        },
        pushParam : function(hash, paramtype, name, value) {
            if(!hash[paramtype]) {
                hash[paramtype] = [];
            }
            hash[paramtype].push( { name : name, value : value });
        },
        // er.  MySpace converts CSS color specifications in hex "#hhhhhh"
        // format to just "hhhhhh" (dropping the '#'), so we'll specify them
        // as "rgb(n,n,n)" format.  This routine does the conversion.
        _hex_to_rgb : function(color) {
            match = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(color);
            if(match)
            {
                return "rgb(" + Number("0x" + match[1])
                + "," + Number("0x" + match[2])
                + "," + Number("0x" + match[3]) + ")";
            }
    
            // not sure what else to do here; we need a color
            return "rgb(255,255,255)";
        },
        encodeLayoutURL : function(url) {
            // slightly beyond url-escaping:
            // make sure all '/' and '_' characters are %-encoded,
            // then replace all '%' with '_'.  This ensures flash
            // will not decode our %2F-encoded slashes and choke on
            // them, and decoding is simple: replace '_' with '%' and
            // use the standard unescape()
            return escape(url).replace(/\//g, "%2F").replace(/_/g, "%5F").replace(/%/g, "_");
        }
    }
});

var Share = {
    _shareDialog : null,
    _shareFromEmbedDialog : null,
    _biggieSizePresets : { small : 350, medium: 500, large: 700 },

    embedcode : new EmbedCode(),


    showFromEmbed : function() {
        if(CfgShare2) {
            Share.panelAsDialog();
        } else {
            Share.embedcode.setEmbedData(EmbedData);
            var isTrack = (EmbedData.tralbum_param.name == "track");
            Share._shareFromEmbedDialog = Share._createDialog("Share", "_share_from_embed", {is_track : isTrack, permalink : EmbedData.linkback}, [Dialog.buttons.ok(), Dialog.buttons.cancel()], "26em");
        }
    },

    showFromEmbedCleanup : function() {
        if(Share._shareFromEmbedDialog) {
            Share._shareFromEmbedDialog.cancel();
            Share._shareFromEmbedDialog = null;
        }
    },

    showDialog : function( isTrack, permalink, variant, skipStats ) {
        // this may only be called from a page which is initializing
        // the player/playlist.  If the playlist (gplaylist) is not
        // available, we'll setTimeout until it is.
        if(!gplaylist && variant != "email")
        {
            if(FlashProxy.error)
            {
                FlashProxy.noFlashError("share");
                return;
            }
            else
            {
                setTimeout(Share.showDialog, 0);
                return;
            }
        }

        Share.embedcode.setEmbedData(EmbedData);
        Share.embedcode.setVariant(variant);
        var params = { permalink: permalink, siteroot : EmbedData.swf_base_url, variant: variant, is_track: isTrack };
        if (!skipStats)
            Stats.share_menu_click(variant);

        //UISTRING:
        var dlg = Share._createDialog((variant == "email")?"Share":"Share / Embed", "_share", params, [Dialog.buttons.ok()], (variant == "email")?"445px":"850px");
        
        // code box has different id's in the normal vs "email" cases
        $("#embedcode,#permalink").click(function(event) {
                $(event.target).focus().select();
            });

        if(variant != "email") {

            Share.embedcode.setSize("venti");
            Share.embedcode.setOptions( { forceFlash: false } );

            var size = Share.embedcode.getSize();
            if(size) elt("sharePlayerSize_" + size).checked = true;

            var colorelems = {
                "bgcolor" : "bgColorSwatch",
                "linkcolor" : "linkColorSwatch"
            };

            var customParams = Share.embedcode.getCustomParams();
            if(customParams) {
                if(!Share._canBeCustom(variant)) {
                    Share.embedcode.setSize("venti");
                } else {
                    Share.showSection("custom");
                    elt("layouturl").value = customParams.layout;
                    elt("customwidth").value = customParams.width;
                    elt("customheight").value = customParams.height;
                }
            }

            for(var x in colorelems)
                Share._hookupColorSwatch(x, colorelems[x]);
			
            Share._updateControls();
            elt("embedcode").value = Share.embedcode.getEmbed(false);
            elt("embedded_player_sample").innerHTML = Share.embedcode.getEmbed(true);
        }
        else{
            // copy-ready text in the permalink
            embedelt.focus();
            embedelt.select();
        }

        Share._addMerch(TralbumData.packages);
    },

    _createDialog : function(title, template, hash, buttons, width) {
        var delem = $('<div>');
        var dialogparams = {
            draggable: false,
            height: "630",
            position: { my: "top+5", at: "top", of: window },
            modal: true
        };
        if(width) dialogparams.width = width;
        var d = delem.dialog(dialogparams);

        d.html(Templ.render(template, hash));

        delem.on("click", Share._handleClick);

        d.on("dialogclose", function() {
                Share._cleanupPicker();
                delem.remove();
            });

        $("#layouturl,#customwidth,#customheight").on("change", Share._handleCustomUpdated)
        $("#transparent").on("change", Share._handleTransparentChanged);
        $("input[name=standard-shortcode]").on("change", Share._handleShortcodeTypeChanged);

        $("#sizePicker").on("change", Share._handleDimensionPickerChanged);
        $("#showTracklist").on("change", Share._handleShowTracklistChanged);

        if(false && width) {
            delem.css("width", width);
        }
        
        return d;
    },


    _updateControls : function() {
        var variant = Share.embedcode.getVariant();
        var size = Share.embedcode.getSize();

        var showColorOptions = true;
        var showHeight = true;
        var showSizePicker = false;

        switch(size) {
            case "short":
                showColorOptions = false;
                break;
            case "biggie":
                showColorOptions = false;
                showHeight = $("#showTracklist").attr("checked") == "checked";
                showSizePicker = true;
                Share._updateSizePicker();
                break;
            case "artonly":
                showColorOptions = false;
                showHeight = false;
                showSizePicker = true;
                Share._updateSizePicker();
                break;
        }

        $("#colorOptions").css("visibility", showColorOptions ? "visible" : "hidden"); 
        $("#playerHeightLabel").css("visibility", showHeight ? "visible" : "hidden"); 
        $("#playerHeightLabel").css("visibility", showHeight ? "visible" : "hidden"); 
        $("#sizePickerLabel").css("visibility", showSizePicker ? "visible" : "hidden");

        var hidebiggieopts = size != "biggie";
        if(hidebiggieopts != Share._biggie_opts_hidden) {
            Share._biggie_opts_hidden = hidebiggieopts;

            var biggieopts = $("#showTracklistLabel,#merchLabel");
            if(!hidebiggieopts) {
                biggieopts.animate({
                    height: 'show'
                }, 400, function() {
                    biggieopts.css("visibility", "visible");
                });
            } else {
                biggieopts.css("visibility", "hidden");
                biggieopts.animate({
                    height: 'hide'
                }, 400);
            }
        }
    },
    _updateSizePicker : function() {
        $("#sizePicker option").each(function(index, opt) {
                var w = Share._biggieSizePresets[opt.value];
                if(!w) { throw "invalid size selected: " + opt.value }

                var h = Share._recommendedBiggieHeight(w);

                $(opt).html(opt.value + " (" + w + "px x " + h + "px)");
            });
    },
    _updateEmbed : function() {

        $("#embedcode")[0].value = Share.embedcode.getEmbed(false);
        var dims = Share.embedcode.getDims();
        $("#embedded_player_sample").html(Share.embedcode.getEmbed(true));
        var iframe = $("#embedded_player_sample iframe");
        var warning = $("#sample_not_actual_size_warning");
           
        // these constants reflect how big the preview space in the dialog is
        var MAX_PREVIEW_HEIGHT = 554;
        var MAX_PREVIEW_WIDTH = 400;

        // start with the preview hidden, and if it's too large for the
        // dialog, truncate it and show a message saying it's not actual size
        iframe.css("display", "none");
        var ih = iframe.outerHeight();
        var iw = iframe.outerWidth();
        if(ih > MAX_PREVIEW_HEIGHT || iw > MAX_PREVIEW_WIDTH) {
            var hscale = MAX_PREVIEW_WIDTH / iw;
            var vscale = MAX_PREVIEW_HEIGHT / ih;
            var scale = Math.min(hscale, vscale);
            iframe.css({ height: ih * scale, width: iw * scale });
            warning.css("display", "block");
        } else {
            warning.css("display", "none");
        }
        iframe.css("display", "block");
    },

    refreshCustom : function() {
        // clear the innerHTML so that we are certain the flash gets reloaded
        // even if the new innerHTML is the same as the old (since it will be
        // most of the time).
        elt("embedded_player_sample").innerHTML = "";
        Share._updateEmbed();
    },

    _canBeCustom : function(variant) {
        switch(variant) {
            case "wordpress":
            case "other":
                return true;
                break;
        }
        return false;
    },

    _hookupColorSwatch : function(name, swatchname) {
        var textfield = elt(name);
        var swatch = elt(swatchname);
        var UPDATE_DELAY = 1000;
        var delayedUpdateTimer = null;
        var currentColor = Share.embedcode.colors[name];

        swatch.style.background = Share.embedcode.colors[name];
        textfield.value = Share.embedcode.colors[name];

        function doUpdate() {
            if(currentColor != Share.embedcode.colors[name]) {
                currentColor = Share.embedcode.colors[name];
                swatch.style.background = currentColor;
                Share._updateEmbed();
            }
        }

        // while focused, check the textbox periodically
        // to see if it has a valid hex value.  if so, use it.
        var selector = "#" + name;
        Share.pollWhileFocused(selector, function(elem) {
                var match;
                if(match = /^#?([0-9a-fA-F]{6})$/.exec($(selector)[0].value))
                {
                    Share.embedcode.colors[name] = "#" + match[1];
                    doUpdate();
                }
            });

        function colorChoiceHandler(color, finished) {
            swatch.style.background = color;
            textfield.value = color;
            Share.embedcode.colors[name] = color;

            if(delayedUpdateTimer)
                clearTimeout(delayedUpdateTimer);

            if(finished)
            {
                Share._updateEmbed();
            }
            else
            {
                delayedUpdateTimer = setTimeout(doUpdate, UPDATE_DELAY);
            }
        }

        $(swatch)
            .click(function (event) {
                Share._picker = PopupPicker.pick(event.pageX, event.pageY, currentColor, colorChoiceHandler);
                Share._picker.on("dialogclose", function() {
                     Share._cleanupPicker();
                });
            });
    },

    _addMerch : function(packages) {
        if(!packages) return;

        for(var i=0; i<packages.length; i++) {
            $("#merchSelect").append($('<option>', { value: packages[i].id, text: packages[i].title }));
        }

        $("#merchSelect").on("change", Share._handleMerchSelected);
    },
    
    _cleanupPicker: function() {
        if (Share._picker)
        {
            var picker = Share._picker;
            Share._picker = null;
            PopupPicker.destroy(picker);
        }  
    },

    showSection : function(sec) {
        var shownormal = true;
        var showcustom = false;
        var showbiggie = false;

        switch(sec) {
            case "normal":
                //use defaults above
                break;
            case "custom":
                shownormal = false;
                showcustom = true;
                break;
            case "biggie":
                showbiggie = true;
                shownormal = false;
                break;
        }

        $("#sizeChoices").css("display", shownormal ? "inline" : "none");
        $("#customLayoutChoices").css("display", showcustom ? "inline" : "none");
        $("#refreshlink").css("display", showcustom ? "inline" : "none");
        $("#biggieSizeChoices").css("display", showbiggie ? "inline" : "none");

        Share._updateControls();
    },

    _backToNormal : function() {
        if(Share.embedcode.getCustomParams()) {
            Share.embedcode.setSize("venti");
            Share._updateEmbed();
        }
        Share.showSection("normal");
    },

    _recommendedBiggieHeight : function(width) {
        // note: this recommendation is not actually critical since the
        // biggie player can be arbitrarily sized, but this calculates
        // a nice height based on the options shown.  This is highly
        // dependent on the biggie (and related) CSS, so the contants
        // in here may need tweaking if that changes
        var size = Share.embedcode.getSize();
        var notracklist = Share.embedcode.getOption("notracklist");
        var pkg = Share.embedcode.getPackage();

        var MIN_HEIGHT = 350;
        var MERCH_SECTION_HEIGHT = 62;
        var CONTROLS_HEIGHT = 79;
        var TRACKLIST_BASE_HEIGHT = 11;
        var TRACKLIST_ITEM_HEIGHT = 26;
        var CURRENTTRACK_HEIGHT = 13;
        var MAX_TRACKS = 10;

        // these are all based on a nominal artwork size of MIN_HEIGHT, so scale to actual width
        var scalefactor = width / MIN_HEIGHT;

        var h = MIN_HEIGHT;
        if(size == "artonly") return Math.round(MIN_HEIGHT * (scalefactor));

        h += CONTROLS_HEIGHT;

        if(pkg) h += MERCH_SECTION_HEIGHT;

        if(notracklist) {
            h += CURRENTTRACK_HEIGHT;
        } else {
            var num_tracks_to_show = Math.min(TralbumData.trackinfo.length, MAX_TRACKS);
            h += TRACKLIST_BASE_HEIGHT + num_tracks_to_show * TRACKLIST_ITEM_HEIGHT;
        }

        return Math.round(h * scalefactor);
    },

    _handleClick : function(event) {
        if(event.target.name == "sharePlayerSize") {
            if(event.target.id == "sharePlayerSize_venti" && event.shiftKey && Share._canBeCustom(Share.embedcode.getVariant())) {
                event.preventDefault();
                Share.showSection("custom");
                Share.dlgCustomUpdate();
                return;
            } else if (event.target.id == "sharePlayerSize_grande" && event.shiftKey) {
                event.preventDefault();
                Share.showSection("biggie");
                // fixme: setting a different radio button in the click handler for this
                // radio button does not ever seem to work.
                setTimeout(function() { Share._selectSize("artonly");}, 0);
                return;
            }
            Share._handleSizeSelected(event.target.value);
            return;
        }

        switch(event.target.id) {
            case "refreshlink_anchor":
                Share.refreshCustom();
                event.preventDefault();
                break;
            case "classicmode_link":
            case "backtonormal_link":
                Share._backToNormal()
                event.preventDefault();
                break;
        }
    },
    _handleCustomUpdated : function() {
        var url = elt("layouturl").value;
        var h = elt("customheight").value;
        var w = elt("customwidth").value;
        Share.embedcode.setCustomLayout(url,h,w);
        Share._updateEmbed();
    },
    _selectSize : function(sz) {
        var elem = $("#sharePlayerSize_" + sz);
        if(elem.attr("checked") != "checked") {
            elem.attr("checked", "checked");
            Share._handleSizeSelected(sz);
        }
    },
    _handleSizeSelected : function(sz) {
        Share.embedcode.setSize(sz);
        switch(sz) {
            case "biggie":
            case "artonly":
                Share._handleDimensionPickerChanged();
                break;
            default:
                Share._updateControls();
                Share._updateEmbed();
                break;
        }
    },
    _handleTransparentChanged : function() {
        Share.embedcode.setTransparent(elt("transparent").checked)
        Share._updateControls();
        Share._updateEmbed();
    },
    _handleDimensionPickerChanged : function(event) {
        var picker = $("#sizePicker")[0];
        var value = picker.value;
        var width = Share._biggieSizePresets[value];
        var height = Share._recommendedBiggieHeight(width);
        Share.embedcode.setDims(width, height);
        Share._updateControls();
        Share._updateEmbed();
    },
    _handleShowTracklistChanged : function(event) {
        var opts = { notracklist: !(event.target.checked) }
        Share.embedcode.setOptions(opts);
        Share._handleDimensionPickerChanged();
    },
    _handleMerchSelected : function(event) {
        Share.embedcode.setPackage(event.target.value);
        Share._handleDimensionPickerChanged();
    },
    _handleShortcodeTypeChanged : function(event) {
        var variant = "other";
        if(event.target.value == 1) {
            variant = "wordpress";
        }

        Share.embedcode.setVariant(variant)
        var embed_code = Share.embedcode.getEmbed(false);
        $('#embedcode').val(embed_code);
    },

    // This could probably be a generic utility, or could probably be done
    // in a better way.  Just moving this out of hookupColorSwatch in a more
    // generic form.
    pollWhileFocused : function(sel, callback, period) {
        if(!period) {
            period = 500;
        }

        var timer = null;

        function docallback() {
            if(callback) callback($(sel));
        }

        function onblur(event) {
            if(timer) {
                clearInterval(timer);
                timer = null;
            }

            $(sel).off("blur", onblur);
        }

        $(sel).on("focus", function(event) {
                timer = setInterval(docallback, period);
                $(sel).on("blur", onblur);
            })
    },
	

    openFacebookShare : function(url, title) {
        var fburl = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url);
        fburl += "&p[title]=ptitle&p[summary]=psummary"
        if(title) { 
            fburl += "&t=" + encodeURIComponent(title);
        }
        window.open(fburl, 'sharer','toolbar=0,status=0,width=626,height=436');        
        return false;
    },

    openTwitterShare : function(message) {
        // Twitter is dithering on the deprecation of this URL for Tweet submission. 
        // "http://twitter.com/intent/tweet/?text=" is the official format, but 
        // it doesn't submit text on the user's Twitter page (on an isolated, empty page instead),
        // and the page auto-closes immediately after twooting. Not terrible, but not ideal.
        Log.debug("opening twitter share with message: " + message);
        var twurl = 'http://twitter.com/?status=' + encodeURIComponent(message);
        window.open(twurl);
        return false;
    },

    doFacebook : function(url, title) {
        Stats.share_menu_click("facebook");
        return Share.openFacebookShare(url, title);
    },
    
    doTwitter : function( url, isTrack, source ) {
        
        if( source && source == "tweet_button" ) {
          Stats.record({kind:"click", click: "tweet_button"});
        } else {
            Stats.share_menu_click("twitter");
        }
        
        var tralbum = isTrack ? "track" : "album";
        var message = "omg best " + tralbum + " ever: " + url;
        return Share.openTwitterShare(message);
    },




    /////////////////////////////////////////////////////////////////////////////
    // new-style share/embed reveals a panel just below tralbum art

    panelLinkPromise: new $.Deferred(),  // resolved when the Share/Embed link is rendered
    _panelInited : false,
    _panelData: null,

    initPanel: function(isTrackPage, enableSocialButtons, linkback) {
        if ( MediaView.mode == "phone" || $(".share-embed").length ) 
            return;

        var twitterUsername;
        $("#band-links a").each(function () {
            var match = /twitter\.com\/(?:#!)?(\w+)/i.exec($(this).attr("href"));
            if (match) {
                twitterUsername = match[1];
                return false;
            }
        });

        Share._panelData = {
            linkback: linkback,
            is_track: isTrackPage,
            enable_social_buttons: enableSocialButtons,
            title: TralbumData.current.title, 
            artist: TralbumData.artist,
            twitter_username: twitterUsername,
            download_pref: TralbumData.current.download_pref
        };
        $(".share-panel-wrapper-desktop").append( Templ.render("tralbum_common/share_collect_controls") );
        $(".share-embed").click( function() {
            Share.togglePanel();
        });
        if (enableSocialButtons)
            Share.initSocialButtons();
        Share.panelLinkPromise.resolve();
    },

    initSocialButtons: function() {
        // Make sure the external SDKs load now, but don't render the buttons themselves until the panel is shown, if ever.
        FacebookUtils.initSDK();
        GPlusUtils.initSDK();
    },

    // same a togglePanel, except it brings up the panel
    // contents in a modal dialog.  Unlike the panel, this
    // dialog is created and destroyed on each invocation
    panelAsDialog: function() {
        // wait until panel initialization is done before bringing the dialog up.
        Share.panelLinkPromise.then(Share._panelAsDialog);
    },
    _panelAsDialog: function() {
        var data = Share._panelData;
        var delem = $(Templ.render("tralbum_common/share_embed_panel", data));
        var dialogparams = {
            draggable: true,
            position: "center",
            modal: true,
            title: "Share",
            width: 380,
            height: 260
        };
        var d = delem.dialog(dialogparams);

        // don't automatically put focus in the email link box
        d.find(".email-im-link-text").blur();

        Share._initPanelControls(d, data, function() {
                d.dialog("close");
            });
        if (Share._panelData.enable_social_buttons) {
            // Note that we attempted to preload the social button SDKs earlier, in initPanel.
            SocialControls.initFromDOM(d);
        }
    },
    _initPanelControls: function(root, data, closehandler) {
        var $root = $(root);
        $root.find(".close").click( function() {
            closehandler();
        });

        $root.find(".embed-other-services a").click( function() {
            Stats.record({kind:"click", click: "embed_other"});
            if(CfgShare2) {
                EmbedDialog.open();
            } else {
                Share.showDialog(data.is_track, null, 'other', true);
            }
            closehandler();
        });

        $root.find(".share-buttons").on("click", ".twitter-link, .tumblr-link", function() {
            closehandler();
        });

        $root.find('.email-im-link input')
            .focus(function() {
                EmailIMUtils.onFocus();
            })
            .click(function() {
                $(this).select();
            });
    },

    togglePanel : function() {
        var $root = null;
        if(!Share._panelInited) {
            var data = Share._panelData;
            var $root = $(".share-panel-wrapper-desktop").append( Templ.render("tralbum_common/share_embed_panel", data) );
            Share._initPanelControls($root, data, function() { Share.togglePanel(); });
            Share._panelRoot = $root;
        } else {
            $root = Share._panelRoot;
        }

        var container = $root.find('.share-embed-container');
        var willShow = container.css("display") == "none";
        container.slideToggle('fast', function() {
            if (willShow)
                Dom.scrollToElement( container, 20, true );
        });

        if (!Share._panelInited) {
            if (Share._panelData.enable_social_buttons) {
                // Note that we attempted to preload the social button SDKs earlier, in initPanel.
                SocialControls.initFromDOM($root);
            }
            Share._panelInited = true;
        }
    },

    xxx: null
};
;
/* ------------- BEGIN share2.js --------------- */;
// PlayerEmbed: a knockout viewmodel that cares about all aspects of building an embed
// code.  opts_in must have, at a minimum, 'type' ("album" or "track") and 'id'.  This
// is completely decoupled from the global EmbedData in tralbum pages and replaces the
// functionality in the old EmbedCode module in a cleaner way.
function PlayerEmbed(opts_in) {
    var self = this;
    self.PREVIEW_MAX_WIDTH = 560;
    self.PREVIEW_MAX_HEIGHT = 900;

    var defaults = {
        kind : "html",
        size: "large",
        width: 350,
        height: 470,
        bgcol : "FFFFFF",
        linkcol : "0687f5",
        layout : "standard",
        artwork : "large",
        show_art : true,
        show_tracklist : false
    };
    var opts = $.extend({}, defaults, opts_in);

    self.debug = ko.observable(Cookie.get("sharedebug"));
    var cfg_video_sharing = $("#pagedata").data("blob").cfg.video_sharing;
    self.video_sharing_enabled = ko.observable(cfg_video_sharing);

    // direct params: the values in the embed code correspond directly
    // to the params in the UI
    self.size = ko.observable(opts.size);
    self.bgcol = ko.observable(opts.bgcol);
    self.linkcol = ko.observable(opts.linkcol);
    self.width = ko.observable(opts.width);     // note: may be useful to
    self.height = ko.observable(opts.height);   // have a computed with the
                                                // last known good width/height
                                                // to use in embed params in case
                                                // current w/h values in UI are
                                                // invalid
    self.package = ko.observable();
    self.packages = ko.observableArray();

    self.video = ko.observable();
    self.videos = ko.observableArray();

    // rather than use a knockout throttle extension to track the errors,
    // use my own mechanism which can be quieted based on the last time a
    // change to the config was made.  This means that instead of highlighting
    // an error strictly after 400ms, we can highlight the error if it's been
    // there for 400ms *unless* you've recently changed a big config option.
    // this is because technically, in some layouts, hidden fields are sitting
    // in an "errored" state (because they're not relevant to the current layout
    // anyway), and when you switch to a layout that makes them visible, they
    // don't clear their error state until the knockout throttle delay, which is
    // ugly.  This just allows any subscribe to say self.quiet_errors_for_a_bit()
    // and the error state will clear immediately and then be re-evaluated after
    // the delay.
    var QUIET_TIME = 400; // ms
    self.quieting_timeout = ko.observable(new Date());
    self.quiet_recheck = ko.observable(1); // serial number.  bumping causes a recalc
    self.quiet_error = ko.computed(function() {
            self.quiet_recheck(); //read this observable so knockout knows we rely on it
            return (new Date()) < self.quieting_timeout();
        });
    self.quiet_errors_for_a_bit = function() {
            var d = new Date();
            d.setMilliseconds(d.getMilliseconds() + QUIET_TIME);
            self.quieting_timeout(d);
            setTimeout(function() { self.quiet_recheck(self.quiet_recheck()+1); }, QUIET_TIME);
        };

    // Default to automatic sizing for medium/small embeds.
    if (self.size() !== 'large') {
        self.width('100%');
    }
    self.size_config_visible = ko.observable(true); // BS: (jason) have to start with 'true' until I figure out a good way to initialize medium/small (doing in chooseSize)
    self.specifyWidth = function () {
        var width;
        if ( self.layout() == "slim" || self.artwork() == "small" || self.artwork() == "none" ) {
            width = DEFAULT_HORIZ_WIDTH;
        } else {
            // force the width into the valid range instead of merely calculating the
            // valid range and highlighting the field if it's out of spec
            var wRange = self.widthRange(self.input_height());
            width = pin(self.input_width(), wRange);
        }
        self._applying_dimensions = true;
        self.input_width(width)
        self.width(width);
        self._applying_dimensions = false;

        self.size_config_visible(true);
    };
    self.dontSpecifyWidth = function () {
        self.width('100%');
        self.size_config_visible(false);
    };

    self.input_width = ko.observable(opts.width);
    self.input_height = ko.observable(opts.height);
    self.input_width_error = ko.computed(function() {
            if(self.quiet_error()) return false;

            var size = self.size();
            if (size === 'large') {
                return self.input_width() != self.width();
            }

            // If the size is medium or small, and we are editing the size (not
            // leaving it 100%), we need to verify that the value is between
            // the min and max widths.

            if (self.size_config_visible()) {
                return self.input_width() < DEFAULT_SIZES[size].min_width || self.input_width() > DEFAULT_SIZES[size].max_width;
            }

            // no prob.
            return false;
        });
    self.input_height_error = ko.computed(function() {
            if(self.quiet_error()) return false;

            return self.input_height() != self.height();
        });
    self.t = ko.observable(opts.t);
    self.selected_track_id = ko.observable(opts.selected_track_id);

    // type: album or track
    self.type = ko.observable(opts.type);
    self.id = ko.observable(opts.id);
    self.itemarg = ko.computed(function() {
            return self.type() + "=" + self.id();
        });
    self.siteroot = ko.observable(opts.siteroot);

    // kind: html or wordpress
    self.kind = ko.observable(opts.kind);

    // 'layout' is the top-level radio button choice of "slim", "artwork-only" and "standard",
    // which now map to "small", "large", and "large", respectively, since everything except
    // "small" is now implemented by a "standard" player.  We no longer provide a UI for
    // generating "medium" players since the "large" layout has grown capabilities that make
    // it able to look the same as "medium".  Having all the large/medium options able to be
    // controlled by the same set of knobs and levers in the UI simplifies things.
    self.layout = ko.observable(opts.layout);
    self.layout.subscribe(function(val) {
            self.quiet_errors_for_a_bit();
            if(val == "slim") {
                self.show_art(true);
                self.chooseSize("small");
            } else if (val === "video") {
                self.input_width(VIDEO_DEFAULT_WIDTH);
            } else {
                self.show_art(true);
                self.artwork("large");
                self.chooseSize("large");
                if(val == "video") {
                    self.kind("html");
                }
            }
        });

    self.artwork = ko.observable(opts.artwork);
    self.show_art = ko.observable(opts.show_art);
    self.artwork_option = ko.computed(function() {
            if(self.layout() == "minimal") return "large";
            if(!self.show_art()) return "none";
            return self.artwork();
        });


    // allow_merch: whether "show merch" option is visible
    self.allow_merch = ko.computed(function() {
            // merch option is only available if we're a large player with packages, and we are using
            // the "large art" option
            return (self.packages().length > 0) && (self.size() == "large") && (self.artwork_option() == "large");
        });

    // show_merch: whether "show merch" is checked
    // actual "package" parameter depends on whether something is chosen in popup (see showing_merch)
    self.show_merch = ko.observable(!!opts.package);

    self.allow_video = ko.computed(function() {
            return self.videos().length > 0 && self.video_sharing_enabled();
        });
    self.allow_choose_video = ko.computed(function() {
            return self.videos().length > 1;
        });

    self.show_standard_options = ko.computed(function() {
            return self.size() == "large";
        }).extend({ notify: 'always' });

    // showing_merch: whether we are actually adding the merch option to
    // the embed code
    self.showing_merch = ko.computed(function() {
            return self.show_standard_options() &&
                    self.artwork_option() == "large" &&
                    self.show_merch() &&
                    self.package();
        }).extend({ notify: 'always' });

    self.show_tracklist = ko.observable(opts.show_tracklist);
    self.show_tracklist.subscribe(function(val) {
            console.log("show_tracklist changed: " + val);
        });

    // a computed value that we can subscribe to which gets an event if
    // any of these properties change.
    self.needHeightRecalc = ko.computed(function() {
            return self.layout()
                + self.show_tracklist()
                + self.showing_merch()
                + self.size();
        }).extend({ notify: 'always' });
    self.needHeightRecalc.subscribe(function() {
            // note: this must be done asynchronously because when this fires, the entire
            // viewmodel is not updated.  in particular, sizekey() has a cached computed value
            setTimeout(function() {
                    // recalculate the height to something reasonable for the new
                    // options, using the current input_width
                    _applyWidth(self.width() === '100%' ? self.width() : self.input_width());
                }, 0);
        });

    self.isdark = ko.computed(function() {
            // currently, we only have one "dark" option
            return self.bgcol() == "333333";
        });

    self.title = ko.observable(opts.title);
    self.art_id = ko.observable(opts.art_id);
    self.artist = ko.observable(opts.artist);
    self.linkback = ko.observable(opts.linkback);

    // this is basically unnecessary now that we don't distinguish
    // between "large/standard" and "large/minimal", but i'm leaving
    // it just in case.  It's used to look up defaults in DEFAULT_SIZES;
    self.sizekey = ko.computed(function() {
        return self.size();
    });

    function PackageOption(p) {
        this.title = ko.observable(p.title);
        this.id = ko.observable(p.id);
    }
    function VideoOption(v) {
        var self = this;
        this.track_name = ko.observable(v.track_name);
        this.track_id = ko.observable(v.track_id);
        this.track_number = ko.observable(v.track_number);
        this.description = ko.computed(function() {
            return self.track_number() + ". " + self.track_name();
        });
    }

    if(opts.packages) {
        var items = [];
        for(var i=0; i<opts.packages.length; i++) {
            var pkg = opts.packages[i];
            if(pkg.arts && pkg.arts.length > 0) {
                items.push(new PackageOption(pkg));
            }
        }
        self.packages(items);
    }

    if(opts.videos) {
        var items = [];
        for(var i=0; i<opts.videos.length; i++) {
            var v = opts.videos[i];
            items.push(new VideoOption(v));
        }
        self.videos(items);
    }

    var DEFAULT_SIZES = {
        large : { width: 350, height: 350, min_width: 170, max_width: 700 },
        medium : { width: '100%', height: 120, min_width: 250, max_width: 700 },
        small : { width: '100%', height: 42, min_width: 170, max_width: 700 }
    };

    var DELTAS = {
        /*
            meanings of these constants:
            infopanel - how much height we normally add for the infopanel.  absolute pixels
            list_base - height added for "show tracklist" option, not counting the list items themselves
            list_item - height of each list item
            merch_nominal - height of the scaled portion of the merch section for a
                            default-sized player.  this value is
            merch_absolute - height of the absolute-sized portion of the merch section
        */
        standard: { infopanel : 120, list_base : -14, list_item : 33, list_small_art : 36, track : -28, merch_nominal : 57, merch_absolute : 10 },
        sidebar: { infopanel : 142, list_base : -16, list_item : 33, list_small_art : 38, track : -28, merch_nominal : 53, merch_absolute : 10 }
    };


    var DEFAULT_HORIZ_WIDTH = 400;  // when disabling auto-width, set user-specified width to something reasonable
    var SIDEBAR_WIDTH_MAX = 299;
    var STANDARD_SMALLART_WIDTH_MIN = 250;
    var NOMINAL_MERCH_HEIGHT = 67;
    var INFOPANEL_HEIGHT = 120;
    var LIST_BASE_HEIGHT = -9; // adding the tracklist actually makes the
                                        // base height smaller because some elements disappear
    var LIST_ITEM_HEIGHT = 33;  // incremental height of each tracklist item
    var TRACK_DELTA = -28;      // difference from a large 'album' player to large 'track' player
    var MIN_LIST_ITEMS = 2;
    var MAX_LIST_ITEMS = 10; 
    var DEFAULT_NUM_LIST_ITEMS = 10;
    var VIDEO_ASPECT_RATIO = 16 / 9; // this is the aspect ratio of the actual video element in the video player
    var VIDEO_INFO_HEIGHT = 120;
    var VIDEO_MIN_WIDTH = 360;
    var VIDEO_MAX_WIDTH = 4000;
    var VIDEO_DEFAULT_WIDTH = 560;

    // pin the value to the range
    // range may be an array of valid ranges.  if there is more than one given
    // and val is not in any of them, val will be pinned to the range that it's
    // closest to
    function pin(val, range) {
        if (val === '100%') {
            return val;
        }
        if(range instanceof Array) {
            var pinDelta = null;
            var pinValue = null;

            for(var i=0; i<range.length; i++) {
                var r = range[i];
                var pinned = Math.max(r.min,Math.min(val,r.max || 100000));
                if(pinned == val) return val;

                var delta = Math.abs(val-pinned);
                if(pinDelta == null || pinDelta > delta) {
                    pinDelta = delta;
                    pinValue = pinned;
                }
            }
            return pinValue;
        } else {
            return Math.max(range.min,Math.min(val,range.max || 100000));
        }
    }

    function make_range(min,max) {
        return { min: min, max: max };
    }

    // inner height range calculator.  relies on no state
    // fixme: 'isLarge' is now a misnomer. this is really "is it a layout with a variable
    //    set of options which affect the height"
    function hRange(w, defaults, deltas, isLarge, isMinimal, isTrack, isMerch, isTracklist, isSmallArt) {
        deltas = deltas || {};
        var min = defaults.height;
        var range = 0;
        if(isLarge) {
            var scaled_part = min;
            var unscaled_part = 0;
            
            if(!isMinimal) {
                if(isSmallArt) {
                    scaled_part = 0;
                }
                unscaled_part += (deltas.infopanel || 0);

                if(isMerch) {
                    scaled_part += (deltas.merch_nominal || 0);
                    unscaled_part += (deltas.merch_absolute || 0);
                }
                if(isTracklist) {
                    unscaled_part += (deltas.list_base || 0) + MIN_LIST_ITEMS * (deltas.list_item || 0);
                    range += (MAX_LIST_ITEMS - MIN_LIST_ITEMS) * (deltas.list_item || 0);
                    if(isSmallArt) {
                        unscaled_part += deltas.list_small_art || 0;
                    }
                }
                if(isTrack && !isSmallArt) {
                    unscaled_part += (deltas.track || 0);
                }
            }
            var scale = w / defaults.width;

            // note: for small/medium, we do not scale the height range by the width, because
            // they are fixed height
            min = Math.round(scaled_part * scale) + unscaled_part;
        }

        return make_range(min, min+range);
    }
    self.hRange = hRange;

    // heightRange(w) -
    //
    // for the current size, return a min and max value indicating the
    // allowed heights relative to the current size's DEFAULT_SIZES entry.
    // Example: for a large player with a default of 350x470 and showing
    // merch, the default height must be increased by exactly 65, so
    // this function will return { min: 530, max: 530 }.  For players
    // with the tracklist shown, this will be a range indicating the
    // heights that will have 3-10 tracks visible.
    self.heightRange = function(width) {
        // video dimensions constraints are completely different than others
        if ( self.layout() == "video" ) {
            var height = _videoHeight(width);
            return make_range(height, height);
        }

        var sizekey = self.sizekey();
        var defaults = DEFAULT_SIZES[sizekey];
        var deltas = (width <= SIDEBAR_WIDTH_MAX && self.artwork_option() == "large") ? DELTAS.sidebar : DELTAS.standard;

        return hRange(
                width,
                defaults,
                deltas,
                self.show_standard_options(),
                self.layout() == "minimal",
                self.type() == "track",
                self.showing_merch(),
                self.show_tracklist(),
                self.artwork_option() != "large"
            );
    }

    // inner width range calculator.  relies on no state
    // This is sort of the reverse of hRange, which ends up being a bit
    // more difficult to follow, so I'm making it easier on myself by
    // commenting the heck out of it and using lots of intermediate locals
    // so I don't get lost.
    // fixme: 'isLarge' is now a misnomer. this is really "is it a layout with a variable
    //    set of options which affect the height"
    function wRange(h, defaults, deltas, isLarge, isMinimal, isTrack, isMerch, isTracklist, isSmallArt) {
        deltas = deltas || {};

        if(!isLarge) {
            // fixed height; width is unrelated to height or options
            return make_range(defaults.min_width, defaults.max_width);
        }
        if(isSmallArt) {
            return make_range(STANDARD_SMALLART_WIDTH_MIN, defaults.max_width);
        }
        if(isMinimal) {
            // fixed: w == h
            return make_range(h, h);
        }

        // from here down we assume 'large' player that is not 'minimal'
        var scaled_portion = h - (deltas.infopanel || 0);

        var range = 0;

        if(isTrack) {
            // fixed height change due to track player is not scaled
            scaled_portion -= (deltas.track || 0);
        }
        if(isMerch) {
            // fixed height change due to merch section
            scaled_portion -= (deltas.merch_absolute || 0);
        }

        if(isTracklist) {
            // fixed height change due to inclusion of tracklist is not scaled
            var listdelta = (deltas.list_base || 0) + MIN_LIST_ITEMS * (deltas.list_item || 0);
            scaled_portion -= listdelta;
            range += (MAX_LIST_ITEMS - MIN_LIST_ITEMS) * (deltas.list_item || 0);
        }

        // at this point, we have a height (or range of heights for the scaled
        // portion, and we  want to back-calculate what widths could possibly lead to that
        // scaled_portion height.
        var scaled_portion_min = Math.max(defaults.min_width, scaled_portion - range);
        var scaled_portion_max = Math.max(defaults.min_width, scaled_portion);

        // knowing the nominal scaled portion height for these options will
        // let us calculate the min/max scale values that result in our height
        var scaled_portion_nominal_height = defaults.height;
        if(isMerch) {
            scaled_portion_nominal_height += (deltas.merch_nominal || 0);
        }

        // calculate those min/max scale values
        var scale_min = scaled_portion_min / scaled_portion_nominal_height;
        var scale_max = scaled_portion_max / scaled_portion_nominal_height;

        // min/max width are default widths, scaled by min/max scale
        var minwidth = Math.round(defaults.width * scale_min);
        var maxwidth = Math.round(defaults.width * scale_max);

        // finally, pin the min/max width values to the limits in 'defaults'
        var width_limits = make_range(defaults.min_width, defaults.max_width);
        return make_range(pin(minwidth, width_limits), pin(maxwidth, width_limits));
    }
    self.wRange = wRange;
    
    // get a valid range of widths for the given height and the current options
    self.widthRange = function(h) {
        var sizekey = self.sizekey();
        var defaults = DEFAULT_SIZES[sizekey];

        // video dimensions constraints are completely different than others
        if ( self.layout() == "video" ) {
            return make_range(VIDEO_MIN_WIDTH, VIDEO_MAX_WIDTH);
        }

        var standardRange = wRange(
                h,
                defaults,
                DELTAS.standard,
                self.show_standard_options(),
                self.layout() == "minimal",
                self.type() == "track",
                self.showing_merch(),
                self.show_tracklist(),
                self.artwork_option() != "large"
            );


        var sidebarRange = null;

        if ( self.size() == "large" ) {
            // width range is funny.  For a given height, we don't know whether
            // the width will be "sidebar" sized or "standard" sized (or it could
            // be that both are valid).  So we calculate the valid width ranges
            // for both sidebar and standard, and then return a range that includes
            // both.
            sidebarRange = wRange(
                    h,
                    defaults,
                    DELTAS.sidebar,
                    self.show_standard_options(),
                    self.layout() == "minimal",
                    self.type() == "track",
                    self.showing_merch(),
                    self.show_tracklist(),
                    self.artwork_option() != "large"
                );

            // if we calculated both the sidebar range and the standard range and they
            // are both valid, return an array of both
            if(standardRange.max < SIDEBAR_WIDTH_MAX) {
                return sidebarRange;
            }
            return [sidebarRange, standardRange];
        }

        return standardRange;
    };

    // note: these are overall min/max width for the given configuration,
    // not the calculated widthRange values for the given height.  These
    // are just used for the label in the UI to give the user an idea of
    // the overall constraints of the chosen player.
    self.minWidth = ko.computed(function() {
        if(self.layout() == "video") return VIDEO_MIN_WIDTH;

        if(self.size() == "large" && self.artwork_option() != "large") {
            return STANDARD_SMALLART_WIDTH_MIN;
        }
        var sizekey = self.sizekey();
        var defaults = DEFAULT_SIZES[sizekey];
        return defaults.min_width;
    });
    self.maxWidth = ko.computed(function() {
        if(self.layout() == "video") return VIDEO_MAX_WIDTH;

        var sizekey = self.sizekey();
        var defaults = DEFAULT_SIZES[sizekey];
        return defaults.max_width;
    });

    // returns true if there is only one valid height for
    // the current width
    self.isFixedHeight = ko.computed(function() {

        if(self.layout() == "video") return true;

        switch(self.size()) {
            case "medium":
            case "small":
                return true;
                break;
            case "large":
                // variable height if we are showing a tracklist or large art
                return !(self.show_tracklist() ||
                    (self.artwork_option() == "large"));
                break;
        }
    });

    self.allowAutoWidth = ko.computed(function() {
        return self.isFixedHeight() && self.layout() != "video";
    });

    // called by the outer picker to select one of the three sizes to init the customize dialog with
    //
    // should set up the default options for each rough size, including default dimensions as appropriate
    //
    self.chooseSize = function(size) {
        switch(size) {
            case "video":
                self.layout("video");
                self.input_width(VIDEO_DEFAULT_WIDTH);
                break;
            case "large":
                self.size(size);
                self.specifyWidth();
                self.input_width(DEFAULT_SIZES.large.width);
                break;
            case "medium":
                self.layout("standard");
                self.size("large");
                self.artwork("small");
                //no tracklist
                self.dontSpecifyWidth();
                break;
            case "small":
                self.layout("slim");
                self.size(size);
                //width = 100%
                self.dontSpecifyWidth();
                break;
        }
    }


    function _videoHeight(width) {
        return Math.round(width / VIDEO_ASPECT_RATIO + VIDEO_INFO_HEIGHT);
    }

    // apply a width value, possibly adjusting the height value
    // along with it, depending on the size/options chosen
    //
    // This is triggered by user editing 'input_width' and may or may
    // not end up updating 'height' and 'width' depending on whether
    // input_height and input_width seem acceptable.
    // This is also called manually with the existing width value when
    // changing major options in order to use this logic to select a
    // nice default height.
    function _applyWidth(width) {
        if(self._applying_dimensions) return;

        if(self.layout() == "video") {
            // for video, a given width implies a specific height, so just set it and done
            if(width < VIDEO_MIN_WIDTH || width > VIDEO_MAX_WIDTH) {
                // width invalid, don't apply it
                return;
            }
            var height = _videoHeight(width);
            self.height(height);
            self.width(width);
            self._applying_dimensions = true;
            self.input_height(height);
            self._applying_dimensions = false;
            return;
        }

        var sizekey = self.sizekey();
        var defaults = DEFAULT_SIZES[sizekey];
 
        if(width < defaults.min_width || width > defaults.max_width) {
            return;
        }
        // extra special min width for smallart players
        if(self.size() == "large" && self.artwork_option() != "large" && width < STANDARD_SMALLART_WIDTH_MIN) {
            return;
        }

        // passed the check, so use this width in the embed
        self.width(width);

        if ( width == "100%" ) {
            // if the width is set to "100%", continue as if the width
            // was set to defaults.min_width, since you can't do a height
            // calculation with the string "100%"
            width = defaults.min_width;
        }

        // calculate range of allowable heights
        var range = self.heightRange(width);
        var inp_height = self.input_height();

        // by default, update input_height to the closest value in its allowed range
        var new_height = pin(inp_height, range);

        // however, if we are showing a tracklist, default the height to
        // show exactly DEFAULT_NUM_LIST_ITEMS list items by default (unless there are fewer tracks
        // than that, in which case, default to the number of tracks).
        // Calculate this by knowing that range.min shows MIN_LIST_ITEMS, so add
        // enough height for an additional 1 or 2 if appropriate
        if(self.size() == "large" && self.layout() != "minimal" && self.show_tracklist()) {
            var nitems = Math.min(DEFAULT_NUM_LIST_ITEMS, opts.num_tracks || 0);
            if(nitems > MIN_LIST_ITEMS) {
                Log.debug("showing " + nitems + " tracks by default");
                new_height = range.min + LIST_ITEM_HEIGHT * (nitems - MIN_LIST_ITEMS);
            }
        }

        if(new_height != inp_height) {
            self.height(new_height);
            self._applying_dimensions = true;
            self.input_height(new_height);
            self._applying_dimensions = false;
        }
    }

    // apply a height value, possibly adjusting the width along with it
    //
    // This is triggered by user editing 'input_height' and may or may
    // not end up updating 'height' and 'width' depending on whether
    // input_height and input_width seem acceptable.
    function _applyHeight(height) {
        if(self._applying_dimensions) return;

        var range = self.widthRange(height);
        var inp_width = self.input_width();
        var new_width = pin(inp_width, range);

        var hrange = self.heightRange(new_width);
        if(pin(height, hrange) == height) {
            self.height(height);
            self.width(new_width);

            if(new_width != inp_width) {
                self._applying_dimensions = true;
                self.input_width(new_width);
                self._applying_dimensions = false;
            }
        }
    }

    self.minHeight = ko.computed(function() {
            var sizekey = self.sizekey();
            var defaults = DEFAULT_SIZES[sizekey];
            var range = self.heightRange(defaults.min_width);
            return range.min;
        });

    self.show_art.subscribe(function(val) {
            // when user turns off 'show art', enable auto-sizing
            if(!val) {
                self.dontSpecifyWidth();
            }
        });

    self.show_tracklist.subscribe(function(val) {
            // auto-width not allowed when tracklist shown
            if(val) {
                // call _applyWidth, which updates the height according to the
                // current width and options, *before* calling specifyWidth,
                // which itself constrains the width according to the current
                // height.  Otherwise, each time you turn on the tracklist option,
                // the width is ratcheted down so the playlist fits in the current
                // height.
                _applyWidth(self.input_width());
                self.specifyWidth();
            }
        });

    self.artwork.subscribe(function(val) {
            self.quiet_errors_for_a_bit();
            if(val != "large" && !self.show_tracklist()) {
                // when user switches to small art, enable auto-sizing
                self.dontSpecifyWidth();
            } else {
                // it's either 'large' or it's got a tracklist, in which
                // case we don't allow auto-width
                self.specifyWidth();
                
                if(val == "large") {
                    // if we're doing large art, set a default size
                    self.input_width(DEFAULT_SIZES.large.width);
                } else {
                    // otherwise, try to fit the height to the width
                    var hRange = self.heightRange(self.input_width());
                    self._applying_dimensions = true;
                    self.input_height(pin(self.input_height(), hRange));
                    self.height(self.input_height());
                    self._applying_dimensions = false;
                }
            }
        });

    // whenever input_width or input_height change, do the
    // appropriate update of the other
    self.input_width.subscribe(_applyWidth);
    self.input_height.subscribe(_applyHeight);

    self.incrementNumTracks = function(delta) { // delta should be -1 or 1
        var increment = (delta == 1) ? 0.5 : -0.5;
        var up = delta == 1;

        var range = self.heightRange(self.width());
        var height = Number(self.height());
        var num_visible_tracks = (height - range.min) / LIST_ITEM_HEIGHT;

        if(up) {
            num_visible_tracks = Math.floor(num_visible_tracks) + delta;
        } else {
            num_visible_tracks = Math.ceil(num_visible_tracks) + delta;
        }

        var new_height = pin(range.min + num_visible_tracks * LIST_ITEM_HEIGHT, range);
        self.input_height(new_height);
    }

    // return an escaped key=value string (or "" if option not set) for the given name
    self.parm = function(name) {
        if(self[name] && self[name]()) {
            return name + "=" + escape(self[name]());
        }
        return "";
    }

    // return an array of key=value strings for use as params
    function _getParams(forpreview) {
        var parms = [self.itemarg()]
        var regularparms = ["size", "bgcol", "linkcol"];
        for(var i=0; i<regularparms.length; i++) {
            var parm = self.parm(regularparms[i]);
            if(parm) parms.push(parm);
        }
        if(self.showing_merch()) {
            parms.push("package=" + escape(self.package()));
        }
        if(self.show_standard_options() && self.layout() != "minimal" && !self.show_tracklist()) {
            parms.push("tracklist=false");
        }
        if(self.layout() == "minimal") {
            parms.push("minimal=true");
        }
        if(self.size() == "large") {
            // large defaults to large artwork, no need for param
            if(self.artwork_option() != "large" && self.layout() != "minimal") {
                parms.push("artwork=" + self.artwork_option());
            }
        } else {
                // med/small default to showing artwork, no need for param
                if(!self.show_art()) {
                    parms.push("artwork=none");
                }
        }
        if(self.selected_track_id()) {
            parms.push("track=" + escape(self.selected_track_id()));
        }
        if(self.kind() == "html") {
            parms.push("transparent=true"); // all new players are transparent unless someone wants to manually remove this from their embed code
        }

        return parms;
    }

    // returns a value to scale the preview by in order to
    // make it fit in the dialog
    self.preview_scale = ko.computed(function() {
            var w = self.width();   
            var h = self.height();
            var scalew = 1, scaleh = 1;
            if(w > self.PREVIEW_MAX_WIDTH) {
                scalew = self.PREVIEW_MAX_WIDTH / w;
            }
            if(h > self.PREVIEW_MAX_HEIGHT) {
                scaleh = self.PREVIEW_MAX_HEIGHT / h;
            }
            return Math.min(scalew, scaleh);
        });

    function _description() {
        return self.title() + " by " + self.artist();
    }

    // get some dimensions for the current player that
    // fit in a PREVIEW_MAX_WIDTH x PREVIEW_MAX_HEIGHT
    // box.  Note that this will not necessarily look
    // exactly like the real embed, because all the
    // parts do not scale uniformly, so the aspect ratio
    // and relative sizes of parts are not preserved.  We
    // stick a note in the dialog if the preview is being
    // trimmed down in this way.
    self.preview_dimensions = ko.computed(function() {
            var w = Number(self.width());
            var h = Number(self.height());

            // if it's too wide, pin the width and then
            // adjust the height to something valid for
            // the new width
            if(w > self.PREVIEW_MAX_WIDTH) {
                w = self.PREVIEW_MAX_WIDTH;
                h = pin(h, self.heightRange(w));
            }

            // after that, if it's still too tall, pin the
            // height and further adjust the width down to
            // something valid for the newer height
            if(h > self.PREVIEW_MAX_HEIGHT) {
                h = self.PREVIEW_MAX_HEIGHT;
                w = pin(w, self.widthRange(h));
            }

            return { w: w, h: h };
        });

    self.debug_in_new_frame = function() {
        var url = _embedCode("url", _getParams(false));
        window.open(url, "playerembeddebug");
    };

    function _videoEmbedCode(kind, height, width, track_id, bgcol, linkcol) {
        var params = [
            'bgcol=' + bgcol,
            'linkcol=' + linkcol
        ]
        
        // so as not to have multiple [bandcamp] wordpress codes, a wp video embed
        // is identified by a 'video=<id>' param where the id is the id of the track
        // whose video we want to see.  So in the wordpress case, switch the param
        // name from 'track' to 'video'

        switch ( kind ) {
            case 'wordpress':
                params.unshift('height=' + height);
                params.unshift('width=' + width);
                params.unshift('video=' + track_id);
                return '[bandcamp ' + params.join(' ') + ']';
            case 'html':
                params.unshift('track=' + track_id);
                var url = self.siteroot() + '/VideoEmbed?' + params.join('&');
                return '<iframe style="border: 0; width: ' + width + 'px; height: ' + height + 'px;" src="' + url + '" mozallowfullscreen="1" webkitallowfullscreen="1" allowfullscreen="1" seamless></iframe>';
            case 'url':
                // same as html case but no iframe
                params.unshift('track=' + track_id);
                var url = self.siteroot() + '/VideoEmbed?' + params.join('&');
                return url;
        }
    }

    function _embedCode(kind, params, ispreview) {

        var w = self.width(), h = self.height();

        if ( self.layout() == "video" ) {
            if(ispreview) {
                    w *= self.preview_scale();
                    h *= self.preview_scale();
            }
            return _videoEmbedCode(kind, h, w, self.video(), self.bgcol(), self.linkcol());
        }

        switch(kind) {
            case "url":
                var parmstr = params.join("/") + "/";
                return self.siteroot() + '/EmbeddedPlayer/' + parmstr;
            case "html":
                var parmstr = params.join("/") + "/";
                if(ispreview) {
                    if (w !== '100%'){
                        w *= self.preview_scale();

                        // only scale height for "large" players that are not width=100% -- medium
                        // and small, and auto-widthing players have fixed height
                        if(self.size() == "large") {
                            h *= self.preview_scale();
    
                            var pd = self.preview_dimensions();
                            w = pd.w;
                            h = pd.h;
                        }
                    }
                }

                if (w !== '100%') {
                    w = w + 'px';
                }
                h = h + 'px';

                return '<iframe style="border: 0; width: ' + w + '; height: ' + h + ';" src="' + self.siteroot() + '/EmbeddedPlayer/' + parmstr + '" seamless><a href="' + self.linkback() + '">' + Templ.filters.h(_description()) + '</a></iframe>';
            case "wordpress":
                var wpparams = ["width=" + w, "height=" + h].concat(params);

                var parmstr = wpparams.join(" ");
                return "[bandcamp " + parmstr + "]";
        }
    }

    // 'code' gets you the embed code for all the current options
    self.code = ko.computed(function() {
        return _embedCode(self.kind(), _getParams(false));
    });

    // 'preview' is the same as 'code' except:
    // 1) it is throttled by 500ms so the preview doesn't constantly change
    // 2) it's always kind=='html' (for previewing in the dialog)
    // 3) passes true to _getParams to indicate that the iframe has some
    //    special preview junk (like the onload callback)
    //
    self.preview = ko.computed(function() {
        var params = _getParams(true);
        return _embedCode('html', params, true);
    }).extend({ throttle: 500 });
}

// ShareViewModel: a knockout view model for the share customization
// dialog.  Tracks basic dialog state (e.g. are we choosing a size or not)
// and contains a PlayerEmbed model for binding to most of the controls.
// This model currently relies on EmbedData from the page (second arg to ctor),
// but that dependency is as of yet restricted to the constructor so as to
// be easily removed.
function ShareViewModel(rootelem, embeddata) {
    var self = this;
    var $root = $(rootelem);
    self.$root = $root;
    
    // until Share2 is active, check for extra EmbedData for the album
    if(embeddata.album_embed_data) {
        embeddata = embeddata.album_embed_data;
    }

    var embedopts = {
        title: embeddata.title || embeddata.album_title,
        linkback: embeddata.linkback,
        art_id: embeddata.art_id,
        artist: embeddata.artist,
        type: embeddata.tralbum_param.name,
        id: embeddata.tralbum_param.value,
        siteroot: embeddata.swf_base_url,
        packages: embeddata.packages,
        videos: embeddata.videos,
        num_tracks: embeddata.num_tracks,
        selected_track_id: embeddata.track_id
    };

    self.embed = new PlayerEmbed(embedopts);
    self.state = ko.observable("picksize");
    self.test = ko.observable("testing");
    self.embed_data = embeddata;
    self.bg_color_index = ko.observable(0);
    self.link_color_index = ko.observable(0);

    self.pickingsize = ko.computed(function() { return self.state() == "picksize"; });
    self.customising = ko.computed(function() { return self.state() == "customising"; });
    self.previewloading = ko.observable(false);
    self.preview = ko.observable();
    self.allow_video = self.embed.allow_video;

    self.picksize = function(size) {
        self.embed.chooseSize(size);
        set_embed_bgcol(self.bg_color_index());
        self.state("customising");
    }
    self.repicksize = function() {
        self.preview("");
        self.state("picksize");
    }

    var DIALOG_BASE_SIZE = 650;
    var DIALOG_PREVIEW_PADDING = 185; // this plus max preview height is the max dialog height
    var DIALOG_SIZE_CONSTANTS = {
        base: 650, // base height
        large: 40, // how much to add to dialog height for "large" size choice
        merch: 30, // how much to add to dialog height when "show merch" is checked
    };

    self.dialog_height = ko.observable(DIALOG_SIZE_CONSTANTS.base);

    // instead of having dialog_height be a computed based directly
    // on a bunch of observables, have it be a direct observable that
    // is recalculated only when necessary for the dialog to change
    // height.  We don't want it changing height before we've even
    // updated the preview.
    self.recalcDialogHeight = ko.computed(function() {
            return self.state() + self.embed.preview();
        });

    self.recalcDialogHeight.subscribe(function(val) {
        var height = DIALOG_SIZE_CONSTANTS.base;

        if(self.state() != "picksize") {
            if(self.embed.show_standard_options()) {
                height += DIALOG_SIZE_CONSTANTS.large;

                if(self.embed.showing_merch()) {
                    height += DIALOG_SIZE_CONSTANTS.merch;
                }
            }

            // if preview is large, increase dialog to accomodate it
            var pd = self.embed.preview_dimensions();
            var height_for_preview = pd.h + DIALOG_PREVIEW_PADDING;

            if(height_for_preview > height) {
                height = height_for_preview;
            }
        }

        self.dialog_height(height);
    });

    self.embed.preview.subscribe(function(val) {
            Log.debug("setting preview to " + val);
            self.previewloading(true);
            // rather than derive the viewmodel's 'preview' observable from the
            // embed's 'preview' observable, use a subscription and copy the value
            // when it changes.  This allows us to temporarily blank out the
            // preview when we go into the "picksize" state and then not restore
            // it to the embed.preview contents until it changes.  This is because
            // embed.preview is intentionally on a slight delay, which means when we
            // come back from the "picksize" state, we briefly see the old preview.
            self.preview(val);
        });

    self.get_css_color = function(elem) {
        var css_color = $(elem).css("background-color");
        return css_color_hex(css_color);
    }

    function css_color_hex(color_css) {
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        rgb = color_css.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        if(rgb) {
            return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
        hexmatch = color_css.match(/#([0-9a-fA-F]+)/);
        if(hexmatch) {
            return hexmatch[1];
        }
    }

    // return the color index of the given element by finding its index in the
    // list of elems returned by the selector
    function get_color_index(selector, elem) {
        var result = null;
        $root.find(selector + " .color_sample").each(function(i, e) {
                if(e == elem) result = i;
            });
        return result;
    }

    // get the color value (hex) for swatch number i in the list returned by the selector
    function get_color_value(selector, i) {
        return self.get_css_color($root.find(selector + " .color_sample")[i]);
    }

    // return whether or not the given color index (1-based) is the active link color
    self.islink = function(index) {
        if(self.link_color_index() == index - 1) {
            return true;
        }
        return false;
    }

    // return whether or not the given color index (1-based) is the active bg color
    self.isbg = function(index) {
        if(self.bg_color_index() == index - 1) {
            return true;
        }
        return false;
    }

    // convert clicks on swatches to color indexes, save them
    $root.on("click", ".linkcolor.light .color_sample", function(e) {
            Log.debug("clicked color:", get_color_index(".linkcolor.light", e.currentTarget));
            self.link_color_index(get_color_index(".linkcolor.light", e.currentTarget));
        });
    $root.on("click", ".linkcolor.dark .color_sample", function(e) {
            Log.debug("clicked color:", get_color_index(".linkcolor.dark", e.currentTarget));
            self.link_color_index(get_color_index(".linkcolor.dark", e.currentTarget));
        });
    $root.on("click", ".bgcolor .color_sample", function(e) {
            Log.debug("clicked color:", get_color_index(".bgcolor", e.currentTarget));
            self.bg_color_index(get_color_index(".bgcolor", e.currentTarget));
        });

    $root.on("keydown", ".height", function(e) {
            // catch alt-up-arrow and alt-down-arrow in the height box if we
            // have a tracklist and automatically bump height to next higher/lower
            // size that reveals an integer number of tracks in the tracklist
            if(e.altKey && self.embed.show_standard_options() && self.embed.show_tracklist()) {
                switch(e.which) {
                    case 38: //up key
                        self.embed.incrementNumTracks(1);
                        e.preventDefault();
                        break;
                    case 40: //down key
                        self.embed.incrementNumTracks(-1);
                        e.preventDefault();
                        break;
                }
            }
        });
    $root.on('keypress', '[type=number]', function(e) {
        var code = e.keyCode === 0 ? e.charCode : e.keyCode;
        switch (code) {
            case 8: // backspace
            case 9: // tab
            case 37: // arrow
            case 38: // arrow
            case 39: // arrow
            case 40: // arrow
            case 48: // 0
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: // 9
                return true;
            default:
                e.preventDefault();
                return false;
        }
    });

    // when color indexes change, look up corresponding color values and update embed
    self.link_color_index.subscribe(function(val) {
            var swatchclass = (self.bg_color_index() == 0) ? ".linkcolor.light" : ".linkcolor.dark";
            var linkcol = get_color_value(swatchclass, self.link_color_index());
            Log.debug("got link color " + linkcol + " for swatch class " + swatchclass + " index " + self.link_color_index());
            self.embed.linkcol(linkcol);
        });
    // note that when the bg color changes, we need to look up the link color too because
    // the set of swatches changes
    function set_embed_bgcol(index) {
        self.embed.bgcol(get_color_value(".bgcolor", index));
        var swatchclass = (index == 0) ? ".linkcolor.light" : ".linkcolor.dark";
        var linkcol = get_color_value(swatchclass, self.link_color_index());
        Log.debug("got link color " + linkcol + " for swatch class " + swatchclass + " index " + self.link_color_index());
        self.embed.linkcol(linkcol);
    }
    self.bg_color_index.subscribe(set_embed_bgcol);

    // select all embed code text on click
    $root.on("click", ".embed_text", function(e) {
            Log.debug("click embed text: ", e);
            $(e.currentTarget).focus().select();
            e.preventDefault();
        });

    // pick a size when clicking on a .sizechoice
    $root.on("click", ".sizechoice", function(e) {
            Log.debug("sizechoice click: ", e);
            var size = $(e.currentTarget).data("size");
            Log.debug(".sizechoice click: ", size);
            self.picksize(size);
        });
}

// EmbedDialog: set up a ShareViewModel in a dialog and give it the page's EmbedData
var EmbedDialog = {
    _dialog : null,
    _viewmodel : null,

    open : function() {
        var delem = $('<div>');
        var dialogparams = {
            draggable: true,
            dialogClass: "share_dialog",
            width: "1005",
            position: "center",
            modal: true,
            title: "Customize"
        };
        var d = delem.dialog(dialogparams);
        EmbedDialog._dialog = d;

        var liquidparams = {
            art_id : EmbedData.art_id,
        };
        EmbedData.packages = TralbumData.packages;
        EmbedData.num_tracks = TralbumData.trackinfo.length;
        EmbedData.videos = [];

        for(var i=0; i<TralbumData.trackinfo.length; i++) {
            var ti = TralbumData.trackinfo[i];
            if(ti.video_id) {
                EmbedData.videos.push({
                    track_id : ti.track_id,
                    track_number : ti.track_num,
                    track_name : ti.title
                });

                if(!liquidparams.video_poster_url || ti.video_featured) {
                    liquidparams.video_poster_url = ti.video_poster_url;
                }
            }
        }

        if ( EmbedData.album_embed_data ) {
            // the embed dialog for tracks actually ends up being
            // an embed dialog for the album nowadays (but with the
            // track queued up), so when populating the track's
            // video list for the share dialog, do it for the album too.
            EmbedData.album_embed_data.videos = EmbedData.videos;
        }

        d.html(Templ.render("_share2", liquidparams));
        var svm = new ShareViewModel(delem[0], EmbedData);
        EmbedDialog._viewmodel = svm;
        ko.applyBindings(svm, delem[0]);

        function resize() {
            var val = svm.dialog_height();
            Log.debug("setting dialog height to ", val);
            delem.dialog("option", "height", val);
        }
        function center() {
            delem.dialog("option", "position", "center");
        }

        // dynamically change the dialog height according to viewmodel options
        svm.dialog_height.subscribe(resize);
        resize();
        center();

        $(window).on("resize", center);

        d.on("dialogclose", function() {
                delem.remove();
                $(window).off("resize", center);
            });

        $(window).on("message", function(event) {
                if(event.originalEvent.data == "playerinited") {
                    svm.previewloading(false);
                }
            });

        return d;
    }
};
;
/* ------------- BEGIN expando.js --------------- */;
// expando.js
//
// - Expando boxes
//    This class exposes methods that open and close html boxes in an animated "exando" fashion. It depends upon yui's animation-min.js,
//    which we already load in the footer. 
//
//    I originally wrote it to support expando lyrics, but there's no reason it can't be used for other stuff. But as you'll see, to really
//    generalize it, you'll probably have to remove a few of the assumptions below.
//
//    Assumption I: The content for expando lives in a separate place from expando itself.
//
//    Then main thing about lyrics is that we allow them to be quite long (up to 100k on a page). For reasons having to do with optimizing 
//    indexing by google etc, we didn't want the lyrics text obscuring track names. Therefore, the content for these expando nodes is loaded
//    from hidden divs at the bottom of the page. That is, when you build your html, the html structures that you want to expand are initially
//    empty. The very first call for an expando to Expando.toggle (which is the main interface into this class) fetches the data from 
//    elsewhere and writes it into the empty expando. In the case of lyrics, that "elsewhere" is a set of hidden divs at the bottom of the page.
//    If you look at album.liquid, you'll see how I do this, and then pass references to those hidden nodes as a parameter to Expando.toggle. 
//
//    Assumption II: The initial state of an expando is closed. 
//
//    This falls out of assumption I, where the expando is initially empty (and hidden)
//
//    Assumption III: The only thing you will want to do with your expandos is toggle them.
//
//    For no particularly good reason, the only public method here is toggle. This works because of the strictness of I & II above.
//    With minimal changes to the method signatures  hide, showAnim, and hideAnim could presumably be made public. As a convenience,
//    you can notify the toggle function what state you want to toggle into: open, closed, or toggle. In this way toggle can be used
//    as an open or close. 
//

var Expando = {

    OPEN : 1,
    CLOSED : -1,
    DEFAULT : 0,
    _expandos : {},

    
    // toggle:
    //     Opens or closes an expando box of some sort ( a div, span, etc). Also, 
    //     writes the  content into a container, if it hasn't already been done before. 
    //
    // Params: 
    //   contentNodeId : a node in the dom which contains expando / content to write. 
    //                The expando should be accessible from this node via a simple innerHtml. By the way, the contentNodeId is used
    //                as key to the expando & the expando content throughout this class.
    //
    //   containerId : the id of the element in which to inject the content. This is the element that will be 
    //                resized to give the expando-animation effect.
    //
    //   containParentId:  The id of an ancestor of the element that will be expanded, if that ancestor 
    //                needs to be made visible or invisible too. For example, you may want to show or hide 
    //                a row in the playlist, even though the actually expando element is a div in one of the 
    //                row's cells. If the value of this parameter is not null, the toggeExpando method will 
    //                set the css "display" attribute to "none" or to displayType, according to whether the 
    //                expando is opening or closing. Can be null.
    //
    //   exclusive:   True if opening a expando should close all others. Otherwise, false.  (optional, default = false) 
    //
    //   postState:   Expando.OPEN,  Expando.CLOSED, DEFAULT.  (optional, default = Expando.DEFAULT) 
    //                Expando.OPEN if you expect the expando to be open after this call. Expando.CLOSED if you to be closed
    //                Expando.DEFAULT if you expect it to toggle from whatever the current state is. 
    
    toggle : function ( contentNodeId,  containerId, containerParentId, exclusive, postState  ) {
        
        this._registerContentNode( contentNodeId, containerId, containerParentId );
        
        // Are we opening or closing?
        var nextState = this._getNextState ( contentNodeId, postState );
        
        if ( nextState == this.OPEN )  {
        
            if( exclusive ) {
                Expando._hide();
            }
            
            Expando._showAnim( contentNodeId );
            
        }
        else  {
            Expando._hide( contentNodeId );
        }
        if( window.FacebookData )
                FacebookUtils.reportResize();
    },  
    
    isOpen : function( contentNodeId ) {
        return (this._expandos[contentNodeId] && (this._expandos[contentNodeId].state == this.OPEN) )
    },
    
    numberOpen : function() {
        var counter = 0;
        for( val in this._expandos ) {       
            if( this._expandos[val].state == this.OPEN ) {
                counter++;
            }
        }
        return counter;
    },      
                
    _showAnim : function ( contentNodeId  ) {
          
        $assert ( this._expandos[contentNodeId], "expected contents node to be registered" );
        var info = this._expandos[contentNodeId];
        var expando_block = elt( info.containerId );
        var expando_parent = elt( info.containerParentId );  
        
        Dom.display( expando_block, true );
        if(expando_parent){
            Dom.display( expando_parent, true ); 
        }
        
        expando_block.innerHTML = elt(contentNodeId).innerHTML;
      
        //ie7 doesn't seem to report the correct scrollHeight in this situation
        //until it's been accessed once. (this is just my observation. robbie)
        var tmp = expando_block.scrollHeight;

        var attributes = { height: { to: expando_block.scrollHeight } };
        
        var open_anim = new Y.util.Anim( expando_block , attributes );
        open_anim.duration = 0.5; 
        open_anim.method = YAHOO.util.Easing.easeOut;
        
        open_anim.animate(attributes);
        info.state = this.OPEN;
    },
     
    _hideAnim : function ( contentNodeId ) {
    
        $assert ( this._expandos[contentNodeId], "expected contents node to be registered" );
        var info = this._expandos[contentNodeId];
        
        var expando_block = elt( info.containerId ); 
           
        var attributes = { height: { to: 0} };
        var close_anim = new Y.util.Anim( expando_block , attributes );
        close_anim.duration = 0.5; 
        close_anim.method = YAHOO.util.Easing.easeOut;
        close_anim.animate(attributes);
        
        
        //Slowly close the expando with animations above. But the final "display:none" happens too fast
        chainThis = function() {
            var expando_block = elt( info.containerId );
            var expando_parent = elt( info.containerParentId );   
            Dom.display(expando_block, "" ); 
            if( expando_parent )
                Dom.display( expando_parent, "" ); 
        }
        
        var curHeight = expando_block.style.height;
        var finishInterval = (parseFloat(curHeight) < 20 ) ? 0 : 500;
        setTimeout ( chainThis, finishInterval ); 
        
        info.state = this.CLOSED;            
    },
    
    // Hides the expando without animation.
    // If no parames are passed in, closes all open expandos.
    _hide: function  ( contentNodeId ) {
    
        var closeThese = this._expandos;
        
        if( contentNodeId ) { 
            closeThese = new Object();
            closeThese[contentNodeId] = contentNodeId; // just creating a 1 element hashtable -- only interested in it for the value of it's keys
        }
        
        for( val in closeThese ) {
            
            $assert ( this._expandos[val], "expected contents node to be registered" );
            
            if( this._expandos[val].state != this.OPEN )
                continue;
                
            var expando_block = elt( this._expandos[val].containerId ); 
       
            if( expando_block ) {
                expando_block.style.height = 0;
                Dom.display(expando_block, ""); 
            }
        
            var expando_parent = elt( this._expandos[val].containerParentId ); 
        
            if ( expando_parent ) {
                Dom.display( expando_parent, "" ); 
            } 
            this._expandos[val].state = this.CLOSED;   
       }
    },
    
    _registerContentNode : function ( contentNodeId, containerId, containerParentId ) {
        if (! this._expandos[contentNodeId] ) {
            // This incarnation of Expando assumes that the content will not change between uses. That may worth revisiting.
            // But for now, let's cache all the info we can, if it doesn't exist in our list of expandos already.
            var relatedIds = { "contentNodeId" : contentNodeId, "containerId": containerId, "containerParentId" : containerParentId, "state" : this.INDETERMINATE };
            this._expandos[contentNodeId] = relatedIds;
        }
    },
    
    _getNextState : function ( contentNodeId, postState ) {
    
        $assert ( this._expandos[contentNodeId], "expected contents node to be registered" );
        
        if( postState == this.OPEN || postState == this.CLOSED )
            return postState;
        
        // Per assumptions outlined at the top of the page, unless it's explicity open, then
        // it's closed.
        if( this._expandos[contentNodeId].state == this.OPEN )
            return this.CLOSED;
            
        return this.OPEN;
    
    }
    
};
;
/* ------------- BEGIN peekaboo_list.js --------------- */;

var PeekabooList = {
        
    // Enhances an HTML list with expand/collapse behavior. Returns a refresh function which should
    // be called after the list is modified or rebuilt. 
    //    
    // Currently you must define this CSS rule for list truncation to work:
    //    .peekaboo-list.truncated .peekaboo-list-extra { display: none !important; }
    //
    // To reduce the possibility of a FOUC, you can call this method before domready.
    //
    // root: an html element or selector containing a single list (ul or ol)
    // buttonTextFn: (optional) a function accepting a single boolean parameter (is the list 
    //    truncated or not?) and returning the display text for the "more/less" toggle link. The 
    //    link will be inserted (if neeeded) as the last element of root.
    // truncateAfterFn: (optional) a function returning an integer; the list will be truncated if
    //    its length exceeds this number.
    // truncateToFn: (optional) a function returning an interger; if the list is truncated, this
    //    many elements will remain visible.
    // startTruncated: (optional) if false, the list initially is fully-expanded. Default is true.
    //
    // Events: this module adds a "toggle" event to the root element, which is fired when the user
    //    toggles the list. Use jquery's 'on' method to subscribe. The handler will be passed two 
    //    parameters: (event, isTruncated), where the second gives the current state of the list.
    enhance: function( root, buttonTextFn, truncateAfterFn, truncateToFn, startTruncated ) {
        
        root = $(root);
        buttonTextFn    = buttonTextFn    || $.proxy( this, "defaultButtonText" );
        truncateAfterFn = truncateAfterFn || $.proxy( this, "defaultTruncateAfter" );
        truncateToFn    = truncateToFn    || $.proxy( this, "defaultTruncateTo" );
        startTruncated  = startTruncated !== false;
        
        var firstTime = true;
        root.addClass( "peekaboo-list" );
        
        // This method is idempotent, so we can use it as a MediaView sync handler.
        var refresh = function() {
            Log.debug( "PeekabooList refresh: " + root.get(0).id );
            
            var wasTruncated = root.hasClass("truncated");
            root.removeClass( "truncated" )
                .find( ".showMore" ).remove();
            var items = root.find( "li" );
            items.removeClass( "peekaboo-list-extra" );
    
            // maybe truncate the list
            if ( items.length > truncateAfterFn() ) {
                
                // add classes as truncation targets
                items.slice( truncateToFn() ).addClass( "peekaboo-list-extra" );
                
                var truncateNow = wasTruncated || ( firstTime && startTruncated );
                if ( truncateNow )
                    root.addClass( "truncated" );
                
                root.append( '<div class="showMore"><a href="#"></a></div>' )
                    .find( ".showMore a" )
                    .on( "click", handleToggle )
                    .text( buttonTextFn(truncateNow) );
            }
            
            firstTime = false;
        };
        
        var handleToggle = function(event) {
            root.toggleClass( "truncated" );
            var isTruncated = root.hasClass("truncated");
            root.find( ".showMore a" )
                .text( buttonTextFn( isTruncated ) );
            root.trigger( "toggle", isTruncated );
            return false;
        };
        
        var refreshProxy = $.proxy(refresh, this);
        refreshProxy();
 
        return refreshProxy;
    },
    
    defaultButtonText: function( truncated ) {
        return truncated ? "more..." : "fewer";
    },
    
    defaultTruncateAfter: function() {
        return 5;
    },
    
    defaultTruncateTo: function() {
        return 3;
    },
    
    zzz: null
}
;
/* ------------- BEGIN shows.js --------------- */;
// requires: media_view.js, peekaboo_list.js
// also see: shows_band.js

// Manages the list truncation in the "Shows" section of tralbum pages.
var Showography = {
        
    refreshPeekaboo: null,
    
    domReady: function() {}, // base implementation: noop
    
    enhance: function() {
        var root = $( "#showography" );
        if (!root.length) return;
        this.refreshPeekaboo = PeekabooList.enhance( 
            root,
            $.proxy( this, "moreButtonText" ),
            $.proxy( this, "truncateAfter" ),
            $.proxy( this, "truncateTo" )
        );
        root.on( "toggle", function(event, isTruncated) {
            if(window.FacebookData)
                FacebookUtils.reportResize();
        } );
        root.on( "click", "li a", $.proxy(this, "handleShowClick") );
    },
    
    truncateAfter: function() {
        return window.MediaView && MediaView.mode == "phone" ? 7 : 5;
    },
    
    truncateTo: function() {
        return window.MediaView && MediaView.mode == "phone" ? 5 : 3;
    },
    
    moreButtonText: function( truncated ) {
        return truncated ? "more shows..." : "fewer shows";
    },

    handleShowClick: function() {
        Stats.record( {kind: "click", click:"shows_link"} );
    },
      
    zzz: null    
};

// Don't wait for domready. Enhance the raw html now to reduce the chance of a FOUC.
Showography.enhance();
;
/* ------------- BEGIN discography.js --------------- */;
// requires: media_view.js, peekaboo_list.js

// Manages the list truncation in the "Discography" section of tralbum pages.
var Discography = {

    enhance: function(discographyInfo) {
        
        if(discographyInfo.music_grid){
            if(discographyInfo.discography_real_size > discographyInfo.sidebar_max_size){
                return;
            }
        }

        var root = $("#discography");
        if (!root.length) return;
        
        PeekabooList.enhance( 
            root,
            $.proxy( this, "moreButtonText" ),
            $.proxy( this, "truncateAfter" ),
            $.proxy( this, "truncateTo" ),
            ( Cookie.get( "discography_show_all" ) != "true" )
        );
        root.on( "toggle", function(event, isTruncated) {
            Cookie.set( "discography_show_all", ( isTruncated ? false : true ) );
            if(window.FacebookData)
                FacebookUtils.reportResize();
        } );
    },
    
    truncateAfter: function() {
        if ( window.FacebookData ) // FB app
            return window.FacebookData.discoRowSize;
        else if ( window.MediaView && MediaView.mode == "phone" )
            return 6;
        else
            return 3;
    },
    
    truncateTo: function() {
        if ( window.FacebookData ) // FB app
            return window.FacebookData.discoRowSize;
        else if ( window.MediaView && MediaView.mode == "phone" )
            return 4;
        else
            return 3;
    },
    
    moreButtonText: function( truncated ) {
        return truncated ? "more releases..." : "fewer releases";
    },
      
    zzz: null    
};

// Some pages keep the older expando-sidebar discograpy.
$(document).ready( function() {
    var blob = $("#pagedata").data("blob") || {};
    Discography.enhance( blob.sidebar_disco || {} );
});

;
/* ------------- BEGIN tralbum_fixup_mobile.js --------------- */;
/* global Browser, Control, MediaView, Dom */
// Fixup now, before domready.
//
// In most cases here we could use event delegation but don't. This is so we get mobile safari's 
// pretty tap highlight behavior on the tappable element.

var Fixup = window.Fixup || {};

(function(exports) {
    "use strict";

    // When tapping on anchors, Mobile Safari will briefly display the location bar even if the click
    // event is cancelled by JS. This doesn't happen if the anchor's href starts with "#", or if
    // there is no href attribute. This method will, on tapdown, overwrite the href with "#" and
    // copy the original url into the data-href attribute. This is a modification of the technique
    // described here: http://blog.josemanuelperez.es/2011/06/prevent-iphone-navigation-bar-ajax-link-click
    exports.neutralizeAnchors = function( anchors ) {
        if ( phoneView() ) {
            $(anchors).on( "touchend", function() {
                var anchor = $(this);
                var href = anchor.attr("href");
                if ( href && href.substr(0,1) != "#" )
                    anchor.attr("href", "#").attr("data-href", href);
            } );
        }
    };
    
    // Taps anywhere in a compound-button containing an anchor should activate the anchor's href.
    exports.compoundLinkButtons = function( buttons ) {
        buttons = $(buttons);
        exports.neutralizeAnchors( buttons.find("a") );

        buttons.has("a").on( "click", function(event) {
            if ( phoneView() ) {
                var anchor = $(this).find("a");
                var href = anchor.attr("data-href") || anchor.attr("href");
                if ( href ) {
                    var handled = Control.invokeAction( href, event.originalEvent );
                    if ( !handled ) {
                        var target = anchor.attr("target");
                        if (!target || target == "_self")
                            location.href = href;
                        else
                            window.open(href, target);
                    }
                    return false;
                }
            }
        } );
    };
    exports.compoundLinkButtons( $(".compound-button") );   // just for share buttons right now
    
    // Taps anywhere in a compound-button containing a button should activate the primary child buttons's click event handler.
    // Currently this only applies to our "buy" buttons.
    exports.compoundButtons = function( buttons ) {
        buttons = $(buttons);
        buttons.has("button").on( "click", function(ev) {
            if ( phoneView() ) {
                var button = $(this).find("button")[0]; 
                // only need to trigger the click if the target is not the primary button (or one of its children)
                if (button && !$(ev.target).is(button) && !$(button).has(ev.target).length) {
                    ev.preventDefault();
                    button.click();
                }
            }
        } );
    };
    exports.compoundButtons( $(".compound-button") );
    
    exports.trackRows = function( rows ) {
        rows = $(rows);
        exports.neutralizeAnchors( rows.find(".title-col a") );
        
        // Taps on the right edge of a track row should navigate to the track page.
        rows.filter(".linked").find(".info-col").on( "click", function() {
            if ( phoneView() ) {
                var anchor = $(this).parents("tr").find(".title-col a");
                var href = anchor.attr("data-href") || anchor.attr("href");
                if ( href ) {
                    location.href = href;
                    return false;
                }
            }
        } );

        // Taps to the has-video link in a playlist row should do video
        rows.find(".has-video-subcol").on( "click", function(ev) {
            if ( phoneView() ) {
                var anchor = $(this).find("a.has-video");
                doMobileVideo( anchor, ev );
                return false;
            }
        } );
    };
    exports.trackRows( $("#track_table tr") );

    exports.inlinePlayerVideoLink = function(trackInfo){
        
        trackInfo = $(trackInfo);
        exports.neutralizeAnchors( trackInfo.find("a.video-link") );

        // TODO: why is touchend required here for android (and not for ios) and 
        //       more importantly, touchednd isn't required in the method above. 
        trackInfo.find("a.video-link").on( "touchend", function(ev) {
            if ( phoneView() ) {

                var anchor = $(this);
                doMobileVideo( anchor, ev );
                return false;
            }
        } );

        // as elsewhere
        // Taps to the video link should do video
        trackInfo.find("a.video-link").on( "click", function(ev) {
            if ( phoneView() ) {
                var anchor = $(this);
                doMobileVideo( anchor, ev );
                return false;
            }
        } );

    };
    exports.inlinePlayerVideoLink( $(".inline_player.phone-view .track_info") );
    
    // Add a "top" button
    $( '<a class="goto-top-button compound-button"><span>Top</span></a>' ).
        appendTo( "#pgBd" ).
        on( "click", function(event) { Dom.scrollToElement(document.body); } );
    
    function phoneView() {
        return window.MediaView && MediaView.mode == "phone";
    }

    function doMobileVideo( anchor, ev ) {

        if ( window.Browser && Browser.make == "safari" && Browser.platform == "iphone" ) {
            return doMobileVideo_iOS( anchor, ev );
        }

        var href_mobile = $(anchor).attr("data-href-mobile");

        if ( href_mobile ) {

            var caption = $(anchor).attr("data-caption");
            

            var videoPlayer = $("video.featured-video-mobile-player");

            if( !videoPlayer[0] ){
                videoPlayer = $("video.hidden-video-mobile-player");
            }

            videoPlayer.attr("src", "");
            videoPlayer.hide();

            var pieces = href_mobile.split("/");
            var posterUrl = ( "//bandcamp.23video.com/" + pieces[1] + "/" + pieces[2] + "/" + pieces[3] + "/standard/thumbnail.jpg" ) ;
            videoPlayer.attr("poster", posterUrl);

            videoPlayer.parent().show();

            videoPlayer.attr("src", "//bandcamp.23video.com" + href_mobile);
            videoPlayer.get(0).load();
            videoPlayer.show();
            videoPlayer.get(0).play();

            if ( caption ) {
                $(".video-caption").text(caption);
                $(".video-caption").show();
            } else {
                $(".video-caption").hide();
            }

            $('html, body').animate({
                scrollTop: (videoPlayer.offset().top - 20)
                }, 500);

            return false;
        }
    }

    function doMobileVideo_iOS( anchor, ev ) {
        var href_mobile = $(anchor).attr("data-href-mobile");
        if ( href_mobile ) {

            var pieces = href_mobile.split("/");
            var posterUrl = ( "//bandcamp.23video.com/" + pieces[1] + "/" + pieces[2] + "/" + pieces[3] + "/standard/thumbnail.png" ) ;

            // maker sure "loading..." indicators have been changed back already.
            $(".video-link-loading").text( "video");
            $(".video-link-loading").removeClass("video-link-loading");

            // change text on this lkink
            $(anchor).text( "loading...");
            $(anchor).addClass("video-link-loading");

            // remove any old one avoids scrubber getting confused. 
            $("video#mobile-player").remove(); 

            var appendPoint = null;
            if ( anchor.hasClass("has-video") ){
               appendPoint = anchor.parents("tr.track_row_view");
            } else {
                appendPoint = anchor.parents("div.track_info");
            }

            var videoPlayer = $('<video/>', {
            id: 'mobile-player',
            src: '//bandcamp.23video.com' + href_mobile,
            poster: posterUrl
            }).appendTo( appendPoint );    

            videoPlayer[0].addEventListener('webkitendfullscreen', function() {
                $("video#mobile-player").remove(); 
                $(anchor).removeClass("video-link-loading");
                $(anchor).text( "video");

            }, false);
            
            videoPlayer[0].addEventListener('playing', function() {
                $(anchor).removeClass("video-link-loading");
                $(anchor).text( "video");
            }, false);

            videoPlayer.get(0).load();
            videoPlayer.show();
            videoPlayer.get(0).play();

            // for mobile, we don't show the caption, because we try to get rid of the player asap. 
            return false;
        }
    }

}(Fixup));;
/* ------------- BEGIN peekaboo_text.js --------------- */;
// A simple scheme for adding "more/less" expand behavior to long-form text. This code relies on the
// server to divide the text into two parts. Requires peekaboo_text.css. The required HTML structure 
// looks like this:
//
//     <p> <!-- block-level container -->
//         text part 1
//         <span class="peekaboo-text">text part 2</span>
//         <span class="peekaboo-link"><span class="peekaboo-ellipsis">...</span>&nbsp;<a>more</a></span>
//     </p>
//
// Usage as of August 2012: this code is only used as a fallback when the pure client-side solution
// in truncate.js isn't available due to browser support.

var PeekabooText = {

    more : function( link ) {
        link = $(link);
        var ellipsis = link.prev(".peekaboo-ellipsis");
        var desc = ellipsis.closest(".peekaboo-link").prev(".peekaboo-text");
        if ( !ellipsis.length || !desc.length ) return;
        
        if ( desc.css("display") == "none" ) {
            link.html("less");
            desc.fadeIn("fast");
            ellipsis.hide();
        } else {
            link.html("more");
            desc.hide();
            ellipsis.show();
        }    
    }
};

$(document).ready( function() {
    $(".peekaboo-link a").click( function() {
        PeekabooText.more(this);
        return false;
    } );
} );;
/* ------------- BEGIN share_tralbum_phone.js --------------- */;
// Mobile-only version of the Share library. Currently there's very little common code
// between this and share.js, so I've kept them separate.

var ShareTralbumPhone = {};
(function( exports ) {
    if ( !window.EmbedData )
        return;
    
    var isTrack = ( TralbumData.current.type == "track" );
    var title = TralbumData.current.title;
    var artist = EmbedData.artist;
    var linkback = EmbedData.linkback; 
        
    exports.init = function() {
        $( "#share-link" ).on( "click", exports.showShare );
    };
    
    exports.showShare = function() {
        if ( !window.MediaView || MediaView.mode != "phone" )
            return null;  // allow others to handle this event

        var params = {
            "linkback": linkback,
            "is_track": isTrack,
            "title": title,
            "artist": artist
        };
        var dlg = Dialog.openTemplate( "Share", "_share_tralbum_phone", params, [] );
        var root = $(dlg.body);
        SocialControls.initFromDOM(root);
        return false;
    };
    
})( ShareTralbumPhone );

// Assuming we're loading in the page foot, there's no need to wait for domready. Set up our event handler now.
if ( ShareTralbumPhone.init )
    ShareTralbumPhone.init();
;
/* ------------- BEGIN autolyrics.js --------------- */;
// autolyrics.js
//
// (depends on expando.js)
//
// It's hard to imagine this class being used in any place other than the album page. It is used to as a namespace mostly
// for the functions (and a few variables) that are need to automatically open and close lyrics expandos as the
// player moves through the playlist.
//
// I added it mainly to avoid having a bunch of global functions in the album page.
//

var AutoLyrics = {
     _autoOpen : false, 
     _prefixLyricsContentNode : "",
     _prefixLyricsContainer : "",
     _prefixLyricsParent : "",
     _inUse : false,
     _tracklistlen : 0,
     _indexAdjustment : 0,
     _prevContent : null,
     
     init : function( contentPrefix, containerPrefix, parentPrefix, tracklistlen, indexAdjustment ) {
         this._prefixLyricsContentNode = contentPrefix;
         this._prefixLyricsContainer = containerPrefix;
         this._prefixLyricsParent = parentPrefix; 
         this._tracklistlen =  tracklistlen;
         this._indexAdjustment = indexAdjustment; // for example, if the playerview tracks are zero based, and the tracknums in the page are 1 based.,
     },
     
     _playTrackListener : function( tracknum ) {
     
         tracknum = (tracknum % AutoLyrics._tracklistlen) + AutoLyrics._indexAdjustment;
         Log.debug("expanding track: " + tracknum );
         
          // if we don't have any lyric content for this track, don't open anything
         var content = AutoLyrics._prefixLyricsContentNode + tracknum ;  
         if (!elt(content) ) {
            AutoLyrics._prevContent = content;
            return;  
         }   
               
         // if this track is already open, don't open (or close) any others, but do set a flag to start auto-opening after this.
         // Note that this is the only way auto-open gets triggered -- the player fires a play_track event
         // for a track in the playlist whose lyrics have already been opened.  
         if( Expando.isOpen( content ) ) {
            AutoLyrics._autoOpen = true;
            AutoLyrics._prevContent = content;
            return;
         }
         
         // if autoOpen has not been triggered, AND if the prev thing played isn't already open (for 
         // example manually, after the track started playing),  don't open the new lyrics
         if( !AutoLyrics._autoOpen && !Expando.isOpen(AutoLyrics._prevContent) ){
            AutoLyrics._prevContent = content;
            return;
         }
            
         var thingToExpand = AutoLyrics._prefixLyricsContainer + tracknum ;              
         var parentOfThingToExpand = AutoLyrics._prefixLyricsParent + tracknum ;
                        
         Expando.toggle( content, thingToExpand, parentOfThingToExpand, true, Expando.OPEN );
         AutoLyrics._prevContent = content;
         
    }, 

    getPlaylistListeners : function(playlist) {
         playlist.ontrackplayed( AutoLyrics._playTrackListener );
    }
 };;
/* ------------- BEGIN albumpage.js --------------- */;
var AlbumPage = {

    // (formerly AlbumPage.registerPlaylistListeners)
    onPlayerInit : function (playlist){
        
        // set playlist listeners, perform other page initilization that depends upon
        // the music player having been initilized. 
        if (playlist) {
            AutoLyrics.getPlaylistListeners(playlist);
            playlist.ontrackplayed(AlbumPage.changeTrackInfo);

            TralbumLimits.onPlayerInit(playlist);

            AlbumPage.videoInit(playlist);
        }
    },

    videoInit : function(playlist) {
        // This is called during player init (above) and during player init. 
        // Can be safely called more than once. The playlist argument can be 
        // null, depending on context - that is, it is only needed if integrating
        // into an audio player and playlist. 

        if (window.VideoPlayer && window.TralbumData) {
            // is a video player needed for this playlist?
            var videoPlayerNeeded = false;
            for ( var i = 0; TralbumData.trackinfo && i < TralbumData.trackinfo.length; i++ ) {
                if ( TralbumData.trackinfo[i].video_source_type && TralbumData.trackinfo[i].video_id ) {
                    videoPlayerNeeded = true;
                    break;
                }
            }
            if ( videoPlayerNeeded && !window.tracklistVideoPlayer ) {
                TralbumPageVideoPlayer.init(playlist); 
            }
            if ( window.tracklistVideoPlayer && $("#pagedata").data("blob").showvid ) {
                $("#pagedata").data("blob").showvid = false;
                window.tracklistVideoPlayer.doVideo(  TralbumData.trackinfo[i].video_source_type, 
                                                    TralbumData.trackinfo[i].video_id, 
                                                        TralbumData.trackinfo[i].video_caption, 
                                                            false, false );
            }
        }
    },
     
    changeTrackInfo : function (tracknum) {
      
         var tracklist = elt( "track_table");
         var tracks = Y.util.Dom.getElementsByClassName( "track_row_view", "tr", tracklist );
           
         for( i = 0; i < tracks.length ; i ++ )
         {
             var theRow = tracks[ i ];
             
             if ( i == tracknum ){
                 AlbumPage._showSingleTrackInfo( theRow );
             } 
             else {
                 AlbumPage._hideSingleTrackInfo( theRow );  
             }
         }
    },
    
    registerMouseOverForTrackRows : function (){
            
        var tracklist = elt( "track_table");
        var tracks = Y.util.Dom.getElementsByClassName( "track_row_view", "tr", tracklist );
           
        if ( !(Browser.platform == "iphone" || Browser.platform == "android" || Browser.platform == "blackberry") ) {
            // don't do mouseovers on touchscreens
            Y.util.Event.on(tracks, "mouseover",  AlbumPage._handleSingleTrackMouseOver );
            Y.util.Event.on(tracks, "mouseout",  AlbumPage._handleSingleTrackMouseOut );    
        }
    },
    
    _handleSingleTrackMouseOver : function (event) {
        AlbumPage._showSingleTrackInfo( this );    
        Y.util.Dom.addClass(this, "mouseovertrack");
    },   
    
    _handleSingleTrackMouseOut : function (event) {
        
        var tracklist = elt( "track_table");
        var current_track = Y.util.Dom.getElementsByClassName( "current_track", "tr", tracklist ); 
        
        if (current_track[0] != this) { 
            AlbumPage._hideSingleTrackInfo(this);
        }    
        Y.util.Dom.removeClass(this, "mouseovertrack"); 
    }, 
    
    _showSingleTrackInfo : function( trackRowElem ){
        AlbumPage._showHideSingleTrackInfo( trackRowElem, true ) 
    },  
    
    _hideSingleTrackInfo : function ( trackRowElem ){
        AlbumPage._showHideSingleTrackInfo( trackRowElem, false )      
    },
    
    _showHideSingleTrackInfo : function ( trackRowElem, doShow ) {
      
        var newViz = doShow ? "visible" : "hidden";
        
        var lyr_link = Y.util.Dom.getElementsByClassName("info_link", "div", trackRowElem );
        var dl_link = Y.util.Dom.getElementsByClassName("dl_link", "div", trackRowElem );
        
        Y.util.Dom.setStyle( lyr_link, "visibility", newViz )
        Y.util.Dom.setStyle( dl_link, "visibility", newViz )
    }
};
;
/* ------------- BEGIN api.js --------------- */;
/* API: some wrappers that let you promise-ize API calls
    example:
    function api_do_foo(param1, param2) {
        var params = {
            param1 : param1,
            param2 : param2
        };
        return API.PostWithCrumb('somemodule', 1, 'do_foo', params);
        // result => promise for data returned from API
    }

    API.PostWithCrumb only supports POST and does the request via
    Crumb.ajax.  API.Http allows you to specify the request verb and
    uses $.ajax.
*/

var API = function() {
    "use strict";

    function Http(verb, module, version, method, params) {
        var d = $.Deferred()
        var apiurl = ["/api", module, version, method].join('/');
        $.ajax({
            url: apiurl,
            type: verb || "get",
            data: verb == "post" ? JSON.stringify(params) : params,
            dataType: "json",
            success: function(result) {
                if(result.error) {
                    d.reject(result.error);
                } else {
                    d.resolve(result);
                }
            },
            failure: function(err) {
                d.reject(err);
            }
        });
        return d.promise();
    }

    function PostWithCrumb(module, version, method, params) {
        var d = $.Deferred()
        var apiurl = ["/api", module, version, method].join('/');
        Crumb.ajax({
            type: 'POST',
            dataAs: 'JSON',
            url: apiurl,
            data: params,
            success: function (result) {
                if(result.error) {
                    d.reject(result.error);
                } else {
                    d.resolve(result);
                }
            },
            error: function (jqXHR, status, error) { d.reject(error); }
        });
        return d.promise();
    }
    
    return {
        Http : Http,
        PostWithCrumb : PostWithCrumb
    }
}();
;
/* ------------- BEGIN tralbum_updater.js --------------- */;

var TralbumUpdater = {
    DEFAULT_UPDATE_TIME : 5, //FIXME

    init : function() {
        var initialdata = { trackinfo: TralbumData.trackinfo,
                            refresh_secs : TralbumUpdater.DEFAULT_UPDATE_TIME,
                            tralbum_has_audio: TralbumData.hasAudio };

        TralbumUpdater._got_new_info(initialdata);
    },

    _got_new_info : function(newdata) {
        var need_update = false;
        var update_time = newdata.refresh_secs || TralbumUpdater.DEFAULT_UPDATE_TIME;
        var newinfo = newdata.trackinfo;

        for(var i=0; i<newinfo.length; i++)
        {
            if(TralbumUpdater._is_different(TralbumData.trackinfo[i], newinfo[i]))
            {
                TralbumUpdater._update_info(i, newinfo[i]);
            }

            if(newinfo[i].encoding_pending)
            {
                need_update = true;
            }
        }
        TralbumData.hasAudio = newdata.tralbum_has_audio;

        if(need_update)
        {
            setTimeout(TralbumUpdater._do_update, update_time * 1000);
        }
    },

    _is_different : function(oldinfo, newinfo) {
        var fields = [ "file", "title", "id", "title_link", "encoding_pending", "encoding_error", "private", "album_private" ];
        for(var i=0; i<fields.length; i++)
        {
            if(oldinfo[fields[i]] != newinfo[fields[i]])
                return true;
        }
        return false;
    },

    _update_info : function(i, trackinfo) {
        //fixme: what if the old track is playing?  this should be handled
        //by playlist
        TralbumData.trackinfo[i] = trackinfo;
        gplaylist.update_trackinfo(i, trackinfo);
    },

    _do_update : function() {
        var cb = {
            success: function(o) {
                var response = eval('(' + o.responseText + ')');
                TralbumUpdater._got_new_info(response);
            },
            failure: function(o) {
                Log.error("Error updating Tralbum info");
            }
        };

        var url = "/trackinfo?id=" + TralbumData.current.id + "&type=" + TralbumData.current.type;
        Y.util.Connect.asyncRequest( 'GET', url, cb, null );
    }
};
;
/* ------------- BEGIN inventory_updater.js --------------- */;
var Merch = Merch || {};

// Don't init any of this stuff unless TralbumData exists (i.e. not /indexpage)
('TralbumData' in window) &&
(function (window, $, TralbumData, BandData, CurrencyData, Merch) {
    var API_BASE = '/api',
        FAST_UPDATE_INTERVAL = 60,  // update every minute when there's low inventory;
        SLOW_UPDATE_INTERVAL = 300, // every 5 minutes when it's not.
        FAST_UPDATE_LIMIT = 15,     // only do 15 fast refreshes before reverting to slow.
        updateTimeout = null,
        updateCount = 0,
        xhr = null;

    $(window.document).ready(function () {
        if (haveQuantityWarning()) {
            // If any packages are close to sold out, immediately fetch the latest inventory
            // since the cached values might be out of date.
            Merch.updateInventory();
        }
        else {
            // Otherwise, the cached inventory is probably accurate enough so wait to update.
            scheduleUpdate();
        }
    });
    
    // In addition to the periodic updates, the cart calls this after adding/removing items.
    Merch.updateInventory = function (resetUpdateCount) {
        if (!TralbumData.packages) return;

        if (resetUpdateCount) updateCount = 0;
        
        // Already fetching -- don't start another one.
        if (xhr) return;

        var pkgIDs = [];
        Iter.each(TralbumData.packages, function (pkg) {
            // We only need to update items that are (or whose options are) inventory controlled.
            if (typeof pkg.quantity_available === 'number' ||
                (pkg.options && Iter.find(pkg.options, function (opt) { return typeof opt.quantity_available === 'number'; }))) {
                pkgIDs.push(pkg.id);
            }
        });
        if (pkgIDs.length === 0) {
            Log.debug('Not updating inventory because no packages are quantity-controlled');
            return;
        }

        // jQuery's xhr urlencodes param values when params is passed as an object. Because our
        // API server controller does its own query parsing which doesn't decode urlencoded param
        // values, we'll construct the query param by hand here in order to preserve the commas
        // in the merch_id list.
        var params = 'band_id=' + BandData.id + '&merch_id=' + pkgIDs.join(',');
        Log.debug('Fetching merch inventory', params);
        xhr = $.getJSON(API_BASE + '/merch/1/inventory', params)
        .done(function (data) {
            if (data.error) {
                Log.error('Error updating merch inventory', data);
            }
            else {
                refreshInventory(data.merch_inventory);
            }
        })
        .fail(function () {
            Log.error(arguments);
        })
        .always(function () {
            xhr = null;
            scheduleUpdate();
        });
    };

    function haveQuantityWarning() {
        if (!TralbumData.packages) return false;

        return Iter.find(TralbumData.packages, function (p) { return p.quantity_warning; });
    }

    function scheduleUpdate() {
        if (!TralbumData.packages) return;

        var delay = updateCount < FAST_UPDATE_LIMIT && haveQuantityWarning() ?
                    FAST_UPDATE_INTERVAL : SLOW_UPDATE_INTERVAL;

        if (updateTimeout) clearTimeout(updateTimeout);
        Log.debug('Scheduling inventory update in ' + delay + ' seconds');
        updateTimeout = setTimeout(function () {
            updateTimeout = null;
            updateCount++;
            Merch.updateInventory();
        }, delay * 1000);
    }

    function refreshInventory(data) {
        if (!TralbumData.packages) return;

        Log.debug('Refreshing merch inventory', data);
        Iter.each(TralbumData.packages, function (pkg) {
            var inventory = data[pkg.id];
            if (!inventory) return;
            
            pkg.quantity_available = inventory.quantity_available;
            pkg.quantity_limits = inventory.quantity_limits;
            pkg.quantity_warning = inventory.quantity_warning;
            if (pkg.options && inventory.options) {
                Iter.each(pkg.options, function (opt) {
                    opt.quantity_available = inventory.options[opt.id];
                });
            }
            renderInventory(pkg);
        });
    }

    function renderInventory(pkg) {
        Log.debug('Rendering package ' + pkg.id);
        
        var package_index = Iter.index(TralbumData.packages, pkg);
        var blob = $("#pagedata").length ? ($("#pagedata").data("blob") || {}) : {};
        
        var templateHash = {
                package: pkg,
                package_index: package_index,
                currency_data: CurrencyData,
                digital_preorder: TralbumData.album_is_preorder,
                digital_preorder_release_date: TralbumData.album_is_preorder ? TralbumData.album_release_date : null,
                cfg: blob.cfg || {},
                viewing_as_subscriber: Identities.subscribedToPageBand(),
                logged_in: !!Identities.user(),
                login_bounce_url: blob.login_bounce_url,
                item_sellers: blob.item_sellers
            };
        $('#package-title-' + pkg.id).renderLiquid('_package_listing_title', templateHash);
        var $price = $('#package-price-' + pkg.id).renderLiquid('_package_listing_price', templateHash);
        
        // wire the buy links
        $('.order_package_link.[data-pkg="' + package_index + '"]').click(function(ev){
            ev.preventDefault();
            var isGift = !!$(this).closest('.send-as-gift')[0];
            PackageOrder.begin(package_index, isGift);
            if (TralbumData.item_type == "track") {
                Stats.record({kind:"click", click:"t_order_package_link"});
            }
        });
        
        if (window.Fixup && Fixup.compoundButtons) {
            // rewire the mobile-friendly compound buttons
            Fixup.compoundButtons($price.find('.compound-button'));
        }
    }

})(window, jQuery, TralbumData, BandData, CurrencyData, Merch);
;
/* ------------- BEGIN tralbumish.js --------------- */;
/* global PopupImage */
/* Common to all tralbum-ish pages */

$(document).ready(function () {
    "use strict";
    
    if ($().lazyload !== undefined) {
        $(".artists-grid img.lazy, .music-grid img.lazy, .merch-grid img.lazy").lazyload({
            threshold: 500,
            effect: "fadeIn",
            effectspeed: 100
        });
    }

    if (window.PopupImage !== undefined) {
        PopupImage.attach("a.popupImage");
    }
});
;
/* ------------- BEGIN artists_page.js --------------- */;
/*global Cart */


(function () {
    "use strict";
	
	$(document).ready(function() {
    	if ( $(window.Cart) && $("#pagedata").data("blob").label && $("#pagedata").data("blob").label.artist_grid ) {
        	Cart.startup();
    	}
    });

})();;
/* ------------- BEGIN tpl_label_band_selector --------------- */;
if (Templ) { Templ.register({
"label/band_selector" : [{"blocks":[{"attachment":["\n\n    <div class='label-band-selector'>\n        Show:\n        <select data-bind='value: selectedOption'>\n            <option value=\"all\">all artists</option>\n            <option data-bind='value: labelBand().id, text: labelBand().name, visible: labelHasOwnItems'></option>\n            <!-- ko foreach: memberBands -->\n                <option data-bind='value: id, text: name'></option>\n            <!-- /ko -->\n        </select>\n    </div>\n\n"],"expression":"is_phone ","type":"ncondition"},{"attachment":["\n\n    <div class='label-band-selector fade-in-on-load loading'>\n        <span class='label'>Show:</span>\n        <ul class='tabs'>\n            <li class='all'>\n                <a class='selected themeable' data-bind='css: {selected: selected_all}, click: select_all'>\n                    all\n                </a>\n            </li>\n            <li class='bands' data-bind=\"css: columnClasses\">\n                <a class='themeable bands-menu-title' data-bind='css: {selected: selected_member_band}'>\n                    <span data-bind='text: selected_band_name'>artists</span>\n                    <!--[if gte IE 9]><!-->\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 8 4\" width=\"8\" height=\"8\">\n                        <path class=\"caret\" d=\"M 0 0 L 8 0 4 4 0 0\" />\n                    </svg>\n                    <!--<![endif]-->\n                    <!--[if lte IE 8]>\n                    <span class=\"bc-ui menucaret\"></span>\n                    <![endif]-->\n                </a>\n                <div class='bands-menu multi-column-artist-menu'>\n                <!-- ko foreach: {data: memberBandCols} -->\n                    <ol data-bind='foreach: bands'>\n                        <li>\n                            <a class=\"themeable menu-artistitem\" data-bind='click: $root.select_band'>\n                                <span class=\"menu-artistpic\">\n                                    <!-- ko if: photo -->\n                                    <img data-bind=\"src_image: {image_id: photo, format: 'bio_navbar'}\">\n                                    <!-- /ko -->\n                                </span>\n                                <span data-bind=\"text: name\" class=\"menu-bandname\"></span>\n                            </a>\n                        </li>\n                    </ol>\n                <!-- /ko -->\n                </div>\n            </li>\n            <li class='label' data-bind='visible: labelHasOwnItems'>\n                <a class='themeable' data-bind='",{"blocks":[{"attachment":["text: labelBand().name"],"expression":"merch_page ","type":"ncondition"}],"type":"ef"},", css: {selected: selected_label}, click: select_label'>compilations, etc</a>\n            </li>\n        </ul>\n    </div>\n\n"],"type":"else_ncondition"}],"type":"ef"},"\n"]
}); };
/* ------------- BEGIN band_selector.js --------------- */;
/* global MediaView, Url */

// exports LabelBandSelectorVM as a global so stats page can create a single vm shared across multiple widgets.
var LabelBandSelectorVM = (function ($, ko) {
    'use strict';

    $.widget('bc.bclabelbandselector', {
        options: {
            labelBand: null,
            memberBands: [],
            onBandSelect: $.noop,
            labelHasOwnItems: false,
            merchPage: false,
            queryParam: null,

            // optionally provide a pre-made LabelBandSelectorVM to use a shared instance across multiple widgets.
            vm: null
        },

        _create: function() {
            var self = this;

            $(this.element).renderLiquid('label/band_selector', {   
                is_phone:   MediaView.mode === 'phone', 
                merch_page: this.options.merchPage
            });
            var vm = this.options.vm || new LabelBandSelectorVM(this.options);
            ko.applyBindings(vm, this.element[0]);

            var $selector = this.element.find('.label-band-selector'),
                $menu = this.element.find('.bands-menu'),
                $menuTitle = this.element.find('.bands-menu-title'),
                $phoneSelect = this.element.find('select');

            if (vm.selected_band()) {
                self._trigger('onBandSelect', null, vm.selected_band());
            }
            
            vm.selected_band.subscribe(function (band) {
                self._trigger('onBandSelect', null, band);
                $menu.bcmenu('hide');
                $phoneSelect.blur();
            });
            vm.memberBands.subscribe(function () {
                $menu.bcmenu('refresh');
            });

            $menuTitle.click(function () {
                if ($menu.is(':visible')) {
                    $menu.bcmenu('hide');
                }
                else {
                    $menu.bcmenu('show');
                }
            });

            this._super();
            $menu.bcmenu({
                triggerElements: $menu.closest('.bands'),
                menus: "ul"
            });

            $selector.removeClass('loading');
            this.viewModel = function () {return vm;}; // Expose viewModel as a public method.
        }
    });

    return function LabelBandSelectorVM(options) {
        var self = this,
            label_band = options.labelBand,
            member_bands = options.memberBands || [],
            labelHasOwnItems = options.labelHasOwnItems;

        this.labelBand = ko.observable(label_band);
        this.memberBands = ko.observableArray(member_bands);
        this.labelHasOwnItems = ko.observable(labelHasOwnItems);

        this.numCols = ko.computed(function () {
            return Math.min(Math.floor((self.memberBands().length - 1) / 9) + 1, 3);
        });
        this.columnClasses = ko.computed(function () {
            var c = 'col' + self.numCols();
            if (self.numCols() > 1) {
                c += ' has-multiple-columns';
            }
            return c;
        });
        this.memberBandCols = ko.computed(function () {
            var lbands, colHeight, columns;

            lbands = self.memberBands.slice(0);
            colHeight = Math.ceil(lbands.length / self.numCols());
            columns = [];

            while (lbands.length > 0) {
                columns.push({bands: lbands.splice(0, colHeight)});
            }
            return columns;
        });

        this.selected_band_id = ko.observable(getBandIDFromURL());
        this.selected_band_id.subscribe(setBandIDInURL);
        this.selected_band = ko.computed(function () {
            var id = self.selected_band_id();
            if (id === self.labelBand().id) return self.labelBand();
            else return Iter.find(self.memberBands(), function (band) {
                return band.id === id;
            });
        });

        this.select_all = function () {
            self.selected_band_id(null);
        };
        this.selected_all = ko.computed(function () {
            return !self.selected_band_id();
        });

        this.select_label = function () {
            self.selected_band_id(self.labelBand().id);
        };
        this.selected_label = ko.computed(function () {
            return self.selected_band_id() === self.labelBand().id;
        });

        this.select_band = function (band) {
            self.selected_band_id(band.id);
        };
        this.selected_member_band = ko.computed(function () {
            return self.selected_band() && self.selected_band() !== self.labelBand();
        });
        this.selected_band_name = ko.computed(function () {
            return self.selected_member_band() ? self.selected_band().name : 'artists';
        });

        function getBandIDFromURL() {
            if (!options.queryParam) return null;

            var search = Url.parseQuery(window.location.search),
                bandID = parseInt(search[options.queryParam], 10);
            if (!bandID) return null;

            var validBands = self.memberBands().slice();
            validBands.push(self.labelBand());
            if (Iter.find(validBands, function (band) { return band.id === bandID; })) {
                return bandID;
            }
            return null;
        }

        function setBandIDInURL(id) {
            if (!options.queryParam) return;

            if (('history' in window) && ('function' === typeof window.history.replaceState)) {
                var url = window.location.pathname,
                    params = Url.parseQuery(window.location.search);
                if (id) {
                    params[options.queryParam] = id;
                }
                else {
                    delete params[options.queryParam];
                }
                url = Url.addQueryParams(url, params);
                if (window.location.hash) {
                    url += window.location.hash;
                }
                history.replaceState(null, document.title, url);
            }
        }

        // for the mobile <select> version
        this.selectedOption = ko.computed({
            read: function () {
                return self.selected_band_id() || 'all';
            },
            write: function (val) {
                if (val === 'all') self.selected_band_id(null);
                else {
                    self.selected_band_id(parseInt(val, 10));
                }
            }
        });
    }
})(jQuery, ko);
;
/* ------------- BEGIN grid_band_selector.js --------------- */;
/* global Url */
(function (ko) {
    'use strict';

    // Activate the label band selector on music and merch grid pages
    $(".label-band-selector-grid").each(function () {
        var data = $(this).data("label-band-selector");
        if (data) {
             $(this).bclabelbandselector({
                labelBand: data.label_band,
                memberBands: data.member_bands,
                labelHasOwnItems: data.label_has_own_items,
                merchPage: $("#pagedata").data("blob").merch_page,
                queryParam: 'filter_band',
                onBandSelect: selectedBand,
            });
        }
    });

    // callback to fire when a band is selected
    function selectedBand(event, band) {
        var band_id = band && band.id, 
            $grid = $('.editable-grid'), $listItems = $('.editable-grid > li');
        var $featuredGrid = $('.featured-grid');

        $featuredGrid.hide();
        $featuredGrid.addClass('filtered');

        if ($grid.length === 0){
            $grid = $('.def-grid');
            $listItems = $('.def-grid > dt, .def-grid > dd');
        }

        if ($grid.length === 0){
            return;
        }

        $listItems.each(function () {
            var $anchor = $(this).find('a'),
                urlHash = Url.toHash($anchor.attr('href')),
                urlParams = Url.parseQuery(urlHash.search);

            if (band_id) urlParams.filter_band = band_id;
            else delete urlParams.filter_band;

            urlHash.search = '?' + Url.joinQuery(urlParams);
            $anchor.attr('href', Url.fromHash(urlHash));
        });

        if (band_id) {
            $grid.addClass('filtered');
            
            if ($featuredGrid[0] && ko.dataFor($featuredGrid[0])) {
                ko.dataFor($featuredGrid[0]).switchFilterMode(true);
            } 

            $listItems.filter('[data-band-id!="' + band_id + '"]').hide().removeClass('odd');

            var odd = true;
            Iter.each($listItems.filter('[data-band-id="' + band_id + '"]'), function(element) {
                $(element).removeClass('odd');
                if (odd) {
                    $(element).addClass('odd');
                }
                $(element).show();
                odd = !odd;
            });

            $('img.lazy:visible', $grid).trigger('appear');
            if ($('.editable-grid.private > li:visible').length === 0) {
                $('#private-merch-heading').hide();
            } else {
                $('#private-merch-heading').show();
            }
        } else {
            $grid.removeClass('filtered');
            $featuredGrid.removeClass('filtered');
            if ($featuredGrid[0] && ko.dataFor($featuredGrid[0])) {
                ko.dataFor($featuredGrid[0]).switchFilterMode(false);
            } else {
                $featuredGrid.show();
            }
            $listItems.filter('.featured').hide();
            
            var odd = true;
            Iter.each($listItems.not('.featured'), function(element) {
                $(element).removeClass('odd');
                if (odd) {
                    $(element).addClass('odd');
                }
                odd = !odd;
            });
            
            $listItems.not('.featured').show();
            $('#private-merch-heading').show();
        }

        var gridSize = $('.editable-grid > li:visible').length;
        if (gridSize == 2 || gridSize == 4) {
            $grid.removeClass("columns-3");
            $grid.removeClass("columns-4");
            $grid.addClass("columns-2");
        } else if (gridSize < 7) {
            $grid.removeClass("columns-2");
            $grid.removeClass("columns-4");
            $grid.addClass("columns-3");
        } else {
            $grid.removeClass("columns-2");
            $grid.removeClass("columns-3");
            $grid.addClass("columns-4");
        }

    }
}(ko));
;
/* ------------- BEGIN cart.js --------------- */;


TPController.country_picker = function( paths, params, url, event) {
    Sidecart.show_country_pref(event);
};

var Sidecart = null;

$.extend( Cart, {

    // for Cart.init_data: see cart_head.js
    NO_AMT: "- -&nbsp;",

    startup: function() {
        Sidecart = Cart.make();
    },

// ---------------------------------------------------------------------

    make: function() {
        return Object.create(Cart).init();
    },

    init: function() {
        var self = this;
        var i;

        this.initing = true;

        this.el = elt("sidecart");
        this.item_list_el = elt("item_list");
        this.summary_el = elt("sidecartSummary");

        Y.util.Event.on("sidecartCheckout", "click", function(ev) {self.checkout(ev, 'cart');});
        if ( window.MediaView && MediaView.mode == "phone" ) {
            var navCartLink = $("#menubar #cart-item a");
            if (navCartLink.length) {
                // new version for pages which have the cart mixed in with menubar elements
                navCartLink.off("click"); // clear placeholder from Cart.renderInitial
                Dom.hackLinkClicksThanksSafari( navCartLink[0], function() {
                    Log.note( "click on cart element '#menubar #cart-item a':" );
                    self.toggle_cart_phone();
                    return false;
                } );
            }
            else
                $("#sidecartHeader").on( "click", function() { self.toggle_cart_phone(); } );
        }

        ClientPrefs.update(Cart.init_data);
        this.country_pref = CountryPrefPanel.make(function(new_country) {self.oncountry_change(new_country);});

        this.reset(Cart.init_data);
        this.initing = false;

        this.contains = {};

        return this;
    },

    reset: function(data) {
        this.clear(false);

        if (data) {
            this.sync_num = data.sync_num;
            if (data.items && data.items.length > 0) {
                for (i = 0; i < data.items.length; ++i)
                    this.add_item_to_list(data.items[i], false);
                this.update_packages();
            }
            this.snarf_cart_summary(data, !this.initing);
        }

        if (this.cart_items.length > 0)
            this.show_cart(false, this.has_shipping);
        else
            this.hide_cart(false);
    },

    needs_resync: function(data) {
        if (data.resync)
            this.reset(data.cart_data);
        else
            this.sync_num = data.sync_num;

        return data.resync;
    },

    // Update both the client cart and server cart (if needed)
    // A lot of these args are used to pre-fill the item's data in the cart, instead of having to wait for the xhr roundtrip;
    // they're ignored on the server side.
    // args.checkout_now
    // args.item_title
    // args.item_title2
    // args.item_type
    // args.item_id
    // args.band_id
    // args.artist_name
    // args.unit_price
    // args.currency
    // args.quantity
    // args.preorder  -- not used
    // args.has_download  -- not used
    // args.option_id
    // args.option_name
    // args.discount_id
    // args.discount_type
    // args.url
    // args.art_id
    // args.purchase_note
    // args.notify_me
    // args.notify_me_label
    // args.is_gift
    // args.gift_sender_name
    // args.gift_recipient_email
    // args.gift_recipient_name
    // args.gift_sender_note
    add_to_cart: function(args) {
        var data = {};
        var i, ignore = false;
        var revealing_cart;

        this.checking_out = this.checking_out || args.checkout_now;
        revealing_cart = (this.cart_items.length === 0);

        if (revealing_cart) {
            this.sync_num = 1;
        } else {  // something's in the cart? update it.
            // look for duplicates
            for (i = 0; i < this.cart_items.length; ++i) {
                var item = this.cart_items[i];
                if (args.item_type == item.item_type && args.item_id == item.item_id && args.gift_recipient_email == item.gift_recipient_email) {

                    // the purchase note, notify-me, notify-me-label don't need to perform any UI updates - just update the client and server
                    // values as needed.  the if/else tree below currently fires a request for only the first change that it detects
                    // to the existing cart item, so use purchase_note_changed, notify_me_changed , notify_me_label_changed signals in the data hash to allow
                    // those changes to piggyback on those other requests and have the server process them at the same time.
                    //
                    // ALSO NOTE: the server doesn't include purchase note, notify-me, and notify-me-label values for existing items when serving the page,
                    //            so first time through here for an existing cart item won't have the server values.
                    if (item.purchase_note != args.purchase_note) {
                        item.purchase_note = args.purchase_note;
                        data.purchase_note = args.purchase_note;
                        data.purchase_note_changed = true;
                    }

                    if (item.notify_me != args.notify_me) {
                        item.notify_me = args.notify_me;
                        data.notify_me = args.notify_me;
                        data.notify_me_changed = true;
                    }

                    if (item.notify_me_label != args.notify_me_label) {
                        item.notify_me_label = args.notify_me_label;
                        data.notify_me_label = args.notify_me_label;
                        data.notify_me_label_changed = true;
                    }

                    if (args.item_type == 'p' && args.unit_price == item.unit_price && args.option_id == item.option_id &&
                        args.discount_id == item.discount_id && args.discount_type == item.discount_type &&
                        args.shipping_street == item.shipping_street && args.shipping_street_2 == item.shipping_street_2 &&
                        args.shipping_city == item.shipping_city && args.shipping_state == item.shipping_state && 
                        args.shipping_zip == item.shipping_zip && args.shipping_country_code == item.shipping_country_code) {
                        // same package, same recipient address (if gift), just update quantity

                        args.quantity += item.quantity;
                        data.req = "update_quantity";
                        data.id =  item.id;
                        data.quantity = args.quantity;

                        this.update_quantity(item, args.quantity);

                        break;
                        
                    } else if (args.item_type == 'a' || args.item_type == 't') {
                        if ((args.discount_id != item.discount_id) && (args.discount_type != item.discount_type)) {

                            // fan applies discount code to tralbum already in the cart
                            data.req = "update_discount_id"; 
                            data.id = item.id; 
                            data.unit_price = args.unit_price;
                            data.discount_id = args.discount_id;
                            data.discount_type = args.discount_type;

                            this.update_discount_id(item, args.unit_price, args.discount_id, args.discount_type);
                            
                        } else if (args.unit_price != item.unit_price) {
                            // fan changes NYP value -or- adds same item with artist-modified price     
                            data.req = "update_unit_price";
                            data.id = item.id; 
                            data.unit_price = args.unit_price;
                            this.update_unit_price(item, args.unit_price);
                            
                        } else {
                            // same album or track. can usually ignore, unless there's a change in
                            // purchase note, notify-me, or notify-me-label.
                            // TODO: Why are these "if / else if"'s? If there has been a change in the purchase note for instance, 
                            // that causes a change in the other two vlues to be overlooked (I think, right?) rs 11/24/2014
                            if (typeof data.purchase_note != "undefined") {
                                data.req = "update_purchase_note";
                                data.purchase_note = data.purchase_note || "";
                                data.id = item.id;
                            } else if (typeof data.notify_me != "undefined") {
                                data.req = "update_notify_me";
                                data.notify_me = data.notify_me || false;
                                data.id = item.id;
                            } else if (typeof data.notify_me_label != "undefined") {
                                data.req = "update_notify_me_label";
                                data.notify_me_label = data.notify_me_label || false;
                                data.id = item.id;
                            }else {
                                ignore = true;
                            }
                        }

                        break;
                    } 
                }
            }
        }

        if (this.checking_out)
            this.checkout_wait();

        if (ignore) {
            if (this.checking_out)
                this.checkout(null, 'dialog');
        } else {
            if ( $.isEmptyObject(data) || typeof data.req == 'undefined' || data.req === null) {
                args.local_id = "" + Math.random();
                this.add_item_to_list(args, !revealing_cart);

                data = {};
                data.req = "add";
                data.local_id =               args.local_id;
                data.item_type =              args.item_type;
                data.item_id =                args.item_id;
                data.unit_price =             args.unit_price;
                data.quantity =               args.quantity;
                data.option_id =              args.option_id;
                data.discount_id =            args.discount_id;
                data.discount_type =          args.discount_type;
                data.download_type =          args.download_type;
                data.download_id =            args.download_id;
                data.purchase_note =          args.purchase_note;
                data.notify_me =              args.notify_me;
                data.notify_me_label =        args.notify_me_label;
                data.band_id =                args.band_id;

                if (args.is_gift) {
                    data.is_gift =                true;
                    data.gift_sender_name =       args.gift_sender_name;
                    data.gift_recipient_email =   args.gift_recipient_email;
                    data.gift_recipient_fan_id =  args.gift_recipient_fan_id;
                    data.gift_recipient_name =    args.gift_recipient_name;
                    data.gift_sender_note =       args.gift_sender_note;

                    if (args.is_physical_gift) {
                        data.shipping_street       = args.shipping_street;
                        data.shipping_street_2     = args.shipping_street_2;
                        data.shipping_city         = args.shipping_city;
                        data.shipping_state        = args.shipping_state;
                        data.shipping_zip          = args.shipping_zip;
                        data.shipping_country_code = args.shipping_country_code;
                        data.shipping_country_name = args.shipping_country_name;
                    }
                }

                if ( window.FanControls && FanControls.fan_id )
                    data.fan_id = FanControls.fan_id;
            }

            if ( window.ReferrerToken ) { // go through window so we're not broken by missing data
                data.ref_token = window.ReferrerToken;
            }

            if (revealing_cart)
                this.show_cart(true, args.item_type == 'p');  // assume shipping if it's a package
            else
                this.hide_summary(true, revealing_cart);

            var req_id = this.request(data, true);
            if (this.checking_out) {
                this.checkout_after = req_id;
            }
        }
        
        if ( !this.checking_out ) {
            if ( window.MediaView && MediaView.mode == "phone" ) {
                var self = this;
                BubbleMessage("Item added to cart")
                    .addClass("added-to-cart")
                    .on( "click", function() {
                        $(this).remove();
                        Dom.scrollToElement(document.body);
                        self.show_cart_phone();
                    } );
            }
            else if ( window.FacebookData && window.FB && window.FB.Canvas && window.FB.Canvas.scrollTo )
                FB.Canvas.scrollTo(0,0);
        }
    },
    
    show_cart: function(animating, assume_shipping) {
        if (this.checking_out)
            return;

        var self = this;

        this.rev_el = elt("sidecartReveal");
        this.con_el = elt("sidecartBody");
        this.el.style.display = "block";
        if (MediaView.mode == "phone") {
            $("#menubar #cart-item-divider").show();
            $("#menubar #cart-item").show();
        }
        
        // This helps style the bio that may be visible below the cart.
        Y.util.Dom.addClass("rightColumn", "cart-visible");

        if (animating) {
            this.clear_summary(assume_shipping);
            this.anim = new Y.util.Anim(this.rev_el);
            this.anim.init(this.rev_el, {height: {from: 0, to: this.con_el.offsetHeight}}, 0.25, Y.util.Easing.easeOut);
            this.anim.onComplete.subscribe(function() {self.rev_el.style.height = 'auto';});
            this.anim.animate();
        } else {
            this.rev_el.style.height = "auto";
        }
    },

    delete_from_cart: function(cart_item) {
        var hiding_cart;

        hiding_cart = (this.cart_items.length == 1);

        if (hiding_cart) {
            this.delete_item_from_list2(cart_item.local_id);
            this.hide_cart(true, cart_item);
        } else {
            this.delete_item_from_list(cart_item.local_id, null, true);
            this.hide_summary(false);
        }

        if (cart_item.id) {
            // if we don't have an id yet, it's because we haven't received it from resp_add.
            this.request({req:"del", id:cart_item.id}, true);
        } else {
            // Log.debug("Can't delete yet, waiting on resp_add for " + cart_item.local_id);
        }

    },

    hide_cart: function(animating, last_cart_item) {
        var ff = (function(f_this, f_last_cart_item) {return function() {
            if (f_last_cart_item)
                f_this.item_list_el.removeChild(f_last_cart_item.el);
            f_this.el.style.display = 'none';            
            Y.util.Dom.removeClass("rightColumn", "cart-visible");
            if (MediaView.mode == "phone") {
                $("#menubar #cart-item-divider").hide();
                $("#menubar #cart-item").hide();
            }
            f_this.clear(true);
        };}(this, last_cart_item));
        
        if (animating) {
            this.rev_el = elt("sidecartReveal");
            this.anim = new Y.util.Anim(this.rev_el);
            this.anim.init(this.rev_el, {height: {to: 0}}, 0.15, Y.util.Easing.easeNone);
            this.anim.onComplete.subscribe(ff);
            this.anim.animate();
        } else {
            ff();
        }
    },

    request: function(data, add_id) {
        var self = this;
        var req_id = null;
        var cb = {
            success: function(o) {self.resp_success(o);}, 
            failure: function(o) {self.resp_failure(o);}
        };
        data.client_id = ClientID;
        data.sync_num = this.sync_num || 1;
        if (add_id) {
            req_id = "" + Math.random();
            this.last_req_id = data.req_id = req_id;
        }
        var d = Url.joinQuery(data);
        Y.util.Connect.asyncRequest('POST', '/cart/cb', cb, d);
        return req_id;
    },

    resp_success: function(o) {
        var data = eval('(' + o.responseText + ')');

        if (data.req == "add") {
            this.resp_add(data);
        } else if (data.req == "del") {
            this.resp_del(data);
        } else if (data.req == 'update_quantity' || data.req == 'update_unit_price' || data.req == 'update_discount_id' 
                || data.req == 'update_purchase_note' || data.req == 'update_notify_me' || data.req == 'update_notify_me_label') {
            this.resp_update(data);
        } else if (data.req == "country") {
            this.resp_country(data);
        }

        if (data.unexpected_error) {
            alert("An unexpected error occurred with the cart.");
            this.resp_update(data);  // probably received a resync
        }
    },

    resp_failure: function(o) {
    },

    resp_add: function(data) {
        if (!this.needs_resync(data)) {

            var i, found = false;
            for (i = 0; i < this.cart_items.length; ++i) {
                var item = this.cart_items[i];
                if (item.local_id == data.local_id) {
                    item.id = data.id;
                    found = true;
                    break;
                }
            }
            if (!found) {
                // the item has been deleted. Turn right around and delete it from the db too.
                // Log.debug("Deleting just-added item " + data.local_id);
                this.request({req:"del", id:data.id}, true);
            }
            this.snarf_cart_summary(data, true);
            this.update_packages();

        }

        this.maybe_checkout(data.req_id);
    },

    resp_del: function(data) {
        if (!this.needs_resync(data)) {
            this.snarf_cart_summary(data, true);
            this.update_packages(true);
        }

        this.maybe_checkout(data.req_id);
    },

    snarf_cart_summary: function(data, update) {
        if (data.req_id && data.req_id != this.last_req_id)
            return;

        if (data.currency) {
            this.subtotal = data.subtotal;
            this.has_shipping = data.has_shipping;
            this.shipping = data.shipping;
            this.has_tax = data.has_tax;
            this.tax = data.tax;
            ClientPrefs.update(data);  // snarf client prefs too
        }
        if (update)
            this.update_summary();
    },

    clear: function(clear_template) {
        var params;

        this.has_shipping = false;
        this.checking_out = false;
        this.checkout_after = null;

        if (this.anim)
            this.anim.stop(false);

        if (this.cart_items) {
            var i;
            for (i = 0; i < this.cart_items.length; ++i) {
                var cart_item = this.cart_items[i];
                cart_item.kill();
                this.item_list_el.removeChild(cart_item.el);
            }
        }
        this.cart_items = [];

        if (clear_template)
            this.clear_summary(false);
    },

    add_item_to_list: function(item_data, animate) {
        var self = this;
        var cart_item = CartItem.make(this, item_data, this.initing);         
        this.cart_items.push(cart_item);
        if (!this.initing && !this.checking_out) {
            this.item_list_el.appendChild(cart_item.el);
            cart_item.animate(true, null, animate);
            this.update_item_list();
            this.update_cart_contains();
        }  
    },

    delete_item_from_list: function(local_id, complete_func, animate) {
        var cart_item = this.delete_item_from_list2(local_id);
        var ff = (function(f_this, f_cart_item, f_complete_func) {return function() {
            f_this.item_list_el.removeChild(f_cart_item.el);
            // Log.debug("removing cart_item");
            if (f_complete_func)
                f_complete_func();
        };}(this, cart_item, complete_func));
        cart_item.animate(false, ff, animate);
        this.update_item_list();
        this.update_cart_contains();
    },

    delete_item_from_list2: function(local_id) {
        var i;
        for (i = 0; i < this.cart_items.length; ++i) {
            var cart_item = this.cart_items[i];
            if (cart_item.local_id == local_id) {
                this.cart_items.splice(i, 1);
                return cart_item;
            }
        }
    },

    update_quantity: function(cart_item, quantity) {
        cart_item.quantity = quantity;
        if (!this.checking_out)
            cart_item.update();
    },
    
    update_discount_id: function(cart_item, unit_price, discount_id, discount_type) {
        cart_item.discount_id = discount_id;
        cart_item.discount_type = discount_type;
        cart_item.unit_price = unit_price;
        if (!this.checking_out)
            cart_item.update();
    },
    
    update_unit_price: function(cart_item, unit_price) {
        cart_item.unit_price = unit_price;
        if (!this.checking_out)
            cart_item.update();
    },

    update_item_list: function() {
        var i;
        for (i = 0; i < this.cart_items.length; ++i) {
            var cart_item = this.cart_items[i];
            if (i === 0) {
                Y.util.Dom.addClass(cart_item.el, "first");
            } else {
                Y.util.Dom.removeClass(cart_item.el, "first");
            }
            if (i == this.cart_items.length - 1) {
                Y.util.Dom.addClass(cart_item.el, "last");
            } else {
                Y.util.Dom.removeClass(cart_item.el, "last");
            }
        }
        // transitioning to new ui: cart number lives in a different place
        var item_count = $("#sidecart .cart-number");
        if ( item_count.length )
            item_count.text( this.cart_items.length );
        item_count = $("#menubar .cart-number");
        if ( item_count.length )
            item_count.text( this.cart_items.length );
        this.country_pref.hide();
    },

    hide_summary: function(immediate) {
        if (this.checking_out)
            return;

        if (this.summary_hidden)
            return;

        var ff;
        var self = this;

        ff = function() {
            var e1 = elt("cartSubtotal"), e2 = elt("cartShipping");
            if (e1)
                e1.innerHTML = self.NO_AMT;
            if (e2)
                e2.innerHTML = self.NO_AMT;
            self.hide_timeout_id = null;
        };

        if (immediate)
            ff();
        else
            this.hide_timeout_id = setTimeout(ff, 0.5*1000);
        this.summary_hidden = true;
    },

    clear_summary: function(has_shipping) {
        var params;

        params = {};
        params.currency = ClientPrefs.currency;
        params.has_shipping  = has_shipping;
        params.disp_subtotal = this.NO_AMT;
        params.disp_shipping = this.NO_AMT;
        params.country       = ClientPrefs.country;
        params.country_name  = ClientPrefs.country_name;
        params.us_state      = ClientPrefs.us_state;
        params.us_zip        = ClientPrefs.us_zip;
        params.disp_total    = this.NO_AMT;
        params.has_tax       = false;  // this is purely for visuals
        params.contains      = this.contains;
        this.summary_el.innerHTML = Templ.render("cart/sidecart_summary", params);
    },

    update_summary: function() {
        var i;
        var params;
        var currency_info;
        var total;

        if (this.hide_timeout_id) {
            clearTimeout(this.hide_timeout_id);
            this.hide_timeout_id = null;
        }
        this.summary_hidden = false;

        if (this.cart_items.length === 0)
            return;

        this.country_pref.hide();

        currency_info = CurrencyData.info[ClientPrefs.currency];

        params = {};
        params.currency = ClientPrefs.currency;

        total = this.subtotal;

        params.has_shipping = this.has_shipping;
        if (this.has_shipping) {
            params.disp_shipping = TextFormat.currency(this.shipping, currency_info, false, true, true);
            total += this.shipping;

            params.country      = ClientPrefs.country;
            params.country_name = ClientPrefs.country_name;
            params.us_state     = ClientPrefs.us_state;
            params.us_zip       = ClientPrefs.us_zip;
        }

        params.has_tax = this.has_tax;
        if (this.has_tax && this.tax > 0) {
            params.disp_tax = TextFormat.currency(this.tax, currency_info, false, true, true);
            total += this.tax;
        }

        params.disp_subtotal = TextFormat.currency(this.subtotal, currency_info, false, true, true);
        params.disp_total = TextFormat.currency(total, currency_info, false, true, true);

        if (ClientPrefs.currency == 'RUP' && total > 99) {
              params.disp_total = "99";
        }

        params.contains = this.contains;

        this.summary_el.innerHTML = Templ.render("cart/sidecart_summary", params);
    },

    update_cart_contains: function(){
        this.contains = {
            physical_gift: false
        };
        for (var i = 0; i < this.cart_items.length; i ++) {
            if (this.cart_items[i].is_gift && this.cart_items[i].item_type == "p") {
                this.contains.physical_gift = true;
            }
        }
    },

    // Update package quantities in real-time if any of the cart items are displayed on this page.
    // Normally, we only fetch inventory from the server if the current cart contains a package on this page;
    // passing true for forceInventoryRefresh forces a refresh, e.g. for updating inventory after removing items
    // from the cart.
    update_packages: function(forceInventoryRefresh) {
        if (!window.TralbumData || !TralbumData.packages) return;

        var self = this,
            pkgsInCart = false;

        // Set the page's packages cart_quantity variables.
        Iter.each(TralbumData.packages, function (pkg) {
            var item = Iter.find(self.cart_items, function (i) {
                    return i.item_type === 'p' && i.item_id === pkg.id;
                });
            if (item) {
                pkgsInCart = true;
                pkg.cart_quantity = item.quantity;
            }
            else {
                pkg.cart_quantity = null;
            }
        });

        // Get fresh inventory from the server if any of the page's packages are in the cart.
        if ((pkgsInCart || forceInventoryRefresh) && ('Merch' in window) && Merch.updateInventory) {
            Merch.updateInventory(true);
        }
    },

    show_country_pref: function(ev) {
        var self = this;
        var target = ev.target || ev.srcElement;
        Y.util.Event.preventDefault(ev);
        this.country_pref.show(target, false);
    },

    oncountry_change: function(new_country) {
        if (this.cart_items.length > 0) {
            this.country_pref.hide();
            this.hide_summary(false);
            this.request({req: 'country', country: new_country.country, us_zip: new_country.us_zip});
        }
    },

    // Received updated summary; display it.
    resp_country: function(data) {
        this.snarf_cart_summary(data, true);
    },

    // if quantity, price, or discount of an extant cart item has changed
    resp_update: function(data) {
        if (!this.needs_resync(data)) {
            this.snarf_cart_summary(data, true);
        }

        this.maybe_checkout(data.req_id);
        this.update_packages();
    },

    checkout_wait: function() { 
        if (window.FacebookData) {
            var patchYui = false;
            FacebookUtils.correctSrollThen( patchYui, this, PleaseWaitPanel.show );
        } else {
           PleaseWaitPanel.show();
        }
    },
    
    maybe_checkout: function(req_id) {
        if (this.checkout_after && this.checkout_after == req_id)
            this.checkout(null, 'dialog');
    },

    checkout: function(ev, from) {

        if (ev){
            Y.util.Event.preventDefault(ev);
        }
        this.checkout_wait(ev);

        // This value doesn't seem to be used by the server except in one unlikely case.
        // We used to branch here for FB and build a URL pointing back to /fb_tab, but following the
        // resulting URL only resulted in a 404 (because it wasn't loading in the context of FB). So
        // now both FB and non-FB use the same value. - sdg 2012.05.30
        var return_url = window.TralbumData ? TralbumData.url : location.href;
        
        var params = {   
            client_id: ClientID, 
            from: from,
            return_url: return_url
        };
        if (window.FacebookData)
            params.orig = "f" + BandData.id;
        if ( window.MediaView && MediaView.mode == "phone" )
            params.mob = "1";

        window.top.location.href = TemplGlobals.siteroot_https + "/cart/checkout_start?" + Url.joinQuery(params);
    },
    
    toggle_cart_phone: function() {
        $("#sidecart-phone-reveal").slideToggle("fast");
        $("#sidecart").toggleClass("expanded");
        $("#menubar #cart-item").toggleClass("expanded");
    },
    
    show_cart_phone: function() {
        $("#sidecart-phone-reveal").slideDown("fast");
        $("#sidecart").addClass("expanded");
        $("#menubar #cart-item").addClass("expanded");
    },

    zzz: null
} );

var CartItem = {

    make: function(cart, data, is_static) {
        return Object.create(CartItem).init(cart, data, is_static);
    },

    init: function(cart, data, is_static) {
        this.cart = cart;
        this.id = data.id;
        this.item_type = data.item_type;
        this.item_id = data.item_id;
        this.item_title = data.item_title;
        this.item_title2 = data.item_title2;
        this.band_id = data.band_id;
        this.artist_name = data.artist_name;
        this.unit_price = data.unit_price;
        this.currency = data.currency;
        this.quantity = data.quantity;
        this.option_id = data.option_id;
        this.option_name = data.option_name;
        this.discount_id = data.discount_id;
        this.discount_type = data.discount_type;
        this.url = data.url;
        this.art_id = data.art_id;
        this.image_id = data.image_id;
        this.is_gift = data.is_gift;
        this.gift_recipient_email = data.gift_recipient_email; // this is needed to allow duplicate items to exist in a cart for different receipients (and a non-gift for yourself)
        
        // needed for physgifts
        this.shipping_street = data.shipping_street;
        this.shipping_street_2 = data.shipping_street_2;
        this.shipping_city = data.shipping_city;
        this.shipping_state = data.shipping_state;
        this.shipping_zip = data.shipping_zip;
        this.shipping_country_code = data.shipping_country_code;

        this.purchase_note = data.purchase_note;
        this.notify_me = data.notify_me;
        this.notify_me_label = data.notify_me_label;

        if (is_static) {
            this.el = elt("sidecart_item_" + this.id);
            this.local_id = "" + Math.random();
            this.add_handlers();
        } else {
            this.local_id = data.local_id;
            this.render();
        }
        return this;
    },

    kill: function() {
        if (this.anim)
            this.anim.stop(false);
        if (this.animc)
            this.animc.stop(false);
    },

    render: function() {
        this.el = document.createElement("div");
        // this.el.id = "sidecart_item_" + this.id;
        Y.util.Dom.addClass(this.el, "item");
        this.update();
    },

    update: function() {
        this.disp_price = TextFormat.currency(this.unit_price * this.quantity, CurrencyData.info[this.currency], false, true, false);
        var media_mode = ( window.MediaView ? MediaView.mode : null );
        this.el.innerHTML = Templ.render("cart/sidecart_item", {item:this, media_mode:media_mode});
        this.add_handlers();
    },

    add_handlers: function() {
        this.delete_el = Y.util.Dom.getElementsByClassName("delete", "a", this.el)[0];
        Y.util.Event.on(this.delete_el, "click", function(cart_item) {return function(ev) {cart_item.delete_click(ev)}}(this));
    },

    delete_click: function(ev) {
        Y.util.Event.preventDefault(ev);
        this.cart.delete_from_cart(this);
    },

    animate: function(reveal, complete_func, animate) {
        var old_height, new_height;
        var auto;

        this.rev_el = Y.util.Dom.getElementsByClassName("cartItemReveal", "div", this.el)[0];
        this.con_el = Y.util.Dom.getElementsByClassName("cartItemContents", "div", this.el)[0];

        if (animate) {
            this.anim = new Y.util.Anim(this.rev_el);
            this.animc = new Y.util.ColorAnim(this.rev_el);

            if (reveal) {
                this.anim.init(this.rev_el, {height: {from: 0, to: this.con_el.offsetHeight}}, 0.10, Y.util.Easing.easeOut);
                this.animc.init(this.rev_el, {opacity: {from: 0, to: 1}}, 0.5);
                auto = true;
            } else {
                this.anim.init(this.rev_el, {height: {to: 0}}, 0.10, Y.util.Easing.easeOut);
                this.animc.init(this.rev_el, {opacity: {from: 1, to: 0}}, 0.05);
                auto = false;
            }
            this.anim.onComplete.subscribe(function(f_this, f_auto, f_complete_func) {return function() {
                if (f_auto)
                    f_this.rev_el.style.height = 'auto';
                if (f_complete_func)
                    f_complete_func();
            }}(this, auto, complete_func));

            this.anim.animate();        
            this.animc.animate();
        } else {
            if (reveal)
                this.rev_el.style.height = 'auto';
            if (complete_func)
                complete_func();
        }
    },

    zzz: null
};

// ---------------------------------------------

/* A Knockout version of ClientPrefs (that should be in sync).
 * Eventually we can drop the non-Knockout version.
 */
var ClientPrefsObservable = (function () {
    var self = this;
    
    self.country     = ko.observable();
    self.countryName = ko.observable();
    self.currency    = ko.observable();
    self.usState     = ko.observable();
    self.usZip       = ko.observable();
    self.isDefault   = ko.observable();

    self.isEU = function() {
        return window.Geo !== undefined && Geo.isEUCountry(self.country());
    };

    self.update = function(data) {
        self.country(data.country);
        self.countryName(data.country_name);
        self.currency(data.currency);
        self.usState(data.us_state);
        self.usZip(data.us_zip);
        self.isDefault(data.is_default);
    };

    return self;
}());

var ClientPrefs = {
    country: null,
    country_name: null,
    currency: null,
    us_state: null,  // not currently updated
    us_zip: null,  // not currently updated

    update: function(data) {
        ClientPrefs.country = data.country;
        ClientPrefs.country_name = data.country_name;
        ClientPrefs.currency = data.currency;
        ClientPrefs.us_state = data.us_state;
        ClientPrefs.us_zip = data.us_zip;
        ClientPrefs.is_default = data.is_default;

        ClientPrefsObservable.update(data);
    },

    zzz: null
};

// ---------------------------------------------

var CountryPrefPanel = {

    make: function(onchange_func) {
        var klass = ( !window.MediaView || MediaView.mode != "phone" ) ? CountryPrefPanel : CountryPrefPanelPhone;
        return Object.create(klass).init(onchange_func);
    },

    init: function(onchange_func) {
        this.onchange_func = onchange_func;
        this.dlg = null;
        return this;
    },

    show: function(near_el, align_left) {
        var self = this;
        var i, options;

        options = this.optionHTML();

        this.dlg = NuDialog.showTemplate("cart/country_pref", {options: options}, {
            width: "auto",
            minHeight: 0,
            modal: true,
            closeOnEscape: true,
            draggable: false,
            buttons: [],
            dialogClass: "no-title no-padding no-border-radius no-bg"
        });

        // hide the overlay mask, but still listen for clicks
        this.dlg.dialog("widget").next(".ui-widget-overlay")
            .addClass('no-overlay')
            .click(function(event) {
                event.preventDefault();
                self.hide();
            });

        $('a.country_pref_close', this.dlg).click(function(event) {
            event.preventDefault();
            self.hide();
        });

        this.select_el = $('.country_pref_select', this.dlg)[0];
        $('.country_pref_select', this.dlg).change($.proxy(this.onchange, this));

        this.zip_el = $('.country_pref_zip', this.dlg)[0];
        $('.country_pref_zip', this.dlg)
            .textInput(function () {
                $('.us-zip-done', this.dlg).toggleClass('disabled', !self.zipIsValid(this.value));
            })
            .on('keypress', function (event) {
                if (event.which === 13) {
                    self.onchange(event);
                }
                return !((event.which >= 32 && event.which <= 47) ||
                         (event.which > 57 && event.which < 127));
            })[0];

        $('.us-zip-done').click(function (event) {
            self.onchange(event);
            return false;
        });

        this.dlg.on("dialogclose", function() {
            self.dlg = null;
        });

        this.selectOption();

        var pointer_el = $('.country_pref_pointer', this.dlg);
        if (typeof align_left != "undefined" && align_left) {
            pointer_el.css("float", "left");
            pointer_el.css("margin-left", "10px");
            this.dlg.dialog("option", "position", { my: "left top", at: "left bottom", of: near_el } );
        } else {
            pointer_el.css("float", "right");
            pointer_el.css("margin-right", "10px");
            this.dlg.dialog("option", "position", { my: "right top", at: "right bottom", of: near_el } );
        }
        Dom.focus(this.select_el);
    },
    
    hide: function() {
        if (this.dlg) {
            this.dlg.dialog("widget").next(".ui-widget-overlay").removeClass('no-overlay');
            this.dlg.dialog("close");
        }    
    },

    onclose: function(ev) {
        this.hide();
        return false;
    },
    
    onchange: function(ev) {
        var i, new_code, new_us_state, new_us_zip;

        new_code = this.select_el.value;
        
        if (new_code === 'US') {
            if (ev.target === this.select_el) {
                $('.us-zip', this.dlg).slideToggleBool(true, 'fast', function () {
                    $(this).find('.country_pref_zip').focus();
                });
                return;
            }
            new_us_state = null;
            new_us_zip = this.zip_el.value;
            if (!this.zipIsValid(new_us_zip)) {
                Log.warn('Invalid zip', new_us_zip);
                return;
            }
        } else {
            new_us_state = null;
            new_us_zip = null;
        }

        this.hide();

        if (new_code != ClientPrefs.country || new_us_zip != ClientPrefs.us_zip) {
            var client_data = {};

            client_data.country = new_code;
            client_data.us_state = new_us_state;
            client_data.us_zip = new_us_zip;

            for (i = 0; i < CurrencyCodes.length; ++i) {
                var c = CurrencyCodes[i];
                if (c.code == new_code) {
                    client_data.country_name = c.common_name;
                    client_data.currency     = c.currency_code;
                    break;
                }
            }

            ClientPrefs.update(client_data);
            
            if (this.onchange_func) {
                this.onchange_func(client_data);
            }
        }
        return false;
    },

    zipIsValid: function (zip) {
        return /^\d{5}$/.test(zip);
    },
    
    optionHTML: function() {
        var options = [];
        for (var i = 0; i < CurrencyCodes.length; ++i) {
            var cc = CurrencyCodes[i];
            options.push( '<option value="', cc.code, '">', cc.common_name, '</option>' );
        }
        return options.join('');
    },
    
    selectOption: function() {
        $(this.select_el).find( 'option[value="' + ClientPrefs.country + '"]' ).attr( "selected", true );
        $(this.dlg)
            .find('.us-zip').toggle(ClientPrefs.country === 'US')
            .find('.country_pref_zip').val(ClientPrefs.us_zip).end()
            .find('.us-zip-done').toggleClass('disabled', !this.zipIsValid(ClientPrefs.us_zip));
    },

    zzz: null
};

var CountryPrefPanelPhone = {
       
    init: function(onchange_func) {
        this.onchange_func = onchange_func;
        this.dlg = null;
        return this;
    },
    
    show: function() {
        var self = this;
        // TODO: Using a <select> for country list sucks, because the list is so long.
        // Also, prior to iOS 6, the onchange event doesn't trigger until the user taps the "done" button on the input panel.
        // The user's likely to hit OK before tapping done, which means we won't get a chance to show the zip entry field
        // when switching to "US".
        var body = [].concat( '<select class="country_pref_select">', this.optionHTML(), '</select>' ).join('');
        body += '<div class="us-zip"><label>Zip: <input type="text" size="5" maxlength="5" pattern="[0-9]*"/></label></div>'

        this.dlg = NuDialog.alertHTML("Choose your country", body, {
            width: "auto",
            minHeight: 0,
            modal: true,
            closeOnEscape: true,
            draggable: false,
            buttons: [
                {
                    id: "country-pref-ok",
                    text: "OK",
                    click: function(event) {
                        self.handleUpdate(event);
                        self.dlg.dialog("close");
                        return false;
                    }
                }
            ]
        });

        this.selectOption();
        Dom.focus(this.getSelect());

        $('.country_pref_select', this.dlg).change(function () {
            var isUS = $(this).val() === 'US';
            $(this).siblings('.us-zip').slideToggleBool(isUS, 'fast', function () {
                $(this).find('input').focus();
            });
            self.updateDoneButtonState();
        });
        $('.us-zip input', this.dlg).textInput(function () {
            self.updateDoneButtonState();
        });
        
        this.dlg.on("dialogclose", function() {
            self.dlg = null;
        });
    },
    
    // no-op, as the dialog is modal
    hide: function() {},

    updateDoneButtonState: function () {
        var isUS = $('.country_pref_select', this.dlg).val() === 'US',
            zip = $('.us-zip input', this.dlg).val(),
            disable = isUS && !CountryPrefPanel.zipIsValid(zip);
        $('#country-pref-ok').attr('disabled', disable);
    },
    
    handleUpdate: function() {
        var new_code = this.getSelect().val(), new_us_state, new_us_zip;

        if (new_code === 'US') {
            new_us_state = null;
            new_us_zip = $('.us-zip input', this.dlg).val();
        } else {
            new_us_state = null;
            new_us_zip = null;
        }

        if ( new_code != ClientPrefs.country || new_us_zip != ClientPrefs.us_zip) {
            var client_data = {};

            client_data.country = new_code;
            client_data.us_state = new_us_state;
            client_data.us_zip = new_us_zip;

            Iter.find( CurrencyCodes, function( country ) {
                if ( country.code == new_code ) {
                    client_data.country_name = country.common_name;
                    client_data.currency     = country.currency_code;
                    return true;
                }
            } );

            ClientPrefs.update(client_data);

            if (this.onchange_func) {
                this.onchange_func(client_data);
            }
        }
    },
    
    optionHTML: function() {
        var options = [];
        for (var i = 0; i < CurrencyCodes.length; ++i) {
            var cc = CurrencyCodes[i];
            options.push( ' \n<option value="', cc.code, '">', cc.common_name, '</option>' );
        }
        return options;
    },
    
    getSelect: function() {
        return $('.country_pref_select', this.dlg);
    },
    
    selectOption: function() {
        this.getSelect().find( 'option[value="' + ClientPrefs.country + '"]' ).attr( "selected", true );
        $('.us-zip', this.dlg).toggle(ClientPrefs.country === 'US')
            .find('input').val(ClientPrefs.us_zip);
    },
    
    zzz: null
};

;
/* ------------- BEGIN please_wait_panel.js --------------- */;
// requires bubble_message.js for the phone view

var PleaseWaitPanel = {

    show: function(wait) {
        
        if (PleaseWaitPanel.panel)
            return;

        if (window.MediaView && MediaView.mode == "phone") {
            PleaseWaitPanel.showPhone();    
            return;
        }

        if (typeof wait == "undefined" || wait) {
            PleaseWaitPanel.timeout_id = setTimeout(function() {PleaseWaitPanel.show(false);}, 0.5*1000);
            return;
        }

        if (PleaseWaitPanel.timeout_id) {
            clearTimeout(PleaseWaitPanel.timeout_id);
            PleaseWaitPanel.timeout_id = null;
        }

        var elem_id = "dlg" + Dialog._id++;

        PleaseWaitPanel.panel = new Y.widget.Panel(elem_id, {
            width: "300px", 
            fixedcenter: window.FacebookData ? false : true, 
            constraintoviewport: true, 
            underlay: "none", 
            close: false, 
            visible: true, 
            draggable: false,
            modal: true
        });
        
        PleaseWaitPanel.panel.setBody("Please wait...");
        PleaseWaitPanel.panel.render(document.body);
        $(PleaseWaitPanel.panel.element).addClass("please-wait-panel");
    },

    showPhone: function() {
        PleaseWaitPanel.panel = BubbleMessage("Please wait...", 180000);
        $(document.body).addClass("nouveau-masked").append('<div class="nouveau-mask">');
    },
    
    zzz: null
};
;
/* ------------- BEGIN download_panel_vm.js --------------- */;
/* exported DownloadPanelVM */
/* global BandData, ChargeEmail, ClientPrefsObservable, CurrencyData, Dom, Form, Geo, MediaView, Text, TextFormat, Trackpipe, TralbumData */

var DownloadPanelVM = (function ($, ko) {
    'use strict';

    return function (init, parent, panel) {
        var self = this;
        this._init = init;
        this._parent = parent;

        this.panel = $(panel);

        this.panes = {
            discount: new CheckoutDiscountVM(parent, init),
            pricing: new PricingVM(parent, init)
        };

        window.discountDebug = this.panes.discount;

        // If the current track page belongs to an album, go to that page for its package options,
        // otherwise reveal the other options in-place.
        this.viewPackageOptions = function() {
            var packages_url = TralbumData.current.type == "track" ? TralbumData.album_url : null;
            if (packages_url) {
                window.top.location.href = packages_url;
            } else {
                this._parent._dlg.dialog("close");
                // Scroll to a particular element?
            }
        };

        this.submit = function() {
            var successMsg = "Thanks, an email has been sent to " + Text.escapeHtml(ChargeEmail._address) + " with your download instructions.";
            var failureMsg = "Oops. Something unexpected happened and your email was not sent. Sorry for the inconvenience. Please try again. If the problem persists, contact support@bandcamp.com.";

            var data = $("#fan_email").serialize();
            $.post('/email_download', data)
                .done(function (response) {
                    if (Trackpipe.showXHRError(response)) return;

                    if (response.ok) {
                        $("#download-panel-busy").hide();
                        $("#download-panel-complete").show().find(".msg").html(successMsg);
                        if (window.MediaView && MediaView.mode == "phone") {
                            // top may have scrolled off due to keyboard coming onscreen
                            self.panel.dialog("option", "position", "center");
                        }
                    } else {
                        if (response.errors) {
                            Log.debug('response.errors', response.errors);
                        }
                        
                        $("#download-panel-busy").hide();
                        $("#download-panel-complete").show().find(".msg").html(failureMsg);

                        if (window.MediaView && MediaView.mode == "phone") {
                            self.panel.dialog("option", "position", "center");
                        }
                    }
                })
                .fail(function () {
                    NuDialog.alert('Network Error', 'There was a network error. Please try again.');
                });

            $("#fan_email").hide(400);
            $("#download-panel-busy").show(400);

            if (window.MediaView && MediaView.mode == "phone") {
                self.panel.dialog("option", "position", "center");
            }
        };
    };

    function CheckoutDiscountVM(parent, init) {

        var self = this,
            __parent = parent,    // TralbumDownload or PackageOrder
            __unitId = init.download_info.unitId,
            __hasDiscountCodes = init.download_info.has_discounts,
            __enabled = !!(init.download_info.has_discounts || init.download_info.subscriberDiscount),
            __checkedCode = '',   // the last code to be verified as either valid or invalid
            __verifyXHR = null,
            __basePrice = init.download_info.basePrice,
            __discountedPrice = null,
            __discountID = null,
            __discountType = null;

        // the UI state: "editing", "verifying", "verified", or null (not enabled)
        var __state = ko.observable(null);
        var __defaultState = ko.observable("editing");
        if (__enabled) {
            __state(__defaultState());
        }

        var __defaultIsSubscriber = !!init.download_info.subscriberDiscount;
        var __subscriberDiscountVisible = ko.observable(init.download_info.subscriberDiscount);

        // tracks the edit field focus state
        var __entryFocused = ko.observable(false);

        // the raw text the user has entered; updated continually during editing
        var __rawEntryText = ko.observable('');

        var __normalizedRawEntryText = ko.computed(function () {
            return $.trim( __rawEntryText() ).toLowerCase();
        });

        // the normalized code, updated only after the user has finished editing, which 
        // means when the user clicks Apply, presses Enter, or blurs the field
        var __codeEntry = ko.observable('');

        // after a code has been verified, this is a verification error string, or null
        var __verifyError = ko.observable(null);

        // don't show show the previous verification error, if any, while editing or processing
        var __showVerifyError = ko.computed(function () {
            return __verifyError() && (__state() == "verified");
        });

        // a URL pointing to /yum; set only when we think the entered value is actually a download code
        var __yumURL = ko.observable(null);

        var __subscriberDiscount = ko.observable(init.download_info.subscriberDiscount);
        var __subscriberDiscountPercent = ko.computed(function () {
            return __subscriberDiscount() ? __subscriberDiscount().percent : '';
        });
        var __defaultDiscount = ko.computed(function () {
            return __subscriberDiscount() || null;
        });

        function commitEditor() {
            // Do this on a timer. This is required for one scenario: when the editor is dirty (contains
            // a value we haven't yet looked up) and the user clicks on the Checkout or Add To Cart
            // buttons. Those button handlers (TralbumDownload.checkout and PackageOrder.checkout) call
            // our discountVerified method to check if the editor is dirty, and if it is, they abort to
            // give the user an opportunity to see the results of submitting the new code. However, just
            // clicking on those buttons blurs the editor and therefore triggers this function; we're
            // often done checking the code by the time discountVerified runs. The timer guarantees
            // discountVerified runs first and gives the button handlers a chance to abort. - sdg 2014.12.12
            setTimeout(function () {
                Log.debug("discount: committing editor");
                __codeEntry(__normalizedRawEntryText());
                checkDiscount();
            }, 100);
        }

        function checkDiscount() {
            Log.debug("checkDiscount: start");

            if (!__enabled) {
                Log.debug("checkDiscount returning, not enabled");
                return;
            }
            if (__state() == "verifying") {
                Log.debug("checkDiscount returning, already verifying");
                return;
            }

            var code = __codeEntry();

            // Special case: empty string
            if (code === "") {
                Log.debug("checkDiscount: empty code");
                discountApply(__defaultDiscount(), null, false);
                if (__defaultState() != "editing") {
                    blurEditor();
                }

                __state(__defaultState());
                if (__defaultIsSubscriber) {
                    __subscriberDiscountVisible(true);
                }

                __verifyError(null);
                __yumURL(null);
                discountRescroll();
                return;
            }

            if (code == __checkedCode) {
                Log.debug("checkDiscount: code is already verified: ", code);
                if (code) {
                    blurEditor();
                    __state("verified");
                }
                else {
                    __state("editing");
                }
                return; // do nothing, interferes with clicking on "Checkout"
            }

            // Special case: does this look like a download code?
            // Note that discount codes can't contain hyphens.
            if (looksLikeDownloadCode(code)) {
                Log.debug("checkDiscount returning, download code detected");
                discountApply(__defaultDiscount(), null, false);
                __verifyError(null);
                __yumURL("/yum?code=" + encodeURIComponent(code));
                return;
            }

            var successCb = function(response) {
                Log.debug("discount: XHR succeeded for code: ", code, ", response: ", response);
                __state("verified");
                __verifyXHR = null;

                if (response.ok) {
                    if (__subscriberDiscount() && (__subscriberDiscount().price < response.price)) {
                        handleSubscriberDiscountIsLower();
                    }
                    else {
                        discountApply(response, code, true);
                        __verifyError(null);
                        if (response.pinned) {
                            warnPinned(response.price).then(discountRescroll);
                        }
                        else {
                            discountRescroll();
                        }
                    }
                } 
                else {
                    discountApply(__defaultDiscount(), code, false);
                    __verifyError("Sorry, that discount code is invalid or expired.");
                    discountRescroll();
                }
            };
            var failureCb = function(xhr, errorType) {
                if (errorType == "abort") {
                    Log.debug("discount: XHR aborted by user");
                    return;
                }
                Log.error("discount: XHR failed for code: " + code);
                __state("verified");
                __verifyError("Sorry, there was an unexpected error. Please try again.");
                __verifyXHR = null;

                discountApply(__defaultDiscount(), null, false);
                discountRescroll();
            };

            var params = { item: __unitId, code: code };
            if (window.FacebookData)
                params.bid = BandData.id;

            __verifyError(null);
            __yumURL(null);
            blurEditor();
            __state("verifying");
            __verifyXHR = $.post("/lookup_discount_cb", params, null, "json").success(successCb).error(failureCb);
        }

        function discountVerified() {
            if (!__enabled) return true;

            if (__state() == "verifying") {
                NuDialog.alert("A little busy", "We are checking your discount code. Please wait...");
                return false;
            }

            var code = __normalizedRawEntryText();
            Log.debug( "discountVerified: editor:", code, "checkedCode:", __checkedCode );
            return (code == __checkedCode);
        }
        
        function discountID() {
            return __discountID;
        }

        function discountType() {
            return __discountType;
        }
        
        function getUnitPrice() {
            if (!__enabled || __discountedPrice === null || isNaN(__discountedPrice))
                return __basePrice;

            return __discountedPrice;
        }

        function getBasePrice() {
            return __basePrice;
        }

        function getDiscountedPrice() {
            return __discountedPrice;
        }

        function looksLikeDownloadCode(code) {
            return code.search(/^[a-z0-9]{4,5}\-[a-z0-9]{4,5}$/) === 0;
        }

        function cancelVerify() {
            if (__verifyXHR) {
                __verifyXHR.abort();
                __verifyXHR = null;
            }
        }

        // Entering a discount code on a phone can re-scroll the view to make room for the keypad. In several cases
        // we counteract this by rescrolling to the top of the dialog.
        function discountRescroll() {
            if (MediaView.mode == "phone")
                Dom.scrollToElement(__parent._dlg.dialog("widget"), 0, true);
        }

        function warnPinned( price ) {
            price = TextFormat.currency(price, parent._currency);
            var deferred = $.Deferred();
            NuDialog.alertHTML("Discount code", 
                "The discounted price is below the minimum we can process, so it was adjusted to " + price + ".",
                {
                    close: function() {
                        deferred.resolve();
                    }
                }
            );
            return deferred;
        }

        // Updates our internal data to reflect a new discount, and updates the pricing UI to match.
        // discountData: an object which has the following properites, which can be null to mean "no discount":
        //    - price: the discounted price
        //    - discount_id
        //    - dicount_type ('c' for discount code, 's' for subscriber discount)
        // TODO this function: knockoutification
        function discountApply(discountData, code, adjustUserPrice) {
            discountData = discountData || {};
            var price = __basePrice,
                discountedPrice = discountData.price || null,
                discountID = discountData.discount_id || null,
                discountType = discountData.discount_type || null;

            if (discountedPrice !== null) {     // supporting zero here, eventually?
                if (discountedPrice != price)
                    price = discountedPrice;
                else
                    discountedPrice = null;    // edge case: the discount was pinned to 0% by the system minimum
            }

            __discountedPrice = discountedPrice;
            __discountID = discountID;
            __discountType = discountType;
            __checkedCode = code || '';
            // We could store a property telling us whether the checkedCode is valid or not, but we don't need it currently.
            // If we did, it would look something like this:
            //    codeWasValid = (discountId != null || !__checkedCode);

            var q = $("#orderQuantity")[0];
            q = (q ? parseInt( q.value ) : null);
            if (q === null || isNaN(q)) q = 1; // missing or zero maps to 1 for display purposes; also, isNaN(null)==false!

            var $nypBasePrice = $(".nyp-summary-price");
            if ($nypBasePrice.length) {
                // NYP variation
                var $nypDiscountedPrice = $nypBasePrice.nextAll(".nyp-summary-discounted-price");
                if (discountedPrice === null) {
                    $nypBasePrice.removeClass("disabled");
                    $nypDiscountedPrice.remove();
                } else {
                    $nypBasePrice.addClass("disabled");
                    if (!$nypDiscountedPrice.length)
                        $nypDiscountedPrice = $('<span class="nyp-summary-discounted-price"></span>').insertAfter($nypBasePrice);
                    $nypDiscountedPrice.html(" " + TextFormat.currency(price, parent._currency, false, false, true));

                    if (adjustUserPrice) {
                        // If the buyer has already entered the minimum price and then applies a discount, drop
                        // their entered price to the new minimum. If they've entered a price between the minimum
                        // and the discounted minimum, drop it too. If they've entered a higher price, blank the
                        // field and focus it, forcing them to enter a new value. Never raise the price. (case 523895)
                        var enteredPrice = Form.validate.parsePrice($("#userPrice").val()),
                            $editor = $("#userPrice");
                        if (enteredPrice && enteredPrice <= __basePrice && enteredPrice >= price) {
                            $editor.val(price);
                        } else {
                            // This focus action doesn't work in mobile safari. Worse, doing this here
                            // leaves the browser in a bad state where the next tap (anywhere) will briefly
                            // focus and then blur the editor field. It appears to be an interaction with
                            // the blur we do in checkDiscount() to get the browser to hide the keyboard after we
                            // hide the editor. If we skip that blur, this focus works. Ideally we'd decide
                            // on a single focus or blur action.  - sdg 2014.12.11
                            $editor.val("").focus();
                        }
                    }
                }
                __parent.updateCurrencyDisplay();
            }
            else {
                // set price variation
                var userPrice = TextFormat.currency(q * price, parent._currency, true);
                if (discountedPrice === null) {
                    Dom.display("normal-price-wrapper", false);
                    Dom.setText("userPrice", userPrice);
                }
                else {
                    var basePrice = TextFormat.currency(q * __basePrice, parent._currency, true);
                    Dom.setText("normal-price", basePrice);
                    Dom.display("normal-price-wrapper", true);
                    Dom.setText("userPrice", userPrice);
                }
            }
        }

        // If there's a discount in effect when we first render, immediately apply it
        function applyInitialDiscount() {
            var dis = __defaultDiscount();
            if (dis) {
                // do this after a timeout, because discountApply calls out into parent code, which expects
                // to have a fully-initialized CheckoutDiscount object at that point. We might be able to
                // eliminate this after we knockout-ize discountApply.
                setTimeout(function () {
                    discountApply(dis, null, false);
                }, 0);
            }
        }

        function setupEventHandlers() {
            var elem = $(".discount-section", __parent._dlg)[0];
            if (elem) {
                $("#discountInput", __parent._dlg).keydown(handleKeyDown);
                subscribeEditorBlur();
            }
            else {
                Log.error("Missing expected discount code elements");
            }
        }

        function handleEditCode() {
            Log.debug("discount: edit code");
            cancelVerify();
            __state("editing");
            $("#discountInput").select();
        }

        function handleApplyCode() {
            Log.debug("discount: apply code (click)");
            // simply clicking the Apply link blurs the field, which is our trigger for further 
            // processing (see handleEditorBlur)
            return false;
        }

        // commit the editor on blur: this handles both clicks on "Apply" and clicks elsewhere on the page
        function handleEditorBlur(isFocused) {
            if (!isFocused && __state() == "editing") {
                commitEditor();
            }
        }

        // commit the editor on Enter; this is the only scenario where we don't use blur to accomplish this,
        // because we want to maintain the user's text selection in case we leave the editor open
        function handleKeyDown( event ) {
            if (event.which == 13) {
                Log.debug("discount: apply code (Enter)");
                commitEditor();
                return false;
            }
        }

        function handleSwitchToCode() {
            __subscriberDiscountVisible(false);
            __state("editing");
        }

        function focusSwitchToCode() {
            if (__state() === "editing" && (!window.MediaView || MediaView.mode != "phone")) {
                __entryFocused(true);
            }
        }

        function handleSubscriberDiscountIsLower() {
            __subscriberDiscountVisible(true);
            __verifyError(null);
            __codeEntry('');
            __rawEntryText('');
            
            discountApply(__subscriberDiscount(), null, true);

            var title = "Best discount",
                body = "We noticed that your subscriber discount results in a lower price than your code, so we've applied the subscriber discount instead.",
                dialogOptions = {
                    position: { my: "center", at: "center", of: __parent._dlg.element }
                };
            NuDialog.alert(title, body, dialogOptions);
            discountRescroll();
        }

        // Blur the edit field if it still has focus. This is done right before we hide the editor in
        // the DOM, and only for the benefit of mobile safari. If we don't blur the editor beforehand,
        // mobile safari won't dismiss the keypad. In practice, this only happens when hitting Enter
        // (handleKeyDown), because otherwise the editor is closing because of a blur event from the user.
        function blurEditor() {
            if (__entryFocused()) {
                Log.debug("discount: blurring editor for mobile safari's sake");
                unsubscribeEditorBlur(); // if we don't do this, we can be called recursively by handleEditorBlur
                __entryFocused(false);
                subscribeEditorBlur();
            }
        }

        // subscribe/unsubscribe from focus/blur changes
        var editorFocusSub = null;
        function subscribeEditorBlur() {
            editorFocusSub = __entryFocused.subscribe(handleEditorBlur);
        }
        function unsubscribeEditorBlur() {
            if (editorFocusSub) {
                editorFocusSub.dispose();
            }
        }

        // static values
        self.enabled = __enabled;
        self.hasDiscountCodes = __hasDiscountCodes;

        // observables
        self.state = __state;
        self.subscriberDiscountVisible = __subscriberDiscountVisible;
        self.entryFocused = __entryFocused;
        self.rawEntryText = __rawEntryText;
        self.codeEntry = __codeEntry;
        self.verifyError = __verifyError;
        self.showVerifyError = __showVerifyError;
        self.yumURL = __yumURL;
        self.subscriberDiscount = __subscriberDiscount;
        self.subscriberDiscountPercent = __subscriberDiscountPercent;

        // methods
        self.checkDiscount = checkDiscount;
        self.looksLikeDownloadCode = looksLikeDownloadCode;
        self.discountVerified = discountVerified;
        self.discountID = discountID;
        self.discountType = discountType;
        self.unitPrice = getUnitPrice;
        self.basePrice = getBasePrice;
        self.discountedPrice = getDiscountedPrice;
        self.handleEditCode = handleEditCode;
        self.handleApplyCode = handleApplyCode;
        self.handleSwitchToCode = handleSwitchToCode;
        self.focusSwitchToCode = focusSwitchToCode;

        if (__enabled) {
            setupEventHandlers();
            applyInitialDiscount();
        }

        return self;
    }

    function PricingVM(parent, data) {

        var self = this,
            isSetPrice   = data.download_info.isSetPrice,
            setPrice     = data.download_info.setPrice,
            minimumPrice = data.download_info.minimumPrice,
            taxablePrice = isSetPrice ? setPrice : minimumPrice,
            isPackage    = data.download_info.package !== undefined,
            isWillCall   = data.is_will_call,
            digitalVATEnabled = data.seller.digital_vat_enabled,
            initialBuyerCountry = data.buyer_country;

        self.isSetPrice     = ko.observable(isSetPrice);
        self.subTotal       = ko.observable(data.sub_total); // the current valid subTotal
        self.userPrice      = ko.observable(null);           // the valid price entered by the user or null
        self.showAsTotal    = ko.observable(data.show_as_total);
        self.hasTax         = ko.observable(data.has_tax);
        self.shippingAndTax = ko.observable(data.shipping_and_tax);
        self.isGift         = ko.observable(data.is_gift);
        self.giftAddress    = ko.observable();
        self.updating       = ko.observable();
        
        self.buyerCountrySetToUSWithZip = ko.computed(function () {
            return ClientPrefsObservable.country() === 'US' && ClientPrefsObservable.usZip();
        });

        self.buyerCountrySet = ko.computed(function () {
            return ClientPrefsObservable.country() !== 'US' || self.buyerCountrySetToUSWithZip();
        });

        self.differentCurrency = ko.computed(function () {
            return ClientPrefsObservable.currency() != data.seller.currency;
        });

        self.hasDigitalVAT = ko.computed(function () {
            var buyerCountry;

            // newly-set ClientPrefs country overrides the best guess we generated on the server
            if (ClientPrefsObservable.isDefault()) {
                buyerCountry = initialBuyerCountry;
            } else {
                buyerCountry = ClientPrefsObservable.country();
            }
            return digitalVATEnabled && Geo.isEUCountry(buyerCountry) && taxablePrice > 0;
        });

        self.currencyRate = ko.computed(function () {
            if (self.differentCurrency()) {
                return CurrencyData.rates[data.seller.currency] / CurrencyData.rates[ClientPrefsObservable.currency()];
            } else {
                return 1;
            }
        });

        self.isInitialNYP = ko.computed(function () {
            return !self.isSetPrice() && !self.userPrice();
        });

        self.NOAMOUNT = "&nbsp;-&nbsp;-&nbsp;";

        // Converts into the buyer's currency and formats as a UI string
        function displayPrice(amount) {
            if (amount === undefined || isNaN(parseFloat(amount))) {
                return self.NOAMOUNT;
            }
            var currencyData = CurrencyData.info[ClientPrefsObservable.currency()],
                convertedAmount = amount * self.currencyRate();
            return TextFormat.currency(convertedAmount, currencyData, false, true, true);
        }

        self.buyerCountryDisplay = ko.computed(function () {
            var c, g;
            if (self.giftAddress()) {
                g = self.giftAddress();
                c = TextFormat.noOrphan(g.countryName);
                if (g.country === 'US' && g.usZip) {
                    c += ', ' + g.usState + ' ' + g.usZip;
                }
            } else {
                c = TextFormat.noOrphan(ClientPrefsObservable.countryName());
                if (self.buyerCountrySetToUSWithZip()) {
                    c += ', ' + ClientPrefsObservable.usState() + ' ' + ClientPrefsObservable.usZip();
                }                
            }
            return c;
        });

        self.buyerCurrencyDisplay = ko.computed(function () {
            return ClientPrefsObservable.currency();
        });

        self.subTotalDisplay = ko.computed(function () {
            return displayPrice(self.subTotal());
        });

        self.shippingDisplay = ko.computed(function () {
            return self.updating() ? self.NOAMOUNT : displayPrice(self.shippingAndTax());
        });

        self.currencySummaryVisible = ko.computed(function () {
            return (isPackage && isWillCall) || self.differentCurrency() || self.hasDigitalVAT();
        });

        self.shippingSummaryVisible = ko.computed(function () {
            return (isPackage && !isWillCall);
        });

        self.extrasVisible = ko.computed(function () {
            return (self.currencySummaryVisible() || self.shippingSummaryVisible());
        });
        
        self.subTotalVisible = ko.computed(function () {
            return self.differentCurrency() || isPackage && self.userPrice() !== null;
        });

        self.convertLinkVisible = ko.computed(function () {
            return !self.extrasVisible() || !self.subTotalVisible();
        });

        self.updateShippingSummary = function (p) {
            self.subTotal(p.subTotal);
            self.hasTax(p.hasTax);
            self.shippingAndTax(p.shippingAndTax);
            self.showAsTotal(p.showAsTotal);
            if (p.giftCountry) {
                self.giftAddress({
                    'country': p.giftCountry,
                    'countryName': p.giftCountryName,
                    'usState': p.giftUsState,
                    'usZip': p.giftUsZip
                });
            } else {
                self.giftAddress(null);
            }
            self.updating(false);
        };

        self.showCountryPref = function (_, event) {
            data.dialog_class_object.show_country_pref(event);
        };
    }

})(jQuery, ko);
;
/* ------------- BEGIN gift_panel_vm.js --------------- */;
/* exported GiftPanelVM */
/* global FacebookUtils, TralbumDownload, MediaView */

var GiftPanelVM = function (details, panel) {
    'use strict';
    var self = this;

    this.panel = $(panel);

    this.sender_name = ko.observable(details.sender_name || "");
    this.recipient_name = ko.observable(details.recipient_name || "");
    this.recipient_email = ko.observable(details.recipient_email || "");
    this.sender_note = ko.observable(details.sender_note || "");

    this.is_for_fan = details.is_for_fan;
    this.recipient_fan_id = details.recipient_fan_id;

    this.fixing_email = details.fixing_email;
    this.recipient_email_error = ko.observable(false);

    this.submitEnabled = ko.computed(function() {
        return $.trim(self.sender_name()).length > 0 && $.trim(self.recipient_name()).length > 0 &&
            (self.is_for_fan || $.trim(self.recipient_email()).length > 0);
    });

    this.focus = function() {
        if (self.fixing_email)
            $('input[name="gift-recipient-email"]', self.panel).focus();
        else if (self.sender_name().length === 0 || self.is_for_fan)
            $('input[name="gift-sender-name"]', self.panel).focus();
        else
            $('input[name="gift-recipient-name"]', self.panel).focus();
    };

    // Use this instead of data-bind="submit: ..." because we need the event.
    var element = $('form', this.panel)[0];
    ko.utils.registerEventHandler(element, "submit", function(event) {
        if (self.submit(element, event) !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
            if (event.preventDefault)
                event.preventDefault();
            else
                event.returnValue = false;
        }
    });

    this.submit = function(data, event) {
        var details = self.validate();
        if (details) {
            // if there's a fan id available and no recipient email override, jump to the pay dialog
            if (details.recipient_fan_id && details.recipient_email.length === 0) {
                if (window.FacebookData) {
                    FacebookUtils.correctSrollThen(false, TralbumDownload, TralbumDownload._begin, event, details);
                }
                else {
                    TralbumDownload._begin(event, details);
                }
            }
            else {
                if (window.FacebookData) {
                    FacebookUtils.correctSrollThen(false, TralbumDownload, TralbumDownload.beginGiftConfirmation, event, details);
                }
                else {
                    TralbumDownload.beginGiftConfirmation(event, details);
                }
            }
        }

        return false;
    };

    this.validate = function() {
        var emailRegex = /(^)([^\s\(\)"'\/><,@]+@\w([^\s\(\)"'\/><&,@]*\w)?\.\w[^\s\(\)"'\/><&,@]*\w)($)/;  // yet another

        var details = {
            sender_name: $.trim(self.sender_name()).substring(0, 100),
            recipient_name: $.trim(self.recipient_name()).substring(0, 100),
            recipient_email: $.trim(self.recipient_email()).substring(0, 100),
            sender_note: self.sender_note().substring(0, 1000),
            recipient_fan_id: self.recipient_fan_id
        };

        var ok = (details.recipient_email.length === 0 && self.is_for_fan) || emailRegex.test(details.recipient_email);
        if (!ok) {
            self.recipient_email_error(true);
            self.focus_on_error('#gift-recipient-email');
            return null;
        }

        return details;
    };

    this.focus_on_error = function(item) {
        var mediaMode = (window.MediaView ? MediaView.mode : null);
        if (mediaMode == 'phone') {
            var container = $(item)[0];
            setTimeout(function() {
                $('html, body').animate({scrollTop: container.offset().top - 5}); 
            }, 10);
        }
        $('input', item).focus();
    };

    // Watch for changes to the email, in order to reset the error message.
    this.recipient_email.subscribe(function() {
        if (self.recipient_email_error())
            self.recipient_email_error(false);
    });

    // Handle pasting strings like 'Neal Tucker <ntucker@area.com>' into the name and email fields.
    this.pasteFixup = function(which) {
        var match = /(.+)<(.+@.+)>/.exec(self[which]());
        if (match) {
            var name  = $.trim(match[1]);
            var email = $.trim(match[2]);
            if (which == 'recipient_name') {
                self.recipient_name(name);
                self.recipient_email(email);
            } else {
                if (self.recipient_name().length === 0)
                    self.recipient_name(name);
                self.recipient_email(email);
            }
        }
    };

    this.pasteNameEvent = function(data, event) {
        setTimeout(function() {self.pasteFixup('recipient_name');}, 0);
        return true;
    };

    this.pasteEmailEvent = function(data, event) {
        setTimeout(function() {self.pasteFixup('recipient_email');}, 0);
        return true;
    };
};
;
/* ------------- BEGIN download_panel.js --------------- */;
/* global BandData, DownloadPanelVM, GiftPanelVM, TralbumData, MediaView, Dom, TextFormat, CurrencyData, elt, Form, addCharacterCountdownEventListeners, FormUtils, FacebookUtils, Text, Y, WatchInput, PaymentData, Browser, BandFollow, ClientPrefs, ClientPrefsObservable, Sidecart, CountryPrefPanel, FieldHints, Stats, $assert, Url, Geo, Templ, PhysicalGiftViewModel, ClientID, ImageUtils, U */

// contains code called from at least a couple of other places, including the sidecart.

// mixed into TralbumDownload, PackageOrder
var PurchaseNote = (function () {
'use strict';
return {

    setupPurchaseNote: function () {
        var self = this;

        $("#purchase-note-link a").click(function () {
            self.revealPurchaseNote();
            return false;
        });

        $("#purchase-note-footer .cancel").click(function () {
            self.cancelPurchaseNote();
            return false;
        });
    },

    revealPurchaseNote: function () {
        Dom.display("purchase-note-link", false);
        Dom.display("purchase-note-entry", true);
        $('#purchase-note-input').focus();
        addCharacterCountdownEventListeners(elt("purchase-note-input"), elt("purchase-note-countdown"), 300);
    },

    cancelPurchaseNote: function () {
        Dom.display("purchase-note-link", true);
        Dom.display("purchase-note-entry", false);
        $("#purchase-note-input").val("");
        
        if (window.MediaView && MediaView.mode == "phone") {
            //smaller screens need to be recentered
            Dom.scrollToElement(this._dlg.dialog("widget"));
        }
    },

    purchaseNote: function (){
        var purchase_note = $.trim($("#purchase-note-input").val());
        return purchase_note ? purchase_note : null;
    }
};
})();

// ----------------------------------------------------------------------

// mixed into TralbumDownload, PackageOrder
var PriceValidation = (function () {
'use strict';
return {

    validatePrice: function (priceElem, maxPrice) {
        // The Form utility is not well-suited to doing validation
        // in dialogs, so let's do it ourselves.

        priceElem = elt(priceElem);
        var alertElem = elt(priceElem.id + "_alert");

        FormUtils.showHideAlert(alertElem, null);
        var errorMsg = this.priceError(priceElem, maxPrice);
        if (errorMsg) {
            // We don't escape the text as it will mangle some currency entities;
            // this should all be text that we control anyway.
            FormUtils.showHideAlert(alertElem, errorMsg);
            $(priceElem).focus();
            return false;
        }

        return true;
    },

    priceError: function (priceElem, maxPrice) {
        priceElem = elt(priceElem);
        var minPrice = this._discountVM.unitPrice();
        maxPrice = maxPrice || this._seller.max_price;
        var price = Form.validate.parsePrice(priceElem.value);
        var errorMsg = null;

        if (isNaN(price)) {
            errorMsg = "Please provide a price.";
        } else if (price < minPrice) {
            errorMsg = "The minimum price is " +
                       TextFormat.currency(minPrice, this._currency, false, true, true) + ".";
        } else if (price > 0 && price < this._absoluteMinPrice) {
            // test this after minPrice-- it's here for albums that have a minimum of zero;
            // also, older tralbums have lower set/minimum prices than the current limits
            errorMsg = "The minimum price you can specify is " + TextFormat.currency(this._absoluteMinPrice, this._currency, false, true, true) +
                       ". Please enter either zero, or at least " +
                       TextFormat.currency(this._absoluteMinPrice, this._currency, false, true, true) + ".";
        } else if (price > maxPrice) {
            errorMsg = "The maximum price you can specify is " +
                       TextFormat.currency(maxPrice, this._currency, false, true, true) + ".";
        }

        return errorMsg;
    },

    xxx: null
};
})();

// ----------------------------------------------------------------------

// mixed into TralbumDownload, PackageOrder
var NotifyMe = (function () {
'use strict';
return {
    notifyMe: function (){
        var notify_me_elem = $('#notify-me');
        return notify_me_elem ? $(notify_me_elem).is(':checked') : null;
    },
    
    notifyMeLabel: function (){
        var notify_me_label_elem = $('#notify-me-label');
        return notify_me_label_elem ? $(notify_me_label_elem).is(':checked') : null;
    }
};
})();

// ----------------------------------------------------------------------

var ChargeEmail = (function () {
'use strict';
return {

    // This library was written to support its own stand-along dialog;
    // its form is now embedded into the download dialog, which calls into this library
    // still, to do validation.  It should maybe be merged with TralbumDownload.

    validate_dialog : function () {
        var address = U.trim(elt("fan_email_address").value);
        var email_rex = /(^)([^\s\(\)"\'/><,]+@\w([^\s\(\)"\'/><&,]*\w)?\.\w[^\s\(\)"\'/><&,]*\w)($)/;

        function focusElem(id) {
            if (!window.MediaView || MediaView.mode != "phone") {
                Dom.focus(id);
            }
        }

        if (!email_rex.test(address)) {
            ChargeEmail.show_error("Please enter a valid email address.");//UISTRING
            focusElem("fan_email_address");
            return false;
        }

        // save this to show in the Thanks dialog
        ChargeEmail._address = address;

        if ($("#no_loc").val() != "1") {
            // a new case where loc. info is optional: pure free DLs turned
            // into email downloads on iOS and other closed platforms
            
            // seperators, beginning with "--", are not valid countries
            if (/^--/.test($("#fan_email_country").val())) {
                ChargeEmail.show_error("Please choose a country");//UISTRING
                focusElem("fan_email_country");
                return false;
            }

            // TBD: is this too simplistic?  All we're checking for is
            // at least 5 non-space characters.
            var minchars = 1;
            if ($("#fan_email_country").val() == "United States") {
                minchars = 5;
            }
            var postcode = elt("fan_email_postalcode").value;
            postcode = postcode.replace(' ', '', 'g'); //remove spaces

            if (postcode.length < minchars || postcode.length > 10) {
                ChargeEmail.show_error("Please enter a valid " + ChargeEmail._postcode_name() + ".");//UISTRING
                focusElem("fan_email_postalcode");
                return false;
            }
        }

        return true;
    },

    update_dialog : function () {
        // if a country has been chosen, update
        // the field hint to say "postal code" or "zip code",
        // whichever is appropriate
        if (!/^--/.test($("#fan_email_country").val())) {
            var e = $("#fan_email_postalcode").attr({
                "title":   ChargeEmail._postcode_name(),
                "pattern": ChargeEmail._postcode_entry_pattern()
            }).get(0);
            if (e) {
                FieldHints.updateHint(e);
            }
        }
    },

    show_error : function (msg) {
        $("#fan_email_error").show().text(msg);
    },
    
    // In safari, hitting the return key can early-dismiss the dialog
    filter_returnkey : function () {
        return !(window.event && window.event.keyCode == 13);
    },
    
    _is_usa: function () {
        return $("#fan_email_country").val() == "United States";
    },

    _postcode_name : function () {
        return ChargeEmail._is_usa() ? "zip code" : "postal code"; //UISTRING
    },
    
    _postcode_entry_pattern: function () {
        // the numeric pattern forces a numbers-only keypad, at least on iOS
        return window.MediaView && MediaView.mode == "phone" && ChargeEmail._is_usa() ? "[0-9]*" : ".*";
    }
};
})();

// ----------------------------------------------------------------------

var TralbumDownload = (function () {
'use strict';
return {
        
    initialized: false,

    init: function () {
        Y.lang.augmentObject(TralbumDownload, WatchInput); // loads after us
        Y.lang.augmentObject(TralbumDownload, PriceValidation);
        Y.lang.augmentObject(TralbumDownload, PurchaseNote);
        Y.lang.augmentObject(TralbumDownload, NotifyMe);
    },

    // This is the main entry point for clicks on the "Download" links on tralbum pages.
    // In the normal purchasing/gather-email cases it posts a dialog.
    // 
    // If warranted (pure-free, or email pre-authorised) it will short-circuit to a direct download.
    // If you have payments present (usually via cookie), we offer a redownload option upfront
    // and again skip to the direct download.  Mobile platforms will get a warning or outright
    // rejection before proceeding.
    // 
    // Invoked by the controller so we know JS is loaded.
    // 
    
    begin: function (event, isGift) {
        var cfgFlags = $("#pagedata").data("blob").cfg || {};
        if (cfgFlags.BALLS_disable_digital_sales) {
            NuDialog.alert('Music Sales', "Digital music sales will be back shortly. Please try your purchase again in one hour. Sorry for the inconvenience!");
            return;
        }

        if (window.FacebookData) {
            var patchYui = false;
            if (isGift) {
                FacebookUtils.correctSrollThen(patchYui, TralbumDownload, TralbumDownload.beginGift, event);
            } else {
                FacebookUtils.correctSrollThen(patchYui, TralbumDownload, TralbumDownload.beginInner, event);
            }
        } else {
            if (isGift) {
                this.beginGift(event);
            } else {
                this.beginInner(event);
            }
        }
    },

    // BEGIN GIFT CHANGES
    // 

    // should this whole chunk of code be organized differently?
    beginGift: function (event, giftDetails){
        var self = this;

        // if the gifting cfgfeature is off, stop
        var pageData = $("#pagedata").data("blob") || {};
        giftDetails = giftDetails || {};
        if (pageData && pageData.cfg && !pageData.cfg.gifting) {
            return;
        }

        //pageData.fan_name = "Joe Holt";
        //pageData.gift_recipient_name = "Drew Harris";
        //pageData.gift_recipient_fan_id = 42;

        // remove previous dialog references
        this.destroy();

        // should never get here, but if you do: free albums can't be gifts
        if (TralbumData.current.download_pref == TralbumData.FREE) {
            return;
        }

        if (!giftDetails.sender_name && pageData.fan_name) {
            giftDetails.sender_name = pageData.fan_name;
        }
        if (!giftDetails.recipient_name && pageData.gift_recipient_name) {
            giftDetails.recipient_name = pageData.gift_recipient_name;
        }

        if (pageData.gift_recipient_fan_id) {
            giftDetails.recipient_fan_id = pageData.gift_recipient_fan_id;
            giftDetails.is_for_fan = true;
            delete pageData.gift_recipient_fan_id;
        }

        // open the gift dialog
        var element = $("<div>");
        self._dlg = NuDialog.alertHTML("Gift", element, {
            width: "36em",
            buttons: []
        });

        // Render the dialog contents to avoid any autofocus of elements
        element.renderLiquid("gift_panel", giftDetails);

        var position;
        if (window.FacebookData && window.FacebookData.positionInfo) {
            position = [event.clientX, event.clientY];
        } else {
            position = {my: 'center center', at: 'center center', of: window };
        }
        this._dlg.dialog("option", "position", position);


        var giftPanelVM = new GiftPanelVM(giftDetails, "#gift-panel-vm");
        ko.applyBindings(giftPanelVM, giftPanelVM.panel[0]);
        if (!window.MediaView || MediaView.mode != "phone") {
            giftPanelVM.focus();
        }

        this._dlg.on("dialogclose", function () {
            self._dlg = null;
        });
        
        return this._dlg;
    },

    beginGiftConfirmation: function (event, giftDetails) {
        var self = this;

        // remove old dialog references
        this.destroy();

        // show the gift confirm dialog
        if (window.FacebookData && window.FacebookData.positionInfo) {
            self._dlg = NuDialog.showTemplate("gift_confirm", giftDetails, { title: "Confirm Recipient Email", width: "36em", buttons: [], position: [event.clientX, event.clientY] });
        } else {
            self._dlg = NuDialog.showTemplate("gift_confirm", giftDetails, { title: "Confirm Recipient Email", width: "36em", buttons: [] });
        }

        var container = $("#gift_confirm_form");

        var giftConfirm = {
            confirm: container.find("#confirm"),
            goBack: container.find("#goback")
        };

        giftConfirm.confirm.on("click", function (e) {
            self.destroy();
            if (window.FacebookData) {
                FacebookUtils.correctSrollThen(false, TralbumDownload, TralbumDownload._begin, event, giftDetails);
            } else {
                self._begin(event, giftDetails);
            }
        });

        giftConfirm.goBack.on("click", function (e) {
            self.destroy();
            giftDetails.fixing_email = true;
            if (window.FacebookData) {
                FacebookUtils.correctSrollThen(false, TralbumDownload, TralbumDownload.beginGift, event, giftDetails);
            } else {
                self.beginGift(event, giftDetails);
            }
        });

        this._dlg.on("dialogclose", function () {
            self._dlg = null;
        });

        return this._dlg;
    },

    beginInner: function (event) {
        
        var tralbum = TralbumData.current;
        var dlg = null;

        // Currently have one isolated case where we warn off downloaders, outside of the download dialog itself:
        // free album downloads on Android. Revisit this if we decide to offer an email out to these customers.
        // 
        if (this.androidBailout(function () { TralbumDownload.freeDownloadBailout(); })) {
            return;
        }

        // We offer re-downloading as a convenience, when payment cookies are present.
        // This is offered for paid (as in money) and code downloads.
        // 
        if (PaymentData.paymentType != 'email' && PaymentData.paymentDownloadPage) {

            // OK, uncommon case: you've got a code (or paid, in the past) for a tralbum
            // which is now free or free-with-email.  In this case we short-circuit the
            // "you've already paid for" and go to the download page, because it's weird to
            // click on "Free Download" and get a message about not having to buy it again
            // Whatever, it's free right?? We check the free status (regardless of email
            // flag), and bypass the confirmation.
            
            if (tralbum.download_pref == TralbumData.FREE) {
                window.top.location.href = PaymentData.paymentDownloadPage;
                return null;
            }

            dlg = NuDialog.showTemplate("redownload_confirm", {
                item_type: TralbumData.current.type,
                payment_type: PaymentData.paymentType
            }, {
                title: "Download " + ((TralbumData.current.type=="track")? "Track" : "Album"),
                buttons: {
                    "Re-Download" : function () {
                        window.top.location.href = PaymentData.paymentDownloadPage;
                    },
                    "Buy Another" : function () {
                        TralbumDownload._begin();
                    }
                }
            });
            return dlg;
        }


        // Additionally, pure-free or email-required-but-we-have-your-email downloads also
        // skip the dialog and go right to the download page.  Note that with NYP-zero-email-required,
        // we still go through the dialog, then present the download after the fan enters zero.
        // 
        if (this.freeDownloadBailout()) {
            return null;
        }

    	return this._begin(event);
    },

    _begin: function (event, giftDetails) {

        this.destroy(); // just in case, nuke old dialog references
        
        var blob = $("#pagedata").data("blob") || {};

        var tralbum = TralbumData.current;
        var isSetPrice = (tralbum.is_set_price === 1);
        this._seller = blob.item_sellers[tralbum.selling_band_id];
        this._currency = CurrencyData.info[this._seller.currency];
        this._absoluteMinPrice = this._currency[tralbum.type === 'album' ? 'medium_min_price' : 'small_min_price'];
        var dialogHasDiscounts = TralbumData.has_discounts && (isSetPrice || tralbum.minimum_price > 0);
        var requireEmail = tralbum.require_email && (PaymentData.paymentType != 'email' || !PaymentData.paymentDownloadPage);

        var setPrice, minimumPrice;

        if (isSetPrice) {
            setPrice = tralbum.set_price;
            minimumPrice = undefined;
            this.taxablePrice = setPrice;
        } else {
            setPrice = undefined;
            if (tralbum.minimum_price) {
                minimumPrice = tralbum.minimum_price;
            } else if (giftDetails) {
                minimumPrice = (tralbum.type == "track" ? this._currency.small_min_price : this._currency.medium_min_price);
            } else {
                minimumPrice = 0.0;
            }
            this.taxablePrice = minimumPrice;
        }

        var cfg = blob.cfg || {};
        var mediaMode = (window.MediaView ? MediaView.mode : null);

        var dlInfo = {
            download_info: {
                isSetPrice: (tralbum.is_set_price == 1),
                setPrice: setPrice,
                minimumPrice: minimumPrice,
                requireEmail: requireEmail,
                offerEmail: this.offerEmailBailout(),
                hasAudio: TralbumData.hasAudio,
                freeDownload: (tralbum.download_pref == TralbumData.FREE),
                paidDownload: (tralbum.download_pref == TralbumData.PAID),
                prefix: false,
                donation: false,
                band: BandData,
                use_group: (Browser.type == "ie"),
                has_discounts: dialogHasDiscounts,
                unitId: (tralbum.type.charAt(0) + tralbum.id),
                basePrice: (setPrice || minimumPrice),
                xxx : null
            },

            // For the embedded email form:
            id: tralbum.id,
            type: tralbum.type,
            item_type: (tralbum.type == "track" ? "track" : "album"), // UISTRING, just being pedantic
            band: BandData,
            no_codes: true,
            dialog_class: "TralbumDownload",
            dialog_class_object: TralbumDownload,
            fan_id: window.BandFollow && BandFollow.fan_id,

            seller: this._seller,
            seller_currency_prefix: this._currency.prefix,

            // For currency
            shipping_show_min_price: !tralbum.is_set_price,
            buyer_currency: ClientPrefs.currency,

            cart_has_contents: (Sidecart.cart_items.length > 0),
            media_mode: mediaMode,
            platform: Browser.platform,
            is_mobile_app_compatible: Browser.mobile_app_compatible,
            cfg: cfg,
            is_device: (Browser.platform_closed || Browser.platform == "android"),
            platform_name: Browser.platform_name,
            show_notify_me: (!window.BandFollow || !window.BandFollow.fan_id) && tralbum.download_pref != TralbumData.FREE,
            show_notify_me_label: !blob.fan_follows_label,
            options_footer: this.showPurchaseOptionsFooter && this.generatePackageOptionsStr(TralbumData.packages, TralbumData.is_bonus),
            has_digital_vat: this.hasDigitalVAT(),
            is_gift: !!giftDetails,
            buyer_country: this.buyerCountry()
        };

        this.showPurchaseOptionsFooter = false;
        this.subTotal = setPrice || minimumPrice;
        dlInfo.sub_total = this.subTotal;
        dlInfo.shipping_disp_subtotal = TextFormat.currency(this.converted_subtotal(this.subTotal), CurrencyData.info[ClientPrefs.currency], false, true, true);

        // Open the dialog
        var element = $("<div>");
        var panelTitle = "Digital " + (tralbum.type == "track" ? "Track" : "Album");
        if (giftDetails) {
            panelTitle = "Gift: " + panelTitle;
        }
        this._dlg = NuDialog.alertHTML(panelTitle, element, {
            width: "35.5em",
            buttons: [],
            dialogClass: "nu-dialog no-padding"
        });

        // Render the dialog contents to avoid any autofocus of elements
        element.renderLiquid("download_panel", dlInfo);

        var position;
        if (window.FacebookData && window.FacebookData.positionInfo) {
            position = [event.clientX, event.clientY];
        } else {
            position = {my: 'center center', at: 'center center', of: window };
        }
        this._dlg.dialog("option", "position", position);

        var downloadPanelVM = new DownloadPanelVM(dlInfo, this, "#download-panel-vm");
        ko.applyBindings(downloadPanelVM, downloadPanelVM.panel[0]);

        this.watchInput("userPrice");

        this._discountVM = downloadPanelVM.panes.discount;
        this._pricingVM = downloadPanelVM.panes.pricing;
        this.setupPurchaseNote();

        var self = this; // can't use 'this' inside closures to get back to TralbumDownload

        if (!this.country_pref) {
            this.country_pref = CountryPrefPanel.make(function (new_country) {self.oncountry_change(new_country);});
        }

        if (!window.MediaView || MediaView.mode != "phone") {
            Dom.select("userPrice", true);
        }
        if ($("#email-section:visible").length > 0) {
            ChargeEmail.update_dialog(); // sets up field hint and postal code input pattern
        }
        if (elt("fan_email")) {
            FieldHints.init("fan_email");
        }

        this._dlg.on("dialogclose", function () {
            self.country_pref.hide();
            self._dlg = null;
        });

        if (tralbum.download_pref == TralbumData.PAID) {
            Stats.record({kind:"click", click:"paid_download_presented"});
        }

        // store gift details in _dlg, since it will have similar lifetime to the gift details
        if (giftDetails) {
            self._dlg.data("gift_details", giftDetails);
        }
        
        return this._dlg;
    },

    hasDigitalVAT: function () {
        return (this._seller.digital_vat_enabled && ClientPrefsObservable.isEU() && this.taxablePrice > 0);
    },

    buyerCountry: function () {
        var buyerLocation = $("#pagedata").data('blob').buyer_location;
        return buyerLocation === undefined ? null : buyerLocation.country_code;
    },

    //In safari, hitting the return key can early-dismissing the dialog
    filter_returnkey : function (e) {
        if (e && e.keyCode == 13) {
            if (e.target && e.target.id == "purchase-note-input") {
                return true;
            }

            TralbumDownload.checkout('cart');
            return false;
        }
        
        return true;
    },

    grab_price_from_dialog: function () {
        var price;

        this.validPrice = true;
        if (TralbumData.current.download_pref == TralbumData.PAID) {
            if (TralbumData.current.is_set_price) {
                price = this._discountVM.unitPrice();
            } else {
                price = Form.validate.parsePrice(elt("userPrice").value);
                var unitPrice = this._discountVM.unitPrice(); // the minimum price, possibly discounted
                this.validPrice = !(isNaN(price) || price < unitPrice);
                if (this.validPrice) {
                    this._pricingVM.userPrice(price);
                } else {
                    price = unitPrice;
                    this._pricingVM.userPrice(null);
                }
            }
            this.subTotal = price;
            this._pricingVM.subTotal(price); // update the view model
        }

        return this.validPrice ? price : undefined;
    },

    inputChanged: function (ignore) {
        var amt = this.grab_price_from_dialog();

        // switch around form contents based on name-your-price input and settings
        // these fields only come and go depending on the NYP userPrice entry-- for
        // other checkout types, the form is built to spec up front and doesn't
        // change around.
        
        var dlStep = "paypal";

        if (amt === 0) { // only zero - if undefined/NaN, stick with PayPal display
            var needEmail = (TralbumData.current.require_email_0 && (PaymentData.paymentType != 'email' || !PaymentData.paymentDownloadPage)) ||
                            this.offerEmailBailout();
            dlStep = (needEmail ? "email" : "download");
        }

        if (amt > 0) {
            $(".purchase-note-section").show("fast");
        } else if (amt === 0) {
            this.cancelPurchaseNote();
            $(".purchase-note-section").hide("fast");
        }

        Dom.display([ "downloadButtons_paypal", "downloadFinalStep_paypal", "download-aftercheckout" ], dlStep == "paypal");
        Dom.display([ "email-section", "downloadButtons_email", "downloadFinalStep_email" ], dlStep == "email");
        Dom.display([ "downloadButtons_download", "downloadFinalStep_download" ], dlStep == "download");
        Dom.display([ "notify-me-section", "notify-me-label-section"], dlStep == "paypal");

        if (dlStep == "email") {
            ChargeEmail.update_dialog();
            FieldHints.jiggleHint("fan_email_address");
            FieldHints.jiggleHint("fan_email_postalcode");
            
            // Doesn't appear to work in iOS.  (Possibly by design.)  So, skipping this for now:
            // $("#fan_email_address").focus();
        }

        // maybe remove an obsolete NYP validation error
        if (this.isNYP() && !this.priceError("userPrice")) {
            FormUtils.showHideAlert("userPrice_alert", null);
        }
    },

    updateCurrencyDisplay: function () {
        this.grab_price_from_dialog();

        // clear any existing NYP validation error
        FormUtils.showHideAlert("userPrice_alert", null);
    },

    // Called to handle the finish buttons in the download dialog-- including email-required,
    // and "Download" for direct-to-download-page scenarios.  This is centralized partly because
    // of return-key handling which doesn't understand the context and which button to fire,
    // so we vet the whole process here.
    //
    // Note: pure-free and email-preauthed downloads now SKIP the dialog entirely, they bail out
    // on clicking the download link: see TralbumDownload.begin.
    //
    checkout: function (how) {
        if (!this._dlg) { // this will not be valid if we have direct checkout buttons on the page...
            return;
        }

        var self = this;
        var price = null;

        // clear any existing NYP validation error
        FormUtils.showHideAlert("userPrice_alert", null);

        // Handle the case where user had entered discount code but we haven't verified it yet.
        // This needs to happen before the NYP vetting, below, because it could change the minimum price.
        if (!this._discountVM.discountVerified()) {
            // Abort checkout as we look up the new discount code and allow the user to see the result.
            return;
        }

        if (this.isNYP()) {

            // Name-your-price: need to vet it
            if (!this.validatePrice("userPrice")) {
                return;
            }

            price = Form.validate.parsePrice(elt("userPrice").value);
            if (price === 0) {

                $assert(TralbumData.current.minimum_price === 0); // validatePrice should prevent this

                if (!this.freeDownloadBailout(true)) {
                    this.submitEmail();
                }

                return;
            }

        } else if (TralbumData.current.download_pref == TralbumData.FREE) {

            // We currently short-circuit direct-to-the-download-page actions
            // (both pure-free, and email-required-but-we-have-it-already),
            // but this code remains while we shake it out.  At some point we
            // should assert as a failure all paths that don't let us
            // immediately call this.submitEmail.  -- kj 2011-02-01

            if (this.offerEmailBailout() || !this.freeDownloadBailout(false)) {
                this.submitEmail();
                return;
            }

            $assert(false, "Unexpected: should have already bailed out to a free/email download");
            return;
        }

        // We're doing a fixed or user-set price, ferealz
        var args = {};

        args.checkout_now = (how != 'cart');
        args.item_title = TralbumData.current.title;
        args.item_title2 = null;
        args.item_type = TralbumData.current.type == "track" ? "t" : "a";
        args.item_id = TralbumData.current.id;
        args.preorder = TralbumData.is_preorder;
        args.has_download = true;
        args.band_id = BandData.id;
        args.artist_name = TralbumData.artist;
        args.unit_price = price || this._discountVM.unitPrice();
        args.currency = this._currency.symbol;
        args.quantity = 1;
        args.option_id = null;
        args.option_name = null;
        args.discount_id = this._discountVM.discountID();
        args.discount_type = this._discountVM.discountType();
        args.url = TralbumData.url;
        args.purchase_note = this.purchaseNote();
        args.notify_me = this.notifyMe();
        args.notify_me_label = this.notifyMeLabel();

        var gift_details = self._dlg ? self._dlg.data("gift_details") : null;
        if (gift_details) {
            args.is_gift = true;
            args.gift_sender_name = gift_details.sender_name;

            // fan id with no email override
            if (gift_details.recipient_fan_id && gift_details.recipient_email.length === 0) {
                args.gift_recipient_fan_id = gift_details.recipient_fan_id;
            } else {
                args.gift_recipient_email = gift_details.recipient_email;
            }
            
            args.gift_recipient_name = gift_details.recipient_name;
            args.gift_sender_note = gift_details.sender_note;
        }

        args.art_id = TralbumData.current.art_id;
        Sidecart.add_to_cart(args);

        this.destroy();
        return;
    },

    isNYP: function () {
        return (TralbumData.current.download_pref == TralbumData.PAID) && !TralbumData.current.is_set_price;
    },
    
    // TODO: Clean this up via knockout
    //
    submitEmail: function () {
        if (!ChargeEmail.validate_dialog() || !this._dlg) {
            return;
        }

        $("form", this._dlg).submit();
    },

    // For the tralbum download dialog footer
    //
    generatePackageOptionsStr: function (packages, viaSubscription) {
        var options = [];
        var optionStr = null;
        var hasCD = false;
        var hasVinyl = false;
        var hasCassette = false;

        if (packages) {
            $.each(packages, function (index, item) {
                switch (item.type_id) {
                    case 1:
                        if (!hasCD) {
                            options.push('CD');
                            hasCD = true;
                        }
                        break;
                    case 2:
                        if (!hasVinyl) {
                            options.push('vinyl');
                            hasVinyl = true;
                        }
                        break;
                    case 3:
                        if (!hasCassette) {
                            options.push('cassette');
                            hasCassette = true;
                        }
                        break;
                }
            });
        }
        if (options.length > 0) {
            optionStr = "Also available ";
            switch (options.length) {
                case 0: // shouldn't happen
                    if (viaSubscription) {
                        optionStr += "via subscription.";
                    }
                    break;
                case 1:
                    optionStr += "on " + options[0] + (viaSubscription ? " or via subscription." : ".");
                    break;
                case 2:
                    if (viaSubscription) {
                        optionStr += "on " + options[0] + ", " + options[1] + " or via subscription.";
                    } else {
                        optionStr += "on " + options[0] + " and " + options[1] + ".";
                    }
                    break;
                case 3:
                    optionStr += "on " + options[0] + ", " + options[1] + ", " + options[2] + (viaSubscription ? " or via subscription." : ".");
                    break;
            }
        } else if (viaSubscription) {
            // Subscription only
            optionStr = "Also available via subscription.";
        }

        return optionStr;
    },

    // For pure-free downloads on closed platforms, offer to send an email instead.
    //
    // To clarify: since all paid/email items get receipts with links, we are only concerned here
    // with pure-free digital downloads; this is for tralbums on closed platforms, plus albums only
    // on Android (since they result in zip files).
    //
    offerEmailBailout: function () {
        var tralbum = TralbumData.current;
        var closed = Browser.platform_closed;

        return closed && ((tralbum.download_pref == TralbumData.FREE && !tralbum.require_email) ||
                          (tralbum.download_pref == TralbumData.PAID && !tralbum.is_set_price &&
                            tralbum.minimum_price === 0 && !tralbum.require_email_0));
    },
    
    // Returns true if the download is a pure-free album on Android, so we can go through a warning alert first
    // 
    androidBailout: function (continueFn) {
    
        var tralbum = TralbumData.current;
        var freeDownload = (tralbum.download_pref == TralbumData.FREE && !tralbum.require_email);
        
        // Pure free download -- warn android users before proceeding.
        // All other free-like DLs will pop a dialog with warning text in it.
        //
        if (freeDownload && Browser.platform == "android" && tralbum.type == "album") {
            var title = "Digital " + (tralbum.type == "track" ? "Track" : "Album"); // UISTRING
            var msg = "Downloading to Android may require some advanced fiddling. If you are not the advanced sort, we recommend downloading from your computer instead.";
            NuDialog.alert(title, msg, { buttons: { "Continue": continueFn } }, false);
            return true;
        }
    
        return false;
    },
    
    // Possibly bails out to another page, depending on tralbums settings
    // and presence of the page to navigate to.  If you're calling this for
    // a paid album (NYP-zero-email-required), you should have already vetted
    // that the user entered zero.
    // 
    freeDownloadBailout: function (yesZeroWasEntered) {
        var tralbum = TralbumData.current;
        var requireEmail;

        if (this.offerEmailBailout()) {
            // closed platform. always go to the dialog and offer an email
            // for any path that results in a free download
            return false;
        }

        if (tralbum.download_pref == TralbumData.PAID) {
            if (tralbum.is_set_price || tralbum.minimum_price > 0 || !yesZeroWasEntered) {
                return false;
            }

            requireEmail = tralbum.require_email_0;

        } else if (tralbum.download_pref == TralbumData.FREE) {
            requireEmail = tralbum.require_email;

        } else {
            $assert(false, "freeDownloadBailout: should not be making this check on this tralbum (2)");
            return false;
        }

        // TODO: XHR call for correct/current URLs goes here (TralbumData.roundtrip)

        if (requireEmail) {
            if (PaymentData.paymentType == 'email' && PaymentData.paymentDownloadPage) {
                this.navigate(PaymentData.paymentDownloadPage);
                return true;
            }
            // Email-required downloads may or may not have been pre-authorized--
            // caller decides how to handle that

        } else {
            if (TralbumData.freeDownloadPage) {
                this.navigate(TralbumData.freeDownloadPage);
                return true;
            } else {
                $assert(false, "freeDownloadBailout: missing pure-free download url");
                // pure-free tralbums should always come with a free-download URL
            }
        }
        
        return false;
    },
    
    navigate: function (url) {
        if (window.FacebookData) {
            url = url + "&orig=f" + BandData.id;
        }
        window.top.location.href = url;
    },
    
    destroy: function () {
        if (this._dlg) {
            this._dlg.dialog("close");
            $assert(this._dlg === null); // we should do this via notification
        }
    },
    
    roundtrip: function (event, params) {
        if (event) {
            Y.util.Event.preventDefault(event);
        }
        Y.util.Connect.asyncRequest("POST", "/download_page_cb", this.roundtrip_cb, Url.joinQuery({ 'url': params.url }));
    },

    roundtrip_cb: {
        success: function (o) {
            var response = JSON.parse(o.responseText);
            if (response.ok && response.url) {
                window.top.location.href = response.url;
            } else {
                NuDialog.alert("Download", "Sorry, there was an unexpected problem. Please reload this page and try again." ); // UISTRING
                Log.info("download_page_cb failure: status: " + o.status + "; statusText: " + o.statusText);
            }
        },
        failure: function (o) {
            NuDialog.alert("Download", "Sorry, there was an unexpected problem. Please reload this page and try again." ); // UISTRING
            Log.info("download_page_cb failure: status: " + o.status + "; statusText: " + o.statusText);
        }
    },

    show_currency_summary: function (event) {
        Y.util.Event.stopEvent(event);
        this.country_pref.show(elt("currencyToggle"), false);
    },

    show_country_pref: function (ev) {
        var target = ev.target || ev.srcElement;
        Y.util.Event.preventDefault(ev);
        this.country_pref.show(target, true);
    },

    oncountry_change: function (new_country) {
        if (this._dlg) {
            this.country_pref.hide();
            this.request({req: 'country3', country: new_country.country, us_zip: new_country.us_zip});  // set the client's country pref
        }
    },
    
    converted_subtotal: function (subtotal) {
        if (this._currency.symbol == ClientPrefs.currency) {
            return subtotal;
        } else {
            // CONVERT subTotal from seller's currency to the buyer's (ClientPrefs.currency)
            var rate = CurrencyData.rates[this._currency.symbol] / CurrencyData.rates[ClientPrefs.currency];
            return subtotal * rate;
        }
    },
    
    request: function (data) {
        var self = this;
        var cb = {
            success: function (o) {self.req_success(o);},
            failure: function (o) {self.req_failure(o);}
        };
        data.client_id = ClientID;
        var d = Url.joinQuery(data);
        Y.util.Connect.asyncRequest('POST', '/cart/cb', cb, d);
    },

    req_success: function (o) {
        var data = JSON.parse(o.responseText);

        if (data.error) {
            Log.debug("Cart ERROR");
        }
        if (data.req == "country3") {
            this.req_country3(data);
        }
    },

    req_failure: function (o) {
    },

    req_country3: function (data) {
        // actually nothing to do, we've already set the client pref
    },

    zzz: null

};
})();

// ----------------------------------------------------------------------

var PackageOrder = (function () {
'use strict';
return {

    init: function () {
        Y.lang.augmentObject(PackageOrder, WatchInput); // loads after us
        Y.lang.augmentObject(PackageOrder, PriceValidation);
        Y.lang.augmentObject(PackageOrder, PurchaseNote);
        Y.lang.augmentObject(PackageOrder, NotifyMe);
    },

    begin: function (packageIndex, isGift) {

        var cfgFlags = $("#pagedata").data("blob").cfg || {};
        if (cfgFlags.BALLS_disable_merch_sales) {
            NuDialog.alert('Merch Sales', "Merchandise sales will be back shortly. Please try your purchase again in one hour. Sorry for the inconvenience!");
            return;
        }
        
        if ($("#pagedata").data("blob").notify_me_data) {
            window.NotifyMeData = $("#pagedata").data("blob").notify_me_data;
        }
        
        if (window.FacebookData) {
            var patchYui = false;
            if (isGift) {
                FacebookUtils.correctSrollThen(patchYui, PackageOrder, PackageOrder.beginGift, packageIndex);
            } else {
                FacebookUtils.correctSrollThen(patchYui, PackageOrder, PackageOrder._begin, packageIndex);
            }
        } else {
            if (isGift) {
                this.beginGift(packageIndex);
            } else {
                this._begin(packageIndex);
            }
        }
    },

    beginGift: function (packageIndex, giftDetails) {
        // gift panel similar to above, but with knockout to make updating the address format for localization easier
        
        var self = this;

        var pageData = $("#pagedata").data("blob") || {};
        giftDetails = giftDetails || {};

        if (pageData && pageData.cfg && (!pageData.cfg.physical_gifting || pageData.cfg.BALLS_disable_physical_gifting)) {
            return;
        }

        // remove previous dialog references
        self.destroy();

        // pre-populate some dialog details
        if (!giftDetails.sender_name && pageData.fan_name) {
            giftDetails.sender_name = pageData.fan_name;
        }
        if (!giftDetails.recipient_name && pageData.gift_recipient_name) {
            giftDetails.recipient_name = pageData.gift_recipient_name;
        }

        giftDetails.is_us_buyer = Geo.isUSBuyer();

        // this might not work, depending on how we decide which gift dialog to open from wishlist/download (digital vs. physical)
        if (pageData.gift_recipient_fan_id) {
            giftDetails.recipient_fan_id = pageData.gift_recipient_fan_id;
            delete pageData.gift_recipient_fan_id;
        }

        giftDetails._hide_cancel = true;
        giftDetails._continue_text = "Continue";
        
        if (pageData.cfg) {
            giftDetails._use_zip_regex = pageData.cfg.physical_gifting_zip_regex; // allow us to turn on and off the zip code regex validation
        }

        // open the gift dialog
        var element = $("<div>");
        self._dlg = NuDialog.alertHTML("Gift", element, {
            width: "35.5em",
            buttons: []
        });

        // Render the dialog contents to avoid any autofocus of elements
        element.renderLiquid("physical_gift_panel", giftDetails);

        var position;
        if (window.FacebookData && window.FacebookData.positionInfo) {
            position = [event.clientX, event.clientY];
        } else {
            position = {my: 'center center', at: 'center center', of: window };
        }
        this._dlg.dialog("option", "position", position);


        // knockout setup and binding

        var physicalGiftVM = new PhysicalGiftViewModel(giftDetails, function (newGiftDetails){
            if (window.FacebookData) {
                FacebookUtils.correctSrollThen(false, PackageOrder, PackageOrder.beginGiftConfirmation, packageIndex, newGiftDetails);
            } else {
                PackageOrder.beginGiftConfirmation(packageIndex, newGiftDetails);
            }
        });
        ko.applyBindings(physicalGiftVM, $("#physical-gift-vm")[0]);

        this._dlg.on("dialogclose", function () {
            self._dlg = null;
        });

        // window.physicalGiftVM = physicalGiftVM;

        return this._dlg;
    },

    beginGiftConfirmation: function (packageIndex, giftDetails) {
        var self = this;

        // remove old dialog references
        this.destroy();

        giftDetails.shipping_address_lines = Geo.localizeAddressFormat({
            street: giftDetails.shipping_street,
            street_2: giftDetails.shipping_street_2,
            city: giftDetails.shipping_city,
            state: giftDetails.shipping_state,
            zip: giftDetails.shipping_zip,
            country_code: giftDetails.shipping_country_code,
            country_name: giftDetails.shipping_country_name
        });

        // show the gift confirm dialog
        if (window.FacebookData && window.FacebookData.positionInfo) {
            self._dlg = NuDialog.showTemplate("physical_gift_confirm", giftDetails, { title: "Confirm Recipient Details", width: "35.5em", buttons: [], position: [event.clientX, event.clientY] });
        } else {
            self._dlg = NuDialog.showTemplate("physical_gift_confirm", giftDetails, { title: "Confirm Recipient Details", width: "35.5em", buttons: [] });
        }

        var ConfirmViewModel = function () {
            var self = this;

            self.submit = function () {
                if (window.FacebookData) {
                    FacebookUtils.correctSrollThen(false, PackageOrder, PackageOrder._begin, packageIndex, giftDetails);
                } else {
                    PackageOrder._begin(packageIndex, giftDetails);
                }
            };
            self.cancel = function () {
                if (window.FacebookData){
                    FacebookUtils.correctSrollThen(false, PackageOrder, PackageOrder.beginGift, packageIndex, giftDetails);
                } else {
                    PackageOrder.beginGift(packageIndex, giftDetails);
                }
            };
        };

        var confirmViewModel = new ConfirmViewModel();
        ko.applyBindings(confirmViewModel, $("#physical-confirm-vm")[0]);

        // window.confirmViewModel = confirmViewModel;

        this._dlg.on("dialogclose", function () {
            self._dlg = null;
        });

        return this._dlg;
    },

    _begin: function (packageIndex, giftDetails) {

        // remove old dialog references
        this.destroy();

        var blob = $("#pagedata").data("blob") || {};
        var pkg = TralbumData.packages[ packageIndex ];
        this._package = pkg;
        this._seller = blob.item_sellers[pkg.selling_band_id];
        this._currency = CurrencyData.info[this._seller.currency];
        this._absoluteMinPrice = this._currency.medium_min_price;
        var isSetPrice = (pkg.is_set_price == 1);
        var dialogHasDiscounts = BandData.has_discounts; // using band-level data for now, which includes parent labels
        var isWillCall = pkg.shipping_exception_mode && pkg.shipping_exception_mode == "w";

        var artistServiceDiscount = blob.artist_service_merch_discounts && blob.artist_service_merch_discounts[pkg.id];
        var userIsSubscriber = Identities.subscribedToPageBand();

        var dlInfo = {
            download_info: {
                isSetPrice: isSetPrice,
                setPrice: pkg.price,
                minimumPrice: pkg.price,
                package: pkg,
                hasAudio: TralbumData.hasAudio,
                package_title: pkg.title,
                encoding_name: "none", // covers the "no DL included" case
                show_options: !!pkg.options_title, // boolean conversion
                options_title: pkg.options_title,
                options_data: pkg.options,
                paidDownload: 2, // note: legacy for how the dialog is laid out, this doesn't guarantee there's a download with this package
                prefix: false,
                donation: false,
                band: BandData,
                use_group: (Browser.type == "ie"),
                has_discounts: dialogHasDiscounts,
                subscriberDiscount: userIsSubscriber && artistServiceDiscount,
                unitId: ("p" + pkg.id),
                basePrice: pkg.price,
                xxx: null
            },
            
            // For the embedded email form:
            id: TralbumData.current.id,
            type: TralbumData.current.type,
            item_type: (TralbumData.current.type == "track" ? "track" : "album"), // UISTRING, just being pendantic
            band: BandData,
            no_codes: true,
            dialog_class: "PackageOrder",
            dialog_class_object: PackageOrder,
            fan_id: window.BandFollow && BandFollow.fan_id,

            seller: this._seller,
            seller_currency_prefix: this._currency.prefix,

            // For currency, shipping
            shipping_country_name: ClientPrefs.country_name,
            buyer_currency: ClientPrefs.currency,
            shipping_show_subtotal: (ClientPrefs.currency != this._currency.symbol),
            shipping_disp_subtotal: this.NO_AMT,
            shipping_has_tax: false,
            cart_has_shipping: Sidecart.has_shipping,

            cart_has_contents: (Sidecart.cart_items.length > 0),
            media_mode: (window.MediaView ? MediaView.mode : null),
            platform: Browser.platform,
            is_mobile_app_compatible: Browser.mobile_app_compatible,
            cfg: blob.cfg || {},
            is_device: (Browser.platform_closed || Browser.platform == "android"),
            platform_name: Browser.platform_name,
            is_will_call: isWillCall,
            show_notify_me: (!window.BandFollow || !window.BandFollow.fan_id),
            show_notify_me_label: !blob.fan_follows_label,
            is_gift: !!giftDetails
        };

        // Open the dialog
        var element = $("<div>");
        var dialogTitle = Text.truncate(pkg.title, 42, "...");
        this._dlg = NuDialog.alertHTML(dialogTitle, element, {
            width: "35.5em",
            buttons: [],
            dialogClass: "nu-dialog no-padding"
        });

        // Render the dialog contents to avoid any autofocus of elements
        element.renderLiquid("download_panel", dlInfo);

        var position;
        if (window.FacebookData && window.FacebookData.positionInfo && window.FacebookData.positionInfo.scrollTop) {
            position = ['center', window.FacebookData.positionInfo.scrollTop];
        } else {
            position = {my: 'center center', at: 'center center', of: window };
        }
        this._dlg.dialog("option", "position", position);


        var downloadPanelVM = new DownloadPanelVM(dlInfo, this, "#download-panel-vm");
        ko.applyBindings(downloadPanelVM, downloadPanelVM.panel[0]);

        this._discountVM = downloadPanelVM.panes.discount;
        this._pricingVM = downloadPanelVM.panes.pricing;
        this.setupPurchaseNote();

        this.grab_values_from_dialog();
        if (!this.country_pref) {
            this.country_pref = CountryPrefPanel.make(function (new_country) {self.oncountry_change(new_country);});
        }
        
        if (isWillCall) {
            this.update_summary();
        } else {
            var reqParams = {req: 'hypothetical_shipping', pkg_id: this._package.id};
            if (giftDetails) {
                reqParams.recipient_country = giftDetails.shipping_country_code;
            }
            this.request(reqParams);
        }

        if (!this.isNYP()) {
            $("#orderQuantity", this._dlg).val(1);
        }
        // Only allow integer input for order quantity
        $("#orderQuantity", this._dlg).keydown(function (e) {
            if (e.shiftKey || e.ctrlKey || e.altKey) {
                e.preventDefault();
            } else {
                var key = e.keyCode || e.which;
                // backspace, tab, esc, delete, home-end-arrows, numbers, and numpad numbers
                var validKey = (key == 8) || (key == 9) || (key == 27) || (key == 46) || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
                if (!validKey) {
                    e.preventDefault();
                }
            }
        });

        this.watchInput("userPrice");  // must watch it always, in order to update converted currency price
        this.watchInput("orderQuantity", 1, "integer");

        if (!window.MediaView || MediaView.mode != "phone") {
            Dom.select("orderQuantity", true);
        }

        var self = this; // closure support
        this._dlg.on("dialogclose", function () {
            self.country_pref.hide();
            self._dlg = null;
        });

        // store gift details in _dlg, since it will have similar lifetime to the gift details
        if (giftDetails) {
            self._dlg.data("gift_details", giftDetails);
        }

        // TODO: "package order presented" or somesuch
        // Stats.record({kind:"click", click:"paid_download_presented"});
        
        return this._dlg;
    },
    
    destroy: function () {
        if (this._dlg) {
            this._dlg.dialog("close");
            $assert(this._dlg === null); // we should do this via notification
        }
    },

    // Specialty formatter-- returns null if tax is zero or missing,
    // and trims zeroes and decimal point if the value is round.
    // Result is null or string.
    taxDisplay: function (rate) {
        if (!rate || rate === 0) return null;
        if (rate == Math.round (rate)) return rate.toString();
        if (rate == rate.toFixed(1)) return rate.toFixed(1).toString();
        if (rate == rate.toFixed(2)) return rate.toFixed(2).toString();
        return rate.toFixed(3).toString();
    },
    
    // Called to handle the checkout link
    //
    checkout: function (how) {
        if (!this._dlg) { // this will not be valid if we have direct checkout buttons on the page...
            return;
        }

        var pkg = this._package;
        if (!pkg) {
            return;
        }
        var self = this;
        var price = null;

        // clear any existing NYP validation error
        FormUtils.showHideAlert("userPrice_alert", null);

        // TODO: We need to add a callback step here if we want to verify the quantity remaining,
        // in low-quantity situations.  As it is we're doing a full page navigation. -- kj

        if (!this.validateQuantity("orderQuantity", "item_option")) {
            return;
        }
        var qty = parseInt(elt("orderQuantity").value);

        // Handle the case where user had entered discount code but we haven't verified it yet.
        // This needs to happen before the NYP vetting, below, because it could change the minimum price.
        if (!this._discountVM.discountVerified()) {
            // Abort checkout as we look up the new discount code and allow the user to see the result.
            return;
        }

        // vet NYP price entry if any
        if (this.isNYP()) {

            // maxPrice is the max-process-able price divided by
            // the quantity ordered.  round down a bit:
            var maxPrice = (this._seller.max_price / qty);
            if (maxPrice > 1000) {
                maxPrice = Math.floor(maxPrice / 100) * 100.0;
            } else if (maxPrice > 100) {
                maxPrice = Math.floor(maxPrice / 10) * 10.0;
            } else {
                maxPrice = Math.floor(maxPrice);
            }

            // Name-your-price: need to vet it
            if (!this.validatePrice("userPrice", maxPrice)) {
                return;
            }

            price = Form.validate.parsePrice(elt("userPrice").value);
        }

        var args = {};

        args.option_id = null;
        args.option_name = null;
        var option_elem = elt("item_option");
        if (option_elem && pkg.options) {
            var option = pkg.options[ option_elem.value ];
            if (option) {
                args.option_id = option.id;
                args.option_name = option.title;
            }
        }

        args.checkout_now = (how != 'cart');
        args.item_title = pkg.title;
        args.item_title2 = TralbumData.current.type === 'package' ? null : TralbumData.current.title;
        args.item_type = "p";
        args.item_id = pkg.id;
        // Note we use album_is_preorder instead of is_preorder because the latter is not populated on track pages.
        args.preorder = (pkg.download_type || pkg.album_id) && TralbumData.album_is_preorder;
        args.has_download = !!pkg.download_type;
        args.band_id = BandData.id;
        args.artist_name = TralbumData.artist;
        args.unit_price = price || this._discountVM.unitPrice();
        args.currency = this._currency.symbol;
        args.quantity = qty;
        args.discount_id = this._discountVM.discountID();
        args.discount_type = this._discountVM.discountType();
        args.url = TralbumData.url;
        
        // Grab the thumb url, currently used only for the phone view.
        // fixme: thumb_url and thumb_https_url are probably unused by anyone.  Confirm and remove.
        if (pkg.arts && pkg.arts[0]) {
            args.image_id = pkg.arts[0].image_id;
            args.thumb_url = ImageUtils.imageURL(pkg.arts[0].image_id, 'package_thumb', false);
            args.https_thumb_url = ImageUtils.imageURL(pkg.arts[0].image_id, 'package_thumb', true);
        } else if (pkg.album_art_id) {
            args.art_id = pkg.album_art_id;
            args.thumb_url = ImageUtils.artURL(pkg.album_art_id, 'package_thumb', false);
            args.https_thumb_url = ImageUtils.artURL(pkg.album_art_id, 'package_thumb', true);
        }

        if (TralbumData.current.type === 'album') {
            args.download_type = 'a';
            args.download_id = TralbumData.current.id;
        } else if (TralbumData.current.type === 'track') {
            args.download_type = 'a';
            args.download_id = TralbumData.current.album_id;
        }
        args.purchase_note = this.purchaseNote();
        args.notify_me = this.notifyMe();
        args.notify_me_label = this.notifyMeLabel();

        var gift_details = self._dlg ? self._dlg.data("gift_details") : null;
        if (gift_details) {
            args.is_gift = true;
            args.is_physical_gift = true;

            args.gift_sender_name = gift_details.sender_name;

            // fan id with no email override
            if (gift_details.recipient_fan_id && (!gift_details.recipient_email || gift_details.recipient_email.length === 0)) {
                args.gift_recipient_fan_id = gift_details.recipient_fan_id;
            } else {
                args.gift_recipient_email = gift_details.recipient_email;
            }
            
            args.gift_recipient_name = gift_details.recipient_name;
            args.gift_sender_note = gift_details.sender_note;

            args.shipping_street = gift_details.shipping_street;
            args.shipping_street_2 = gift_details.shipping_street_2;
            args.shipping_city = gift_details.shipping_city;
            args.shipping_state = gift_details.shipping_state;
            args.shipping_zip = gift_details.shipping_zip;
            args.shipping_country_code = gift_details.shipping_country_code;
            args.shipping_country_name = gift_details.shipping_country_name;
        }

        Sidecart.add_to_cart(args);

        this.destroy();
        return;
    },

    isNYP: function () {
        return this._package && !this._package.is_set_price;
    },

    // In safari, hitting the return key can early-dismiss the dialog
    filter_returnkey : function (e) {
        if (e && e.keyCode == 13) {
            if (e.target && e.target.id == "purchase-note-input") {
                return true;
            }
            PackageOrder.checkout('cart');
            return false;
        }
        return true;
    },
        
    validateQuantity: function (quantityElem, optionElem, alertElem, optionsAlertElem) {
    
        quantityElem = elt(quantityElem);
        optionElem = elt(optionElem);
        alertElem = elt(alertElem || (quantityElem.id + "_alert"));
        optionsAlertElem = optionElem ? elt(optionsAlertElem || (optionElem.id + "_alert")) : null;
        var pkg = this._package;

        // The Form utility is not well-suited to doing validation
        // in dialogs, so let's do it ourselves.

        FormUtils.showHideAlert(alertElem, null);

        var quantity = parseInt(quantityElem.value);
        var errorMsg = null;

        if (isNaN(quantity)) {
            errorMsg = "Please provide a quantity.";
        } else if (quantity < 1) {
            errorMsg = "The minimum quantity is 1.";
        } else {
            if (optionElem) {
                var option_limit = pkg.options[ optionElem.value ];
                option_limit = option_limit ? option_limit.quantity_available : null;
                if (option_limit === 0) {
                    // Shouldnt happen, won't be selectable, but just in case:
                    errorMsg = "Sorry, this package option is sold out.";
                    alertElem = optionsAlertElem || alertElem; // Fallback to existing
                } else if (option_limit !== null && quantity > option_limit) {
                    errorMsg = "Sorry, only " + option_limit + " of that option available.";
                    alertElem = optionsAlertElem || alertElem; // Fallback to existing
                    // Don't currently have an optionsAlertElem-- all error messages
                    // appear near the quantity input.  We could have one near the
                    // options selector, which updated when you used the SELECT.
                }
            }

            if (errorMsg === null && pkg.quantity_limits !== null && quantity > pkg.quantity_limits) {
                if (pkg.quantity_available == pkg.quantity_limits) {
                    errorMsg = "Sorry, only " + pkg.quantity_available + " more available.";
                } else {
                    errorMsg = "Sorry, purchases are limited to " + pkg.quantity_limits + ".";
                }
            }
        }

        if (errorMsg) {
            // We don't escape the text as it will mangle some currency entities;
            // this should all be text that we control anyway.
            FormUtils.showHideAlert(alertElem, errorMsg);
            return false;
        }

        return true;
    },

    grab_values_from_dialog: function () {
        var price;
        
        try {
            this.quantity = parseInt(elt('orderQuantity').value);
        } catch (e) {}

        if (isNaN(this.quantity) || this.quantity < 1) {
            this.quantity = 1;
        }

        if (this._package.is_set_price) {
            this.subTotal = this.quantity * this._discountVM.unitPrice();
        } else {
            price = Form.validate.parsePrice(elt('userPrice').value);
            // unitPrice() is the minimum price, possibly discounted
            if (isNaN(price)) {
                this._pricingVM.userPrice(null);
                price = this._discountVM.unitPrice();
            } else {
                this._pricingVM.userPrice(price);
                price = Math.max(price, this._discountVM.unitPrice());
            }
            this.subTotal = this.quantity * price;
        }
        if (isNaN(this.subTotal)) {
            this.subTotal = this._discountVM.unitPrice();
        }
        this._pricingVM.subTotal(this.subTotal);
    },

    inputChanged: function (ignore) {

        this.grab_values_from_dialog();

        if (this._package.is_set_price) {
            elt('userPrice').innerHTML = TextFormat.currency(this.subTotal, this._currency, true);
        }

        var normalSubTotal = this.quantity * this._discountVM.basePrice();
        if (this._discountVM.discountedPrice() !== null) {
            Dom.setText('normal-price', TextFormat.currency(normalSubTotal, this._currency, true));
        }

        if (this.isNYP()) {
            this.update_nyp_labels();
        }

        var isWillCall = this._package.shipping_exception_mode && this._package.shipping_exception_mode == "w";

        if (typeof this.shipping_base !== undefined || isWillCall) {
            this.update_summary();
        }

        // Maybe remove an obsolete NYP validation error.
        // We're cheating here by not passing in a maxPrice to priceError(), because it should be divided by
        // the package quantity. In rare cases this will result in clearing the alert when we shouldn't, which is fine.
        if (this.isNYP() && !this.priceError("userPrice")) {
            FormUtils.showHideAlert("userPrice_alert", null);
        }
    },

    update_nyp_labels: function (){
        // because, for the ui hint, we care about blanks too
        var items_plausible = parseInt(elt('orderQuantity').value) != 1;
        var params = {
                items_plausible    : items_plausible
            };
        Templ.renderElem("nyp-header", "_per_item", params);
        $("#nyp-header").toggleClass("nyp-header-middle", items_plausible);
    },

    updateCurrencyDisplay: function () {
        this.grab_values_from_dialog();
        this.update_summary();

        // clear any existing NYP validation error
        FormUtils.showHideAlert("userPrice_alert", null);
    },

    NO_AMT: "&nbsp;-&nbsp;-&nbsp;",

    /* Instead of rendering the liquid template again, update the PricingVM instance,
     * which updates the summary dynamically.
     * 
     * This whole function could be more Knockoutified, when more of the dialog is converted
     * to Knockout.
     */
    update_summary: function () {
        var giftDetails = this._dlg ? this._dlg.data("gift_details") : null;

        this.country_pref.hide();
        this.updateShippingAndTax();

        this._pricingVM.updateShippingSummary({
            'subTotal': this.subTotal,
            'hasTax': this.shipping_has_tax,
            'shippingAndTax': this.shipping_and_tax,
            'showAsTotal': (this.quantity > 1),
            'giftCountryName': giftDetails && giftDetails.shipping_country_name,
            'giftCountry': giftDetails && giftDetails.shipping_country_code,
            'giftUsState': giftDetails && giftDetails.shipping_state,
            'giftUsZip': giftDetails && giftDetails.shipping_zip
        });
    },

    updateShippingAndTax: function () {
        if (this.shipping_is_base) {
            this.shipping_and_tax = this.shipping_base + this.shipping_incr * (this.quantity - 1);
        } else {
            this.shipping_and_tax = this.shipping_incr * this.quantity;
        }

        if (this.shipping_has_tax) {
            this.shipping_and_tax += Math.round(this.subTotal * this.shipping_tax_rate) / 100.0;
        }
    },

    show_country_pref: function (ev) {
        var target = ev.target || ev.srcElement;
        Y.util.Event.preventDefault(ev);
        this.country_pref.show(target, true);
    },

    hasShippingException: function () {
        return this._package && this._package.shipping_exception_mode && this._package.shipping_exception_mode !== '';
    },
    
    oncountry_change: function (new_country) {
        if (this._dlg) {
            this.country_pref.hide();
            this._pricingVM.updating(true);

            // Will-call tickets (and other future package types) have no shipping,
            // so don't try to calculate shipping and tax values for them.
            if (this.hasShippingException()) {
                this.request({req: 'country3', country: new_country.country, us_zip: new_country.us_zip});
            } else {
                this.request({req: 'country2', country: new_country.country, us_zip: new_country.us_zip, pkg_id: this._package.id});
            }
        }
    },

    request: function (data) {
        var self = this;
        var cb = {
            success: function (o) {self.req_success(o);},
            failure: function (o) {self.req_failure(o);}
        };
        data.client_id = ClientID;
        var d = Url.joinQuery(data);
        Y.util.Connect.asyncRequest('POST', '/cart/cb', cb, d);
    },

    req_success: function (o) {
        var data = JSON.parse(o.responseText);

        if (data.error) {
            Log.debug("Cart ERROR");

        }
        if (data.req == "country2") {
            this.req_country2(data);
        } else if (data.req == "country3") {
            this.req_country3(data);
        } else if (data.req == "hypothetical_shipping") {
            this.req_hypothetical_shipping(data);
        }
    },

    req_failure: function (o) {
    },

    // Received updated shipping; display it.
    req_hypothetical_shipping: function (data) {
        this.shipping_is_base = data.is_base;
        this.shipping_base = data.base;
        this.shipping_incr = data.incr;
        this.shipping_has_tax = data.has_tax;
        this.shipping_tax_rate = data.tax_rate;
        this.update_summary();
    },

    // Received updated shipping; display it.
    req_country2: function (data) {
        ClientPrefs.update(data);
        this.shipping_is_base = data.is_base;
        this.shipping_base = data.base;
        this.shipping_incr = data.incr;
        this.shipping_has_tax = data.has_tax;
        this.shipping_tax_rate = data.tax_rate;
        this.update_summary();
    },

    // No shipping, just updated client prefs country.
    req_country3: function (data) {
        this.update_summary();
    },

    zzz: null
};
})();
;
/* ------------- BEGIN geo.js --------------- */;
var Geo = (function () {
    "use strict";

    var EUMemberStates = [
        'AT', // Austria
        'BE', // Belgium
        'BG', // Bulgaria
        'HR', // Croatia
        'CY', // Cyprus
        'CZ', // Czech Republic
        'DK', // Denmark
        'EE', // Estonia
        'FI', // Finland
        'FR', // France
        'DE', // Germany
        'GR', // Greece
        'HU', // Hungary
        'IE', // Ireland
        'IT', // Italy
        'LV', // Latvia
        'LT', // Lithuania
        'LU', // Luxembourg
        'MT', // Malta
        'NL', // Netherlands
        'PL', // Poland
        'PT', // Portugal
        'RO', // Romania
        'SK', // Slovakia
        'SI', // Slovenia
        'ES', // Spain
        'SE', // Sweden
        'GB'  // United Kingdom
    ];
    
    return {
        localization: {
            'AT': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'AU': {
                labels: {
                    state: 'State',
                    zip: 'Postcode'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}$/,
                zipFormat: 'numeric',
                addressFormat: 'CITY STATE ZIP|COUNTRY'
            },
            'BE': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'BR': {
                labels: {
                    state: 'Province',
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{5}[\-]?\d{3}$/,
                zipFormat: 'numeric',
                addressFormat: 'CITY-STATE|ZIP|COUNTRY'
            }, 
            'CA': {
                labels: {
                    state: 'Province',
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^[A-Z]\d[A-Z][ ]?\d[A-Z]\d$/,
                zipFormat: 'alphanumeric',
                addressFormat: 'CITY STATE ZIP|COUNTRY'
            },
            'CH': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'CZ': {
                labels: {
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{3}[ ]?\d{2}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'DE': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{5}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            },
            'DK': {
                labels: {
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'ES': {
                labels: {
                    state: 'State',
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{5}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY (STATE)|COUNTRY'
            }, 
            'FI': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{5}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'FR': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{2}[ ]?\d{3}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'GB': {
                labels: {
                    zip: 'Postcode'
                },
                optionalParameters: {},
                zipValidator: /^GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4}$/,
                zipFormat: 'alphanumeric',
                addressFormat: 'CITY|ZIP|COUNTRY'
            },
            'GR': {
                labels: {
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{3}[ ]?\d{2}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'IE': {
                labels: {
                    state: 'County'
                },
                optionalParameters: {
                    state: true
                },
                zipValidator: /^/, // not sure what to do for ireland
                zipFormat: 'alphanumeric',
                addressFormat: 'CITY ZIP|STATE|COUNTRY'
            }, 
            'IT': {
                labels: {
                    state: 'Province',
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{5}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY STATE|COUNTRY'
            }, 
            'IL': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /(^\d{5}$)|(^\d{7}$)/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            },
            'MX': {
                labels: {
                    state: 'Province',
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{5}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY STATE|COUNTRY'
            },
            'NL': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}[ ]?[A-Z]{2}$/,
                zipFormat: 'alphanumeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            },
            'NO': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            },
            'NZ': {
                labels: {
                    zip: 'Postcode'
                },
                optionalParameters: {},
                zipValidator: /^/,
                zipFormat: 'alphanumeric',
                addressFormat: 'CITY ZIP|COUNTRY'
            },
            'PL': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{2}-\d{3}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            },
            'PT': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{4}([\-]\d{3})?$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY/STATE|COUNTRY'
            },
            'RU': {
                labels: {
                    state: 'Territory',
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^(\d{3})|(\d{6})$/,
                zipFormat: 'numeric',
                addressFormat: 'CITY STATE|ZIP|COUNTRY'
            },
            'SE': {
                labels: {
                    zip: 'Postal Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{3}[ ]?\d{2}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'SA': {
                labels: {
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                zipFormat: 'numeric',
                addressFormat: 'CITY, STATE ZIP|COUNTRY'
            },
            'SG': {
                labels: {
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{6}$/,
                zipFormat: 'numeric',
                addressFormat: 'CITY ZIP|COUNTRY'
            }, 
            'SK': {
                labels: {
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{3}[ ]?\d{2}$/,
                zipFormat: 'numeric',
                addressFormat: 'ZIP CITY|COUNTRY'
            }, 
            'US': {
                labels: {
                    state: 'State',
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                zipFormat: 'numeric',
                addressFormat: 'CITY, STATE ZIP|COUNTRY'
            },
            'JP': {
                labels: {
                    state: 'Prefecture',
                    zip: 'ZIP Code'
                },
                optionalParameters: {},
                zipValidator: /^\d{3}-\d{4}$/,
                zipFormat: 'numeric',
                addressFormat: 'CITY|STATE ZIP|COUNTRY'
            }
        },
        localizeAddressFormat: function(address) {
            // this is intended to match Geo.format_address in form and function

            var subs, formattedAddress, lines, newLines, i, newLine, match, keys, details;

            if (Geo.localization[address.country_code] && Geo.localization[address.country_code].addressFormat) {
                subs = {
                    'STREET1': address.street,
                    'STREET2': address.street_2,
                    'CITY': address.city,
                    'STATE': address.state,
                    'ZIP': address.zip,
                    'COUNTRY': address.country_name
                };

                formattedAddress = "STREET1|STREET2|" + Geo.localization[address.country_code].addressFormat;

                // split into lines
                lines = formattedAddress.split("|");
                newLines = [];

                // replace each line with substituted values
                for (i = 0; i < lines.length; i++) {
                    newLine = lines[i];

                    match = /STREET1|STREET2|CITY|STATE|ZIP|COUNTRY/.exec(newLine);
                    while (match !== null) {
                        newLine = newLine.replace(match[0], subs[match[0]] || "");
                        match = /STREET1|STREET2|CITY|STATE|ZIP|COUNTRY/.exec(newLine);
                    }

                    if (newLine.length > 0 && !subs[newLine]) {
                        newLines.push(newLine);  
                    }
                }

                return newLines;
            }
            else {
                keys = ['street', 'street_2', 'city', 'state', 'zip', 'country_name'];
                details = [];

                for (i = 0; i < keys.length; i++) {
                    if (address[keys[i]]) {
                        details.push(address[keys[i]]);
                    }
                }

                return details;
            }

        },
    	localize: function(countryCode) {
            var fallback = {
                labels: {
                    state: 'State / Province / Region',
                    zip: 'ZIP / Postal Code'
                },
                optionalParameters: {
                    state: true,
                    zip: true
                },
                zipValidator: /^/,
                zipFormat: 'alphanumeric',
                isFallback: true
            };

            if (countryCode && Geo.localization[countryCode]) {
                return Geo.localization[countryCode];
            }
            else {
                return fallback;
            }
        },
        isUSBuyer: function() {

            var pageData = $("#pagedata").data("blob") || {},
                fanLocationCountry = pageData.fan_location_country,
                ipLocationCountryCode = pageData.ip_location_country_code,
                synonyms = ["US", "United States", "United States of America", "USA"];

            // check fan bio location
            if (fanLocationCountry) {
                return $.inArray(fanLocationCountry, synonyms) !== -1;
            }

            // check client prefs
            if (window.ClientPrefs && !window.ClientPrefs.is_default) {
                return window.ClientPrefs.country === "US";
            }

            // check ip
            if (ipLocationCountryCode) {
                return ipLocationCountryCode === "USA";
            }

            // default to true
            return true;
        },
        isEUCountry: function (countryCode) {
            return !!Iter.find(EUMemberStates, function (EUMemberStateCode) {
                return EUMemberStateCode === countryCode;
            });
        }
    };
}());
;
/* ------------- BEGIN tralbum_login.js --------------- */;
/* global Identities, Stats, Url, siteroot, siteroot_https */
/* exported TralbumLogin */
var TralbumLogin = {
    begin: function(action) {
        'use strict';
        var self = this;

        var statClick = "logged_out_" + action + "_open";
        var statClickBand = "logged_out_" + action + "_open_band_no_fan";
        
        var loginUrl = ($("#pagedata").data('blob') || {}).login_action_url;
        var signupUrl = ($("#pagedata").data('blob') || {}).signup_action_url;

        if (Identities.bmgr.bands().length > 0) {
            Stats.record({
                'kind': "click",
                'click': statClickBand
            });    
        }
        else {
            Stats.record({
                'kind': "click",
                'click': statClick
            });  
        }

        if (loginUrl) {
            loginUrl = Url.addQueryParams(loginUrl, {
                'action': action,
                'item_id': window.TralbumData.current.id,
                'item_type': window.TralbumData.current.type,
                'band_id': window.TralbumData.current.band_id
            });
        }

        if (signupUrl) {
            signupUrl = Url.addQueryParams(signupUrl, {
                'action': action,
                'item_id': window.TralbumData.current.id,
                'item_type': window.TralbumData.current.type,
                'band_id': window.TralbumData.current.band_id
            });
        }

        var title;
        if (action == "wishlist") {
            title = "Wishlist";
        }
        else if (action === "follow") {
            title = "Follow";
        }
        self._dlg = Dialog.openTemplate(title, "tralbum_login_panel", { 
            'siteroot': window.siteroot,
            'is_band_member': Identities.bmgr.bands().length > 0,
            'action': action,
            'loginUrl': loginUrl || (siteroot_https + "/login?from=" + (action == "follow" ? "loflwlgn" : "lowllgn")),
            'signupUrl': signupUrl || (siteroot + "/fans?from=" + (action == "follow" ? "loflwlrn" : "lowllrn")),
        }, [], "38em");

        // this is most easily caught here
        self._dlg.hideEvent.subscribe(function() { self._dlg = null; });
    }
};
;
/* ------------- BEGIN gift_panel.js --------------- */;
var GiftPanel = {
    // non-knockout
    validateGiftDetails: function(giftPanel, field, recipientFanId){
        var characterLimit = {
            'short': 100,
            'long': 1000
        }; 

        var validationErrors = false;
        var mediaMode = (window.MediaView ? MediaView.mode : null);

        var scrollToField = function(field) {
            var fieldContainer = giftPanel[field].parent(),
                margin = 5;
            setTimeout(function() {
                $('html, body').animate({scrollTop:fieldContainer.offset().top - 5}); 
            }, 100);
            
        };

        // if field is defined, we're validating in typing mode and only want to remove the error class if there are no errors
        // otherwise we're coming from submit and we want to show errors

        // validate sender name:  not empty, and not more than 50 characters
        var validateSenderName = function() {
            if (!field && giftPanel.senderName.val().length === 0){
                giftPanel.senderNameError.addClass('alertActive');
                giftPanel.senderNameError.text("Please enter your name.");
                giftPanel.senderName.addClass('has-validation-error');
                // if this is the first error, scroll to the field
                if (!validationErrors && mediaMode == 'phone') {
                    scrollToField('senderName');
                }
                validationErrors = true;
            }
            else if (!field && giftPanel.senderName.val().length >= characterLimit.short) {
                giftPanel.senderNameError.addClass('alertActive');
                giftPanel.senderNameError.text("Your name must be less than " + characterLimit.short + " characters.");
                giftPanel.senderName.addClass('has-validation-error');
                if (!validationErrors && mediaMode == 'phone') {
                    scrollToField('senderName');
                }
                validationErrors = true;
            }
            else {
                giftPanel.senderNameError.removeClass('alertActive');
                giftPanel.senderName.removeClass('has-validation-error');
            }
        };

        // validate recipient name: not empty, and not more than 50 characters
        var validateRecipientName = function() {
            if (!field && giftPanel.recipientName.val().length === 0){
                giftPanel.recipientNameError.addClass('alertActive');
                giftPanel.recipientNameError.text("Please enter the recipient's name.");
                giftPanel.recipientName.addClass('has-validation-error');
                if (!validationErrors && mediaMode == 'phone') {
                    scrollToField('recipientName');
                }
                validationErrors = true;
            }
            else if (!field && giftPanel.recipientName.val().length >= characterLimit.short) {
                giftPanel.recipientNameError.addClass('alertActive');
                giftPanel.recipientNameError.text("The recipient's name must be less than " + characterLimit.short + " characters.");
                giftPanel.recipientName.addClass('has-validation-error');
                if (!validationErrors && mediaMode == 'phone') {
                    scrollToField('recipientName');
                }
                validationErrors = true;
            }
            else {
                giftPanel.recipientNameError.removeClass('alertActive');
                giftPanel.recipientName.removeClass('has-validation-error');
            }
        };
        // validate recipient email: not empty, valid email address and not more than 50 characters
        var validateRecipientEmail = function(){
            if (!field && (giftPanel.recipientEmail.val().length === 0 || !GiftPanel.emailValid(giftPanel.recipientEmail.val()))) {
                giftPanel.recipientEmailError.addClass('alertActive');
                giftPanel.recipientEmailError.text("Please enter an email like: lucky@duck.com");
                giftPanel.recipientEmail.addClass('has-validation-error');
                if (!validationErrors && mediaMode == 'phone') {
                    scrollToField('recipientEmail');
                }
                validationErrors = true;
            }
            else if (!field && giftPanel.recipientEmail.val().length >= characterLimit.short) {
                giftPanel.recipientEmailError.addClass('alertActive');
                giftPanel.recipientEmailError.text("Recipient's email must be less than " + characterLimit.short + " characters.");
                giftPanel.recipientEmail.addClass('has-validation-error');
                if (!validationErrors && mediaMode == 'phone') {
                    scrollToField('recipientEmail');
                }
                validationErrors = true;
            }
            else {
                giftPanel.recipientEmailError.removeClass('alertActive');
                giftPanel.recipientEmail.removeClass('has-validation-error');
            }
        };
        // validate sender note: either empty or not empty and less than 1000 characters
        var validateSenderNote = function(){
            if (!field && giftPanel.senderNote.val().length >= characterLimit.long) {
                giftPanel.senderNoteError.addClass('alertActive');
                giftPanel.senderNoteError.text("Sender note must be less than " + characterLimit.long + " characters.");
                giftPanel.senderNote.addClass('has-validation-error');
                if (!validationErrors && mediaMode == 'phone') {
                    scrollToField('senderNote');
                }
                validationErrors = true;
            }
            else {
                giftPanel.senderNoteError.removeClass('alertActive');
                giftPanel.senderNote.removeClass('has-validation-error');
            }
        };

        // validate a single field if it's provided, otherwise validate all fields and return error state
        if (field === 'senderName'){
            validateSenderName();
        }
        else if (field === 'recipientName'){
            validateRecipientName();
        }
        else if (field === 'recipientEmail'){
            validateRecipientEmail();
        }
        else if (field === 'senderName'){
            validateSenderNote();
        }
        else {
            validateSenderName();
            validateRecipientName();

            if (!recipientFanId || giftPanel.recipientEmail.val().length) {
                validateRecipientEmail();
            }
            
            validateSenderNote();

            return !validationErrors;
        }
    },
    emailValid: function(email){
        var emailRegex = /(^)([^\s\(\)"'\/><,@]+@\w([^\s\(\)"'\/><&,@]*\w)?\.\w[^\s\(\)"'\/><&,@]*\w)($)/;
        return emailRegex.test(email);
    }
}

// knockout view model used in the physical gift form on the tralbum page and checkout_address_update
var PhysicalGiftViewModel = function(giftDetails, submitCallback, cancelCallback, validationOverride) {
    var self = this;

    // validation on typing that doesn't check for emptiness
    // passing "true" into the validate function to be less obtuse about things like @ signs in the email
    //   (this will be validated on submit)
    ko.extenders.validate = function(target) {
        target.subscribe(function(){
            if (target().length > 0){
                target.validate(true);
            }
        });
        return target;
    }

    self.form = "form[name='physical-gift']";

    self.hasValidationErrors = false;

    // regular gift info
    self.senderName     = ko.observable(giftDetails.sender_name).extend({ validate: ""});
    self.recipientName  = ko.observable(giftDetails.recipient_name).extend({ validate: ""});
    self.recipientFanId = giftDetails.recipient_fan_id;
    self.recipientEmail = ko.observable(giftDetails.recipient_email).extend({ validate: ""});
    self.senderNote     = ko.observable(giftDetails.sender_note);

    // shipping info
    // for now, this is matching what the PayPal express checkout API is expecting
    self.shippingStreet      = ko.observable(giftDetails.shipping_street).extend({ validate: ""});
    self.shippingStreet2     = ko.observable(giftDetails.shipping_street_2).extend({ validate: ""});
    self.shippingCity        = ko.observable(giftDetails.shipping_city).extend({ validate: ""});

    // if this is US, shipping_state is a 2-letter code and we have stateName for the dropdown title
    self.shippingState            = ko.observable(giftDetails.shipping_state).extend({ validate: ""});
    self.shippingStateName        = ko.observable(giftDetails.shipping_state_name);
    self.shippingStateCode        = ko.observable(giftDetails.shipping_state).extend({ validate: ""});

    self.shippingZIP              = ko.observable(giftDetails.shipping_zip).extend({ validate: ""});
    self.shippingCountry          = ko.observable();
    self.shippingCountryCode      = ko.observable(giftDetails.shipping_country_code);

    self.prettyShippingCountry    = ko.computed(function(){
        var string = self.shippingCountryCode() == "GB" ? "the " : "";
        string += self.shippingCountry();
        return string;
    });

    // we need to track this to decide whether paypal will allow shipping
    self.isUSBuyer                = ko.observable(giftDetails.is_us_buyer);
    self.shippingRestrictionWarningVisible = ko.computed(function(){
        if (self.isUSBuyer() && (self.shippingCountryCode() !== "US")) {
            return true;
        }
        return false;
    });

    // errors and validation
    self.senderNameError          = ko.observable("");
    self.recipientNameError       = ko.observable("");
    self.recipientEmailError      = ko.observable("");
    self.shippingStreetError      = ko.observable("");
    self.shippingStreet2Error     = ko.observable("");
    self.shippingCityError        = ko.observable("");
    self.shippingStateError       = ko.observable("");
    self.shippingZIPError         = ko.observable("");
    self.shippingCountryError     = ko.observable("");
    self.shippingPhoneNumberError = ko.observable("");

    // set up localized address details
    self.localization = Geo.localize(self.shippingCountryCode());
    self.shippingStateLabel = ko.observable(self.localization.labels.state);
    self.shippingZIPLabel = ko.observable(self.localization.labels.zip);

    self.shippingCountryCode.subscribe(function() {
        self.shippingCountry($(self.form).find("#countrySelect option:selected").text());
        self.updateLocalization();
        self.shippingZIPError("");
        self.shippingStateError("");
        self.shippingCityError("");
        self.shippingState("");
    });

    self.shippingStateCode.subscribe(function() {
        self.shippingStateName($(self.form).find("#stateSelect option:selected").text());
    });

    self.submitEnabled = ko.computed(function(){
        if (validationOverride === "addressUpdate") {
            return true;
        }
        var enabled = self.senderName() && (self.senderName().length > 0) &&
                      self.recipientName() && (self.recipientName().length > 0) &&
                      ((self.recipientEmail() && (self.recipientEmail().length > 0)) || self.recipientFanId); 
        return enabled;
    });

    self.useZipRegex = giftDetails._use_zip_regex;

    self.updateLocalization = function() {
        self.localization = Geo.localize(self.shippingCountryCode());
        self.shippingStateLabel(self.localization.labels.state);
        self.shippingZIPLabel(self.localization.labels.zip);
    };

    self.focused = false;
    self.focusOnError = function(item) {
        if (self.focused) {
            return;
        }
        var mediaMode = (window.MediaView ? MediaView.mode : null);
        if (mediaMode == 'phone') {
            var container = $(item).parent();
            setTimeout(function() {
                $('html, body').animate({scrollTop: container.offset().top - 5}); 
            }, 10);
        }
        $('input', item).focus();
        self.focused = true;
    };

    // validate all fields, build the hash to pass on and call the success handler
    self.submit = function() {
        self.validateAll();
        if (self.hasValidationErrors) {
            return;
        }
        giftDetails = {
            sender_name: $.trim(self.senderName()),
            recipient_name: $.trim(self.recipientName()),
            recipient_email: $.trim(self.recipientEmail()),
            recipient_fan_id: $.trim(self.recipientFanId),
            shipping_street: $.trim(self.shippingStreet()),
            shipping_street_2: $.trim(self.shippingStreet2()),
            shipping_city: $.trim(self.shippingCity()),
            shipping_zip: $.trim(self.shippingZIP()),
            shipping_country_code: self.shippingCountryCode(),
            shipping_country_name: self.shippingCountry(),
            
            is_us_buyer: self.isUSBuyer()
        };

        if (self.shippingCountryCode() === "US") {
            giftDetails.shipping_state = self.shippingStateCode();
            giftDetails.shipping_state_name = self.shippingStateName();
        }
        else {
            giftDetails.shipping_state = self.shippingState();
        }

        // if the sender note is only whitespace, don't send it along
        if (self.senderNote() && !/^\s+$/.test(self.senderNote())) {
            giftDetails.sender_note = self.senderNote().substring(0, 1000);
        }

        if ($.isFunction(submitCallback)) {
            submitCallback(giftDetails);  
        }
    }

    self.cancel = function() {
        if ($.isFunction(cancelCallback)) {
            cancelCallback();
        }
    }

    // field validation methods
    // it might be a better idea to work these into the .validate extender and handle options.
    self.senderName.validate = function(simple) {
        if (!self.senderName() || self.senderName().length === 0) {
            self.senderNameError("Please enter your name.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-sender-name");
        }
        else if (self.senderName().length > 100) {
            self.senderNameError("Your name must be less than 100 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-sender-name");
        }
        else {
            self.senderNameError("");
        } 
    }
    self.recipientName.validate = function(simple) {
        if (!self.recipientName() || self.recipientName().length === 0) {
            self.recipientNameError("Please enter the recipient's name.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-recipient-name");
        }
        else if (self.recipientName().length > 100) {
            self.recipientNameError("The recipient's name must be less than 100 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-recipient-name");
        }
        else {
            self.recipientNameError("");
        } 
    }
    // 'simple' means don't check for email regex validity
    self.recipientEmail.validate = function(simple) {
        
        // if this is coming from a wishlist, we'll have a recipient fan id and won't need an email
        if (self.recipientFanId) {
            return;
        }

        if (!self.recipientEmail() || self.recipientEmail().length === 0 || (!simple && !GiftPanel.emailValid(self.recipientEmail()))) {
            self.recipientEmailError("Please enter an email like: lucky@duck.com");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-recipient-email");
        }
        else if (self.recipientEmail().length > 100) {
            self.recipientEmailError("Recipient's email must be less than 100 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-recipient-email");
        }
        else {
            self.recipientEmailError("");
        } 
    }
    self.shippingStreet.validate = function(simple) {
        if (!self.shippingStreet() || self.shippingStreet().length === 0) {
            self.shippingStreetError("Please enter the recipient's address.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-street");
        }
        else if (self.shippingStreet().length > 150){
            self.shippingStreetError("Recipient's address must be less than 150 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-street");
        }
        else {
            self.shippingStreetError("");
        } 
    }
    self.shippingStreet2.validate = function(simple) {
        if (self.shippingStreet2() && self.shippingStreet2().length > 150) {
            self.shippingStreet2Error("Recipient's address must be less than 150 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-street-2");
        }
        else {
            self.shippingStreet2Error("");
        } 
    }
    self.shippingCity.validate = function(simple) {
        if (!self.shippingCity() || self.shippingCity().length === 0) {
            self.shippingCityError("Please enter the recipient's city.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-city");
        }
        else if (self.shippingCity().length > 150) {
            self.shippingCityError("Recipient's city must be less than 150 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-city");
        }
        else {
            self.shippingCityError("");
        } 
    }
    self.shippingState.validate = function(simple) {
        if (self.shippingCountryCode() === "US")
            return;

        var state = self.localization.labels.state ? self.localization.labels.state.toLowerCase() : null;

        // if state is not required for this country, or this is the fallback localization, don't validate
        if (!state || self.localization.isFallback) {
            return;
        }

        if ((!self.shippingState() || self.shippingState().length === 0) && !self.localization.optionalParameters.state) {
            self.shippingStateError("Please enter the recipient's " + state);
            self.hasValidationErrors = true;
            self.focusOnError("#gift-state");
        }
        else if (self.shippingState().length > 60) {
            self.shippingStateError("Recipient's " + state + " must be less than 60 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-state");
        }
        else {
            self.shippingStateError("");
        } 
    }
    self.shippingStateCode.validate = function(simple) {
        if (self.shippingCountryCode() !== "US")
            return;

        if (!simple && self.shippingStateCode() === "--") {
            self.shippingStateError("Please enter the recipient's state.");
            self.hasValidationErrors = true;
        }
        else {
            self.shippingStateError("");
        } 
    }
    self.shippingZIP.validate = function(simple) {
        var zip = self.localization.labels.zip ? self.localization.labels.zip.toLowerCase().replace('zip', 'ZIP') : null;

        // if zip is not required for this country, or this is the fallback localization, don't validate
        if (!zip || self.localization.isFallback) {
            return;
        }

        // upcase
        if (self.shippingZIP()) {
            self.shippingZIP(self.shippingZIP().toUpperCase());
        }

        var isValid = true;
        if (self.useZipRegex) {
            isValid = self.localization.zipValidator.test(self.shippingZIP());
        }

        if (!self.shippingZIP() || self.shippingZIP().length === 0 || (!simple && !isValid)) {
            self.shippingZIPError("Sorry, that doesn't appear to be a valid " + zip + ".");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-zip");
        }
        else if (self.shippingZIP().length > 20) {
            self.shippingZIPError("Recipient's " + zip + " code must be less than 20 characters.");
            self.hasValidationErrors = true;
            self.focusOnError("#gift-zip");
        }
        else {
            self.shippingZIPError("");
        } 
    }

    // validate all of the fields. used when submitted.
    // allow a validationOverride variable to define which fields are required
    // could maybe do this dynamically, since those fields won't be in the template this is bound to.. hmm..
    self.validateAll = function() {
        self.hasValidationErrors = false;
        self.focused = false;
        if (validationOverride === "addressUpdate") {
            self.shippingStreet.validate();
            self.shippingStreet2.validate();
            self.shippingCity.validate();
            self.shippingZIP.validate(); 
            self.shippingState.validate();
            self.shippingStateCode.validate();
        }
        else {
            self.senderName.validate();
            self.recipientName.validate();
            self.recipientEmail.validate();
            self.shippingStreet.validate();
            self.shippingStreet2.validate();
            self.shippingCity.validate();
            self.shippingZIP.validate(); 
            self.shippingState.validate();
            self.shippingStateCode.validate();
        }
    }
};
/* ------------- BEGIN currency_codes.js --------------- */;
CurrencyCodes = [{"code":"AF","common_name":"Afghanistan","currency_code":"USD"},{"code":"AX","common_name":"Aland","currency_code":"EUR"},{"code":"AL","common_name":"Albania","currency_code":"ALL"},{"code":"DZ","common_name":"Algeria","currency_code":"DZD"},{"code":"AS","common_name":"American Samoa","currency_code":"USD"},{"code":"AD","common_name":"Andorra","currency_code":"EUR"},{"code":"AO","common_name":"Angola","currency_code":"USD"},{"code":"AI","common_name":"Anguilla","currency_code":"XCD"},{"code":"AQ","common_name":"Antarctica","currency_code":""},{"code":"AG","common_name":"Antigua and Barbuda","currency_code":"XCD"},{"code":"AR","common_name":"Argentina","currency_code":"ARS"},{"code":"AM","common_name":"Armenia","currency_code":"EUR"},{"code":"AW","common_name":"Aruba","currency_code":"AWG"},{"code":"AC","common_name":"Ascension","currency_code":"SHP"},{"code":"AU","common_name":"Australia","currency_code":"AUD"},{"code":"AT","common_name":"Austria","currency_code":"EUR"},{"code":"AZ","common_name":"Azerbaijan","currency_code":"USD"},{"code":"BH","common_name":"Bahrain","currency_code":"BHD"},{"code":"BD","common_name":"Bangladesh","currency_code":"BDT"},{"code":"BB","common_name":"Barbados","currency_code":"BBD"},{"code":"BY","common_name":"Belarus","currency_code":"EUR"},{"code":"BE","common_name":"Belgium","currency_code":"EUR"},{"code":"BZ","common_name":"Belize","currency_code":"BZD"},{"code":"BJ","common_name":"Benin","currency_code":"XOF"},{"code":"BM","common_name":"Bermuda","currency_code":"BMD"},{"code":"BT","common_name":"Bhutan","currency_code":"BTN"},{"code":"BO","common_name":"Bolivia","currency_code":"BOB"},{"code":"BA","common_name":"Bosnia and Herzegovina","currency_code":"EUR"},{"code":"BW","common_name":"Botswana","currency_code":"BWP"},{"code":"BV","common_name":"Bouvet Island","currency_code":""},{"code":"BR","common_name":"Brazil","currency_code":"BRL"},{"code":"IO","common_name":"British Indian Ocean Territory","currency_code":""},{"code":"VG","common_name":"British Virgin Islands","currency_code":"USD"},{"code":"BN","common_name":"Brunei","currency_code":"BND"},{"code":"BG","common_name":"Bulgaria","currency_code":"EUR"},{"code":"BF","common_name":"Burkina Faso","currency_code":"XOF"},{"code":"BI","common_name":"Burundi","currency_code":"BIF"},{"code":"KH","common_name":"Cambodia","currency_code":"KHR"},{"code":"CM","common_name":"Cameroon","currency_code":"XAF"},{"code":"CA","common_name":"Canada","currency_code":"CAD"},{"code":"CV","common_name":"Cape Verde","currency_code":"CVE"},{"code":"KY","common_name":"Cayman Islands","currency_code":"KYD"},{"code":"CF","common_name":"Central African Republic","currency_code":"XAF"},{"code":"TD","common_name":"Chad","currency_code":"XAF"},{"code":"CL","common_name":"Chile","currency_code":"CLP"},{"code":"CN","common_name":"China","currency_code":"CNY"},{"code":"CX","common_name":"Christmas Island","currency_code":"AUD"},{"code":"CC","common_name":"Cocos (Keeling) Islands","currency_code":"AUD"},{"code":"CO","common_name":"Colombia","currency_code":"COP"},{"code":"KM","common_name":"Comoros","currency_code":"KMF"},{"code":"CG","common_name":"Congo (Brazzaville)","currency_code":"XAF"},{"code":"CD","common_name":"Congo (Kinshasa)","currency_code":"USD"},{"code":"CK","common_name":"Cook Islands","currency_code":"NZD"},{"code":"CR","common_name":"Costa Rica","currency_code":"CRC"},{"code":"CI","common_name":"Cote d'Ivoire (Ivory Coast)","currency_code":"XOF"},{"code":"HR","common_name":"Croatia","currency_code":"HRK"},{"code":"CU","common_name":"Cuba","currency_code":"USD"},{"code":"CY","common_name":"Cyprus","currency_code":"EUR"},{"code":"CZ","common_name":"Czech Republic","currency_code":"CZK"},{"code":"DK","common_name":"Denmark","currency_code":"DKK"},{"code":"DJ","common_name":"Djibouti","currency_code":"DJF"},{"code":"DM","common_name":"Dominica","currency_code":"XCD"},{"code":"DO","common_name":"Dominican Republic","currency_code":"DOP"},{"code":"EC","common_name":"Ecuador","currency_code":"USD"},{"code":"EG","common_name":"Egypt","currency_code":"EGP"},{"code":"SV","common_name":"El Salvador","currency_code":"USD"},{"code":"GQ","common_name":"Equatorial Guinea","currency_code":"XAF"},{"code":"ER","common_name":"Eritrea","currency_code":"USD"},{"code":"EE","common_name":"Estonia","currency_code":"EUR"},{"code":"ET","common_name":"Ethiopia","currency_code":"ETB"},{"code":"FK","common_name":"Falkland Islands (Islas Malvinas)","currency_code":"FKP"},{"code":"FO","common_name":"Faroe Islands","currency_code":"DKK"},{"code":"FJ","common_name":"Fiji","currency_code":"USD"},{"code":"FI","common_name":"Finland","currency_code":"EUR"},{"code":"FR","common_name":"France","currency_code":"EUR"},{"code":"GF","common_name":"French Guiana","currency_code":"EUR"},{"code":"PF","common_name":"French Polynesia","currency_code":"XPF"},{"code":"TF","common_name":"French Southern and Antarctic Lands","currency_code":""},{"code":"GA","common_name":"Gabon","currency_code":"XAF"},{"code":"GE","common_name":"Georgia","currency_code":"EUR"},{"code":"DE","common_name":"Germany","currency_code":"EUR"},{"code":"GH","common_name":"Ghana","currency_code":"USD"},{"code":"GI","common_name":"Gibraltar","currency_code":"GIP"},{"code":"GR","common_name":"Greece","currency_code":"EUR"},{"code":"GL","common_name":"Greenland","currency_code":"DKK"},{"code":"GD","common_name":"Grenada","currency_code":"XCD"},{"code":"GP","common_name":"Guadeloupe","currency_code":"EUR"},{"code":"GU","common_name":"Guam","currency_code":"USD"},{"code":"GT","common_name":"Guatemala","currency_code":"GTQ"},{"code":"GG","common_name":"Guernsey","currency_code":"GBP"},{"code":"GN","common_name":"Guinea","currency_code":"GNF"},{"code":"GW","common_name":"Guinea-Bissau","currency_code":"XOF"},{"code":"GY","common_name":"Guyana","currency_code":"GYD"},{"code":"HT","common_name":"Haiti","currency_code":"HTG"},{"code":"HM","common_name":"Heard Island and McDonald Islands","currency_code":""},{"code":"HN","common_name":"Honduras","currency_code":"HNL"},{"code":"HK","common_name":"Hong Kong","currency_code":"HKD"},{"code":"HU","common_name":"Hungary","currency_code":"HUF"},{"code":"HY","common_name":"Hyrule","currency_code":"RUP"},{"code":"IS","common_name":"Iceland","currency_code":"ISK"},{"code":"IN","common_name":"India","currency_code":"INR"},{"code":"ID","common_name":"Indonesia","currency_code":"IDR"},{"code":"IR","common_name":"Iran","currency_code":"USD"},{"code":"IQ","common_name":"Iraq","currency_code":"IQD"},{"code":"IE","common_name":"Ireland","currency_code":"EUR"},{"code":"IM","common_name":"Isle of Man","currency_code":"GBP"},{"code":"IL","common_name":"Israel","currency_code":"ILS"},{"code":"IT","common_name":"Italy","currency_code":"EUR"},{"code":"JM","common_name":"Jamaica","currency_code":"JMD"},{"code":"JP","common_name":"Japan","currency_code":"JPY"},{"code":"JE","common_name":"Jersey","currency_code":"GBP"},{"code":"JO","common_name":"Jordan","currency_code":"JOD"},{"code":"KZ","common_name":"Kazakhstan","currency_code":"KZT"},{"code":"KE","common_name":"Kenya","currency_code":"KES"},{"code":"KI","common_name":"Kiribati","currency_code":"AUD"},{"code":"KW","common_name":"Kuwait","currency_code":"KWD"},{"code":"KG","common_name":"Kyrgyzstan","currency_code":"USD"},{"code":"LA","common_name":"Laos","currency_code":"LAK"},{"code":"LV","common_name":"Latvia","currency_code":"EUR"},{"code":"LB","common_name":"Lebanon","currency_code":"LBP"},{"code":"LS","common_name":"Lesotho","currency_code":"LSL"},{"code":"LR","common_name":"Liberia","currency_code":"LRD"},{"code":"LY","common_name":"Libya","currency_code":"LYD"},{"code":"LI","common_name":"Liechtenstein","currency_code":"CHF"},{"code":"LT","common_name":"Lithuania","currency_code":"EUR"},{"code":"LU","common_name":"Luxembourg","currency_code":"EUR"},{"code":"MO","common_name":"Macau","currency_code":"MOP"},{"code":"MK","common_name":"Macedonia","currency_code":"MKD"},{"code":"MG","common_name":"Madagascar","currency_code":"USD"},{"code":"MW","common_name":"Malawi","currency_code":"MWK"},{"code":"MY","common_name":"Malaysia","currency_code":"MYR"},{"code":"MV","common_name":"Maldives","currency_code":"MVR"},{"code":"ML","common_name":"Mali","currency_code":"XOF"},{"code":"MT","common_name":"Malta","currency_code":"EUR"},{"code":"MH","common_name":"Marshall Islands","currency_code":"USD"},{"code":"MQ","common_name":"Martinique","currency_code":"EUR"},{"code":"MR","common_name":"Mauritania","currency_code":"MRO"},{"code":"MU","common_name":"Mauritius","currency_code":"MUR"},{"code":"YT","common_name":"Mayotte","currency_code":"EUR"},{"code":"MX","common_name":"Mexico","currency_code":"MXN"},{"code":"FM","common_name":"Micronesia","currency_code":"USD"},{"code":"UM","common_name":"Midway Islands","currency_code":""},{"code":"MD","common_name":"Moldova","currency_code":"MDL"},{"code":"MC","common_name":"Monaco","currency_code":"EUR"},{"code":"MN","common_name":"Mongolia","currency_code":"MNT"},{"code":"ME","common_name":"Montenegro","currency_code":"EUR"},{"code":"MS","common_name":"Montserrat","currency_code":"XCD"},{"code":"MA","common_name":"Morocco","currency_code":"MAD"},{"code":"MZ","common_name":"Mozambique","currency_code":"USD"},{"code":"MM","common_name":"Myanmar (Burma)","currency_code":"MMK"},{"code":"NA","common_name":"Namibia","currency_code":"NAD"},{"code":"NR","common_name":"Nauru","currency_code":"AUD"},{"code":"NP","common_name":"Nepal","currency_code":"NPR"},{"code":"NL","common_name":"Netherlands","currency_code":"EUR"},{"code":"AN","common_name":"Netherlands Antilles","currency_code":"ANG"},{"code":"NC","common_name":"New Caledonia","currency_code":"XPF"},{"code":"NZ","common_name":"New Zealand","currency_code":"NZD"},{"code":"NI","common_name":"Nicaragua","currency_code":"NIO"},{"code":"NE","common_name":"Niger","currency_code":"XOF"},{"code":"NG","common_name":"Nigeria","currency_code":"NGN"},{"code":"NU","common_name":"Niue","currency_code":"NZD"},{"code":"NF","common_name":"Norfolk Island","currency_code":"AUD"},{"code":"KP","common_name":"North Korea","currency_code":"KPW"},{"code":"MP","common_name":"Northern Mariana Islands","currency_code":"USD"},{"code":"NO","common_name":"Norway","currency_code":"NOK"},{"code":"OM","common_name":"Oman","currency_code":"OMR"},{"code":"PK","common_name":"Pakistan","currency_code":"PKR"},{"code":"PW","common_name":"Palau","currency_code":"USD"},{"code":"PS","common_name":"Palestine","currency_code":"ILS"},{"code":"PA","common_name":"Panama","currency_code":"PAB"},{"code":"PG","common_name":"Papua New Guinea","currency_code":"PGK"},{"code":"PY","common_name":"Paraguay","currency_code":"PYG"},{"code":"PE","common_name":"Peru","currency_code":"PEN"},{"code":"PH","common_name":"Philippines","currency_code":"PHP"},{"code":"PN","common_name":"Pitcairn Islands","currency_code":"NZD"},{"code":"PL","common_name":"Poland","currency_code":"PLN"},{"code":"PT","common_name":"Portugal","currency_code":"EUR"},{"code":"PR","common_name":"Puerto Rico","currency_code":"USD"},{"code":"QA","common_name":"Qatar","currency_code":"QAR"},{"code":"RE","common_name":"Reunion","currency_code":"EUR"},{"code":"RO","common_name":"Romania","currency_code":"EUR"},{"code":"RU","common_name":"Russia","currency_code":"RUB"},{"code":"RW","common_name":"Rwanda","currency_code":"USD"},{"code":"SH","common_name":"Saint Helena","currency_code":"SHP"},{"code":"KN","common_name":"Saint Kitts and Nevis","currency_code":"XCD"},{"code":"LC","common_name":"Saint Lucia","currency_code":"XCD"},{"code":"PM","common_name":"Saint Pierre and Miquelon","currency_code":"EUR"},{"code":"VC","common_name":"Saint Vincent and the Grenadines","currency_code":"XCD"},{"code":"WS","common_name":"Samoa","currency_code":"WST"},{"code":"SM","common_name":"San Marino","currency_code":"EUR"},{"code":"ST","common_name":"Sao Tome and Principe","currency_code":"STD"},{"code":"SA","common_name":"Saudi Arabia","currency_code":"SAR"},{"code":"SN","common_name":"Senegal","currency_code":"XOF"},{"code":"RS","common_name":"Serbia","currency_code":"EUR"},{"code":"SC","common_name":"Seychelles","currency_code":"SCR"},{"code":"SL","common_name":"Sierra Leone","currency_code":"SLL"},{"code":"SG","common_name":"Singapore","currency_code":"SGD"},{"code":"SK","common_name":"Slovakia","currency_code":"EUR"},{"code":"SI","common_name":"Slovenia","currency_code":"EUR"},{"code":"SB","common_name":"Solomon Islands","currency_code":"SBD"},{"code":"SO","common_name":"Somalia","currency_code":"SOS"},{"code":"ZA","common_name":"South Africa","currency_code":"ZAR"},{"code":"GS","common_name":"South Georgia & South Sandwich Islands","currency_code":""},{"code":"KR","common_name":"South Korea","currency_code":"KRW"},{"code":"ES","common_name":"Spain","currency_code":"EUR"},{"code":"LK","common_name":"Sri Lanka","currency_code":"LKR"},{"code":"SD","common_name":"Sudan","currency_code":"USD"},{"code":"SR","common_name":"Suriname","currency_code":"USD"},{"code":"SJ","common_name":"Svalbard","currency_code":"NOK"},{"code":"SZ","common_name":"Swaziland","currency_code":"SZL"},{"code":"SE","common_name":"Sweden","currency_code":"SEK"},{"code":"CH","common_name":"Switzerland","currency_code":"CHF"},{"code":"SY","common_name":"Syria","currency_code":"SYP"},{"code":"TW","common_name":"Taiwan (Republic of China)","currency_code":"TWD"},{"code":"TJ","common_name":"Tajikistan","currency_code":"USD"},{"code":"TZ","common_name":"Tanzania","currency_code":"TZS"},{"code":"TH","common_name":"Thailand","currency_code":"THB"},{"code":"BS","common_name":"The Bahamas","currency_code":"BSD"},{"code":"GM","common_name":"The Gambia","currency_code":"GMD"},{"code":"TL","common_name":"Timor-Leste (East Timor)","currency_code":"USD"},{"code":"TG","common_name":"Togo","currency_code":"XOF"},{"code":"TK","common_name":"Tokelau","currency_code":"NZD"},{"code":"TO","common_name":"Tonga","currency_code":"TOP"},{"code":"TT","common_name":"Trinidad and Tobago","currency_code":"TTD"},{"code":"TA","common_name":"Tristan da Cunha","currency_code":"SHP"},{"code":"TN","common_name":"Tunisia","currency_code":"TND"},{"code":"TR","common_name":"Turkey","currency_code":"TRY"},{"code":"TM","common_name":"Turkmenistan","currency_code":"USD"},{"code":"TC","common_name":"Turks and Caicos Islands","currency_code":"USD"},{"code":"TV","common_name":"Tuvalu","currency_code":"AUD"},{"code":"VI","common_name":"U.S. Virgin Islands","currency_code":"USD"},{"code":"UG","common_name":"Uganda","currency_code":"UGX"},{"code":"UA","common_name":"Ukraine","currency_code":"UAH"},{"code":"AE","common_name":"United Arab Emirates","currency_code":"AED"},{"code":"GB","common_name":"United Kingdom","currency_code":"GBP"},{"code":"US","common_name":"United States","currency_code":"USD"},{"code":"UY","common_name":"Uruguay","currency_code":"UYU"},{"code":"UZ","common_name":"Uzbekistan","currency_code":"USD"},{"code":"VU","common_name":"Vanuatu","currency_code":"VUV"},{"code":"VA","common_name":"Vatican City","currency_code":"EUR"},{"code":"VE","common_name":"Venezuela","currency_code":"USD"},{"code":"VN","common_name":"Vietnam","currency_code":"USD"},{"code":"WF","common_name":"Wallis and Futuna","currency_code":"XPF"},{"code":"EH","common_name":"Western Sahara","currency_code":"MAD"},{"code":"YE","common_name":"Yemen","currency_code":"YER"},{"code":"ZM","common_name":"Zambia","currency_code":"ZMK"},{"code":"ZW","common_name":"Zimbabwe","currency_code":"ZWL"}];;
/* ------------- BEGIN tpl_cart --------------- */;
if (Templ) { Templ.register({
"cart/sidecart_item" : ["<div class=\"cartItemReveal reveal\">\n<div class=\"cartItemContents\">\n",{"expression":"item.item_title ","type":"let","variable":"description"},"\n",{"blocks":[{"attachment":["     ",{"nodelist":[{"filters":[],"name":"item.item_title2","type":"variable"},", ",{"filters":[],"name":"description","type":"variable"}],"to":"description","type":"capture"}],"expression":"item.item_title2 ","type":"ncondition"}],"type":"ef"},"\n",{"blocks":[{"attachment":[{"nodelist":[{"filters":[],"name":"description","type":"variable"},", digital album"],"to":"description","type":"capture"}],"expression":"item.item_type == 'a' ","type":"ncondition"}],"type":"ef"},"\n",{"blocks":[{"attachment":[{"nodelist":[{"filters":[],"name":"description","type":"variable"},", digital track"],"to":"description","type":"capture"}],"expression":"item.item_type == 't' ","type":"ncondition"}],"type":"ef"},"\n",{"blocks":[{"attachment":["     ",{"nodelist":[{"filters":[],"name":"description","type":"variable"},", ",{"filters":[],"name":"item.option_name","type":"variable"}],"to":"description","type":"capture"}],"expression":"item.option_name ","type":"ncondition"}],"type":"ef"},"\n",{"blocks":[{"attachment":["    ",{"nodelist":[{"filters":[],"name":"description","type":"variable"},", quantity ",{"filters":[],"name":"item.quantity","type":"variable"}],"to":"description","type":"capture"}],"expression":"item.quantity > 1 ","type":"ncondition"}],"type":"ef"},"\n",{"blocks":[{"attachment":["     ",{"nodelist":[{"filters":[],"name":"description","type":"variable"}," (no longer available)"],"to":"description","type":"capture"}],"expression":"item.unavailable ","type":"ncondition"}],"type":"ef"},"\n\n",{"blocks":[{"attachment":["\n<div class=\"thumb ",{"blocks":[{"attachment":["package"],"expression":"item.item_type == 'p' ","type":"ncondition"}],"type":"ef"},"\"",{"blocks":[{"attachment":[" style=\"background-image:url(",{"filters":[["art_url",["\"art_embedded_player_large\""]],["a",[]]],"name":"item.art_id","type":"variable"},")\""],"expression":"item.art_id ","type":"ncondition"},{"attachment":[" style=\"background-image:url(",{"filters":[["image_url",["\"package_thumb\""]],["a",[]]],"name":"item.image_id","type":"variable"},")\""],"expression":"item.image_id ","type":"ncondition"}],"type":"ef"},"></div>\n"],"expression":"media_mode == \"phone\" ","type":"ncondition"}],"type":"ef"},"\n<p>\n    ",{"blocks":[{"attachment":["<span class=\"gifticon bc-ui bc-ui-m\"></span>"],"expression":"item.is_gift ","type":"ncondition"}],"type":"ef"},"\n    <a class=\"itemName notSkinnable\" href=\"",{"filters":[["a",[]]],"name":"item.url","type":"variable"},"\">",{"filters":[["h",[]]],"name":"description","type":"variable"},"</a>\n    <br>\n    <a class=\"delete notSkinnable\" href=\"#\"><span>x</span></a>\n    <span class=\"price\">",{"filters":[],"name":"item.disp_price","type":"variable"},"</span>\n</p>\n</div>\n</div>\n"],
"cart/sidecart_summary" : [{"expression":"(currency == 'RUP') ","type":"let","variable":"hyrule"},"\n",{"expression":"(hyrule && disp_total == '99') ","type":"let","variable":"wallet"},"\n\n<table id=\"summary\">\n  ",{"blocks":[{"attachment":["\n    <tr>\n        <th class=\"small\">subtotal</th>\n        <td id=\"cartSubtotal\" class=\"small numeric\">",{"filters":[],"name":"disp_subtotal","type":"variable"},"</td>\n        <td class=\"currency\"><a href=\"/no_js/country_picker\">",{"filters":[],"name":"currency","type":"variable"},"</a></td>\n    </tr>\n  "],"expression":"has_shipping || has_tax ","type":"ncondition"}],"type":"ef"},"\n  ",{"blocks":[{"attachment":["\n    <tr",{"blocks":[{"attachment":[" class=\"shipping\""],"expression":"!has_tax ","type":"ncondition"}],"type":"ef"},">\n        <th class=\"small\">shipping</th>\n        <td id=\"cartShipping\" class=\"small numeric\">",{"filters":[],"name":"disp_shipping","type":"variable"},"</span></td>\n        <td class=\"currency\"><a href=\"/no_js/country_picker\">",{"filters":[],"name":"currency","type":"variable"},"</a></td>\n    </tr>\n  "],"expression":"has_shipping ","type":"ncondition"}],"type":"ef"},"\n  ",{"blocks":[{"attachment":["\n    <tr class=\"shipping\">\n        <th class=\"small\">tax</th>\n        <td id=\"cartTax\" class=\"small numeric\">",{"filters":[],"name":"disp_tax","type":"variable"},"</span></td>\n        <td class=\"currency\"><a href=\"/no_js/country_picker\">",{"filters":[],"name":"currency","type":"variable"},"</a></td>\n    </tr>\n  "],"expression":"has_tax ","type":"ncondition"}],"type":"ef"},"\n    <tr class=\"total\">\n        <th>total</th>\n        <td class=\"numeric",{"blocks":[{"attachment":[" notable"],"expression":"wallet ","type":"ncondition"}],"type":"ef"},"\">",{"filters":[],"name":"disp_total","type":"variable"},"</span></td>\n        <td class=\"currency\"><a",{"blocks":[{"attachment":[" class=\"notable\""],"expression":"wallet ","type":"ncondition"}],"type":"ef"}," href=\"/no_js/country_picker\">",{"filters":[],"name":"currency","type":"variable"},"</a></td>\n    </tr>\n  ",{"blocks":[{"attachment":["\n    <tr><td class=\"small hyrule\" colspan=\"3\">\n    ",{"blocks":[{"attachment":["\n      You need the Giant's Wallet!\n    "],"expression":"wallet ","type":"ncondition"},{"attachment":["\n      Hoo hoot! Link... Look up here! It appears that the time has finally come for you to start your adventure! You will encounter many hardships ahead.. That is your fate. Don't feel discouraged, even during the toughest times! <br><br>\n      Did you get all that? <a href=\"http://www.youtube.com/watch?v=Fc3pFGJDYOM&t=0m6s\" target=\"_blank\">No</a> / <a href=\"http://www.youtube.com/watch?v=H2qF5jXu7ik&t=2m17s\" target=\"_blank\">Yes</a>\n    "],"type":"else_ncondition"}],"type":"ef"},"\n    </td></tr>\n  "],"expression":"hyrule ","type":"ncondition"}],"type":"ef"},"\n</table>\n\n<div class=\"summary-notes\">\n  ",{"blocks":[{"attachment":["\n    <span>ship to <a href=\"/no_js/country_picker\">",{"filters":[["h",[]]],"name":"country_name","type":"variable"},{"blocks":[{"attachment":[", ",{"filters":[["h",[]]],"name":"us_state","type":"variable"}," ",{"filters":[["h",[]]],"name":"us_zip","type":"variable"}],"expression":"country == 'US' && us_zip ","type":"ncondition"}],"type":"ef"},"</a></span>",{"blocks":[{"attachment":["<span class=\"small\"> (click to change country or set ZIP code, taxes may apply)</span>"],"expression":"country == 'US' && !us_zip ","type":"ncondition"}],"type":"ef"},"\n  "],"expression":"has_shipping && !contains.physical_gift ","type":"ncondition"}],"type":"ef"},"\n</div>"],
"cart/country_pref" : ["<div><div class=\"country_pref_pointer\"></div></div>\n<div style=\"clear:both\"></div>\n<div class=\"country_pref_body\">\n    <div class=\"bd\">\n        <a class=\"country_pref_close\" href=\"#\">x</a>\n        Select your country:\n        <div style=\"clear:both\"></div>\n        <select class=\"country_pref_select\">",{"filters":[],"name":"options","type":"variable"},"</select><br>\n        <div class=\"us-zip\">\n        \t<label>\n        \t\tZip:\n        \t\t<input type=\"text\" class=\"country_pref_zip\" size=\"5\" maxlength=\"5\"/>\n        \t</label>\n        \t<a class=\"us-zip-done\">Save</a>\n        </div>\n    </div>\n</div>\n"],
"_package_listing_title" : ["\n\n\n",{"expression":"(package.quantity_warning && package.quantity_available <= 0) || (package.quantity_limits && package.quantity_limits <= 0) ","type":"let","variable":"package_sold_out"},"\n",{"expression":"package.quantity_limits && package.cart_quantity && package.cart_quantity >= package.quantity_limits ","type":"let","variable":"cant_buy_package"},"\n\n",{"blocks":[{"attachment":["\n",{"filters":[["h",[]]],"name":"package.title","type":"variable"},"\n"],"expression":"package_sold_out || cant_buy_package ","type":"ncondition"},{"attachment":["\n\n\n\n",{"blocks":[{"attachment":["\n<a class=\"buy-link subscribe-link\" data-pkg=\"",{"filters":[["attr",[]]],"name":"package_index","type":"variable"},"\" href=\"/subscribe\">\n    <span class=\"buyItemPackageTitle primaryText\">",{"filters":[["h",[]]],"name":"package.title","type":"variable"},"</span>\n</a>\n"],"expression":"package.subscriber_only && !(viewing_as_subscriber || member_of_current_band) ","type":"ncondition"}],"type":"ef"},"\n\n<button class=\"order_package_link buy-link ",{"blocks":[{"attachment":["subscriber-only-buy-link",{"blocks":[{"attachment":[" subscriber-view"],"expression":"viewing_as_subscriber || member_of_current_band ","type":"ncondition"}],"type":"ef"}],"expression":"package.subscriber_only ","type":"ncondition"}],"type":"ef"},"\" type=\"button\" data-pkg=\"",{"filters":[],"name":"package_index","type":"variable"},"\">\n    <span class=\"buyItemPackageTitle primaryText\">",{"filters":[["h",[]]],"name":"package.title","type":"variable"},"</span>\n</button>\n\n",{"blocks":[{"attachment":["\n<span class='notable' style='font-size:70%'>(private)</span>"],"expression":"package.private && !package.subscriber_only ","type":"ncondition"}],"type":"ef"},"\n"],"type":"else_ncondition"}],"type":"ef"}],
"_package_listing_price" : ["\n\n\n",{"expression":"(package.quantity_warning && package.quantity_available <= 0) || (package.quantity_limits && package.quantity_limits <= 0) ","type":"let","variable":"package_sold_out"},"\n",{"expression":"package.quantity_limits && package.cart_quantity && package.cart_quantity >= package.quantity_limits ","type":"let","variable":"cant_buy_package"},"\n\n",{"blocks":[{"attachment":["\n    <h4 class=\"notable\">Sold Out</h4>\n"],"expression":"package_sold_out ","type":"ncondition"},{"attachment":["\n\n    ",{"blocks":[{"attachment":["\n        ",{"expression":"\"Pre-order Now\" ","type":"let","variable":"buy_text"},"\n    "],"expression":"digital_preorder && (package.album_id || package.download_type) ","type":"ncondition"},{"attachment":["\n        ",{"expression":"\"Buy Now\" ","type":"let","variable":"buy_text"},"\n    "],"type":"else_ncondition"}],"type":"ef"},"\n\n    ",{"blocks":[{"attachment":["\n        <div class=\"buyItemEdition notable\">You have the maximum quantity of this item in <span class=\"end\">your cart.</span></div>\n    "],"expression":"cant_buy_package ","type":"ncondition"}],"type":"ef"},"\n\n    ",{"expression":"package.download_type && digital_preorder_release_date && digital_preorder_release_date != package.release_date ","type":"let","variable":"separate_digital_release_date"},"\n    ",{"blocks":[{"attachment":["\n        <div class=\"buyItemEdition secondaryText\">digital album releases <span class=\"end\">",{"filters":[["date",["'%d %B %Y'"]]],"name":"digital_preorder_release_date","type":"variable"},"</span></div>\n    "],"expression":"separate_digital_release_date ","type":"ncondition"}],"type":"ef"},"\n    ",{"blocks":[{"attachment":["\n        <div class=\"buyItemEdition secondaryText\">",{"blocks":[{"attachment":["item ships"],"expression":"separate_digital_release_date ","type":"ncondition"},{"attachment":["shipping"],"type":"else_ncondition"}],"type":"ef"}," out on or around <span class=\"end\">",{"filters":[["date",["'%d %B %Y'"]]],"name":"package.release_date","type":"variable"},"</span></div>\n    "],"expression":"package.release_date ","type":"ncondition"},{"attachment":["\n        <div class=\"buyItemEdition secondaryText\">",{"blocks":[{"attachment":["item "],"expression":"separate_digital_release_date ","type":"ncondition"}],"type":"ef"},"ships out within <span class=\"end\">",{"filters":[["h",[]]],"name":"package.fulfillment_days","type":"variable"}," ",{"filters":[["plural",["\"day\"","\"days\""]]],"name":"package.fulfillment_days","type":"variable"},"</span></div>\n    "],"expression":"package.shipping_exception_mode != 'w' && package.fulfillment_days && package.fulfillment_days > 0 ","type":"ncondition"}],"type":"ef"},"\n    \n    ",{"blocks":[{"attachment":["\n    <div class=\"buyItemEdition secondaryText\">\n        ",{"blocks":[{"attachment":["\n           edition of ",{"filters":[],"name":"package.edition_size","type":"variable"},"&nbsp;\n        "],"expression":"package.edition_size ","type":"ncondition"}],"type":"ef"},"\n        ",{"blocks":[{"attachment":["\n            <span class=\"notable end\">",{"filters":[],"name":"package.quantity_available","type":"variable"}," remaining</span>\n        "],"expression":"package.quantity_warning && package.quantity_available > 0 ","type":"ncondition"}],"type":"ef"}," \n    </div>\n    "],"expression":"(package.edition_size || (package.quantity_warning && package.quantity_available > 0)) && (package.shipping_exception_mode != 'w') ","type":"ncondition"}],"type":"ef"}," \n    <h4 class=\"compound-button\">\n\n        ",{"blocks":[{"attachment":["\n            ",{"filters":[],"name":"buy_text","type":"variable"},"\n        "],"expression":"cant_buy_package ","type":"ncondition"},{"attachment":["\n\n            ",{"blocks":[{"attachment":["\n                <a class=\"buy-link subscribe-link\" data-pkg=\"",{"filters":[["attr",[]]],"name":"package_index","type":"variable"},"\" href=\"/subscribe\">",{"filters":[],"name":"buy_text","type":"variable"},"</a>\n            "],"expression":"package.subscriber_only && !(viewing_as_subscriber || member_of_current_band) ","type":"ncondition"}],"type":"ef"},"\n\n            <button class=\"order_package_link buy-link ",{"blocks":[{"attachment":["subscriber-only-buy-link",{"blocks":[{"attachment":[" subscriber-view"],"expression":"viewing_as_subscriber || member_of_current_band ","type":"ncondition"}],"type":"ef"}],"expression":"package.subscriber_only ","type":"ncondition"}],"type":"ef"},"\" type=\"button\" data-pkg=\"",{"filters":[["attr",[]]],"name":"package_index","type":"variable"},"\">\n                ",{"filters":[],"name":"buy_text","type":"variable"},"\n            </button>\n        "],"type":"else_ncondition"}],"type":"ef"},"\n        ",{"expression":"item_sellers[package.selling_band_id].currency ","type":"let","variable":"package_currency"},"\n        <span class=\"base-text-color\">&nbsp;",{"filters":[["currency",["package_currency","false","true","true"]]],"name":"package.price","type":"variable"},"</span>\n        <span class=\"buyItemExtra secondaryText\">",{"filters":[["h",[]]],"name":"package_currency","type":"variable"},"</span>\n        ",{"blocks":[{"attachment":["\n            <span class=\"buyItemExtra buyItemNyp secondaryText\">or more</span>\n        "],"child_condition":null,"child_relation":null,"left":"package.is_set_price","operator":"!=","right":"1","type":"condition"}],"type":"if"},"\n        ",{"blocks":[{"attachment":["\n            ",{"blocks":[{"attachment":["\n            <h4 class=\"ft compound-button send-as-gift\">\n                <button class=\"order_package_link buy-link\" type=\"button\" data-pkg=\"",{"filters":[["attr",[]]],"name":"package_index","type":"variable"},"\">Send as Gift</button>&nbsp;\n                <!--<a href=\"/no_js/gift_package?pkg=",{"filters":[["attr",[]]],"name":"package_index","type":"variable"},"\">Send as Gift</a>-->\n            </h4>\n            "],"expression":"!package.subscriber_only || (package.subscriber_only && (viewing_as_subscriber || member_of_current_band)) ","type":"ncondition"}],"type":"ef"},"\n        "],"expression":"!cant_buy_package && cfg.physical_gifting && !cfg.BALLS_disable_physical_gifting && package.type_id != 12 ","type":"ncondition"}],"type":"ef"},"\n    </h4>\n\n    ",{"blocks":[{"attachment":["\n        <div class=\"subscribe-login\">already a subscriber? <a href=\"",{"filters":[["a",[]]],"name":"login_bounce_url","type":"variable"},"\">log in</a></div>\n    "],"expression":"!cant_buy_package && package.subscriber_only && !(viewing_as_subscriber || member_of_current_band) && !logged_in ","type":"ncondition"}],"type":"ef"},"\n    \n"],"type":"else_ncondition"}],"type":"ef"},"\n"]
}); };
/* ------------- BEGIN fan_tralbum.js --------------- */;
/* global 
    $,
    CollectedBy,
    Iter,
    TralbumData, 
    TralbumLogin,
    Identities,
    MediaView,
    Fixup,
    Templ,
    Share,
    Url,
    Trackpipe,
    Dialog,
    BandData,
    Stats,
    siteroot_https,
    data
 */

(function(exports) {
    "use strict";

    function doPost(url, parms, callback) {
            if (Url.isCustomDomain()) {
                url = siteroot_https + url;
            }

            var args = { 
                type: "POST", 
                url: url, 
                data: parms, 
                dataType: (Url.isCustomDomain() && !$.support.cors ? "jsonp" : "json"),
                xhrFields: { withCredentials: true },  // enable CORS with cookies
                success: function(data) {
                    if (Trackpipe.showXHRError(data)) {
                        Log.error('XHR POST returned error JSON', data);
                        return;
                    }
                    Log.note('XHR form submission succeeded with data', data);
                    
                    callback(data);
                },
                error: function(jqXHR, errorType, exception) {
                    Log.error('XHR POST failed', jqXHR, errorType, exception);
                    if (jqXHR.data) {
                        Trackpipe.showXHRError(jqXHR.data);
                    }
                    else {           
                        Dialog.alert('Network Error', 'There was a network error while processing your request. Please try again.');
                    }
                    callback(jqXHR.data);
                }
            };
            Crumb.ajax(args);
        }

    var TralbumFans = {
        initialize: function (collectors, subscribers, memberOfBand, showMoreCollectors, showMoreSubscribers) {
            if (!(collectors || subscribers)) {
                return;
            }
            this.collectors = collectors;
            this.subscribers = subscribers;
            var deetsElem = $('.collected-by .deets')[0];
            var subscriberDeetsElem = $('.collected-by .subscriber-deets')[0];
            var censorCallback = memberOfBand ? this.censorReview : null;

            if (collectors && collectors.length > 0) {
                Iter.each(collectors, function (collector) {
                    var track = Iter.find(TralbumData.trackinfo, function (trackinfo) {
                        return trackinfo.id && trackinfo.id == collector.featured_track_id;
                    });
                    if (track) {
                        collector.fav_track_title = track.title;
                    }
                });
                $('.collected-by.collectors').show();
                $('.collected-by .message').slideDown();
                CollectedBy.renderFull(deetsElem, collectors, null, censorCallback, null);
            }

            if (subscribers && subscribers.length > 0){
                $('.collected-by.subscribers').show();
                $('.collected-by .subscriber-message').slideDown();
                CollectedBy.renderFull(subscriberDeetsElem, subscribers);
            }

    //        $(".writing", deetsElem).bcTruncate();
    //        $(".writing", deetsElem).bcTruncate(TruncateProfile.get("fan_why_mini"));        

            function showMore() {
                CollectedBy.renderFull(deetsElem, collectors, null, censorCallback, showLess);
                return false;
            }
            function showLess() {
                $(this).hide();
                CollectedBy.renderMini(deetsElem, collectors, 9, showMore);
                return false;
            }
        },

        censorReview: function (fanID, itemType, itemID, reviewElement) {
            var params = {
                    fan_id: fanID,
                    item_type: itemType[0],
                    item_id: itemID
                };
            doPost('/censor_fan_review', params, function (data) {
                if (data && data.ok) {
                    $(reviewElement).slideToggleBool(false);
                }
            });
        }
    };

    var FanControls = {
        fan_id: null,
        is_owned: false,
        initialized: null,

        init: function(data) {
            if (!data || (!data.show_collect && !data.is_collected) || this.initialized) {
                return;
            }

            if ( !FanControls.fan_id ) {
                FanControls.fan_id = data.fan_id;
            }

            var applyEventHandlers = function() {
                var args = [ data.fan_id, data.collect_item_id, data.collect_item_type, data.collect_band_id ];

                // Attach the click handlers at the outermost "button" level. For phones, this allows taps anywhere
                // in the button to handle the event, and causes some mobile browsers to highlight the entire button.
                $("#wishlist-msg").click( function() {
                    if (Identities.fan() && !(Identities.fan().private)) {
                        FanControls.collectItem.apply(FanControls, args);   
                    }
                    else {
                        TralbumLogin.begin('wishlist');
                    }
                });
                $("#wishlisted-msg").click( function(event) {
                    if ( !$(event.target).closest("a[href]").length ) {
                        // skip clicks in the "view" anchor
                        FanControls.uncollectItem.apply(exports, args);
                    }
                });
                if (window.Fixup)
                    Fixup.compoundLinkButtons("#purchased-msg");
            };

            $(document).ready( function() {
                data.is_private_fan = Identities.fan() && Identities.fan().private;
                var html = $( Templ.render("tralbum_common/tralbum_collect_controls", data) );
                if (MediaView.mode == "phone") {
                    var shareButton = $("li.share-link-container");
                    if (shareButton.length)
                        html.insertBefore(shareButton);
                    else
                        html.appendTo("ul.tralbumCommands");
                    applyEventHandlers();

                    // need to convert username#wishlist -> username/wishlist on mobile
                    var wishlistViewLink = $("#wishlisted-msg > a.view");
                    var href = $(wishlistViewLink).attr("href");
                    $(wishlistViewLink).attr("href", href.replace(/#/g, "/"));
                }
                else {
                    Share.panelLinkPromise.done( function () {
                        html.insertAfter(".share-embed");
                        applyEventHandlers();
                    });
                }
            });

            this.is_owned = data.is_purchased || false;
            // track the init state of FanControls, as FanControls.init is called twice on custom domains
            this.initialized = true;
        },

        collectItem: function(fan_id, item_id, item_type, band_id) {
            $('#collect-item').addClass('wishlisted').removeClass('wishlist');
            $('#wishlist-alert').hide();
            var parms = {'fan_id':fan_id, 'item_id':item_id, 'item_type':item_type, 'band_id':band_id};
            if ( window.ReferrerToken ) {
                parms.ref_token = window.ReferrerToken;
            }

            var callback = function(data) {
                if (data.ok === true) {
                    Log.note('successfully added item to wishlist');
                } else {
                    $('#collect-item').addClass('wishlist').removeClass('wishlisted');    
                    $('#wishlist-alert').show();
                }
            };
            doPost('/collect_item_cb', parms, callback);
        },
    
        uncollectItem: function(fan_id, item_id, item_type, band_id) {
            $('#collect-item').addClass('wishlist').removeClass('wishlisted');
            $('#wishlist-alert').hide();
            var parms = {'fan_id':fan_id, 'item_id':item_id, 'item_type':item_type, 'band_id':band_id};
            var callback = function(data) {
                if (data.ok === true) {
                    Log.note('successfully removed item from wishlist');
                } else {
                    $('#collect-item').addClass('wishlisted').removeClass('wishlist');
                    $('#wishlist-alert').show();
                }
            };
            doPost('/uncollect_item_cb', parms, callback);
        },

    };

    var BandFollow = {
        first_band_follow_notified: false,
        fan_id: null,
        fan_email: null,
        band_id: null,
        band_image_id: null,
        band_art_id: null,
        fan_image_id: null,
        initialized: null,
        theButton: null,
        root: null,
        is_following: false,

        init: function(data) {
            if (!data || $("#following-actions").length === 0 || this.initialized) return;
            
            this.first_band_follow_notified = data.first_band_follow_notified;
            this.fan_id = data.fan_id;
            this.fan_email = data.fan_email;
            this.band_id = data.band_id;
            this.band_image_id = data.band_image_id;
            this.fan_image_id = data.fan_image_id;
            this.band_art_id = data.band_art_id;
            this.is_following = data.is_following;

            var self = this;

            $(document).ready(function () {
                $('#following-actions').renderLiquid("fan/band_follow", data);

                self.root = $('#following-actions');
                self.theButton = $('#follow-unfollow', self.root);
                if (MediaView.mode != "phone") {
                    self.theButton.hover(
                        function () {
                            if ($(this).hasClass('following')) { $('div', this).html("Unfollow"); }
                        },
                        function () {
                            if ($(this).hasClass('following')) { $('div', this).html("Following"); }
                        }
                    );
                }
                self.theButton.click(
                    function() {
                        if (Identities.fan()) {
                            BandFollow.followUnfollow(data.fan_id, typeof BandData !== 'undefined' ? BandData.id : null, data.tralbum_id, data.tralbum_type); 
                        }
                        else {
                            TralbumLogin.begin('follow');
                        }
                    }
                );

                // if we got here via a follow->signup/login->bounce_url path, then show the first-follow dialog
                var pagedata = $("#pagedata").data("blob");
                if (pagedata && pagedata.band_first_follow_dialog) {
                    BandFollow.showFirstFollowDialog();
                }
            });

            this.initialized = true;
        },
    
        followUnfollow: function(fan_id, band_id, tralbum_id, tralbum_type) {
            var isFollowing = this.theButton.hasClass('following');
            BandFollow.updateButton(!isFollowing);  // update UI immediately so we're not subject to network lag

            var action = isFollowing ? 'unfollow' : 'follow';
            var url = '/fan_follow_band_cb';
            var data = {
                fan_id: fan_id,
                action: action
            };
            var self = this;

            if (!!band_id) {
                data.band_id = band_id;
            }
            if (!!tralbum_id && !!tralbum_type) {
                data.tralbum_id = tralbum_id;
                data.tralbum_type = tralbum_type;
            }
            doPost(url, data, function(data){
                if (data && data.ok) {
                    Log.note('successful: band ' + action);
                    BandFollow.updateButton(data.is_following);
                    self.is_following = data.is_following;
                }
                else
                    BandFollow.updateButton(isFollowing);  // crummy fallback: revert to original state
            });

            Stats.record({ kind:"click", click:"band_" + action});

            // if this is the first band-follow action, show the dialog. 
            if (action == 'follow' && !this.first_band_follow_notified) {
                this.showFirstFollowDialog();
            }
        },

        updateButton: function(isFollowing) {
            $('div', this.theButton).text(isFollowing ? 'Following' : 'Follow');
            this.theButton[isFollowing ? 'addClass' : 'removeClass']("following");
        },

        showFirstFollowDialog: function() {
            if (!this.fan_id || !this.band_id) return;
            NuDialog.showTemplate('fan/band_first_follow_dialog',{
                band_name: BandData.name,
                fan_email: this.fan_email,
                fan_image_id: this.fan_image_id,
                band_image_id: this.band_image_id,
                band_art_id: this.band_art_id,
                is_mobile: MediaView.mode != 'desktop'
            }, {
                draggable: false,
                width: "30em",
                title: "Following!",
                buttons: {
                    "Got it": function () {
                        $(this).dialog('close');
                    }
                }
            });
            doPost('/first_band_follow_notice', {fan_id: this.fan_id, band_id: this.band_id}, function() {});
            this.first_band_follow_notified = true;
        }
    };

    exports.TralbumFans = TralbumFans;
    exports.FanControls = FanControls;
    exports.BandFollow = BandFollow;
})(window);
;
/* ------------- BEGIN collected_by.js --------------- */;
CollectedBy = {};
(function () {
    CollectedBy.initTooltips = function (container) {
        $(container).bc_tooltips({itemSelector: 'a.pic'});
    };

    var MAX_REVIEWS = 6;
    var PREVIEW_REVIEWS = 3;
    var MAX_THUMBS = 80;
    var PREVIEW_THUMBS=50;
    var SINGLE_TOGGLE = false;
    var MEATY_REVEAL = 15;
    CollectedBy.renderFull = function (container, collectors, excludeFanIDs, censorCallback, showLess, options) {
        if (!$.isArray(excludeFanIDs)) {
            excludeFanIDs = [excludeFanIDs];
        }

        var max_reviews = options && options.max_reviews ? options.max_reviews : MAX_REVIEWS;
        var max_thumbs = options && options.max_thumbs ? options.max_thumbs : MAX_THUMBS;
        var single_toggle = options && options.single_toggle ? options.single_toggle : SINGLE_TOGGLE;
        var show_tooltips = !options || !options.hide_tooltips;

        var hash = {
            reviews: [],
            no_reviews: [],
            member_of_current_band: !!censorCallback,
            from_parm: window.TralbumFans ? 'fanthanks' : 'alsocollect',
            max_reviews: max_reviews, max_thumbs: max_thumbs, single_toggle: single_toggle,
            show_tooltips: show_tooltips
        };
        Iter.each(collectors, function (fan) {
            if ($.inArray(fan.fan_id, excludeFanIDs) < 0) {
                hash[fan.why ? 'reviews' : 'no_reviews'].push(fan);
            }
        });

        // be a bit forgiving with letting more than the max shown by default if the spillover is small enough
        if (single_toggle) {
            if ((hash.reviews.length - max_reviews) + (hash.no_reviews.length - max_thumbs) < MEATY_REVEAL) {
                hash.max_reviews = hash.reviews.length;
                hash.max_thumbs = hash.no_reviews.length;
            }
        } else {
            if (hash.no_reviews.length > MAX_THUMBS) {
                hash.max_thumbs = PREVIEW_THUMBS;
            }
            if (hash.reviews.length > MAX_REVIEWS) {
                hash.max_reviews = PREVIEW_REVIEWS;
            } 
        }

        $(container)
            .slideUp(100)
            .queue(function (next) {
                $(this)
                    .renderLiquid('fan/collection_grid/also_collected_by_deets', hash);
                $('img.lazy', this).lazyload({ threshold : 500, effect : "fadeIn", effectspeed : 100 });
                $(this)
                    .find('.more-writing').click(moreReviews).end()
                    .find('.more-thumbs').click(moreThumbs).end()
                    .find('.more-everything').click(moreEverything).end()
                    .find('a.censor').click(doCensor).end()
                    .addClass('populated').end();
                if(showLess) {
                    $(this).find('.show-less.close')
                        .fadeIn('slow')
                        .on('click',showLess);
                }
                CollectedBy.initTooltips(this);
                next();
            })
            .slideDown(100);

        function doCensor() {
            var $this = $(this),
                fanID = $this.data('fan-id'),
                itemType = $this.data('item-type'),
                itemID = $this.data('item-id'),
                fanName = $this.data('fan-name'),
                possessiveName = fanName[fanName.length-1].toLowerCase === 's' ? fanName + "'" : fanName + "'s";
            Dialog.alert("Remove", "Are you sure you want to remove " + Text.escapeHtml(possessiveName) + " text? This action cannot be reversed.", onConfirm, true);
            function onConfirm() {
                censorCallback(fanID, itemType, itemID, $this.closest('.writing'));
            }
        }
        function moreReviews() {
            $(this)
            .fadeOut(200)
            .queue(function (next) {
                renderMoreReviews(this);
                next();
            });
            return false;
        }
        function renderMoreReviews(src) {
            var container = $(src).closest('.collected-by');
            var template = 'fan/collection_grid/also_collected_by_review_innards';
            for (var i=hash.max_reviews, len=hash.reviews.length; i<len; i++) {
                var fanHash = {
                    review:hash.reviews[i], loop_index:i-hash.max_reviews,
                    member_of_current_band: !!censorCallback,
                    from_parm: window.TralbumFans ? 'fanthanks' : 'alsocollect',
                    show_tooltips: true
                }
                var html = $(Templ.render(template, fanHash));
                $('div.writing:last', container).after(html);
            }
            $('img.lazy', container).lazyload({ threshold : 500, effect : "fadeIn", effectspeed : 100 });
            CollectedBy.initTooltips(container);
        }
        function moreThumbs() {
            $(this)
            .fadeOut(200)
            .queue(function (next) {
                renderMoreThumbs(this);
                next();
            });
            return false;
        }
        function renderMoreThumbs(src) {
            var thumbsDiv = $(src).closest('.no-writing');
            var template = 'fan/collection_grid/also_collected_by_no_review_innards';
            for (var i=hash.max_thumbs, len=hash.no_reviews.length; i<len; i++) {
                var fanHash = {
                    fan:hash.no_reviews[i], loop_index:i-hash.max_thumbs,
                    from_parm: window.TralbumFans ? 'fanthanks' : 'alsocollect',
                    show_tooltips: true
                }
                var html = $(Templ.render(template, fanHash));
                $(thumbsDiv).append(html);
            }
            $('img.lazy', thumbsDiv).lazyload({ threshold : 500, effect : "fadeIn", effectspeed : 100 });
            CollectedBy.initTooltips(thumbsDiv);
        }
        function moreEverything() {
            $(this)
            .fadeOut(200)
            .queue(function (next) {
                if ($(this).data('more-reviews')) {
                    renderMoreReviews(this);
                }
                if ($(this).data('more-thumbs')) {
                    renderMoreThumbs(this);
                }
                next();
            });
            return false;
        }
    };

    CollectedBy.renderMini = function (container, collectors, n, showMore) {
        if (!n) n = 8;
        var hash = {
                reviews: [],
                no_reviews: collectors.slice(0, n),
                show_more_collectors: true,
                from_parm: window.TralbumFans ? 'fanthanks' : 'alsocollect'
            };
        $(container)
            .slideUp(100)
            .queue(function (next) {
                $(this).renderLiquid('fan/collection_grid/also_collected_by_deets', hash);
                $(this).find('a.show-more').on('click',showMore);
                CollectedBy.initTooltips(this);
                next();
            })
            .slideDown(100);
    };

    CollectedBy.renderNano = function (container, collectors, n, from_parm, target_blank) {
        var hash = {
            collectors: !n ? collectors : collectors.slice(0, n),
            from_parm: from_parm,
            target_blank: target_blank
        };
        $(container).renderLiquid('fan/collection_grid/also_collected_by_nano', hash);
    };

})();
;
/* ------------- BEGIN tpl_fan_tralbum --------------- */;
if (Templ) { Templ.register({
"fan/band_follow" : [{"blocks":[{"attachment":["\n<button type=\"button\" class=\"follow-unfollow subscribed compound-button\">\n    <div>Subscribed!</div>\n</button>\n"],"expression":"is_subscribed ","type":"ncondition"},{"attachment":["\n<button id=\"follow-unfollow\" type=\"button\" class=\"follow-unfollow",{"blocks":[{"attachment":[" following"],"expression":"is_following ","type":"ncondition"}],"type":"ef"}," compound-button\">\n    <div>",{"blocks":[{"attachment":["Follow"],"expression":"!is_following ","type":"ncondition"},{"attachment":["Following"],"type":"else_ncondition"}],"type":"ef"},"</div>\n</button>\n"],"type":"else_ncondition"}],"type":"ef"},"\n"],
"fan/band_first_follow_dialog" : ["<div class=\"band-first-follow-message\">\n\n",{"blocks":[{"attachment":["\n\t<div class=\"band-first-follow-image\">\n\t\t<img class=\"band-image\" alt=\"Band Profile Image\" title=\"",{"filters":[["a",[]]],"name":"band_name","type":"variable"},"\" ",{"filters":[["image",["41"]]],"name":"band_image_id","type":"variable"}," />\n\t</div>\n"],"expression":"(band_image_id) ","type":"ncondition"}],"type":"ef"},"\n\n    You’re now following ",{"filters":[["h",[]]],"name":"band_name","type":"variable"},", which means you’ll get an update in\n    your music feed whenever they release new music, and <span class=\"fan-email\">",{"filters":[["h",[]]],"name":"fan_email","type":"variable"},"</span> has\n    been added to their mailing list.<br/><br/>\n\n    You can undo this action by ",{"blocks":[{"attachment":["tapping"],"expression":"is_mobile ","type":"ncondition"},{"attachment":["clicking"],"type":"else_ncondition"}],"type":"ef"}," the Follow button again.\n\n</div>"],
"limits/band_play_limits_dialog" : ["<div class=\"play-limits-dialog\">\n    <div class=\"play-limits-dialog-header\">\n\n    ",{"blocks":[{"attachment":["\n        <div id=\"play-limits-dialog-fan-img\" style=\"background-image:url(",{"filters":[["image_url",["'fan_bio_thumb'"]]],"name":"fan_image_id","type":"variable"},");\"></div>\n    "],"expression":"fan_image_id && (band_image_id  || tralbum_art_id) ","type":"ncondition"}],"type":"ef"},"\n\n        <div class=\"play-limits-dialog-heart\">\n            <img id=\"play-limits-dialog-heart-img\" src=\"",{"filters":[],"name":"static_siteroot","type":"variable"},"/img/heartbreak",{"blocks":[{"attachment":["@2x"],"expression":"is_mobile ","type":"ncondition"}],"type":"ef"},".png\" />\n        </div>\n\n    ",{"blocks":[{"attachment":["\n        <div id=\"play-limits-dialog-band-img\" style=\"background-image:url(",{"blocks":[{"attachment":[{"filters":[["image_url",["'fan_bio_thumb'"]]],"name":"band_image_id","type":"variable"}],"expression":"band_image_id ","type":"ncondition"},{"attachment":[{"filters":[["art_url",["'art_thumb'"]]],"name":"tralbum_art_id","type":"variable"}],"type":"else_ncondition"}],"type":"ef"},");\"></div>\n    "],"expression":"fan_image_id && (band_image_id  || tralbum_art_id) ","type":"ncondition"}],"type":"ef"},"\n\n    </div>\n    <h2>The time has come to open thy heart/wallet.</h2>\n    <div class=\"play-limits-dialog-perks",{"blocks":[{"attachment":[" no-pkg-art"],"expression":"is_mobile || !tralbum_art_id ","type":"ncondition"}],"type":"ef"},"\">\n    \n    ",{"blocks":[{"attachment":["\n        <div class=\"play-limits-dialog-pkg-art\">\n            <img class=\"pkg-image\" alt=\"",{"filters":[["a",[]]],"name":"tralbum_title","type":"variable"},"\" title=\"",{"filters":[["a",[]]],"name":"tralbum_title","type":"variable"},"\" ",{"filters":[["art",["'art_thumb'"]]],"name":"tralbum_art_id","type":"variable"}," />\n        </div>\n    "],"expression":"!is_mobile && tralbum_art_id ","type":"ncondition"}],"type":"ef"},"\n\n        <div class=\"play-limits-dialog-bullets\">\n            <span class=\"play-limits-dialog-bullets-title\">Buy this ",{"filters":[["a",[]]],"name":"purchase_type","type":"variable"}," to:</span>\n            <ul>\n                <li><span>directly support <span class=\"band-name\">",{"filters":[["a",[]]],"name":"band_name","type":"variable"},"</span></span></li>\n                <li><span>get unlimited streaming</span></li>\n                <li><span>get a high-quality download</span></li>\n            </ul>\n        </div>\n    </div>\n\n    <div class=\"play-limits-dialog-button-pane\">\n        <button id=\"play-limits-dialog-buy-btn\">Purchase info</button>\n        <button id=\"play-limits-dialog-cancel-btn\" class=\"weak\">No thanks</button>\n    </div>\n\n    ",{"blocks":[{"attachment":["\n        <div class=\"play-limits-dialog-footer\">\n            <span>Already own this? <a href=\"",{"filters":[["h",[]]],"name":"siteroot_https","type":"variable"},"/login?from=ltnlgn\">Log in</a> to your fan account or <a href=\"",{"filters":[["h",[]]],"name":"siteroot_https","type":"variable"},"/fans?from=ltnlrn\">learn more</a>.</span>\n        </div>\n    "],"expression":"!logged_in ","type":"ncondition"}],"type":"ef"},"\n</div>\n"],
"tralbum_common/share_collect_controls" : ["<div class=\"share-collect-controls\">\n<ul>\n    <li class=\"share-embed\">\n\t\t<span class=\"bc-ui2 share-embed-icon\"></span>\n\t\t<span class=\"share-embed-label\"><button type=\"button\">Share / Embed</button></span>\n    </li>\n    \n</ul>    \n</div>\n"],
"tralbum_common/share_embed_panel" : ["<div class=\"share-embed-container\">\n  <div class=\"share-embed-container-indicator\"></div>\n  <div class=\"share-embed-container-inner\">\n\n    <div class=\"close round3\"><span class=\"bc-ui\">x</span></div>\n\n\n    \n    ",{"blocks":[{"attachment":["\n      ",{"nodelist":["omg best ",{"blocks":[{"attachment":["track"],"expression":"is_track ","type":"ncondition"},{"attachment":["album"],"type":"else_ncondition"}],"type":"ef"}," ever",{"blocks":[{"attachment":[" (@",{"filters":[["a",[]]],"name":"twitter_username","type":"variable"},")"],"expression":"twitter_username ","type":"ncondition"}],"type":"ef"},": "],"to":"tweet_text","type":"capture"},"\n      \n      ",{"nodelist":[{"blocks":[{"attachment":["Listen/download"],"expression":"download_pref == 1 ","type":"ncondition"},{"attachment":["Listen/purchase"],"expression":"download_pref == 2 ","type":"ncondition"},{"attachment":["Listen to"],"type":"else_ncondition"}],"type":"ef"},": <a href=\"",{"filters":[["a",[]]],"name":"linkback","type":"variable"},"\">",{"filters":[["h",[]]],"name":"title","type":"variable"}," by ",{"filters":[["h",[]]],"name":"artist","type":"variable"},"</a>"],"to":"tumblr_caption_html","type":"capture"},"\n    <div class=\"share-buttons panel-section first\">\n      <ul class=\"share-buttons-list social-controls\" data-url=\"",{"filters":[["a",[]]],"name":"linkback","type":"variable"},"\">\n        <li class=\"facebook-like-ctrl\" data-stat=\"like_button\" data-stat-off=\"dislike_button\"></li>\n        <li class=\"twitter-ctrl btn\" data-text=\"",{"filters":[["a",[]]],"name":"tweet_text","type":"variable"},"\" data-stat=\"tweet_button\"></li>\n        <li class=\"tumblr-ctrl btn\" data-type=\"audio\" data-text=\"",{"filters":[["a",[]]],"name":"tumblr_caption_html","type":"variable"},"\" data-stat=\"tumblr_button\"></li>\n        <li class=\"gplus-ctrl\" data-stat=\"gp_plusone\" data-stat-off=\"gp_minusone\"></li>\n      </ul>\n    </div>\n    "],"expression":"enable_social_buttons ","type":"ncondition"}],"type":"ef"},"\n\n\n    \n    <div class=\"embed-other-services panel-section ",{"blocks":[{"attachment":["first"],"expression":"!enable_social_buttons ","type":"ncondition"}],"type":"ef"},"\">\n      <a>Embed this ",{"blocks":[{"attachment":["track"],"expression":"is_track ","type":"ncondition"},{"attachment":["album"],"type":"else_ncondition"}],"type":"ef"},"<div class=\"icons\"><div class=\"small bc-ui2\">small</div><div class=\"medium bc-ui2\">medium</div><div class=\"large bc-ui2\">large</div></div></a>\n    </div>\n\n    \n    \n    <div class=\"email-im-link panel-section\">\n      <dl>\n        \n        <dt>Email</dt>\n        <dd><input type=\"text\" value=\"",{"filters":[["a",[]]],"name":"linkback","type":"variable"},"\" name=\"email-im-link\" class=\"email-im-link-text\"></dd>\n      </dl>\n    </div>\n\n  </div>\n</div>\n"],
"tralbum_common/tralbum_collect_controls" : ["<li id=\"collect-item\" class=\"",{"blocks":[{"attachment":["wishlist"],"expression":"!is_collected || is_private_fan ","type":"ncondition"},{"attachment":["purchased"],"expression":"is_purchased == true ","type":"ncondition"},{"attachment":["wishlisted"],"type":"else_ncondition"}],"type":"ef"},"\">\n    <span id=\"wishlist-msg\" class=\"action compound-button\" title=\"Add this ",{"blocks":[{"attachment":["album"],"expression":"collect_item_type == 'album' ","type":"ncondition"},{"attachment":["track"],"type":"else_ncondition"}],"type":"ef"}," to your wishlist\">\n        <span class=\"bc-ui2 collect-item-icon\"></span>\n        <span class=\"collect-msg\">\n            <span><a>Wishlist</a></span>\n        </span>\n    </span>\n    \n    <span id=\"wishlisted-msg\" class=\"compound-button\">\n        <span class=\"action\" title=\"Remove this ",{"blocks":[{"attachment":["album"],"expression":"collect_item_type == 'album' ","type":"ncondition"},{"attachment":["track"],"type":"else_ncondition"}],"type":"ef"}," from your wishlist\">\n            <span class=\"bc-ui2 collect-item-icon\"></span>\n            <span class=\"collect-msg\">\n                <span><a>In Wishlist</a></span>\n            </span>\n        </span>\n        <a target=\"_blank\" class=\"view\" href=\"",{"filters":[["a",[]]],"name":"fan_trackpipe_url","type":"variable"},"#wishlist\">view</a>\n    </span>\n    \n    <span id=\"purchased-msg\" class=\"collect-msg compound-button\">\n        <span class=\"bc-ui2 collect-item-icon\"></span>\n        <span><a target=\"_blank\" href=\"",{"filters":[["a",[]]],"name":"fan_trackpipe_url","type":"variable"},"\">You own this</a></span>\n    </span>\n</li>\n<div id=\"wishlist-alert\">\n    Unable to save changes to your wishlist.\n</div>\n"],
"fan/collection_grid/also_collected_by_deets" : [{"blocks":[{"attachment":["\n    ",{"expression":"6 ","type":"let","variable":"max_reviews"},"\n    ",{"blocks":[{"attachment":["\n         ",{"expression":"3 ","type":"let","variable":"max_reviews"},"\n    "],"expression":"reviews.length > max_reviews ","type":"ncondition"}],"type":"ef"},"\n"],"expression":"!max_reviews ","type":"ncondition"}],"type":"ef"},"\n",{"expression":"0 ","type":"let","variable":"num_reviews_shown"},"\n\n",{"blocks":[{"attachment":["\n    ",{"expression":"80 ","type":"let","variable":"max_thumbs"},"\n    ",{"blocks":[{"attachment":["\n         ",{"expression":"50 ","type":"let","variable":"max_thumbs"},"\n    "],"expression":"no_reviews.length > max_thumbs ","type":"ncondition"}],"type":"ef"},"\n"],"expression":"!max_thumbs ","type":"ncondition"}],"type":"ef"},"\n",{"expression":"0 ","type":"let","variable":"num_thumbs_shown"},"\n\n",{"attribs":{"limit":"max_reviews"},"collection_name":"reviews","nodelist":["\n    ",{"expression":"forloop.index ","type":"let","variable":"loop_index"},"\n    ",{"template_name":"'fan/collection_grid/also_collected_by_review_innards'","type":"include"},"\n    ",{"expression":"num_reviews_shown + 1 ","type":"let","variable":"num_reviews_shown"},"\n"],"reversed":null,"type":"for","variable_name":"review"},"\n\n",{"blocks":[{"attachment":["\n    <a class=\"more-writing\">more...</a>\n"],"expression":"reviews.length > max_reviews && !single_toggle ","type":"ncondition"}],"type":"ef"},"\n\n<div class=\"no-writing\">\n",{"attribs":{"limit":"max_thumbs"},"collection_name":"no_reviews","nodelist":["\n    ",{"expression":"forloop.index ","type":"let","variable":"loop_index"},"\n    ",{"template_name":"'fan/collection_grid/also_collected_by_no_review_innards'","type":"include"},"\n    ",{"expression":"num_thumbs_shown + 1 ","type":"let","variable":"num_thumbs_shown"},"\n"],"reversed":null,"type":"for","variable_name":"fan"},"\n\n",{"expression":"reviews.length + no_reviews.length ","type":"let","variable":"num_total"},"\n",{"expression":"num_reviews_shown + num_thumbs_shown ","type":"let","variable":"num_shown"},"\n",{"blocks":[{"attachment":["\n<a class=\"more-everything\" \n   data-more-reviews=\"",{"blocks":[{"attachment":["true"],"expression":"num_reviews_shown < reviews.length ","type":"ncondition"},{"attachment":["false"],"type":"else_ncondition"}],"type":"ef"},"\" \n   data-more-thumbs=\"",{"blocks":[{"attachment":["true"],"expression":"num_thumbs_shown < no_reviews.length ","type":"ncondition"},{"attachment":["false"],"type":"else_ncondition"}],"type":"ef"},"\">\n\tand ",{"filters":[["h",[]]],"name":"num_total - num_shown","type":"variable"}," ",{"filters":[["plural",["'other'"]]],"name":"num_total - num_shown","type":"variable"},"\n</a>\n"],"expression":"single_toggle && num_shown < num_total ","type":"ncondition"},{"attachment":["\n<a class=\"ellipsis show-more\">\n    <div class=\"ellipsis-bg\"></div>\n    <div class=\"ellipsis-text\">&hellip;</div>\n</a>\n"],"expression":"show_more_collectors ","type":"ncondition"},{"attachment":["\n<a class=\"more-thumbs\">more...</a>\n"],"expression":"no_reviews.length > max_thumbs ","type":"ncondition"}],"type":"ef"},"\n\n</div>\n"],
"fan/collection_grid/also_collected_by_review_innards" : ["<div class=\"writing\">\n    <a class=\"pic\" href=\"",{"filters":[["fan_page_url",[]],["a",[]]],"name":"review.username","type":"variable"},"?from=",{"filters":[["a",[]]],"name":"from_parm","type":"variable"},"\">\n        ",{"blocks":[{"attachment":["\n        <div class=\"tooltip\">\n            <div class=\"round3\">\n                <img class=\"grid lazy\" src=\"/img/0.gif\" data-original=\"",{"filters":[["image_url",["50"]]],"name":"review.image_id","type":"variable"},"\" style=\"display: inline-block;\"/>\n                <div class=\"name\">",{"filters":[["h",[]]],"name":"review.name","type":"variable"},"</div>\n            </div>\n        </div>\n        "],"expression":"show_tooltips ","type":"ncondition"}],"type":"ef"},"\n        ",{"blocks":[{"attachment":["\n        <img class=\"thumb lazy\" src=\"/img/0.gif\" data-original=\"",{"filters":[["image_url",["42"]]],"name":"review.image_id","type":"variable"},"\" style=\"display: inline-block\" alt=\"",{"filters":[["a",[]]],"name":"review.name","type":"variable"}," thumbnail\">\n        "],"expression":"loop_index > 20 ","type":"ncondition"},{"attachment":["\n        <img class=\"thumb\" src=\"",{"filters":[["image_url",["42"]]],"name":"review.image_id","type":"variable"},"\" alt=\"",{"filters":[["a",[]]],"name":"review.name","type":"variable"}," thumbnail\"/>\n        "],"type":"else_ncondition"}],"type":"ef"},"\n    </a>\n    <div class=\"text\">\n        ",{"blocks":[{"attachment":["\n            <a class=\"censor round3\"\n                data-fan-id=\"",{"filters":[["a",[]]],"name":"review.fan_id","type":"variable"},"\"\n                data-item-type=\"",{"filters":[["a",[]]],"name":"review.item_type","type":"variable"},"\"\n                data-item-id=\"",{"filters":[["a",[]]],"name":"review.item_id","type":"variable"},"\"\n                data-fan-name=\"",{"filters":[["a",[]]],"name":"review.name","type":"variable"},"\"\n            >\n                X\n            </a>\n        "],"expression":"member_of_current_band ","type":"ncondition"}],"type":"ef"},"\n        <a class=\"name notSkinnable\" href=\"",{"filters":[["fan_page_url",[]],["a",[]]],"name":"review.username","type":"variable"},"?from=",{"filters":[["a",[]]],"name":"from_parm","type":"variable"},"\">",{"filters":[["h",[]]],"name":"review.name","type":"variable"},"</a>\n        ",{"filters":[["html_autolink",["'target=\"_blank\"'"]],["newline_to_gap",[]]],"name":"review.why","type":"variable"},"\n        ",{"blocks":[{"attachment":["\n            <span class=\"fav-track\">Favorite track: ",{"filters":[["h",[]]],"name":"review.fav_track_title","type":"variable"},".</span>\n        "],"expression":"review.fav_track_title ","type":"ncondition"}],"type":"ef"},"\n    </div>\n</div>\n"],
"fan/collection_grid/also_collected_by_no_review_innards" : ["<a class=\"fan pic",{"blocks":[{"attachment":[" just"],"expression":"fan.why ","type":"ncondition"}],"type":"ef"},"\" href=\"",{"filters":[["fan_page_url",[]],["a",[]]],"name":"fan.username","type":"variable"},"?from=",{"filters":[["a",[]]],"name":"from_parm","type":"variable"},"\">\n    ",{"blocks":[{"attachment":["\n    <div class=\"tooltip\">\n        <div class=\"round3\">\n        \t<img class=\"grid lazy\" src=\"/img/0.gif\" data-original=\"",{"filters":[["image_url",["50"]]],"name":"fan.image_id","type":"variable"},"\" style=\"display: inline-block;\"/>\n            <div class=\"name\">",{"filters":[["h",[]]],"name":"fan.name","type":"variable"},"</div>\n            ",{"blocks":[{"attachment":["\n            <div class=\"writing\">\n                &ldquo;",{"filters":[],"name":"fan.why","type":"variable"},"&rdquo;\n            </div>\n            "],"expression":"fan.why ","type":"ncondition"}],"type":"ef"},"\n        </div>\n    </div>\n    "],"expression":"show_tooltips ","type":"ncondition"}],"type":"ef"},"\n    ",{"blocks":[{"attachment":["\n    <div class=\"just-icon-bg\"></div>\n    <div class=\"just-icon\">&ldquo;</div>\n    "],"expression":"fan.why ","type":"ncondition"}],"type":"ef"},"\n    ",{"blocks":[{"attachment":["\n    <img class=\"thumb lazy\" src=\"/img/0.gif\" data-original=\"",{"filters":[["image_url",["42"]]],"name":"fan.image_id","type":"variable"},"\" style=\"display: inline-block\" alt=\"",{"filters":[["a",[]]],"name":"fan.name","type":"variable"}," thumbnail\">\n    "],"expression":"loop_index > max_thumbs ","type":"ncondition"},{"attachment":["\n    <img class=\"thumb\" src=\"",{"filters":[["image_url",["42"]]],"name":"fan.image_id","type":"variable"},"\" alt=\"",{"filters":[["a",[]]],"name":"fan.name","type":"variable"}," thumbnail\"/>\n    "],"type":"else_ncondition"}],"type":"ef"},"\n</a>\n"]
}); };
/* ------------- BEGIN tpl_share_tralbum_phone --------------- */;
if (Templ) { Templ.register({
"_share_tralbum_phone" : [{"nodelist":["omg best ",{"blocks":[{"attachment":["track"],"expression":"is_track ","type":"ncondition"},{"attachment":["album"],"type":"else_ncondition"}],"type":"ef"}," ever: "],"to":"tweet_text","type":"capture"},"\n",{"nodelist":[{"filters":[],"name":"title","type":"variable"}," by ",{"filters":[],"name":"artist","type":"variable"},":"],"to":"email_text","type":"capture"},"\n<ul class=\"share-dialog social-controls\" data-url=\"",{"filters":[["a",[]]],"name":"linkback","type":"variable"},"\">\n    <li class=\"facebook-share-ctrl\" data-stat=\"facebook_mobile\">\n        <a class=\"facebook-link compound-button\">Facebook</a>\n    </li>\n    <li class=\"twitter-ctrl\" data-text=\"",{"filters":[["a",[]]],"name":"tweet_text","type":"variable"},"\" data-stat=\"twitter_mobile\">\n        <a class=\"twitter-link compound-button\">Twitter</a>\n    </li>\n    <li class=\"email-ctrl\" data-text=\"",{"filters":[["a",[]]],"name":"email_text","type":"variable"},"\" data-stat=\"email_mobile\">\n        <a class=\"email-link compound-button\">Email</a>\n    </li>\n</ul>\n"]
}); };
/* ------------- BEGIN video_element_wrapper.js --------------- */;
    // Currently only used on iPad to make up for the fact that the <video> element
    // takes a long time to load posters and has no useful "loading" state:
    //
    // VideoElementWrapper appends several elements immediately after a <video> element
    // in the DOM: a poster <img>, a play button <div>, and a loading indicator <div>.
    // These have the classes 'wrapped-video-poster', 'wrapped-video-play', and 'wrapped-video-loading'
    // respectively.  It then hooks up event handlers to the <video> element and tracks
    // the state of the video playback, adding a class on the <video> element's parent
    // indicating what state the video is in.  The parent classes are:
    //    state-init, state-ready, state-playing, state-loading, state-error
    // CSS rules should also be provided that hides and shows the wrapped-video-* elements
    // as per current state.
    //
    // VideoElementWrapper also provides one method, setPoster, which takes a poster URL
    // and updates the poster <img>.
    
var VideoElementWrapper = function () {
    function VideoElementWrapper(elem) {
        this.element = elem;
        this.state = "init";

        var eventnames = [
            "abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "stalled", "suspend", "waiting"
        ];

        var self = this;
        function eventhandler(name) {
            return function() { self.handleEvent(name); };
        }
        for(var i=0; i<eventnames.length; i++) {
            this.element.addEventListener(eventnames[i], eventhandler(eventnames[i]));
        }

        this.$blackout = $('<div class="wrapped-video-blackout">');
        this.$poster = $('<img class="wrapped-video-poster">');
        this.$play = $('<div class="wrapped-video-play video-play-button">');
        this.$loading = $('<div class="wrapped-video-loading video-loading-indicator">');
        $(elem).after(this.$blackout, this.$poster, this.$play, this.$loading);
        this.changeState("loading");

        this.$poster.add(this.$play).click(function() {
            elem.play();
        });

        var posterUrl = $(elem).attr("poster");
        if(posterUrl) {
            this.setPoster(posterUrl);
            this.changeState("ready");
        }

        // the wrapper has five different UI states, all
        // driven directly by various events from the video element
        this._stateTransitions = {
        //  STATE       EVENT        NEW STATE
            "init" : { 
                        "canplay"   : "ready",
                        "playing"   : "playing",
                        "ended"     : "ready",
                        "error"     : "error",
                        "progress"  : "ready"
            },
            "error" : {
                        "abort"     : "init",
                        "emptied"   : "init",
                        "suspend"   : "init"
            },
            "ready" : {
                        "play"      : "loading",
                        "playing"   : "playing",
                        "emptied"   : "loading"
            },
            "playing" : {
                        "emptied"   : "loading",
                        "ended"     : "ended",
                        "waiting"   : "loading",
                        "error"     : "error"
            },
            "ended" : {
                        "play"      : "loading",
                        "playing"   : "playing",
                        "emptied"   : "loading"
            },
            // split loading state transitions into
            // two, based on whether the video element
            // is actually trying to play or not.  The
            // difference is that when not playing, we
            // go to "ready" state if we get a "suspend"
            // event, because that's the last thing that's
            // going to happen.  Otherwise, go ahead and
            // wait for the "playing" event and go right
            // to "playing" state.
            "loading-playing" : {
                        "abort"     : "init",
                        "playing"   : "playing",
                        "ended"     : "ready",
                        "error"     : "error"
            },
            "loading-notplaying" : {
                        "abort"     : "init",
                        "canplay"   : "ready",
                        "suspend"   : "ready",
                        "ended"     : "ready",
                        "error"     : "error"
            }
        }
    }
    VideoElementWrapper.prototype.changeState = function(state) {
        if(state && (this.state != state)) {
            $(this.element).parent().removeClass("state-" + this.state);
            Log.debug("new state: " + state);
            this.state = state;
            $(this.element).parent().addClass("state-" + this.state);
        }
    }
    VideoElementWrapper.prototype.handleEvent = function(eventName) {
        var currentState = this.state;
        if(currentState == "loading") {
            if ( this.element.paused ) {
                currentState = "loading-notplaying";
            } else {
                currentState = "loading-playing";
            }
        }
        Log.debug("videoevent: " + eventName + " in " + currentState);
        var transitionMap = this._stateTransitions[currentState];
        this.changeState(transitionMap && transitionMap[eventName]);
    }
    VideoElementWrapper.prototype.setPoster = function(url) {
        this.$poster.attr("src", url);
    }

    return VideoElementWrapper;
}();





;
/* ------------- BEGIN video.js --------------- */;
/* global BandData, TralbumData, siteroot_current, MediaView */
/* exported VideoPlayer, TralbumPageVideoPlayer, tracklistVideoPlayer */

// This library dynamically renders a video player. Intended use is for situations in which you will want to repurpose the same 
// player with different clips, as in the case of our tralbum pages. For more static situations that can be rendered on the server, 
// check out video.liquid or the featured video case in tralbum_video.liquid.
//
// This library assumes you will use markup following this structure for desktop. (Mobile is diffferent. TODO: DOCUMENT MOBILE)                              
//  <div class={{root_class_name}}>   
//      <iframe class="video-generic-iframe"></iframe>
//  </div>
// 
// <p class="{{root_class_name}}-caption"></p>            
// 
// In bc video-related js and css, the term 'generic' refers to a scheme in which an iframe defined by the client points its src attribute
// to a url at the video service provider. The video service provider responds with their own html5 player. This is what bandcamp/23 does, 
// as does vimeo. (youtube does not). 
//
// One important note: at bc, and ifram within an iframe - this lets us do referer checks and still support custom domains. 


(function (window, $) {
    "use strict";

    // See below for an explanation of these parameters
    function VideoPlayer(trackinfo, genericContainerSelector, properties){
        this.init(trackinfo, genericContainerSelector, properties);
    }
    window.VideoPlayer = VideoPlayer;

    $.extend( VideoPlayer.prototype , {

        /* apiReady: false, */

        videoId                     :  null,
        sourceType                  :  null,
        prev_sourceType             :  null,
        properties                  :  null,

        genericContainerSelector      :  null,
        genericIFrameElem             :  null,
        genericPlayer                 :  null,


        captionText                 :  null,

        trackinfo                   :  null,
        musicPlaylist               :  null,
        currOnTrackPlayed           :  null,

        state                       : null,

        postAnimateFn               : null,
        featuredId                  : null,


        //VideoPlayer.init 
        //  Inits an instance of video player, given the html noted above. 
        //
        // Parameters
        //  - trackinfo                - the standard tralbum trackinfo list, if you want this object to follow the tracklist
        //  - genericContainerSelector - a jquery friendly selector for div around the iframe that the player gets rendered in. For example, for the html 
        //                               rendered in a column classed as "middle-column", you'd pass in something like ".middle-column .generic-player-wrapper"
        //  - properties               - a js object formatted:
        //                               { /* height: x, width: y, */ root_class_name: {{root_class_name}}, noAnimation, parallelElem, guideElem }
        //
        //     root class name :         in addition to being the selector to the wrapper that will contain the video player, the root class name is  
        //                               prefix used to create the following classes:
        //
        //                               <yourclassname>-viz:      used to decorate the player iframe so client css can hide or show it. (Usually hidden to begin with).
        //                               <yourclassname>-hidden:   ditto - note: for both of these, you will need to define css rules accordingly
        //     
        //                               /* TODO remove if not used 
        //                               <yourclassname>-active:   applied the <BDDY> element, so you can define styles which move the right hand
        //                                  column, or any other element that doesn't automatically get repositioned by hiding
        //                                  and unhiding the player, as needed. It means "the video player is active."
        //                                 */
        //
        //     noAnimation:              don't animate when showing. Just show.
        //
        //     parallelElem,             The former, parallelElem, is a selector for an element outside the DOM of the video player, which you want to move the
        //     guideElem                 same amount that everything under the video player moves, when the video player is shown or hiddden, as measured by the
        //                               the before-and-after y offset of the guideElem. Put another way, parallelElem's position is pushed downward (or upward) 
        //                               the same amount that guideElem has to move in response to the showing or hiding of the video player. One quirk: the vertical
        //                               displacement of the parallelElem is accomplished by adding to (or taking from) its padding-top css attribute.

        init: function(trackinfo, genericContainerSelector, properties ) {
            if ( this.isPhone() )
                return;

            var hasGeneric = false;

            if ( trackinfo ) {
                this.trackinfo = trackinfo; 
                for ( var i = 0; i < trackinfo.length && (!hasGeneric); i++ ) {
                    if( trackinfo[i].video_source_type == "t"  ) {
                        hasGeneric = true;
                    }
                }
            }

            if ( genericContainerSelector )
                this.genericContainerSelector = genericContainerSelector;

            this.properties = properties || {};

            if ( !this.properties.root_class_name ) {
                this.properties.root_class_name = "video-player";
            }

            if ( !this.properties.siteroot ) {
                this.properties.siteroot = siteroot_current;
            }

            if ( this.properties.guideElem && this.properties.parallelElem ) {
                var self = this;
                var originalPadding =  $(self.properties.parallelElem).css("padding-top");

                var postAnimateFn = function( doExpand ) {
                    if ( doExpand ) {
                        $(self.properties.parallelElem).css("padding-top", "" + ($(self.properties.guideElem).offset().top - $(self.properties.parallelElem).offset().top) + "px");
                    } else {
                        $(self.properties.parallelElem).css("padding-top", originalPadding);
                    }
                };

                this.postAnimateFn = postAnimateFn;
            }

            if (this.properties.featuredSelector) {
                var featuredId = $(this.properties.featuredSelector).attr("data-id");
                if (featuredId) {
                    this.featuredId = featuredId;
                }
            }

            $(this.genericContainerSelector + " video.native-video-player").on("ended", function() {
                // when video ended, set its pos back to 0
                this.currentTime = 0;
            });
        },

        doVideo: function( sourceType, videoId, caption, autoplay, autoscroll ) {
            if (this.isPhone())
                return;

            // don't play the featured track's video in the tracklist video player. It will 
            // already be present on the page. Just a simple scroll to position
            if ( this.trackinfo && this.featuredId == videoId ) {

                
                this.justHide();
                this.state = null;
                
                if ( autoscroll ) {
                    $('html, body').animate({
                        scrollTop: ($(".featured-video-wrapper").offset().top - 20)
                        }, 500);
    
                    var iframe = $(".featured-video-wrapper iframe")[0];
                    var video = $(".featured-video-wrapper video.native-video-player")[0];
                    if (iframe) {
                        Log.debug("posting play message to featured iframe");
                        iframe.contentWindow.postMessage("play", "*");    
                    }
                    if ( video ) {
                        if ( !VideoPlayer.featuredWrapper ) {
                            VideoPlayer.featuredWrapper = new VideoElementWrapper(video);
                        }
                        video.load();
                        video.play();
                    }
                }
                
                return;
            }

            if ( this.state == 'open' && this.sourceType == sourceType && this.videoId == videoId ) {
                this.justHide();
                this.state = null;
                return;   
            }
            this.state = 'open';

            this.preLoad( sourceType );
            
            this.sourceType = sourceType;
            this.videoId = videoId;
            this.captionText = caption;

            if (sourceType == "t") {
                this.do23( videoId, autoplay, autoscroll );
            }
        },

        _loadVideo : function(frameElem, videoElem, videoId, playIt) {
            if ( frameElem ) {
                var message = playIt ? "startvideo" : "loadvideo";
                var msg = { message: message, id: videoId, from: (this.musicPlaylist ? "a" : "t") };
                Log.debug("posting message to videoframe: " + JSON.stringify(msg));
                frameElem.contentWindow.postMessage(msg, "*");
            } else if ( videoElem ) {
                if ( !VideoPlayer.wrapper ) {
                    VideoPlayer.wrapper = new VideoElementWrapper(videoElem);
                }
                // if using <video> element, need to look up the URL in the trackinfo
                // with the corresponding videoId
                var attrs = null;
                for ( var i = 0; i < TralbumData.trackinfo.length; i++ ) {
                    if ( TralbumData.trackinfo[i].video_id == videoId ) {
                        var video_url = TralbumData.trackinfo[i].video_mobile_url;
                        // hack alert: the video url is the "mobile" stream, which
                        // is really low-res.  We only use this code path on ipads for
                        // now, so I'm hardcoding it to use a higher-res url, but we probably
                        // need a way to make this choice dynamically depending on the device
                        // in the future
                        video_url = video_url.replace('video_mobile_high', 'video_hd');
                        attrs = {
                            src : "http://bandcamp.23video.com/" + video_url,
                            poster : "//bandcamp.23video.com/" + TralbumData.trackinfo[i].video_poster_url
                        };
                        break;
                    }
                }
                if ( attrs ) {
                    videoElem.pause(); // in case it's playing the old src
                    Log.debug("loading video with url " + attrs.src);
                    VideoPlayer.wrapper.setPoster(attrs.poster);
                    $(videoElem).attr(attrs);
                } else {
                    Log.error("do not have a video url for video id " + videoId);
                }
            }
        },

        do23: function( videoId, autoplay, autoscroll ) {

            var self = this;
            var iframeElem = $(this.genericContainerSelector + " iframe");
            var frame = iframeElem[0];  
            var videoElem = $(this.genericContainerSelector + " video.native-video-player");
            var video = videoElem[0];

            if( !frame && !video ) // phones won't have this, for instance. no need to continue.
                return;

            var newUrl = this.properties.siteroot + "/videoframe?video_id=" + videoId;
            if ( autoplay ) {
                newUrl += "&autoplay=1";
            }
            if (BandData && BandData.id) {
                 newUrl += "&band_id=" + BandData.id;
            }
            if (this.musicPlaylist) {
                newUrl += "from='a'";
            } else {
                 newUrl += "from='t'";
            }

            this.genericIFrameElem = iframeElem;

            this.postLoad("t");

            $(this.genericContainerSelector).addClass( this.properties.root_class_name+"-viz" );

            this.showCaption() ;
            var scrollPosSelector = this.genericContainerSelector;
            var transition = !( this.prev_sourceType || this.properties.noAnimation ); 

            
            if ( transition ) {
                $("#bio-container").addClass("anim-hidden");
                $(this.genericContainerSelector).slideDown( { 
                    complete:   function() {
                        if(self.state == 'open') {
                            self._loadVideo(frame, video, videoId, autoplay);
                        } else {
                            frame.contentWindow.location.replace(newUrl);
                            self._loadVideo(null, video, videoId, autoplay);
                        }
                        if ( self.postAnimateFn ){
                            self.postAnimateFn(true);
                        }

                        if( autoscroll ){ 
                            var topView = $(window).scrollTop();
                            var topElement = $(scrollPosSelector).offset().top;
                            if (topElement < topView) {
                                var scrollPos = $(scrollPosSelector).offset().top - 20 ;
                                $('html, body').animate({scrollTop: scrollPos}, 500);
                            }
                        }
                        $("#bio-container").removeClass("anim-hidden");
                        return;
                    }
                });
            } else {
                $(this.genericContainerSelector).show();
                if(self.state == 'open') {
                    self._loadVideo(frame, video, videoId, autoplay);
                } else {
                    frame.contentWindow.location.replace(newUrl);
                    self._loadVideo(null, video, videoId, autoplay);
                }
                if ( this.postAnimateFn ) {
                    this.postAnimateFn(true);
                }
                if ( autoscroll ) { 
                    var topView = $(window).scrollTop();
                    var topElement = $(scrollPosSelector).offset().top;
                    
                    if (topElement < topView) {
                        var scrollPos = $(scrollPosSelector).offset().top - 20 ;
                        $('html, body').animate({scrollTop: scrollPos}, 500); 
                    }
                }
            }

            $(this.genericContainerSelector).removeClass( this.properties.root_class_name+"-hidden" );

        },

        // depending on video type, do paritcular pre load processing here. 
        // (this would be important for youtube for example.)
        preLoad: function() {
            
            if ( this.prev_sourceType == "t" ) {
                // put any provider specific preload here.
            } 
        },

        // if there is an active player and it's of the same type as the incoming, just re-purpose it's elements. 
        // if there's an active player of a different type, just hide it (as quickly as possible - 
        // no transistion needed.)
        // NOTE: as of 7/16/2014 all players are now of one type. Still, leaving open the possibility
        // there may one day be others. 
        postLoad: function(sourceType) {
            if ( !this.prev_sourceType || (this.prev_sourceType == sourceType) ) {
                return;
            } 
            var containerSelector = this.genericContainerSelector ;
            this.justHide( containerSelector, false );
            this.state = null;
        },

        // Hide player, but store off the data so the new players of the same type can re-use. Generally you will want to hide it 
        // away (transition = false) but sometimes you will want to slide it away (transition = true).
        justHide: function( containerSelector, transition ) {

            var self = this;

            if ( !(this.sourceType && this.videoId) ) {
                return;
            }

            if ( !containerSelector ) {
                containerSelector = this.genericContainerSelector;
            }

            if ( this.captionText ) {
                var captionElem = $( "." + this.properties.root_class_name + "-caption" );
                captionElem.html("");
                captionElem.hide();
                this.captionText = null;
            }

            if ( transition ) {
                $(containerSelector).slideUp( { 
                    complete:   function() {
                                    if ( self.postAnimateFn ) {
                                        self.postAnimateFn(false);
                                    }
                    } } );
            }
            else {
                $(containerSelector).hide();
                this.postAnimateFn(false);
            }

            $(containerSelector).removeClass( this.properties.root_class_name+"-viz" );
            // the container is already hidden, but put back the -hidden class for consistency 
            // (and in case the client wants to hide the initial case).
            $(containerSelector).addClass( this.properties.root_class_name+"-hidden" );

            var iframeElem = $(containerSelector + " iframe");
            var frame = iframeElem[0];  
            var videoElem = $(containerSelector + " video.native-video-player");
            var video = videoElem[0];  

            if ( frame ) {
                Log.debug("posting stop message to player iframe");
                frame.contentWindow.postMessage("stop", "*");
            }
            if ( video ) {
                Log.debug("pausing video element");
                video.pause();
            }
        },

        _playTrackListener : function( tracknum, self ) {

            var ti = null;

            if( !self )
                self = this;
            
            /* tracknum is 0-indexed, while trackinfo[i]'s tracknum is 1-indexed */
            ++tracknum;

            for ( var i = 0; i < self.trackinfo.length; i++ ) {
                if ( self.trackinfo[i].track_num == tracknum ) {
                    ti = TralbumData.trackinfo[i];
                    break;
                }
            }

            if ( !ti || !ti.video_id ) {
                this.justHide(null, true);
                this.state = null;
                return;
            }

            Log.debug("queuing video track: " + tracknum );
            this.doVideo( ti.video_source_type, ti.video_id, ti.video_caption, false, false );
        }, 

        setPlaylistListeners : function(playlist) {
            if ( this.isPhone() )
                return;

            var self = this;

            playlist.ontrackplayed( function( tracknum ) {

                if ( tracknum == self.currOnTrackPlayed ) {
                    return;
                }

                self.currOnTrackPlayed = tracknum;

                Log.debug( "VideoPlayer: ontrackplayed: " + tracknum );
                self._playTrackListener( tracknum, self );
            });

            this.musicPlaylist = playlist;
        },

        showCaption: function() {

            var shown = false;
            var captionElem = $( "." + this.properties.root_class_name + "-caption" );
            var rootElem= $("." + this.properties.root_class_name );

            if ( this.captionText ) {
                
                captionElem.html(this.captionText);
                captionElem.show();


                if (rootElem){
                    rootElem.addClass("caption-viz");
                }

                shown = true;

            } else if ( captionElem ) {
                captionElem.hide();

                if (rootElem) {
                    rootElem.removeClass("caption-viz");
                }
            }
            return shown;
        },

        isPhone: function() {
            return ( window.MediaView && MediaView.mode == "phone" );
        },

        xxx: null
    });

    // Convenience routine especially for track and album pages. If you use the style of dynamically 
    // rendered player that the js in this module renders, you may want to write your own version of 
    // the below.  This one sets up the typical tralbum page video player - ie, the one which follows 
    // the music player's tracklist. This particular player is intended to be a singleton. 
    var TralbumPageVideoPlayer = {
        _hiddenForDialogs : [], // array of jquery collections of elements which have been hidden

        init : function( playlist, noAnimation ){
            // Video elements and dialogs do not mix on IOS.  If we are on IOS, set up
            // handlers for any dialogs being displayed which hide any visible videos and
            // then unhide them when the dialog goes away.  I've created custom events
            // bc_dialog_open and bc_dialog_close for this
            if ( window.Browser && Browser.make == "safari" && Browser.platform == "iphone" ) {
                $(document).on('bc_dialog_open', function(arg, arg2) {
                    Log.debug("hiding video for IOS while dialog is open");
                    TralbumPageVideoPlayer._hiddenForDialogs.push($("video:visible").hide());
                });
                $(document).on('bc_dialog_close', function(arg, arg2) {
                    var hid = TralbumPageVideoPlayer._hiddenForDialogs;
                    $.each(hid, function(i, $elems) {
                        Log.debug("restoring hidden video because dialog is closing");
                        $elems.show();
                    });
                    TralbumPageVideoPlayer._hiddenForDialogs = [];
                });
            }

            $("video.native-video-player").each(function() {
                if ( $(this).parents(".featured-video-wrapper")[0] ) {
                    if ( !VideoPlayer.featuredWrapper ) {
                        VideoPlayer.featuredWrapper = new VideoElementWrapper(this);
                    }
                } else {
                    if ( !VideoPlayer.wrapper ) {
                        VideoPlayer.wrapper = new VideoElementWrapper(this);
                    }
                }
            })

            if ( !window.tracklistVideoPlayer ) {
                var tracklistVideoPlayer = new VideoPlayer(  window.TralbumData.trackinfo, 
                                                                ".middleColumn .video-wrapper", 
                                                                {
                                                                    root_class_name: "video-wrapper",
                                                                    parallelElem:     "#rightColumn",
                                                                    guideElem:        "#tralbumArt", 
                                                                    noAnimation:      !!noAnimation, 
                                                                    featuredSelector: ".featured-video-wrapper"
                                                                });

                window.tracklistVideoPlayer = tracklistVideoPlayer;
            }
            if ( playlist ) {
                window.tracklistVideoPlayer.setPlaylistListeners(playlist);
            }
        }

    };
    window.TralbumPageVideoPlayer = TralbumPageVideoPlayer;

})(window, jQuery);






;
/* ------------- BEGIN crossframe.js --------------- */;
/*
    CrossFrame - mechanism for safely making function calls and event-emissions
    across a frame/window boundary without worrying too much about postMessage details.

    // HOW TO USE IT
    The constructor is: new CrossFrame(thisWindow, targetWindow, domain);

    // Example from a parent window
    var xframe = new CrossFrame(window, iframeElement, domain);  //domain = domain of child frame
    // Example from a child frame
    var xframe = new CrossFrame(window, parent, domain);         //domain = domain of parent window

    // ---- Invoking Methods ----
    // from callee side:
    xframe.handleMethod("somename", function(arg) {
            // note: the method signature is very specific here:
            // you get one arg, which must be JSON-serializable (may
            // be a hash containing arg fields, for example), and you
            // must return a promise which itself resolves to a
            // JSON-serializable object
            return a_promise;
        });

    // from the calling side
    xframe.call("somename", arg).then(function(result) { ... do something with result ...});

    // ---- Emitting Events ----
    // from receiving side:
    xframe.on("someevent", function(arg) { ...handle it... });

    // from the sending side
    xframe.emit("someevent", arg);

    // The gory details
    For method calls, it packages up a description of your method call along
    with a serial number and the JSON-serialized arg, posts that to the other window,
    and returns a promise.  The other window receives the posted message, unpacks the
    arg, invokes the corresponding handler, and when the resulting promise is resolved
    or errored, it posts a message back indicating that, at which point the original
    promise is looked up by serial number and then resolved or errored with the same
    deserialized data.  Unhandled methods (methods with no handler on the other end)
    result in the promise getting failed with "no such method".

    Events are similar except nobody cares about the results so there's no response.
    Plus events can have multiple handlers.

    Possible improvements:
    1) timeouts for waiting calls.  this would be very easy -- just setTimeout and
        reject the promise if it's still pending
    2) acknowldge in-progress method calls even before calling the remote handler,
        to indicate that the remote handler exists.  This would allow you to have a
        much shorter timeout to detect the other end of the postMessage simply not
        even being set up at all (e.g. if the frame src gets switched to a completely
        different page, or failed to load).
*/

var CrossFrame = function() {
    "use strict";
    
    function CrossFrame(thisWindow, targetWindow, domain) {
        this.serial = 1;
        this.domain = domain;
        this.deferred = [];
        this.methodHandlers = {};
        this.eventHandlers = {};

        if(domain == "*") {
            // this is not really a good idea but allow it with error spam for testing
            Log.error("warning: using * for CrossFrame domain; you should specify a specific domain");
        }
        var self = this;


        this.call = function(name, arg) {
            var msg = {
                message : "crossframe_call",
                name : name,
                arg : arg,
                serial : this.serial++
            };
            var d = $.Deferred();
            this.deferred[msg.serial] = d;
            targetWindow.postMessage(msg, this.domain);
            return d.promise();
        };
        this.emit = function(name, arg) {
            var msg = {
                message : "crossframe_emit",
                name : name,
                arg : arg
            };
            targetWindow.postMessage(msg, this.domain);
        };

        function callMethod(name, arg, serial) {
            function callFailure(err) {
                targetWindow.postMessage({
                    message: "crossframe_call_fail",
                    serial: serial,
                    error: err
                }, self.domain);
            }
            function callSuccess(result) {
                targetWindow.postMessage({
                    message: "crossframe_call_result",
                    serial: serial,
                    result: result
                }, self.domain);
            }
            var h = self.methodHandlers[name];
            if(h) {
                try {
                    h(arg).then(function(result) {
                        callSuccess(result);
                    }).fail(function(err) {
                        callFailure(err);
                    });
                } catch(e) {
                    callFailure(err);
                }
            } else {
                callFailure("no such method");
            }
        }

        function emitEvent(name, arg) {
            var handlers = self.eventHandlers[name];
            if ( !handlers ) {
                Log.debug("no handlers for " + name);
                return;
            }

            for(var i=0; i<handlers.length; i++) {
                Log.debug("calling handler for " + name + " with arg " + JSON.stringify(arg));
                try {
                    handlers[i].call(this, arg);
                } catch(e) {
                    Log.debug("caught exception in handler: " + e);
                }
            }
        }

        function popDeferred(serial) {
            var p = self.deferred[serial];
            if ( p ) {
                delete self.deferred[serial];
            } else {
                Log.debug("hmm, didn't find a promise for call " + serial);
            }
            return p;
        }
    
        function resolveCall(serial, result) {
            var p = popDeferred(serial);
            if ( p ) {
                p.resolve(result);
            } else {
                Log.debug("hmm, didn't find a promise for call " + serial);
            }
        }
        function failCall(serial, err) {
            var p = popDeferred(serial);
            if ( p ) {
                p.fail(err);
            } else {
                Log.debug("hmm, didn't find a promise for failed call " + serial);
            }
        }

        function handleMessage(data) {
            switch(data.message) {
                case "crossframe_call":
                    callMethod(data.name, data.arg, data.serial);
                    break;
                case "crossframe_emit":
                    emitEvent(data.name, data.arg);
                    break;
                case "crossframe_call_result":
                    resolveCall(data.serial, data.result);
                    break;
                case "crossframe_call_fail":
                    failCall(data.serial, data.error);
                    break;
            }
        }

        thisWindow.addEventListener('message', function(event) {
                //Log.debug("crossframe message?");
                if ( self.domain == "*" || self.domain == event.origin ) {
                    handleMessage(event.data);
                } else {
                    //Log.debug("crossframe rejecting message from origin " + event.origin + " (my domain is " + self.domain + ")");
                    //Log.debug("rejected: " + JSON.stringify(event.data));
                }
            });

        this.handlers = {};
    }

    CrossFrame.prototype.handleMethod = function(name, handler) {
        this.methodHandlers[name] = handler;
    };
    CrossFrame.prototype.on = function(name, cb) {
        var handlers = this.eventHandlers[name];
        if ( !handlers ) {
            handlers = [];
            this.eventHandlers[name] = handlers;
        }
        handlers.push(cb);
    };

    return CrossFrame;
}();

;
/* ------------- BEGIN limits.js --------------- */;
/* global NuDialog, TralbumData, BandData, FanData */
var TralbumLimits = (function () {
    "use strict";

    var is_album = false;
    var already_nagging = false;
    var nag_stat_base = null;
    
    var nagDialog = null;

    return {
        onPlayerInit: function(playlist) {
            is_album = TralbumData.item_type == "album";
            nag_stat_base = TralbumData.item_type == "album" ? "limited_tralbum_nag_ap" : "limited_tralbum_nag_tp";

            playlist.ontrackchanged(function (trackinfo) {;
                if ($.inArray(playlist.get_state(), ['PLAYING', 'BUFFERING']) < 0) {
                    return;
                }
                if (willBeCapped(trackinfo.id)) {
                    triggerNag(trackinfo.id);
                }
            });
            playlist.onscrubbedback(function (track_id) {
                Log.debug("scrubbed back for track_id " + track_id);
                if (willBeCapped(track_id)) {
                    triggerNag(track_id);
                }
            });
            playlist.ontrackcapped(triggerNag);
            playlist.oncompletedplay(function (track_id, scrubback) {
                if (!isOwned() && TralbumData.play_cap_data) {
                    // find the trackinfo that just finished playing and bump its play_count and maybe flip is_capped
                    var trackinfo = null;
                    var cap = null;
                    if (trackinfo = trackinfoForId(track_id)) {
                        trackinfo.play_count += 1;

                        $.ajax({
                            url: (Url.isCustomDomain() ? siteroot_https : '') + '/capture_play',
                            type: "post",
                            data: {track_id:track_id, phase:'complete', client_id_sig:TralbumData.client_id_sig},
                            dataType: (Url.isCustomDomain() && !$.support.cors ? "jsonp" : "json"),
                            xhrFields: Url.isCustomDomain() ? {withCredentials: true} : null  // enable CORS with cookies
                        });

                        if (isCapped(trackinfo)) {
                            trackinfo.is_capped = true;
                            playlist.cap_playback_for_track(track_id);
                        }
                    }
                }
            });
        },

        closeNag: function () {
            nagDialog.dialog('close');
        },

        updatePlayCounts: function (data) {
            if (!isOwned() && window.TralbumData.play_cap_data) {
                TralbumData.client_id_sig = data.client_id_sig;
                var counts = data.play_counts;
                for (var i=0; i<TralbumData.trackinfo.length; i++) {
                    var ti = TralbumData.trackinfo[i];
                    ti.play_count = counts[ti.id] ? counts[ti.id].play_count : 0;
                    ti.is_capped = ti.play_count >= TralbumData.play_cap_data.streaming_limit;
                }
            }
        }
    };

    function isOwned() {
        var is_it = window.FanControls && window.FanControls.is_owned;
        return is_it;
    };

    function isCapped(trackinfo) {
        if (!trackinfo) return false;
        var cap = TralbumData.play_cap_data;
        var is_capped = cap && cap.streaming_limits_enabled && !trackinfo.has_free_download ? trackinfo.play_count >= cap.streaming_limit : false;
        return is_capped;
    };

    function willBeCapped(track_id) {
        var cap = null;
        var will_be_capped = false;
        var trackinfo = trackinfoForId(track_id);
        if (trackinfo) {
            will_be_capped = (cap = TralbumData.play_cap_data) && cap.streaming_limits_enabled && !trackinfo.has_free_download && (trackinfo.play_count + 1 >= cap.streaming_limit);
        }
        return will_be_capped;
    };

    function trackinfoForId(track_id) {
        var trackinfo = null;
        for (var i=0; TralbumData.trackinfo && i < TralbumData.trackinfo.length; i++) {
            if (TralbumData.trackinfo[i].id == track_id) {
                trackinfo = TralbumData.trackinfo[i];
                break;
            }
        }
        return trackinfo;
    };

    function triggerNag(track_id) {
        if (already_nagging || $('.ui-dialog-content').dialog('isOpen') === true) {
            return;
        }

        nagDialog = NuDialog.showTemplate('limits/band_play_limits_dialog', {
            band_name: BandData.name,
            band_image_id: BandData.image_id,
            fan_name: FanData.name,
            fan_image_id: FanData.image_id,
            tralbum_title: TralbumData.current.title,
            tralbum_art_id: TralbumData.art_id,
            purchase_type: TralbumData.item_type,
            is_mobile: MediaView.mode != 'desktop',
            logged_in: FanData.logged_in
        }, {
            draggable: false,
            width: "35em",
            buttons: [],
            closeOnEscape: false,
            dialogClass: 'nu-dialog no-title'
        });

        already_nagging = true;

        $("#play-limits-dialog-buy-btn", nagDialog).click(function(ev) {
            ev.preventDefault();
            nagDialog.dialog('close');
            already_nagging = false;

            if (!is_album && !trackinfoForId(track_id).is_downloadable) {
                if (TralbumData.album_url) {
                    // stop playback before forwarding to avoid multiple dialogs
                    var comm = new Cookie.CommChannel("playlist");
                    comm.send("stop");
                    
                    var url = Url.addQueryParams(TralbumData.album_url, {action:'download', from:'ltngtpbn'});
                    window.top.location.href = url;
                } else {
                    Stats.record({kind: 'click', click: nag_stat_base + '_buy_now' + (!FanData.image_id || !BandData.image_id ? '_sans_image' : '')});
                    Log.error("Streaming limit reached but track is not purchasable");
                }
            } else {
                Stats.record({kind: 'click', click: nag_stat_base + '_buy_now' + (!FanData.image_id || !BandData.image_id ? '_sans_image' : '')});
                TralbumDownload.showPurchaseOptionsFooter = true;
                TralbumDownload.begin(ev);
            }
        });

        $("#play-limits-dialog-cancel-btn", nagDialog).click(function(){
            Stats.record({kind: 'click', click: nag_stat_base + '_no_thanks' + (!FanData.image_id || !BandData.image_id ? '_sans_image' : '')});
            if ($('.play-limits-dialog-header').length) {
                // disable buttons
                $('.play-limits-dialog-button-pane > button').unbind('click').attr('disabled','disabled');
                // slide and fade pics
                $('#play-limits-dialog-fan-img').animate({
                    left: ['-=50px', 'linear'],
                    opacity: 0.0
                }, 150);
                $('#play-limits-dialog-band-img').animate({
                    right: ['-=50px', 'linear'],
                    opacity: 0.0
                }, 150);
                // fade dialog contents
                $('.play-limits-dialog-perks, .play-limits-dialog-button-pane, .play-limits-dialog-footer').animate({
                    opacity: 0.0
                }, 250);
                $('.play-limits-dialog > h2').animate({
                    opacity: 0.25
                }, 250);
                // heartbreak
                var heart = $('#play-limits-dialog-heart-img');
                var gifsrc = $(heart).attr('src');
                if (gifsrc.indexOf('.png') > -1) {
                    gifsrc = gifsrc.replace('.png','.gif' );
                    $(heart).attr('src', gifsrc + '?g=' + Math.random()).load(function(){
                        setTimeout("TralbumLimits.closeNag();", 2100 );
                    }).error(function(){
                        nagDialog.dialog('close');
                    });
                }
            } else {
                nagDialog.dialog('close');
            }

            already_nagging = false;
        });

        Stats.record({kind: 'click', click: nag_stat_base});
    }

})();;
/* ------------- BEGIN owner_streaming.js --------------- */;
/* global TralbumData, Player */
(function (window, $, ko) {
    "use strict";
    window.OwnerStreaming = {
        init: function(streamUrls) {
            var $el = $(".inline_player");

            // for testing, use setTimeout
            // setTimeout(function() {
                Iter.each(TralbumData.trackinfo, function(trk) {
                    if (!trk.file && streamUrls[trk.id]) {
                        trk.file = streamUrls[trk.id];
                    }
                });

                if (window.Player) {
                    Player.update(TralbumData); 
                    $el.removeClass("hidden");
                }
            // }, 500);
        }
    };
})(window, jQuery, ko);
;
_jsb[_jsb.length-1].c=1;