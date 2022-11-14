import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSmallLayout: window.innerWidth <= 767,
  toast: {
    toastType: '',
    content: '',
    autoDeleteTime: 3000
  }
};

export const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setSmallLayout: (state, {payload}) => {
      state.isSmallLayout = payload;
    },
    setToastType: (state, {payload}) => {
      state.toast.toastType = payload.type;
      state.toast.content = payload.content;
    },
    closeToastNotification: (state) => {
      state.toast.toastType = '';
      state.toast.content = '';
    }
  },
});

export const { setSmallLayout, setToastType, closeToastNotification } = globalSlice.actions;

export default globalSlice.reducer;