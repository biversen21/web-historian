// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var helpers = require('../helpers/archive-helpers');
var fs = require('fs');
// chron will trigger this
// this will compare sites.txt with sites folder
// // if sites.txt contains site not in sites folder:
// // // trigger archive-helper download url
// // else terminate
exports.htmlFetch = function(){
  fs.writeFile(helpers.paths.archivedSites + "/log.txt", "I'm getting called! - line 16", function(err){});
  helpers.readListOfUrls(function(urlSiteList){
    fs.readdir(helpers.paths.archivedSites, function(err, urls){
      for (var i = 0; i < siteList.length; i++) {
        if (urls.indexOf(urlSiteList[i]) === -1) {
          helpers.downloadUrls(urlSiteList[i]);
          fs.writeFile(helpers.paths.archivedSites + "/log.txt", "I'm getting called! - line 16", function(err){});
        }
      }
    })
  });
};

exports.htmlFetch();
