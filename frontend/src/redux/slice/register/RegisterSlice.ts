import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface DataState {
  data: any[]; // Use appropriate types based on your data structure

}

const initialState: DataState = {
  data: [],

};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
        state.data = [];  // Clear stored data
      },

  },
});



export const { setData, clearData } = dataSlice.actions;

export default dataSlice.reducer;
