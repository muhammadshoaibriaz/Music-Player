import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {PlayingContext} from '../context/PlayingContext';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 4;
const ITEM_HEIGHT = ITEM_WIDTH * 1.3;
const SPACING = 14;

export default function AlbumCard({title, subtitle, data, bottomRef}) {
  // Random color generator function
  const getRandomColor = () => {
    const getComponent = () => Math.floor(Math.random() * 156);
    const r = getComponent();
    const g = getComponent();
    const b = getComponent();
    const bgColor = `rgb(${r}, ${g}, ${b})`;
    setBackgroundColor(bgColor);
    // console.log(bgColor);
  };

  const {playTrack1, setBackgroundColor} = useContext(PlayingContext);
  const handlePlayPause = useCallback(
    item => {
      playTrack1(item?.track);
      getRandomColor();
    },
    [playTrack1, setBackgroundColor],
  );
  // console.log('AllAlbum Component Render ');
  return (
    <View style={{marginTop: 10}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.seeAll}>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
          {/* <Icon name="arrowright" color={colors.light_text} size={20} /> */}
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingLeft: 14,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          // console.log(
          //   'recently played item data is ',
          //   item?.track?.album?.name,
          // );
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={styles.card}
              onPress={() => {
                handlePlayPause(item);
                bottomRef.current.open();
              }}>
              <View style={styles.imageContainer}>
                <Image
                  // source={require('../../assets/images/hero-dynamic.jpg')}
                  source={{uri: item?.track?.album?.images[0]?.url}}
                  style={styles.cardImage}
                />
              </View>
              <LinearGradient
                style={styles.gradient}
                colors={['transparent', '#222']}>
                <View style={styles.details}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item?.track?.album?.name}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={2}>
                    {item?.track?.album?.artists[0]?.name}
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
    fontSize: 8,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: ITEM_HEIGHT,
    borderRadius: 4,
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
    // borderRadius: 2,
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
