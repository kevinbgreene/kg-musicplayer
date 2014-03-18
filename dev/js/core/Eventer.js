/**
 * @name kg.Eventer
 * @author Kevin B. Greene
 * @description - Local messaging solution.
 */
(function(exports, $, kg) {

    'use strict';

    if (typeof kg === 'undefined') {
        return;
    }

    function Eventer() {}

    Eventer.prototype = {

        constructor: Eventer,

        /**
         * @name Eventer.on
         * @description - Define a new event subscriber.
         * @param evt - string - name of the event
         * @param fn - function - event callback
         * @param ctx - context to call callback. defaults to this object
         */
        on: function(evt, fn, ctx) {

            var shouldAdd = true;
            var ctx = ctx || this;
            var i = 0;
            var data = null;

            if (!this.hasOwnProperty('subscribers')) {
                this.subscribers = {};
            }

            if (!this.subscribers[evt]) {

                this.subscribers[evt] = [];
            }

            if (shouldAdd) {

                data = {
                    fn: fn,
                    ctx: ctx
                };

                this.subscribers[evt].push(data);
            }

            return this;
        },

        /**
         * @name Eventer.off
         * @description - remove an event subscriber.
         * @param evt - string - name of the event
         * @param fn - function - event callback - if undefined all callbacks for this event name are removed.
         */
        off: function(evt, fn) {

            var evtSubscribers = this.subscribers[evt] || null;
            var index = -1;
            var i = 0;

            if (evtSubscribers && evtSubscribers.length > 0) {

                if (kg.isFunction(fn)) {

                    evtSubscribers = [];
                } else {

                    for (i = 0; i < evtSubscribers.length; i++) {

                        if (evtSubscribers[i].fn === fn) {

                            index = i;
                            break;
                        }
                    }
                }
            }

            if (index > -1) {
                evtSubscribers.splice(index, 1);
            }

            return this;
        },

        /**
         * @name Eventer.trigger
         * @description - trigger callbacks for event.
         * @param evt - string - name of the event
         * @param data - object - optional data to attach to event object.
         */
        trigger: function(evt, data) {

            var evtSubscribers = null;
            var i = 0;
            var len = 0;
            var evtData = null;
            var temp = null;

            if (this.hasOwnProperty('subscribers')) {

            	evtSubscribers = this.subscribers[evt] || null;
             	
             	if (evtSubscribers && evtSubscribers.length > 0) {

	                for (i=0,len=evtSubscribers.length;i<len;i++) {

	                    temp = evtSubscribers[i];
	                    evtData = {};
	                    evtData.target = this;
	                    evtData = kg.extend(evtData, temp.data);

	                    temp.fn.call(temp.ctx, evtData);
	                }
	            }
            }

            return this;
        },

        /**
         * @name Eventer.extend
         * @description - method for extending object prototype.
         * @param props - object - properties to add to object prototype.
         */
        extend: function(props) {

            for (var key in props) {
                this[key] = props[key];
            }
        }
    };

    kg.Eventer = Eventer;

}(window, window.$, window.kg));