import RegistrationComponent from "../../components/register/RegisterComponent"
import axios from "axios";
import { setupAutoRefresh } from "../../RefreshToken/RefreshToken";
import { AxiosResponse } from "axios";


const register = async (
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse<any, any>> => {
  try {
    const response = await axios.post('https://room-booking-backend-u2rl.onrender.com/api/register', {
      username,
      email,
      password,
    });

    if (response && response.data) {
      // Store response data in local storage
      localStorage.setItem('AccessToken', response.data.AccessToken);
      localStorage.setItem('RefreshToken', response.data.RefreshToken);
      localStorage.setItem('UserId', response.data.userId);
      setupAutoRefresh(response.data.AccessToken);

      return response; // Ensure returning the correct type here
    }

    // If no response or data, throw an error (e.g., server not responding as expected)
    throw new Error('No response or data from the server');
  } catch (error: any) {
    console.error('Error:', error);

    // Return an object with the correct AxiosResponse type in the error case
    return {
      data: { message: error.message || 'An error occurred' },
      status: 500, // A default HTTP status code (500 is Internal Server Error)
      statusText: 'Internal Server Error',
      headers: {},
      config: {},
    } as AxiosResponse<any, any>; // Cast to AxiosResponse to avoid type mismatch
  }
};


function RegistrationPage() {
  return (
    <RegistrationComponent register={register}/>
  )
}

export default RegistrationPage