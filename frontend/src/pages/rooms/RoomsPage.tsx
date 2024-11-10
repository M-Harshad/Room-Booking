import RoomsComponent from '../../components/rooms/RoomsComponent';
import axios from 'axios';
import { setRooms, setErrorMessage } from '../../redux/slice/rooms/RoomSlice';


const getroom = async (dispatch: any) => {
    try {
        const response = await axios.get('http://localhost:3000/api/rooms');

      if (response && response.data) {
        dispatch(setRooms(response.data.rooms));

      } else {
        dispatch(setErrorMessage('Failed to fetch rooms.'));
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      dispatch(setErrorMessage('Failed to fetch rooms. Please try again later.'));
    }
  };

function RoomsPage() {
  return (
    <RoomsComponent GetRooms={getroom}/>
  )
}

export default RoomsPage