var express = require('express');
var router = express.Router();
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var md5 = require('md5');

// Requiring our Note and Article models
var Note = require(".././models/Note.js");
var Article = require(".././models/Article.js");

router.get('/article', function(req, res){
  console.log('Hello!')
  Article.find({})
  .skip(20)
  .limit(20)
  .exec(function(err,doc) {
    console.log(doc);
    res.json(doc);

  })

});

// Get Homepage
router.get('/', function(req, res){
  // First, we grab the body of the html with request
  request("https://www.wsj.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
var testArray = [];
    $(".wsj-headline").each(function(i, element) {
      console.log(element);
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      result.hash = md5($(this).children("a").text());

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });


    });

  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});







module.exports = router;
