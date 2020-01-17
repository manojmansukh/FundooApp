
var libJsLeadPlace = {
 _author:"LeadPlace Dvpt",
 _version:"1.03",
 _scriptIframe:"//" + 'tag.leadplace.fr' + "/wckr.php",

SendtoLPbyIframe:function(_param) {
  var _ifr=document.createElement("iframe");
  if (!window.__cmp) {
    // find the CMP frame
    var f = window;
    var cmpFrame;
    while (!cmpFrame) {
      try {
        if (f.frames["__cmpLocator"]) cmpFrame = f;
      } catch (e) {
      }
      if (f === window.top) break;
      f = f.parent;
    }

    var cmpCallbacks = {};

    /* Set up a __cmp function to do the postMessage and
       stash the callback.
       This function behaves (from the caller's perspective)
       identically to the same frame __cmp call */
    _ifr.__cmp = function (cmd, arg, callback) {
      if (!cmpFrame) {
        callback({msg: "CMP not found"}, false);
        return;
      }
      var callId = Math.random() + "";
      var msg = {
        __cmpCall: {
          command: cmd,
          parameter: arg,
          callId: callId
        }
      };
      cmpCallbacks[callId] = callback;
      cmpFrame.postMessage(msg, '*');
    }

    /* when we get the return message, call the stashed callback */
    window.addEventListener("message", function (event) {
      var msgIsString = typeof event.data === "string";
      var json = event.data;
      if (msgIsString) {
        try {
          json = JSON.parse(event.data);
        } catch (e) {}
      }

      if (json.__cmpReturn) {
        var i = json.__cmpReturn;
        if (typeof(cmpCallbacks[i.callId]) === "function") {
          cmpCallbacks[i.callId](i.returnValue, i.success);
        }
        delete cmpCallbacks[i.callId];
      }
    }, false);
  }
  else
  {
    _ifr.__cmp = window.__cmp;
  }

  /* example call of the above __cmp wrapper function */
  _ifr.__cmp('getConsentData', null, function (result, success) {
    var gdprQs="";
    if (success) {
      // consentData contains the base64-encoded consent string
      var consentData = result.consentData;

      // gdprApplies specifies whether the user is in EU jurisdiction
      var gdprApplies = result.gdprApplies ? 1 : 0;
      gdprQs += "gdpr=" + gdprApplies + "&gdpr_consent=" + consentData + "&";

      // pass these 2 values to all ad / pixel calls
    } else {
      // an error occurred.
      gdprQs="nogdpr&"
      //console.log(result);
    }

    _ifr.src=document.location.protocol+libJsLeadPlace._scriptIframe+"?"+gdprQs+ _param;
    _ifr.style.width="0px";_ifr.style.height="0px";_ifr.style.border="0px";
    _ifr.style.display="none";_ifr.style.visibility="hidden";
    var a=document.getElementsByTagName("head")[0];
    if(a) a.appendChild(_ifr);
  });
}

};
