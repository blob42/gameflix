
/**
 * Video handling class
 *
 */
//var Video = (function(){

    //function __getSourceVideo(callback) {
        //var self = this;
        //var xhr = new XMLHttpRequest();
        //var p = new promise.Promise();

        //xhr.open('POST', `${App.options.APIURL}youtube/getSourceUrl`);
        //xhr.onload = function() {
            //'use strict';
            //if (xhr.status === 200) {
                //console.info('Youtube: Got a source URL');
                //p.resolve(null, xhr.responseText);
                ////callback.call(self, xhr.responseText);
            //} else if (xhr.status !== 200) {
                //console.error('Youtube: Request failed');
            //}
        //};
        //xhr.send(this.youtubeUrl);
        //return p;
    //};

    //var Video = function(url, options) {
        //console.log(url);
        //this.youtubeUrl = url;
        //this.options = options;
    //};


    //Video.prototype.Play = function() {
        //var self = this;

        //__getSourceVideo.call(self, function(sourceUrl){
            //var player = new Player();
            //var playlist = new Playlist();
            //var mediaItem = new MediaItem("video", sourceUrl);
            //player.playlist = playlist; player.playlist.push(mediaItem);
            //player.present();
        //});
    //};

    //return Video;
//})();

var VPlayList = (function(){

    function __getSourceVideo(id) {
        var self = this;
        var xhr = new XMLHttpRequest();
        var p = new promise.Promise();
        console.log('Getting source url of ' + id);
        xhr.open('POST', `${App.options.APIURL}youtube/getSourceUrl`);
        xhr.onload = function() {
            'use strict';
            if (xhr.status === 200) {
                console.info('Youtube: Got a source URL');
                p.done(null, xhr.responseText);
                //callback.call(self, xhr.responseText);
            } else if (xhr.status !== 200) {
                console.error('Youtube: Request failed');
            }
        };
        xhr.send(id);
        return p;
    };

    function __getVideosFromPl() {

        var self = this;
        var xhr = new XMLHttpRequest();
        var p = new promise.Promise();
        xhr.open('GET', `${App.options.APIURL}youtube/videosFromPlaylist/${this.plId}`);
        xhr.onload = function() {
            'use strict';
            if (xhr.status === 200) {
                console.info('Youtube Playlist: Got videos');
                //callback.call(self, JSON.parse(xhr.responseText).videos);
                p.done(null, JSON.parse(xhr.responseText).videos);
            } else if (xhr.status !== 200) {
                console.error('Youtube: Request failed');
            }
        };
        xhr.send();
        return p;
    }

    var VPlayList = function(plId, options) {
        var self = this;

        this.plId = plId;
        this.options = options;
        this.playlist = new Playlist();
        this.player = new Player();
        this.player.playlist = this.playlist;

        this.player.addEventListener('timeBoundaryDidCross', function(ev){
            console.log('60 seconds crossed');
        },[60]);

        App.viewLoader.load('videoOverlay').then(function(err, resource){
            var doc = Presenter.makeDocument(resource);
            self.player.overlayDocument = doc;
        });
    };

    VPlayList.prototype.Create = function() {
        var self = this;
        var p = new promise.Promise();

        __getVideosFromPl.call(self).then(function(error, videos){
            self._addVideos(videos);
            p.done(null, "done");
        });

        return p;
    };

    VPlayList.prototype._addVideos = function(videos) {
        for (var i=0; i < videos.length; i++) {
            var mediaItem = new MediaItem("video", videos[i].ID);
            mediaItem.title = videos[i].Title;

            this.playlist.push(mediaItem);
        }

    };


    VPlayList.prototype.Start = function() {

        var self = this;

        var firstVidId = this.playlist.item(0).url;

        __getSourceVideo(firstVidId).then(function(error, videoUrl){
            self.playlist.item(0).url = videoUrl;
            self.player.present();
        });

    };

    return VPlayList;
})();
