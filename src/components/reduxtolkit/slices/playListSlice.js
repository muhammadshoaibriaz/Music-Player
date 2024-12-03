import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  playList: [],
};
const playListSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addPlayList: (state, action) => {
      state.playList.push(action.payload);
      // console.log('state is', state);
    },
    removePlayList: (state, action) => {
      return state.filter(item => item.id !== action.payload?.id);
    },
  },
});

export const {addPlayList, removePlayList} = playListSlice.actions;
export default playListSlice;
