/* concatenation of: yahoo-dom-event.js, get-min.js, connection-min.js, jquery-1.7.1.min.js, jquery_utils.js, utils_boot.js, capabilities.js, media_view.js, control.js, stats.js, tp_controller.js, trackpipe.js, swfobject.js, flashproxy.js, html5sound.js, sound.js, cookie.js */
var _jsb=(_jsb||[]);_jsb.push({n:"global_head_bundle"});
/* ------------- BEGIN yahoo-dom-event.js --------------- */;
/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var b=arguments,g=null,e,c,f;for(e=0;e<b.length;e=e+1){f=(""+b[e]).split(".");g=YAHOO;for(c=(f[0]=="YAHOO")?1:0;c<f.length;c=c+1){g[f[c]]=g[f[c]]||{};g=g[f[c]];}}return g;};YAHOO.log=function(d,a,c){var b=YAHOO.widget.Logger;if(b&&b.log){return b.log(d,a,c);}else{return false;}};YAHOO.register=function(a,f,e){var k=YAHOO.env.modules,c,j,h,g,d;if(!k[a]){k[a]={versions:[],builds:[]};}c=k[a];j=e.version;h=e.build;g=YAHOO.env.listeners;c.name=a;c.version=j;c.build=h;c.versions.push(j);c.builds.push(h);c.mainClass=f;for(d=0;d<g.length;d=d+1){g[d](c);}if(f){f.VERSION=j;f.BUILD=h;}else{YAHOO.log("mainClass is undefined for module "+a,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(a){return YAHOO.env.modules[a]||null;};YAHOO.env.parseUA=function(d){var e=function(i){var j=0;return parseFloat(i.replace(/\./g,function(){return(j++==1)?"":".";}));},h=navigator,g={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:h&&h.cajaVersion,secure:false,os:null},c=d||(navigator&&navigator.userAgent),f=window&&window.location,b=f&&f.href,a;g.secure=b&&(b.toLowerCase().indexOf("https")===0);if(c){if((/windows|win32/i).test(c)){g.os="windows";}else{if((/macintosh/i).test(c)){g.os="macintosh";}else{if((/rhino/i).test(c)){g.os="rhino";}}}if((/KHTML/).test(c)){g.webkit=1;}a=c.match(/AppleWebKit\/([^\s]*)/);if(a&&a[1]){g.webkit=e(a[1]);if(/ Mobile\//.test(c)){g.mobile="Apple";a=c.match(/OS ([^\s]*)/);if(a&&a[1]){a=e(a[1].replace("_","."));}g.ios=a;g.ipad=g.ipod=g.iphone=0;a=c.match(/iPad|iPod|iPhone/);if(a&&a[0]){g[a[0].toLowerCase()]=g.ios;}}else{a=c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(a){g.mobile=a[0];}if(/webOS/.test(c)){g.mobile="WebOS";a=c.match(/webOS\/([^\s]*);/);if(a&&a[1]){g.webos=e(a[1]);}}if(/ Android/.test(c)){g.mobile="Android";a=c.match(/Android ([^\s]*);/);if(a&&a[1]){g.android=e(a[1]);}}}a=c.match(/Chrome\/([^\s]*)/);if(a&&a[1]){g.chrome=e(a[1]);}else{a=c.match(/AdobeAIR\/([^\s]*)/);if(a){g.air=a[0];}}}if(!g.webkit){a=c.match(/Opera[\s\/]([^\s]*)/);if(a&&a[1]){g.opera=e(a[1]);a=c.match(/Version\/([^\s]*)/);if(a&&a[1]){g.opera=e(a[1]);}a=c.match(/Opera Mini[^;]*/);if(a){g.mobile=a[0];}}else{a=c.match(/MSIE\s([^;]*)/);if(a&&a[1]){g.ie=e(a[1]);}else{a=c.match(/Gecko\/([^\s]*)/);if(a){g.gecko=1;a=c.match(/rv:([^\s\)]*)/);if(a&&a[1]){g.gecko=e(a[1]);}}}}}}return g;};YAHOO.env.ua=YAHOO.env.parseUA();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var b=YAHOO_config.listener,a=YAHOO.env.listeners,d=true,c;if(b){for(c=0;c<a.length;c++){if(a[c]==b){d=false;break;}}if(d){a.push(b);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var f=YAHOO.lang,a=Object.prototype,c="[object Array]",h="[object Function]",i="[object Object]",b=[],g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},d=["toString","valueOf"],e={isArray:function(j){return a.toString.apply(j)===c;},isBoolean:function(j){return typeof j==="boolean";},isFunction:function(j){return(typeof j==="function")||a.toString.apply(j)===h;},isNull:function(j){return j===null;},isNumber:function(j){return typeof j==="number"&&isFinite(j);},isObject:function(j){return(j&&(typeof j==="object"||f.isFunction(j)))||false;},isString:function(j){return typeof j==="string";},isUndefined:function(j){return typeof j==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(l,k){var j,n,m;for(j=0;j<d.length;j=j+1){n=d[j];m=k[n];if(f.isFunction(m)&&m!=a[n]){l[n]=m;}}}:function(){},escapeHTML:function(j){return j.replace(/[&<>"'\/`]/g,function(k){return g[k];});},extend:function(m,n,l){if(!n||!m){throw new Error("extend failed, please check that "+"all dependencies are included.");}var k=function(){},j;k.prototype=n.prototype;m.prototype=new k();m.prototype.constructor=m;m.superclass=n.prototype;if(n.prototype.constructor==a.constructor){n.prototype.constructor=n;}if(l){for(j in l){if(f.hasOwnProperty(l,j)){m.prototype[j]=l[j];}}f._IEEnumFix(m.prototype,l);}},augmentObject:function(n,m){if(!m||!n){throw new Error("Absorb failed, verify dependencies.");}var j=arguments,l,o,k=j[2];if(k&&k!==true){for(l=2;l<j.length;l=l+1){n[j[l]]=m[j[l]];}}else{for(o in m){if(k||!(o in n)){n[o]=m[o];}}f._IEEnumFix(n,m);}return n;},augmentProto:function(m,l){if(!l||!m){throw new Error("Augment failed, verify dependencies.");}var j=[m.prototype,l.prototype],k;for(k=2;k<arguments.length;k=k+1){j.push(arguments[k]);}f.augmentObject.apply(this,j);return m;},dump:function(j,p){var l,n,r=[],t="{...}",k="f(){...}",q=", ",m=" => ";if(!f.isObject(j)){return j+"";}else{if(j instanceof Date||("nodeType" in j&&"tagName" in j)){return j;}else{if(f.isFunction(j)){return k;}}}p=(f.isNumber(p))?p:3;if(f.isArray(j)){r.push("[");for(l=0,n=j.length;l<n;l=l+1){if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}if(r.length>1){r.pop();}r.push("]");}else{r.push("{");for(l in j){if(f.hasOwnProperty(j,l)){r.push(l+m);if(f.isObject(j[l])){r.push((p>0)?f.dump(j[l],p-1):t);}else{r.push(j[l]);}r.push(q);}}if(r.length>1){r.pop();}r.push("}");}return r.join("");},substitute:function(x,y,E,l){var D,C,B,G,t,u,F=[],p,z=x.length,A="dump",r=" ",q="{",m="}",n,w;for(;;){D=x.lastIndexOf(q,z);if(D<0){break;}C=x.indexOf(m,D);if(D+1>C){break;}p=x.substring(D+1,C);G=p;u=null;B=G.indexOf(r);if(B>-1){u=G.substring(B+1);G=G.substring(0,B);}t=y[G];if(E){t=E(G,t,u);}if(f.isObject(t)){if(f.isArray(t)){t=f.dump(t,parseInt(u,10));}else{u=u||"";n=u.indexOf(A);if(n>-1){u=u.substring(4);}w=t.toString();if(w===i||n>-1){t=f.dump(t,parseInt(u,10));}else{t=w;}}}else{if(!f.isString(t)&&!f.isNumber(t)){t="~-"+F.length+"-~";F[F.length]=p;}}x=x.substring(0,D)+t+x.substring(C+1);if(l===false){z=D-1;}}for(D=F.length-1;D>=0;D=D-1){x=x.replace(new RegExp("~-"+D+"-~"),"{"+F[D]+"}","g");}return x;},trim:function(j){try{return j.replace(/^\s+|\s+$/g,"");}catch(k){return j;
}},merge:function(){var n={},k=arguments,j=k.length,m;for(m=0;m<j;m=m+1){f.augmentObject(n,k[m],true);}return n;},later:function(t,k,u,n,p){t=t||0;k=k||{};var l=u,s=n,q,j;if(f.isString(u)){l=k[u];}if(!l){throw new TypeError("method undefined");}if(!f.isUndefined(n)&&!f.isArray(s)){s=[n];}q=function(){l.apply(k,s||b);};j=(p)?setInterval(q,t):setTimeout(q,t);return{interval:p,cancel:function(){if(this.interval){clearInterval(j);}else{clearTimeout(j);}}};},isValue:function(j){return(f.isObject(j)||f.isString(j)||f.isNumber(j)||f.isBoolean(j));}};f.hasOwnProperty=(a.hasOwnProperty)?function(j,k){return j&&j.hasOwnProperty&&j.hasOwnProperty(k);}:function(j,k){return !f.isUndefined(j[k])&&j.constructor.prototype[k]!==j[k];};e.augmentObject(f,e,true);YAHOO.util.Lang=f;f.augment=f.augmentProto;YAHOO.augment=f.augmentProto;YAHOO.extend=f.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.9.0",build:"2800"});(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var e=YAHOO.util,k=YAHOO.lang,L=YAHOO.env.ua,a=YAHOO.lang.trim,B={},F={},m=/^t(?:able|d|h)$/i,w=/color$/i,j=window.document,v=j.documentElement,C="ownerDocument",M="defaultView",U="documentElement",S="compatMode",z="offsetLeft",o="offsetTop",T="offsetParent",x="parentNode",K="nodeType",c="tagName",n="scrollLeft",H="scrollTop",p="getBoundingClientRect",V="getComputedStyle",y="currentStyle",l="CSS1Compat",A="BackCompat",E="class",f="className",i="",b=" ",R="(?:^|\\s)",J="(?= |$)",t="g",O="position",D="fixed",u="relative",I="left",N="top",Q="medium",P="borderLeftWidth",q="borderTopWidth",d=L.opera,h=L.webkit,g=L.gecko,s=L.ie;e.Dom={CUSTOM_ATTRIBUTES:(!v.hasAttribute)?{"for":"htmlFor","class":f}:{"htmlFor":"for","className":E},DOT_ATTRIBUTES:{checked:true},get:function(aa){var ac,X,ab,Z,W,G,Y=null;if(aa){if(typeof aa=="string"||typeof aa=="number"){ac=aa+"";aa=j.getElementById(aa);G=(aa)?aa.attributes:null;if(aa&&G&&G.id&&G.id.value===ac){return aa;}else{if(aa&&j.all){aa=null;X=j.all[ac];if(X&&X.length){for(Z=0,W=X.length;Z<W;++Z){if(X[Z].id===ac){return X[Z];}}}}}}else{if(e.Element&&aa instanceof e.Element){aa=aa.get("element");}else{if(!aa.nodeType&&"length" in aa){ab=[];for(Z=0,W=aa.length;Z<W;++Z){ab[ab.length]=e.Dom.get(aa[Z]);}aa=ab;}}}Y=aa;}return Y;},getComputedStyle:function(G,W){if(window[V]){return G[C][M][V](G,null)[W];}else{if(G[y]){return e.Dom.IE_ComputedStyle.get(G,W);}}},getStyle:function(G,W){return e.Dom.batch(G,e.Dom._getStyle,W);},_getStyle:function(){if(window[V]){return function(G,Y){Y=(Y==="float")?Y="cssFloat":e.Dom._toCamel(Y);var X=G.style[Y],W;if(!X){W=G[C][M][V](G,null);if(W){X=W[Y];}}return X;};}else{if(v[y]){return function(G,Y){var X;switch(Y){case"opacity":X=100;try{X=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(Z){try{X=G.filters("alpha").opacity;}catch(W){}}return X/100;case"float":Y="styleFloat";default:Y=e.Dom._toCamel(Y);X=G[y]?G[y][Y]:null;return(G.style[Y]||X);}};}}}(),setStyle:function(G,W,X){e.Dom.batch(G,e.Dom._setStyle,{prop:W,val:X});},_setStyle:function(){if(!window.getComputedStyle&&j.documentElement.currentStyle){return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){switch(X){case"opacity":if(Y===""||Y===null||Y===1){W.style.removeAttribute("filter");}else{if(k.isString(W.style.filter)){W.style.filter="alpha(opacity="+Y*100+")";if(!W[y]||!W[y].hasLayout){W.style.zoom=1;}}}break;case"float":X="styleFloat";default:W.style[X]=Y;}}else{}};}else{return function(W,G){var X=e.Dom._toCamel(G.prop),Y=G.val;if(W){if(X=="float"){X="cssFloat";}W.style[X]=Y;}else{}};}}(),getXY:function(G){return e.Dom.batch(G,e.Dom._getXY);},_canPosition:function(G){return(e.Dom._getStyle(G,"display")!=="none"&&e.Dom._inDoc(G));},_getXY:function(W){var X,G,Z,ab,Y,aa,ac=Math.round,ad=false;if(e.Dom._canPosition(W)){Z=W[p]();ab=W[C];X=e.Dom.getDocumentScrollLeft(ab);G=e.Dom.getDocumentScrollTop(ab);ad=[Z[I],Z[N]];if(Y||aa){ad[0]-=aa;ad[1]-=Y;}if((G||X)){ad[0]+=X;ad[1]+=G;}ad[0]=ac(ad[0]);ad[1]=ac(ad[1]);}else{}return ad;},getX:function(G){var W=function(X){return e.Dom.getXY(X)[0];};return e.Dom.batch(G,W,e.Dom,true);},getY:function(G){var W=function(X){return e.Dom.getXY(X)[1];};return e.Dom.batch(G,W,e.Dom,true);},setXY:function(G,X,W){e.Dom.batch(G,e.Dom._setXY,{pos:X,noRetry:W});},_setXY:function(G,Z){var aa=e.Dom._getStyle(G,O),Y=e.Dom.setStyle,ad=Z.pos,W=Z.noRetry,ab=[parseInt(e.Dom.getComputedStyle(G,I),10),parseInt(e.Dom.getComputedStyle(G,N),10)],ac,X;ac=e.Dom._getXY(G);if(!ad||ac===false){return false;}if(aa=="static"){aa=u;Y(G,O,aa);}if(isNaN(ab[0])){ab[0]=(aa==u)?0:G[z];}if(isNaN(ab[1])){ab[1]=(aa==u)?0:G[o];}if(ad[0]!==null){Y(G,I,ad[0]-ac[0]+ab[0]+"px");}if(ad[1]!==null){Y(G,N,ad[1]-ac[1]+ab[1]+"px");}if(!W){X=e.Dom._getXY(G);if((ad[0]!==null&&X[0]!=ad[0])||(ad[1]!==null&&X[1]!=ad[1])){e.Dom._setXY(G,{pos:ad,noRetry:true});}}},setX:function(W,G){e.Dom.setXY(W,[G,null]);},setY:function(G,W){e.Dom.setXY(G,[null,W]);},getRegion:function(G){var W=function(X){var Y=false;if(e.Dom._canPosition(X)){Y=e.Region.getRegion(X);}else{}return Y;};return e.Dom.batch(G,W,e.Dom,true);},getClientWidth:function(){return e.Dom.getViewportWidth();},getClientHeight:function(){return e.Dom.getViewportHeight();},getElementsByClassName:function(ab,af,ac,ae,X,ad){af=af||"*";ac=(ac)?e.Dom.get(ac):null||j;if(!ac){return[];}var W=[],G=ac.getElementsByTagName(af),Z=e.Dom.hasClass;for(var Y=0,aa=G.length;Y<aa;++Y){if(Z(G[Y],ab)){W[W.length]=G[Y];}}if(ae){e.Dom.batch(W,ae,X,ad);}return W;},hasClass:function(W,G){return e.Dom.batch(W,e.Dom._hasClass,G);},_hasClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(Y){Y=Y.replace(/\s+/g,b);}if(W.exec){G=W.test(Y);}else{G=W&&(b+Y+b).indexOf(b+W+b)>-1;}}else{}return G;},addClass:function(W,G){return e.Dom.batch(W,e.Dom._addClass,G);},_addClass:function(X,W){var G=false,Y;if(X&&W){Y=e.Dom._getAttribute(X,f)||i;if(!e.Dom._hasClass(X,W)){e.Dom.setAttribute(X,f,a(Y+b+W));G=true;}}else{}return G;},removeClass:function(W,G){return e.Dom.batch(W,e.Dom._removeClass,G);},_removeClass:function(Y,X){var W=false,aa,Z,G;if(Y&&X){aa=e.Dom._getAttribute(Y,f)||i;e.Dom.setAttribute(Y,f,aa.replace(e.Dom._getClassRegex(X),i));Z=e.Dom._getAttribute(Y,f);if(aa!==Z){e.Dom.setAttribute(Y,f,a(Z));W=true;if(e.Dom._getAttribute(Y,f)===""){G=(Y.hasAttribute&&Y.hasAttribute(E))?E:f;Y.removeAttribute(G);}}}else{}return W;},replaceClass:function(X,W,G){return e.Dom.batch(X,e.Dom._replaceClass,{from:W,to:G});},_replaceClass:function(Y,X){var W,ab,aa,G=false,Z;if(Y&&X){ab=X.from;aa=X.to;if(!aa){G=false;}else{if(!ab){G=e.Dom._addClass(Y,X.to);}else{if(ab!==aa){Z=e.Dom._getAttribute(Y,f)||i;W=(b+Z.replace(e.Dom._getClassRegex(ab),b+aa).replace(/\s+/g,b)).split(e.Dom._getClassRegex(aa));W.splice(1,0,b+aa);e.Dom.setAttribute(Y,f,a(W.join(i)));G=true;}}}}else{}return G;},generateId:function(G,X){X=X||"yui-gen";var W=function(Y){if(Y&&Y.id){return Y.id;}var Z=X+YAHOO.env._id_counter++;
if(Y){if(Y[C]&&Y[C].getElementById(Z)){return e.Dom.generateId(Y,Z+X);}Y.id=Z;}return Z;};return e.Dom.batch(G,W,e.Dom,true)||W.apply(e.Dom,arguments);},isAncestor:function(W,X){W=e.Dom.get(W);X=e.Dom.get(X);var G=false;if((W&&X)&&(W[K]&&X[K])){if(W.contains&&W!==X){G=W.contains(X);}else{if(W.compareDocumentPosition){G=!!(W.compareDocumentPosition(X)&16);}}}else{}return G;},inDocument:function(G,W){return e.Dom._inDoc(e.Dom.get(G),W);},_inDoc:function(W,X){var G=false;if(W&&W[c]){X=X||W[C];G=e.Dom.isAncestor(X[U],W);}else{}return G;},getElementsBy:function(W,af,ab,ad,X,ac,ae){af=af||"*";ab=(ab)?e.Dom.get(ab):null||j;var aa=(ae)?null:[],G;if(ab){G=ab.getElementsByTagName(af);for(var Y=0,Z=G.length;Y<Z;++Y){if(W(G[Y])){if(ae){aa=G[Y];break;}else{aa[aa.length]=G[Y];}}}if(ad){e.Dom.batch(aa,ad,X,ac);}}return aa;},getElementBy:function(X,G,W){return e.Dom.getElementsBy(X,G,W,null,null,null,true);},batch:function(X,ab,aa,Z){var Y=[],W=(Z)?aa:null;X=(X&&(X[c]||X.item))?X:e.Dom.get(X);if(X&&ab){if(X[c]||X.length===undefined){return ab.call(W,X,aa);}for(var G=0;G<X.length;++G){Y[Y.length]=ab.call(W||X[G],X[G],aa);}}else{return false;}return Y;},getDocumentHeight:function(){var W=(j[S]!=l||h)?j.body.scrollHeight:v.scrollHeight,G=Math.max(W,e.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var W=(j[S]!=l||h)?j.body.scrollWidth:v.scrollWidth,G=Math.max(W,e.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,W=j[S];if((W||s)&&!d){G=(W==l)?v.clientHeight:j.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,W=j[S];if(W||s){G=(W==l)?v.clientWidth:j.body.clientWidth;}return G;},getAncestorBy:function(G,W){while((G=G[x])){if(e.Dom._testElement(G,W)){return G;}}return null;},getAncestorByClassName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return e.Dom.hasClass(Y,G);};return e.Dom.getAncestorBy(W,X);},getAncestorByTagName:function(W,G){W=e.Dom.get(W);if(!W){return null;}var X=function(Y){return Y[c]&&Y[c].toUpperCase()==G.toUpperCase();};return e.Dom.getAncestorBy(W,X);},getPreviousSiblingBy:function(G,W){while(G){G=G.previousSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getPreviousSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,W){while(G){G=G.nextSibling;if(e.Dom._testElement(G,W)){return G;}}return null;},getNextSibling:function(G){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,X){var W=(e.Dom._testElement(G.firstChild,X))?G.firstChild:null;return W||e.Dom.getNextSiblingBy(G.firstChild,X);},getFirstChild:function(G,W){G=e.Dom.get(G);if(!G){return null;}return e.Dom.getFirstChildBy(G);},getLastChildBy:function(G,X){if(!G){return null;}var W=(e.Dom._testElement(G.lastChild,X))?G.lastChild:null;return W||e.Dom.getPreviousSiblingBy(G.lastChild,X);},getLastChild:function(G){G=e.Dom.get(G);return e.Dom.getLastChildBy(G);},getChildrenBy:function(W,Y){var X=e.Dom.getFirstChildBy(W,Y),G=X?[X]:[];e.Dom.getNextSiblingBy(X,function(Z){if(!Y||Y(Z)){G[G.length]=Z;}return false;});return G;},getChildren:function(G){G=e.Dom.get(G);if(!G){}return e.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||j;return Math.max(G[U].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||j;return Math.max(G[U].scrollTop,G.body.scrollTop);},insertBefore:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}return G[x].insertBefore(W,G);},insertAfter:function(W,G){W=e.Dom.get(W);G=e.Dom.get(G);if(!W||!G||!G[x]){return null;}if(G.nextSibling){return G[x].insertBefore(W,G.nextSibling);}else{return G[x].appendChild(W);}},getClientRegion:function(){var X=e.Dom.getDocumentScrollTop(),W=e.Dom.getDocumentScrollLeft(),Y=e.Dom.getViewportWidth()+W,G=e.Dom.getViewportHeight()+X;return new e.Region(X,Y,G,W);},setAttribute:function(W,G,X){e.Dom.batch(W,e.Dom._setAttribute,{attr:G,val:X});},_setAttribute:function(X,W){var G=e.Dom._toCamel(W.attr),Y=W.val;if(X&&X.setAttribute){if(e.Dom.DOT_ATTRIBUTES[G]&&X.tagName&&X.tagName!="BUTTON"){X[G]=Y;}else{G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;X.setAttribute(G,Y);}}else{}},getAttribute:function(W,G){return e.Dom.batch(W,e.Dom._getAttribute,G);},_getAttribute:function(W,G){var X;G=e.Dom.CUSTOM_ATTRIBUTES[G]||G;if(e.Dom.DOT_ATTRIBUTES[G]){X=W[G];}else{if(W&&"getAttribute" in W){if(/^(?:href|src)$/.test(G)){X=W.getAttribute(G,2);}else{X=W.getAttribute(G);}}else{}}return X;},_toCamel:function(W){var X=B;function G(Y,Z){return Z.toUpperCase();}return X[W]||(X[W]=W.indexOf("-")===-1?W:W.replace(/-([a-z])/gi,G));},_getClassRegex:function(W){var G;if(W!==undefined){if(W.exec){G=W;}else{G=F[W];if(!G){W=W.replace(e.Dom._patterns.CLASS_RE_TOKENS,"\\$1");W=W.replace(/\s+/g,b);G=F[W]=new RegExp(R+W+J,t);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\.\(\)\^\$\*\+\?\|\[\]\{\}\\])/g},_testElement:function(G,W){return G&&G[K]==1&&(!W||W(G));},_calcBorders:function(X,Y){var W=parseInt(e.Dom[V](X,q),10)||0,G=parseInt(e.Dom[V](X,P),10)||0;if(g){if(m.test(X[c])){W=0;G=0;}}Y[0]+=G;Y[1]+=W;return Y;}};var r=e.Dom[V];if(L.opera){e.Dom[V]=function(W,G){var X=r(W,G);if(w.test(G)){X=e.Dom.Color.toRGB(X);}return X;};}if(L.webkit){e.Dom[V]=function(W,G){var X=r(W,G);if(X==="rgba(0, 0, 0, 0)"){X="transparent";}return X;};}if(L.ie&&L.ie>=8){e.Dom.DOT_ATTRIBUTES.type=true;}})();YAHOO.util.Region=function(d,e,a,c){this.top=d;this.y=d;this[1]=d;this.right=e;this.bottom=a;this.left=c;this.x=c;this[0]=c;this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(a){return(a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(f){var d=Math.max(this.top,f.top),e=Math.min(this.right,f.right),a=Math.min(this.bottom,f.bottom),c=Math.max(this.left,f.left);
if(a>=d&&e>=c){return new YAHOO.util.Region(d,e,a,c);}else{return null;}};YAHOO.util.Region.prototype.union=function(f){var d=Math.min(this.top,f.top),e=Math.max(this.right,f.right),a=Math.max(this.bottom,f.bottom),c=Math.min(this.left,f.left);return new YAHOO.util.Region(d,e,a,c);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(e){var g=YAHOO.util.Dom.getXY(e),d=g[1],f=g[0]+e.offsetWidth,a=g[1]+e.offsetHeight,c=g[0];return new YAHOO.util.Region(d,f,a,c);};YAHOO.util.Point=function(a,b){if(YAHOO.lang.isArray(a)){b=a[1];a=a[0];}YAHOO.util.Point.superclass.constructor.call(this,b,a,b,a);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var b=YAHOO.util,a="clientTop",f="clientLeft",j="parentNode",k="right",w="hasLayout",i="px",u="opacity",l="auto",d="borderLeftWidth",g="borderTopWidth",p="borderRightWidth",v="borderBottomWidth",s="visible",q="transparent",n="height",e="width",h="style",t="currentStyle",r=/^width|height$/,o=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,m={get:function(x,z){var y="",A=x[t][z];if(z===u){y=b.Dom.getStyle(x,u);}else{if(!A||(A.indexOf&&A.indexOf(i)>-1)){y=A;}else{if(b.Dom.IE_COMPUTED[z]){y=b.Dom.IE_COMPUTED[z](x,z);}else{if(o.test(A)){y=b.Dom.IE.ComputedStyle.getPixel(x,z);}else{y=A;}}}}return y;},getOffset:function(z,E){var B=z[t][E],x=E.charAt(0).toUpperCase()+E.substr(1),C="offset"+x,y="pixel"+x,A="",D;if(B==l){D=z[C];if(D===undefined){A=0;}A=D;if(r.test(E)){z[h][E]=D;if(z[C]>D){A=D-(z[C]-D);}z[h][E]=l;}}else{if(!z[h][y]&&!z[h][E]){z[h][E]=B;}A=z[h][y];}return A+i;},getBorderWidth:function(x,z){var y=null;if(!x[t][w]){x[h].zoom=1;}switch(z){case g:y=x[a];break;case v:y=x.offsetHeight-x.clientHeight-x[a];break;case d:y=x[f];break;case p:y=x.offsetWidth-x.clientWidth-x[f];break;}return y+i;},getPixel:function(y,x){var A=null,B=y[t][k],z=y[t][x];y[h][k]=z;A=y[h].pixelRight;y[h][k]=B;return A+i;},getMargin:function(y,x){var z;if(y[t][x]==l){z=0+i;}else{z=b.Dom.IE.ComputedStyle.getPixel(y,x);}return z;},getVisibility:function(y,x){var z;while((z=y[t])&&z[x]=="inherit"){y=y[j];}return(z)?z[x]:s;},getColor:function(y,x){return b.Dom.Color.toRGB(y[t][x])||q;},getBorderColor:function(y,x){var z=y[t],A=z[x]||z.color;return b.Dom.Color.toRGB(b.Dom.Color.toHex(A));}},c={};c.top=c.right=c.bottom=c.left=c[e]=c[n]=m.getOffset;c.color=m.getColor;c[g]=c[p]=c[v]=c[d]=m.getBorderWidth;c.marginTop=c.marginRight=c.marginBottom=c.marginLeft=m.getMargin;c.visibility=m.getVisibility;c.borderColor=c.borderTopColor=c.borderRightColor=c.borderBottomColor=c.borderLeftColor=m.getBorderColor;b.Dom.IE_COMPUTED=c;b.Dom.IE_ComputedStyle=m;})();(function(){var c="toString",a=parseInt,b=RegExp,d=YAHOO.util;d.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!d.Dom.Color.re_RGB.test(e)){e=d.Dom.Color.toHex(e);}if(d.Dom.Color.re_hex.exec(e)){e="rgb("+[a(b.$1,16),a(b.$2,16),a(b.$3,16)].join(", ")+")";}return e;},toHex:function(f){f=d.Dom.Color.KEYWORDS[f]||f;if(d.Dom.Color.re_RGB.exec(f)){f=[Number(b.$1).toString(16),Number(b.$2).toString(16),Number(b.$3).toString(16)];for(var e=0;e<f.length;e++){if(f[e].length<2){f[e]="0"+f[e];}}f=f.join("");}if(f.length<6){f=f.replace(d.Dom.Color.re_hex3,"$1$1");}if(f!=="transparent"&&f.indexOf("#")<0){f="#"+f;}return f.toUpperCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.9.0",build:"2800"});YAHOO.util.CustomEvent=function(d,c,b,a,e){this.type=d;this.scope=c||window;this.silent=b;this.fireOnce=e;this.fired=false;this.firedWith=null;this.signature=a||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var f="_YUICEOnSubscribe";if(d!==f){this.subscribeEvent=new YAHOO.util.CustomEvent(f,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(b,c,d){if(!b){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(b,c,d);}var a=new YAHOO.util.Subscriber(b,c,d);if(this.fireOnce&&this.fired){this.notify(a,this.firedWith);}else{this.subscribers.push(a);}},unsubscribe:function(d,f){if(!d){return this.unsubscribeAll();}var e=false;for(var b=0,a=this.subscribers.length;b<a;++b){var c=this.subscribers[b];if(c&&c.contains(d,f)){this._delete(b);e=true;}}return e;},fire:function(){this.lastError=null;var h=[],a=this.subscribers.length;var d=[].slice.call(arguments,0),c=true,f,b=false;if(this.fireOnce){if(this.fired){return true;}else{this.firedWith=d;}}this.fired=true;if(!a&&this.silent){return true;}if(!this.silent){}var e=this.subscribers.slice();for(f=0;f<a;++f){var g=e[f];if(!g||!g.fn){b=true;}else{c=this.notify(g,d);if(false===c){if(!this.silent){}break;}}}return(c!==false);},notify:function(g,c){var b,i=null,f=g.getScope(this.scope),a=YAHOO.util.Event.throwErrors;if(!this.silent){}if(this.signature==YAHOO.util.CustomEvent.FLAT){if(c.length>0){i=c[0];}try{b=g.fn.call(f,i,g.obj);}catch(h){this.lastError=h;if(a){throw h;}}}else{try{b=g.fn.call(f,this.type,c,g.obj);}catch(d){this.lastError=d;if(a){throw d;}}}return b;},unsubscribeAll:function(){var a=this.subscribers.length,b;for(b=a-1;b>-1;b--){this._delete(b);}this.subscribers=[];return a;},_delete:function(a){var b=this.subscribers[a];if(b){delete b.fn;delete b.obj;}this.subscribers.splice(a,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(a,b,c){this.fn=a;this.obj=YAHOO.lang.isUndefined(b)?null:b;this.overrideContext=c;};YAHOO.util.Subscriber.prototype.getScope=function(a){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return a;};YAHOO.util.Subscriber.prototype.contains=function(a,b){if(b){return(this.fn==a&&this.obj==b);}else{return(this.fn==a);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var g=false,h=[],j=[],a=0,e=[],b=0,c={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},d=YAHOO.env.ua.ie,f="focusin",i="focusout";return{POLL_RETRYS:500,POLL_INTERVAL:40,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:d,_interval:null,_dri:null,_specialTypes:{focusin:(d?"focusin":"focus"),focusout:(d?"focusout":"blur")},DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){this._interval=YAHOO.lang.later(this.POLL_INTERVAL,this,this._tryPreloadAttach,null,true);}},onAvailable:function(q,m,o,p,n){var k=(YAHOO.lang.isString(q))?[q]:q;for(var l=0;l<k.length;l=l+1){e.push({id:k[l],fn:m,obj:o,overrideContext:p,checkReady:n});}a=this.POLL_RETRYS;this.startInterval();},onContentReady:function(n,k,l,m){this.onAvailable(n,k,l,m,true);},onDOMReady:function(){this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent,arguments);},_addListener:function(m,k,v,p,t,y){if(!v||!v.call){return false;}if(this._isValidCollection(m)){var w=true;for(var q=0,s=m.length;q<s;++q){w=this.on(m[q],k,v,p,t)&&w;}return w;}else{if(YAHOO.lang.isString(m)){var o=this.getEl(m);if(o){m=o;}else{this.onAvailable(m,function(){YAHOO.util.Event._addListener(m,k,v,p,t,y);});return true;}}}if(!m){return false;}if("unload"==k&&p!==this){j[j.length]=[m,k,v,p,t];return true;}var l=m;if(t){if(t===true){l=p;}else{l=t;}}var n=function(z){return v.call(l,YAHOO.util.Event.getEvent(z,m),p);};var x=[m,k,v,n,l,p,t,y];var r=h.length;h[r]=x;try{this._simpleAdd(m,k,n,y);}catch(u){this.lastError=u;this.removeListener(m,k,v);return false;}return true;},_getType:function(k){return this._specialTypes[k]||k;},addListener:function(m,p,l,n,o){var k=((p==f||p==i)&&!YAHOO.env.ua.ie)?true:false;return this._addListener(m,this._getType(p),l,n,o,k);},addFocusListener:function(l,k,m,n){return this.on(l,f,k,m,n);},removeFocusListener:function(l,k){return this.removeListener(l,f,k);},addBlurListener:function(l,k,m,n){return this.on(l,i,k,m,n);},removeBlurListener:function(l,k){return this.removeListener(l,i,k);},removeListener:function(l,k,r){var m,p,u;k=this._getType(k);if(typeof l=="string"){l=this.getEl(l);}else{if(this._isValidCollection(l)){var s=true;for(m=l.length-1;m>-1;m--){s=(this.removeListener(l[m],k,r)&&s);}return s;}}if(!r||!r.call){return this.purgeElement(l,false,k);}if("unload"==k){for(m=j.length-1;m>-1;m--){u=j[m];if(u&&u[0]==l&&u[1]==k&&u[2]==r){j.splice(m,1);return true;}}return false;}var n=null;var o=arguments[3];if("undefined"===typeof o){o=this._getCacheIndex(h,l,k,r);}if(o>=0){n=h[o];}if(!l||!n){return false;}var t=n[this.CAPTURE]===true?true:false;try{this._simpleRemove(l,k,n[this.WFN],t);}catch(q){this.lastError=q;return false;}delete h[o][this.WFN];delete h[o][this.FN];h.splice(o,1);return true;},getTarget:function(m,l){var k=m.target||m.srcElement;return this.resolveTextNode(k);},resolveTextNode:function(l){try{if(l&&3==l.nodeType){return l.parentNode;}}catch(k){return null;}return l;},getPageX:function(l){var k=l.pageX;if(!k&&0!==k){k=l.clientX||0;if(this.isIE){k+=this._getScrollLeft();}}return k;},getPageY:function(k){var l=k.pageY;if(!l&&0!==l){l=k.clientY||0;if(this.isIE){l+=this._getScrollTop();}}return l;},getXY:function(k){return[this.getPageX(k),this.getPageY(k)];},getRelatedTarget:function(l){var k=l.relatedTarget;
if(!k){if(l.type=="mouseout"){k=l.toElement;}else{if(l.type=="mouseover"){k=l.fromElement;}}}return this.resolveTextNode(k);},getTime:function(m){if(!m.time){var l=new Date().getTime();try{m.time=l;}catch(k){this.lastError=k;return l;}}return m.time;},stopEvent:function(k){this.stopPropagation(k);this.preventDefault(k);},stopPropagation:function(k){if(k.stopPropagation){k.stopPropagation();}else{k.cancelBubble=true;}},preventDefault:function(k){if(k.preventDefault){k.preventDefault();}else{k.returnValue=false;}},getEvent:function(m,k){var l=m||window.event;if(!l){var n=this.getEvent.caller;while(n){l=n.arguments[0];if(l&&Event==l.constructor){break;}n=n.caller;}}return l;},getCharCode:function(l){var k=l.keyCode||l.charCode||0;if(YAHOO.env.ua.webkit&&(k in c)){k=c[k];}return k;},_getCacheIndex:function(n,q,r,p){for(var o=0,m=n.length;o<m;o=o+1){var k=n[o];if(k&&k[this.FN]==p&&k[this.EL]==q&&k[this.TYPE]==r){return o;}}return -1;},generateId:function(k){var l=k.id;if(!l){l="yuievtautoid-"+b;++b;k.id=l;}return l;},_isValidCollection:function(l){try{return(l&&typeof l!=="string"&&l.length&&!l.tagName&&!l.alert&&typeof l[0]!=="undefined");}catch(k){return false;}},elCache:{},getEl:function(k){return(typeof k==="string")?document.getElementById(k):k;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",YAHOO,0,0,1),_load:function(l){if(!g){g=true;var k=YAHOO.util.Event;k._ready();k._tryPreloadAttach();}},_ready:function(l){var k=YAHOO.util.Event;if(!k.DOMReady){k.DOMReady=true;k.DOMReadyEvent.fire();k._simpleRemove(document,"DOMContentLoaded",k._ready);}},_tryPreloadAttach:function(){if(e.length===0){a=0;if(this._interval){this._interval.cancel();this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var q=!g;if(!q){q=(a>0&&e.length>0);}var p=[];var r=function(t,u){var s=t;if(u.overrideContext){if(u.overrideContext===true){s=u.obj;}else{s=u.overrideContext;}}u.fn.call(s,u.obj);};var l,k,o,n,m=[];for(l=0,k=e.length;l<k;l=l+1){o=e[l];if(o){n=this.getEl(o.id);if(n){if(o.checkReady){if(g||n.nextSibling||!q){m.push(o);e[l]=null;}}else{r(n,o);e[l]=null;}}else{p.push(o);}}}for(l=0,k=m.length;l<k;l=l+1){o=m[l];r(this.getEl(o.id),o);}a--;if(q){for(l=e.length-1;l>-1;l--){o=e[l];if(!o||!o.id){e.splice(l,1);}}this.startInterval();}else{if(this._interval){this._interval.cancel();this._interval=null;}}this.locked=false;},purgeElement:function(p,q,s){var n=(YAHOO.lang.isString(p))?this.getEl(p):p;var r=this.getListeners(n,s),o,k;if(r){for(o=r.length-1;o>-1;o--){var m=r[o];this.removeListener(n,m.type,m.fn);}}if(q&&n&&n.childNodes){for(o=0,k=n.childNodes.length;o<k;++o){this.purgeElement(n.childNodes[o],q,s);}}},getListeners:function(n,k){var q=[],m;if(!k){m=[h,j];}else{if(k==="unload"){m=[j];}else{k=this._getType(k);m=[h];}}var s=(YAHOO.lang.isString(n))?this.getEl(n):n;for(var p=0;p<m.length;p=p+1){var u=m[p];if(u){for(var r=0,t=u.length;r<t;++r){var o=u[r];if(o&&o[this.EL]===s&&(!k||k===o[this.TYPE])){q.push({type:o[this.TYPE],fn:o[this.FN],obj:o[this.OBJ],adjust:o[this.OVERRIDE],scope:o[this.ADJ_SCOPE],index:r});}}}}return(q.length)?q:null;},_unload:function(s){var m=YAHOO.util.Event,p,o,n,r,q,t=j.slice(),k;for(p=0,r=j.length;p<r;++p){n=t[p];if(n){try{k=window;if(n[m.ADJ_SCOPE]){if(n[m.ADJ_SCOPE]===true){k=n[m.UNLOAD_OBJ];}else{k=n[m.ADJ_SCOPE];}}n[m.FN].call(k,m.getEvent(s,n[m.EL]),n[m.UNLOAD_OBJ]);}catch(w){}t[p]=null;}}n=null;k=null;j=null;if(h){for(o=h.length-1;o>-1;o--){n=h[o];if(n){try{m.removeListener(n[m.EL],n[m.TYPE],n[m.FN],o);}catch(v){}}}n=null;}try{m._simpleRemove(window,"unload",m._unload);m._simpleRemove(window,"load",m._load);}catch(u){}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var k=document.documentElement,l=document.body;if(k&&(k.scrollTop||k.scrollLeft)){return[k.scrollTop,k.scrollLeft];}else{if(l){return[l.scrollTop,l.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(m,n,l,k){m.addEventListener(n,l,(k));};}else{if(window.attachEvent){return function(m,n,l,k){m.attachEvent("on"+n,l);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(m,n,l,k){m.removeEventListener(n,l,(k));};}else{if(window.detachEvent){return function(l,m,k){l.detachEvent("on"+m,k);};}else{return function(){};}}}()};}();(function(){var a=YAHOO.util.Event;a.on=a.addListener;a.onFocus=a.addFocusListener;a.onBlur=a.addBlurListener;
/*! DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(a.isIE){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;a._ready();}};}else{YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var b=document.createElement("p");a._dri=setInterval(function(){try{b.doScroll("left");clearInterval(a._dri);a._dri=null;a._ready();b=null;}catch(c){}},a.POLL_INTERVAL);}}else{if(a.webkit&&a.webkit<525){a._dri=setInterval(function(){var c=document.readyState;if("loaded"==c||"complete"==c){clearInterval(a._dri);a._dri=null;a._ready();}},a.POLL_INTERVAL);}else{a._simpleAdd(document,"DOMContentLoaded",a._ready);}}a._simpleAdd(window,"load",a._load);a._simpleAdd(window,"unload",a._unload);a._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(a,c,f,e){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[a];if(d){d.subscribe(c,f,e);}else{this.__yui_subscribers=this.__yui_subscribers||{};var b=this.__yui_subscribers;if(!b[a]){b[a]=[];}b[a].push({fn:c,obj:f,overrideContext:e});}},unsubscribe:function(c,e,g){this.__yui_events=this.__yui_events||{};var a=this.__yui_events;if(c){var f=a[c];if(f){return f.unsubscribe(e,g);}}else{var b=true;for(var d in a){if(YAHOO.lang.hasOwnProperty(a,d)){b=b&&a[d].unsubscribe(e,g);
}}return b;}return false;},unsubscribeAll:function(a){return this.unsubscribe(a);},createEvent:function(b,g){this.__yui_events=this.__yui_events||{};var e=g||{},d=this.__yui_events,f;if(d[b]){}else{f=new YAHOO.util.CustomEvent(b,e.scope||this,e.silent,YAHOO.util.CustomEvent.FLAT,e.fireOnce);d[b]=f;if(e.onSubscribeCallback){f.subscribeEvent.subscribe(e.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var a=this.__yui_subscribers[b];if(a){for(var c=0;c<a.length;++c){f.subscribe(a[c].fn,a[c].obj,a[c].overrideContext);}}}return d[b];},fireEvent:function(b){this.__yui_events=this.__yui_events||{};var d=this.__yui_events[b];if(!d){return null;}var a=[];for(var c=1;c<arguments.length;++c){a.push(arguments[c]);}return d.fire.apply(d,a);},hasEvent:function(a){if(this.__yui_events){if(this.__yui_events[a]){return true;}}return false;}};(function(){var a=YAHOO.util.Event,c=YAHOO.lang;YAHOO.util.KeyListener=function(d,i,e,f){if(!d){}else{if(!i){}else{if(!e){}}}if(!f){f=YAHOO.util.KeyListener.KEYDOWN;}var g=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(c.isString(d)){d=document.getElementById(d);}if(c.isFunction(e)){g.subscribe(e);}else{g.subscribe(e.fn,e.scope,e.correctScope);}function h(o,n){if(!i.shift){i.shift=false;}if(!i.alt){i.alt=false;}if(!i.ctrl){i.ctrl=false;}if(o.shiftKey==i.shift&&o.altKey==i.alt&&o.ctrlKey==i.ctrl){var j,m=i.keys,l;if(YAHOO.lang.isArray(m)){for(var k=0;k<m.length;k++){j=m[k];l=a.getCharCode(o);if(j==l){g.fire(l,o);break;}}}else{l=a.getCharCode(o);if(m==l){g.fire(l,o);}}}}this.enable=function(){if(!this.enabled){a.on(d,f,h);this.enabledEvent.fire(i);}this.enabled=true;};this.disable=function(){if(this.enabled){a.removeListener(d,f,h);this.disabledEvent.fire(i);}this.enabled=false;};this.toString=function(){return"KeyListener ["+i.keys+"] "+d.tagName+(d.id?"["+d.id+"]":"");};};var b=YAHOO.util.KeyListener;b.KEYDOWN="keydown";b.KEYUP="keyup";b.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.9.0",build:"2800"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.9.0", build: "2800"});;
/* ------------- BEGIN get-min.js --------------- */;
/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
YAHOO.util.Get=function(){var m={},k=0,r=0,l=false,n=YAHOO.env.ua,s=YAHOO.lang,q,d,e,i=function(x,t,y){var u=y||window,z=u.document,A=z.createElement(x),v;for(v in t){if(t.hasOwnProperty(v)){A.setAttribute(v,t[v]);}}return A;},h=function(u,v,t){var w={id:"yui__dyn_"+(r++),type:"text/css",rel:"stylesheet",href:u};if(t){s.augmentObject(w,t);}return i("link",w,v);},p=function(u,v,t){var w={id:"yui__dyn_"+(r++),type:"text/javascript",src:u};if(t){s.augmentObject(w,t);}return i("script",w,v);},a=function(t,u){return{tId:t.tId,win:t.win,data:t.data,nodes:t.nodes,msg:u,purge:function(){d(this.tId);}};},b=function(t,w){var u=m[w],v=(s.isString(t))?u.win.document.getElementById(t):t;if(!v){q(w,"target node not found: "+t);}return v;},c=function(w){var u=m[w],v,t;u.finished=true;if(u.aborted){v="transaction "+w+" was aborted";q(w,v);return;}if(u.onSuccess){t=u.scope||u.win;u.onSuccess.call(t,a(u));}},o=function(v){var u=m[v],t;if(u.onTimeout){t=u.scope||u;u.onTimeout.call(t,a(u));}},f=function(v,A){var u=m[v],D=u.win,C=D.document,B=C.getElementsByTagName("head")[0],x,y,t,E,z;if(u.timer){u.timer.cancel();}if(u.aborted){y="transaction "+v+" was aborted";q(v,y);return;}if(A){u.url.shift();if(u.varName){u.varName.shift();}}else{u.url=(s.isString(u.url))?[u.url]:u.url;if(u.varName){u.varName=(s.isString(u.varName))?[u.varName]:u.varName;}}if(u.url.length===0){if(u.type==="script"&&n.webkit&&n.webkit<420&&!u.finalpass&&!u.varName){z=p(null,u.win,u.attributes);z.innerHTML='YAHOO.util.Get._finalize("'+v+'");';u.nodes.push(z);B.appendChild(z);}else{c(v);}return;}t=u.url[0];if(!t){u.url.shift();return f(v);}if(u.timeout){u.timer=s.later(u.timeout,u,o,v);}if(u.type==="script"){x=p(t,D,u.attributes);}else{x=h(t,D,u.attributes);}e(u.type,x,v,t,D,u.url.length);u.nodes.push(x);if(u.insertBefore){E=b(u.insertBefore,v);if(E){E.parentNode.insertBefore(x,E);}}else{B.appendChild(x);}if((n.webkit||n.gecko)&&u.type==="css"){f(v,t);}},j=function(){if(l){return;}l=true;var t,u;for(t in m){if(m.hasOwnProperty(t)){u=m[t];if(u.autopurge&&u.finished){d(u.tId);delete m[t];}}}l=false;},g=function(u,t,v){var x="q"+(k++),w;v=v||{};if(k%YAHOO.util.Get.PURGE_THRESH===0){j();}m[x]=s.merge(v,{tId:x,type:u,url:t,finished:false,aborted:false,nodes:[]});w=m[x];w.win=w.win||window;w.scope=w.scope||w.win;w.autopurge=("autopurge" in w)?w.autopurge:(u==="script")?true:false;w.attributes=w.attributes||{};w.attributes.charset=v.charset||w.attributes.charset||"utf-8";s.later(0,w,f,x);return{tId:x};};e=function(H,z,x,u,D,E,G){var F=G||f,B,t,I,v,J,A,C,y;if(n.ie){z.onreadystatechange=function(){B=this.readyState;if("loaded"===B||"complete"===B){z.onreadystatechange=null;F(x,u);}};}else{if(n.webkit){if(H==="script"){if(n.webkit>=420){z.addEventListener("load",function(){F(x,u);});}else{t=m[x];if(t.varName){v=YAHOO.util.Get.POLL_FREQ;t.maxattempts=YAHOO.util.Get.TIMEOUT/v;t.attempts=0;t._cache=t.varName[0].split(".");t.timer=s.later(v,t,function(w){I=this._cache;A=I.length;J=this.win;for(C=0;C<A;C=C+1){J=J[I[C]];if(!J){this.attempts++;if(this.attempts++>this.maxattempts){y="Over retry limit, giving up";t.timer.cancel();q(x,y);}else{}return;}}t.timer.cancel();F(x,u);},null,true);}else{s.later(YAHOO.util.Get.POLL_FREQ,null,F,[x,u]);}}}}else{z.onload=function(){F(x,u);};}}};q=function(w,v){var u=m[w],t;if(u.onFailure){t=u.scope||u.win;u.onFailure.call(t,a(u,v));}};d=function(z){if(m[z]){var t=m[z],u=t.nodes,x=u.length,C=t.win.document,A=C.getElementsByTagName("head")[0],v,y,w,B;if(t.insertBefore){v=b(t.insertBefore,z);if(v){A=v.parentNode;}}for(y=0;y<x;y=y+1){w=u[y];if(w.clearAttributes){w.clearAttributes();}else{for(B in w){if(w.hasOwnProperty(B)){delete w[B];}}}A.removeChild(w);}t.nodes=[];}};return{POLL_FREQ:10,PURGE_THRESH:20,TIMEOUT:2000,_finalize:function(t){s.later(0,null,c,t);},abort:function(u){var v=(s.isString(u))?u:u.tId,t=m[v];if(t){t.aborted=true;}},script:function(t,u){return g("script",t,u);},css:function(t,u){return g("css",t,u);}};}();YAHOO.register("get",YAHOO.util.Get,{version:"2.9.0",build:"2800"});;
/* ------------- BEGIN connection-min.js --------------- */;
/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_isFormSubmit:false,_default_headers:{},_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(a){this._msxml_progid.unshift(a);},setDefaultPostHeader:function(a){if(typeof a=="string"){this._default_post_header=a;this._use_default_post_header=true;}else{if(typeof a=="boolean"){this._use_default_post_header=a;}}},setDefaultXhrHeader:function(a){if(typeof a=="string"){this._default_xhr_header=a;}else{this._use_default_xhr_header=a;}},setPollingInterval:function(a){if(typeof a=="number"&&isFinite(a)){this._polling_interval=a;}},createXhrObject:function(g){var d,a,b;try{a=new XMLHttpRequest();d={conn:a,tId:g,xhr:true};}catch(c){for(b=0;b<this._msxml_progid.length;++b){try{a=new ActiveXObject(this._msxml_progid[b]);d={conn:a,tId:g,xhr:true};break;}catch(f){}}}finally{return d;}},getConnectionObject:function(a){var c,d=this._transaction_id;try{if(!a){c=this.createXhrObject(d);}else{c={tId:d};if(a==="xdr"){c.conn=this._transport;c.xdr=true;}else{if(a==="upload"){c.upload=true;}}}if(c){this._transaction_id++;}}catch(b){}return c;},asyncRequest:function(h,d,g,a){var b=g&&g.argument?g.argument:null,e=this,f,c;if(this._isFileUpload){c="upload";}else{if(g&&g.xdr){c="xdr";}}f=this.getConnectionObject(c);if(!f){return null;}else{if(g&&g.customevents){this.initCustomEvents(f,g);}if(this._isFormSubmit){if(this._isFileUpload){window.setTimeout(function(){e.uploadFile(f,g,d,a);},10);return f;}if(h.toUpperCase()=="GET"){if(this._sFormData.length!==0){d+=((d.indexOf("?")==-1)?"?":"&")+this._sFormData;}}else{if(h.toUpperCase()=="POST"){a=a?this._sFormData+"&"+a:this._sFormData;}}}if(h.toUpperCase()=="GET"&&(g&&g.cache===false)){d+=((d.indexOf("?")==-1)?"?":"&")+"rnd="+new Date().valueOf().toString();}if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true);}}if((h.toUpperCase()==="POST"&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader("Content-Type",this._default_post_header);}if(f.xdr){this.xdr(f,h,d,g,a);return f;}f.conn.open(h,d,true);if(this._has_default_headers||this._has_http_headers){this.setHeader(f);}this.handleReadyState(f,g);f.conn.send(a||"");if(this._isFormSubmit===true){this.resetFormState();}this.startEvent.fire(f,b);if(f.startEvent){f.startEvent.fire(f,b);}return f;}},initCustomEvents:function(a,c){var b;for(b in c.customevents){if(this._customEvents[b][0]){a[this._customEvents[b][0]]=new YAHOO.util.CustomEvent(this._customEvents[b][1],(c.scope)?c.scope:null);a[this._customEvents[b][0]].subscribe(c.customevents[b]);}}},handleReadyState:function(c,d){var b=this,a=(d&&d.argument)?d.argument:null;if(d&&d.timeout){this._timeOut[c.tId]=window.setTimeout(function(){b.abort(c,d,true);},d.timeout);}this._poll[c.tId]=window.setInterval(function(){if(c.conn&&c.conn.readyState===4){window.clearInterval(b._poll[c.tId]);delete b._poll[c.tId];if(d&&d.timeout){window.clearTimeout(b._timeOut[c.tId]);delete b._timeOut[c.tId];}b.completeEvent.fire(c,a);if(c.completeEvent){c.completeEvent.fire(c,a);}b.handleTransactionResponse(c,d);}},this._polling_interval);},handleTransactionResponse:function(b,j,d){var f,a,h=(j&&j.argument)?j.argument:null,c=(b.r&&b.r.statusText==="xdr:success")?true:false,i=(b.r&&b.r.statusText==="xdr:failure")?true:false,k=d;try{if((b.conn.status!==undefined&&b.conn.status!==0)||c){f=b.conn.status;}else{if(i&&!k){f=0;}else{f=13030;}}}catch(g){f=13030;}if((f>=200&&f<300)||f===1223||c){a=b.xdr?b.r:this.createResponseObject(b,h);if(j&&j.success){if(!j.scope){j.success(a);}else{j.success.apply(j.scope,[a]);}}this.successEvent.fire(a);if(b.successEvent){b.successEvent.fire(a);}}else{switch(f){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:a=this.createExceptionObject(b.tId,h,(d?d:false));if(j&&j.failure){if(!j.scope){j.failure(a);}else{j.failure.apply(j.scope,[a]);}}break;default:a=(b.xdr)?b.response:this.createResponseObject(b,h);if(j&&j.failure){if(!j.scope){j.failure(a);}else{j.failure.apply(j.scope,[a]);}}}this.failureEvent.fire(a);if(b.failureEvent){b.failureEvent.fire(a);}}this.releaseObject(b);a=null;},createResponseObject:function(a,h){var d={},k={},f,c,g,b;try{c=a.conn.getAllResponseHeaders();g=c.split("\n");for(f=0;f<g.length;f++){b=g[f].indexOf(":");if(b!=-1){k[g[f].substring(0,b)]=YAHOO.lang.trim(g[f].substring(b+2));}}}catch(j){}d.tId=a.tId;d.status=(a.conn.status==1223)?204:a.conn.status;d.statusText=(a.conn.status==1223)?"No Content":a.conn.statusText;d.getResponseHeader=k;d.getAllResponseHeaders=c;d.responseText=a.conn.responseText;d.responseXML=a.conn.responseXML;if(h){d.argument=h;}return d;},createExceptionObject:function(h,d,a){var f=0,g="communication failure",c=-1,b="transaction aborted",e={};e.tId=h;if(a){e.status=c;e.statusText=b;}else{e.status=f;e.statusText=g;}if(d){e.argument=d;}return e;},initHeader:function(a,d,c){var b=(c)?this._default_headers:this._http_headers;b[a]=d;if(c){this._has_default_headers=true;}else{this._has_http_headers=true;}},setHeader:function(a){var b;if(this._has_default_headers){for(b in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,b)){a.conn.setRequestHeader(b,this._default_headers[b]);
}}}if(this._has_http_headers){for(b in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,b)){a.conn.setRequestHeader(b,this._http_headers[b]);}}this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){this._default_headers={};this._has_default_headers=false;},abort:function(e,g,a){var d,b=(g&&g.argument)?g.argument:null;e=e||{};if(e.conn){if(e.xhr){if(this.isCallInProgress(e)){e.conn.abort();window.clearInterval(this._poll[e.tId]);delete this._poll[e.tId];if(a){window.clearTimeout(this._timeOut[e.tId]);delete this._timeOut[e.tId];}d=true;}}else{if(e.xdr){e.conn.abort(e.tId);d=true;}}}else{if(e.upload){var c="yuiIO"+e.tId;var f=document.getElementById(c);if(f){YAHOO.util.Event.removeListener(f,"load");document.body.removeChild(f);if(a){window.clearTimeout(this._timeOut[e.tId]);delete this._timeOut[e.tId];}d=true;}}else{d=false;}}if(d===true){this.abortEvent.fire(e,b);if(e.abortEvent){e.abortEvent.fire(e,b);}this.handleTransactionResponse(e,g,true);}return d;},isCallInProgress:function(a){a=a||{};if(a.xhr&&a.conn){return a.conn.readyState!==4&&a.conn.readyState!==0;}else{if(a.xdr&&a.conn){return a.conn.isCallInProgress(a.tId);}else{if(a.upload===true){return document.getElementById("yuiIO"+a.tId)?true:false;}else{return false;}}}},releaseObject:function(a){if(a&&a.conn){a.conn=null;a=null;}}};(function(){var g=YAHOO.util.Connect,h={};function d(i){var j='<object id="YUIConnectionSwf" type="application/x-shockwave-flash" data="'+i+'" width="0" height="0">'+'<param name="movie" value="'+i+'">'+'<param name="allowScriptAccess" value="always">'+"</object>",k=document.createElement("div");document.body.appendChild(k);k.innerHTML=j;}function b(l,i,j,n,k){h[parseInt(l.tId)]={"o":l,"c":n};if(k){n.method=i;n.data=k;}l.conn.send(j,n,l.tId);}function e(i){d(i);g._transport=document.getElementById("YUIConnectionSwf");}function c(){g.xdrReadyEvent.fire();}function a(j,i){if(j){g.startEvent.fire(j,i.argument);if(j.startEvent){j.startEvent.fire(j,i.argument);}}}function f(j){var k=h[j.tId].o,i=h[j.tId].c;if(j.statusText==="xdr:start"){a(k,i);return;}j.responseText=decodeURI(j.responseText);k.r=j;if(i.argument){k.r.argument=i.argument;}this.handleTransactionResponse(k,i,j.statusText==="xdr:abort"?true:false);delete h[j.tId];}g.xdr=b;g.swf=d;g.transport=e;g.xdrReadyEvent=new YAHOO.util.CustomEvent("xdrReady");g.xdrReady=c;g.handleXdrResponse=f;})();(function(){var e=YAHOO.util.Connect,g=YAHOO.util.Event,a=document.documentMode?document.documentMode:false;e._isFileUpload=false;e._formNode=null;e._sFormData=null;e._submitElementValue=null;e.uploadEvent=new YAHOO.util.CustomEvent("upload");e._hasSubmitListener=function(){if(g){g.addListener(document,"click",function(k){var j=g.getTarget(k),i=j.nodeName.toLowerCase();if((i==="input"||i==="button")&&(j.type&&j.type.toLowerCase()=="submit")){e._submitElementValue=encodeURIComponent(j.name)+"="+encodeURIComponent(j.value);}});return true;}return false;}();function h(w,r,m){var v,l,u,s,z,t=false,p=[],y=0,o,q,n,x,k;this.resetFormState();if(typeof w=="string"){v=(document.getElementById(w)||document.forms[w]);}else{if(typeof w=="object"){v=w;}else{return;}}if(r){this.createFrame(m?m:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=v;return;}for(o=0,q=v.elements.length;o<q;++o){l=v.elements[o];z=l.disabled;u=l.name;if(!z&&u){u=encodeURIComponent(u)+"=";s=encodeURIComponent(l.value);switch(l.type){case"select-one":if(l.selectedIndex>-1){k=l.options[l.selectedIndex];p[y++]=u+encodeURIComponent((k.attributes.value&&k.attributes.value.specified)?k.value:k.text);}break;case"select-multiple":if(l.selectedIndex>-1){for(n=l.selectedIndex,x=l.options.length;n<x;++n){k=l.options[n];if(k.selected){p[y++]=u+encodeURIComponent((k.attributes.value&&k.attributes.value.specified)?k.value:k.text);}}}break;case"radio":case"checkbox":if(l.checked){p[y++]=u+s;}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(t===false){if(this._hasSubmitListener&&this._submitElementValue){p[y++]=this._submitElementValue;}t=true;}break;default:p[y++]=u+s;}}}this._isFormSubmit=true;this._sFormData=p.join("&");this.initHeader("Content-Type",this._default_form_header);return this._sFormData;}function d(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";}function c(i){var j="yuiIO"+this._transaction_id,l=(a===9)?true:false,k;if(YAHOO.env.ua.ie&&!l){k=document.createElement('<iframe id="'+j+'" name="'+j+'" />');if(typeof i=="boolean"){k.src="javascript:false";}}else{k=document.createElement("iframe");k.id=j;k.name=j;}k.style.position="absolute";k.style.top="-1000px";k.style.left="-1000px";document.body.appendChild(k);}function f(j){var m=[],k=j.split("&"),l,n;for(l=0;l<k.length;l++){n=k[l].indexOf("=");if(n!=-1){m[l]=document.createElement("input");m[l].type="hidden";m[l].name=decodeURIComponent(k[l].substring(0,n));m[l].value=decodeURIComponent(k[l].substring(n+1));this._formNode.appendChild(m[l]);}}return m;}function b(m,y,n,l){var t="yuiIO"+m.tId,u="multipart/form-data",w=document.getElementById(t),p=(a>=8)?true:false,z=this,v=(y&&y.argument)?y.argument:null,x,s,k,r,j,q;j={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",n);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",t);if(YAHOO.env.ua.ie&&!p){this._formNode.setAttribute("encoding",u);}else{this._formNode.setAttribute("enctype",u);}if(l){x=this.appendPostData(l);}this._formNode.submit();this.startEvent.fire(m,v);if(m.startEvent){m.startEvent.fire(m,v);}if(y&&y.timeout){this._timeOut[m.tId]=window.setTimeout(function(){z.abort(m,y,true);},y.timeout);}if(x&&x.length>0){for(s=0;s<x.length;s++){this._formNode.removeChild(x[s]);}}for(k in j){if(YAHOO.lang.hasOwnProperty(j,k)){if(j[k]){this._formNode.setAttribute(k,j[k]);}else{this._formNode.removeAttribute(k);}}}this.resetFormState();
q=function(){var i,A,B;if(y&&y.timeout){window.clearTimeout(z._timeOut[m.tId]);delete z._timeOut[m.tId];}z.completeEvent.fire(m,v);if(m.completeEvent){m.completeEvent.fire(m,v);}r={tId:m.tId,argument:v};try{i=w.contentWindow.document.getElementsByTagName("body")[0];A=w.contentWindow.document.getElementsByTagName("pre")[0];if(i){if(A){B=A.textContent?A.textContent:A.innerText;}else{B=i.textContent?i.textContent:i.innerText;}}r.responseText=B;r.responseXML=w.contentWindow.document.XMLDocument?w.contentWindow.document.XMLDocument:w.contentWindow.document;}catch(o){}if(y&&y.upload){if(!y.scope){y.upload(r);}else{y.upload.apply(y.scope,[r]);}}z.uploadEvent.fire(r);if(m.uploadEvent){m.uploadEvent.fire(r);}g.removeListener(w,"load",q);setTimeout(function(){document.body.removeChild(w);z.releaseObject(m);},100);};g.addListener(w,"load",q);}e.setForm=h;e.resetFormState=d;e.createFrame=c;e.appendPostData=f;e.uploadFile=b;})();YAHOO.register("connection",YAHOO.util.Connect,{version:"2.9.0",build:"2800"});;
/* ------------- BEGIN jquery-1.7.1.min.js --------------- */;
/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);;
/* ------------- BEGIN jquery_utils.js --------------- */;
(function ($) {
    
    // Used for various feature sniffing.
    var dummyInputElement = document.createElement('input');
    
    // Renders the named template inside of the selected elements.
    $.fn.renderLiquid = function (templateName, hash) {
        return this.each(function () {
            Templ.renderElem(this, templateName, hash);
        });
    };
    
    // Renders the named template inside of the selected tr elements.
    // most elements would render using the above .renderLiquid
    // except in ie where table.innerHTML is read only
    $.fn.renderLiquidTableRow = function (templateName, hash) {
        return this.each(function () {
            Templ.renderTableRow(this, templateName, hash);
        });
    };

    // Disables the selected form elements. Pass false to enable the elements.
    $.fn.disable = function (disable) {
        if (disable === undefined || disable) {
            this.attr('disabled', 'disabled')
                .closest('label').addClass('disabled');
        }
        else {
            this.removeAttr('disabled')
                .closest('label').removeClass('disabled');
        }
        return this;
    };
    
    // Unlike toggle(), slideToggle() doesn't let us pass a boolean, so this works around that.
    $.fn.slideToggleBool = function (show, duration, easing, callback) {
        // If the item is invisible due to a parent element being hidden, then slideUp doesn't do anything, which means this element's display property is maintained and will become visible if the parent is subsequently shown. For this special case, call hide() (sans animation).
        if (this.is(':hidden') && !show) {
            return this.hide();
        }
        else {
            return this[show ? 'slideDown' : 'slideUp'](duration, easing, callback);
        }
    };
    
    // Returns true iff this or an ancestor has the given CSS class.
    $.fn.ancestorHasClass = function (className) {
        return this.hasClass(className) || this.closest('.' + className).length > 0;
    };
    
    // Toggles the given class on the parent element when this element is clicked.
    // The class is removed if any other part of the document is clicked.
    // This is useful for setting up simple pull-down menus by triggering CSS display based on
    // the class of the parent.
    $.fn.toggleParentClassOnClick = function (parentClass, selectedClass) {
        selectedClass = selectedClass || 'selected';
        return this.on('mousedown touchdown', function () {
            var $this = $(this),
                $parent = parentClass ? $this.closest(parentClass) : $this.parent();
            if ($parent.hasClass(selectedClass)) {
                deselect();
            }
            else {
                $parent.addClass(selectedClass);
                $this.on('mouseout.toggleParentClassOnClick mouseup.toggleParentClassOnClick touchup.toggleParentClassOnClick', function () {
                    $(this).off('.toggleParentClassOnClick');
                    setTimeout(function () {
                        $(document).on('click.toggleParentClassOnClick', function () {
                            deselect();
                        });
                    }, 0);
                });
            }
            
            function deselect() {
                $parent.removeClass(selectedClass);
                $this.off('.toggleParentClassOnClick');
                $(document).off('.toggleParentClassOnClick');
            }
            return false;
        });
    };
    
    /*  $.requiredAsterisk([required])
        
        Inserts a span before the matched elements with class .required-asterisk and an asterisk character
        that fades in and out when the user enters or deletes text from the input.
        The 'required' argument defaults to true.
    */
    $.fn.requiredAsterisk = function (required) {
        if (typeof required === 'undefined') required = true;
        
        return this.each(function () {
            var $this = $(this),
                context = $this.closest('.jquery-placeholder-wrapper')[0] || $this,
                $asterisk = $(context).siblings('.required-asterisk');
            if ($asterisk.length === 0) {
                $asterisk = $('<span class="required-asterisk">*</span>')
                                .insertBefore(context);
            }
            
            update();
            $this
                .off('.requiredAsterisk')
                .textInput('.requiredAsterisk', update);
            
            function update() {
                var show = required && $this.val() === '';
                $asterisk.fadeTo('fast', show ? 1 : 0);
            }
        });
    };

    /*  $.support.oninput
        Tells you if this browser supports the 'input' event well.  It's an event that fires wherever the contents
        of an <input> element changes, regardless of how the user made the change.

        IE9 doesn't fire this event after deletion, so we'll pretend it doesn't support it.
    */
    $.support.oninput = 'oninput' in dummyInputElement && !(Browser.type === 'ie' && Browser.version[0] <= 9);

    /*  $.fn.simulateInputEvents([selector])

        Generates fake 'input' events on the descendant text fields using the tradition (pre-html5) key events,
        keypress, keydown, keyup, paste, cut.  This is an alternative to using $.fn.textInput() defined below.
        The advantage is that you can use 'input' elements cross-browser, which is useful for knockout when
        using valueUpdate:'input' bindings.  The disadvantage is that the delegate event handler this method
        attaches is less efficient because it relies on bubbling, and will fail if the child element prevents
        relevant events from bubbling.

        The selector argument defaults to 'input[type=text],textarea'.
    */
    $.fn.simulateInputEvents = function (selector) {
        if ($.support.oninput) {
            Log.warn('Ignoring $.fn.simulateInputEvents() because this browser supports the input event natively.');
            return;
        }
        if (this.data('simulateInputEvents-attached')) {
            Log.warn('$.fn.simulateInputEvents() already attached to', this);
            return;
        }
        this.data('simulateInputEvents-attached', true);
        
        var timeout = null;
        function triggerInput(event) {
            // Coalesce multiple calls into the handler within the same tick.
            // Technically, we'd want separate timeouts for each element that fires the event,
            // but in practice a user can't trigger text change events in multiple targets in the same tick.
            if (timeout) return;
            
            var element = this;
            timeout = setTimeout(function () {
                $(element).trigger('input');
                timeout = null;
            }, 0);
        }
        if (!selector) selector = 'input[type=text],textarea';
        return this.on('keydown keypress keyup paste cut', selector, triggerInput);
    }
    
    /*  $.textInput([eventNamespace,] handler)
        
        Binds handler to various events that can cause a text input or textarea element to change its value.
        HTML5 provides the 'input' event that does this perfectly, but this method also works with browsers
        that don't support this event by using keydown, paste and cut.
        
        The handler is called asynchronously after the event is actually delivered because some browsers
        don't update the element's value until after the event handler runs.
        
        The eventNamespace argument is optional; if provided, you can unbind the handler by using the same
        namespace to $.off().
    */
    $.fn.textInput = function (eventNamespace, handler) {
        if (typeof handler === 'undefined') {
            handler = eventNamespace;
            eventNamespace = '';
        }
        else if (eventNamespace[0] !== '.') {
            eventNamespace = '.' + eventNamespace;
        }
        
        var timeout = null;
        function fireHandler(event) {
            // Coalesce multiple calls into the handler within the same tick.
            if (timeout) return;
            
            var self = this;
            timeout = setTimeout(function () {
                handler.call(self, event);
                timeout = null;
            }, 0);
        }
        
        if ($.support.oninput) {
            this.on('input' + eventNamespace, fireHandler);
        }
        else {
            var events = ['keydown', 'keypress', 'keyup', 'paste', 'cut'];
            for (var i = 0; i < events.length; i++) {
                this.on(events[i] + eventNamespace, fireHandler);
            }
        }
        
        return this;
    };
    
    /*  placeholder()
        
        This is like FieldHints (from utils.js). The layout code from that wasn't working well with
        edit_album_v2 text fields so this is a reimplementation that uses just the 'top' and 'left'
        CSS properties to position the hint, as opposed to copying padding/margin/border. Also,
        instead of hiding the hint on focus, this hides after some text is inputted.
    */
    $.support.placeholder = 'placeholder' in dummyInputElement;
    
    var STYLES_TO_COPY = ['font-size', 'font-family', 'font-weight'];
    var SIDES = ['top', 'left', 'right'];
    
    $.fn.placeholder = function () {
        return this.each(function () {
            var $this = $(this);
            if ($.support.placeholder &&
                !$this.hasClass('force-placeholder-wrapper') &&
                // Safari <6 doesn't word-wrap textarea placeholder, so do the hack for that.
                !($this.is('textarea') && Browser.make === 'safari' && Browser.version[0] < 6)) {
                return true;
            }
            
            // If we're already wrapped, we'll reuse the wrapper but create a new hint element.
            var $wrapper;
            if ($this.parent().hasClass('jquery-placeholder-wrapper')) {
                $wrapper = $this.parent();
                $wrapper.children('.jquery-placeholder-hint').remove();
            }
            else {
                $wrapper = $('<div/>')
                            .addClass('jquery-placeholder-wrapper')
                            .css({
                                display: $this.css('display') === 'block' ? 'block' : 'inline-block',
                                position: 'relative'
                            });
                $this.wrap($wrapper);
            }
            
            var hintText = $this.attr('placeholder');
            if (typeof hintText === 'undefined') {
                hintText = $this.data('placeholder') || '';
            }
            var $hint = $('<span/>')
                    .addClass('jquery-placeholder-hint controlHint')
                    .text(hintText)
                    .css('position', 'absolute')
                    .click(function () {
                        $this.focus();
                        return false;
                    })
                    .toggle($this.val().length === 0)
                    .each(function () { Dom.setUnselectable(this); })
                    .insertBefore($this);
            for (var i = 0; i < STYLES_TO_COPY.length; i++) {
                var style = STYLES_TO_COPY[i];
                $hint.css(style, $this.css(style));
            }
            var lineHeight = $this.css('line-height');
            if (lineHeight && lineHeight != 1) {
                $hint.css('line-height', lineHeight);
            }

            // Add up the margin, padding, and border width for each side.
            for (var i = 0; i < SIDES.length; i++) {
                var side = SIDES[i];
                $hint
                    .css(side, '0')
                    .css(side, '+=' + $this.css('margin-' + side))
                    .css(side, '+=' + $this.css('padding-' + side))
                    .css(side, '+=' + $this.css('border-' + side + '-width'));
            }
            
            // Browser-specific hacks.
            if (Browser.type === 'webkit' && $this.is('input')) {
                $hint.css('left', '+=1px');
            }
            else if (Browser.type === 'gecko') {
                $hint.css('left', '+=1px');
            }
            else if (Browser.type === 'ie') {
            }
            
            $this
                // Unset the placeholder attribute and stash it away in data, so native placeholder doesn't overlap our hint element.
                .removeAttr('placeholder')
                .data('placeholder', hintText)
                // Set up event listeners to show/hide the hint when text is entered.
                .off('.placeholder')
                .textInput('.placeholder', function () {
                    $hint.toggle($this.val().length === 0);
                });
        });
    };
    
    $.fn.getPath = function () {
        if (this.length != 1) throw 'jquery requires an element';

        var path, node = this;
        while (node.length) {
            var realNode = node[0];
            var name = realNode.localName;
            
            if (!name) break;
            name = name.toLowerCase();
            
            if (realNode.id) {
                // As soon as an id is found, there's no need to specify more.
                return name + '#' + realNode.id + (path ? '>' + path : '');
            }

            var parent = node.parent();

            var siblings = parent.children(name);
            if (siblings.length > 1) name += ':eq(' + siblings.index(realNode) + ')';

            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path;
    };

    $.showMask = function (options) {
        options = $.extend({
                z: 1,
                color: 'white',
                duration: 'fast',
                opacity: 0.5,
                then: $.noop
            }, options || {});
        return $('<div>')
            .css({
                'z-index': options.z,
                'background-color': options.color,
                'opacity': 0,
                'width': '100%',
                'height': '100%',
                'position': 'fixed'
            })
            .prependTo('body')
            .fadeTo(options.speed, options.opacity, options.then);
    };

    // Load a script file without cache-busting
    $.cachedScript = function(url, options) {
        options = $.extend(options || {}, {
            url: url,
            dataType: "script",
            cache: true
        });

        return $.ajax(options);
    };

    /* $.fn.bc_tooltips()
        Our own tooltips-on-hover implementation for collections of elements displayed together in a container.
        This should be called on the container element(s).  The hover delay is "shared" across all of the item
        elements, so that once a tooltip is shown, there's no delay when mousing over to other tooltipped elements
        within the container.

        Options:
            itemSelector - a string specifying the items that can be hovered over
            tooltipSelector - a string specifying the tooltip elements, relative to the hovered item
            delay - delay before showing tooltip on hover (ms)
            reset - delay before the delay is reset after (ms)
            fadeIn - duration for fade in effect (ms)
            fadeOut - duration for fade out effect (ms)
    */
    $.fn.bc_tooltips = function (options) {
        options = $.extend({}, {
                itemSelector: '.item',
                tooltipSelector: '.tooltip',
                delay: 500,
                reset: 500,
                fadeIn: 100,
                fadeOut: 100
            },
            options);

        $(options.itemSelector, this).hover(enter, leave);

        var delaySatisfied = false,
            hoverTimeout = null,
            resetTimeout = null;
        function enter() {
            if (resetTimeout) {
                clearTimeout(resetTimeout);
                resetTimeout = null;
            }

            var $tooltip = $(options.tooltipSelector, this);
            $('.lazy', $tooltip).trigger('appear');
            if (delaySatisfied) {
                $tooltip.css('z-index', 2).show();
            }
            else {
                hoverTimeout = setTimeout(function () {
                    hoverTimeout = null;
                    delaySatisfied = true;
                    $tooltip.fadeIn(options.fadeIn);
                }, options.delay);
            }
        }
        function leave() {
            $(options.tooltipSelector, this).css('z-index', '').fadeOut(options.fadeOut);
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
            resetTimeout = setTimeout(function () {
                resetTimeout = null;
                delaySatisfied = false;
            }, options.reset);
        }
    };

    /* strftime */
    var strftime_pad = function(x, str, r) {
        x = x.toString();
        for ( ; parseInt(x, 10) < r && r > 1; r /= 10)
            x = str + x;
        return x;
    };

    var strftime_tables = {
        a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        B: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        p: ['AM', 'PM'],
        P: ['A', 'P']
    };

    /* See Ruby's Time.strftime for documentation of formats. */
    var strftime_formats = {
        'a': function(d) { return strftime_tables.a[d.getUTCDay()] },
        'A': function(d) { return strftime_tables.A[d.getUTCDay()] },
        'b': function(d) { return strftime_tables.b[d.getUTCMonth()] },
        'B': function(d) { return strftime_tables.B[d.getUTCMonth()] },
        'd': function(d) { return strftime_pad(d.getUTCDate(), '0', 10) },
        'e': function(d) { return strftime_pad(d.getUTCDate(), ' ', 10) },
        'H': function(d) { return strftime_pad(d.getUTCHours(), '0', 10) },
        'I': function(d) {
                var I = d.getUTCHours() % 12;
                return strftime_pad(I === 0 ? 12 : I, '0', 10);
            },
        'j': function(d) {
                var ms = d - new Date(d.getUTCFullYear() + '/1/1 GMT');
                /* ms += d.getTimezoneOffset()*60000;  assume UTC */
                var doy = parseInt(ms/60000/60/24, 10)+1;
                return strftime_pad(doy, '0', 100);
            },
        'l': function(d) {
                var I = d.getUTCHours() % 12;
                return I === 0 ? 12 : I;
                /*return strftime_pad(I === 0 ? 12 : I, '0', 10);*/
            },
        'm': function(d) { return strftime_pad(d.getUTCMonth()+1, '0', 10) },
        'M': function(d) { return strftime_pad(d.getUTCMinutes(), '0', 10) },
        'p': function(d) { return strftime_tables.p[d.getUTCHours() >= 12 ? 1 : 0] },
        'P': function(d) { return strftime_tables.P[d.getUTCHours() >= 12 ? 1 : 0] },
        's': function(d) { return parseInt(d.getTime() / 1000) },
        'S': function(d) { return strftime_pad(d.getUTCSeconds(), '0', 10) },
        'u': function(d) {
                var dow = d.getUTCDay();
                return dow === 0 ? 7 : dow;
            },
        'U': function(d) {
                var doy = parseInt(strftime_formats.j(d), 10);
                var rdow = 6 - d.getUTCDay();
                var woy = parseInt((doy + rdow) / 7, 10);
                return strftime_pad(woy, '0', 10);
            },
        'w': function(d) { return d.getUTCDay().toString() },
        'W': function(d) {
                var doy = parseInt(strftime_formats.j(d), 10);
                var rdow = 7 - strftime_formats.u(d);
                var woy = parseInt((doy + rdow) / 7, 10);
                return strftime_pad(woy, '0', 10);
            },
        'y': function(d) { return strftime_pad(d.getUTCFullYear() % 100, '0', 10) },
        'Y': function(d) { return d.getUTCFullYear().toString() },
        'Z': function(d) { return "UTC" },  /* assume UTC; use Ruby's abbrev. */
        '%': function(d) { return '%'; }
        /* some have been removed in order to exactly match Ruby's strftime */
    };

    var strftime_aggregates = {
        'c': '%a %b %e %X %Y',
        'x': '%m/%d/%y',
        'X': '%H:%M:%S'
        /* some have been removed in order to exactly match Ruby's strftime */
    };

    $.strftime = function(date, fmt) {
        /* first replace aggregates */
        while (fmt.match(/%[cxX]/)) {
            fmt = fmt.replace(/%([cxX])/g, function(m0, m1) {return strftime_aggregates[m1]});
        }
        /* then replace formats */
        return fmt.replace(/%([aAbBdeHIjlmMpPsSuUwWyYzZ%])/g, function(m0, m1) {return strftime_formats[m1](date)});
    };

})(jQuery);
;
/* ------------- BEGIN utils_boot.js --------------- */;
// Copyright 2008 Bandcamp, Inc. All rights reserved.

/////////////////////////////////////////////////////////////
/// Utility APIs: bootstrap (early load)
///

var Y = null;
try { Y = YAHOO; } catch(e){};

// U is some very basic utilities that have historically
// been provided by YUI.
var U = {
    _jquery : null,

    // U.jQuery() tests to see if jquery is present
    // safely and caches the result so we don't have to
    // potentially rescue that exception constantly
    jQuery : function() {
        if ( U._jquery === null ) {
            try {
                U._jquery = jQuery;
            } catch (err) {
                U._jquery = false;
            }
        }
        return U._jquery;
    },

    // From here down are shims for things we used to call in YUI
    // which work in both YUI or jQuery environments.  If both are
    // present, the jQuery path will be used.
    trim : function(str) {
        if ( U.jQuery() )
            return jQuery.trim(str);
        else
            return Y.lang.trim(str);
    },

    isObject : function( o ) {
        if ( U.jQuery() )
            return jQuery.isPlainObject(o);
        else
            return Y.lang.isObject(o);
    },

    augmentObject : function( r, s, args ) {
        // note: simplistic implementation here which
        // assumes flat simple hashes.
        if ( !args ) {
            for(var k in s) {
                r[k] = s[k];
            }
        } else {
            for(var i in args) {
                var key = args[i];
                r[key] = s[key];
            }
        }
    },

    isString : function( o ) {
        return typeof o === "string";
    },

    isNumber : function( o ) {
        return typeof o === "number" && isFinite(o);
    },

    isArray : function( o ) {
        if ( U.jQuery() )
            return jQuery.isArray(o);
        else
            return Y.lang.isArray(o);
    },

    elt : function( e ) {
        // provided here for compatibility.  if we're using jquery this is deprecated
        if ( U.jQuery() )
            if( U.isString(e) ) {
                e = e.replace(/\./g, "\\.");
                return $("#" + e.toString()).get(0);
            } else {
                return $(e).get(0);
            }
        else
            return Y.util.Dom.get( e );
    },

    merge : function( args ) {
        var argarray = [ {} ];
        for(var i=0; i<arguments.length; i++) { argarray.push(arguments[i]); }
        if ( U.jQuery() ) {
            return $.extend.apply( $, argarray );
        } else {
            return Y.lang.merge.apply( Y.lang, argarray );
        }
    },

    addClass : function( elem, classname ) {
        if ( U.jQuery() ) {
            $(elem).addClass( classname );
        } else {
            Y.util.Dom.addClass( elem, classname );
        }
    },

    removeClass : function( elem, classname ) {
        if ( U.jQuery() ) {
            $(elem).removeClass( classname );
        } else {
            Y.util.Dom.removeClass( elem, classname );
        }
    },

    stopEvent : function(e) {
        if ( U.jQuery() ) {
            var evt = $.Event(e);
            evt.stopPropagation();
            evt.preventDefault();
        } else {
            Y.util.Event.stopEvent(e);
        }
    }
};

function $assert( expr, msg ) {
    //sdg TODO: replace the alert with a logged message?
    //sdg TODO: strip out all assert calls in production build?
    //sdg TODO: replace with Y.util.Assert?
    if ( !expr ) {
        if ( msg == null )
            msg = "";
        var skipDebug = confirm( "Assertion failed. " + msg + "\n\nSelect Cancel to debug." ); //i18n ok
        if ( !skipDebug )
            eval( 'debugger' ); // avoid syntax errors in browsers which don't support this keyword
    }
}

var LogAll = function(level, msg /*, ... */) {

    var d = new Date();
    var ms = d.getMilliseconds().toString();
    while ( ms.length < 3 ) ms = "0" + ms;
    var timestamp = d.toTimeString().substring(0,8) + "." + ms + ":";
    
    var args = Array.prototype.slice.call(arguments, 1);
    args.unshift(timestamp);
    
    // Send it to an alternate logger if available (generally dev only) as well as the system one
    // Yeah, it would be great to register listeners instead, some day...
    if (typeof LogView != "undefined") {
        LogView.add( args.join(' ') );
    }

    // args.join(' ') on iphone throws TypeError.  Not sure why.  Special case here for now.
    if (Browser.platform == "iphone") {
        var str = "";
        var sep = "";
        for(var x in args) {
            str += sep + args[x];
            sep = " ";
        }
        console.log(str);
        return;
    }

    if (typeof console == "undefined") return;
    var logFn = console[level] || console.log;

    // IE <=9's console.log is not a real JS object and lacks apply(), so join the args and call with single arg.
    if (typeof logFn === 'object') {
        logFn(args.join(' '));
    }
    else {
        logFn.apply(console, args)
    }
};

LogAll.proxy = function( level ) {
    return function(msg /*, ... */) {
        try {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(level);
            LogAll.apply( Log, args );
        }
        catch (e) {;} // just in case
    };
};

var Log = {
    debug : LogAll.proxy("log"),
    info : LogAll.proxy("info"),
    note : LogAll.proxy("info"),
    warn : LogAll.proxy("warn"),
    error : LogAll.proxy("error"),

    flash : function(msg) {
        // flash log messages come through escape()'d to Log.flash to avoid problems with
        // the fact that the strings are serialized and then eval()'d, so if they contain e.g.
        // quotation marks, they can cause problems
        Log.debug("Flash: " + unescape(msg));
    },

    server : function(msg, lvl, isException) {
        // Does not use other utils, to be as independent/available as possible
        // Also does not use XHR/POST, maybe it should. -- kj
        lvl = lvl || "info";

        Log.debug( "about to send server log entry: " + lvl + ": " + msg )

        var bcn = document.createElement('img');
        bcn.style.display = "none";
        // Closures prevent garbage-collection
        bcn.onload = function() { 
                var e;
                // ran into a problem where a script error in here would
                // break all future YUI dialogs (?!?).  Bullet-proofing:
                try {
                    Log.debug( "server log entry success: " + lvl + ": " + msg )
                    bcn.onload = bcn.onerror = null;
                    bcn = null; // break closure
                } catch ( e ) { }
            };
        bcn.onerror = function() { 
                var e;
                // ran into a problem where a script error in here would
                // break all future YUI dialogs (?!?).  Bullet-proofing:
                try {
                    Log.debug( "server log entry error: " + lvl + ": " + msg )
                    bcn.onload = bcn.onerror = null;
                    bcn = null; // break closure
                } catch ( e ) { }
            };

        bcn.src = "/client_log" +
                     "?exc=" + (isException ? "1" : "0") +
                     "&msg=" + encodeURIComponent(msg.substring(0,1000)) + 
                     "&lvl=" + encodeURIComponent(lvl) +
                     "&r=" + Math.random().toString().substring(2);

        bcn = null; // break closure
    }
};

// Logs uncaught client-side errors to the server, with batching. Doesn't rely on any utilities other than 
// Log.server and Url. See "Client-side Error Collection" wiki page for more details.
var ErrorCollector;
ErrorCollector = ( function(exports) {

    var defaults = {
            enabled: true,    // set to false to disable logging
            sampleRate: null, // a number between 0 and 1, representing the % of pages which should have errors logged
            maxBatchSize: 3,  // don't beacon more than this many errors at a time
            maxBatches: 3,    // don't beacon more than this many times
            saveDelay: 5000   // the minimum delay in ms between saves; errors will be buffered
        },
        errors = [],
        lastSave = 0,
        batchCount = 0,
        errorCount = 0,
        timer = null,
        domready = '';

    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop) && !exports.hasOwnProperty(prop))
            exports[prop] = defaults[prop];
    }

    if (exports.enabled && (exports.sampleRate != null) && (Math.random() > exports.sampleRate)) {
        Log.debug("ErrorCollector: disabled due to sample rate");
        exports.enabled = false;
    }
    else
        Log.debug("ErrorCollector: " + (exports.enabled ? "enabled" : "disabled"));

    if (window.$) {
        domready = 0;
        $(document).ready( function() { domready = 1; } );
    }

    exports.add = function( msg, scriptURL, line ) {
        if (isActive()) {
            var data = filter(msg, scriptURL, line);
            if (data) {
                errors.push(data);
                flush();
            }
            else
                Log.debug("ErrorCollector: skipping runtime error");
        }
    };

    function filter(msg, scriptURL, line) {
        if (!msg) 
            return null;

        // Some versions of android browser (and others) appear to give us an Event object here. So far I don't
        // see any evidence that the object contains any useful error information. Log them anyway.
        if (msg.toString() == "[object Event]") {
            msg = msg.message || msg.msg || msg.toString();
            scriptURL= scriptURL || msg.filename || msg.file || '';
            var normalize = function(val) { return val === 0 ? new Number(0) : val; };
            line = normalize(line) || normalize(msg.lineno) || normalize(msg.line) || '';
        }

        // Skip non-BC scripts (both those we include, and those included by browser plugins and other cruft)
        if (scriptURL) {
            var scriptHost = Url.toHash(scriptURL).host, pageHost = location.host;
            if (!scriptHost)  // some scripts in the wild use file: URLs
                return null;
            if ( !/(^|\.)(bandcamp\.com|bcbits\.com)$/.test(scriptHost) ) {  // !prod
                var idx = pageHost.length - scriptHost.length;
                if ( (idx < 0) || (pageHost.lastIndexOf(scriptHost) != idx) )  // !dev
                    return null;
            }
        }

        // This error appears to be common in FF when a SWF is loaded in an iframe. It seems harmless. We see it from 
        // both embedded players and the FB tab. See http://www-01.ibm.com/support/docview.wss?uid=swg21370430
        if ( Browser.type == "gecko" && line == 0 &&
                ( /Permission denied to access property 'toString'/.test(msg) || /Location\.toString/.test(msg) ) )
            return null;

        var pageURL = location.href;
        if (scriptURL == pageURL)
            pageURL = "---"; // save some space in the URL

        var scripts = [], jsb = window._jsb;
        if (jsb) {
            var len = Math.min(jsb.length, 20);
            for (var i=0; i < len; i++)
                scripts.push( jsb[i].n + ":" + (jsb[i].c || 0) );
            if (len < jsb.length)
                scripts.unshift("(omitted " + (jsb.length - len) + ")");
        }
        scripts = scripts.join(",");

        return [msg, scriptURL, line, pageURL, ++errorCount, domready, scripts];
    }

    function flush() {
        if (!timer) {
            // wait at least 250ms, in case another error immediately follows
            var delay = Math.max( lastSave + exports.saveDelay - new Date().getTime(), 250 );
            timer = setTimeout(save, delay);
        }
    }

    function save() {
        clearTimeout(timer);
        timer = null;
        if (!isActive() || !errors.length)
            return;
        var out = [],
            len = Math.min(errors.length, exports.maxBatchSize);
        // We tab-delimit the data. Avoiding JSON because the text can be truncated in Server.log, or by the browser.
        for (var i=0; i < len; i++)
            out.push( errors[i].join("\t") );
        Log.server( out.join("\n"), "debug", true );
        lastSave = new Date().getTime();
        errors.length = 0;
        batchCount++;
    }

    function isActive() {
        return exports.enabled && (batchCount < exports.maxBatches);
    }

    if (exports.enabled)
        window.onerror = exports.add;

    return exports;

} )( ErrorCollector || {} );

