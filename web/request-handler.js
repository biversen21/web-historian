var path = require('path');
var archive = require('../helpers/archive-helpers');
var header = require('./http-helpers');
// require more modules/folders here!
var urlParser = require('url');

exports.handleRequest = function (req, res) {
  var pathname = urlParser.parse(req.url).pathname;
  if (req.method === "GET" && pathname === '/') {
    res.writeHead(200, header.headers);
    res.end('<input>');
  } else if(req.method === "GET" && !!pathname){
    pathname = pathname.slice(1);
    // lookup filename in sites.txt

    archive.isUrlInList(pathname, function(result){
      if(result){
        res.writeHead(200, header.headers);
        res.end(pathname);
      } else {
        console.log("Failed test");
      }
    });

    // res.end(/* archived file text? */);
  }
  // res.end(archive.paths.list);
};
