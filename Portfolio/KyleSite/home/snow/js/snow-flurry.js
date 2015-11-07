/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-touch-teststyles-testprop-testallprops-prefixes-domprefixes
 */

;window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:v(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},p.csstransitions=function(){return E("transition")};for(var F in p)x(p,F)&&(u=F.toLowerCase(),e[u]=p[F](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e}(this,this.document);

/*
Copyright (c) 2014 Matthew Hudson - MIT License
device.js 0.1.61
*/
(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")&&!device.windowsPhone()},device.fxos=function(){return(d("(mobile;")||d("(tablet;"))&&d("; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.meego=function(){return d("meego")},device.cordova=function(){return window.cordova&&"file:"===location.protocol},device.nodeWebkit=function(){return"object"==typeof window.process},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()||device.meego()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.desktop=function(){return!device.tablet()&&!device.mobile()},device.portrait=function(){return window.innerHeight/window.innerWidth>1},device.landscape=function(){return window.innerHeight/window.innerWidth<1},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):b(device.android()?device.androidTablet()?"android tablet":"android mobile":device.blackberry()?device.blackberryTablet()?"blackberry tablet":"blackberry mobile":device.windows()?device.windowsTablet()?"windows tablet":device.windowsPhone()?"windows mobile":"desktop":device.fxos()?device.fxosTablet()?"fxos tablet":"fxos mobile":device.meego()?"meego mobile":device.nodeWebkit()?"node-webkit":"desktop"),device.cordova()&&b("cordova"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);

/*
snowFlurry JS - version 1.22
Copyright © 2015 S. William (http://www.html5andbeyond.com)
Licensed Under MIT
*/

(function($) {

    var windowSize,
        snowScreenWidth,
        flakeSize,
        flakeSpeed;

    $.fn.flake = function( options ) {

        var settings = $.extend({
			maxSize		      : 4,
			createEvery	      : 0.3,
            minSpeed          : 5,
			maxSpeed	      : 12,
			snowColor	      : "#fff",
            timeout           : 0
        }, options);

            function endSnowInterval() {
                setTimeout(function(){
                    clearInterval(snowInterval);
                        setTimeout(function(){
                            $('.single-flake').remove();
                        }, settings.maxSpeed * 1000);
                },settings.timeout * 1000);
            }

            /*****************************************************
            Arrays
            *****************************************************/

            $(window).resize(function(){

			windowSize = $(window).width() - settings.maxSize

			snowScreenWidth = [];
			for (var i = 1; i < windowSize; i++) {
			snowScreenWidth.push(i);
			}


            if (settings.maxSize < 20) {
			flakeSize = [];
			for (var i = 1; i < settings.maxSize; i++) {
			flakeSize.push(i);
			}
            }

            if (settings.minSpeed < settings.maxSpeed && settings.maxSpeed > 5) {
            flakeSpeed = [];
			for (var i = settings.minSpeed * 1000; i < settings.maxSpeed * 1000; i++) {
			flakeSpeed.push(i);
			}
            }

            });

			var snowInterval = setInterval(function() {

                function singleSnowFlake() {
                return snowScreenWidth[Math.floor(Math.random() * snowScreenWidth.length)]
                }

                function singleSnowFlakeSize() {
                return flakeSize[Math.floor(Math.random() * flakeSize.length)]
                }

                function singleSnowFlakeSpeed() {
                return flakeSpeed[Math.floor(Math.random() * flakeSpeed.length)]
                }

                var snowFlakeWidthHeight = singleSnowFlakeSize()
                var newSingleFlake = $('<div class="single-flake" data-flake-speed="'+ singleSnowFlakeSpeed() +'"></div>')

                if ($('html').hasClass('csstransitions')) {

                /*****************************************************
                Starts CSS Animation
                *****************************************************/

                $('.single-flake').addClass('snow-animate');

                    $('.snow-animate').each(function(){

                        var eachFlake = $(this)

                        if ($(this).position('top') < $(window).innerHeight() - 50 + 'px') {
                        $(this).css('top', $(this).position('top'))
                        }

                        setTimeout(function(){
                          eachFlake.remove()
                        }, eachFlake.attr('data-flake-speed'))

                    });

                /*****************************************************
                Append to Body
                *****************************************************/

                    newSingleFlake.appendTo("body")
                    newSingleFlake.css({
                        'left':singleSnowFlake(),
                        'height':snowFlakeWidthHeight,
                        'width':snowFlakeWidthHeight,
                        'border-radius':snowFlakeWidthHeight / 2,
                        'background-color':settings.snowColor,
                        'box-shadow': '0 0 2px 1px' + ' ' + settings.snowColor,
                        'transition':'top ' + newSingleFlake.attr('data-flake-speed') / 1000 + 's ease-in-out'
                    })

            } else {

                /*****************************************************
                jQuery Animate Fallback
                *****************************************************/

                newSingleFlake.removeAttr('data-flake-speed')
                newSingleFlake.appendTo("body")
                newSingleFlake.css({
                    'top':0,
                    'left':singleSnowFlake(),
                    'height':snowFlakeWidthHeight,
                    'width':snowFlakeWidthHeight,
                    'border-radius':snowFlakeWidthHeight / 2,
                    'background-color':settings.snowColor,
                    'box-shadow': '0 0 2px 1px' + ' ' + settings.snowColor
                })

                $('.single-flake').each(function(){

                    $(this).animate({
                        top: "99.5%"
                    }, singleSnowFlakeSpeed(), function() {
                    $(this).remove()
                    });

                })

            }

			},settings.createEvery * 1000)

            if (settings.timeout.length >= 0 || settings.timeout == 0) {
            } else {
                endSnowInterval();
            }

            if (device.mobile() || device.tablet() || Modernizr.touch) {
            endSnowInterval();
            } else if (device.desktop()) {
            }

        $(window).resize();

		}

}(jQuery));
