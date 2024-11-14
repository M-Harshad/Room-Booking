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
import ProtectedRoute from "./Protection/ProtectedRoute"
import { setupAutoRefresh } from "./RefreshToken/RefreshToken";
import UpdateRoomsPage from "./pages/admin/updateroom/UpdateRoomPage";
import AdminRoomsPage from "./pages/admin/Rooms/AdminRoomsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AboutusPage from "./pages/about/AboutusPage";
import ContactPage from "./pages/contact/ContactPAge";
import BookingPage from "./pages/Booking/Bookingpage";

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
     
    const token = localStorage.getItem("AccessToken");

    if (token) {
      // If token exists, call the setupAutoRefresh function
      setupAutoRefresh(token);
    } else {
      console.log("AccessToken not found in localStorage");
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
        path: "/profile/:userId",
        element: <ProfilePage/>,

      },
      {
        path: "/about",
        element: <AboutusPage/>,

      },
      {
        path: "/contact",
        element: <ContactPage/>,

      },
      {
        path: "/booking/:roomId",
        element: <BookingPage/>,

      },
      {
        path: "/addroom",
       element: (<ProtectedRoute>
                    <AddRoomPage/>
                 </ProtectedRoute>
       ),
      },
      {
        path: "rooms/update/:Roomid",
       element: (<ProtectedRoute>
                    <UpdateRoomsPage/>
                 </ProtectedRoute>
       ),
    },
      {
        path: "/dashboard",
       element: (<ProtectedRoute>
                    <AdminRoomsPage/>
                 </ProtectedRoute>
       ),
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
