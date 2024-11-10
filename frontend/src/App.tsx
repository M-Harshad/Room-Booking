import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/register/RegistrationPage";
import Navbar from "./components/navbar/NavbarComponent";
import HomePage from "./pages/home/HomePage";
import { useDispatch } from 'react-redux'
import { setIsLoggedIn, setIsLoggedOut } from "./redux/slice/login/Loginslice";
import { useEffect } from "react";
import AddRoomPage from "./pages/admin/AddRooms/AddRoomPage";
import RoomsPage from "./pages/rooms/RoomsPage";

function App() {

  const dispatch = useDispatch()

  // Check the 'isloggedin' state from localStorage and set the redux state on load
  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('isloggedin') || 'false')
    if (isLoggedIn) {
      dispatch(setIsLoggedIn())  // User is logged in, set Redux state to true
    } else {
      dispatch(setIsLoggedOut())  // User is not logged in, set Redux state to false
    }
  }, [dispatch])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar/>,
      children: [{
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/rooms",
        element: <RoomsPage/>
      },
      {
        path: "/admin/addroom",
        element: <AddRoomPage/>
      },
    ]
    },
    {
      path: "/register",
      element: <RegistrationPage/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App
