(function(exports, $, kg) {

    'use strict';

    if (typeof kg === 'undefined') {
        return;
    }

    function View() {}

    View.prototype = new kg.Eventer();

    View.prototype.extend({

        constructor: View,

        find: function(selector) {
            return this.$el.find(selector);
        },

        attr: function(key) {
            return this.$el.attr(key);
        }
    });

    kg.View = View;

}(window, window.$, window.kg));