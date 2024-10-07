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
import {useContext, useRef} from 'react';
import {PlayingContext} from '../context/PlayingContext';

export const Song = ({item, onPress, onIconPress}) => {
  // console.log('song item data is ', item?.track?.artists);
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

  const {isPlaying, playingTitle, stopSong, resumeSong, sound} =
    useContext(PlayingContext);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[styles.songPlaylist, {transform: [{scale: scale}]}]}>
        <View style={styles.left}>
          <Image
            source={{uri: item?.track?.album?.images[0].url}}
            style={styles.iconImage}
          />
          <View style={styles.details}>
            <Text
              numberOfLines={2}
              style={[
                styles.songName,
                isPlaying && {
                  color:
                    item?.track?.name == playingTitle ? 'chocolate' : 'white',
                },
              ]}>
              {item?.track?.name}
            </Text>
            <Text numberOfLines={1} style={{marginTop: 4}}>
              {item?.track?.artists.map((item, index) => (
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
