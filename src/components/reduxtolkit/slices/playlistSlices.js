import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
};

const playlistSlices = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      const newPlaylist = {
        id: new Date().toISOString(),
        name: action.payload.name,
        description: action.payload.description,
        songs: [],
      };
      state.playlists.push(newPlaylist);
    },
    addSongToPlaylist: (state, action) => {
      const {playlistId, song} = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.songs.push(song);
      }
    },
  },
});

export const {createPlaylist, addSongToPlaylist} = playlistSlices.actions;
export default playlistSlices.reducer;
