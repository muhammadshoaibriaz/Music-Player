import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  playlists: [],
};

const createPlaylistSlice = createSlice({
  name: 'createPlaylist',
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

export const {createPlaylist, addSongToPlaylist} = createPlaylistSlice.actions;
export default createPlaylistSlice;
