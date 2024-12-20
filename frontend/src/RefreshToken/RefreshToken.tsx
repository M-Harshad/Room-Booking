import { APIClient } from "../utli/axios";


let tokenRefreshTimeout: any;

// Function to set up automatic token refresh
export const setupAutoRefresh = (token: string) => {
  const { exp } = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get expiration

  // Calculate remaining time in milliseconds, subtracting a 5-minute buffer (300,000 ms)
  const refreshTime = exp * 1000 - Date.now() - 30000;

  // Clear any existing timeout to prevent duplicates
  if (tokenRefreshTimeout) clearTimeout(tokenRefreshTimeout);

  // Set a timeout to refresh the token before it expires
  tokenRefreshTimeout = setTimeout(refreshToken, refreshTime);
};

// Function to refresh the access token
export const refreshToken = async () => {
    try {
      // Get the refresh token from localStorage (assuming it was stored previously)
      const refreshToken = localStorage.getItem('RefreshToken');
  
      if (!refreshToken) {
        console.error('No refresh token found');
        return;
      }
  
      // Make the POST request to refresh the access token, sending the refresh token in the header
      const response = await APIClient.post("user/refresh-token")
  
      const newAccessToken = response.data.AccessToken;
      const newRefreshToken = response.data.RefreshToken;

      localStorage.setItem('AccessToken', newAccessToken);
      localStorage.setItem('RefreshToken', newRefreshToken);
      setupAutoRefresh(newAccessToken);
  
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Optionally, handle error, e.g., redirect to login page if refresh fails
    }
  };
  

