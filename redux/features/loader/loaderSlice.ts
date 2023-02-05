import { createSlice } from '@reduxjs/toolkit'

export interface LoaderState {
  show: boolean
}

const initialState: LoaderState = {
  show: false,
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    show: (state) => {
      state.show = true
    },
    hide: (state) => {
      state.show = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { show, hide } = loaderSlice.actions

export default loaderSlice.reducer