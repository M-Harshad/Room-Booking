import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Importing date-fns format function

interface Booking {
  _id: string;
  roomId: string;
  userId: string;
  status: string;
  startTime: string;
  endTime: string;
}

interface Room {
  _id: string;
  roomName: string;
  capacity: number;
  Availibility: boolean;
  pricePerHour: number;
}

interface User {
  _id: string;
  username: string;
}

const AdminBookingsComponent = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]); // To store user data
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all bookings for the admin
    axios
      .get('http://localhost:3000/api/bookings') // Assuming this endpoint returns all bookings
      .then((response) => {
        setBookings(response.data.rooms); // Correcting the response data structure
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch bookings.');
        console.error('Error fetching bookings', error);
      });

    // Fetch rooms data
    axios
      .get('http://localhost:3000/api/rooms') // Assuming this endpoint returns all rooms
      .then((response) => {
        setRooms(response.data.rooms);
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch rooms.');
        console.error('Error fetching rooms', error);
      });

    // Fetch all users (to get their usernames)
    axios
      .get('http://localhost:3000/api/users') // Assuming there's an endpoint for all users
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch users.');
        console.error('Error fetching users', error);
      });
  }, []);

  // Handle the cancellation of a booking
  const handleCancel = async (bookingId: string, roomId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/bookings/${bookingId}?roomId=${roomId}`
      );

      // If the booking is successfully deleted, update the bookings list
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        setErrorMessage('Failed to cancel booking. Please try again.');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      setErrorMessage('Error canceling booking. Please try again later.');
    }
  };

  // Helper function to format the date/time using date-fns
  const formatTime = (time: string) => {
    const date = new Date(time);
    return format(date, 'MMM dd, yyyy, hh:mm a'); // Format as 'Jan 01, 2024, 10:00 AM'
  };

  // Get the username of a user by their userId
  const getUsernameByUserId = (userId: string) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : 'Unknown User';
  };

  // Get the room name by its roomId
  const getRoomNameByRoomId = (roomId: string) => {
    const room = rooms.find((room) => room._id === roomId);
    return room ? room.roomName : 'Unknown Room';
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="w-full flex items-center justify-center flex-col p-6 bg-dark-background large:p-20 medium:p-10">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">
          Admin - All Bookings
        </h2>

        {/* Show error message */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Bookings List */}
        <div className="w-full max-w-4xl">
          <ul className="space-y-4">
            {bookings.map((booking) => {
              const roomName = getRoomNameByRoomId(booking.roomId);
              const username = getUsernameByUserId(booking.userId);
              return (
                <li
                  key={booking._id}
                  className="bg-dark-light p-4 rounded-xl flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark-white">
                      {roomName}
                    </h3>
                    <p className="text-sm text-dark-white">
                      User: {username}
                    </p>
                    <p className="text-sm text-dark-white">
                      Room ID: {booking.roomId}
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

                  {/* Admin Cancellation Confirmation */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleCancel(booking._id, booking.roomId)}
                      className="bg-red-500 p-2 rounded-xl text-dark-white focus:outline-none"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsComponent;

