(function(exports, kg) {

    'use strict';

    if (typeof kg === 'undefined') {
        return;
    }

    var vendorPrefixes = ['Webkit', 'Moz', 'ms', 'Ms'];

    var sniffer = {
        pixelDensity: 1,
        fullscreen: false,
        inApplicationMode: null,
        isTouchDevice: false,
        isHighRes: false,
        transitionEndEvent: null,
        allowsFullscreen: false,
        isIPhone: false
    };

    function init() {

        if (exports.navigator.standalone) {
            sniffer.standalone = true;
        }

        sniffer.touch = (function() {
            return ('ontouchstart' in document.documentElement);
        }());

        sniffer.audio = (function() {

        	var r = false;
        	var a = document.createElement('audio');
        	r = a.canPlayType('audio/mpeg');
        	a = null;
        	return r;
        	
        }());

        sniffer.pushState = !! (window.history && window.history.pushState);

        sniffer.transition = !! cssSupports('transition') && !! cssSupports('transform');

        if (window.devicePixelRatio !== undefined) {
            sniffer.pixelDensity = window.devicePixelRatio;
        }

        if (screen.width >= 1200 || sniffer.pixelDensity >= 1.5) {
            sniffer.highRes = true;
        }

        if (typeof document.documentElement.webkitRequestFullScreen != 'undefined' || typeof document.documentElement.mozRequestFullScreen != 'undefined' || typeof document.documentElement.requestFullScreen != 'undefined') {
            sniffer.fullscreen = true;
        }
    }

    function cssSupports(property) {

        var div = document.createElement('div'),
            len = vendorPrefixes.length,
            adjustedProperty = '';

        if (property in div.style) {
            div = null;
            return {
                prop: property,
                vendor: 'default',
                combined: property
            };
        }

        adjustedProperty = property.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        });

        while (len--) {

            if (vendorPrefixes[len] + adjustedProperty in div.style) {
                div = null;
                return {
                    prop: property,
                    vendor: vendorPrefixes[len],
                    combined: vendorPrefixes[len] + adjustedProperty
                };
            }
        }

        div = null;
        return false;
    }

    sniffer.css = cssSupports;

    init();

    kg.sniffer = sniffer;

}(window, window.kg));