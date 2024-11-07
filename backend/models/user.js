const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // User roles
    default: 'user',  // Default role is 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});


const User = mongoose.model("user", userSchema);

module.exports = User;