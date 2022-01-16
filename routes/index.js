var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    name: req.user.name });
});

/* GET home page. */
router.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.render('dash', { 
    title: 'Dashboard',
    name: req.user.name });
});

module.exports = router;
