if (themoneytizer_async != 1) {
var confiantWrap = function confiantWrap(a,b,c,d,e){function f(a){return(m(a)||"")[s]("/","_")[s]("+","-")}function g(b,c,d){var e=w+n(b)+"&d="+c,f="err__"+1*new Date;k[f]=d;var g="<"+q+" on"+t+'="void('+f+'())" '+r+'="'+e+'" type="text/java'+q+'" ></'+q+">";a[v](g)}function h(){var c=f(d+"/"+x.k.hb_bidder[0]+":"+x.k.hb_size[0]),h={wh:c,wd:l.parse(l[u](x)),wr:0};g(c,f(l[u](h)),function(){a[v](b.ad)});var i={prebid:{adId:b.adId,cpm:b.cpm}},j={d:h,t:b.ad,cb:e,id:i};k[d]={},k[d][c]=j}var i=b.bidder,j=b.size,k=a.parentWindow||a.defaultView,l=k.JSON,m=k.btoa,n=k.encodeURIComponent;if(!l||!m)return!1;var o="t",p="i",q="script",r="src",s="replace",t="error",u="stringify",v="wr"+p+o+"e",w="https://"+c+"/?wrapper="+n(d)+"&tpid=",x={k:{hb_bidder:[i],hb_size:[j]}};return h(),a.close(),!0};
var themoneytizer_async = 1;
(function(){window.whenFormatFctDefined=function($context,$variable){if($context[$variable]){$context[$variable]()}else{Object.defineProperty($context,$variable,{configurable:!0,enumerable:!0,writeable:!0,get:function(){return this['_'+$variable]},set:function(val){this['_'+$variable]=val;$context[$variable]()}})}}}).call(this);
(function(){window.whenDefined=function($context,$variable,$callback){if($context[$variable]){$callback()}else{Object.defineProperty($context,$variable,{configurable:!0,enumerable:!0,writeable:!0,get:function(){return this['_'+$variable]},set:function(val){this['_'+$variable]=val;$callback()}})}}}).call(this);
if (window.jQuery) {
if (jQuery.ajaxSetup) {
jQuery.ajaxSetup({cache:true});
}
}
var geo = document.createElement('script');
geo.type = 'text/javascript';
geo.async = true;
geo.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//g.themoneytizer.net/g/';
var node = document.getElementsByTagName('script')[0];
node.parentNode.appendChild(geo);
var excludeconfiant = ["AL", "DZ", "AO", "AZ", "BH", "BD", "BJ", "BF", "BI", "CM", "CF", "TD", "CN", "CG", "CD", "EG", "GA", "GH", "GN", "IN", "ID", "IR", "IQ", "KZ", "KE", "KW", "LB", "MY", "ML", "MR", "MA", "NE", "NG", "OM", "PK", "QA", "RW", "SA", "SN", "SY", "TG", "TN", "TR", "AE", "VN", "ZM", "ZW"];
var eucountries = ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE","EU", "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"];
(function(){var s=document.createElement('script'),
t=document.getElementsByTagName('script')[0];s.type='text/javascript';
s.src='https://ads.themoneytizer.com/moneyvisibility.js';t.parentNode.insertBefore(s,t)})();
(function(){var s=document.createElement('script'),
t=document.getElementsByTagName('script')[0];s.type='text/javascript';
s.src='https://ads.themoneytizer.com/moneybile.js';t.parentNode.insertBefore(s,t)})();

var iframe = document.createElement("iframe");
iframe.src = "https://onetag-sys.com/usync/?pubId=2a897e3f18e6769&cb=" + new Date().getTime();
iframe.style.display = "none";
var node = document.getElementsByTagName('script')[0];
node.parentNode.appendChild(iframe);
(function() {

var pulse = document.createElement('script');
pulse.type = 'text/javascript';
pulse.async = true;
pulse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//tag.contextweb.com/getjs.static.js';
var node = document.getElementsByTagName('script')[0];
node.parentNode.appendChild(pulse);
})();
var _captifyAnalytics = _captifyAnalytics || [];
    _captifyAnalytics.push('3');
(function(){var s=document.createElement('script'),
t=document.getElementsByTagName('script')[0];s.type='text/javascript';s.async=true;
s.defer=true;s.src=('https:' == document.location.protocol ? 'https:' : 'http:')+'//p.cpx.to/p/11528/px.js?r='+(65536*(1+Math.random())|0).
toString(16);t.parentNode.insertBefore(s,t)})();

var sas = sas || {};
sas.cmd = sas.cmd || []; 

 sas.cmd.push(function() {
             sas.setup({networkid: 1097, domain: "//ww1097.smartadserver.com", async: true, renderMode: sas.renderMode.ON_DEMAND });
        });

var generic = document.createElement("script");
generic.setAttribute("type", "text/javascript");
generic.setAttribute("src", "https://ww1097.smartadserver.com/config.js?nwid=1097");
document.head.appendChild(generic);

   var criteoCallback = function (data) {
            if (data && data.status === "OK") {
                sas.cmd.push(function () { sas.setPartnerId("79", data.userid); });
            }
            sas.cmd.push(function(){sas.render();});
        }
 
        setTimeout(criteoCallback, 200);
        var criteo_gum = document.createElement("script");
criteo_gum.setAttribute("type", "text/javascript");
criteo_gum.setAttribute("src", "//gum.criteo.com/sync?c=147&r=2&j=criteoCallback");
criteo_gum.setAttribute("async", "true");
document.head.appendChild(criteo_gum);

var pwidget_config = {
     publisherKey:"1sbtjc2sqopftf032cn",
     shareQuote:false
};
function loadScriptTemelio(url, callback) { var script = document.createElement("script");

    script.type = "text/javascript"; script.async = true;

    if (script.readyState) { script.onreadystatechange = function () {

    if (script.readyState == "loaded" || script.readyState == "complete") {

script.onreadystatechange = null;

if (callback && typeof callback === "function") { callback(); }

    } }; } else { script.onload = function () { if (callback && typeof callback === "function") { callback(); } }; }

    script.src = url;

    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);

}
loadScriptTemelio('//tag.leadplace.fr/libJsLP.js', function () { libJsLeadPlace.SendtoLPbyIframe("id=MTIZ"); });

 (function(win, doc) {
        var id5 = {
            partnerId : 12,
            cascades  : 9,
            hasTcfCmp : true,
            debug     : true,

            makeUrl: function() {
                var isSync = (typeof this.callType != 'undefined' && this.callType.toLowerCase() === 'sync' && this.myUid && this.myUid.length > 0);
                return 'https://id5-sync.com/'+(isSync?'s':'i')+'/'+this.partnerId+'/'+this.cascades+'.gif?'+(isSync?'puid='+encodeURIComponent(this.myUid)+'&':'')+'gdpr='+encodeURIComponent(this.gdprApplies||'')+'&gdpr_consent='+encodeURIComponent(this.consentData||'');
            },
            prepareId5Pixel: function() {
                if(doc.readyState !== 'loading') {
                    this.fireId5Pixel();
                } else {
                    doc.addEventListener('DOMContentLoaded', function () {
                        id5.fireId5Pixel();
                    });
                }
            },
            fireId5Pixel: function() {
                var url = this.makeUrl();
                this.log('Firing ID5 pixel at url:', url);
                (new Image()).src = url;
            },
            processTcfResults: function(result) {
                this.log('Received TCF result', result);
                this.gdprApplies = result.gdprApplies;
                this.consentData = result.consentData;
            },
            init: function() {
                if(this.hasTcfCmp){
                    try {
                        win.__cmp('getConsentData', null, function(result) {
                            id5.processTcfResults(result);
                            id5.prepareId5Pixel();
                        });
                    } catch (e) {
                        id5.log('Exception received while calling TCF CMP', e);
                        id5.prepareId5Pixel();
                    }
                } else {
                    id5.prepareId5Pixel();
                }
            },
            log: function(msg, data) {

  
            }
        };
        id5.init();
    })(window, document);
  }