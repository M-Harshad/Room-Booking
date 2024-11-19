import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import APIClientPrivate from '../../../utli/axios';

const AddRoomComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      roomName: '',
      capacity: '',
      pricePerHour: '',
      availability: "true",
    },
    validationSchema: Yup.object({
      roomName: Yup.string()
        .required('Room name is required')
        .min(3, 'Room name must be at least 3 characters'),
      capacity: Yup.number()
        .required('Capacity is required')
        .min(1, 'Capacity must be at least 1'),
      pricePerHour: Yup.number()
        .required('Price per hour is required')
        .min(1, 'Price must be greater than 0'),
      availability: Yup.string()
        .required('Availability is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Convert the availability to a boolean if needed
        const updatedValues = {
          ...values,
          availability: values.availability === 'true' ? true : false, // Convert the availability to boolean
        };
        const response = await APIClientPrivate.post(`/rooms/add`, updatedValues)
        
        if (response.status === 201) {
        }
      } catch (error) {
        console.error('Room addition failed:', error);
        setErrorMessage('Failed to add room. Please try again.');
      }
      resetForm();
      console.log(formik)
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background">
      <div className="w-full flex items-center justify-center flex-col p-6 bg-dark-background large:p-20 medium:p-10">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">Add a New Room</h2>

        <form onSubmit={formik.handleSubmit} className="w-full max-w-lg">
          {/* Room Name Field */}
          <div className="mb-4">
            <label htmlFor="roomName" className="block text-dark-white">Room Name</label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              className={`mt-1 p-3 w-full border rounded-xl text-dark-white bg-dark-light focus:outline-none focus:border-[#B515DF] ${formik.touched.roomName && formik.errors.roomName ? 'border-red-500' : 'border-dark-light-border'}`}
              value={formik.values.roomName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.roomName && formik.errors.roomName && (
              <p className="text-red-500 text-sm">{formik.errors.roomName}</p>
            )}
          </div>

          {/* Capacity Field */}
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-dark-white">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              className={`mt-1 p-3 w-full border rounded-xl text-dark-white bg-dark-light focus:outline-none focus:border-[#B515DF] ${formik.touched.capacity && formik.errors.capacity ? 'border-red-500' : 'border-dark-light-border'}`}
              value={formik.values.capacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.capacity && formik.errors.capacity && (
              <p className="text-red-500 text-sm">{formik.errors.capacity}</p>
            )}
          </div>

          {/* Price Per Hour Field */}
          <div className="mb-4">
            <label htmlFor="pricePerHour" className="block text-dark-white">Price Per Hour</label>
            <input
              type="number"
              id="pricePerHour"
              name="pricePerHour"
              className={`mt-1 p-3 w-full border rounded-xl text-dark-white bg-dark-light focus:outline-none focus:border-[#B515DF] ${formik.touched.pricePerHour && formik.errors.pricePerHour ? 'border-red-500' : 'border-dark-light-border'}`}
              value={formik.values.pricePerHour}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.pricePerHour && formik.errors.pricePerHour && (
              <p className="text-red-500 text-sm">{formik.errors.pricePerHour}</p>
            )}
          </div>

         {/* Availability Field */}
            <div className="mb-4">
            <label htmlFor="availability" className="block text-dark-white">Availability</label>
            <select
                id="availability"
                name="availability"
                className="mt-1 p-3 w-full border border-dark-light-border rounded-xl text-dark-white bg-dark-light focus:outline-none focus:border-[#B515DF]"
                onChange={formik.handleChange}
            >
               <option value='true'>Available</option>
               <option value='false'>Not Available</option>
            </select>
            {formik.touched.availability && formik.errors.availability && (
                <p className="text-red-500 text-sm">{formik.errors.availability}</p>
            )}
            </div>


          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-3 bg-purple-pink-gradient rounded-xl text-dark-white focus:bg-pink-purple-gradient focus:outline-none"
            >
              Add Room
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

export default AddRoomComponent;