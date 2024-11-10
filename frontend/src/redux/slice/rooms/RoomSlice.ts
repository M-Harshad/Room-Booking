import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomState {
  rooms: any[];
  errorMessage: string;
}

const initialState: RoomState = {
  rooms: [],
  errorMessage: '',
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<any[]>) => {
      state.rooms = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setRooms, setErrorMessage } = roomsSlice.actions;
export default roomsSlice.reducer;
