import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MAterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../constants/color';
import {font} from '../../constants/font';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3;

export const Albums = ({data, navigation}) => {
  console.log('album data is ', data);
  // const {items} = data;
  // console.log();
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        renderItem={({item, index}) => {
          console.log('my data is is ', item);
          return (
            <Pressable
              onPress={() => navigation.navigate('SongDetails', {item})}
              style={styles.iconImage}>
              <View>
                <LinearGradient
                  colors={['transparent', '#00000080']}
                  style={[
                    styles.image,
                    {position: 'absolute', zIndex: 111},
                  ]}></LinearGradient>
                <Image
                  source={{uri: item?.images[0]?.url}}
                  style={[styles.image]}
                />
              </View>
              <View style={styles.details}>
                <Text numberOfLines={3} style={styles.albumName}>
                  {item?.name}
                </Text>
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
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Entypo
                      name="folder-music"
                      size={18}
                      color={colors.light_text}
                    />
                    <Text style={styles.albumType}>{item?.album_type}</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.total}>total {item?.total_tracks}</Text>
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
    </View>
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
  albumName: {
    fontSize: 14,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
});
