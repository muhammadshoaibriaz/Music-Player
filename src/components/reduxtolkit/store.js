import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import favoriteSlice from './slices/favoriteSlice';
import playListSlice from './slices/playListSlice';
import playlistSlices from './slices/playlistSlices';
import createPlaylistSlice from './slices/playlistSlices';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  favorite: favoriteSlice.reducer,
  playlist: playListSlice.reducer,
  createPlaylist: createPlaylistSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
