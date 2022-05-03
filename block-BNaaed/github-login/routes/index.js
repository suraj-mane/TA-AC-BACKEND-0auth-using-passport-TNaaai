var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET success */
router.get('/sucess', (req,res,next) => {
  res.render('success')
})

/* GET failure*/
router.get('/failure', (req,res,next) => {
  res.render('failure')
})


router.get('/auth/github',
  passport.authenticate('github')
);

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failure', session:false }),
  function(req, res) {
    res.redirect('/users');
  });
module.exports = router;
