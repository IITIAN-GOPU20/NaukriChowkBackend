const Mongoose = require('mongoose');

const { ROLES, EMAIL_PROVIDER, GENDER } = require('../constants');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== 'email' ? false : true;
    }
  },
  phoneNumber: {
    type: String
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
 
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  provider: {
    type: String,
    required: true,
    default: EMAIL_PROVIDER.Email
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: ROLES.SEEKER,
    enum: [ROLES.ADMIN, ROLES.SEEKER, ROLES.RECURITER]
  },
  gender: {
    type: String,
    default: null,
    enum: [GENDER.MALE, GENDER.FEMALE, null]
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('User', UserSchema);