import {View, Text, FlatList, Image, Animated, Pressable} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import IconBtn from '../custom/IconBtn';
import {colors} from '../constants/color';
import {StyleSheet} from 'react-native';
import {font} from '../constants/font';
import {PlayingContext} from '../context/PlayingContext';

export default function PlayListSongs({route, navigation}) {
  const {item} = route?.params;
  // console.log(item?.songs);
  const scale = useRef(new Animated.Value(1)).current;
  const {isPlaying, playingTitle} = useContext(PlayingContext);
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <IconBtn
          icon={'arrow-back'}
          size={20}
          color={colors.light}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>{item?.name}</Text>
      </View>
      <FlatList
        data={item?.songs}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          console.log(item);
          return (
            <Pressable
              onPress={() => {}}
              onPressIn={onPressIn}
              onPressOut={onPressOut}>
              <Animated.View
                style={[styles.songPlaylist, {transform: [{scale: scale}]}]}>
                <View style={styles.left}>
                  <Image
                    source={{uri: item?.album?.images[0].url}}
                    style={styles.iconImage}
                  />
                  <View style={styles.details}>
                    <Text
                      numberOfLines={2}
                      style={[
                        styles.songName,
                        // isPlaying && {
                        //   color:
                        //     item?.name === playingTitle ? 'chocolate' : 'white',
                        // },
                      ]}>
                      {item?.name}
                    </Text>
                    <Text numberOfLines={1} style={{marginTop: 4}}>
                      {item?.artists.map((item, index) => (
                        <Text
                          numberOfLines={1}
                          style={styles.songDescription}
                          key={index}>
                          {item?.name + ', '}
                        </Text>
                      ))}
                    </Text>
                  </View>
                </View>
                <IconBtn
                  icon={'ellipsis-vertical'}
                  color={colors.light}
                  size={20}
                  onPress={() => {}}
                />
              </Animated.View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  headerTitle: {
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },

  // song view
  songPlaylist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    width: '100%',
    paddingLeft: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 2,
  },
  songName: {
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
    fontSize: 13,
  },
  songDescription: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Regular,
    fontSize: 12,
    marginTop: 6,
  },
  details: {
    flex: 1,
    paddingLeft: 12,
  },
});
