var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET success */
router.get('/users', (req,res,next) => {
  res.render('/users')
})

/* GET failure*/
router.get('/failure', (req,res,next) => {
  res.render('index')
})


router.get('/auth/github',
  passport.authenticate('github')
);

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failure', session:false }),
  function(req, res) {
    res.redirect('/users');
  });

router.get('/auth/google',
  passport.authenticate('google'),
  function(req, res){
});

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users');
});

module.exports = router;