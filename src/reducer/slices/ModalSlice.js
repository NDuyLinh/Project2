import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  selectionCourse: ''
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state, {payload}) => {
      state.isOpen = true;
      state.selectionCourse = payload
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectionCourse = '';
    }
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;