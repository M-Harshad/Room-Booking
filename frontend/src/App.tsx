import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/register/RegistrationPage";
import Navbar from "./components/navbar/NavbarComponent";
import HomePage from "./pages/home/HomePage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar/>,
      children: [{
        path: "/",
        element: <HomePage/>,
      }
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