// --------------------------------------------------

// Subscribe to YAHOO Logger and echo their "error" msgs to our logger
if (Y && Y.widget && Y.widget.Logger) {
    Y.widget.Logger.newLogEvent.subscribe(function(type, args, obj) {
        var logMsg = args[0];
        if (logMsg.category == "error")
            Log.error("YUI " + logMsg.source + ": " + logMsg.msg);
    });
}

// Object.create polyfill
if ( !Object.create ) {
    Object.create = function(o) {
        if ( arguments.length > 1 ) {
            var msg = "Object.create polyfill only supports one parameter";
            Log.error( msg );
            throw new Error(msg);
        }
        var F = function(){};
        F.prototype = o;
        return new F();
    };
}

// Reproduces some ruby-like iteration routines. 
// Currently supports arrays only.
var Iter = {
    
	// To each element of array (a), apply function (f) 
	// If f(a[i]) returns a truthy value, return it (and cease further iteration)
	each : function (a, f) {
		var i = 0, v = null;
		for (i = 0; i < a.length; i++) {
			v = f(a[i]);
			if (v) return v; // stop iteration
		}
	},
	
    // Calls fn one time for each element in arr; returns a new
    // array with the fn return values.
    collect: function( arr, fn ) {
        if ( !fn )
            fn = function( item ) { return item; }; // default: array copy
        var len = arr.length;
        var out = new Array(len);
        for ( var i=0; i < len; i++ )
            out[i] = fn( arr[i] );
        return out;
    },
    
    // Returns the first arr element for which fn returns true, or null.
    find: function( arr, fn ) {
        var len = arr.length;
        for ( var i=0; i < len; i++ ) {
            if ( fn( arr[i] ) )
                return arr[i];
        }
        return null;
    },
    
    // Returns a new array containing all the entries of the array for which
    // fn returns true.
    findAll: function( arr, fn ) {
        var len = arr.length;
        var out = [];
        for ( var i=0; i < len; i++ ) {
            var entry = arr[i];
            if ( fn( entry ) )
                out.push( entry );
        }
        return out;
    },
    
    index: function ( arr, item ) {
        if (typeof arr.indexOf === 'function') return arr.indexOf(item);
        
        var len = arr.length;
        for ( var i = 0; i < len; i++ ) {
            if (arr[i] == item) return i;
        }
        return -1;
    },

    reduce: function (arr, fn, initialValue) {
        'use strict';

        // Use native implementation if available.
        if ('function' === typeof arr.reduce) {
            if (arguments.length < 3) return arr.reduce(fn);
            else return arr.reduce(fn, initialValue);
        }

        var prevValue = initialValue,
            i = 0,
            len = arr.length;

        if (arguments.length < 3) {
            while (i < len && !(i in arr)) i++;
            if (i >= len) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            prevValue = arr[i++];
        }

        for (; i < len; i++) {
            if (i in arr) prevValue = fn(prevValue, arr[i], i, arr);
        }
        return prevValue;
    }
};

