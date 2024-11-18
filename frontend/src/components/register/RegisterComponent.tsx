import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../redux/slice/login/Loginslice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState for error message state

// Define the interface for the form values
interface RegistrationFormValues {
  register: (username: string, email: string, password: string) => void
}

const RegistrationComponent = ({ register }: RegistrationFormValues) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to handle error messages from the backend
  const [errorMessage, setErrorMessage] = useState('');

  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await register(values);
    
        // Check if AccessToken is returned in the response
        if (response && response.status === 200) {
          dispatch(setIsLoggedIn());
          localStorage.setItem('isloggedin', 'true'); // Store login status as a string
          resetForm();
          navigate("/"); 
        } else {
          // Handle errors if no AccessToken or message exists
          setErrorMessage(response?.message || 'Unknown error occurred during registration');
        }
      } catch (error) {
        console.error('Registration failed:', error); // Log the error for debugging
        setErrorMessage('Registration failed. Please try again.');
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background ">
      <div className="w-full large:flex large:items-center large:justify-center large:flex-col large:p-20 medium:flex medium:items-center medium:justify-center medium:flex-col p-6 bg-dark-background">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-10">Create an Account</h2>
        
        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="mb-4 large:mb-8 medium:mb-6">
            <label htmlFor="username" className="block text-dark-white">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className={`mt-1 p-3 w-full min-w-[280px] large:w-[700px] medium:w-[500px] border ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-dark-light-border'} rounded-xl text-dark-white  bg-dark-light focus:outline-none focus:border-[#B515DF]`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4 large:mb-8 medium:mb-6">
            <label htmlFor="email" className="block text-dark-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-3 w-full min-w-[280px] large:w-[700px] medium:w-[500px] border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-dark-light-border'} rounded-xl text-dark-white  bg-dark-light focus:outline-none focus:border-[#B515DF]`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 large:mb-8 medium:mb-6">
            <label htmlFor="password" className="block text-dark-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-3 w-full min-w-[280px] large:w-[700px] medium:w-[500px] border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-dark-light-border focus:border-[#B515DF]'} rounded-xl text-dark-white bg-dark-light focus:outline-none`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6 ">
            <button
              type="submit"
              className="w-full min-w-[280px] large:w-[700px] medium:w-[500px] p-3 bg-purple-pink-gradient  rounded-xl text-dark-white focus:bg-pink-purple-gradient focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>

        {/* Display error message from backend */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Already have an account? Login NavLink */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <NavLink to="/login" className="text-dark-white hover:text-[#D528A7] font-bold">Login</NavLink>
          </p>  
        </div>
      </div>
    </div>
  );
};

export default RegistrationComponent;
