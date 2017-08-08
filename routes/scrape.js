var express = require('express');
var router = express.Router();
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Get Homepage
router.get('/scrape', function(req, res){
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
      result.image = $(this).closest('.wsj-card-feature').find('img').attr('src');

testArray.push(result.image);

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      /* var entry = new Article(result);

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
      }); */


    });

    testArray.forEach(function(counter,element){
      console.log(element);
      console.log(counter);
    })
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});



module.exports = router;
