var cheerio = require('cheerio');
var request = require('request');
var querystring = require('querystring')
var util = require('util')

exports.getSearchResults = function(search_query, cb){

  var data  = {
    google: [],
    bing: [],
    phantom: []
  }


  // Goes along and performs a chained series of functions
  // resulting in a final callback to render the page with the
  // full amount of data.
  // We do it in this way because of the asynchronous nature of JS
  var bing_string = "http://www.bing.com/search?"+search_query;
  var goog_string = "https://www.google.com/search?"+search_query;
  var phantom_string = "https://www.privatesearch.io/?" + search_query;
  getBingResults(bing_string, data, function(){
    getPhantomResults(phantom_string, data, function(){
      getGoogleResults(goog_string, data, cb);
    });
  });


}


//Get Results from scraping bing data at the given url.
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
        var locat = link.find('a').attr('href');
        d.push([text,locat]);
    });

    // Trigger the next search, can also use promises and something
    // like Babel to compile code to vanilla JS
    cb();


    }
  });




}


var getPhantomResults = function(search_query, data, cb){
  var d = data.phantom;

  request(search_query, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    console.log("Made it in");

    console.log("Query is: ", search_query);
    var $ = cheerio.load(body);
    // Phantom search engine's class selector for titles
    // and links
    $('h4.result_header').each(function() {
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
        var text = link.text();
        var item = {
          link: null,
          href: null
        }

        var qsObj = querystring.parse(link.find('a').attr('href'));

        if (qsObj['/url?q']) {
          item.link = qsObj['/url?q'];
          item.href = item.link;
        }

        console.log(item  .link);



        var locat = link.html();
        d.push([text, item.link]);
      });

      cb(null, data);
    }
  });

}
