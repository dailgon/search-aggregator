var cheerio = require('cheerio');
var request = require('request');


var google = require('google')

exports.getSearchResults = function(search_query, cb){
  var data = [];
  request(search_query, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    console.log("Made it in");
    var $ = cheerio.load(body);

    $('li.b_algo h2').each(function() {
        var link = $(this);
        var text = link.text();
        console.log("text: " , text);
        var locat = link.find('a').attr('href');
        data.push([text,locat]);
    });

    cb(null, data);


      }
    });



}

exports.getGoogleResults= function(search_query, cb){

var data = [];
request(search_query, function (error, response, body) {
if (!error && response.statusCode == 200) {
  var $ = cheerio.load(body);
  var accum = 0;
  $('h3.r').each(function() {
      var link = $(this);
      // console.log(link.find('a').attr('href'));
      var text = link.text();
      console.log(link.parent().html());
      var locat = link.html(); //find('a').html();
      data.push([text]);
      accum++;
  });


  google.resultsPerPage =accum;
  var nextCounter = 0

  // google("hi there", function (err, next, links){
  //   if (err) console.error(err)
  //
  //   for (var i = 0; i < links.length; ++i) {
  //     console.log(links[i].title + ' - ' + links[i].link) // link.href is an alias for link.link
  //     // console.log(links[i].description + "\n")
  //     data[i].push(links[i].link);
  //
  //   }
  //
  //   if (nextCounter < 4) {
  //     nextCounter += 1
  //     if (next) next()
  //   }
  // })


    }
  });

}

// google.resultsPerPage =10
// var nextCounter = 0
//
// google('node.js best practices', function (err, next, links){
//   if (err) console.error(err)
//
//   for (var i = 0; i < links.length; ++i) {
//     console.log(links[i].title + ' - ' + links[i].link) // link.href is an alias for link.link
//     console.log(links[i].description + "\n")
//   }
//
//   if (nextCounter < 4) {
//     nextCounter += 1
//     if (next) next()
//   }
// })
