var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('request');
var model = require('../model');
var querystring = require("querystring");




/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Search Aggregator',
    data: {
      google: [],
      bing: [],
      ddg: []
    } });
});

router.get('/search', function(req, res, next) {
  var query_string = req.query.query
  var result = querystring.stringify({q: query_string});

  model.getSearchResults(result, function(err, data){
    if (err) return next(err);
    res.render('index', { title: 'Search Aggregator',
      data: data});
  });

});







module.exports = router;
