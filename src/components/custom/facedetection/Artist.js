import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/color';
import {font} from '../../constants/font';
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = 50;
const SPACING = 14;

export const Artist = ({data, navigation}) => {
  console.log('Artist Data is', data);
  return (
    <View>
      <FlatList
        data={data}
        removeClippedSubviews={false}
        contentContainerStyle={{paddingHorizontal: 14, paddingBottom: 40}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          // console.log('Artist details are ', item?.id);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ArtistDetails', {item})}>
              <Image
                source={{uri: item?.images[0]?.url}}
                style={styles.cardImage}
              />

              <View style={styles.details}>
                <Text
                  style={[styles.title, {fontSize: 14, color: colors.light}]}>
                  {item?.name}{' '}
                </Text>
                <Text style={styles.title}>
                  {item?.type} Popularity · {item?.popularity}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 100,
  },
  card: {
    // width: '100%',
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginTop: 6,
    paddingLeft: 14,
    width: '80%',
  },
  artist: {
    marginTop: 20,
  },
  subtitle: {
    color: colors.light_text,
    textAlign: 'center',
  },
  title: {
    textTransform: 'capitalize',
    fontFamily: font.Montserrat_Medium,
    fontSize: 12,
    color: colors.light_text,
  },
});
