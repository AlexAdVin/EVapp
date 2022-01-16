var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var flash = require('connect-flash');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var link1Router = require('./routes/link1');
var dashRouter = require('./routes/dash');
// var loginRouter = require('./routes/login');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users.js');


var app = express();

//const { Router } = require('express');
//const { MongoClient } = require('mongodb');
var { env } = require('dotenv').config();
/*
MongoClient.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, () => {
  console.log("Connected to mongoose succesfully.")
})
*/

// Passport Config
require('./config/passport')(passport);

// DB Config
//const db = require('./config/keys').mongoURI;
var db = `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`;


// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());

// Bodyparser (data from form wit hreq.body)
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
/*
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new GoogleStrategy({
  clientID:     `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  callbackURL: "/auth/google/callback",
  passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
  console.log(profile);
  done(null,profile);
}
));

*/

app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/link1', link1Router);
//app.use('/dash', dashRouter);
app.use('/users', usersRouter);
app.use('/auth/google',authRouter);
//app.use('/', usersRouter);

//app.get('/failed', (req,res) => {res.send('You have failed to authenticate! Sorry!')});
// app.get('/good', (req,res) => {res.send(`Welcome Mr ${req.user}`)});

/*
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email','profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', { failureRedirect: '/failed' }),
    function (req,res) {
      res.redirect('/good');
    }
    );
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port: ${PORT}`)
})

module.exports = app;
