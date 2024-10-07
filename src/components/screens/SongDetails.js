import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Playing from '../custom/Playing';
import {PlayingContext} from '../context/PlayingContext';
import IconBtn from '../custom/IconBtn';
import Entypo from 'react-native-vector-icons/Entypo';
import MAterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3;

export default function SongDetails({route, navigation}) {
  const {item} = route.params;
  const id = item?.artists[0]?.id;
  console.log('song details are ', item);
  // console.log('artist id is ', id);

  useEffect(() => {
    fetchTracks();
  }, []);

  const [tracks, setTracks] = useState([]);
  const fetchTracks = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    // console.log('data is', data);
    setTracks(data?.items);
  };

  const {playingTitle, artistName, playingImage, backgroundColor} =
    useContext(PlayingContext);
  console.log('SongDetails component render');
  const scrollY = useRef(new Animated.Value(0)).current;
  const scale = scrollY.interpolate({
    inputRange: [0, 350],
    outputRange: [1, 0],
  });
  return (
    <View style={{flex: 1}}>
      <IconBtn
        icon="arrow-back"
        size={20}
        color="white"
        style={{position: 'absolute', zIndex: 11, top: 40}}
        onPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        {tracks?.length < 1 ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              style={{bottom: 40}}
              size={30}
              color={'chocolate'}
            />
          </View>
        ) : (
          <FlatList
            data={tracks}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}
            ListHeaderComponent={
              <View
                style={[
                  styles.imageWrapper,
                  {backgroundColor: backgroundColor},
                ]}>
                <LinearGradient
                  style={[
                    styles.imageWrapper,
                    {position: 'absolute', zIndex: 1},
                  ]}
                  colors={['transparent', colors.light_dark]}></LinearGradient>

                <Animated.Image
                  source={{uri: item?.images[0]?.url}}
                  style={[styles.artistImage, {transform: [{scale: scale}]}]}
                />

                <View
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    paddingHorizontal: 14,
                    width: '100%',
                  }}>
                  <Text numberOfLines={2} style={styles.artistName}>
                    {item?.name}
                  </Text>
                  <View style={styles.artist}>
                    {item?.artists?.map((item, index) => (
                      <Text
                        numberOfLines={2}
                        style={styles.description}
                        key={index}>
                        {item?.name}
                        {', '}
                      </Text>
                    ))}
                  </View>
                  <Text
                    style={{
                      color: colors.light_text,
                      zIndex: 11,
                      fontFamily: font.Montserrat_Medium,
                      marginTop: 4,
                    }}>
                    Total tracks: {item?.total_tracks}
                  </Text>
                </View>
              </View>
            }
            renderItem={({item, index}) => {
              // console.log('item albums are ', item);
              return (
                <Pressable
                  key={index}
                  style={styles.iconImage}
                  onPress={() => navigation.navigate('NewSongTracks', {item})}>
                  <View>
                    <LinearGradient
                      colors={['transparent', '#00000080']}
                      style={[
                        styles.image,
                        {position: 'absolute', zIndex: 111},
                      ]}></LinearGradient>
                    <Image
                      source={{uri: item?.images[0].url}}
                      style={[styles.image]}
                    />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.albumName}>{item?.name}</Text>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4,
                      }}>
                      {item?.artists?.map((item, index) => (
                        <Text style={styles.artists} key={index}>
                          {item?.name + ', '}
                        </Text>
                      ))}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo
                          name="folder-music"
                          size={18}
                          color={colors.light_text}
                        />
                        <Text style={styles.albumType}>{item?.album_type}</Text>
                      </View>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.total}>
                          total {item?.total_tracks}
                        </Text>
                        <MAterialCommunityIcons
                          name="playlist-music"
                          size={18}
                          color={colors.light_text}
                        />
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      </View>
      {tracks?.length > 0 && (
        <Playing
          title={playingTitle}
          artist={artistName}
          imageUrl={playingImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artistImage: {
    width: 300,
    height: 260,
    borderRadius: 2,
  },
  imageWrapper: {
    width: '100%',
    height: 450,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artistName: {
    fontSize: 34,
    fontFamily: font.Montserrat_Bold,
    color: colors.light,
    zIndex: 11,
    width: '100%',
  },
  description: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light_text,
    zIndex: 1,
  },
  playList: {
    paddingHorizontal: 14,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genres: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 11,
  },
  genre: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Regular,
    // textTransform: 'capitalize',
    fontSize: 10,
  },

  // new styles for card
  iconImage: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 2,
  },
  albumName: {
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
    fontSize: 16,
  },
  songDescription: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    fontSize: 12,
    marginTop: 4,
  },
  details: {
    paddingLeft: 12,
    flex: 1,
  },
  artists: {
    color: colors.light_text,
    fontSize: 12,
    fontFamily: font.Montserrat_Medium,
  },
  total: {
    color: colors.light_text,
    fontSize: 12,
    fontFamily: font.Montserrat_Medium,
    marginRight: 6,
  },
  albumType: {
    fontSize: 12,
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    textTransform: 'capitalize',
    marginTop: 2,
    marginLeft: 6,
  },
  artist: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
