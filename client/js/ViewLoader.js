/**
 * ViewLoader class constructor
 */
var ViewLoader = function(baseurl) {
    if (!baseurl) {
        throw("ViewLoader: baseurl parameter is required !")
    }

    this.BASEURL = baseurl;
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


    var self = this;

    // Creat xmlhttprequest object
    var request = new XMLHttpRequest();

    // BASEURL -> http://localhost:9001
    // viewName -> /index
    // request --> GET http://localhost:9001/index
    request.open("GET", this.BASEURL + viewName)

    function handleResponse(request) {
        if (request.status === 200) {
            callback.call(self, request.responseText);
        } else {
            var title = "View Loader Error",
                description = `There was an error attempting to load the view '${viewName}'. \n\n Please try again later.`,
                alert = createAlert(title, description);
        }
    }

    request.addEventListener("load", handleResponse.bind(self, request));
    request.send();
}






// Usage example
//
//var loader = new ViewLoader('http://localhost:911')
//var loader = new ViwerLoader('http://localhost2:02134')
//loader.loadView('/index', function(xml){

//})
