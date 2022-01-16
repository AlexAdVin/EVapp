var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');


// User model
const User = require('../models/User');

/* Login Page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* Register Page */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// Register handle
router.post('/register', (req,res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2 ) {
    errors.push({ msg: 'Please fill in all fields.'})
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match.'})
  }

  //Check pass length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters.'})
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
    
  } else {
    // Validation passed
    User.findOne({ email: email })
    .then(user => {
      if (user) {
        // User exists
        errors.push({ msg: 'Email is already registered.' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password: password
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => 
          bcrypt.hash(newUser.password, salt, (err,hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser.save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
                console.log("Thanks--------->");
              })
              .catch(err => console.log(err));
        }))
      }
    });
    }

});

// Login Handle
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req,res,next);
});

//Logout Handle
router.get('logout', (req,res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