var Text = {
        
    notEmpty : function( str ) {
        return str != null && str.toString().length > 0;
    },
    
    // returns the first non-null, non-empty string argument, or ""
    collate: function( /* str1, str2, ... */) {
        for ( var i=0; i < arguments.length; i++ ) {
            var str = arguments[i];
            if ( Text.notEmpty( str ) )
                return str;
        }
        return "";
    },
        
    escapeHtml: function( str ) {
        str = str.toString();
        return str.replace( /&/g, "&amp;" )
                  .replace( /</g, "&lt;" )
                  .replace( />/g, "&gt;" )
                  .replace( /"/g, "&quot;" )
                  .replace( /'/g, "&#39;" );
    },
    
    unescapeHtml: function( str ) {
        var unescape_div = document.createElement('div');
        unescape_div.innerHTML = str;
        return unescape_div.firstChild.nodeValue;
    },
        
    // Given a string and a matching substring, wraps the substring
    // with pre and post. Useful for wrapping tags around search matches.
    markupMatch: function( str, match, pre, post, caseSensitive ) {
    
        // I'm going to avoid using a regex to do a replace, as the match could
        // be user data and would need to be escaped.
        var matchIndex = !caseSensitive ?
                            str.toLowerCase().indexOf( match.toLowerCase() ) :
                            str.indexOf( match );
        if ( matchIndex == -1 )
            return str; // match not found
        
        return [ str.substr( 0, matchIndex ),
                 pre,
                 str.substr( matchIndex, match.length ),
                 post,
                 str.substr( matchIndex + match.length )
               ].join("");    
    },
    
    regexpEscape: function( str ) {
        return str.replace( /([\\\^\$\*\+\?\.\,\:\!\|\(\)\[\]\{\}])/g, "\\$1" );
    },
    
    // This should match the behavior of utf8_truncate on the server.
    truncate: function( str, len, ellipsis ) {
        if ( !str )
            return "";
        if ( len == null )
            len = 50;
        if ( ellipsis == null )
            ellipsis = "";
        if ( str.length <= len )
            return str;
        // conforming to 'len' is higher-priority than adding the ellipsis
        if ( ellipsis.length > len )
            return "";
        len = Math.max( 0, len - ellipsis.length );
        return str.substr( 0, len ) + ellipsis;
    }    
};

var Url = {
    
    // Matches a http or https URL, including relative, absolute, and fully-
    // qualified variations. This pattern is designed to output matching sub-
    // expressions close to what the browser provides in the window.location 
    // object. The differences between this regexp's output and the location 
    // object (that I know of) are:
    //
    //    - non-existent fields will return undefined, instead of ""
    //    - if you specify a URL without a path (like http://clubwiki.org), then 
    //      this regexp will return undef for the pathname, whereas the location 
    //      object would report "/".
    //
    // Note that this pattern will match any string, even "" (a random string
    // is considered a URL with a relative path).
    //
    // Many attempts have been made to write regexps to match URLs. All have failed,
    // until this one! Ha, ha ha ha ha ha ha! Ha. Burp.
    // 
    // $1: protocol: "http:" or undef
    // $2: hostname: "www.clubwiki.org" or undef
    // $3: port: "7000" or undef
    // $4: pathname: "/foo/bar" or "/" or undef
    // $5: search: "?blah=hey", or undef if there's no "?" followed by something
    // $6: hash: "#something", or undef if there's no "#" followed by something
    PATTERN_URL: /^(?:(https?\:)\/\/([^\:\/\?#]+)(?:\:(\d+))?)?(\/?[^\?#]*)?(?:\?|(\?[^#]*))?(?:#|(#.*))?$/,
    
    // Given a URL of any form (fully-qualified, absolute, relative), returns a
    // hash object similar to the browser's location object. The properties are the 
    // same, and missing fields are normalized to "" (except pathname, which is 
    // normalized to "/").
    toHash: function( url ) {
        
        // It might be nice to accept an optional baseUrl parameter that would 
        // fully-qualify the output for a relative URL.
    
        url = U.trim( url );
        var matches = Url.PATTERN_URL.exec( url ) || []; // "||": failsafe; shouldn't be needed
        return {
            href:     matches[0] || "",
            protocol: matches[1] || "",
            host:   ( matches[2] || "" ) + ( matches[3] ? ":" + matches[3] : "" ),
            hostname: matches[2] || "",
            port:     matches[3] || "",
            pathname: matches[4] || "/",
            search:   matches[5] || "",
            hash:     matches[6] || ""
        };
    },
    
    // The inverse of toHash: accepts a hash object and returns the full href.
    fromHash: function( urlHash ) {
        
        $assert( U.isObject( urlHash ) );
        var out = [];
        if ( urlHash.protocol )
            out.push( urlHash.protocol, "//" );
        if ( urlHash.hostname )
            out.push( urlHash.hostname );
        if ( urlHash.port )
            out.push( ":", urlHash.port );
        if ( urlHash.pathname )
            out.push( urlHash.pathname );
        if ( urlHash.search )
            out.push( urlHash.search );
        if ( urlHash.hash )
            out.push( urlHash.hash );
        return out.join("");
    },
    
    // Returns true if the given URL points to the same protocol, hostname and port
    // as the current page. The url can be a string or a hash returned by Url.toHash.
    isLocal: function( url ) {
        var urlHash = Url._hashify( url );
        if ( window.FacebookData ) {
            // for the facebook app, the conditions are relaxed, as the current doc's location will
            // only be bandcamp.com, while the clicked url might be subdomain.bandcamp.com.  In that
            // case, if the location host is the terminal part of the url host, I consider it local 
            // (so subdomain.bandcamp.com/album/... can get intercepted and directed to 
            // bandcamp.com/fb_tab/album/....)
            // There's a similar problem with the protocol. It can be the case that the location 
            // protocal on FB is https. A simple click should be "local", that is, intercepted by 
            // the client-side controller and kept on https://,  even though the url is written as 
            // http -- and in that way, a right click or ctrl click continues to take the user to
            // to http://subdomain.bandcamp.com 
            if ( urlHash.protocol == location.protocol && urlHash.host == location.host )
                return true;
                
            var re = new RegExp( location.host + "$");
            if ( urlHash.host.match( re ) ) {
                return true;
            }
            
            return false;
            
        } else {
            return ( urlHash.protocol == location.protocol && urlHash.host == location.host );   
        }   
    },
    
    // Returns true if the given URL appears to be fully-qualified.
    isFullyQualified: function( url ) {
        var urlHash = Url._hashify( url );
        return ( urlHash.protocol && urlHash.host );
    }, 
    
    // Returns true if the two URLs point to the same resource. Note that this
    // does not mean they are identical as strings (one could end with "/", another
    // with "?", and they'd still be equal).
    // skipHash: if true, the hash portion is ignored during the comparison
    equals: function( urlA, urlB, skipHash ) {
        var hashA = Url._hashify( urlA );
        var hashB = Url._hashify( urlB );
        return ( 
            hashA.protocol       == hashB.protocol &&
            hashA.hostname       == hashB.hostname &&
            ( hashA.port || 80 ) == ( hashB.port || 80 ) &&
            hashA.pathname       == hashB.pathname &&
            hashA.search         == hashB.search && // TODO: normalize search params?
            ( skipHash || ( hashA.hash == hashB.hash ) )
        );
    },
    
    // Given a non-qualified URL (missing at least the protocol, hostname and port), 
    // interpret it as a local URL and return a fully-qualified version. Also handles
    // resolving relative URLs. 
    // url: a string, or a hash returned by Url.toHash
    // baseUrl: optional: a fully-qualified URL string or hash used to resolve 
    //   the missing url parts; if not specified, this defaults to window.location.
    fullyQualify: function( url, baseUrl ) {
        var urlHash = Url._hashify( url );
        baseUrl = baseUrl || location;
        var baseUrlHash = Url._hashify( baseUrl );
        
        $assert( !urlHash.protocol && !urlHash.hostname && !urlHash.port, "expected a non-qualified URL" );
        $assert( baseUrlHash.protocol && baseUrlHash.hostname, "expected a fully-qualified base URL" );
        
        $(["protocol", "hostname", "port"]).each(function(i,prop) {
                urlHash[prop] = baseUrlHash[prop];
            });
        
        if ( !urlHash.pathname )
            urlHash.pathname = "/";
        else if ( urlHash.pathname.charAt(0) != "/" ) {
            // relative pathname
            var basePath = baseUrlHash.pathname || "/";
            $assert( basePath.charAt(0) == "/", "expected a fully-qualified base URL path" );
            if ( basePath.charAt( basePath.length - 1 ) == "/" )
                urlHash.pathname = basePath + urlHash.pathname;
            else
                urlHash.pathname = basePath.replace( /[^\/]+$/, urlHash.pathname );
        }
        
        return Url.fromHash( urlHash );
    },   
    
    // Given the escaped query (search) portion of a URL, returns a hash object  with unescaped key/value pairs. Note
    // that if a key appears in the URL without a value, then its value in the hash will be "". This means you might
    // want to use hash.hasOwnProperty() to test if a key is present, because hash[key] will evaulate to false in those cases.
    parseQuery: function(query) {
        var out = {};
        $.each( Url.parseQueryArray(query), function() {
            out[this.name] = this.value;
        });
        return out;
    },
    
    // The inverse of parseQuery: accepts a hash of unescaped name/value pairs and joins them into a URL-escaped 
    // string (without a leading '?').
    joinQuery: function(queryHash) {
        var out = [];
        for (var key in queryHash) {
            if (queryHash.hasOwnProperty(key))
                out.push( {name: key, value: queryHash[key]} );
        }
        return Url.joinQueryArray(out);
    },

    // like parseQuery, but instead of returning a hash of name-value pairs, returns an array in which each element is a
    // {name: "name", value: "value"} hash (the format used by $.param). Useful when the order of params is important,
    // or when there are duplicate param names.
    parseQueryArray: function(query) {
        // strip off leading '?' or leading/trailing '&' or whitespace
        query = query.replace( /^[\?&\s]*(.*?)[&\s]*$/, "$1" );
        var out = [];
        if (query) {
            var pairs = query.split( /&+/ );
            $.each(pairs, function() {
                if (this && this != "=") {
                    var pair = this.split( "=" ), paramName, paramValue;
                    try {
                        paramName = decodeURIComponent(pair[0]);
                        paramValue = (pair[1] ? decodeURIComponent(pair[1]) : "");
                    }
                    catch (e) {
                        // malformed URL parameters can cause decodeURIComponent to throw URIErrors
                        Log.error("parseQueryArray: error when decoding URL parameter, skipping; ", e);
                        return true;  // continue
                    }
                    out.push( {name: paramName, value: paramValue} );
                }
            });
        }
        return out;
    },

    // Given an array of unescaped name-value pairs, joins them into an escaped query string (without the leading "?").
    // The input is the format returned by parseQueryArray: an array of {name: "name", value: "value"} objects. 
    joinQueryArray: function(arr) {
        // We could use $.param here as a shortcut, but I didn't like its handling of null or "" values
        arr = arr || [];
        var out = [], param;
        for (var i=0; i < arr.length; i++) {
            param = arr[i];
            if (param && (param.name != null && param.name != "")) {
                if (out.length)
                    out.push("&");
                out.push( encodeURIComponent(param.name) );
                if (param.value != null && param.value != "") {
                    out.push("=", encodeURIComponent(param.value));
                }
            }
        }
        return out.join('');
    },
    
    // Convienince function to add a hash of name-value pairs to an exisiting URL, 
    // returning the result as a string. Existing query parameters can be 
    // overwritten.
    addQueryParams: function( url, hash ) {
        
        if ( !hash )
            return url;
        
        // We could use Url.toHash here, but that might be overkill.
        var queryIndex = url.indexOf( "?" ) + 1;
        var query = ( queryIndex > 0 ? url.substr( queryIndex ) : "" );
        var queryHash = Url.parseQuery( query );
        for ( var key in hash )
            queryHash[ key ] = hash[ key ];
        var prefix = ( queryIndex > 0 ? url.substring( 0, queryIndex ) : url + "?" );
        return prefix + Url.joinQuery( queryHash );
    },

    getQueryParam: function(url, param) {
        var u = Url.toHash(url);
        return Url.parseQuery(u.search)[param];
    },
    
    _hashify: function( url ) {
        return U.isString( url ) ? Url.toHash( url ) : url;
    },

    // this generic module's concession to living in the BC codebase
    // to test the current page's hostname, leave hostnameMinusPort undefined
    isCustomDomain: function(hostnameMinusPort) {
        $assert(window.siteroot, "expected siteroot");
        var hostname = hostnameMinusPort || location.hostname;
        var baseDomainPattern = new RegExp( "\\.?" + Url.toHash(siteroot).hostname.replace(/\./g, "\\.") + "$" );
        return !baseDomainPattern.test(hostname);
    }
};

//sdg TODO: find a way to name this "Dom" and merge in the rest of the Dom methods later.
//kj: YAHOO.lang.augment/augmentObject?
var DomBoot = {
        
    // Accepts an element ref, a string ID, or an array of IDs.
    // Returns an element ref or an array of element refs.
    elt: U.elt,
  
    // In IE because "old" or saved event objects are not accessible, so 
    // sometimes you need to clone them.
    cloneEvent: function( event ) {
    
        // Note: I saw a problem in FF in which, if we cloned the event,
        // the event's default action would always occur. This makes no
        // sense, because cloning is a read-only operation, but to fix it
        // I simply skip the merge in FF, where it's unnecessary anyway.
        //  - sdg 2008.04.25
        if ( event && Browser.type == "ie" )
            //NTcleanup
            return Y.lang.merge( event );
        return event;
    }
};

//shortcuts
var elt = DomBoot.elt;

// makeclass and makesubclass allow you to declare a
// class by providing a classdef hash which contains:
// {
//      ctor: function() { ... },
//      prototype : { /* objects/functions to be added to prototype */ },
//      statics : { /* objects/functions to be added to the class */ }
// }

//fixme: remove this, once playerviews.js no longer uses it
var LangUtils = {
    makeclass : function(classdef) {
        return LangUtils.makesubclass(null, classdef);
    },
    
    makesubclass : function(superclass, classdef) {
        var f = function() {};
        if(classdef.ctor) {
            f = classdef.ctor;
            classdef.ctor = null;
        }
    
        if(superclass) {
            YAHOO.lang.extend(f, superclass);
        }
    
        for(var x in classdef.prototype)
        {
            f.prototype[x] = classdef.prototype[x];
        }

        for(var x in classdef.statics)
        {
            f[x] = classdef.statics[x];
        }
        return f;
    }
};

// utility for keeping track of a list of "listeners"
// for a particular event.  the static 'create' routine
// adds the appropriate "onXXXX" setter to the provided
// object and returns the "fire" method used to trigger
// the event.  Used like this:
//
// this._foohappened = EventSender.create(this, "foohappened");
// ...
// // someone subscribes to the event:
// someobj.onfoohappened(myhandler, myhandlercalltarget)
//
// // you fire the event:
// this._foohappened(args);
//
// TODO: should it handle removing event listeners?  do
// people do that?
//
// Any reason to prefer this over YAHOO.util.Event.CustomEvent?  - sdg 2008.07.02

var EventSender = LangUtils.makeclass({
        ctor : function() {
            this._listeners = [];
        },
        prototype : {
            get_adder : function() {
                var that = this;
                return function(callback, target) {
                    that._listeners.push({ callback : callback, target : target });
                }
            },
            get_remover : function() {
                var that = this;
                return function(callback, target) {
                    for(var i=0; i<that._listeners.length;)
                    {
                        if(that._listeners[i].callback == callback &&
                           that._listeners[i].target == target)
                        {
                            that._listeners.splice(i, 1);
                        }
                        else
                        {
                            i++;
                        }
                    }
                }
            },
            fire : function() {
                for(var i=0; i<this._listeners.length; i++)
                {
                    var l = this._listeners[i];
                    try
                    {
                        l.callback.apply(l.target, arguments);
                    }
                    catch(e)
                    {
                        Log.debug("exception caught in event handler: " + l.callback.toString());
                    }
                }
            }
        },
        statics : {
            create : function(obj, eventname){
                var sender = new EventSender();
                // adding a serial number to the EventSender helps debugging
                sender.serial = EventSender.serial++;
                obj["on" + eventname] = sender.get_adder();
                obj["remove_on" + eventname] = sender.get_remover();
                return function() { sender.fire.apply(sender, arguments); };
            },
            serial : 1
        }
    });

var FormUtils = {
        
    showHideAlert: function( elem, text ) {
        elem = elt( elem );
        if (!elem) return;
        
        if ( typeof(text) != "boolean")
            elem.innerHTML = text || "";
        
        //NTcleanup
        if ( text )
            Y.util.Dom.addClass( elem, "alertActive" );
        else {
            Y.util.Dom.removeClass( elem, "alertActive" );
            if ( window.Form && window.Form.validate )
                Form.validate.remove_onchange_listeners( elem );
        }
    }
};


// Here I defined a sort of "proto" Form object to support user actions, like clicking
// on a submit button before the page is fully loaded. In some cases, you will want 
// to put up a simple message saying "wait until the page is fully loaded". In others 
// you might want to capture the user action and wait until the page is fully loaded 
// (so you can validate for instance), but submit automatically wihtout a second user
// action -- as is the case in login. The rest of the form object is defined in form.js.  
// (wrs 5/17/2010)

var Form = {
    
    _classDefinition : 1,
    _allowSubmit : false,
    _submitTimer : null,      
    
    // delaySubmitUtilReady
    // set your onload hanlder attribute in your html to this, pass in:
    // 1) the submit event
    // 2) your custom submit funtion, 
    // 3) any function to change the ui (for example to disable the submit button, 
    // 4) and a delay interval. Delay_interval defaults to 100 millis.
    // None are required. 
    //
    // The custom submitter can have any signature that has at least two params 
    // -- the first of which is the event (and when called via the closure is 
    // null), and a boolean needs_validation, which is always true when called 
    // from here, and indicates that the regular form validation has not been
    // so that you can validate as needed. 
    delaySubmitUntilReady : function ( e, submitter, change_ui, delay_interval ) {
        
        if( !delay_interval ) delay_interval = 100;      
        var debugstring =  "event: " + e.type + ", delay_interval: " + delay_interval + ", change_ui: " + typeof (change_ui);
        Log.debug("delaySubmitUntilReady: " + debugstring );

        if ( !Form._allowSubmit ) {
            //NTcleanup
            Y.util.Event.stopEvent(e);
            
            // sometimes you might want to alter the ui while you are waiting, 
            // for example disabling the submit button %}
            if( change_ui )
                change_ui();  
                  
            if( submitter )  {
                fn = Form.makeSubmitClosure( delay_interval, submitter );
                Form._submitTimer = setTimeout( fn, delay_interval );                    
            } 
            else {
                alert("The page is still loading; please wait just a moment...");
            }       

        }
        else{
            ; //noop: just let submit-event listener from form library take over.
        }  
    },
    
    // makeSubmitClosure
    // Creates a closure so the custom submitter can be executed on a timer. 
    // Should probably be used only by Form.delaySubmitUntilReady.
    makeSubmitClosure : function(delay, submitter){
        
        return function() {  
               Log.debug("anon fn: delay interval: " + delay ); 
               
               if(Form._submitTimer)    
                    clearTimeout( Form._submitTimer );    

                if ( !Form._allowSubmit ) {
                    Log.debug("delaying " + delay + " millis...");  
                    var nextTry = Form.makeSubmitClosure(delay, submitter )
                    Form._submitTimer = setTimeout( nextTry, delay );  
                } 
                else {
                    Log.debug("Allowing Submit");
                    submitter( null, true);
                }
            };
    }
};

function TimeIt( fn ) {
    var start = new Date().getTime();
    fn();
    return new Date().getTime() - start;
}
;
/* ------------- BEGIN capabilities.js --------------- */;

// Client capabilities: tests for browser features.
// Each test function defined below becomes a method: Capabilities.hasSVG().

var Capabilities = function() {
    
    // --- Tests: add new tests here 
    //
    // Each test object must contain a 'test' property with a function which returns a boolean.
    // If the optional 'className' property exists, a class will be added to the html element. The
    // className will be prefixed with either "has-" or "no-", depending on the result of the test.
    // Tests with classNames are run immediately; otherwise tests are run on demand. Test functions 
    // should be small and low-impact. 
    
    var tests = {
            
        hasSVG: {
            className: "svg",
            test: function() {
                return hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
            }
        },
        
        hasCSSOM: {  // http://www.w3.org/TR/cssom-view
            className: "cssom",
            test: function() {
                return document.createRange && document.createRange().getClientRects;
            }
        },

        // Testing for hover and touch support is fraught. Remember that some devices support both a mouse and touch. 
        // Our test below should eventually be replaced by the "hover" test in Media Queries level 4, once it's 
        // widely supported: http://dev.w3.org/csswg/mediaqueries4/#hover
        hasHover: {
            className: "hover",
            test: function() {
                // TODO: deal with IE10. It supports the Pointer spec, not webkit-style touch events
                return !("ontouchstart" in window);
            }
        },

        // This is currently simply the negation of hasHover, but keeping this here so that if/when hasHover changes to
        // actually testing for hover capability, we still know if the device supports touch.
        hasTouch: {
            className: "touch",
            test: function() {
                return 'ontouchstart' in window;
            }
        },

        // Supports CSS animation
        hasAnimation: {
            className: "anim",
            test: function() {
                var st = document.documentElement.style;
                return ('animation' in st) || ('webkitAnimation' in st);
            }
        },
    
        zzz: null
    };
    
    // --- implementation details 
    
    var out = {},
        cache = {};
    
    function hasFeature( feature, version ) {
        return document.implementation && document.implementation.hasFeature ? 
               document.implementation.hasFeature( feature, version ) :
               false;
    }
    
    function cacheAnswer( name, testFn ) {
        return function() {
            var result = cache[ name ];
            if ( typeof result == "undefined" )
                result = cache[ name ] = testFn();
            return result;
        }
    }
    
    // Build the output map of tests. If any tests define a CSS classname, run the test
    // and add the proper class to the html element.
    $.each( tests, function( name, info ) {
        if ( !info || !info.test )
            return null;
        var testFn = out[ name ] = cacheAnswer( name, info.test );
        var fullClass;
        if ( info.className ) {
            var result = testFn();
            fullClass = ( result ? "has-" : "no-" ) + info.className;
            $( document.documentElement ).addClass( fullClass );
        }
        Log.debug( "Capabilities: registered test " + name + ( fullClass ? "; classname=" + fullClass : "" ) );
    } );
    
    out.cache = cache;
    return out;
}();
;
/* ------------- BEGIN media_view.js --------------- */;
/* global Browser */
// JS support for handling different viewport sizes.

var MediaView = {
        
    thresholds: null,
    defaultThresholds: { desktop_width: -1 },  // we default to desktop
    mode: null,      // desktop, phone
    initType: null,  // client, server

    // New style: server-side mode detection. This module effectively becomes a wrapper for Browser.media_mode.
    // No syncing supported, because the mode can't change without a server roundtrip.
    initServer: function(mode) {
        this.initType = "server";
        this.mode = mode;
    },
  
    xxx: false
};

;
/* ------------- BEGIN control.js --------------- */;
/////////////////////////////////////////////////////////////
/// Controller API
///

// The idea here is a controller system that can layer JS actions on top of an 
// otherwise standard set of HTML links and forms. Control listens for specific 
// DOM events (anchor click and GET form submission, currently) and matches the 
// target URL against a predefined set of controller objects. If a controller can 
// handle a given URL, its matching action method is called and the default DOM 
// action (page navigation) is cancelled.
//
// Currently, we expect to init this class very early (in the page head). This
// requires that the app-specific controller(s) also be loaded that early.
// However, the controller actions won't actually be called until the DOMReady
// event, so it's safe for actions to refer to code that might not be loaded yet.
var Control = {
        
    _controllers: [],
    _defaults:[],
    _eventsRegistered: false,
    _canInvokeActions: false,
    _queuedAction: null,

    // Call once to set up controller event handlers. This is designed to be
    // called very early during page load, so that no user events are missed.
    registerEvents: function() {
    
        if ( Control._eventsRegistered )
            return;
    
        var yEvent = Y.util.Event; 
        yEvent.on( document, "click", Control._clickHandler );
        
        // Form submit events don't bubble, so in IE there's no way for us
        // to handle them globally. In other browsers we could use event capture,
        // but for consistency we'll treat everyone the same. 
        var formIndex = 0;
        var searchForAndRegisterForms = function() {
            
            //Log.debug( "Control: scanning for forms; index=" + formIndex );
            if ( formIndex == -1 )
                return;
            
            var elems = document.getElementsByTagName( "FORM" );
            var submitHandler = Control._submitHandler;
            
            for ( ; formIndex < elems.length; formIndex++ ) {
                var elem = elems[formIndex];
                // For now, we only support GET forms because we can represent the
                // entire state of the form as a URL (which we use to remember and 
                // restart the original action). POST forms potentially contain too 
                // much data to fit into a URL.
                if ( elem.method.toLowerCase() == "get" )
                    yEvent.on( elem, "submit", submitHandler );                
            }    
            
            // Continue search for new forms during page load. Note if forms are 
            // added to the document after onDOMReady, they aren't handled.
            setTimeout( searchForAndRegisterForms, 100 );
        }
        
        searchForAndRegisterForms(); // run at least once
        
        // We used to register this with Y.util.Event.onDOMReady right here.
        // But it appears that there's a problem with onDOMReady in IE:
        // if the page is loading in an iframe and you call onDOMReady from
        // the head, the handler fires before the page is really ready.
        // So now we rely on code in the page body to setup the callback for us.
        Control.handleDomReady = function() { 
            
            Log.debug( "Control: got DOMReady" );
            formIndex = -1; // stop polling for forms
            Control._canInvokeActions = true;
            
            if ( Control._queuedAction ) {
                Control._invokeActionArray( Control._queuedAction );
                Control._queuedAction = null;
            }
        };
        
        Control._eventsRegistered = true;
    },
    
    // Registers a controller for the specified path prefix. When invoking
    // an action via URL, controllers are searched in the order they were 
    // registered. The first controller with a prefix that matches the URL
    // wins. This scheme does not exactly match the server's URL mapping logic,
    // but it seemed the simplest thing to do that supports our current URLs.
    // 
    // When called, the controller method is passed the following parameters: 
    //   - an array of any remaining path segments which haven't been matched
    //   - a hash object containing the unescaped URL query parameters
    //   - the full, original URL
    //   - the associated DOM event object, if any
    //
    // Examples:
    //
    //    path:    "/foo/bar" 
    //    matches: http://clubwiki.org/foo/bar?hee=haw
    //    invokes: controller.index( [], {hee:"haw"}, ... )
    //
    //    path:    "/foo/bar"
    //    matches: http://clubwiki.org/foo/bar/fee/fa 
    //    invokes: controller.fee( ["fa"], {}, ... )
    //
    //    path:    "/"
    //    matches: http://clubwiki.org/foo/bar?hee
    //    invokes: controller.foo( ["bar"], {hee:null}, ... )
    registerController: function( path, controller ) {
        
        $assert( path );
        $assert( controller );
        
        if ( path.charAt(0) != "/" )
            path = "/" + path;
        
        Control._controllers.push( [ path, controller ] );
    },
    
    // A hook "for the rest" -- for example, if you have specific 
    // behavior for certain A tags, but you want all the rest 
    // to, say, open in a new window. This gives you a chance to 
    // do something before that default behavior executes. Does not 
    // inherently stop the event or cancel default processing, btw. 
    registerDefault: function( tagname, controller ){
        Control._defaults.push( [tagname, controller] );
    },
    
    // Given a URL, search for a local controller to handle the URL. URLs can be
    // fully-qualified, absolute or relative (missing fields will be resolved against
    // window.location). URLs pointing to non-local domains are ignored. Returns 
    // true if a controller was found and a handler method executed.
    // event: optional: the DOM event which triggered this action
    invokeAction: function( url, event ) {
        
        var actionArr = Control._findAction( url, event );
        if ( actionArr ) {
            Control._invokeActionArray( actionArr );
            return true;
        }
        return false;
    },    
    
    _clickHandler: function( e ) {

        if ( e.button != 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey )
            return; // we only want unmodified left-clicks for now

        // a hack to give some targets an opt out. 
        var clickedEl = $(Y.util.Event.getTarget(e));
        if ( clickedEl.length && clickedEl.attr('bc-cc-none') !== undefined )
            return;
        
        var targetEl = clickedEl.closest('a')[0];
        if ( targetEl ) {
            var url = targetEl.href;
            Control._invokeFromEvent( url, e );
        } 
    },
    
    _submitHandler: function( e ) {

        // YUI Connect already contains the code to build a query string from 
        // a form, so take advantage of that here.
        var formEl = this;
        var paramStr = Y.util.Connect.setForm( formEl );
        Y.util.Connect.resetFormState();
        
        // IE appears not to resolve to absolute URLs when we read form actions.
        // The URL will be resolved in _findAction if needed.
        var baseUrl = formEl.action;
        var url = baseUrl + ( baseUrl.indexOf( "?" ) != -1 ? "&" : "?" ) + paramStr;
        $assert( url.length < 2000, "URL possibly too long: " + url );
        Control._invokeFromEvent( url, e );
    },
    
    _invokeFromEvent: function( url, event ) {
        
        Control._queuedAction = null; // newer events overwrite old
        
        var actionArr = Control._findAction( url, event );
        if ( !actionArr )
            return Control._invokeDefault(event); // nothing to do
        
        Y.util.Event.stopEvent( event );
        
        if ( Control._canInvokeActions ) {
            Log.debug( "Control: invoking action for: " + url );
            Control._invokeActionArray( actionArr );
        }
        else {
            Log.debug( "Control: queuing action for: " + url );
            // Clone the event object. This is necessary in IE because "old" 
            // or saved event objects are not accessible.
            actionArr[4] = DomBoot.cloneEvent( event );
            Control._queuedAction = actionArr;
        }
    },

    _invokeDefault: function( event ){
        var targetEl = Y.util.Event.getTarget(event);
        var def = Control._findDefault(targetEl.tagName);
        if ( !def ) 
            return;
        Control._invokeActionArray( [def, event] );            
    },
    
    _findDefault: function( tagName ){
        var arr = Iter.find( Control._defaults, function(arr) {
            // does the controller's path prefix match this path?
            return ( tagName.toLowerCase() == arr[0].toLowerCase() );
        });

        if ( arr ) {
            return arr[1];
        }
        return null;  
    },
    
    // Invokes an action using the return array from _findAction
    _invokeActionArray: function( actionArr ) {
        
        var actionFn = actionArr.shift();
        actionFn.apply( null, actionArr );
    },
    
    // Looks up an action against the current controllers and returns 
    // an array of action data, or null.
    _findAction: function( url, event ) {
        
        var urlHash = Url.toHash( url );
        if ( !Url.isFullyQualified( urlHash ) )
            urlHash = Url.toHash( Url.fullyQualify( urlHash ) ); // normalize to fully-qualified
        else if ( !Url.isLocal( urlHash ) )
            return null;
        
        // Skip URLs pointing to the current page. This means we skip hash-type
        // hrefs often used for DHTML links. 
        if ( Url.equals( urlHash, location, true ) )
            return null;
        
        var path = urlHash.pathname || "/";
        var arr = Iter.find( Control._controllers, function(arr) {
            // does the controller's path prefix match this path?
            return ( path.indexOf( arr[0] ) == 0 );
        });

        if ( arr ) {
            // Subtract the matching prefix from the path; and remove any
            // leading/trailing slashes
            var path = path.substr( arr[0].length ).replace( /^\/?(.*?)\/?$/, "$1" );
            var pathParts = path.split( "/" );
            var methodName = pathParts.shift();
            if ( !methodName )
                methodName = "index"; //i18n ok
            var controller = arr[1];
            var actionFn = controller[ methodName ];
            if ( actionFn )
                return [ actionFn, pathParts, Url.parseQuery( urlHash.search ), url, event ];
        }
        return null;
    }
};
;
/* ------------- BEGIN stats.js --------------- */;
/* global CommUtils, siteroot_current, BandData */

var Stats = (function () {
    "use strict";
    return {
        RECORD_URL : "/stat_record",
        
        record : function(args) {      
            if (!args.band_id && window.BandData) {
                args.band_id = BandData.id; // Used to filter out e.g. band's streaming their own stuff.
            }
            try {
                CommUtils.beacon( siteroot_current + Stats.RECORD_URL, args );
            } catch (e) {
            }
        },

        _recorded_clicks : {},
        record_click_once : function(click) {
            if (!Stats._recorded_clicks[click]) {
                Stats._recorded_clicks[click] = true;
                Stats.record({kind: "click", click: click});
            }
        },

        share_menu_click : function(variant) {
            // variant must correspond to a sym constant in StatClick
            if (variant == 'wordpress')
                variant = 'wordpress.com';
            Stats.record({kind: "share menu", click: variant});
        }
    };
})();

    //utility for sending multi-phase stats that are correlated
    //by a reference number.  The reference number is generated
    //by the constructor and the stat for the initial phase is
    //sent, and each time you call change_phase(phase) after that,
    //the new phase and all the params are sent.
    //
    // add_params(p) takes a new param blob and merges it with
    //               the existing params
    // done()        is an alias for change_phase("complete")
    // error(info)   adds the "info" field to the params and changes
    //               the phase to "error"
    //
Stats.PhasedStat = function() {
    "use strict";
    function PhasedStat(params, phase) {
            this._params = params;
            this._params.phase = phase;
            this._params.reference_num = Math.round(Math.random()*1e9);
            
            Stats.record(this._params);
        }
    PhasedStat.prototype = {
            change_phase : function(phase) {
                this._params.phase = phase;
                Stats.record(this._params);
            },
            done : function() {
                //everyone's got a "complete" phase these days
                this.change_phase("complete");
            },
            error : function(info) {
                this._params.info = info;
                this.change_phase("error");
            },
            add_params : function(params) {
                this._params = this.merge(this._params, params);
            },
            merge : function(a, b) {
                var result = {}, i;
                for(i in a) { result[i] = a[i]; }
                for(i in b) { result[i] = b[i]; }
                return result;
            }
        };

    return PhasedStat;
}();
;
/* ------------- BEGIN tp_controller.js --------------- */;

/////////////////////////////////////////////////////////////
/// TrackPipe controller
///

// This file is loaded early in the page, so please keep the code here
// minimal. If necessary, call out to code in other files.

var TPController = {
            
    copytext : function( paths, params, url, event ) {
        CopyTextHelper.copy_text(elt(params["elem"]), YAHOO.util.Event.getTarget(event));
    },
    /*
    order_package : function( paths, params, url, event ) {
        // PackageOrder.begin takes two params: the package index and an isGift boolean. previously it only took a 
        // package index, but this funtion call was passing event as well. if you need the event in begin(), then add
        // it as an extra param.
        // dh 12-02-2013
        PackageOrder.begin( params["pkg"] ); 
    },
    
    gift_package : function( paths, params, url, event ) {
        PackageOrder.begin( params["pkg"], true );
    },
    */
	edit_design : function( paths, params, url, event ) {
		Design.editDesign();
	},

    testme : function( paths, params, url, event ) {
        var dlg = Dialog.openTemplate(null, "email_collection_rules", params, [Dialog.buttons.ok()]);
    }
};
;
/* ------------- BEGIN trackpipe.js --------------- */;
var Trackpipe = {

    TrackUploadStat : LangUtils.makesubclass(Stats.PhasedStat, {
        ctor : function() {
            this.startdate = new Date();
            params = { kind : "track upload" }
            this.constructor.superclass.constructor.call(this, params, "started");
        },
        prototype : {
            // override 'done' to add elapsed time and file_id
            done : function(encodings_id) {
                this.add_params({ encodings_id : encodings_id,
                                elapsed_sec : ((new Date()) - this.startdate) / 1000 });
                this.constructor.superclass.done.call(this);
            }
        }
    }),
    
    // Presents an error generated by emit_json_exception in a dialog, and returns true if it was an error.
    showXHRError : function (json) {
        if (json.error === true) {
            // Hacky handling for alerts
            var ax = json.exception && json.exception.indexOf("ALERT: ");
            if (ax && ax >= 0) {
                json.alert_text = json.exception.slice(ax + 7 /* length of "ALERT: " */);
                Dialog.openTemplate("Note", "xhr_error_dialog", json, Dialog.buttons.ok(), '35em');
            } else {
                json.browser = Browser;
                Dialog.openTemplate("Error", "xhr_error_dialog", json, Dialog.buttons.ok(), '35em');
            }
            return true;
        }
        return false;
    },

    maybeDoTralbumActions : function() {
        var action = HiddenParams['action'];
        switch(action)
        {
            case 'share':
                Share.showFromEmbed();
                break;
            case 'embed':
                EmbedDialog.open();
                break;
            case 'download':
                // TODO: NUDOWNLOAD: With the new download page, does this mean we just redirect in the free case?
                // Or pop a dialog? Or.... the old Download bubble? -- kj 2010-11-17
                TralbumDownload.showPurchaseOptionsFooter = true;
                TralbumDownload.begin();
                break;
            case 'buy':    // embedded player. Note: the only reason this works is because we only send 'buy' when there is exactly one thing to purchase, and that's a package. Under that condition, the index into the package list will use the defaut (0) which will be correct for list of length 1 
            case 'package':
            	var pkg_no = HiddenParams['no'];
            	pkg_no = (pkg_no == null) ? 0 : parseInt(pkg_no);
            	PackageOrder.begin(pkg_no);
            	break;
            case 'contact':
                if ( BandData.fan_email ) // can happen if a link comes here from a receipt after the contact pref has changed
                    window.top.location.href = "mailto:" + Text.escapeHtml( BandData.fan_email );
                else
                    Contact.show_form({b: BandData.id, n: BandData.name});
                break;
            case 'design':
                Design.editDesign();
                break;
        }
    }
};

var Tracks = {
    encoding_error : function(msg) {
        msg = "The uploaded track couldn’t be processed because " + Text.escapeHtml(msg) + ". Please see <a target='_blank' href='http://bandcamp.com/faq#aiffwavuploadrequirement'>the FAQ</a> for more information.";
        Dialog.alert( "Upload Error", msg ); //UISTRING
    }
};

var CopyTextHelper = {

    // copy_text() -- copy value from 'srcelem' to clipboard
    //
    // Causes srcelem to blink by adding/removing the
    // "copytext_highlight" css class.
    // 'linkelem' is the element that was clicked on,
    // and its innerHtml is briefly replaced with the
    // string "copied".
    
    copy_text : function(srcelem, linkelem) {
        FlashProxy.set_clipboard(srcelem.value);

        CopyTextHelper.blink_elem(srcelem, 2, 300);

        if(linkelem)
        {
            var messageDelay = 1000; //how long to display "copied" for

            var orig_text = linkelem.innerHTML;
            linkelem.innerHTML = 'copied'; //UISTRING
            setTimeout(function() {
                    linkelem.innerHTML = orig_text;
                }, messageDelay);
        }
    },

    blink_elem : function(elt, blinkcount, blinkperiod) {
        var blinkon = false;
        var blinkinterval = setInterval(function() {
                if(blinkcount < 0)
                {
                    clearInterval(blinkinterval);
                    blinkon = false;
                }
                else
                {
                    blinkcount--;
                    blinkon = !blinkon;
                }

                if(blinkon)
                {
                    YAHOO.util.Dom.addClass(elt, "copytext_highlight");
                }
                else
                {
                    YAHOO.util.Dom.removeClass(elt, "copytext_highlight");
                }
            }, blinkperiod/2);
    }
};

;
/* ------------- BEGIN swfobject.js --------------- */;
/**
 * SWFObject v2.0: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept == "undefined") var deconcept = new Object();
if(typeof deconcept.util == "undefined") deconcept.util = new Object();
if(typeof deconcept.SWFObjectUtil == "undefined") deconcept.SWFObjectUtil = new Object();
deconcept.SWFObject = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey) {
	if (!document.getElementById) { return; }
	this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
	this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
	this.params = new Object();
	this.variables = new Object();
	this.attributes = new Array();
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }
	if(w) { this.setAttribute('width', w); }
	if(h) { this.setAttribute('height', h); }
	if(ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
	this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
	if (!window.opera && document.all && this.installedVer.major > 7) {
		// only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		deconcept.SWFObject.doPrepUnload = true;
	}
	if(c) { this.addParam('bgcolor', c); }
	var q = quality ? quality : 'high';
	this.addParam('quality', q);
	this.setAttribute('useExpressInstall', false);
	this.setAttribute('doExpressInstall', false);
	var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
	this.setAttribute('xiRedirectUrl', xir);
	this.setAttribute('redirectUrl', '');
	if(redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}
deconcept.SWFObject.prototype = {
	useExpressInstall: function(path) {
		this.xiSWFPath = !path ? "expressinstall.swf" : path;
		this.setAttribute('useExpressInstall', true);
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = new Array();
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs.push(key +"="+ variables[key]);
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { // netscape plugin architecture
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "PlugIn");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'"';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE
			if (this.getAttribute("doExpressInstall")) {
				this.addVariable("MMplayerType", "ActiveX");
				this.setAttribute('swf', this.xiSWFPath);
			}
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	write: function(elementId){

		/* HACK alert, added by Neal to detect FlashBlock:
		   When we write the HTML into the document, first
		   try to find a src="<url>" attribute buried in it
		   (wimping out here and using a simple regex rather
		   than parsing the HTML because I know it can't
		   vary much, since it's generated by this code too).
		   After writing the innerHTML, read it back and
		   look for the same attribute, and compare them.  If
		   they are different, we have been Co^H^HFlashBLocked.

		   This will have no effect on IE because the src
		   attribute is not used.
		*/
		function hack_getSWFSrc(html) {
			var regex = / src=\"([^"]*)\"/i;
			var result = regex.exec(html);
			if(result) return result[1];
			return null;
		}

		if(this.getAttribute('useExpressInstall')) {
			// check to see if we need to do an express install
			var expressInstallReqVer = new deconcept.PlayerVersion([6,0,65]);
			if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
				this.setAttribute('doExpressInstall', true);
				this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
				document.title = document.title.slice(0, 47) + " - Flash Player Installation";
				this.addVariable("MMdoctitle", document.title);
			}
		}
		if(this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))){
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;

			var html = this.getSWFHTML();
			var url = hack_getSWFSrc(html);

			n.innerHTML = html;

			if(url && url != hack_getSWFSrc(n.innerHTML)) {
				// someone tampered with the SWF SRC attribute
				// just now.  FlashBlock!
				n.innerHTML = "";
				return false;
			}

			return true;
		}else{
			if(this.getAttribute('redirectUrl') != "") {
				document.location.replace(this.getAttribute('redirectUrl'));
			}
		}
		return false;
	}
}

