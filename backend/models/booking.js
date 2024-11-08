const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  roomId: {
    type: String,
  },
  starttime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;