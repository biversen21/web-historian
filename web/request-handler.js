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
    // callback(JSON.parse(url));
    thisUrl = JSON.parse(url);
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
    // lookup filename in sites.txt

    archive.isUrlInList(pathname, function(result){
      console.log('called isUrlInList');
      console.log(result,' is the result');
      if(result){
        res.writeHead(200, header.headers);
        res.end(pathname);
      } else {
        console.log("About to add to list");
        archive.addUrlToList(pathname, function(){
          res.writeHead(302, header.headers);
          res.end();
        });
      }
    });

    // res.end(/* archived file text? */);
  } else if(req.method === "POST"){
    // pathname = pathname.slice(1);

    // lookup filename in sites.txt
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
  // res.end(archive.paths.list);
};
