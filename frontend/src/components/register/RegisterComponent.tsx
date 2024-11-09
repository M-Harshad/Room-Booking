import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from '../../redux/slice/login/Loginslice';
import { useNavigate } from 'react-router-dom';

const RegistrationComponent = ({register}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        await register(values);
        dispatch(setIsLoggedIn());
        resetForm();
        navigate("/");
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
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
        {/* Don't have an account? Sign up NavLink */}
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
