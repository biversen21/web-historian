var http = require("http");
var handler = require("./request-handler");
var urlParser = require("url");
var helpers = require("./http-helpers");

// var routes = {
//   '/': function(){}
// };

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
// var server = http.createServer(function(request, response){
//   var path = urlParser.parse(request.url);
//   var route = routes[path.pathname];
//   if( route ){
//     route(request, response);
//   } else {
//     helpers.sendResponse(response, null, 404);
//   }
// });
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

