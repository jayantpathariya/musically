import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  index: null,
  songs: [],
  playlistName: "",
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.currentSong = action.payload.song;
      state.index = action.payload.index;
      state.songs = action.payload.playlist;
      state.playlistName = action.payload.playlistName;
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
    shuffleSongs: (state) => {
      state.songs = state.songs.sort(() => Math.random() - 0.5);
    },
    repeatSong: (state) => {
      state.songs = state.songs;
    },
  },
});

export const { setSong, playNextSong, playPrevSong } = songSlice.actions;

export default songSlice.reducer;
