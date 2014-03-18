(function(exports, $, kg) {

	'use strict';

	if (typeof kg === 'undefined') {
		return;
	}

	function Scope(options) {
		kg.extend(this, options);
	}

	Scope.prototype = {

		watch : function(prop, fn) {
			kg.watch(this, prop, fn);
		},

		set : function(key, value) {

			if (kg.isFunction(key)) {
				key();
			}
			else if (kg.isDefined(key) && kg.isDefined(value)) {
				this[key] = value;
			}

			kg.apply();
		}
	};

	kg.Scope = Scope;

}(window, window.$, window.kg));