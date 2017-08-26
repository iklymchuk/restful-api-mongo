let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//user schema definition
let UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the UserSchema for use elsewhere.
module.exports = mongoose.model('user', UserSchema);