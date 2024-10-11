import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {font} from '../../constants/font';
import {colors} from '../../constants/color';
import {useCallback, useContext} from 'react';
import {PlayingContext} from '../../context/PlayingContext';
export const Tracks = ({data}) => {
  console.log('tracks data', data);
  const onPress = () => {};
  const {playTrack1} = useContext(PlayingContext);
  const handlePlaySong = useCallback(
    item => {
      // console.log('song is ', item?.track);
      playTrack1(item?.track);
      getRandomColor();
    },
    [playTrack1],
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 14}}
        removeClippedSubviews={false}
        renderItem={({item, index}) => {
          console.log('my data is is ', item);
          return (
            <Pressable onPress={onPress} style={styles.iconImage}>
              <View>
                <LinearGradient
                  colors={['transparent', '#00000080']}
                  style={[
                    styles.image,
                    {position: 'absolute', zIndex: 111},
                  ]}></LinearGradient>
                <Image
                  source={{uri: item?.album?.images[0]?.url}}
                  style={[styles.image]}
                />
              </View>
              <View style={styles.details}>
                <Text numberOfLines={2} style={styles.albumName}>
                  {item?.name}
                </Text>
                <Text numberOfLines={3} style={styles.artist}>
                  {item?.artists[0]?.name}
                </Text>
              </View>
            </Pressable>
            // <Text>faceData</Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconImage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 2,
  },
  albumName: {
    fontFamily: font.Montserrat_Medium,
    fontSize: 14,
    color: colors.light,
  },
  details: {
    paddingLeft: 12,
    width: '90%',
  },
  artist: {
    fontFamily: font.Montserrat_Medium,
    color: colors.light_text,
    fontSize: 12,
  },
});
