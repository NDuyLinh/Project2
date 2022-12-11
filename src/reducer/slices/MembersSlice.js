import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  token: null,
  email: null,
};

export const membersSlice = createSlice({
  name: 'membersSlice',
  initialState,
  reducers: {
    setMembers: (state, {payload}) => {
      state.loggedIn = true;
      state.token = payload.token;
      state.email = payload.email;
      localStorage.setItem("_u", window.btoa(JSON.stringify(payload)));
    },
  }
});

export const { setMembers } = membersSlice.actions;

export default membersSlice.reducer;

