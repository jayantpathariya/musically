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
      // Shuffle the songs array
      console.log(state.songs);
      for (let i = state.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.songs[i], state.songs[j]] = [state.songs[j], state.songs[i]];
      }
    },
    repeatSong: (state) => {
      state.songs = state.songs;
    },
  },
});

export const { setSong, playNextSong, playPrevSong, shuffleSongs, repeatSong } =
  songSlice.actions;

export default songSlice.reducer;
