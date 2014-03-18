(function(exports, $, kg) {

    'use strict';

    if (typeof kg === 'undefined') {
    	return;
    }

    function Song(options) {

    	kg.log('Song');

        this.$el = $(options.element);
        this.scope = options.scope;

        this.audio = null;

        this.genre = this.attr('data-track-genre');
        this.$duration = this.find('.duration');

        this.isPlaying = false;

        this.init.call(this);
    }

    Song.prototype = new kg.View();

    Song.prototype.extend({

        constructor: Song,

        init: function() {

        	var self = this;
            
            this.prepareAudio();
            this.$el.on('click', this.handleClick.bind(this));

            self.scope.watch('activeSong', function(newSong, oldSong) {

            	if (!newSong || newSong !== self) {
            		self.pauseSong();
            	}
            	else if (newSong && newSong === self) {
            		self.playSong();
            	}
            });

            self.scope.watch('currentTime', function(newTime, oldTime) {

            	if (newTime && self.isPlaying) {
            		self.$duration.html(newTime);
            	}
            	else {
            		self.$duration.html('00:00');
            	}
            });

            self.scope.watch('seek', function(newSeek, oldSeek) {

            	if (newSeek && self.isPlaying) {
            		self.audio.seek(newSeek);
            	}
            });

            return this;
        },

        prepareAudio : function() {

        	if (kg.sniffer.audio) {

        		this.audio = new kg.musicplayer.Audio({
        			element : this.find('audio').get(0),
        			scope : this.scope
        		});
        	}
        },

        handleClick: function() {

        	if (!kg.sniffer.audio) {
        		alert('Your browser does not support mp3 audio. Please try the latest version of Google Chrome, Apple Safari, Internet Explorer or Mozilla Firefox on Windows.');
        	}
        	else if (!this.isPlaying) {
            	this.playSong();
            }
            else {
                this.pauseSong();
            }
        },

        playSong: function() {

        	if (!this.isPlaying) {
        		this.scope.set('activeSong', this);
            	this.$el.addClass('song_playing');
            	this.audio.play();
            	this.isPlaying = true;
        	}
        },

        pauseSong: function() {

            if (this.isPlaying) {
                this.$el.removeClass('song_playing');
                this.audio.pause();
                this.isPlaying = false;
            }
        },

        setActive: function() {
            this.isActive = true;
            this.$el.addClass('genre_active');
        },

        setInactive: function() {

            if (this.isActive) {
                this.isActive = false;
                this.$el.removeClass('genre_active');
            }
        }

    });

    kg.musicplayer.Song = Song;

}(window, window.$, kg));