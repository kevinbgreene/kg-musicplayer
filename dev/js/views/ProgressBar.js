(function(exports, $, kg) {

	if (typeof kg === 'undefined') {
		return;
	}

	function ProgressBar(options) {

		this.$el = $(options.element);
		this.scope = options.scope;

		this.init.call(this);
	}

	ProgressBar.prototype = new kg.View();

	ProgressBar.prototype.extend({

		constructor : ProgressBar,

		init : function() {

			this.parseHTML();

			this.progressWidth = this.$clickBar[0].offsetWidth;

			this.$clickBar.on('click', this.seekToClick.bind(this));
			
			this.scope.watch('buffer', this.updateBuffer.bind(this));
			this.scope.watch('progress', this.updateProgress.bind(this));

			return this;
		},

		seekToClick : function(evt) {

			evt.preventDefault();
			evt.stopPropagation();

			var x = evt.offsetX;
			var seek = 0;
			
			if (x === undefined) {
 				x = evt.clientX - $(evt.target).offset().left;
 			}

 			seek = x/this.progressWidth;

 			this.scope.set('seek', seek);
		},

		parseHTML : function() {
			this.$bufferBar = this.find('.buffer-bar');
			this.$progressBar = this.find('.progress-bar');
			this.$clickBar = this.find('.click-bar');
		},

		updateBuffer : function(newBuffer, oldBuffer) {

			this.$bufferBar.css({
				width : newBuffer + '%'
			});
		},

		updateProgress : function(newProgress, oldProgress) {

			this.$progressBar.css({
				width : newProgress + '%'
			});
		}
	});

	kg.musicplayer.ProgressBar = ProgressBar;

}(window, window.$, window.kg));