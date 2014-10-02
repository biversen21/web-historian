var path = require('path');
var archive = require('../helpers/archive-helpers');
var header = require('./http-helpers');
// require more modules/folders here!
var urlParser = require('url');


var collectData = function(request, callback) {
  var url = "";
  var thisUrl;
  request.on('data', function(chunk){
    url += chunk;
  });
  request.on('end', function(){
    thisUrl = url.slice(url.indexOf('=') + 1);
    thisUrl += '\n';
  });
  return callback(thisUrl);
};


exports.handleRequest = function (req, res) {
  var pathname = urlParser.parse(req.url).pathname;
  if (req.method === "GET" && pathname === '/') {
    res.writeHead(200, header.headers);
    res.end('<input>');
  } else if(req.method === "GET" && !!pathname){
    // pathname = pathname.slice(1);

    archive.isUrlInList(pathname, function(result){
      console.log('called isUrlInList');
      console.log(result,' is the result');
      if(result){
        res.writeHead(200, header.headers);
        res.end(pathname);
      } else {
        res.writeHead(404, header.headers);
        res.end();
      }
    });

  } else if(req.method === "POST"){

    collectData(req, function(newUrl){
      archive.isUrlInList(newUrl, function(result){
        if(!!result){
          res.writeHead(200, header.headers);
          res.end(newUrl);
        } else {
          console.log("About to add to list");
          archive.addUrlToList(newUrl, function(){
            res.writeHead(302, header.headers);
            res.end();
          });
        }
      });
    });
  }

};
