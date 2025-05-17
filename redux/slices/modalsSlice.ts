import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  modalId : string | null;
  props?: Record<string, unknown>;
};

const initialState: ModalState = { modalId: null };

const modalsSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalId: string;
        props?: Record<string, unknown>;
      }>
    ) => {
      state.modalId = action.payload.modalId;
      state.props = action.payload.props || {};
    },
    closeModal: (state) => {
      state.modalId = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
