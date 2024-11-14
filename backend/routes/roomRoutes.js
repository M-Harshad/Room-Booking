const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const authenticateToken = require("../middlewares/AuthenticateToken")


router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        
        if (rooms.length === 0) {
            return res.status(404).json({
          message: 'No rooms found',
        });
    }
  
    // Return the list of rooms
    res.status(200).json({
        message: 'Rooms fetched successfully',
        rooms: rooms,
    });
} catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({
        message: 'Error fetching rooms',
        error: error.message,
    });
}    
});

// Route to get room details by roomId
router.get('/rooms/:id', authenticateToken, async (req, res) => {
  const roomId = req.params.id;  // Get the roomId from the route parameter

  try {
    // Find the room by ID in the database
    const room = await Room.findById(roomId);
    
    // If no room is found, return a 404 response
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Return the room details as a response
    res.status(200).json(room);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({
      message: 'Error fetching room details',
      error: error.message,
    });
  }
});

router.post('/rooms/add', authenticateToken, async (req, res) => {
    const { roomName, capacity, pricePerHour, availability } = req.body;
    
    // Validate input
    if (!roomName || !capacity || !pricePerHour || availability === undefined) {
        return res.status(400).json({ message: 'All fields (roomName, capacity, pricePerHour, availability) are required' });
    }
    
    try {
        // Check if the room name already exists
        const existingRoom = await Room.findOne({ roomName });
        if (existingRoom) {
            return res.status(400).json({ message: 'Room name already exists' });
        }
        
        // Create a new room instance
        const newRoom = new Room({
            roomName,
            capacity,
            pricePerHour,
            availability,
        });
        
        // Save the new room to the database
        await newRoom.save();
        
        // Send success response with room data
        res.status(201).json({
            message: 'Room created successfully',
            room: newRoom,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating room',
            error: error.message,
        });
    }
});

// PUT route to update room details by roomId
router.put('/rooms/:roomId', authenticateToken, async (req, res) => {
    const { roomId } = req.params; 
    const { roomName, capacity, pricePerHour, availability } = req.body;  // Extract data from the request body
  console.log({availability})
    // Validate input data
    if (!roomName && !capacity && !pricePerHour && availability === undefined) {
      return res.status(400).json({ message: 'At least one field (roomName, capacity, pricePerHour, availability) must be provided.' });
    }
  
    try {
      // Find the room by roomId
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: 'Room not found.' });
      }
  
      // Update the room's details if new values are provided
      if (roomName) room.roomName = roomName;
      if (capacity) room.capacity = capacity;
      if (pricePerHour) room.pricePerHour = pricePerHour;
        room.Availibility = availability;
  

      await room.save();
  
      // Return the updated room details
      res.status(200).json({
        message: 'Room details updated successfully',
        room
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error updating room details',
        error: error.message
      });
    }
  });

  // DELETE route to remove a room by roomId
router.delete('/rooms/:roomId', authenticateToken, async (req, res) => {
    const { roomId } = req.params; 
  
    try {
      // Find the room by roomId and delete it
      const room = await Room.findByIdAndDelete(roomId);
  
      // If room is not found
      if (!room) {
        return res.status(404).json({ message: 'Room not found.' });
      }
  
      // If room is successfully deleted
      res.status(200).json({
        message: 'Room deleted successfully',
        room
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error deleting room',
        error: error.message
      });
    }
  });
  

module.exports = router;