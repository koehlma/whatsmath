var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var {Cc, Ci} = require("chrome");

require("sdk/preferences/service").set("extensions.sdk.console.logLevel", "debug");

var httpRequestObserver = {
    init: function() {
        var observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
        observerService.addObserver( this, 'http-on-examine-response', false );
        observerService.addObserver( this, 'http-on-examine-cached-response', false );
        observerService.addObserver( this, 'http-on-examine-merged-response', false );
    },

    observe: function(subject, topic, data) {
        if (topic === 'http-on-examine-response' || topic === 'http-on-examine-cached-response' || topic === 'http-on-examine-merged-response' ) {
            subject.QueryInterface(Ci.nsIHttpChannel);
            subject.QueryInterface(Ci.nsITraceableChannel);
            if (/.*web\.whatsapp\.com/.test(subject.URI.spec)) {
                subject.setResponseHeader("Content-Security-Policy", "script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.mathjax.org;", false);
                subject.setResponseHeader("X-Content-Security-Policy", "script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.mathjax.org;", false);
            }
        }
    }
};

httpRequestObserver.init();

pageMod.PageMod({
  include: "*.whatsapp.com",
  contentScriptFile: self.data.url('main.js')
});
