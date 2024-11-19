import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { format } from 'date-fns'; // Importing date-fns format function

interface Booking {
  _id: string;
  roomId: string;
  status: string;
  startTime: string; // Assuming startTime is an ISO string or similar
  endTime: string;   // Assuming endTime is an ISO string or similar
}

interface AdminRoomsProps {
  GetRooms: (dispatch: any) => void;  // Make sure this is typed correctly
}

const RoomsComponent = ({ GetRooms }: AdminRoomsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state: RootState) => state.GetRoomsList.rooms);
  const errorMessage = useSelector(
    (state: RootState) => state.GetRoomsList.errorMessage
  );

  const [filter, setFilter] = useState<'all' | 'available' | 'your-bookings'>(
    'all'
  );
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [cancelingBooking, setCancelingBooking] = useState<string | null>(null); // Track which booking is being canceled

  const userId = localStorage.getItem('UserId');
  if (!userId) {
    navigate('/login'); // Redirect to login if no userId is found
  }

  useEffect(() => {
    GetRooms(dispatch); // Fetch rooms on component mount
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://room-booking-backend-u2rl.onrender.com/api/bookings/${userId}`)
        .then((response) => {
          setUserBookings(response.data.bookings); // Set user bookings
        })
        .catch((error) => {
          console.error('Failed to fetch user bookings', error);
        });
    }
  }, [userId]);

  const handleBookNow = (roomId: string) => {
    navigate(`/booking/${roomId}`);
  };

  const handleCancel = async (bookingId: string, roomId: string) => {
    try {
      const response = await axios.delete(
        `https://room-booking-backend-u2rl.onrender.com/api/bookings/${bookingId}?roomId=${roomId}`
      );
  
      // If the booking is successfully deleted, update the bookings list
      if (response.status === 200) {
        setUserBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
  
        // Re-fetch rooms to get the latest availability status
        GetRooms(dispatch); // Fetch the rooms again to get the updated availability
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  
    // Reset the canceling state after cancellation
    setCancelingBooking(null);
  };
  
  // Helper function to format the date/time using date-fns
  const formatTime = (time: string) => {
    const date = new Date(time);
    return format(date, 'MMM dd, yyyy, hh:mm a'); // Format as 'Jan 01, 2024, 10:00 AM'
  };

  // Filter rooms based on the selected filter
  const filteredRooms = rooms.filter((room) => {
    switch (filter) {
      case 'available':
        return room.Availibility === true; // Only show available rooms
      case 'your-bookings':
        return userBookings.some((booking) => booking.roomId === room._id); // Show rooms user has booked
      default:
        return true; // Show all rooms
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="w-full flex items-center justify-center flex-col p-6 bg-dark-background large:p-20 medium:p-10">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">
          List of Rooms
        </h2>

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

        {/* Room List */}
        {filter === 'your-bookings' ? (
          <div className="w-full max-w-lg">
            <h3 className="text-xl font-semibold text-dark-white mb-6">
              Your Bookings
            </h3>
            <ul className="space-y-4">
              {userBookings.map((booking) => {
                const room = rooms.find((r) => r._id === booking.roomId);
                return room ? (
                  <li
                    key={room._id}
                    className="bg-dark-light p-4 rounded-xl flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-dark-white">
                        {room.roomName}
                      </h3>
                      <p className="text-sm text-dark-white">
                        Capacity: {room.capacity}
                      </p>
                      <p className="text-sm text-dark-white">
                        Status: {booking.status}
                      </p>
                      <p className="text-sm text-dark-white">
                        Start Time: {formatTime(booking.startTime)}
                      </p>
                      <p className="text-sm text-dark-white">
                        End Time: {formatTime(booking.endTime)}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      {/* If this booking is being canceled, show confirmation */}
                      {cancelingBooking === booking._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleCancel(booking._id, booking.roomId)}
                            className="bg-red-500 p-2 rounded-xl text-dark-white focus:outline-none"
                          >
                            Confirm Cancel
                          </button>
                          <button
                            onClick={() => setCancelingBooking(null)}
                            className="bg-gray-500 p-2 rounded-xl text-dark-white focus:outline-none"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCancelingBooking(booking._id)} // Show confirmation
                          className="bg-red-500 p-2 rounded-xl text-dark-white focus:outline-none"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <ul className="space-y-4">
              {filteredRooms.map((room) => (
                <li
                  key={room._id}
                  className="bg-dark-light p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-dark-white">
                      {room.roomName}
                    </h3>
                    <p className="text-sm text-dark-white">
                      Capacity: {room.capacity}
                    </p>
                    <p
                      className={`text-sm ${
                        room.Availibility ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {room.Availibility ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                  <div className="flex space-x-4">
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Show error message */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsComponent;
