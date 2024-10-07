import {
  View,
  Text,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Image,
  StatusBar,
  Alert,
  ToastAndroid,
  PanResponder,
} from 'react-native';

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import IconBtn from '../custom/IconBtn';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import {Song} from '../custom/Song';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Playing from '../custom/Playing';
import {PlayingContext} from '../context/PlayingContext';
import BottomComponent from '../custom/BottomComponent';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Button from '../custom/Button';

export default function FavPlayList({route, navigation}) {
  const {item} = route.params;
  const id = item?.id;
  // console.log('Playlist data is ', item);
  // console.log('Playlist data is ', id);

  // Random color generator function
  const getRandomColor = () => {
    const getComponent = () => Math.floor(Math.random() * 156);
    const r = getComponent();
    const g = getComponent();
    const b = getComponent();
    const bgColor = `rgb(${r}, ${g}, ${b})`;
    setBackgroundColor(bgColor);
    // console.log('bgColor', bgColor);
  };

  // Playing Context API Callbacks
  const handlePlaySong = useCallback(
    item => {
      // console.log('song is ', item?.track);
      playTrack1(item?.track);
      getRandomColor();
    },
    [playTrack1],
  );

  const {
    playingTitle,
    artistName,
    playingImage,
    items,
    playTrack1,
    isPlaying,
    setBackgroundColor,
    backgroundColor,
    setItems,
    setTrack,
    setCurrentTrackIndex,
  } = useContext(PlayingContext);
  // console.log('from playlist ', backgroundColor);

  // Fetching tracks from api
  useEffect(() => {
    fetchTracks();
  }, []);

  const [tracks, setTracks] = useState([]);
  const fetchTracks = async () => {
    const token = await AsyncStorage.getItem('token');
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
    // console.log(data?.items);

    // sending all tracks to Playing Context
    setTrack(data?.items);
    // console.log('track data is ', track);
  };

  // This is for flatlist scroll
  const scrollY = useRef(new Animated.Value(0)).current;

  const scale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });
  const blur = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const backgroundColo = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: ['transparent', '#00000060'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    scrollY.addListener(value => {
      console.log('object', value);
    });
  }, [scrollY]);

  // This is for BottomSheet
  const bottomRef1 = useRef();
  const [details, setDetails] = useState(null);
  const handleClick = item => {
    bottomRef1.current.open();
    setDetails(item);
  };

  const bottomRef = useRef();
  // monospace, 'courier', Menlo, Monaco

  // Danger Zone ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
  const [scrollViewHeight, setHeight] = useState(1);
  const [mainHeight, setMainHeight] = useState(1);
  let panValue = {x: 0, y: 0};
  const pan = useRef(new Animated.ValueXY(panValue)).current;
  useEffect(() => {
    pan.addListener(value => {
      panValue = value;
    });
  }, []);
  const scrolling = Animated.diffClamp(
    pan.y,
    scrollViewHeight / 0 ? -scrollViewHeight + mainHeight : 1,
    0,
  );
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({x: panValue.x, y: panValue.y});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        pan.flattenOffset();
        Animated.decay(pan, {
          velocity: {x: 0, y: g.vy},
          deceleration: 0.99999,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;
  // Danger Zone ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

  // console.log('top', top);
  // console.log('PlayList component render');
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#00000060'} translucent={true} />
      <Animated.View style={[styles.header, {backgroundColor: backgroundColo}]}>
        <IconBtn
          icon="arrow-back"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Animated.Text
          numberOfLines={2}
          style={[styles.artistName, {fontSize: 16, opacity}]}>
          {item?.name}
        </Animated.Text>
      </Animated.View>
      <View style={{flex: 1}}>
        {tracks && tracks?.length < 1 ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size={40} color={'chocolate'} />
          </View>
        ) : (
          <View style={styles.container}>
            <Animated.FlatList
              ref={scrollY}
              data={tracks}
              keyExtractor={(item, index) => index.toString()}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: false},
              )}
              contentContainerStyle={{
                paddingBottom: 120,
                backgroundColor: colors.light_dark,
              }}
              ListHeaderComponent={
                <Animated.View style={[styles.imageWrapper, {backgroundColor}]}>
                  <LinearGradient
                    style={[
                      styles.imageWrapper,
                      {position: 'absolute', zIndex: 1},
                    ]}
                    colors={[
                      'transparent',
                      colors.light_dark,
                    ]}></LinearGradient>
                  <Animated.Image
                    blurRadius={blur}
                    source={{uri: item?.images[0]?.url}}
                    style={[styles.artistImage, {transform: [{scale}]}]}
                    sharedElementId="sharedImage"
                  />
                  <View style={[styles.details]}>
                    <Animated.Text
                      numberOfLines={2}
                      style={[styles.artistName]}>
                      {item?.name}
                    </Animated.Text>
                    <Animated.Text
                      numberOfLines={2}
                      style={[styles.description]}>
                      {item?.description}
                    </Animated.Text>
                    <Animated.Text
                      numberOfLines={2}
                      style={[styles.description]}>
                      Songs: {tracks && tracks.length}
                    </Animated.Text>
                    <Animated.Text style={[styles.playing]}>
                      Playing
                    </Animated.Text>
                  </View>
                </Animated.View>
              }
              renderItem={({item, index}) => {
                // console.log(item?.track?.preview_url);
                return (
                  <Song
                    item={item}
                    key={index}
                    onIconPress={() => handleClick(item)}
                    onPress={() => {
                      handlePlaySong(item);
                      setCurrentTrackIndex(index);
                      setItems(item);
                    }}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
      {isPlaying && (
        <Playing
          key={'playlist'}
          artist={artistName}
          imageUrl={playingImage}
          title={playingTitle}
          onPress={() => {
            bottomRef.current.open();
          }}
        />
      )}
      <BottomComponent bottomRef={bottomRef} item={items} />
      <BottomSheet
        ref={bottomRef1}
        closeOnPressBack={true}
        dragOnContent={true}
        draggable
        height={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            backgroundColor: '#222',
          },
        }}
        closeOnPressMask={true}>
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHeader}>
            <View style={styles.left}>
              <Image
                source={{uri: details?.track?.album?.images[0]?.url}}
                style={styles.iconImage}
              />
              <View style={styles.details1}>
                <Text style={styles.bottomSheetHeaderText}>
                  {details?.track?.name}
                </Text>
                <View style={styles.artistNames}>
                  {details?.track?.album?.artists.map((item, index) => (
                    <Text key={index} style={styles.artists}>
                      {item?.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <IconBtn icon={'ellipsis-vertical'} size={20} color="white" />
          </View>
          <View style={{marginTop: 10}}>
            <Button
              onPress={() => {
                ToastAndroid.show('You can add songs to favorites list ');
              }}
              icon={'heart-outline'}
              title={'Add To Favorite'}
            />
            <Button
              onPress={() => bottomRef1.current.close()}
              icon={'person-circle-outline'}
              title={'View Artist'}
            />
            <Button
              onPress={() => bottomRef1.current.close()}
              icon={'close-circle-outline'}
              title={'Cancel'}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artistImage: {
    width: '100%',
    height: '100%',
    // width: 300,
    // height: 250,
    // borderRadius: 2,
  },
  imageWrapper: {
    width: '100%',
    position: 'relative',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
    backgroundColor: colors.light_dark,
  },
  playing: {
    fontSize: 16,
    fontFamily: font.Montserrat_Bold,
    color: colors.light,
    zIndex: 11,
    marginTop: 8,
  },
  songPlaylist: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    width: '100%',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    marginBottom: 6,
  },
  songName: {
    color: colors.light,
    fontSize: 16,
    fontFamily: font.Montserrat_Medium,
  },
  songDescription: {
    color: colors.light_text,
    fontSize: 12,
    marginTop: 4,
    fontFamily: font.Montserrat_Regular,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 2,
    resizeMode: 'cover',
  },
  details: {
    position: 'absolute',
    paddingHorizontal: 14,
    zIndex: 111,
    bottom: 20,
    width: '100%',
  },
  details1: {
    paddingLeft: 12,
    flex: 1,
  },

  bottomSheet: {
    width: '100%',
    paddingHorizontal: 14,
  },
  bottomSheetHeader: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  bottomSheetHeaderText: {
    fontSize: 18,
    fontFamily: font.Montserrat_SemiBold,
    color: colors.light,
  },
  artistNames: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artists: {
    fontFamily: font.Montserrat_Medium,
    color: colors.light_text,
    fontSize: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    position: 'absolute',
    zIndex: 11,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    top: 32,
  },
  headerTitle: {
    fontSize: 20,
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
  },
});
