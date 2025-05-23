import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Track} from '../custom/Track';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchTracksFromAlbum} from '../../db/musicDb';
import {PlayingContext} from '../context/PlayingContext';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import * as Animatable from 'react-native-animatable';
import IconBtn from '../custom/IconBtn';

export default function ArtistTracks({route, navigation}) {
  const {item} = route.params;
  const {id} = item;
  // console.log('item', id);
  // console.log('item is', item?.id);
  useEffect(() => {
    fetchTracks();
  }, []);

  const [tracks, setTracks] = useState([]);
  const fetchTracks = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    try {
      const data = await fetchTracksFromAlbum(token, id);
      // console.log('Tracks data is this', data);
      setTracks(data?.items);
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
      <View style={styles.header}>
        <IconBtn
          size={24}
          icon={'arrow-back'}
          onPress={() => navigation.goBack()}
          color={colors.light}
        />
        <Text style={styles.tracks}>Tracks</Text>
      </View>
      <FlatList
        data={tracks}
        removeClippedSubviews={false}
        contentContainerStyle={{paddingBottom: 120}}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation={'fadeInRight'}
              delay={index * 100}
              duration={1000}>
              <Track item={item} key={index} onPress={() => playSong(item)} />
            </Animatable.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tracks: {
    fontSize: 20,
    color: colors.light,
    paddingLeft: 14,
    fontFamily: font.Montserrat_SemiBold,
    paddingVertical: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
