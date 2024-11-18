import LoginComponent from "../../components/login/LoginComponent"
import axios from "axios";
import { AxiosResponse } from "axios";
import { setupAutoRefresh } from "../../RefreshToken/RefreshToken";



// Handle form submission
const login = async (username: string, password: string):  Promise<AxiosResponse<any>> => {
  try {
    
    const response = await axios.post('https://room-booking-backend-u2rl.onrender.com/api/login',  { username, password },);
    console.log(response)

      // Store response data in local storage
      localStorage.setItem('AccessToken', response.data.AccessToken);
      localStorage.setItem('RefreshToken', response.data.RefreshToken);
      localStorage.setItem('UserId', response.data.userId);
      setupAutoRefresh(response.data.AccessToken)
      console.log('Response:', response.data);
      return response
    
  } catch (error: any) {
    console.error('Error:', error);
    return error
  }
};


function LoginPage() {
  return (
    <LoginComponent login={login}/>
  )
}

export default LoginPage