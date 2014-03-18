(function(exports, $, kg) {

    'use strict';

    if (typeof kg === 'undefined') {
        return;
    }

    var rerun = false;
    var changed = false;
    var watchers = [];
    var isLooping = false;
    var counter = 0;
    var OVERFLOW_LIMIT = 10;

    function Watcher(obj, prop, fn) {

    	this.id = kg.uniqueId();
        this.oldVal = obj[prop];
        this.obj = obj;
        this.prop = prop;
        this.callback = fn;
    }

    Watcher.prototype = {

        constructor: Watcher,

        apply: function() {
            var newVal = this.obj[this.prop];
            this.callback(newVal, this.oldVal);
            this.oldVal = newVal;
        },

        check: function() {

            var newVal = this.obj[this.prop];

            if (this.oldVal !== newVal) {
                this.apply();
                return true;
            }

            return false;
        }
    }

    function clearWatcher(id) {

    	var i = 0;
    	var len = watchers.length;
    	var index = -1;

    	for (i=0;i<len;i++) {

    		if (watchers[i].id === id) {
    			index = i;
    			break;
    		}
    	}

    	if (index > -1) {
    		watchers.splice(index, 1);
    	}
    }

    function watch(obj, prop, fn) {

        var newWatcher = new Watcher(obj, prop, fn);

        // initialize watcher with current value;
        newWatcher.apply();
        watchers.push(newWatcher);

        return newWatcher.id;
    }

    function apply(fn) {

        function loop() {

            var i = 0;
            var len = watchers.length;

            isLooping = true;

            for (i=0;i<len;i++) {

                changed = watchers[i].check();

                if (changed && !rerun) {
                    rerun = true;
                }
            }

            counter++;

            if (rerun && counter < OVERFLOW_LIMIT) {
                rerun = false;
                loop();
            }
            else if (counter >= OVERFLOW_LIMIT) {
                kg.log('ERROR: apply loop overflow');
                isLooping = false;
            }
            else {
                isLooping = false;
            }
        }

        if (!isLooping) {

            if (kg.isFunction(fn)) {
                fn();
            }

            counter = 0;
            rerun = false;
            changed = false;

            loop();
        }
    }

    kg.clearWatcher = clearWatcher;
    kg.watch = watch;
    kg.apply = apply;

}(window, window.$, window.kg))