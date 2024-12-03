import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Track} from '../custom/Track';
import {PlayingContext} from '../context/PlayingContext';
import {Track1} from '../custom/Track1';
import {font} from '../constants/font';
import IconBtn from '../custom/IconBtn';
import {colors} from '../constants/color';

export default function BrowseTrack({route, navigation}) {
  const [tracks, setTracks] = useState([]);
  const {item} = route.params;
  const {id} = item;
  // console.log('object', id);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
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
      // console.log('track', track);
    } catch (error) {
      console.log('Error while playing song', error);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <IconBtn
          icon={'arrow-back'}
          size={20}
          color={colors.light}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.tracks}>Tracks</Text>
      </View>
      <FlatList
        data={tracks}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 70}}
        renderItem={({item, index}) => {
          // console.log('track items are ', item);
          return (
            <Track1
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
    fontSize: 16,
    fontFamily: font.Montserrat_SemiBold,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 6,
  },
});
