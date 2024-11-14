import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const RoomsComponent = ({ GetRooms }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state: RootState) => state.GetRoomsList.rooms);
  const errorMessage = useSelector((state: RootState) => state.GetRoomsList.errorMessage);

  // User bookings and filter state
  const [userBookings, setUserBookings] = useState([]);
  const [filter, setFilter] = useState('all');  // 'all', 'available', or 'your-bookings'
  const [deleteError, setDeleteError] = useState(''); // State to manage delete error

  // Get userId from localStorage
  const userId = localStorage.getItem('UserId');  // Assuming userId is stored in localStorage after login
  if (!userId) {
    navigate('/login');  // Redirect to login if no userId is found
  }

  // Fetch rooms data on component mount
  useEffect(() => {
    GetRooms(dispatch);
  }, [dispatch]);

  // Fetch user bookings on component mount
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/api/bookings/${userId}`)
        .then((response) => {
          setUserBookings(response.data);  // Store user bookings
        })
        .catch((error) => {
          console.error('Failed to fetch user bookings', error);
        });
    }
  }, [userId]);
  console.log(userBookings);  // Check the type of userBookings


  // Handle room booking (for normal users)
  const handleBookNow = (roomId: string) => {
    navigate(`/booking/${roomId}`);
  };

  // Handle room deletion (only allow deletion of rooms user has booked)
  const handleDelete = (roomId: string) => {
    setDeleteError(''); // Clear any previous delete errors

    // Check if the user has booked this room before allowing deletion
    const booking = userBookings.find((booking: any) => booking.roomId === roomId);
    if (!booking) {
      setDeleteError('You cannot delete this room as it is not in your bookings.');
      return;
    }

    // Proceed with deletion if the room is in the user's bookings
    axios.delete(`http://localhost:3000/api/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
      },
    })
    .then(() => {
      console.log(`Room ${roomId} deleted`);
      // Re-fetch rooms after deletion
      GetRooms(dispatch);  // Refresh room list after deletion
    })
    .catch((error) => {
      console.error('Failed to delete room:', error);
      setDeleteError('Failed to delete the room. Please try again.');  // Show delete error
    });
  };

  // Convert time to human-readable format
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();  // Converts to format like "MM/DD/YYYY, HH:MM:SS AM/PM"
  };

  // Filter rooms based on selected filter
  const filteredRooms = rooms.filter((room) => {
    switch (filter) {
      case 'available':
        return room.Availibility;  // Only show available rooms
      case 'your-bookings':
        return userBookings.some((booking: any) => booking.roomId === room._id);  // Show rooms user has booked
      default:
        return true;  // Show all rooms
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="w-full flex items-center justify-center flex-col p-6 bg-dark-background large:p-20 medium:p-10">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">List of Rooms</h2>
        
        {/* Filter Buttons */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`${
              filter === 'all' ? 'bg-purple-600' : 'bg-purple-400'
            } p-2 rounded-xl text-dark-white focus:outline-none`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`${
              filter === 'available' ? 'bg-purple-600' : 'bg-purple-400'
            } p-2 rounded-xl text-dark-white focus:outline-none`}
          >
            Available Rooms
          </button>
          <button
            onClick={() => setFilter('your-bookings')}
            className={`${
              filter === 'your-bookings' ? 'bg-purple-600' : 'bg-purple-400'
            } p-2 rounded-xl text-dark-white focus:outline-none`}
          >
            Your Bookings
          </button>
        </div>

        {/* Room list */}
        {filteredRooms.length > 0 ? (
          <div className="w-full max-w-lg">
            <ul className="space-y-4">
              {filteredRooms.map((room) => (
                <li
                  key={room._id}
                  className="bg-dark-light p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-dark-white">{room.roomName}</h3>
                    <p className="text-sm text-dark-white">Capacity: {room.capacity}</p>
                    <p className="text-sm text-dark-white">Price: ${room.pricePerHour}/hr</p>
                    <p className={`text-sm ${room.Availibility ? 'text-green-500' : 'text-red-500'}`}>
                      {room.Availibility ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    {/* Show delete button only if this is a room the user has booked */}
                    {userBookings.some((booking: any) => booking.roomId === room._id) && (
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="bg-red-500 p-2 rounded-xl text-dark-white focus:outline-none"
                      >
                        Delete Room
                      </button>
                    )}
                    <button
                      onClick={() => handleBookNow(room._id)}
                      disabled={!room.Availibility}
                      className={`${
                        room.Availibility ? 'bg-purple-pink-gradient' : 'bg-gray-400 cursor-not-allowed'
                      } p-2 rounded-xl text-dark-white focus:outline-none`}
                    >
                      Book Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-dark-white">{errorMessage || 'No rooms found.'}</p>
        )}

        {/* Display delete error */}
        {deleteError && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {deleteError}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsComponent;
