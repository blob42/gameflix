
/**
 * Video handling class
 *
 */
var Video = (function(){

    function __getSourceVideo(callback) {
        var self = this;
        var xhr = new XMLHttpRequest();
        console.log(`${App.options.APIURL}`);
        console.log(this.youtubeUrl);
        xhr.open('POST', `${App.options.APIURL}youtube/getSourceUrl`);
        xhr.onload = function() {
            'use strict';
            if (xhr.status === 200) {
                console.info('Youtube: Got a source URL');
                callback.call(self, xhr.responseText);
            } else if (xhr.status !== 200) {
                console.error('Youtube: Request failed');
            }
        };
        xhr.send(this.youtubeUrl);
    };

    var Video = function(url, options) {
        console.log(url);
        this.youtubeUrl = url;
        this.options = options;
    };


    Video.prototype.Play = function() {
        var self = this;

        __getSourceVideo.call(self, function(sourceUrl){
            var player = new Player();
            var playlist = new Playlist();
            var mediaItem = new MediaItem("video", sourceUrl);
            player.playlist = playlist; player.playlist.push(mediaItem);
            player.present();
        });
    };

    return Video;
})();
