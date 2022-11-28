import { createSlice } from '@reduxjs/toolkit'
import { LoginData } from '../../models'

const initialState: LoginData = {
  token: '' || localStorage.getItem(process.env.REACT_APP_SECRET_KEY as string)
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token += action.payload
      localStorage.setItem(process.env.REACT_APP_SECRET_KEY as string, action.payload)
    },
    removeToken: (state) => {
      state.token = null
      localStorage.removeItem(process.env.REACT_APP_SECRET_KEY as string)
    }
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer