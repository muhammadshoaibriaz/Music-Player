import {configureStore} from '@reduxjs/toolkit';
import favoriteSlice from './slices/favoriteSlice';
import playListSlice from './slices/playListSlice';

const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    playlists: playListSlice,
  },
});

export default store;
