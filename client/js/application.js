//# sourceURL=application.js

/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
This is the entry point to the application and handles the initial loading of required JavaScript files.
*/


/**
 * @description The onLaunch callback is invoked after the application JavaScript
 * has been parsed into a JavaScript context. The handler is passed an object
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents
 * the URL that was used to retrieve the application JavaScript.
 */
App.onLaunch = function(options) {

    this.LOL = "https://r8---sn-i5onxoxu-cxgl.googlevideo.com/videoplayback?upn=bwj6dR60RoY&lmt=1433145421203362&ip=92.228.97.61&expire=1444369686&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cupn%2Cexpire&sver=3&requiressl=yes&key=yt6&mt=1444347933&fexp=9408710%2C9409069%2C9414764%2C9415365%2C9415485%2C9416023%2C9416126%2C9417707%2C9418448%2C9420348%2C9421013&ratebypass=yes&itag=22&mm=31&ipbits=0&mn=sn-i5onxoxu-cxgl&mime=video%2Fmp4&ms=au&signature=043483BF2CD906CEACBB24FAC952E9BD110CF434.3B59B422CA068EA3F09950476604FE1E31B6AE7B&source=youtube&mv=m&initcwndbps=2477500&id=o-AOFwW4yrAOfXnwsWPsCRlxuU2vdJkJUSZttG-9RIr80E&pl=23&dur=1735.598"


    var javascriptFiles = [
        // vendor libraries
        `${options.CLIENTURL}vendor/lz-string/libs/lz-string.min.js`,



        // Application
        `${options.CLIENTURL}js/ViewLoader.js`,
        `${options.CLIENTURL}js/Presenter.js`,
        `${options.CLIENTURL}js/Video.js`
    ];







    /**
     * evaluateScripts is responsible for loading the JavaScript files neccessary
     * for you app to run. It can be used at any time in your apps lifecycle.
     *
     * @param - Array of JavaScript URLs
     * @param - Function called when the scripts have been evaluated. A boolean is
     * passed that indicates if the scripts were evaluated successfully.
     */
    evaluateScripts(javascriptFiles, function(success) {
        if (success) {

            console.info('Testing request to youtube');
            ////https://www.youtube.com/watch?v=%s&gl=US&hl=en&has_verified=1&bpctr=9999999999
            //var youtubeDl = new YoutubeExtractor("https://m.youtube.com/watch?v=1Xo8WnJCdMA",
            var youtubeDl = new YoutubeExtractor("https://www.youtube.com/watch?v=f-0HjynlDrs",
                                                options);
            youtubeDl.getSourceVideo(function(sourceVideo){

                //var player = new Player();
                //var playlist = new Playlist();
                //var mediaItem = new MediaItem("video", sourceVideo);
                //player.playlist = playlist; player.playlist.push(mediaItem);
                //player.present();
                v = new Video(sourceVideo);
                v.Play();

            }.bind(this));




            // /////////////
            // LOAD MAIN VIEW HERE
            // //////////////
            //
            var viewLoader = new ViewLoader(options.CLIENTURL);

            viewLoader.load('index', function(resource){
                var doc = Presenter.makeDocument(resource);
                doc.addEventListener("select", Presenter.load.bind(Presenter));
                navigationDocument.pushDocument(doc);
            })

        } else {
            //Be sure to handle error cases in your code. You should present a readable, and friendly
            //error message to the user in an alert dialog.

            //See alertDialog.xml.js template for details.
            //*/
            var alert = createAlert("Evaluate Scripts Error", "There was an error attempting to evaluate the external JavaScript files.\n\n Please check your network connection and try again later.");
            navigationDocument.presentModal(alert);

            throw ("Playback Example: unable to evaluate scripts.");
        }
    });
    ///////////////////////////////////////////
    //   Test xmlhttprequest
    ///////////////////////////////////////////
    //var Requester = {
        //handleResponse: function() {
            ////console.log(this);
            //var doc = Presenter.makeDocument(this.request.responseText);
            //console.log(doc);
        //},
        //getIndex: function() {
            //var self = this;

            //if (!self.request) {
                //console.log('setting up request')
                //self.request = new XMLHttpRequest();
            //}

            //self.request.addEventListener("load", self.handleResponse.bind(self));
            //self.request.open("GET", `${options.BASEURL}templates/Index.xml.js`)
            //self.request.send();
        //}
    //}

    //Requester.getIndex();

}


/**
 * This convenience funnction returns an alert template, which can be used to present errors to the user.
 */
var createAlert = function(title, description) {

    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`

    var parser = new DOMParser();

    var alertDoc = parser.parseFromString(alertString, "application/xml");

    return alertDoc
}
