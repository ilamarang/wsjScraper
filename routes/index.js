var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){

	res.redirect('/home');
});

router.get('/home', function(req, res){

res.render('index');

})


module.exports = router;
