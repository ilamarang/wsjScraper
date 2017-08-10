var express = require('express');
var router = express.Router();
// Requiring our Note and Article models
var Note = require(".././models/Note.js");
var Article = require(".././models/Article.js");
var md5 = require('md5');

// Get Homepage
router.get('/', function(req, res){

	res.redirect('/home');
});

router.get('/home', function(req, res){

res.render('index');

})

// Grab an article by it's ObjectId
router.post("/saveArticle/:id", function(req, res) {
	console.log('Save Article' + req.params.id)
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
	console.log('Over Here');
	var hashId = req.body.hash;

	Article.findOne({hash:hashId, saved:true}, function(error,doc) {

		console.log('ok DOC HERE')
		console.log(doc);

		if (doc != null) {
			console.log('None shall pass');
			res.status(400);
			res.send('None shall pass');

		} else {


			Article.update({ "_id": req.params.id },{saved:true}, function(error,doc) {
				if (error) {
					console.log(error);
				}
				else {
					res.json(doc);
				}

			})
		}
	})


});

// Grab an article by it's ObjectId
router.get("/unSaveArticle/:id", function(req, res) {
	console.log('Save Article' + req.params.id)
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.update({ "_id": req.params.id },{saved:false}, function(error,doc) {
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


// Create a new note or replace an existing note
router.post("/deleteArticle/:id", function(req, res) {
    // Use the article id to find and update it's note
      Article.findOne({ "_id": req.params.id },

		function(err, doc) {
			console.log(doc)
			Note.remove({_id:doc.note}, function(err,doc) {

				res.send(doc);
			})
		})
  });



// Create a new note or replace an existing note
router.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  var newNote = new Note(req.body);

  // And save the new note the db
  newNote.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
    }
  });
});

// Grab an article by it's ObjectId
router.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

module.exports = router;
