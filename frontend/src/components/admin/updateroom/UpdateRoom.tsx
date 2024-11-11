import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema
const validationSchema = Yup.object({
  roomName: Yup.string().required('Room name is required'),
  capacity: Yup.number().required('Capacity is required').positive().integer(),
  pricePerHour: Yup.number().required('Price per hour is required').positive(),
  availability: Yup.boolean().required('Availability is required'),
});

const UpdateRoomComponent = () => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { Roomid } = useParams(); // Get the room ID from the URL
  const IsLoggedIn = useSelector((state) => state.isloggedin.value);
  const navigate = useNavigate();
  console.log(Roomid)

  // Fetch room details when the component mounts
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/rooms/${Roomid}`);
        setRoomDetails(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchRoomDetails();
  }, [Roomid]);

  // Handle form submission (Update Room)
  const handleSubmit = async (values) => {
    try {
        await axios.put(`http://localhost:3000/api/rooms/${Roomid}`, values, {
            headers: {
              Authorization:`Bearer ${localStorage.getItem('AccessToken')}`,
            },
          });
          
      navigate('/rooms'); // Redirect to the rooms page after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update room');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dark-background p-6 container mx-auto mt-12 rounded-lg shadow-lg">
      <h2 className="text-3xl text-dark-white mb-6">Update Room</h2>
      
      {/* Display error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Formik Form */}
      <Formik
        initialValues={{
          roomName: roomDetails?.roomName || '',
          capacity: roomDetails?.capacity || '',
          pricePerHour: roomDetails?.pricePerHour || '',
          availability: roomDetails?.availability || false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          {/* Room Name */}
          <div>
            <label className="text-dark-white" htmlFor="roomName">Room Name</label>
            <Field
              type="text"
              id="roomName"
              name="roomName"
              className="bg-dark-background text-dark-white border border-gray-600 p-2 rounded-lg w-full"
            />
            <ErrorMessage name="roomName" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Capacity */}
          <div>
            <label className="text-dark-white" htmlFor="capacity">Capacity</label>
            <Field
              type="number"
              id="capacity"
              name="capacity"
              className="bg-dark-background text-dark-white border border-gray-600 p-2 rounded-lg w-full"
            />
            <ErrorMessage name="capacity" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Price Per Hour */}
          <div>
            <label className="text-dark-white" htmlFor="pricePerHour">Price per Hour</label>
            <Field
              type="number"
              id="pricePerHour"
              name="pricePerHour"
              className="bg-dark-background text-dark-white border border-gray-600 p-2 rounded-lg w-full"
            />
            <ErrorMessage name="pricePerHour" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Availability */}
          <div>
            <label className="text-dark-white" htmlFor="availability">Availability</label>
            <Field
              type="checkbox"
              id="availability"
              name="availability"
              className="bg-dark-background text-dark-white border border-gray-600 p-2 rounded-lg"
            />
            <ErrorMessage name="availability" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-pink-gradient text-white p-3 rounded-xl w-full hover:bg-blue-700 mt-4"
          >
            Update Room
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdateRoomComponent;
