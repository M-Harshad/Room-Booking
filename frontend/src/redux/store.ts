import { configureStore } from '@reduxjs/toolkit'
import isloggedin from './slice/login/Loginslice'
import rooms from './slice/rooms/RoomSlice'

export const store = configureStore({
  reducer: {
    isloggedin: isloggedin,
    GetRoomsList: rooms,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch