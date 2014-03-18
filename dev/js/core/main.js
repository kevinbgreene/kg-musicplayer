(function(exports, $) {

    'use strict';

    var idCounter = 0;

    if (typeof exports.kg === 'undefined') {
        exports.kg = {};
    }

    kg.uniqueId = function() {
    	return idCounter ++;
    };

    kg.log = function(msg, data) {

        if (typeof console !== 'undefined') {
            console.log(msg, data);
        }
    };

    kg.extend = function(obj1, obj2) {

    	var key = null;

        for (key in obj2) {
            obj1[key] = obj2[key];
        }

        return obj1;
    };

    kg.formatTime = function(time) {
    	
		var mm = Math.floor(time / 60);
		var ss = Math.floor(time - (mm * 60));
		var mins = mm < 10 ? "0" + mm : mm;
		var secs = ss < 10 ? "0" + ss : ss;

		return mins + ":" + secs;
	};

    kg.getQueryString = function(key, defaultValue) {

        if (defaultValue === null) {
            defaultValue = '';
        }

        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

        var regex = new RegExp("[\\?&amp;]" + key + "=([^&amp;#]*)");
        var qs = regex.exec(window.location.href);

        if (qs == null) {
            return defaultValue;
        }
        else {
            return qs[1];
            0
        }
    };

    function isUndefined(value) {
        return typeof value == 'undefined';
    }

    function isDefined(value) {
        return typeof value != 'undefined';
    }

    function isObject(value) {
        return value != null && typeof value == 'object';
    }

    function isString(value) {
        return typeof value == 'string';
    }

    function isNumber(value) {
        return typeof value == 'number';
    }

    function isDate(value) {
        return toString.apply(value) == '[object Date]';
    }

    function isArray(value) {
        return toString.apply(value) == '[object Array]';
    }

    function isFunction(value) {
        return typeof value == 'function';
    }

    function isBoolean(value) {
        return typeof value == 'boolean';
    }

    function size(obj, ownPropsOnly) {

        var count = 0,
            key;

        if (isArray(obj) || isString(obj)) {
            return obj.length;
        }
        else if (isObject(obj)) {

            for (key in obj) {

                if (!ownPropsOnly || obj.hasOwnProperty(key)) {
                    count++;
                }
            }

            return count;
        }
    }

    kg.size = size;
    kg.isUndefined = isUndefined;
    kg.isDefined = isDefined;
    kg.isObject = isObject;
    kg.isString = isString;
    kg.isNumber = isNumber;
    kg.isDate = isDate;
    kg.isArray = isArray;
    kg.isFunction = isFunction;
    kg.isBoolean = isBoolean;

}(window, window.$));