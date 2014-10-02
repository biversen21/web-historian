var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

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

exports.listQuery = function(req, res){
  var pathname = urlParser.parse(req.url).pathname;
  archive.isUrlInList(pathname, function(result){
    if(result){
      res.writeHead(200, this.headers);
      res.end(pathname);
    } else {
      res.writeHead(404, this.headers);
      res.end();
    }
  });
};

exports.writeList = function(req, res){
  collectData(req, function(newUrl){
    archive.isUrlInList(newUrl, function(result){
      if(!!result){
        res.writeHead(200, this.headers);
        res.end(newUrl);
      } else {
        archive.addUrlToList(newUrl, function(){
          res.writeHead(302, this.headers);
          res.end();
        });
      }
    });
  });
};
