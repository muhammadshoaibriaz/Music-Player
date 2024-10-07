import {
  View,
  Text,
  StyleSheet,
  Animated,
  ToastAndroid,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native-animatable';
import IconBtn from './IconBtn';
import {font} from '../constants/font';
import {colors} from '../constants/color';
import {PlayingContext} from '../context/PlayingContext';
import {useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {addFavorite} from '../reduxtolkit/slices/favoriteSlice';

export default function Playing({artist, title, imageUrl, onPress, style}) {
  const {
    isPlaying,
    pauseSong,
    resumeSong,
    currentTrack,
    backgroundColor,
    isPause,
  } = useContext(PlayingContext);
  const dispatch = useDispatch();
  // console.log('background color from playing', backgroundColor);

  return (
    <Pressable onPress={onPress}>
      <Animatable.View
        style={[styles.container, {backgroundColor: backgroundColor}]}
        animation={'slideInUp'}>
        <View style={styles.album}>
          <Image
            source={{
              uri: !imageUrl
                ? 'https://cdn-icons-png.flaticon.com/128/9452/9452828.png'
                : imageUrl,
            }}
            style={styles.ablumImage}
          />
          <View style={styles.songDetails}>
            <Animated.Text numberOfLines={1} style={[styles.songName]}>
              {title || 'Item name which is playing'}
            </Animated.Text>
            <Text numberOfLines={1} style={styles.artistName}>
              {artist || 'Artist Name'}
            </Text>
          </View>
        </View>
        <View style={styles.actionBtn}>
          <IconBtn
            icon={'add-circle-outline'}
            color={'#fff'}
            size={28}
            onPress={() => {
              dispatch(addFavorite(currentTrack));
            }}
          />
          {isPlaying && (
            <IconBtn
              icon={isPause ? 'play-sharp' : 'pause-outline'}
              color={'#fff'}
              size={20}
              onPress={isPause ? resumeSong : pauseSong}
            />
          )}
        </View>
      </Animatable.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingLeft: 6,
    paddingVertical: 4,
    position: 'absolute',
    bottom: 60,
    overflow: 'hidden',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  ablumImage: {
    width: 45,
    height: 45,
    borderRadius: 2,
    resizeMode: 'cover',
  },
  album: {
    flexDirection: 'row',
    width: '70%',
    overflow: 'hidden',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songDetails: {
    marginLeft: 12,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
  },
  songName: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    fontSize: 14,
  },
  artistName: {
    fontFamily: font.Montserrat_Regular,
    color: '#f1f1f1',
    fontSize: 12,
  },
});
