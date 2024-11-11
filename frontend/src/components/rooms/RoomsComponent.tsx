import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const RoomsComponent = ({GetRooms}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const rooms = useSelector((state: RootState) => state.GetRoomsList.rooms);
  const errorMessage = useSelector((state: RootState) => state.GetRoomsList.errorMessage);

  // Fetch rooms data on component mount
  useEffect(() => {
    GetRooms(dispatch)
  }, [dispatch]);

 

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
                  <button
                    onClick={() => navigate(`/admin/rooms/update/${room._id}`)}
                    className="bg-purple-pink-gradient p-2 rounded-xl text-dark-white focus:outline-none"
                  >
                    View Details
                  </button>
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
