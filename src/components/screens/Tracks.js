import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Track} from '../custom/Track';
import {PlayingContext} from '../context/PlayingContext';
import {font} from '../constants/font';
import {colors} from '../constants/color';

export default function Tracks({route}) {
  const [tracks, setTracks] = useState([]);
  const {item} = route.params;
  const {id} = item?.album;
  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${id}/tracks`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setTracks(data?.items);
      // console.log('Tracks data is ', data?.items);
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
    <View style={{flex: 1, paddingTop: 10}}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.light_dark}
        animated={true}
        showHideTransition={'fade'}
      />
      <Text style={styles.tracks}>Tracks</Text>
      {tracks.length < 1 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={30}
            color={'chocolate'}
            style={{bottom: 30}}
          />
        </View>
      ) : (
        <FlatList
          data={tracks}
          contentContainerStyle={{paddingBottom: 60}}
          renderItem={({item, index}) => {
            // console.log('track items are ', item);
            return (
              <Track item={item} key={index} onPress={() => playSong(item)} />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tracks: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 14,
    marginVertical: 10,
    fontFamily: font.Montserrat_SemiBold,
  },
});
