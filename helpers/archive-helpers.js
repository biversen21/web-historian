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
    return cb(content);
  });
};

exports.isUrlInList = function(url, cb){

  // call readListOfUrls
  return this.readListOfUrls(function(urls){
    console.log(url, ' is the url/pathname');
    console.log(urls, 'is the array');
    for (var i = 0; i < urls.length; i++) {
      if (url === urls[i]) {
        return cb(true);
      }
    }
    return cb(false);
  });
  // for loop checking url against result of above
  // return true if exists
};

exports.addUrlToList = function(pathname, cb){
  console.log("Adding ", pathname, " to list");
  fs.appendFile(this.paths.list, pathname, cb);
    // if(err) {
    //   console.log(err);
    // } else {
    //   console.log('added to file');
    // }
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
