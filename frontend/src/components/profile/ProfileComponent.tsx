import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

const ProfileComponent = () => {
  const { userId } = useParams(); // Get userId from the URL path
  const [userDetails, setUserDetails] = useState<any>(null); // to hold user data
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch user details when component mounts
  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/profile/${userId}`); // Use userId in the URL
        setUserDetails(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load user data");
      }
    };

    fetchUserDetails();
  }, [userId]); // Dependency on userId so it fetches when it changes


  
  const handleLogout = () => {
    // Remove the specific items from localStorage
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("UserId");
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("AccessToken");
    // Navigate to the login page (without full page reload)
    navigate("/login");
  };
  

  if (!userDetails) {
    return <div className="text-center text-black bg-dark-background h-screen">Loading...</div>;
  }
  


  return (
    <div className="min-h-screen bg-dark-background p-6">
      <div className="container mx-auto pt-20 max-w-2xl bg-dark-background p-8 rounded-lg shadow-lg">
        {/* Greeting Section */}
        <h2 className="text-3xl text-dark-white mb-6">
          Hello, {userDetails.username}
        </h2>

        {/* Display error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Profile Details */}
        <div className="space-y-6">
          {/* Username Section */}
          <div>
            <label className="text-dark-white">Username</label>
            {/* Display the username in a <p> tag to make it untouchable */}
            <p className="text-dark-white bg-dark-light p-2 rounded-lg">{userDetails.username}</p>
          </div>

          {/* Email Section */}
          <div>
            <label className="text-dark-white">Email</label>
            {/* Display the email in a <p> tag to make it untouchable */}
            <p className="text-dark-white bg-dark-light p-2 rounded-lg">{userDetails.email}</p>
          </div>

          {/* Logout Section */}
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-3 rounded-xl w-full hover:bg-red-700 mt-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

