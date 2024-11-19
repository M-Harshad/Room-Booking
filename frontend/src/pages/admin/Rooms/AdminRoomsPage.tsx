import AdminRooms from "../../../components/admin/rooms/AdminRooms"
import { setRooms, setErrorMessage } from "../../../redux/slice/rooms/RoomSlice";
import { APIClient } from "../../../utli/axios";


const getroom = async (dispatch: any) => {
    try {
      // Make the GET request to fetch rooms
      const response = await APIClient.get('/rooms');
  
      if (response && response.data) {
        // Dispatch action to set rooms
        dispatch(setRooms(response.data.rooms));
      } else {
        // If response is not valid, dispatch an error message
        dispatch(setErrorMessage('Failed to fetch rooms.'));
      }
    } catch (error: any) {
      // Handle error: check if error.response is available (this is typical in Axios errors)
      const errorMessage = error?.response?.data?.message || 'An error occurred while fetching rooms.';
      
      // Log the error and dispatch the error message to Redux store
      dispatch(setErrorMessage(errorMessage));
    }
  };
  


function AdminRoomsPage() {
  return (
    <AdminRooms GetRooms={getroom}/>
  )
}

export default AdminRoomsPage