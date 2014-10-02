var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// var hardList = '/Users/student/Desktop/2014-09-web-historian/archives/sites.txt';
// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(cb){
  // interacts with sites.txt
  fs.readFile(this.paths.list, function(err, data){
    if(err){
      console.log(err);
    }
    var content = data.toString();
    content = content.split('\n');
    cb(content);
  });
};

exports.isUrlInList = function(url, cb){

  this.readListOfUrls(function(urls){
    for (var i = 0; i < urls.length; i++) {
      console.log(urls[i].length);
      console.log(url.length);
      if (url.substr(0, url.length-1) === urls[i]) {
        return cb(true);
      }
    }
    cb(false);
  });
};

exports.addUrlToList = function(pathname, cb){
  fs.appendFile(this.paths.list, pathname, cb);
};

exports.isURLArchived = function(url, cb){
  // searches sites folder for url using fs.readdir
  return fs.readdir(this.paths.archivedSites, function(err, urls){
    for (var i = 0; i < urls.length; i++) {
      if (url.substr(0, url.length-1) === urls[i]) {
        return cb(true);
      }
    }
    return cb(false);
  });
};

exports.downloadUrls = function(){
  // downloads the url to sites folder, tells html fetcher its done
};
