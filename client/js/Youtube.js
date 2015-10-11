/**
 * Youtube class used to handle youtube videos
 *
 */
var YoutubeExtractor = (function(){
    console.log(this);

    function _getSourceUrl(rawPage, callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${this.options.APIURL}youtube/getSourceUrl`);
        //xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.info('Youtube: Got a source URL');
                console.log(xhr.responseText);
            } else if (xhr.status !== 200) {
                console.error('Youtube: Request failed');
            }
        };
        var compressed = LZString.compressToEncodedURIComponent(rawPage);
        xhr.send(compressed);
    }

    var YoutubeExtractor = function(youtubeUrl, options) {
        this.youtubeUrl = youtubeUrl;
        this.options = options;
    };

    YoutubeExtractor.prototype.getSourceVideo = function(callback) {

        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${this.options.APIURL}youtube/getSourceUrl`);
        //xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.onload = function() {
            'use strict';
            if (xhr.status === 200) {
                console.info('Youtube: Got a source URL');
                //console.log(decodeURIComponent(xhr.responseText));
                //var player = new Player();
                //var playlist = new Playlist();
                //var videoUrl = "https://r7---sn-i5onxoxu-cxgl.googlevideo.com/videoplayback?initcwndbps=2368750&mime=video%2Fmp4&fexp=9408710%2C9409069%2C9414764%2C9415365%2C9415485%2C9416023%2C9416126%2C9417707%2C9418448%2C9420348%2C9421013&ipbits=0&ratebypass=yes&itag=22&upn=xxmWbVk399c&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cupn%2Cexpire&expire=1444366399&key=yt6&mn=sn-i5onxoxu-cxgl&mm=31&id=o-AC8lcHrUubslPNavtIgVzRq0XiUn6H_iV3D9EdnbSDoA&mv=m&source=youtube&ms=au&lmt=1443768566297199&ip=92.228.97.61&pl=23&dur=1056.507&requiressl=yes&sver=3&mt=1444344732&signature=C16227EB880C2F3FB3ED2BE0EB036E90C6B7A9A9.626096218BBED8F1B54BE5D5C5A94979BCD98C1A"
                //var videoUrl = JSON.parse(JSON.stringify( xhr.responseText ));
                //console.log(videoUrl.length);
                //var newVideoUrl = [];
                //for (var i=0; i < xhr.responseText.length; i++) {
                    //this.LOL[i] = xhr.responseText[i];
                //}
                //console.log(md5(videoUrl));
                //console.log(this);
                //var mediaItem = new MediaItem("video", this.App.LOL);

                //player.playlist = playlist;
                //player.playlist.push(mediaItem);
                //setTimeout(function(){
                    //player.present();
                //}, 10000);
                //player.present();
                callback.call(self, xhr.responseText);
            } else if (xhr.status !== 200) {
                console.error('Youtube: Request failed');
            }
        };
        //var compressed = LZString.compressToEncodedURIComponent(rawPage);
        //xhr.send(compressed);
        xhr.send(this.youtubeUrl);

        // Download page
        //var xhr = new XMLHttpRequest();
        //xhr.open('GET', this.youtubeUrl);
        //xhr.onload = function() {
            //if (xhr.status === 200) {
                //console.info('Youtube: got raw youtube page');
                //// Compress data
                ////console.info('compressed from ' + xhr.responseText.length +
                            ////' to ' + compressed.length);
                //_getSourceUrl.call(self, xhr.responseText, callback);
            //} else if (xhr.status !== 200) {
                //console.error('Youtube: error downloading raw page');
            //}
        //};
        //xhr.send();


    };

    return YoutubeExtractor;
})();

