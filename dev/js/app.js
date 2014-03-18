(function(exports, $, kg) {

    'use strict';

    if (typeof kg === 'undefined') {
    	return;
    }

    kg.musicplayer = {};

    $(function() {

    	var songs = [];
    	var activeIndex = 0;

        var scope = new kg.Scope({
        	duration : '00:00',
        	currentTime : '00:00',
        	seek : 0,
        	progress : 0,
        	buffer : 0,
        	activeSong : null
        });

        $('.kg-track-entry').each(function() {

            songs.push(new kg.musicplayer.Song({
                element : this,
                scope : scope
            }));
        });

        $('.kg-progress-bar').each(function() {

        	new kg.musicplayer.ProgressBar({
        		element : this,
        		scope : scope
        	});
        });

        scope.watch('activeSong', function(newSong, oldSong) {

        	var song = null;
        	var i = 0;
        	var len = songs.length;
        	var newIndex = -1;

        	if (oldSong && !newSong) {

        		activeIndex = activeIndex ++;

        		if (activeIndex > songs.length - 1) {
        			activeIndex = 0;
        		}
        		else {
        			song = songs[activeIndex];
        			scope.set('activeSong', song);
        		}
        	}
        	else {

        		for (i=0;i<len;i++) {
        			
        			if (songs[i] === newSong) {
        				activeIndex = i;
        				break;
        			}
        		}
        	}
        });

    });

}(window, window.$, window.kg));