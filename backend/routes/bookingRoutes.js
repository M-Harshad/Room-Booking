const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");


// GET route to retrieve all rooms
router.get('/bookings', async (req, res) => {
    try {

      const rooms = await Booking.find();
  
      // If no rooms are found, return a message
      if (rooms.length === 0) {
        return res.status(404).json({ message: 'No rooms found' });
      }
  
      // Return the list of rooms
      res.status(200).json({
        message: 'Rooms fetched successfully',
        rooms,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error fetching rooms',
        error: error.message,
      });
    }
  });

  // Route to get bookings for a specific user
router.get('/bookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;  // Get the userId from the URL params
    
    
    // Fetch bookings for the user
    const bookings = await Booking.find({ userId: userId }).populate('roomId');  // Assuming the room is populated with details

    // If no bookings found for this user, return a 404 response
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user.' });
    }

    // Send the bookings data as response
    res.status(200).json({
      message: 'User bookings fetched successfully',
      bookings: bookings,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching user bookings',
      error: error.message,
    });
  }
});


// POST route to create a new booking
router.post('/bookings', async (req, res) => {
    const { userId, roomId, startTime, endTime } = req.body;
    console.log(req.body)
  
    // Validate input
    if (!userId || !roomId || !startTime || !endTime) {
      return res.status(400).json({ message: 'All fields (userId, roomId, starttime, endTime) are required.' });
    }
  
    try {
      // Create a new booking
      const newBooking = new Booking({
        userId,
        roomId,
        startTime,
        endTime,
      });
  

      await newBooking.save();
  
      // Return success response with the booking details
      res.status(201).json({
        message: 'Booking created successfully',
        booking: newBooking,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error creating booking',
        error: error.message,
      });
    }
  });

   // DELETE route to remove a booking by bookingId
router.delete('/bookings/:bookingId', async (req, res) => {
    const { bookingId } = req.params;  // Get the bookingId from the URL parameter
  
    try {
      // Find the booking by bookingId and delete it
      const booking = await Booking.findByIdAndDelete(bookingId);
  
      // If the booking is not found, return a 404 error
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // If booking is successfully deleted
      res.status(200).json({
        message: 'Booking deleted successfully',
        booking,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error deleting booking',
        error: error.message,
      });
    }
  });

module.exports = router;