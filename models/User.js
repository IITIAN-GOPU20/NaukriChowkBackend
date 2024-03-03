const Mongoose = require('mongoose');

const { ROLES, EMAIL_PROVIDER } = require('../constants');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    
  
},
email: {
    type: String,
   
   
},
password: {
    type: String,
   
},
createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = Mongoose.model('User', UserSchema);