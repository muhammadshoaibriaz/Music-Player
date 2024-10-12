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
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite} from '../reduxtolkit/slices/favoriteSlice';
import {addSongToPlaylist} from '../reduxtolkit/slices/playlistSlices';
import {Dialog} from 'react-native-elements';

export default function PlayList({route, navigation}) {
  const {item} = route.params;
  const id = item?.id;
  // console.log('Playlist data is ', item);
  // console.log('Playlist data is ', id);

  const bottomRef = useRef();
  const dispatch = useDispatch();
  const bottomRef1 = useRef();

  const [isFavorite, setIsFavorite] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [details, setDetails] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchTracks();
  }, []);

  // Playing Context API Callbacks
  const handlePlaySong = useCallback(
    item => {
      // console.log('song is ', item?.track);
      playTrack1(item?.track);
      // getRandomColor();
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
    currentTrack,
    setCurrentTrack,
  } = useContext(PlayingContext);
  // console.log('from playlist ', backgroundColor);

  // Fetching tracks from api
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
    outputRange: [1, 0.4],
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
    outputRange: ['transparent', '#111'],
    extrapolate: 'clamp',
  });

  // useEffect(() => {
  //   scrollY.addListener(value => {
  //     console.log('object', value);
  //   });
  // }, [scrollY]);

  // This is for BottomSheet
  const handleClick = item => {
    bottomRef1.current.open();
    setDetails(item);
  };

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

  const playlist = useSelector(state => state.playlist.playlists);
  // console.log('playlist', playlist);
  const handleAddSong = (playlistId, song) => {
    // const song = {
    //   id: new Date().toISOString(),
    //   name: 'I am not in love',
    // };
    if (playlistId) {
      dispatch(addSongToPlaylist({playlistId, song}));
      setVisible(false);
      ToastAndroid.show('Song added to playlist', 3000);
    }
  };

  // console.log('PlayList component render');
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={backgroundColor} translucent={false} />
      <Animated.View style={[styles.header, {backgroundColor: backgroundColo}]}>
        <IconBtn
          icon="arrow-back"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <Animated.Text
          numberOfLines={1}
          style={[styles.artistName, {fontSize: 16, opacity}]}>
          {item?.name?.slice(0, 34) + '...'}
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
              removeClippedSubviews={false}
              keyExtractor={(item, index) => index.toString()}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: false},
              )}
              contentContainerStyle={{paddingBottom: 120}}
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
                    onIconPress={() => handleClick(item?.track)}
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
      <Playing
        key={'playlist'}
        artist={artistName}
        imageUrl={playingImage}
        title={playingTitle}
        onPress={() => {
          bottomRef.current.open();
        }}
      />
      <BottomComponent bottomRef={bottomRef} item={items} />
      <BottomSheet
        ref={bottomRef1}
        closeOnPressBack={true}
        dragOnContent={true}
        draggable
        height={330}
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
                source={{uri: details?.album?.images[0]?.url}}
                style={styles.iconImage}
              />
              <View style={styles.details1}>
                <Text style={styles.bottomSheetHeaderText}>
                  {details?.name}
                </Text>
                <View style={styles.artistNames}>
                  {details?.album?.artists.map((item, index) => (
                    <Text key={index} style={styles.artists}>
                      {item?.name + ', '}
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
                bottomRef1.current.close();
                dispatch(addFavorite(details));
              }}
              icon={'heart-outline'}
              title={'Add To Favorite'}
              color={isFavorite ? 'chocolate' : 'white'}
            />
            <Button
              onPress={() => {
                bottomRef1.current.close();
                navigation.navigate('ArtistDetails', {details});
                console.log('item', details?.album?.artists[0]?.id);
              }}
              icon={'person-circle-outline'}
              title={'View Artist'}
              color={colors.light}
            />
            <Button
              onPress={() => {
                bottomRef1.current.close();
                setVisible(true);
              }}
              icon={'musical-notes-outline'}
              title={'Add to playlist'}
              color={colors.light}
            />
            <Button
              onPress={() => {
                bottomRef1.current.close();
              }}
              icon={'close-circle-outline'}
              title={'Cancel'}
              color={colors.light}
            />
          </View>
        </View>
      </BottomSheet>
      <Dialog
        visible={visible}
        animationType="fade"
        onBackdropPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}
        overlayStyle={{
          width: '95%',
          backgroundColor: '#222',
          height: '70%',
        }}
        removeClippedSubviews={false}>
        <View style={{width: '100%', height: '100%'}}>
          <Text style={styles.dialogTitle}>
            Choose playlist where you want to save this track.
          </Text>
          <View style={{height: '90%'}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}>
              {playlist?.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.playlist}
                  onPress={() => handleAddSong(item?.id, details)}
                  key={index}>
                  <View style={styles.icon}>
                    <Ionicons
                      name={'musical-notes'}
                      size={30}
                      color={colors.light}
                    />
                  </View>
                  <View style={{flex: 1, paddingLeft: 10}}>
                    <View>
                      <Text style={styles.playlistTitleName}>{item?.name}</Text>
                      <Text style={styles.authorName}>
                        {'Shabii'} · PlayList
                      </Text>
                    </View>
                    <Text style={styles.songs}>
                      {item?.songs?.length} songs
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_dark,
  },
  artistImage: {
    width: 300,
    height: 280,
    borderRadius: 2,
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
    flex: 1,
    overflow: 'hidden',
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
  },
  headerTitle: {
    fontSize: 20,
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
  },

  // Dialog styles
  icon: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 2,
  },
  playlist: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light,
  },
  playlistTitleName: {
    fontFamily: font.Montserrat_Medium,
    fontSize: 14,
    color: colors.light,
  },
  authorName: {
    color: colors.light_text,
    fontSize: 12,
    fontFamily: font.Montserrat_SemiBold,
    marginTop: 4,
  },
  songs: {
    color: colors.light_text,
    position: 'absolute',
    right: 14,
    fontFamily: font.Montserrat_Medium,
  },
  dialogTitle: {
    fontSize: 16,
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
    marginBottom: 10,
  },
});
