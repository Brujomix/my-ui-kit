import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen : false,
};

const modalsSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setModalOpen : (state)=>{
      state.isModalOpen = !state.isModalOpen
    }
  },
});

export const { setModalOpen } = modalsSlice.actions;
export default modalsSlice.reducer;
