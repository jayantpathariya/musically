import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  song: {},
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.song = action.payload;
    },
  },
});

export const { setSong } = songSlice.actions;

export default songSlice.reducer;