/* ---- detection functions ---- */
deconcept.SWFObjectUtil.getPlayerVersion = function(){
	var PlayerVersion = new deconcept.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else{
		// do minor version lookup in IE, but avoid fp6 crashing issues
		// see http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new deconcept.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // throws if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {
				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
deconcept.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
deconcept.PlayerVersion.prototype.versionIsValid = function(fv){
	if(this.major < fv.major) return false;
	if(this.major > fv.major) return true;
	if(this.minor < fv.minor) return false;
	if(this.minor > fv.minor) return true;
	if(this.rev < fv.rev) return false;
	return true;
}
/* ---- get value of query string param ---- */
deconcept.util = {
	getRequestParameter: function(param) {
		var q = document.location.search || document.location.hash;
		if(q) {
			var pairs = q.substring(1).split("&");
			for (var i=0; i < pairs.length; i++) {
				if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
					return pairs[i].substring((pairs[i].indexOf("=")+1));
				}
			}
		}
		return "";
	}
}
/* fix for video streaming bug */
deconcept.SWFObjectUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i=0; i < objects.length; i++) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = function(){};
			}
		}
	}
}
// fixes bug in fp9 see http://blog.deconcept.com/2006/07/28/swfobject-143-released/
if (deconcept.SWFObject.doPrepUnload) {
	deconcept.SWFObjectUtil.prepUnload = function() {
		__flash_unloadHandler = function(){};
		__flash_savedUnloadHandler = function(){};
		window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
	}
	window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
}
/* add Array.push if needed (ie5) */
if (Array.prototype.push == null) { Array.prototype.push = function(item) { this[this.length] = item; return this.length; }}

