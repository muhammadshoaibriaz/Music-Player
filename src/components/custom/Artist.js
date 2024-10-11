import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import {font} from '../constants/font';
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 4;
const SPACING = 14;

export default function Artist({data, navigation}) {
  if (!data) {
    return <ActivityIndicator size={30} />;
  }
  return (
    <FlatList
      data={data}
      horizontal
      removeClippedSubviews={false}
      contentContainerStyle={{
        paddingLeft: 14,
      }}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        // console.log('Artist details are ', item?.id);
        return (
          <TouchableOpacity
            style={styles.card}
            key={index}
            onPress={() => navigation.navigate('ArtistDetails')}>
            <Image
              source={{uri: item?.images[0]?.url}}
              style={styles.cardImage}
            />

            <View style={styles.details}>
              <Text style={styles.title}>{item?.name} </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  headerSubtitle: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
  },
  title: {
    fontSize: 12,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
    textAlign: 'center',
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 100,
  },
  card: {
    width: ITEM_WIDTH,
    marginRight: SPACING,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    marginTop: 6,
    width: '100%',
  },
  artist: {
    marginTop: 20,
  },
  subtitle: {
    color: colors.light_text,
    textAlign: 'center',
  },
});
