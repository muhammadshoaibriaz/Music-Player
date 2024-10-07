import {
  Dimensions,
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
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MAterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3;
export const GenresTrack = ({item, navigation, onPress}) => {
  // console.log('genres item are ', item);

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
          source={{uri: item?.album?.images[0].url}}
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
            <Text style={styles.albumType}>{item?.album?.album_type}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.total}>total {item?.album?.total_tracks}</Text>
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
});
