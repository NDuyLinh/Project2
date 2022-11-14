import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: []
};

export const membersSlice = createSlice({
  name: 'membersSlice',
  initialState,
  reducers: {
    setMembers: (state, {payload}) => {
      state.members = payload;
    },
  }
});

export const { setMembers } = membersSlice.actions;

export default membersSlice.reducer;

