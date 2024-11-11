import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {jwtDecode} from 'jwt-decode';  // Import jwt-decode to decode the token

const RoomsComponent = ({ GetRooms }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state: RootState) => state.GetRoomsList.rooms);
  const errorMessage = useSelector((state: RootState) => state.GetRoomsList.errorMessage);

  // Decode the JWT token from localStorage to get the user role
  const token = localStorage.getItem('AccessToken');
  let userRole: string = 'user'; // Default to 'user'
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      console.log(decoded)
      userRole = decoded.role; 
      console.log(userRole)// Assuming the JWT contains a "role" property
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // Fetch rooms data on component mount
  useEffect(() => {
    GetRooms(dispatch);
  }, [dispatch]);

  // Handle room booking (for normal users)
  const handleBookNow = (roomId: string) => {
    navigate(`/booking/${roomId}`);
  };

  // Handle room deletion (for admins)
  const handleDelete = (roomId: string) => {
    // Implement delete functionality
    // For example, call an API to delete the room
    axios.delete(`http://localhost:3000/api/rooms/${roomId}`, {
      headers: {
        Authorization:`Bearer ${token}`,
      }
  })
  
  };

  // Handle room update (for admins)
  const handleUpdate = (roomId: string) => {
    navigate(`/admin/rooms/update/${roomId}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="w-full flex items-center justify-center flex-col p-6 bg-dark-background large:p-20 medium:p-10">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">
          List of Rooms
        </h2>
        {/* Display error message */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}
          
        {/* Room list */}
        {rooms.length > 0 ? (
          <div className="w-full max-w-lg">
            <ul className="space-y-4">
              {rooms.map((room) => (
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
                    {userRole === 'admin' ? (
                      <>
                        <button
                          onClick={() => handleUpdate(room._id)}
                          className="bg-purple-pink-gradient p-2 rounded-xl text-dark-white focus:outline-none"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(room._id)}
                          className="bg-red-500 p-2 rounded-xl text-dark-white focus:outline-none"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleBookNow(room._id)}
                        disabled={!room.Availibility}
                        className={`${
                          room.Availibility
                            ? 'bg-purple-pink-gradient'
                            : 'bg-gray-400 cursor-not-allowed'
                        } p-2 rounded-xl text-dark-white focus:outline-none`}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-dark-white">No rooms available</p>
        )}
      </div>
    </div>
  );
};

export default RoomsComponent;

