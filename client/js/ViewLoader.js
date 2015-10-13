var ViewLoader = (function(){

    function handleApiResponse(xhr, viewName, callback) {
        if (xhr.status === 200) {
            callback.call(this, xhr.responseText);
        } else {
            console.error('strange api response');
            var title = "View Loader Error",
                description = `There was an error attempting to load the view '${viewName}'. \n\n Please try again later.`,
                alert = createAlert(title, description);
            navigationDocument.presentModal(alert);
        }
    }

    function handleApiError(xhr, viewName) {
        var title = "View Loader Error",
            description = `There was an error attempting to load the view '${viewName}'. \n\n Please try again later.`,
            alert = createAlert(title, description);
        navigationDocument.presentModal(alert);
        throw("API Error: " + xhr.status + ' - ' + xhr.statusText);
    }

    /**
     * ViewLoader class constructor
     */
    var ViewLoader = function(baseurl) {
        if (!baseurl) {
            throw("ViewLoader: baseurl parameter is required !");
        }

        this.BASEURL = baseurl + 'views/';
    };


    /**
     * loads a view from the server using baseurl
     * example: loader.loadView('index') should return
     * the xml representing the index page
     *
     * Do not prepend a / to the view name
     *
     */
    ViewLoader.prototype.load = function(viewName, callback) {


        console.info('Loading view: ' + viewName);
        var self = this;

        // Creat xmlhttprequest object
        var xhr = new XMLHttpRequest();

        // BASEURL -> http://localhost:9001
        // viewName -> /index
        // request --> GET http://localhost:9001/index
        xhr.open("GET", this.BASEURL + viewName);

        xhr.addEventListener("load", handleApiResponse.bind(self,
                                                            xhr,
                                                            viewName,
                                                            callback));

    xhr.addEventListener("error", handleApiError.bind(self,
                                                      xhr,
                                                      viewName));
    xhr.send();
    };


    return ViewLoader;
})();
