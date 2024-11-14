const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  pricePerHour: {
    type: Number,
  },
  Availibility: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("room", roomSchema);

module.exports = Room;