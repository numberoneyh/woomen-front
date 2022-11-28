import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { todoApi } from './todo/todo.api'
import { userReducer } from './user/user.slice'

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todoApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
