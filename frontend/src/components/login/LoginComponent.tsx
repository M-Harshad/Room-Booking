import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../redux/slice/login/Loginslice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState

const LoginComponent = ({ login }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State for handling error messages
  const [errorMessage, setErrorMessage] = useState('');

  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Sending login request to the backend
        const response = await login(values);
        if (response.status === 200 && response.data) {

          dispatch(setIsLoggedIn());
          localStorage.setItem('isloggedin', 'true');  // Store login status as a string
          resetForm();
          navigate("/");
          
        } else {
          // Handle failed login attempt
          setErrorMessage(response.data.message || 'Unknown error');
        }
      } catch (error) {
        // Set error message in case of an error (e.g., network issues)
        setErrorMessage('Invalid email or password');
        console.error('Login failed:', error);
      }
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-background ">
      <div className="w-full large:flex large:items-center large:justify-center large:flex-col large:p-20 medium:flex medium:items-center medium:justify-center medium:flex-col p-6 bg-dark-background">
        <h2 className="text-2xl font-semibold text-center text-dark-white mb-6">Login</h2>
        
        <form onSubmit={formik.handleSubmit}>
          {/* Username Field */}
          <div className="mb-4 large:mb-8 medium:mb-6">
            <label htmlFor="username" className="block text-dark-white">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className={`mt-1 p-3 w-full min-w-[280px] large:w-[700px] medium:w-[500px] border ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-dark-light-border'} rounded-xl text-dark-white bg-dark-light focus:outline-none focus:border-[#B515DF]`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm">{formik.errors.username}</p>
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
          <div className="mt-6">
            <button
              type="submit"
              className="w-full min-w-[280px] large:w-[700px] medium:w-[500px] p-3 bg-purple-pink-gradient rounded-xl text-dark-white focus:bg-pink-purple-gradient focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>

        {/* Display error message if login fails */}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Don't have an account? Sign up NavLink */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <NavLink to="/register" className="text-dark-white hover:text-[#D528A7] font-bold">Sign up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
