const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

// Define Model
const userSchema = new Schema({
  'email': { type: String, unique: true, lowercase: true },
  'password': String
});

// Create Model Class
const Model = mongoose.model('user', userSchema);

//Export Model
module.exports = Model;
