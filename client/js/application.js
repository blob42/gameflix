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
    App.options = options;

    var javascriptFiles = [
        // vendor libraries
        //`${options.CLIENTURL}vendor/lz-string/libs/lz-string.min.js`,



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

            App.viewLoader = new ViewLoader(options.CLIENTURL);
            //console.info('Testing request to youtube');
            //var youtubeDl = new YoutubeExtractor("https://www.youtube.com/watch?v=f-0HjynlDrs",
                                                //options);
            //youtubeDl.getSourceVideo(function(sourceVideo){

                //v = new Video(sourceVideo);
                //v.Play();

            //}.bind(this));



            // /////////////
            // LOAD MAIN VIEW HERE
            // //////////////
            //
            App.viewLoader.load('home', function(resource){
                var doc = Presenter.makeDocument(resource);
                doc.addEventListener("select", Presenter.load.bind(Presenter));
                navigationDocument.pushDocument(doc);
            });

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
