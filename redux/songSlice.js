import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  index: null,
  songs: [],
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.currentSong = action.payload.song;
      state.index = action.payload.index;
      state.songs = action.payload.playlist;
    },
    playNextSong: (state) => {
      if (state.index === state.songs.length - 1) {
        state.index = 0;
      } else {
        state.index += 1;
      }
      state.currentSong = state.songs[state.index];
    },
    playPrevSong: (state) => {
      if (state.index === 0) {
        state.index = 0;
      } else {
        state.index -= 1;
      }
      state.currentSong = state.songs[state.index];
    },
  },
});

export const { setSong, playNextSong, playPrevSong } = songSlice.actions;

export default songSlice.reducer;
