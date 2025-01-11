import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
//import type { Store } from '@reduxjs/toolkit'
import postsreducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsreducer,
    users: usersReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
