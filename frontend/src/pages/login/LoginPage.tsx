import LoginComponent from "../../components/login/LoginComponent"
import axios from "axios";

// Handle form submission
const login = async (userinfo: any) => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', userinfo);
    console.log(response)

    if (response && response.data) {
      // Store response data in local storage
      localStorage.setItem('userData', JSON.stringify(response.data));
      console.log('Response:', response.data);
      return response
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


function LoginPage() {
  return (
    <LoginComponent login={login}/>
  )
}

export default LoginPage