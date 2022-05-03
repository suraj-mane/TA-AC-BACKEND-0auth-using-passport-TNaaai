var express = require('express');
var router = express.Router();
var User = require('../model/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session,req.user);
  res.send('respond with a resource');
});

/* GET users login*/
router.get('/login', (req,res,next) => {
  res.render('loginPage');
})

/* GET users Register*/
router.get('/register', (req,res,next) => {
  res.render('register');
})

/* POST users Register*/
router.post('/register', (req,res,next) => {
  User.create(req.body, (err,user) => {
    if(err) return next(err);
    res.redirect('/users/login');
  })
})

/* POST users login */
router.post('/login',(req,res,next) => {
  var email = req.body.email;
  User.findOne({email: email}, (err,user) => {
    if(err) return next(err);
    if(!user){
      res.redirect('/users/login');
    } else {
      req.session.email = user.email;
      res.redirect('/');
    }
  })
})
module.exports = router;
