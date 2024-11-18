import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


interface AdminRoomsProps {
  GetRooms: (dispatch: any) => void;  // Make sure this is typed correctly
}

const AdminRooms: React.FC<AdminRoomsProps> = ({ GetRooms }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state: RootState) => state.GetRoomsList.rooms);
  const errorMessage = useSelector((state: RootState) => state.GetRoomsList.errorMessage);

  // Decode the JWT token from localStorage to get the user role
  const token = localStorage.getItem('AccessToken');

  useEffect(() => {
    // Fetch rooms data when the component mounts
    GetRooms(dispatch);
  }, [dispatch, GetRooms]);

  const handleDelete = async (roomId: string) => {
    if (!token) {
      // If no token, prompt user to login (or navigate them to login page)
      alert('You must be logged in to delete a room.');
      navigate('/login');
      return;
    }

    try {
      // Make the DELETE request
      await axios.delete(`https://room-booking-backend-u2rl.onrender.com/api/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Optionally, refresh the room list after successful deletion
      GetRooms(dispatch);  // Fetch updated room list

    } catch (err) {
      console.error('Failed to delete room:', err);
      alert('Failed to delete room. Please try again.');
    }
  };

  // Handle room update (for admins)
  const handleUpdate = (roomId: string) => {
    navigate(`/rooms/update/${roomId}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="w-full flex items-center justify-center flex-col p-6 bg-dark-background large:p-20 medium:p-10">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">
          List of Rooms
        </h2>
    
        {/* Display rooms list or error message */}
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-dark-white">{errorMessage || 'No rooms found'}</p>
        )}
      </div>
    </div>
  );
};

export default AdminRooms;
