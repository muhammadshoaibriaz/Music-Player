import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {colors} from '../constants/color';
import {font} from '../constants/font';
import LinearGradient from 'react-native-linear-gradient';
import MAterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3;

export const SearchPlayListComponent = ({item, onPress}) => {
  // console.log('song item data is ', item);
  return (
    <Pressable onPress={onPress} style={styles.iconImage}>
      <View>
        <LinearGradient
          colors={['transparent', '#00000080']}
          style={[
            styles.image,
            {position: 'absolute', zIndex: 111},
          ]}></LinearGradient>
        <Image source={{uri: item?.images[0].url}} style={[styles.image]} />
      </View>
      <View style={styles.details}>
        <Text style={styles.albumName}>{item?.name}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {item?.description}
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
          }}>
          {item?.album?.artists.map((item, index) => (
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="folder-music" size={18} color={colors.light_text} />
            <Text style={[styles.description, {marginLeft: 4}]}>Playlist</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.total}>total {item?.tracks?.total}</Text>
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
};

const styles = StyleSheet.create({
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
  description: {
    fontFamily: font.Montserrat_Medium,
    fontSize: 12,
    color: colors.light_text,
  },
});
