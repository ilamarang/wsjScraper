var express = require('express');
var router = express.Router();
// Requiring our Note and Article models
var Note = require(".././models/Note.js");
var Article = require(".././models/Article.js");

// Get Homepage
router.get('/', function(req, res){

	res.redirect('/home');
});

router.get('/home', function(req, res){

res.render('index');

})

// Grab an article by it's ObjectId
router.get("/saveArticle/:id", function(req, res) {
	console.log('Save Article' + req.params.id)
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.update({ "_id": req.params.id },{saved:true}, function(error,doc) {
		if (error) {
      console.log(error);
    }
		else {
      res.json(doc);
    }

	})

});

// Grab an article by it's ObjectId
router.get("/savedArticles", function(req, res) {

  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.find({ saved:true}, function(error,doc) {
		if (error) {
      console.log(error);
    }
		else {
      res.json(doc);
    }

	})

});

module.exports = router;
