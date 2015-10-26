
/**
 * Video handling class
 *
 */
var Video = (function(){

    function __getSourceVideo(callback) {
        var self = this;
        var xhr = new XMLHttpRequest();
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

var VPlayList = (function(){

    function __getSourceVideo(id, callback) {
        var self = this;
        var xhr = new XMLHttpRequest();
        console.log('Getting source url of ' + id);
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
        xhr.send(id);
    };

    function __getVideosFromPl(callback) {

        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `${App.options.APIURL}youtube/videosFromPlaylist/${this.plId}`);
        xhr.onload = function() {
            'use strict';
            if (xhr.status === 200) {
                console.info('Youtube Playlist: Got videos');
                callback.call(self, JSON.parse(xhr.responseText).videos);
            } else if (xhr.status !== 200) {
                console.error('Youtube: Request failed');
            }
        };
        xhr.send();
    }

    var VPlayList = function(plId, options) {
        this.plId = plId;
        this.options = options;
        this.playlist = new Playlist();
        this.player = new Player();
        this.player.playlist = this.playlist;

        this.player.addEventListener('mediaItemWillChange', function(ev){
            console.log('media item will change');
        });
    };

    VPlayList.prototype.Create = function() {
        var self = this;
        var p = new promise.Promise();

        __getVideosFromPl.call(self, function(videos){
            self._addVideos(videos);
            p.done(null, "done");
        });

        return p;
    };

    VPlayList.prototype._addVideos = function(videos) {
        for (var i=0; i < videos.length; i++) {
            var mediaItem = new MediaItem("video", videos[i].ID);
            mediaItem.title = videos[i].Title;
            console.log(mediaItem.url);
            this.playlist.push(mediaItem);
        }

    };


    VPlayList.prototype.Start = function() {

        var self = this;

        var firstVidId = this.playlist.item(0).url;
        __getSourceVideo(firstVidId, function(videoUrl){
            self.playlist.item(0).url = videoUrl;
            self.player.present();
        });

    };

    return VPlayList;
})();
