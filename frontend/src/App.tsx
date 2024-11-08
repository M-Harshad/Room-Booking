import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import RegistrationPage from "./pages/register/RegistrationPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RegistrationPage/>
    }

  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App
