import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showToast : false,
};

const toastSlice = createSlice({
  name: 'Toast',
  initialState,
  reducers: {
    setToast : (state)=>{
      state.showToast = !state.showToast
    }
  },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;