import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconBtn from './IconBtn';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import {useCallback, useContext, useRef} from 'react';
import {PlayingContext} from '../context/PlayingContext';

export const Track = ({item, onPress, onIconPress}) => {
  // console.log('track item data is ', item);
  // item?.track?.artists.map(item => console.log(item?.name));

  const scale = useRef(new Animated.Value(1)).current;
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

  const {isPlaying, playingTitle, stopSong, resumeSong} =
    useContext(PlayingContext);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[styles.songPlaylist, {transform: [{scale: scale}]}]}>
        <View style={styles.left}>
          <IconBtn
            icon={'musical-notes'}
            size={20}
            color={'white'}
            onPress={isPlaying ? stopSong : resumeSong}
            style={{backgroundColor: '#222'}}
          />
          <View style={styles.details}>
            <Text
              style={[
                styles.songName,
                isPlaying && {
                  color:
                    item?.track?.name == playingTitle ? 'chocolate' : 'white',
                },
              ]}>
              {item?.name}
            </Text>
            <Text numberOfLines={1} style={{marginTop: 4}}>
              {item?.artists?.map((item, index) => (
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
          onPress={onIconPress}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  songPlaylist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 14,
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
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
