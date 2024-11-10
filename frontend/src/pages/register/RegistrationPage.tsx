import RegistrationComponent from "../../components/register/RegisterComponent"
import axios from "axios";
import { setupAutoRefresh } from "../../RefreshToken/RefreshToken";


// Handle form submission
const register = async (userinfo: any) => {
  try {
    const response = await axios.post('http://localhost:3000/api/register', userinfo);

    if (response && response.data) {
      // Store response data in local storage
      localStorage.setItem('AccessToken', response.data.AccessToken);
      localStorage.setItem('RefreshToken', response.data.RefreshToken);
      localStorage.setItem('UserId', response.data.userId);
      setupAutoRefresh(response.data.AccessToken)
      console.log('Response:', response.data);
      return response
    }
  } catch (error) {
    console.error('Error:', error);
    return error
  }
};


function RegistrationPage() {
  return (
    <RegistrationComponent register={register}/>
  )
}

export default RegistrationPage