import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import APIClientPrivate from "../../../utli/axios";

// Yup validation schema
const validationSchema = Yup.object({
  roomName: Yup.string().required('Room name is required'),
  capacity: Yup.number().required('Capacity is required').positive().integer(),
  pricePerHour: Yup.number().required('Price per hour is required').positive(),
  availability: Yup.boolean().required('Availability is required'),
});

interface Room {
  roomName: string;
  capacity: number;
  pricePerHour: number;
  availability: string;
}

const UpdateRoomComponent = () => {
  const [roomDetails, setRoomDetails] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { Roomid } = useParams(); // Get the room ID from the URL
  const navigate = useNavigate();


  // Fetch room details when the component mounts
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await APIClientPrivate.get(`/rooms/${Roomid}`)
        setRoomDetails(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchRoomDetails();
  }, [Roomid]);

  // Handle form submission (Update Room)
  const handleSubmit = async (values: Room) => {
    try {
      // Convert the availability to a boolean if needed
      const updatedValues = {
        ...values,
        availability: values.availability === 'true' ? true : false, // Convert the availability to boolean
      };
      await APIClientPrivate.put(`/rooms/${Roomid}`, updatedValues)
      navigate('/dashboard'); // Redirect to the rooms page after success
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update room');
    }
  };

  if (isLoading) {
    return <div className="bg-dark-background min-h-screen">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-dark-background">
    <div className="bg-dark-background p-6 container mx-auto pt-40 rounded-lg shadow-lg">
      <h2 className="text-3xl text-dark-white mb-6">Update Room</h2>

      {/* Display error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Formik Form */}
      <Formik
        initialValues={{
          roomName: roomDetails?.roomName || '',
          capacity: roomDetails?.capacity || 0,
          pricePerHour: roomDetails?.pricePerHour || 0,
          availability: roomDetails?.availability || "true",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="">
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
              as="select"
              id="availability"
              name="availability"
              className="bg-dark-background text-dark-white border border-gray-600 p-2 rounded-lg w-full"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </Field>
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
    </div>
  );
};

export default UpdateRoomComponent;

