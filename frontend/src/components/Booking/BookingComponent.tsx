import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APIClient } from '../../utli/axios';

const BookingComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');
  const { roomId } = useParams();  // Room ID from the URL
  const navigate = useNavigate();

  // Get the userId from localStorage (assuming user is authenticated)
  useEffect(() => {
    const storedUserId = localStorage.getItem('UserId');  // Assuming UserId is stored in localStorage after login
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Redirect or handle case when no userId is found
      navigate('/login');  // Redirect to login page if not authenticated
    }
  }, []);


  // Formik setup
  const formik = useFormik({
    initialValues: {
      startTime: '',
      endTime: '',
    },
    validationSchema: Yup.object({
      startTime: Yup.date().required('Start time is required'),
      endTime: Yup.date()
        .required('End time is required')
        .test('is-after-start', 'End time must be after start time', function(value) {
          const { startTime } = this.parent;
          return new Date(value) > new Date(startTime);
        }),
    }),
    onSubmit: async (values) => {

        const finalValues = {
            userId: userId,
            roomId: roomId,
            ...values,
          };
      try {
        const response = await APIClient.post('/bookings', finalValues,)

        if (response.status === 201) {
          navigate('/bookings');  // Redirect to the bookings page or confirmation page
        }
      } catch (error) {
        console.error('Booking failed:', error);
        setErrorMessage('Failed to create booking. Please try again.');
      }
    navigate('/rooms'); 
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="w-full flex items-center justify-center flex-col p-6 bg-dark-background large:p-20 medium:p-10">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">Book This Room</h2>
        <form onSubmit={formik.handleSubmit} className="w-full max-w-lg">
          {/* Start Time Field */}
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-dark-white">Start Time</label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              className={`mt-1 p-3 w-full border rounded-xl text-dark-white bg-dark-light focus:outline-none focus:border-[#B515DF] ${formik.touched.startTime && formik.errors.startTime ? 'border-red-500' : 'border-dark-light-border'}`}
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.startTime && formik.errors.startTime && (
              <p className="text-red-500 text-sm">{formik.errors.startTime}</p>
            )}
          </div>

          {/* End Time Field */}
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-dark-white">End Time</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              className={`mt-1 p-3 w-full border rounded-xl text-dark-white bg-dark-light focus:outline-none focus:border-[#B515DF] ${formik.touched.endTime && formik.errors.endTime ? 'border-red-500' : 'border-dark-light-border'}`}
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.endTime && formik.errors.endTime && (
              <p className="text-red-500 text-sm">{formik.errors.endTime}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-purple-pink-gradient rounded-xl text-dark-white focus:bg-pink-purple-gradient focus:outline-none"
            >
              Book Room
            </button>
          </div>
        </form>

        {/* Display error message from backend */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
