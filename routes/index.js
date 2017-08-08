var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){

	res.redirect('/home');
});

router.get('/home', function(req, res){

res.render('index');

})

router.get('/articles',function(req,res) {
  Article.find({},function(err,doc) {
    res.json(doc);

  })

});

module.exports = router;