/* add some aliases for ease of use/backwards compatibility */
var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject; // for legacy support
var SWFObject = deconcept.SWFObject;
;
/* ------------- BEGIN flashproxy.js --------------- */;
// Copyright 2008 Bandcamp, Inc.  All Rights Reserved
// Author: Neal Tucker (ntucker@august20th.com)
//
// FlashProxy -- javascript code for bootstrapping
//               AS ObjectProxy classes
//
// sample usage: FlashProxy.whenclassready('MyClass', function() {
//                                  var mc = new FlashProxy.MyClass();
//                                  ...etc
//                              });
// prerequisite: swfobject.js

function FPDebug(str) {
    //Log.debug(str);
}

function FPTrace(str) {
    //Log.debug(str);
}

var FlashProxy = {
    // tells FlashProxy about a SWF containing
    // classes to be proxied.  This information is used
    // to dynamically load SWFs in response to whenclassready()
    // calls
    register_proxy : function(swfurl, classnames) {
        for(var i=0; i<classnames.length; i++)
        {
            FlashProxy._class_urls[classnames[i]] = swfurl;
        }
    },

    // asks FlashProxy to load a SWF containing the class
    // if necessary and notify via callback when it is ready
    // to be used
    whenclassready : function(classname, callback, errorcallback) {

        FPTrace("whenclassready(" + classname + ") called");

        if( FlashProxy.error ) {
            if(errorcallback) {
                FPTrace("flash proxy error for class " + classname + "; calling error callback");
                errorcallback();
            }
            return;
        }

        if( FlashProxy.find_by_classname(classname) ) {
            FPDebug("whenclassready(" + classname + "): class is already ready");
            callback();
            return;
        }

        if(!FlashProxy._proxywaiters[classname])
            FlashProxy._proxywaiters[classname] = [];


        var swfurl = FlashProxy._class_urls[classname];
        if(!swfurl)
        {
            Log.error("No SWF URL found for class " + classname);
            // hmm, what do to here.  this may be an error and it
            // may not.  in some cases, we just want to wait for
            // this class to appear since the SWF is inline in HTML,
            // as opposed to being dynamically loaded.  Timeout?
        }

        FPTrace("loading swf " + swfurl);
        FlashProxy._proxywaiters[classname].push({ success: callback, failure: errorcallback});

        if(swfurl)
        {
            if(!FlashProxy._loadswf(swfurl))
            {
                FlashProxy._onproxyerror(classname);
            }
        }
    },

    // the invalidate functions are used to indicate that a
    // proxy is no longer any good, and associated objects
    // (object instances, proxy classes, and swfs) should
    // be tossed
    invalidate_class : function(classname) {
        var entry = FlashProxy._by_classname[classname];
        FlashProxy._invalidate_entry(entry);
    },
    invalidate_swf : function(url) {
        var entry = FlashProxy._by_swfurl[classname];
        FlashProxy._invalidate_entry(entry);
    },
    invalidate_proxyid : function(id) {
        var entry = FlashProxy._by_proxyid[id];
        FlashProxy._invalidate_entry(entry);
    },
    _invalidate_entry : function(entry) {
        if(!entry) return;
        for(var i=0; i<entry.classes.length; i++)
        {
            FPDebug("invalidating class " + entry.classes[i]);
            FlashProxy._by_classname[entry.classes[i]] = null;
            FlashProxy[entry.classes[i]] = null;
        }

        if(entry.proxyid)
        {
            FPDebug("invalidating proxy id " + entry.proxyid);
            FlashProxy._by_proxyid[entry.proxyid] = null;
        }

        if(entry.swfurl)
        {
            FPDebug("invalidating proxy swfurl " + entry.swfurl);
            FlashProxy._by_swfurl[entry.swfurl] = null;
        }

        //fixme: invalidate instances?
    },
    is_proxy_valid : function(proxyid) {
        return FlashProxy.find_by_proxyid(proxyid) != null;
    },
    _is_entry_valid : function(entry) {
        if(entry)
        {
            // is element a descendant of document?
            var is_in_document = function(elem) {
                try {
                    var cur = elem;
                    while(cur) {
                        cur = cur.parentNode;
                        if(cur == document) {
                            return true;
                        }
                    }
                } catch(e) {
                }
                FPDebug("entry is not valid because it is not a descendant of document!");
                return false;
            }

            // if this entry is pending (meaning we are in the
            // middle of _loadswf), it is automatically valid.
            // Otherwise, check to make sure it has a swfobject
            // property, that the swfobject has the getproxynames
            // function, and that the swfobject is actually in
            // the document
            var swfExists = (typeof entry.swfobject != "undefined") && entry.swfobject; // typeof null == "object"
            if(entry.pending || (swfExists && entry.swfobject.getproxynames && is_in_document(entry.swfobject)))
            {
                return true;
            }
            FPDebug("entry is not valid: entry.swfobject=" + entry.swfobject + ", entry.swfobjects.getproxynames=" + ( swfExists ? entry.swfobject.getproxynames : "[undef]" ) );

            // if it is not valid, make sure everyone knows it
            FlashProxy._invalidate_entry(entry);
        }
        return false;
    },

    // routines to look for an entry based on classname, swf url, or proxyid.
    // all validate that the entry is ok before returning it
    find_by_classname : function(classname) {
        var entry = FlashProxy._by_classname[classname];
        if(FlashProxy._is_entry_valid(entry))
            return entry;
        return null;
    },
    find_by_swfurl : function(url) {
        var entry = FlashProxy._by_swfurl[url];
        if(FlashProxy._is_entry_valid(entry))
            return entry;
        return null;
    },
    find_by_proxyid : function(proxyid) {
        var entry = FlashProxy._by_proxyid[proxyid];
        FPDebug("found proxy entry by id \"" + proxyid + "\": " + entry);
        if(FlashProxy._is_entry_valid(entry))
            return entry;
        FPDebug("proxy entry is not valid");
        return null;
    },

    // one special convenience: get the swfobject (as opposed to
    // the entry) for a given proxyid.
    find_proxy : function(proxyid) {
        var entry = FlashProxy.find_by_proxyid(proxyid);
        return entry ? entry.swfobject : null;
    },

    // dynamically load the given swf, creating an entry for
    // it and presumably triggering callbacks from flash which
    // result in classes being defined
    _loadswf : function(url) {
        var existing = FlashProxy.find_by_swfurl(url);
        if(existing)
            return existing;

        var create_confirm_button = false;

        // a little special case hardcoded here for nugget.swf:
        // create the SWF large enough to become an "OK" button
        // which can be used for getting around restricted APIs
        // throwing exceptions unless we are clicking directly
        // on the flash object.  This does not need to be hard-
        // coded to only work for nugget.swf, but we'd need to
        // make a table of which SWFs get this functionality (it
        // can't be all of them, since InlineVis is already sized),
        // so for now I'll just hardcode the decision here.
        
        var nuggetname = "nugget2.swf";
        if(url.substr(url.length-nuggetname.length, nuggetname.length) ==
            nuggetname)
        {
            create_confirm_button = true;
        }
        
        //generate proxy id
        var proxyid = FlashProxy._next_proxy_id++;
        var entry = { classes : [], swfurl : url, proxyid : proxyid, pending : true };
        //fixme: list of instances?
        if(FlashProxy._by_swfurl[url])
        {
            FlashProxy._invalidate_entry(FlashProxy._by_swfurl[url]);
        }

        FlashProxy._by_swfurl[url] = entry;
        FlashProxy._by_proxyid[proxyid] = entry;

        entry._container_id = "proxy_container_" + proxyid;
        entry._object_id = "proxy_swfobject_" + proxyid;

        var width = "0";
        var height = "0";

        var swfobject = new SWFObject(url, entry._object_id, width, height, "8", "#F0F0F0");
        swfobject.addParam("allowscriptaccess", "always");
        swfobject.addVariable("proxyid", proxyid.toString());
        swfobject.addVariable("namespace", "FlashProxy"); //fixme: does this matter?

        var elem = document.createElement("DIV");
        if(create_confirm_button)
        {
            elem.style.position = "absolute";
            elem.style.zIndex = "9999";
            swfobject.addParam("style", "z-index: 9999;");
            swfobject.addParam("width", width);
            swfobject.addParam("height", height);
        }
        elem.id = entry._container_id;
        document.body.appendChild(elem);

        //fixme: how does version error get back?

        if(!swfobject.write(entry._container_id))
        {
            //fixme: set some error status in entry and throw
            //an error?
            FlashProxy.flash_has_version = swfobject.installedVer.major + "." + swfobject.installedVer.minor;
            FlashProxy.error = true;
            return null;
        }
        entry.swfobject = document.getElementById(entry._object_id);
        FPTrace("swfobject id is " + entry._object_id);
        entry.pending = false;
    
        return entry;
    },

    // flash calls back to _onproxyready after setting up the
    // externally-visible methods which expose the class.  The
    // proxyid that was passed in as a flashvar is passed back
    // as well.  If the flash object was not instantiated by
    // _loadswf, then the proxyid flashvar should be set to
    // the DOM element id of the swf object.
    _onproxyready : function(proxyid, classname) {
        try {
            var entry = FlashProxy.find_by_proxyid(proxyid);
            FPTrace("_onproxyready: existing entry: " + entry);
    
            // at this point there may or may not be
            // an entry for the given proxyid, because
            // the SWF may have been instantiated due
            // to being place inline in the HTML
            if(!entry)
            {
                FPDebug("no object for proxid " + proxyid + ".  Checking for HTML element.");
                var elem = document.getElementById(proxyid);
                FPTrace("elem: " + elem);
                if(!elem || !elem.getproxy)
                {
                    FPTrace("Did not find HTML element for proxyid " + proxyid + " either.  Waiting a bit (elem = " + elem + ").");
                    setTimeout(function() {
                            FlashProxy._onproxyready(proxyid, classname);
                        }, 0);
                    FPTrace("timeout set");
                    return;
                }
    
                entry = { swfobject : elem, proxyid : proxyid, classes : [] };
                FlashProxy._by_proxyid[proxyid] = entry;
                FPDebug("set FlashProxy._by_proxyid[\"" + proxyid + "\"] to entry containing swfobject=" + entry.swfobject);
            }
    
            // now that we have an entry, it may not have its swfobject
            // set yet, because in some cases (only in IE it seems), the
            // flash can do external callbacks before the JS code which
            // created it has finished, so the assignment to entry.swfobject
            // has not yet occurred.  In this case, just reschedule this
            // callback for a moment.
            if(!entry.swfobject)
            {
                setTimeout(function() {
                        FlashProxy._onproxyready(proxyid, classname);
                    }, 0);
                return;
            }
    
            FPDebug("calling into swfobject: " + entry.swfobject);
            FPDebug("creating class FlashProxy." + classname);
            var jscode = "FlashProxy." + classname + " = " + entry.swfobject.getproxy(classname) + ";";
            FPDebug("retrieved JS proxy code for " + classname);
            //FPTrace("JS code: " + jscode);
            eval(jscode);
            FPDebug("FlashProxy." + classname + " created");
    
            entry.classes.push(classname);
            FlashProxy._by_classname[classname] = entry;
    
            // notify any waiting callbacks that this class is ready
            var waiters = FlashProxy._proxywaiters[classname];
            if(waiters)
            {
                FPDebug("" + waiters.length + " waiters waiting for " + classname);
                var waiter;
                while(waiter = waiters.pop())
                {
                    try
                    {
                        FPTrace("calling waiter: " + waiter.toString());
                        waiter.success();
                    }
                    catch(ex)
                    {
                        FPDebug("flash proxy 'whenclassready' handler for " + classname + " failed");
                    }
                }
            }
    
            FPTrace("onproxyready(" + proxyid + ", " + classname + ") exiting");
            return true;
        }
        catch(exc)
        {
            FPDebug("_onproxyready caught: " + exc.message);
            setTimeout(function() {
                    FlashProxy._onproxyready(proxyid, classname);
                }, 0);
        }
    },
    _onproxyerror : function(classname) {
        // notify any waiting callbacks that this class is ready
        var waiters = FlashProxy._proxywaiters[classname];
        if(waiters)
        {
            FPDebug("" + waiters.length + " waiters waiting for " + classname);
            var waiter;
            while(waiter = waiters.pop())
            {
                try
                {
                    if(waiter.failure)
                        waiter.failure();
                }
                catch(ex)
                {
                    FPDebug("flash proxy 'whenclassready' error handler for " + classname + " failed");
                }
            }
        }
    },

    _next_proxy_id : 1,
    _by_swfurl : {},
    _by_classname : {},
    _by_proxyid : {},

    //mapping from classname to swf url
    _class_urls : {},

    _proxywaiters : {},

    // _fire_event()
    //
    // Called by ActionScript in order to invoke
    // an event on a particular object instance.
    // This looks up the corresponding JS object 
    // and fires any handlers that have been registered
    // for this event.  Note that this function is
    // always called, regardless of whether there are
    // event listeners, and the dispatching is done
    // from here.  This reduces the number of
    // ExternalInterface calls that are made for events
    // with multiple subscribers, but increases the number
    // of calls made for events with no subscribers.
    
    _fire_event : function(ref, eventname, arg) {

		// Safari can fail to flush DOM changes to the screen if they
		// are made synchronously from within a call that originated
		// inside Flash (e.g. a progress bar).  So we notify the handlers
		// on a timeout. This is new for all events as of 2009.01.08;
		// we expect this won't matter, will deal with it later if it
		// does.  See FB 66 for repro details.  -- kj
        // 2012.11.29: updated to eliminate dependency on YUI's 'later',
        // which is overkill

        var that = this;
        function refire() {
            that._do_fire_event.call(that, ref, eventname, arg);
        }
        setTimeout(refire, 1);
    },

	// _do_fire_event
	//
	// Inner utility for firing event handlers synchronously.
	// See _fire_event for details.
    
    _do_fire_event : function(ref, eventname, arg) {
        var obj = FlashProxy._ref_to_obj[ref];
        var handlers = obj._events[eventname];
        for(var i=0; handlers != null && i<handlers.length; i++)
        {
            try
            {
                handlers[i](obj, arg);
            }
            catch (e)
            {
                var msg = "caught exception in \"" + eventname + "\" handler: ";
                msg += e.message ? e.message : e;
                if (e.stack) {
                    msg += "\n" + e.stack;
                }
                FlashProxy.logerror(msg);
            }
        }
    },

    // _register_instance
    //
    // Called by the each javascript proxy class' constructor
    // in order to create a mapping from the ActionScript 'ref'
    // to the actual JS object instance.
    _register_instance : function(ref, obj) {
        if(FlashProxy._ref_to_obj[ref])
        {
            FlashProxy.logerror("flash proxy: trying to register an instance that already exists! (ref: " + ref + ")");
            return;
        }

        FlashProxy._ref_to_obj[ref] = obj;
    },

    logerror : function(str) {
        if(typeof Log != "undefined" && typeof Log.error != "undefined")
        {
            Log.error("flash proxy error: " + str);
        }
    },

    _confirmation_dialog : null,
    _confirmation_dialog_container : null,

    _confirm_restricted_api : function(proxyid, message, title, includeCancel) {
        var entry = FlashProxy.find_by_proxyid(proxyid);
        var swfobject = FlashProxy.find_proxy(proxyid);
        var container = elt(entry._container_id);

        title = title || "Flash confirmation"

        $assert(swfobject && container);

        if ( includeCancel != true ) includeCancel = false; // normalize

        FlashProxy._confirmation_dialog = Dialog.openTemplate(title, "flash_confirmation", { message: message, proxyid: proxyid, includeCancel: includeCancel }, [] );

        FlashProxy._confirmation_dialog.cancelEvent.subscribe( function() {
            FlashProxy._confirmation_dialog = null;
            FlashProxy._dismiss_confirmation(proxyid);
        });

        // hide the flash button when dragging the dialog
        FlashProxy._confirmation_dialog.dragEvent.subscribe( function() {
            swfobject.height = "1px";
            swfobject.width = "1px";
            container.style.top = "0px"
            container.style.left = "0px"
        });

        // reposition the flash button when the dialog moves
        FlashProxy._confirmation_dialog.moveEvent.subscribe( function() {
            FlashProxy._position_confirmation_button(proxyid);
        });
    },

    // stick the "OK" button flash movie directly on top
    // of the OK button image that is already sitting on the
    // dialog.
    _position_confirmation_button : function(proxyid) {
        var entry = FlashProxy.find_by_proxyid(proxyid);
        var swfobject = FlashProxy.find_proxy(proxyid);
        var container = elt(entry._container_id);
        var okimg = elt("flashconfirmok");

        $assert(swfobject && container && okimg);

        swfobject.height = "31";
        swfobject.width = "85";

        // wrapper for YUI setXY which checks to
        // make sure there was no rounding problem with the pos
        // and resets if so.
        var setXYHack = function(elem, xy) {
            var desired = [].concat(xy);
            Y.util.Dom.setXY(elem, desired);
            var actual = Y.util.Dom.getXY(elem);
            desired[0] += desired[0] - Math.round(actual[0]);
            desired[1] += desired[1] - Math.round(actual[1]);

            Y.util.Dom.setXY(elem, desired);
        }

		// Reset the z-index, we float it beneath the page 
		// at hide time:
        container.style.zIndex = 9999;

        var pos = Y.util.Dom.getXY(okimg);
        pos[0] += 2;
        pos[1] += 2;
        setXYHack(container, pos);
    },

    _hide_confirmation_dialog : function(proxyid) {
        var entry = FlashProxy.find_by_proxyid(proxyid);
        var swfobject = FlashProxy.find_proxy(proxyid);
        var container = elt(entry._container_id);
        FlashProxy._confirmation_dialog_container = container;
        
        $assert(swfobject && container);

        swfobject.height = "1px";
        swfobject.width = "1px";
        container.style.zIndex = -1;
            // We used to do this as well:
            // container.style.top = "0px";
            // container.style.left = "0px";
            // But Safari blocks AS-to-JS communication if the SWF is not visible
            // on the screen (not just on the page-- if it's scrolled off, it's disabled).
            // Even setting left leaves us vulnerable in cases where the screen is small, or
            // zoomed way in-- which should be rare, of course, and we use it mostly
            // in editors these days (pages for bands, not fans).  Setting the zIndex will
            // float it beneath the page body which is good enough.

        if(FlashProxy._confirmation_dialog)
        {
            FlashProxy._confirmation_dialog.destroy();
            FlashProxy._confirmation_dialog = null;
        }
    },

    _dismiss_confirmation : function(proxyid) {

        var entry = FlashProxy.find_by_proxyid(proxyid);
        var swfobject = FlashProxy.find_proxy(proxyid);
        var container = elt(entry._container_id);
        $assert(swfobject && container);
        FlashProxy._hide_confirmation_dialog(proxyid);
        swfobject.cancel_confirmation();
    },

    // the mapping table for _register_instance
    _ref_to_obj : {},

    noFlashError : function(sitch) {
        if ( sitch == "upload" && Browser.platform == "iphone" ) {
            // Special case.  Should only happen with iOS 5 and below (already scarce):
            Dialog.alert( "Upload", "To upload files, visit Bandcamp from a desktop computer." );
            return;
        }

        var title = "Flash Required"; //UISTRING
        var message = "In order to use this feature, you must have the Adobe Flash Player installed."; //UISTRING

        var situations = { //UISTRINGs
            "share" : "In order to embed the music player on another site, you must have the Adobe Flash Player installed.",
            "player" : "In order to use the music player, you must have the Adobe Flash Player installed.",
            "upload": "In order to upload files, you must have the Adobe Flash Player installed.",
            "download": "In order to download, you must have the Adobe Flash Player installed."
        }

        if(situations[sitch]) message = situations[sitch];

        Dialog.openTemplate(title, "flash_required", { title: title, message : message }, Dialog.buttons.ok()); //UISTRING
    }, 
    
    cleanUpHack: function(){
        // put any resources here that might later need cleaning up.
        // by later, I mean, after all the AS-to-JS communication is done.
        // this list is not meant to be exhaustive; it's a list of things
        // we've run into that cause problems.
        if ( FlashProxy._confirmation_dialog_container )
            Y.util.Dom.setXY(FlashProxy._confirmation_dialog_container, [0,0]);
    }
};

