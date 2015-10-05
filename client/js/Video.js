
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

        // Download page
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.youtubeUrl);
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.info('Youtube: got raw youtube page');
                // Compress data
                //console.info('compressed from ' + xhr.responseText.length +
                            //' to ' + compressed.length);
                _getSourceUrl.call(self, xhr.responseText, callback);
            } else if (xhr.status !== 200) {
                console.error('Youtube: error downloading raw page');
            }
        };
        xhr.send();


    };

    return YoutubeExtractor;
})();

