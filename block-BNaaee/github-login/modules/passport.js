var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../model/users');


passport.use(new GitHubStrategy({
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRETS,
  callbackURL:'/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
  var profileInfo = {
    name: profile.displayName,
    username:profile.username,
    email:profile._json.email,
    photo:profile._json.avatar_url
  }
  User.findOne({email:profile._json.email} , (err,user) => {
    if(err) return done(err);
    if(!user){
      User.create(profileInfo, (err,newUser) => {
        if(err) return done(err);
        return done(null, newUser);
      })
    }
    done(null,user);
  })
}))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback:true
},
function(accessToken, refreshToken, profile, cb) {
 console.log(profile);
}
));

passport.serializeUser((user,done) => {
  done(null,user.id);
})

passport.deserializeUser(function(id,done){
  User.findById(id, "name email username", function(err, user) {
    done(err,user);
  })
})