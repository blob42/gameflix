/**
 * ViewLoader class constructor
 */
var ViewLoader = function(baseurl) {
    if (!baseurl) {
        throw("ViewLoader: baseurl parameter is required !")
    }

    this.BASEURL = baseurl + 'views/';
}

var handleApiResponse = function(request, viewName, callback) {
    if (request.status === 200) {
        callback.call(this, request.responseText);
    } else {
        console.error('strange api response');
        var title = "View Loader Error",
            description = `There was an error attempting to load the view '${viewName}'. \n\n Please try again later.`,
            alert = createAlert(title, description);
            navigationDocument.presentModal(alert);
    }
}

var handleApiError = function(request, viewName) {
    var title = "View Loader Error",
        description = `There was an error attempting to load the view '${viewName}'. \n\n Please try again later.`,
        alert = createAlert(title, description);
        navigationDocument.presentModal(alert);
        throw("API Error: " + request.status + ' - ' + request.statusText);
}


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
    var request = new XMLHttpRequest();

    // BASEURL -> http://localhost:9001
    // viewName -> /index
    // request --> GET http://localhost:9001/index
    request.open("GET", this.BASEURL + viewName)

    request.addEventListener("load", handleApiResponse.bind(self, request, viewName, callback));
    request.addEventListener("error", handleApiError.bind(self, request, viewName));




    request.send();
}






// Usage example
//
//var loader = new ViewLoader('http://localhost:911')
//var loader = new ViwerLoader('http://localhost2:02134')
//loader.loadView('/index', function(xml){

//})
