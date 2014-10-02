var path = require('path');
//var archive = require('../helpers/archive-helpers');
var header = require('./http-helpers');
var urlParser = require('url');


exports.handleRequest = function (req, res) {

  var pathname = urlParser.parse(req.url).pathname;

  if (req.method === "GET" && pathname === '/') {

    res.writeHead(200, header.headers);
    res.end('<input>');

  } else if(req.method === "GET" && !!pathname){

    header.listQuery(req, res);

  } else if(req.method === "POST"){

    header.writeList(req,res);

  }
};
