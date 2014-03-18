(function(exports, $, kg) {

	'use strict';

	if (typeof kg === 'undefined') {
		return;
	}

	function Audio(options) {

		this.$el = $(options.element);
		this.audio = options.element;
		this.scope = options.scope;

		this.init.call(this);
	}

	Audio.prototype = new kg.Eventer();

	Audio.prototype.extend({

		constructor : Audio,

		init : function() {

			this.$el.on("loadstart", this.loadStart.bind(this));
			this.$el.on("progress", this.buffering.bind(this));
			this.$el.on("loadedmetadata", this.metaData.bind(this));
			this.$el.on("canplay", this.loadedData.bind(this));
			this.$el.on("waiting", this.audioWaiting.bind(this));
			this.$el.on("stalled", this.audioStalled.bind(this));
			this.$el.on("timeupdate", this.timeUpdate.bind(this));
			this.$el.on("ended", this.ended.bind(this));
			this.$el.on("playing", this.playing.bind(this));
			this.$el.on("pause", this.paused.bind(this));
			this.$el.on("error", this.audioError.bind(this));

			return this;
		},

		loadStart : function() {},

		buffering : function() {

			var duration = this.audio.duration;
			var buffered = this.audio.buffered.length > 0 ? this.audio.buffered.end(0) : 0;

			var buffer = (buffered/duration) * 100;

			this.scope.set('buffer', buffer);
		},

		metaData : function() {
		},

		loadedData : function() {},

		audioWaiting : function() {},

		audioStalled : function() {},

		audioError : function() {},

		timeUpdate : function(evt) {

			var self = this;
			
			this.scope.set('currentTime', currentTime);

			var currentTime = this.audio.currentTime || 0;
			var duration = this.audio.duration || 0;
			var progress = (currentTime/duration) * 100;

			this.scope.set(function() {
				self.scope.currentTime = kg.formatTime(currentTime);
				self.scope.duration = kg.formatTime(duration);
				self.scope.progress = progress;
			});
		},

		ended : function() {
			
			var self = this;

			this.scope.set(function() {
				self.scope.activeSong = null;
				self.scope.currentTime = '00:00';
				self.scope.duration = '00:00';
				self.scope.progress = 0;
				self.scope.buffer = 0;
			});
		},

		playing : function() {},

		paused : function() {},

		seek : function(location) {
			this.audio.currentTime = location * this.audio.duration;
		},

		play : function() {
			this.audio.play();
		},

		pause : function() {
			this.audio.pause();
		}
	});

	kg.musicplayer.Audio = Audio;

}(window, window.$, window.kg));