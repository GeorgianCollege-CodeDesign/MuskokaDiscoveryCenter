/**
 * Created by Esat IBIS on 2017-03-01.
 * Project: MuskokaDiscoveryCenter.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Staff = mongoose.model('Staff');


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    Staff.findOne({ email: username }, function (err, user) {
      if (err) {
         return done(err);
       }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
