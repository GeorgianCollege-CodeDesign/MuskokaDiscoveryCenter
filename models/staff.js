/**
 * Created by Esat IBIS on 2017-02-16.
 * Project: MuskokaDiscoveryCenter.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const staffSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});
// saving the user password
staffSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
// checking is the provided password is valid or not
staffSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};
// Generating a Json web token to use it in the future logins
staffSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // change this into enviroment const or variable in the server so it wont' get exposed to the others
};

module.exports = mongoose.model('Staff', staffSchema);
