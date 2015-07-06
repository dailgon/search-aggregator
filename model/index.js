var cheerio = require('cheerio');
var request = require('request');
var querystring = require('querystring')
var util = require('util')

var google = require('google')

exports.getSearchResults = function(search_query, cb){
  // var data = [];

  var data  = {
    google: [],
    bing: []
  }

  var bing_string = "http://www.bing.com/search?"+search_query;
  var goog_string = "https://www.google.com/search?"+search_query;
  getBingResults(bing_string, data, function(){
    getGoogleResults(goog_string, data, cb);
  });


}

var getBingResults = function(search_query, data, cb){
  var d = data.bing;
  request(search_query, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    console.log("Made it in");
    var $ = cheerio.load(body);
    //Bing's search link selector
    $('li.b_algo h2').each(function() {
        var link = $(this);
        var text = link.text();
        console.log("text: " , text);
        var locat = link.find('a').attr('href');
        d.push([text,locat]);
    });

    console.log(d);

    cb();


    }
  });




}

var getGoogleResults= function(search_query, data, cb){

var d = data.google;
request(search_query, function (error, response, body) {
if (!error && response.statusCode == 200) {
  var $ = cheerio.load(body);
  $('h3.r').each(function() {
      var link = $(this);
      // console.log(link.find('a').attr('href'));
      var text = link.text();
      // console.log(link.parent().html());
      var item = {
        link: null,
        href: null
      }

      var qsObj = querystring.parse(link.find('a').attr('href'));

        if (qsObj['/url?q']) {
          item.link = qsObj['/url?q'];
          item.href = item.link;
        }

      console.log(item.link);



      var locat = link.html(); //find('a').html();
      d.push([text, item.link]);
  });

  console.log("BIG DATA: ");
  console.log(data);

  cb(null, data);
    }
  });

}
