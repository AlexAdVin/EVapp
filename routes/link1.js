var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('link1', { title: 'First Link' });
});

module.exports = router;
