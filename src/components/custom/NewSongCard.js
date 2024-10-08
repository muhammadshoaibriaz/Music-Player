import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 4;
const ITEM_HEIGHT = ITEM_WIDTH * 1.3;
const SPACING = 14;
export default function NewSongCard({title, subtitle, data, navigation}) {
  // console.log(data);
  return (
    <View style={{paddingTop: 10}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.seeAll} onPress={() => {}}>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
          <Icon name="arrowright" color={colors.light_text} size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingLeft: 14,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          // console.log('new song data is ', item);
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.card}
              onPress={() => navigation.navigate('SongDetails', {item})}>
              <View style={styles.imageContainer}>
                <Image
                  // source={require('../../assets/images/hero-dynamic.jpg')}
                  source={{uri: item?.images[2]?.url}}
                  style={styles.cardImage}
                />
              </View>
              <LinearGradient
                style={styles.gradient}
                colors={['transparent', '#222']}>
                <View style={styles.details}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item?.name}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={2}>
                    {item?.artists[0]?.name}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    </View>
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
    fontSize: 10,
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
  },
  subtitle: {
    fontSize: 9,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: ITEM_HEIGHT,
    borderRadius: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: ITEM_WIDTH,
    marginRight: SPACING,
    overflow: 'hidden',
    borderRadius: 2,
    position: 'relative',
  },
  details: {
    marginTop: 6,
  },
  gradient: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    paddingLeft: 8,
    paddingBottom: 4,
    bottom: 0,
  },
});
