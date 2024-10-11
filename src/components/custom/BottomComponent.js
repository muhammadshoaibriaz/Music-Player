import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  Animated,
  Share,
} from 'react-native';
import React, {
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import BottomSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import IconBtn from './IconBtn';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import {PlayingContext} from '../context/PlayingContext';
import {useDispatch} from 'react-redux';
import {addFavorite, removeFavorite} from '../reduxtolkit/slices/favoriteSlice';
import SoundPlayer from 'react-native-sound-player';

const {width, height} = Dimensions.get('screen');
const DOT_SIZE = 12;

export default function BottomComponent({item, bottomRef}) {
  // Time calculation
  // const milliSeconds = item?.track?.duration_ms;
  // const totalSeconds = Math.floor(milliSeconds / 1000);
  // const minutes = Math.floor(totalSeconds / 60);
  // const seconds = totalSeconds % 60;

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

  const [favorite, setFavorite] = useState(false);

  const {
    backgroundColor,
    pauseSong,
    isPlaying,
    resumeSong,
    playNextTrack,
    playPreviousTrack,
    playingImage,
    playingTitle,
    artistName,
    playListName,
    playRandomSong,
    currentTrack,
    isPause,
    looping,
    toggleLoop,
    setBackgroundColor,
  } = useContext(PlayingContext);
  // console.log('backgroundColor is ', backgroundColor);

  // add to favorite songs
  const dispatch = useDispatch();
  const handleAddToFavorite = item => {
    dispatch(addFavorite(item));
    setFavorite(true);
    return;
    // console.log('favorite is ', item);
  };

  const handleRemoveFromFavorite = item => {
    dispatch(removeFavorite(item));
    setFavorite(false);
    return;
    // console.log('favorite is ', item);
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      var interval = setInterval(async () => {
        try {
          const info = await SoundPlayer.getInfo();
          setCurrentTime(info.currentTime);
          setDuration(info.duration);
        } catch (error) {
          console.error('Error tracking playback:', error);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  // console.log(currentTime);

  return (
    <BottomSheet
      closeOnPressBack={true}
      openDuration={500}
      height={height}
      dragOnContent={true}
      draggable={true}
      closeDuration={500}
      customStyles={{
        draggableIcon: {
          display: 'none',
        },
      }}
      ref={bottomRef}>
      <LinearGradient
        style={[{flex: 1, backgroundColor: backgroundColor}]}
        colors={['transparent', 'black']}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.sheetHeader}>
            <IconBtn
              icon={'chevron-down-outline'}
              size={26}
              color="#fff"
              onPress={() => bottomRef.current.close()}
            />
            <View style={styles.headerText}>
              <Text style={styles.playingFrom}>Playing from</Text>
              <Text style={styles.albumName}>{playListName}</Text>
            </View>
            <IconBtn icon={'ellipsis-vertical'} size={20} color="#fff" />
          </View>
          <Image source={{uri: playingImage}} style={styles.albumImage} />
          <View style={styles.bottomCard}>
            <View style={styles.playlist}>
              <Text numberOfLines={2} style={styles.title}>
                {playingTitle}
              </Text>
              <View style={styles.icons}>
                <IconBtn
                  color={colors.light}
                  icon={'share-outline'}
                  size={24}
                  onPress={() =>
                    Share.share({
                      message: playingTitle,
                      title: playingTitle,
                      url: 'https://api.spotify.com/v1/artists/6U5BSRuKoLbpIoYJMdmNT2/top-tracks',
                    })
                  }
                />
                <IconBtn
                  onPress={() =>
                    favorite
                      ? handleRemoveFromFavorite(currentTrack)
                      : handleAddToFavorite(currentTrack)
                  }
                  color={colors.light}
                  icon={favorite ? 'heart-sharp' : 'heart-outline'}
                  size={24}
                />
              </View>
            </View>
            <Text style={styles.artists}>{artistName}</Text>
            <View style={styles.progress}>
              <Animated.View
                style={[
                  styles.progressDot,
                  {width: `${(currentTime / duration) * 100}%`},
                ]}></Animated.View>
            </View>

            <View style={styles.timeProgress}>
              <Text style={styles.time}>
                00:{' '}
                {currentTime < 10
                  ? '0' + Math.round(currentTime)
                  : Math.round(currentTime)}
              </Text>
              <Text style={styles.time}>
                00:
                {Math.round(duration)}
              </Text>
            </View>
            <View style={styles.playerIcon}>
              <IconBtn
                onPress={playRandomSong}
                icon={'shuffle'}
                size={26}
                color={colors.light}
              />
              <IconBtn
                icon={'play-skip-back'}
                size={24}
                color={colors.light}
                onPress={() => {
                  playPreviousTrack();
                  getRandomColor();
                }}
              />
              <IconBtn
                icon={isPlaying && !isPause ? 'pause-circle' : 'play-circle'}
                onPress={isPause ? resumeSong : pauseSong}
                size={70}
                style={{
                  width: 70,
                  height: 70,
                }}
                color={colors.light}
              />
              <IconBtn
                icon={'play-skip-forward'}
                size={24}
                color={colors.light}
                onPress={() => {
                  playNextTrack();
                  getRandomColor();
                }}
              />

              <IconBtn
                icon={'repeat'}
                size={26}
                onPress={toggleLoop}
                color={looping ? 'chocolate' : colors.light}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetHeader: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  bottomCard: {
    marginTop: 40,
  },

  playlist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  playerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
    width: '70%',
  },
  artists: {
    fontSize: 12,
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    paddingHorizontal: 14,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumImage: {
    width: 300,
    zIndex: 1,
    height: 300,
    resizeMode: 'cover',
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 2,
  },
  playingFrom: {
    fontSize: 14,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  albumName: {
    color: colors.light,
    fontFamily: font.Montserrat_Regular,
    fontSize: 12,
    marginTop: 4,
  },
  artistsName: {
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
  progress: {
    width: width - 40,
    height: 2,
    backgroundColor: '#555',
    alignSelf: 'center',
    marginTop: 40,
    position: 'relative',
  },
  progressDot: {
    // width: DOT_SIZE,
    height: 2,
    borderRadius: DOT_SIZE,
    backgroundColor: colors.light,
    position: 'absolute',
    left: 0,
    // bottom: -DOT_SIZE / 2 + 2,
  },
  timeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  time: {
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
    fontSize: 12,
  },
});
