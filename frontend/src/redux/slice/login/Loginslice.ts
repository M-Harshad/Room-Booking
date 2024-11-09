import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoginSlice {
  value: boolean
}

const initialState: LoginSlice = {
  value: false,
}

export const LoginSlice = createSlice({
  name: 'isloggedin',
  initialState,
  reducers: {
    setIsLoggedIn: (state) => {
      state.value = true
    },
   
  },
})

export const { setIsLoggedIn } = LoginSlice.actions

export default LoginSlice.reducer