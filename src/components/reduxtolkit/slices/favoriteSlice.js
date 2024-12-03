import {createSlice} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
const initialState = [];
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find(item => item.id === action.payload.id)) {
        state.push(action.payload);
        ToastAndroid.show('Added to favorite!', 3000);
      } else {
        ToastAndroid.show('Song already added!', 3000);
      }
    },
    removeFavorite: (state, action) => {
      ToastAndroid.show('Remove from favorite!', 3000);
      return state.filter(item => item.id !== action.payload?.id);
    },
  },
});

export const {addFavorite, removeFavorite} = favoriteSlice.actions;
export default favoriteSlice;
