import { createSlice } from '@reduxjs/toolkit'


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
      localStorage.setItem('isloggedin', 'true') // Persist to localStorage
    },
    setIsLoggedOut: (state) => {
      state.value = false
      localStorage.setItem('isloggedin', 'false') // Persist to localStorage
    },
   
  },
})



export const { setIsLoggedIn, setIsLoggedOut } = LoginSlice.actions

export default LoginSlice.reducer