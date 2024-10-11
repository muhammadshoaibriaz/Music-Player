import {configureStore} from '@reduxjs/toolkit';
import favoriteSlice from './slices/favoriteSlice';
import playListSlice from './slices/playListSlice';
import playlistSlices from './slices/playlistSlices';

const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    playlists: playListSlice,
    playlist: playlistSlices,
  },
});

export default store;
