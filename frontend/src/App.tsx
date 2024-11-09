import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/register/RegistrationPage";

function App() {

  const router = createBrowserRouter([
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
