var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/failed', (req,res) => {res.send('You have failed to authenticate! Sorry!')});
router.get('/good', (req,res) => {res.send(`Welcome Mr ${req.user}`)});

router.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/callback',
    passport.authenticate( 'google', { failureRedirect: '/login' }),
    function(req,res){
        res.redirect('/dash');
        //{res.send(`Welcome Mr ${req.user}`)}
    });

module.exports = router;