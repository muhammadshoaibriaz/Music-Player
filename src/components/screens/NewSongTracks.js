import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Track} from '../custom/Track';
import {PlayingContext} from '../context/PlayingContext';
import {font} from '../constants/font';
import {colors} from '../constants/color';

export default function NewSongTracks({route}) {
  const [tracks, setTracks] = useState([]);
  const {item} = route.params;
  const {id} = item;
  // console.log(id);
  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    try {
      const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTracks(data?.tracks?.items);
      // console.log('Tracks data is ', data?.tracks?.items);
    } catch (error) {
      console.error('Error while fetching tracks', error);
    }
  };

  const {playArtistSong} = useContext(PlayingContext);

  const playSong = useCallback(track => {
    try {
      playArtistSong(track);
      console.log('track', track);
    } catch (error) {
      console.log('Error while playing song', error);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={false} backgroundColor={colors.light_dark} />
      <Text style={styles.tracks}>Tracks</Text>
      <FlatList
        data={tracks}
        contentContainerStyle={{paddingBottom: 60}}
        renderItem={({item, index}) => {
          // console.log('track items are ', item);
          return (
            <Track
              item={item}
              key={index}
              onPress={() => playSong(item)}
              // onIconPress={() => handleBottomSheet(item)}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tracks: {
    color: 'white',
    fontSize: 24,
    marginLeft: 14,
    fontFamily: font.Montserrat_SemiBold,
    marginVertical: 10,
  },
});