// we can actually get the list of classes proxied from the SWFs if we
// want, but specifying a list here allows us to load the SWFs on demand,
// rather than having to load them in order to find out what they hold.

FlashProxy.register_proxy(siteroot_current + "/js/shared/nugget2.swf", ["Downloader", "Uploader", "SoundPlayer"]);

// fixme: flashproxy has no way to export global functions that
// exist in a SWF; it only proxies methods on classes.  So for now,
// I am hacking in some knowledge that certain SWFs implement
// certain global functions

FlashProxy.log_enable = function(str) {
    for(var x in FlashProxy._by_proxyid) {
        FlashProxy._by_proxyid[x].swfobject.log_enable(str);
    }
};
FlashProxy.set_clipboard = function(str) {
    FlashProxy.whenclassready("Uploader", function() {
            FlashProxy._by_classname["Uploader"].swfobject.set_clipboard(str);
        });
};

/*
if(isDebug)
{
    setTimeout(function() {
        FlashProxy.whenclassready("Downloader", function() {
            FlashProxy._by_classname["Downloader"].swfobject.act_like_flash10();
        });
    }, 5000);
}
*/

;
/* ------------- BEGIN html5sound.js --------------- */;
//HTML5Player:  wrapper which implements our SoundPlayer interface (normally
//implemented by Flash) using HTML5 audio element
HTML5Player = function(){
    "use strict";

    function DebugLog(name, flushInterval) {
        this.buffer = [];
        this.flushInterval =  flushInterval || 10000;
        // make a random id so it's easier to correlate logs dumped from the same pageview
        this.tag = Math.round(Math.random()*Math.pow(2,32)).toString(16);
        this.name = name || "DebugLog";

        this.enable();
    }
    
    DebugLog.prototype.log = function(msg) {
        var d = new Date();
        var ms = d.getMilliseconds().toString();
        while ( ms.length < 3 ) ms = "0" + ms;
        var timestamp = d.toTimeString().substring(0,8) + "." + ms;
        this.buffer.push(timestamp + " : " + msg);
    };
    DebugLog.prototype.flush = function() {
        if(this.buffer.length > 0) {
            Log.debug("DebugLog flushing " + this.buffer.length + " messages to server");
            var messages = this.buffer;
            this.buffer = [];
            
            var data = {
                tag : this.tag,
                name : this.name,
                messages : messages
            };
            $.ajax({
                url: "/api/debug/1/clientlog",
                type: "post",
                data: JSON.stringify(data),
                dataType: "json",
                success: function(result) {
                    Log.debug("posted client log");
                },
                failure: function(err) {
                    Log.error("failed to post client log: " + err);
                }
            });
        }
    };
    DebugLog.prototype.disable = function() {
        if(this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
        this.flush();
    };
    DebugLog.prototype.enable = function() {
        if(!this.interval) {
            this.interval = window.setInterval(this.flush.bind(this), this.flushInterval);
            this.interval = null;
        }
    };
    
    var nextId = 1;
    function HTML5Player() {
        var platform = Browser.platform,
            browserMake = Browser.make,
            browserType = Browser.type,
            volumeCookie = Cookie.get('volume');

        if (volumeCookie) {
            volumeCookie = parseFloat(volumeCookie, 10);
        }

        this._id = nextId;
        nextId++;

        this._options = {
            debug: false,  // log more detail, including most native HTML5 audio events

            // workarounds (active)
            reloadOnSeek:         (browserMake == "chrome" && (platform == "win" || platform == "nix" || platform == "mac")),
            simulateEndedAndroid: (browserMake == "chrome" && platform == "android"),
            simulateEndedSafari:  (browserMake == "safari" && (platform == "iphone" || platform == "mac")),
            safeLoad:             (browserMake == "androidbrowser" && platform == "android"),
            playKick:             (browserMake == "androidbrowser" && platform == "android" && Browser.version[0] < 4),
            loadStartKick:        (browserMake == "androidbrowser" && platform == "android" && Browser.version[0] >= 4),
            deferPlayEvents:      ((browserMake == "chrome" || browserMake == "androidbrowser") && platform == "android"),
            retryErrors:          (browserType == "gecko"),
            volume:               volumeCookie || 0.7,

            // workarounds (deprecated September 2013)
            deferredSeeks: false,
            resetOnStall: false
        };

        if (HTML5Player.logEnabled()) {
            this._debugLog = new DebugLog("HTML5Player");
            this._options.debug = true;
        }
        
        // for testing, allow URL params to override the default options
        if (window.Url) {
            var params = Url.parseQuery(location.search);
            for (var opt in this._options) {
                if (params.hasOwnProperty(opt)) {
                    if (opt == "volume") {
                        var v = parseFloat(params[opt]);
                        if (v)
                            this._options[opt] = v;
                    } else
                        this._options[opt] = !(params[opt] == "0" || params[opt] == "false");
                }
            }
        }

        this._handlers = {
            state : [],
            time : [],
            loaded : [],
            info : [],
            volume : []
        };

        this._listeners = [];
        this._volume = this._options.volume;
        this._recentpos = []; // holds the last few time positions during playback

        if (this._options.debug) {
            var msg = ["constructed; options: "];
            for (var k in this._options)
                msg.push( k, "=", this._options[k], "; " );
            this._info(msg.join(""));
        }

        this._createmedia();
        this._changestate(IDLE);
        
        if (Browser.platform == "iphone") {
            // On iphone, the DOM/JS page state is usually saved if you navigate to another page 
            // and then use the Back button. When we navigate away from the original page, the html5 
            // player element appears to pause itself and report its own position as 0, despite the fact that 
            // if you play() it, it actually maintained its position. The result is that after navigating 
            // back, the player 1) still displays the "playing" state even though it is paused, and 
            // 2) displays the playhead at time 0, which is incorrect.
            //
            // To work around this bug, we originally listened for the pagehide event and paused the 
            // player, to force a UI/player resync (note the unload event does not fire when Safari is going
            // to cache the page state). But this caused playback to cease whenever pagehide fired, 
            // which was often -- for example, when the screen turned off, or when switching to another app. 
            // Instead, we now continually keep track of the last few audio time values during playback. 
            // When we detect the end of a page navigation (using the more-specific popstate event), we look 
            // at the last two time values, and if they suggest the bug has occurred, we reset the player 
            // state accordingly.  - sdg 2012.08.24
            var that = this;
            window.addEventListener( "popstate", function() {
                var recent = that._recentpos;
                if ( that._state == PLAYING && recent.length ) {
                    // at this point, the page must have come out of the back/forward cache, so correct the play/pause UI
                    that.pause();
                    if ( recent.length > 1 && recent[recent.length-1] === 0 && recent[recent.length-2] > 0 ) {
                        // looks like we hit the position == 0 bug
                        var restorePos = recent[recent.length-2];
                        that._warn( "detected iOS page navigation bug; resetting playhead position to " + restorePos );
                        that._fire_event( "time", { position: restorePos } );
                        recent.pop(); // not strictly necessary, but let's not repeat ourselves after another back/forward
                    }
                }
            } );
        }

        // In Android Browser on the HTC One, running Android 4.1.2, calling the native load() method when switching
        // from one track to the next throws an exception: INVALID_STATE_ERR: DOM Exception 11. Strangely, if we catch
        // this exception and then continue, the new track loads and plays correctly.  - sdg 2013.09.03
        if (this._options.safeLoad) {
            this._nativeLoad = this._nativeLoadSafe;
        }
    }

    HTML5Player.prototype = {
        load : function(url) {
            this._debug("load()");
            this._stallcount = 0;
            this._errorRetryCount = 0;
            this._loadedurl = url;
            this._wantstoplay = false;
            this._recentpos.length = 0; // truncate
            if(!_useLocationHack) {
                this._nativePause();
                this._nativeLoad();  // why do this here?  - sdg 2013.08.30
                this._changestate(BUFFERING);
                this._nativeSrc(url);
                this._nativeLoad();
                this._finishedloading = false;
                this._loadStartKicked = false;
                this._playingEventDeferred = false;
            }
        },
        play : function() {
            this._debug("play()");
            if(_useLocationHack) {
                window.location = this._loadedurl;
            } else {
                if(!this._wantstoplay) {
                    this._wantstoplay = true;
                    this._nativePlay();
                }
            }
        },
        pause : function () {
            this._debug("pause()");
            this._cancelPlayKick();
            this._wantstoplay = false;
            this._nativePause();
        },
        playpause : function() {
            this._debug("playpause()");
            switch(this._state) {
                case PLAYING:
                case BUFFERING:
                    this.pause(); break;
                default:
                    this.play();
            }
        },
        stop : function() {
            this._debug("stop()");
            this._cancelPlayKick();
            this._wantstoplay = false;
            this._nativePause();
        },
        seek : function(seconds) {
            this._debug("seek() to " + seconds);

            /* awful hack time -- this code triggers a refresh of the stream URL
            without rate limits after seeking. This is only required on desktop
            Chrome, which isn't smart enough to use range requests to seek within
            MP3 files */
            var performed_reload_seek = false,
                that = this;
            
            if(this._options.reloadOnSeek && this._mediaElem.src.substring(this._mediaElem.src.length - 5) != "&nl=1") {
            
                /* check if we've already buffered the area being seeked to */
                var already_buffered = false;
                for(var i=0; i < this._mediaElem.buffered.length; i++) {
                    if(this._mediaElem.buffered.start(i) <= seconds && seconds <= this._mediaElem.buffered.end(i)) {
                        already_buffered = true;
                        break;
                    }
                }
                
                if(!already_buffered) {
                    this._debug("refreshing with non-rate-limited URL");
                    this._nativePause();
                    this._nativeSrc(this._mediaElem.src + "&nl=1");
                    
                    var seek_on_metadata_load = function(e) {
                        this.removeEventListener("loadedmetadata", seek_on_metadata_load);
                        
                        that._nativeSeek(seconds);
                        that._nativePlay();
                    };
                    
                    this._mediaElem.addEventListener("loadedmetadata", seek_on_metadata_load, false);
                    this._nativeLoad();
               
                    performed_reload_seek = true;
                }
            }
            
            if(!performed_reload_seek) {

                if (this._options.deferredSeeks) {
                    // DEPRECATED: deferred seeks were originally added in rev 20294 to work around an IE seeking bug.
                    // I can't reproduce that bug, and the deferral was causing a new problem when seek(0) is used
                    // as a synonym for play() by higher-level code, which is often. So deprecating this until
                    // we decide it can be removed.  - sdg 2013.08.30
                    this._wantstoplay = true;
                    switch(this._state) {
                        case PLAYING:
                        case BUFFERING:
                            this._debug("doing deferred seek during playback");
                            this._wantseek = true;
                            this._wantpos = seconds;
                            break;
                        default:
                            this._seek_inner(seconds);
                    }
                }
                else {
                    this._seek_inner(seconds);
                }
            }
        },
        _seek_inner : function (seconds) {
            if (this.position() == seconds) {
                this._debug("seek: new position (" + seconds + ") matches current, so taking no action");
            }
            else {
                try {
                    this._nativeSeek(seconds);
                }
                catch(e) {
                    this._warn("caught error seeking -- perhaps your downloader does not support byte ranges? " + e);
                }
            }
            this.play();
        },
        
        position : function() {
            return this._mediaElem && this._mediaElem.currentTime;
        },
        state : function() {
            return this._state;
        },
        setrate : function(r) {
            this._mediaElem.playbackRate = r;
        },
        vol_up : function() { this.setvol(this._volume + 0.05); },
        vol_down : function() { this.setvol(this._volume - 0.05); },
        setvol : function(vol) {
            if(vol > 1) vol = 1;
            else if (vol < 0) vol = 0;
            if(this._volume != vol) {
                this._volume = vol;
                this._debug("setting media element volume to " + this._volume);
                try {
                this._mediaElem.volume = this._volume;
                } catch (e) {
                    this._warn("caught exception setting volume: " + e);
                }
            }
            this._fire_event("volume", { volume : this._volume });
        },
        getvol : function() {
            return this._volume;
        },
        onstate : function(handler) {
            this._add_event_handler("state", handler);
        },
        ontime : function(handler) {
            this._add_event_handler("time", handler);
        },
        onloaded : function(handler) {
            this._cancelReset();
            this._add_event_handler("loaded", handler);
        },
        oninfo : function(handler) {
            //fixme: these never actually get fired
            this._add_event_handler("info", handler);
        },
        onvolume : function(handler) {
            this._add_event_handler("volume", handler);
        },
        enableLog : function(doIt) {
            if(doIt) {
                this._options.debug = true;
                var DEBUG_LOG_TIMEOUT = 1000 * 60 * 60 * 24 * 7; // 1 week in msec
                Cookie.set('PlayerDebugLog', (new Date()).valueOf() + DEBUG_LOG_TIMEOUT);
                if (!this._debugLog) {
                    this._debugLog = new DebugLog("HTML5Player");
                }
            } else {
                Cookie.clear('PlayerDebugLog');
                if (this._debugLog) {
                    this._debugLog.disable();
                    this._debugLog = null;
                }
            }
        },

        //methods to create and destroy the media element.  this needs
        //to happen when switching tracks apparently, because the iphone
        //sometimes seems to have trouble changing the .src property and
        //actually switching the stream to the new track.  This hooks up
        //the appropriate event handlers via _addlistener, which keeps
        //track of the listeners so _destroymedia can remove them all
        //before removing the element.
        _createmedia : function() {
            this._mediaElem = document.createElement("audio");
            this._mediaElem.style.width = "0px";
            this._mediaElem.style.height = "0px";
            this._mediaElem.style.visibility = "hidden";
            this._mediaElem.controls = false;
            document.body.appendChild(this._mediaElem);

            if (this._options.debug) {
                for(var i=0; i < this._loggedEvents.length; i++)
                    this._logevt(this._loggedEvents[i]);
            }

            this._mediaElem.volume = this._volume;
            this._addlistener("loadstart", this._handle_loadstart, this);
            this._addlistener("timeupdate", this._handle_timeupdate, this);
            this._addlistener("progress", this._handle_progress, this);
            this._addlistener("canplay", this._handle_canplay, this);
            this._addlistener("canplaythrough", this._handle_canplay, this);
            this._addlistener("durationchange", this._handle_durationchange, this);
            this._addlistener("playing", this._handle_playing, this);
            this._addlistener("pause", this._handle_pause, this);
            this._addlistener("ended", this._handle_ended, this);
            this._addlistener("stalled", this._handle_stalled, this);
            this._addlistener("waiting", this._handle_waiting, this);
            this._addlistener("error", this._handle_error, this);
        },

        _loggedEvents: [
            "abort",
            "canplay",
            "canplaythrough",
            "durationchange",   
            "emptied",
            "ended",
            "error",
            "loadeddata",
            "loadedmetadata",
            "loadstart",
            "pause",
            "play",
            "playing",
            "progress",
            "ratechange",
            "seeked",
            "seeking",
            "stalled",
            "suspend",
            "timeupdate",
            "volumechange",
            "waiting"
        ],
        _logevt : function(name) {
            this._addlistener(name, this._loghandler(name), this);
        },
        _destroymedia : function() {
            this._removelisteners();
            if(this._mediaElem) {
                document.body.removeChild(this._mediaElem);
                this._nativePause();
                this._mediaElem = null;
            }
        },
        _addlistener : function(name, fn, instance) {
            var handler = function() { fn.apply(instance, arguments); };
            this._listeners.push({name: name, handler: handler});
            this._mediaElem.addEventListener(name, handler, false);
        },
        _removelisteners : function() {
            if(!this._mediaElem) return;

            while(this._listeners.length > 0) {
                var info = this._listeners.pop();
                this._mediaElem.removeEventListener(info.name, info.handler, false);
            }
        },

        _handle_loadstart: function(arg) {

            // Android Browser in Android 4 (tested in 4.1 and 4.3 so far) appears to have a bug where, sometimes,
            // a track will start loading with duration=1 and readyState=4 and will then immediately end, as if the
            // track was really only 1 second long. The symptom is the Pause button immediately switches back to Play,
            // with no audio output. Resetting the src property early in the load sequence appears to work around this.
            //  - sdg 2013.09.06
            var media = this._mediaElem;
            if (this._options.loadStartKick && !this._loadStartKicked && media.duration == 1 && media.readyState == 4) {
                this._loadStartKicked = true;
                this._warn("loadstart: looks like Android Browser duration=1 bug; kicking media.src...");
                this._nativeSrc(media.src);
            }
        },

        _handle_waiting : function(arg) {
            this._debug("waiting");
        },

        // audio element telling us seek pos has changed
        _handle_timeupdate : function(arg) {
            try {
                var media = this._mediaElem;

                if (this._options.deferredSeeks && this._wantseek) {
                    this._debug("applying deferred seek");
                    this._seek_inner(this._wantpos);
                    this._wantseek = false;
                }

                this._cancelPlayKick();
                
                if (this._recentpos.length == 5) // 5: arbitrary; we just want to save a few
                    this._recentpos.shift();
                this._recentpos.push(media.currentTime);

                if (this._playingEventDeferred && this._state == BUFFERING) {
                    this._warn("Play event was deferred; simulating it now...");
                    this._playingEventDeferred = false;
                    this._handle_playing_inner();
                }
     
                var evtparams = { position: media.currentTime };
                
                // iphone sends 0 for media.duration for a while, which is
                // never a useful piece of data.  Leave undefined in thise case.
                // Note that we used to ignore media.duration completely on IOS
                // because it was always 0, but that seems to be fixed.
                if(isFinite(media.duration) && media.duration > 0) {
                    evtparams.duration = media.duration;
                }
                this._fire_event("time", evtparams);

                if(this._options.simulateEndedSafari && this._mediaElem.ended) {
                    this._handle_ended_inner();
                }

                //hack: chrome does not send "progress"
                //      events as it is supposed to.  Use
                //      the timeupdate event handler to
                //      poll for load progress, since we
                //      already have some code running frequently.
                //      Stop doing this when we notice it's done.

                if(!this._finishedloading) {
                    var amtLoaded = this._amountLoaded();
                    if(amtLoaded >= media.duration) {
                        this._finishedloading = true;
                    }
                    if(amtLoaded != this._lastloaded) {
                        this._lastloaded = amtLoaded;
                        evtparams = { loaded: amtLoaded };
                        if(isFinite(media.duration))
                            evtparams.total = media.duration;

                        this._cancelReset();
                        this._fire_event("loaded", evtparams);
                    }
                }
            } catch(e) {
                this._warn("exception in _handle_timeupdate: " + e);
            }
        },

        _handle_progress: function() {
            var media = this._mediaElem;

            // Chrome on Android: On the Nexus 4 running Android 4.2.2, the browser appears not to send "ended" events
            // for many tracks. The problem is consistent: some tracks show it, some don't. When it occurs, we receive
            // "progress" events in which the media.duration, media.currentTime, and media.buffered.end() values are all
            // fixed and nearly identical, but the media.ended property remains false and the "ended" event never
            // occurs. I say "nearly identical", because they don't match exactly: the currentTime and buffered values
            // are floating-point numbers very slighly less than the duration, which always seems to be rounded to the
            // third decimal place. I believe this is probably the cause of the bug: the browser is waiting for
            // currentTime >= duration before considering the track ended, and that doesn't occur without the proper
            // rounding. When the situation is reversed (the currentTime is a slight fraction larger than the duration),
            // the ended event fires as expected. For comparison, on the HTC One running Android 4.1.2, all three values
            // appear to be rounded to three decimal places, so the problem doesn't occur. Our workaround attempts to
            // detect the bug and then simulates an ended event.
            //
            // Examples:
            //
            // bug occurs:
            //    duration=5.042; currentTime=5.041999816894531; buffered=5.041999816894531
            // bug doesn't occur:
            //    duration=2.482; currentTime=2.4820001125335693; buffered=2.4820001125335693
            //
            //   - sdg 2013.09.03
            if ( this._options.simulateEndedAndroid && (this._state == PLAYING) && !media.paused && !media.ended && 
                !isNaN(media.duration) ) {

                var rnd = function(val) { return Math.round(val * 1000); },
                    cur = rnd(media.currentTime),
                    dur = rnd(media.duration),
                    buf = rnd(this._amountLoaded());

                if ( (cur > 0) && (cur === dur) && (cur === buf) ) {
                    this._warn("Did we just hit the Chrome/Android bug in which the 'ended' event isn't fired?");
                    this._warn("Compensating by simulating the event ourselves...");
                    this._handle_ended_inner();
                }
            }
        },

        _handle_ended : function() {
            this._debug("_handle_ended");
            if(!this._options.simulateEndedSafari) {
                this._handle_ended_inner();
            }
        },
        _handle_ended_inner : function() {
            this._debug("_handle_ended_inner");
            try {
                this._wantstoplay = false;
                this._changestate(COMPLETED);
            } catch(e) {
                this._warn("exception in _handle_ended: " + e);
            }
        },

        // In response to "stalled" events, we would like to 
        // perform a media.load() in order to kick the browser
        // into reloading the stream.  However, some versions of
        // safari send spurious "stalled" events on streams that
        // are not stalled, so what we are going to do is schedule
        // the media.load for 7.5 seconds in the future, and only
        // actually do it if the stream really appears stalled
        // (based on whether or not the amount buffered has changed).
        // If data has loaded since the browser claimed to be
        // stalled, just ignore the event.
        _scheduleReset : function(timeout) {
            if (!this._options.resetOnStall) return;

            this._cancelReset();

            var that = this;
            this._warn("scheduling media reset in " + timeout + "ms");
            this._resetTimer = setTimeout(function(){
                    that._resetTimer = null;
                    that._warn("Resetting media (amtloaded = " + that._amountLoaded() + ")");
                    that._nativeLoad();
                }, timeout);
        },

        _cancelReset : function() {
            if (!this._options.resetOnStall) return;
            
            if(this._resetTimer) {
                this._warn("canceling media reset due to load progress (amtloaded = " + this._amountLoaded() + ")");
                clearTimeout(this._resetTimer);
                this._resetTimer = null;
            }
        },

        _schedulePlayKick : function(timeout) {
            if (!this._options.playKick) return;
            
            this._cancelPlayKick();
            var that = this;
            this._warn("scheduling playkick in " + timeout + "ms");
            this._playKickTimer = setTimeout(function() {
                    that._warn("kicking");
                    that._playKickTimer = null;
                    that._nativePause();
                    that._nativePlay();
                    that._warn("kicked");
                }, timeout);
        },
        _cancelPlayKick : function() {
            if (!this._options.playKick) return;

            if(this._playKickTimer) {
                this._warn("canceling playkick timer");
                clearTimeout(this._playKickTimer);
                this._playKickTimer = null;
            }
        },

        _amountLoaded : function() {
            if(this._mediaElem.buffered.length > 0) {
                return this._mediaElem.buffered.end(this._mediaElem.buffered.length - 1);
            }
            return 0;
        },

        _handle_stalled : function() {
            if(this._mediaElem.readyState == HAVE_ENOUGH_DATA) {
                // occasionally we get a stalled event even though the data
                // is all loaded.  Ignore that.
                return;
            }

            this._stallcount += 1;

            if(this._stallcount > MAX_STALLS) {
                // if we stall too many times, just give up by pretending
                // the track has ended.
                this._error("Too many stalls.  Giving up on this track.");
                this._nativePause();
                this._changestate(COMPLETED);
            } else {
                this._debug("stalled, readyState=" + this._mediaElem.readyState + ", amtloaded=" + this._amountLoaded());
                this._scheduleReset(7500);
            }
        },

        _handle_playing : function() {
            if (!(this._options.deferPlayEvents && this._state == BUFFERING))
                this._handle_playing_inner();
            else {
                // Android: Browser and Chrome often appear to trigger the "playing" event several seconds
                // before audio playback actually begins. To avoid this, wait until the first timeupdate instead.
                // This appears more effective in Android 4 than in 2.3, but it doesn't hurt either way.
                //   - sdg 2013.09.09
                this._debug("deferring play event to the next timeupdate");
                this._playingEventDeferred = true;  // see comment in _handle_timeupdate
            }
        },
        _handle_playing_inner : function() {
            try {
                this._changestate(PLAYING);
            }
            catch(e) {
                this._warn("exception in _handle_playing_inner: " + e);
            }
        },
        _handle_pause : function() {
            if ( this._state === COMPLETED &&
                (this._options.simulateEndedSafari || this._options.simulateEndedAndroid) ) {
                // our simulated 'ended' event sometimes causes us to decide to go
                // into the COMPLETED state before getting the 'pause' event at
                // the end of playback.  Ignore that pause if we're simulating 'ended'
                // and we're in the COMPLETED state.
                this._debug("ignoring 'pause' event because state is COMPLETED");
                return;
            }
            if ( this._mediaElem.paused ) {
                this._changestate(PAUSED);
            }
        },
        _handle_canplaythrough : function() {
            this._handle_canplay();
        },
        _handle_canplay : function() {
            try {
            if(this._wantstoplay) {
                this._nativePlay();
            }
            } catch(e) {
                this._warn("exception in _handle_canplay: " + e);
            }
        },

        _handle_error : function(arg) {
            var errorCode = this._mediaElem.error && this._mediaElem.error.code;
            this._error("got native error event; error.code=" + errorCode);

            // called if there's an error downloading content. For Firefox,
            // this can mean that the CDN URL has expired, since it keeps
            // using the redirected URL instead of hitting popplers each
            // time it needs to make a new request. Workaround: force a reload.
            if(this._options.retryErrors) {
                if (this._errorRetryCount < 5)  {
                    // TODO: examine the error code here?
                    this._errorRetryCount += 1;
                    this._warn("assuming error is due to an expired stream URL and reloading; count=" + this._errorRetryCount);
                    this._nativeLoad();
                }
                else {
                    this._warn("exceeded maximum number of error retries; giving up on this track");
                    this._nativePause();
                    this._changestate(COMPLETED);
                }
            }
        },
        
        _handle_durationchange : function() {
            // old android (2.3):
            // some devices get stuck in a mode where the media
            // element claims to be playing but it is not actually
            // playing.  This happens at the same time we receive
            // a durationchange event.  So here we set up a timer
            // which, if we haven't received any 'timeupdate' events
            // indicating play progress) in 500ms, we'll unstick
            // playback by calling .pause() and .play() on the element.
            // This kick is canceled if play is paused or stopped.
            this._schedulePlayKick(500);
        },

        // generate a dummy event handler which just logs the event to debug log
        _loghandler : function(name) {
            var self = this;
            return function() {
                var media = self._mediaElem,
                    buffered = null;
                try {
                    buffered = media.buffered.end(media.buffered.length - 1);
                } 
                catch(e) {}
                this._debug(
                    "[native] " + name + "; paused=" + media.paused + "; ended=" + media.ended + 
                    "; readyState=" + media.readyState + "; duration=" + media.duration + 
                    "; currentTime=" + media.currentTime + "; buffered=" + buffered
                );
            };
        },

        _isbuffering : function() {
            try {
            return this._mediaElem.readyState < HAVE_FUTURE_DATA;
            } catch (e) {}
            return false;
        },

        _changestate : function(newstate) {
            if(newstate == PLAYING && this._isbuffering()) {
                newstate = BUFFERING;
            }

            if(newstate != this._state) {
                var oldstate = this._state;
                this._state = newstate;
                this._debug("state changed from " + oldstate + " to " + newstate);
                this._fire_event("state", { newstate : this._state, oldstate : oldstate });
            }
        },

        _fire_event : function(name, arg) {
            // this._debug("firing event: " + name + " with arg: ", arg);
            var handlers = this._handlers[name];
            if(handlers) {
                for(var i=0; i<handlers.length; i++) {
                    try {
                        handlers[i](this, arg);
                    } catch (e) {
                        this._warn("caught exception in handler for event \"" + name + "\": " + e);
                    }
                }
            }
        },
        _add_event_handler : function(eventname, handler) {
            this._handlers[eventname].push(handler);
        },

        // thin native method/property wrappers, to make debugging easier
        _nativeSrc: function(url) {
            this._debug("[native] setting src to: " + url);
            this._mediaElem.src = url;
        },
        _nativeLoad: function() {
            this._debug("[native] load()");
            this._mediaElem.load();
        },
        _nativeLoadSafe: function() {
            this._debug("[native] load() -- with exception handling");
            try {
                this._mediaElem.load();
            }
            catch (e) {
                this._warn("Got exception when calling native load() -- assuming this is okay and continuing: " + e);
            }
        },
        _nativePlay: function() {
            this._debug("[native] play()");
            this._mediaElem.play();
        },
        _nativePause: function() {
            this._debug("[native] pause()");
            this._mediaElem.pause();
        },
        _nativeSeek: function(position) {
            this._debug("[native] setting currentTime to: " + position + "; previous position: " + this._mediaElem.currentTime);
            this._mediaElem.currentTime = position;
        },

        _debug: function(str) {
            if (this._options.debug)
                this._log("debug", str);
        },
        _info: function(str) {
            this._log("info", str);
        },
        _warn: function(str) {
            this._log("warn", str);
        },
        _error: function(str) {
            this._log("error", str);
        },
        _log: function(level, str) {
            if (this._debugLog) {
                this._debugLog.log(level.toUpperCase() + " - " + str);
            }
            if (typeof Log != "undefined") {
                Log[level]( "HTML5Player-" + this._id + ": " + str );
            }
        }
    };

    var BUFFERING = "BUFFERING";
    var PLAYING = "PLAYING";
    var PAUSED = "PAUSED";
    var IDLE = "IDLE";
    var COMPLETED = "COMPLETED";
        // constants from html5 media interface
    var HAVE_FUTURE_DATA = 3;
    var HAVE_ENOUGH_DATA = 4;
    var MAX_STALLS = 20;
    var _useLocationHack = false;

    HTML5Player.supportedFormats = function() {
            var formats = {
            };
             
            function iphoneVersion(uastring) {
                var match = uastring.match(/Version\/([0-9\.]*)/);
                if(!match) return null; //couldn't find version number
                
                return _parseversion(match[1]);
            }

            if(navigator.userAgent.indexOf("iPhone") != -1) {
                var iphoneVer = iphoneVersion(navigator.userAgent);
                if(iphoneVer && (iphoneVer[0] < 4 || (iphoneVer[0] === 4 && (iphoneVer[1] === 0) && (iphoneVer.length === 2 || iphoneVer[2] === 0))))
                    return {};
            }
    
            try {
                var media = document.createElement("audio");
                var canplay = media.canPlayType("audio/mpeg");
                formats["mp3-128"] = (canplay == "probably" || canplay == "maybe");
                
                canplay = media.canPlayType('audio/mpeg; codecs="mp4a.40.2"');
                formats["aac-lo"] = (canplay == "probably" || canplay == "maybe");
                
                /* Some browsers (IE mostly) respond to 'audio/mp4' instead, so check that, too */
                if(!formats["aac-lo"]) {
                    canplay = media.canPlayType('audio/mp4; codecs="mp4a.40.2"');
                    formats["aac-lo"] = (canplay == "probably" || canplay == "maybe");
                }

                canplay = media.canPlayType('audio/ogg; codecs="vorbis"');
                formats["vorbis-lo"] = (canplay == "probably" || canplay == "maybe");

                canplay = media.canPlayType('audio/ogg; codecs="opus"');
                formats["opus-lo"] = (canplay == "probably" || canplay == "maybe");
                
                // no version of chrome actually supports opus yet
                if(formats["opus-lo"] && navigator.userAgent.indexOf(" Chrome/") != -1) {
                    formats["opus-lo"] = false;
                }

            } catch(e) {}

            if(!formats) {
                // android < 2.3 lets us play the stream, but not using the HTML5
                // interfaces, so we'll return that it's supported so that the
                // player gets set up, then this implementation will use the location
                // trick on play().
                var match = navigator.userAgent.toString().match(/Android ([0-9\.]*)/);
                if(match) {
                    var ver = _parseversion(match[1]);
                    if ((ver[0] < 2) || (ver[0] == 2 && ver[1] < 3)) {
                        _useLocationHack = true;
                        Log.debug("using location <= stream workaround");
                        formats["mp3-128"] = true;
                        // I guess old Android can play AAC, too -- test this assertion before relying on it
                        formats["aac-lo"] = true;
                    }
                }
            }
    
            return formats;
        };
        
    HTML5Player.needLocationHack = function() {
            var match = navigator.userAgent.toString().match(/Android ([0-9\.]*)/);
            if(!match) return false;

            var v = _parseversion(match[1]);

            // need location hack if version less than 2.3
            return (v[0] < 3) || (v[0] == 3 && v[1] < 3);
        };

        function _parseversion(str) {
            var vparts = str.split('.');
            for(var i=0; i<vparts.length; i++) {
                vparts[i] = Number(vparts[i]);
            }
            return vparts;
        }

    HTML5Player.enableLog = function(doIt) {
        var DEBUG_LOG_TIMEOUT = 1000 * 60 * 60 * 24 * 7; // 1 week in msec

        if(doIt) {
            Cookie.set('PlayerDebugLog', (new Date()).valueOf() + DEBUG_LOG_TIMEOUT);
        } else {
            Cookie.clear('PlayerDebugLog');
        }
    };
    HTML5Player.logEnabled = function() {
        var cookie = Cookie.get('PlayerDebugLog');
        return cookie && parseInt(cookie) > (new Date()).valueOf();
    };

    return HTML5Player;
}();
;
/* ------------- BEGIN sound.js --------------- */;
var Sound = {

    // 'whenloaded' -- get a callback when
    // the sound system is loaded, or immediately
    // if it's already done
    //
    // 'callback' is a function that takes
    // an status hash that indicates info
    // about the sound startup result
    //   soundcallback(status) {}
    //      info => {
    //          success: true/false,
    //          subsystem: "flash"|"html5",
    //          has_viz: true/false,
    //          error: brief error code string (only set if success=false)
    //      }

    _callbacks : [],
    _status : null,     // keep a copy of status info
    _loadstarted : false,
    
    whenloaded : function(callback) {
        Sound._showdebug("wl");
        if(!Sound._status) {
            // sound is not loaded yet.  load it.

            Sound._showdebug("init");
            Sound._callbacks.push(callback);
            Sound._load_wrapper();
        } else {
            try {
                callback(Sound._status)
            } catch (e) {
            }
        }
    },

    _docallbacks : function() {
        while(Sound._callbacks.length > 0) {
            Sound._docallback(Sound._callbacks.pop());
        }
    },

    _docallback : function(cb) {
        try {
            cb(Sound._status);
        } catch (e) {
            Log.error("caught error in Sound.whenloaded callback: " + e)
        }
    },
    _showdebug : function(text) {
        var e = document.getElementById("sounddebug");
        if(e) {
            e.innerText = text;
        }
    },
    _load_wrapper : function() {
        Sound._status = {
            success: true,
            subsystem: "wrapper",
            has_viz: "false"
        };
        Sound.SoundPlayer = WrapperSoundPlayer;

        // Log.debug("using Wrapper for sound");

        Sound._docallbacks();
    }

};

var FlashSound = {
    _callbacks : [],
    _loadstarted : false,
    _status : null,
    
    whenloaded : function(callback) {
        FlashSound._showdebug("wl");
        if(!FlashSound._status) {
            // sound is not loaded yet.  load it.

            FlashSound._showdebug("init");
            FlashSound._callbacks.push(callback);

            if(!FlashSound._loadstarted) {
                FlashSound._loadstarted = true;
                FlashProxy.whenclassready("SoundPlayer", FlashSound._flashready, FlashSound._flashfailed);
            }
        } else {
            try {
                callback(FlashSound._status)
            } catch (e) {
            }
        }
    },

    _docallbacks : function() {
        while(FlashSound._callbacks.length > 0) {
            FlashSound._docallback(FlashSound._callbacks.shift());
        }
    },

    _docallback : function(cb) {
        try {
            cb(FlashSound._status);
        } catch (e) {
            Log.error("caught error in FlashSound.whenloaded callback: " + e)
        }
    },

    _flashready : function() {
        Log.debug("flash is ready for sound!");
        FlashSound._status = {
            success : true,
            subsystem : "flash"
        };
        FlashSound._showdebug("flash");
        FlashSound._docallbacks();
    },

    _showdebug : function(text) {
        var e = document.getElementById("sounddebug");
        if(e) {
            e.innerText = text;
        }
    },

    _flashfailed : function() {
        Log.debug("All sound subsystems failed to load.");
        FlashSound._status = {
            success : false,
            error : "noflash"
        };
        FlashSound._docallbacks();
        //UISTRING!
        NuDialog.alert("Error", "Unable to play audio.  Your browser must support native playback of MP3 or you must have the Adobe Flash Player installed.");
    }
};
    
var WrapperSoundPlayer = function() {
    function WrapperSoundPlayer() {
        var self = this;
        self._html5player = null;
        self._flashplayer = null;
        self._html5formats = HTML5Player.supportedFormats();
        self._flashstate = null;
        self._currentplayer = null;
        self._handlers = {
            state : [],
            time : [],
            loaded : [],
            info : [],
            volume : []
        };
        
        /*  on load, check if we support any HTML5 formats. If we do, create a HTML5 player.
            If we don't, we do nothing.
            Later, if we have no HTML5 player, or content that we can't play using HTML5,  we
            can lazily create a Flash player.
        */
        var formatsSupported = [];
        
        for(var format in self._html5formats) {
            if(self._html5formats.hasOwnProperty(format) && self._html5formats[format] == true) {
                formatsSupported.push(format);
            }
        }
        
        if(formatsSupported.length > 0) {
            // Log.debug("WrapperSoundPlayer: using HTML5 for player (where possible)");
            // Log.debug("formats supported " + formatsSupported);
            self._html5player = new HTML5Player();
            self._html5player.ontime(function(target, x) {
                self._fire_event("time", x);
            });
            self._html5player.onstate(function(target, x) {
                self._fire_event("state", x);
            });
            self._html5player.onloaded(function(target, x) {
                self._fire_event("loaded", x);
            });
            self._html5player.oninfo(function(target, x) {
                self._fire_event("info", x);
            });
            self._html5player.onvolume(function(target, x) {
                self._fire_event("volume", x);
            });
            
            self._currentplayer = "html5";
        } 
        
        self._add_event_handler = function(eventname, handler) {
            self._handlers[eventname].push(handler);
        }
        // don't wrap these. instead, keep track of all the event handlers, then call them when the
        // underlying players trigger these events
        self.onstate = function(handler) {
            self._add_event_handler("state", handler);
        }
        self.ontime = function(handler) {
            self._add_event_handler("time", handler);
        }
        self.onloaded = function(handler) {
            //self._cancelReset();
            self._add_event_handler("loaded", handler);
        }
        self.oninfo = function(handler) {
            //fixme: these never actually get fired
            self._add_event_handler("info", handler);
        }
        self.onvolume = function(handler) {
            self._add_event_handler("volume", handler);
        }
        self._fire_event = function(name, arg) {
            //Log.debug("firing " + name + " events");
            handlers = self._handlers[name];
            if(handlers) {
                for(var i=0; i<handlers.length; i++) {
                    try {
                        if(self._currentplayer == "html5") {
                            handlers[i](self._html5player, arg);
                        } else {
                            handlers[i](self._flashplayer, arg);
                        }
                    } catch (e) {
                        Log.debug("caught exception in handler for event \"" + name + "\": " + e);
                    }
                }
            }
        }
        self.createFlashPlayer = function() {
            self._flashstate = "loaded";
            self._flashplayer = new FlashProxy.SoundPlayer();
            self._flashplayer.ontime(function(target, x) {
                self._fire_event("time", x);
            });
            self._flashplayer.onstate(function(target, x) {
                self._fire_event("state", x);
            });
            self._flashplayer.onloaded(function(target, x) {
                self._fire_event("loaded", x);
            });
            self._flashplayer.oninfo(function(target, x) {
                self._fire_event("info", x);
            });
            self._flashplayer.onvolume(function(target, x) {
                self._fire_event("volume", x);
            });
        }
        
        self.load = function(url) {
            var preferredformat = null;
            var preferredurl = null;
            
            if(typeof url === 'string') {
                // assume MP3
                preferredurl = url;
                preferredformat = "mp3-128";
            } else {
                var formats = ["aac-lo", "mp3-128", "opus-lo", "vorbis-lo"];
                for(var i=0; i < formats.length; i++) {
                    if(self._html5formats[formats[i]] && url[formats[i]]) {
                        preferredformat = formats[i];
                        break;
                    }
                }
                
                if(!preferredformat) {
                    // no available HTML5-supported format -- fall back to Flash-supported formats
                    var flashformats = ["aac-lo", "mp3-128"];
                    for(var i=0; i < flashformats.length; i++) {
                        if(url[flashformats[i]]) {
                            preferredformat = flashformats[i];
                            break;
                        }
                    }
                }
                
                /*if(!preferredformat) {
                    // should never get here, but if we do, default to aac-lo
                    preferredformat = "aac-lo";
                }*/
                preferredurl = url[preferredformat];
            }
            
            if(self._html5formats[preferredformat]) {
                // use HTML5 player
                self._currentplayer = "html5";
                self._html5player.load(preferredurl);
            } else {
                // use flash player
                self._currentplayer = "flash";
                if(self._flashplayer) {
                    self._flashplayer.load(preferredurl);
                } else {
                    Log.debug("WrapperSoundPlayer: HTML5 playback doesn't support " + preferredformat + ", loading flash");
                    self._flashstate = "loading";
            
                    FlashSound.whenloaded(function() {
                        self.createFlashPlayer();
                        self._flashplayer.load(preferredurl);
                    });
                }
            }
        }
        
        // returns a proxy method that will call the corresponding method on _soundplayer
        // after an asynchronous call to Sound.whenready results in _soundplayer being created.
        function make_lazy_stub(fname) {
            return function() {
                var args = arguments;
                if(self._currentplayer == "html5") {
                    // Log.debug("html5 proxy method " + fname);
                    self._html5player[fname].apply(self._html5player, args);
                } else {
                    Log.debug("flash1 proxy method " + fname);
                    FlashSound.whenloaded(function() {
                        // Log.debug("flash2 proxy method " + fname);
                        self._flashplayer[fname].apply(self._flashplayer, args);
                    });
                }
            }
        }
        // returns a proxy method that will call the corresponding method on _soundplayer
        function make_simple_proxy(fname) {
            return function() {
                var args = arguments;
                if(self._currentplayer == "html5") {
                    self._html5player[fname].apply(self._html5player, args);
                } else {
                    if(self._flashplayer) {
                        try {
                            self._flashplayer[fname].apply(self._flashplayer, args);
                        } catch(e) {
                            if(!self._loggedException) {
                                self._loggedException = true;
                                Log.error("WrapperSoundPlayer proxy for " + fname + "(): caught exception: " + e);
                            }
                        }
                    } else {
                        Log.error("WrapperSoundPlayer proxy for " + fname + "(): no _soundplayer instance!");
                    }
                }
            }
        }
    
        // the following stubs will lazily cause an async call to Sound.whenloaded.  All other
        // stubs will just proxy straight through to the underlying instance.  This list must
        // be a complete set of all the methods that might be the first method invoked on a
        // SoundPlayer instance.  If one of these isn't invoked first, the others will fail.
        // Note that some methods in SoundPlayer cannot be lazystubs because they return
        // values.
        var lazystubs = ["play", "pause", "stop", "seek"];
        var lazymap = {};
        for(var i=0; i<lazystubs.length; i++) {
            lazymap[lazystubs[i]] = true;
        }

        for(var k in HTML5Player.prototype) {
            if(k == "load") continue;
            if(k == "ontime") continue;
            if(k == "onstate") continue;
            if(k == "onloaded") continue;
            if(k == "oninfo") continue;
            if(k == "onvolume") continue;
            
            if((typeof HTML5Player.prototype[k]) == "function" && k.substr(0,1) != "_") {
                if(lazymap[k]) {
                    self[k] = make_lazy_stub(k);
                } else {
                    self[k] = make_simple_proxy(k);
                }
            }
        }
    }
    return WrapperSoundPlayer;
}();

// LazySound is still used in a couple of places. It can be removed once those are gone
var LazySound = function() {
    function LazySound() {
        var self = this;
        self._soundplayer = null;
        self._loggedException = false; // if we catch an exception, don't keep logging them

        self.whenInstanceReady = function(callback) {
            Sound.whenloaded(function(status) {
                if(status.success) {
                    if(!self._soundplayer) {
                        // Log.info("LazySound creating SoundPlayer instance");
                        self._soundplayer = new Sound.SoundPlayer();
                    }
                    callback(self._soundplayer);
                } else {
                    Log.error("LazySound: Sound.whenloaded failed: ", status);
                }
            });
        }

        // returns a proxy method that will call the corresponding method on _soundplayer
        // after an asynchronous call to Sound.whenready results in _soundplayer being created.
        function make_lazy_stub(fname) {
            return function() {
                var args = arguments;
                self.whenInstanceReady(function(sp) {
                        sp[fname].apply(sp, args);
                    });
            }
        }

        // returns a proxy method that will call the corresponding method on _soundplayer
        function make_simple_proxy(fname) {
            return function() {
                var args = arguments;
                if(self._soundplayer) {
                    try {
                        self._soundplayer[fname].apply(self._soundplayer, args);
                    } catch(e) {
                        if(!self._loggedException) {
                            self._loggedException = true;
                            Log.error("LazySound proxy for " + fname + "(): caught exception: " + e);
                        }
                    }
                } else {
                    Log.error("LazySound proxy for " + fname + "(): no _soundplayer instance!");
                }
            }
        }

        // the following stubs will lazily cause an async call to Sound.whenloaded.  All other
        // stubs will just proxy straight through to the underlying instance.  This list must
        // be a complete set of all the methods that might be the first method invoked on a
        // SoundPlayer instance.  If one of these isn't invoked first, the others will fail.
        // Note that some methods in SoundPlayer cannot be lazystubs because they return
        // values.
        var lazystubs = ["play", "pause", "stop", "load", "onstate", "ontime", "onloaded", "oninfo", "onvolume", "seek"];
        var lazymap = {};
        for(var i=0; i<lazystubs.length; i++) {
            lazymap[lazystubs[i]] = true;
        }

        for(var k in HTML5Player.prototype) {
            if((typeof HTML5Player.prototype[k]) == "function" && k.substr(0,1) != "_") {
                if(lazymap[k]) {
                    self[k] = make_lazy_stub(k);
                } else {
                    self[k] = make_simple_proxy(k);
                }
            }
        }
    }
    return LazySound;
}();
;
/* ------------- BEGIN cookie.js --------------- */;
// Copyright 2008 Bandcamp, Inc. All rights reserved.

var CommUtils = {

    beacon: function( url, args ) {
        return this._loadImage( url, args, true );
    },

    loadImage: function( url ) {
        return this._loadImage( url );
            // TODO: might want to manage these, in an array,
            // sending them out sequentially... not sure it
            // matters for our purposes. We use them it loading
            // up the large versions of package gallery images
            // after page load. -- kj
    },

    _loadImage: function( url, args, randomize, on_finish ) {
        var bcn = document.createElement('img');
        var save_my_bcn = bcn;
            // an alternate reference because on older IEs,
            // our closure can actually fire before we return--
            // and nulling out bcn before the return statement!

        bcn.style.display = "none";
        bcn.onload = bcn.onerror = function() {
                var e;
                // ran into a problem where a script error in here would
                // break all future YUI dialogs (?!?).  Bullet-proofing:
                try {
                    bcn = null; // break closure
                    if ( on_finish ) on_finish(); // call external callback
                } catch ( e ) { }
            };

        if ( randomize && !args.rand )
            args.rand = Math.random().toString().substring( 2 );

        bcn.src = Url.addQueryParams( url, args );

        return save_my_bcn;
    },

    zzz: null
};

var Cookie = {

    // the header in which the cookie will be sent as an alternate
    // to the normal cookie header (so we can force e.g. flash to
    // send it)
    ALT_IDENTITY_PARAM : 'BandcampIdentity',
        
    // Returns the specified cookie values by name, or null if not found.
    // If there are multiple matches, they are returned in an array.
    get: function( cookieName ) {
    
        $assert( Text.notEmpty( cookieName ) );
        
        var cookie = Cookie.getAll()[ cookieName ];
        if ( cookie == null )
            cookie = null; // normalize undef to null
        return cookie;
    },
    
    // Returns all active cookies in a hash object, with the cookie names 
    // as the keys. If more than one cookie was found with the same name 
    // (possible, if the cookies had different paths, domains, or secure settings),
    // then that value will be an array.
    getAll: function() {
        
        function push( name, val ) {
            var existingVal = out[ name ];
            if ( !existingVal )
                out[ name ] = val;
            else if ( U.isArray( existingVal ) )
                existingVal.push( val );
            else
                out[ name ] = [ existingVal, val ];
        }
        
        var pairs = document.cookie.split( /;\s*/ );
        var out = {};
        for ( var i=0; i < pairs.length; i++ ) {
            var pair = pairs[i].split( "=" );
            if ( pair[1] ) {
                var paramName, paramValue;
                try {
                    paramName  = decodeURIComponent( pair[0] );
                    paramValue = decodeURIComponent( pair[1] );
                }
                catch (e) {
                    // malformed URL encoding can cause decodeURIComponent to throw URIErrors;
                    // this shouldn't happen here (we created the cookie, after all), but let's be cautious
                    Log.error("Cookie.getAll: error when decoding URL parameter, skipping; ", e);
                    continue;
                }
                push( paramName, paramValue );
            }
        }
        return out;
    },    
    
    // Sets the named cookie. The only required value is cookieName.
    set: function( cookieName, cookieValue, maxAge, path, domain, secure ) {
        
        $assert( Text.notEmpty( cookieName ) );
        $assert( maxAge == null || U.isNumber( maxAge ) );
        
        if ( cookieValue == null )
            cookieValue = "";
        if ( !path )
            path = "/";
        if ( !domain )
            domain = Cookie._secondLevelDomain();
        var expiresDate;
        if ( maxAge != null ) {
            // FF (and possibly others) support the newer max-age option directly,
            // but IE still wants the older expires syntax.
            expiresDate = new Date( new Date().getTime() + ( maxAge * 1000 ) );
        }
        
        var enc = encodeURIComponent;
        var cookie = enc( cookieName ) + "=" + enc( cookieValue ) +
                        ";path=" + path + 
                        ( domain != null ? ";domain=" + domain : "" ) +
                        ( expiresDate ? ";expires=" + expiresDate.toUTCString() : "" ) +
                        ( secure ? ";secure" : "" );
        document.cookie = cookie;
        return cookie; // for debugging
    },
    
    // Clears the named cookie. Note that the path, domain, and secure
    // settings must match what was used when the cookie was created.
    clear: function( cookieName, path, domain, secure ) {
        
        // the max-age=-1 here is what does the magic
        return Cookie.set( cookieName, "", -1, path, domain, secure );
    },
    
    _secondLevelDomain: function() {
        
        var parts = location.hostname.split( "." );
        var len = parts.length;
        $assert( len >= 1 );
        if ( len == 1 )
            return null; // FF, at least, won't save the cookie if we specify a dotless domain
        return "." + parts[ len - 2 ] + "." + parts[ len - 1 ];
    }
};
var HiddenParams = {};
(function() {
    var cookie = Cookie.get("hiddenParams");
    if (cookie) {
        Cookie.clear("hiddenParams");
        var query = Url.parseQuery(cookie);
        if (query) { HiddenParams = query }
    }
})();
;
_jsb[_jsb.length-1].c=1;