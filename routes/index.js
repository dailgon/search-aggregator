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
    data: {
      google: [],
      bing: [],
      ddg: []
    } });
});

// get everything after colon
// router.get('/search/:query', function(req, res, next) {
router.get('/search', function(req, res, next) {
  var query_string = req.query.query
  // var query_string = req.params.query;

  // console.log("QR STRING: ", query_string);

  var result = querystring.stringify({q: query_string});
  var query = "https://www.google.com/search?"+result;
  // var query = "https://duckduckgo.com/?"+result;

  // var query = "http://www.bing.com/search?"+result;
  // console.log("MY URL: ", query);
  model.getSearchResults(result, function(err, data){
  // model.getGoogleResults(query, function(err, data){
    //do nothing for now...
    // data.push()
    if (err) return next(err);
    res.render('index', { title: 'Search Aggregator',
      data: data});
  });

});







module.exports = router;
