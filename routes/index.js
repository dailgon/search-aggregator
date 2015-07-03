var express = require('express');
var router = express.Router();
// var jsdom = require('jsdom');
var cheerio = require('cheerio');
var request = require('request');
var model = require('../model');
var querystring = require("querystring");

//example
// router.get('/save', function(req, res, next) {
//   model.save(req.query.msg, function(err, particle) {
//     if (err) return next(err);
//     res.render('create', {
//       data: particle
//     });
//   });
// });



/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Search Aggregator',
    data: [] });

  //TODO: DELETE THIS...
  // var result = querystring.stringify({q: "hello world"});
  // var query = "http://www.google.com/search?"+result;
  //
  // model.getSearchResults(query, function(err, data){
  //   //do nothing for now...
  //   // data.push()
  //   if (err) return next(err);
  //   res.render('index', { title: 'Search Aggregator',
  //     data: data});
  // });


});

// get everything after colon
// router.get('/search/:query', function(req, res, next) {
router.get('/search', function(req, res, next) {
  var query_string = req.query.query
  // var query_string = req.params.query;

  // console.log("QR STRING: ", query_string);

  var result = querystring.stringify({q: query_string});
  // var query = "https://www.google.com/search?"+result;
  // var query = "https://duckduckgo.com/?"+result;

  var query = "http://www.bing.com/search?"+result;
  console.log("MY URL: ", query);
  model.getSearchResults(query, function(err, data){
    //do nothing for now...
    // data.push()
    if (err) return next(err);
    res.render('index', { title: 'Search Aggregator',
      data: data});
  });


  // model.getById(id, function(err, particle) {
  //   if (err) return next(err);
  //   res.render('particles', {
  //     title: 'PARTICLES',
  //     data: particle
  //   });
  // });
});



  // var data = [];
  // request('https://www.google.com/search?q=hello+world&oq=hello+&aqs', function (error, response, body) {
  // if (!error && response.statusCode == 200) {
  //   var $ = cheerio.load(body);
  //   $('h3.r').each(function() {
  //           var link = $(this);
  //           var text = link.text();
  //           // This gets the text copy of the a attrib.
  //           // var text = link.html();
  //           // This gets the url
  //           var locat = link.attr('href');
  //
  //           data.push(text);
  //
  //           // console.log(text);
  //       });
  //     console.log(data);
  //
  //     // nextRequest()
  //
  //     res.render('index', { title: 'Search Aggregator',
  //       data: data});
  //
  //     }
  //   });

// function nextRequest() {
//   // body...
// }



  // res.render('index', { title: 'Search Aggregator',
  //   data: data});


      /*

      Working version

      */
      // request('http://www.example.com/', function (error, response, body) {
      // if (!error && response.statusCode == 200) {
      //   var $ = cheerio.load(body);
      //   $('p a').each(function() {
      //           var link = $(this);
      //           // var text = link.text();
      //           // This gets the text copy of the a attrib.
      //           var text = link.html();
      //           // This gets the url
      //           var locat = link.attr('href');
      //
      //           console.log(locat);
      //       });
      //     }
      //   });






  // request('https://www.google.com/search?gws_rd=ssl&site=&source=hp&q=google&oq=google#q=hello+world', function (error, response, body) {
  // if (!error && response.statusCode == 200) {
  //   var $ = cheerio.load(body);
  //   //   var $ = cheerio.load(body)
  //   // var $body = $('body');
  //
  //   // console.log($('li'));
  //
  //   $("h3.r").each(function() {
  //           var link = $(this);
  //           // var text = link.text();
  //           var text = link.html();
  //
  //           console.log(text);
  //       });
    //
    // console.log($.html());
    // console.log($body.find('h3.r').length);

    // console.log($('h3.r').length);
    // $('h3.r').each(function(i, element){
    //   // var a = $(this).prev();
    //   console.log("Hello world");
    //   // console.log($(this).text());
    // });
//   }
// });

  // request('https://www.google.com/#q=hello+world', function (error, response, body) {
  // if (!error && response.statusCode == 200) {
  //   //console.log(body) // Show the HTML for the Google homepage.
  //   var $ = cheerio.load(body)
  //   , $body = $('body');
  //   var h1s = $body.find("h1");
  //
  //   console.log(h1s);
  //
  // }


// })





module.exports = router;
