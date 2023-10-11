import { configureStore } from '@reduxjs/toolkit'
import {cartSlice} from './fetures/cartSlice'
export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
  },
})

