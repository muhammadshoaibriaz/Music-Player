import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PlayingContext} from '../context/PlayingContext';
import {font} from '../constants/font';
import {colors} from '../constants/color';
import {FavoriteSong} from '../custom/FavoriteSong';
import Icon from 'react-native-vector-icons/AntDesign';
import {removeFavorite} from '../reduxtolkit/slices/favoriteSlice';
import LinearGradient from 'react-native-linear-gradient';
import {removePlayList} from '../reduxtolkit/slices/playListSlice';
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3;
const ITEM_HEIGHT = ITEM_WIDTH * 1.3;

const FavoriteSongs = () => {
  const favoriteSongs = useSelector(state => state.favorite);
  const dispatch = useDispatch();
  console.log(favoriteSongs);

  // ContextAPI
  const {playTrack1} = useContext(PlayingContext);
  const playSong = async item => {
    playTrack1(item);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={favoriteSongs}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          // console.log('object', item?.id);
          return (
            <FavoriteSong
              onPress={() => playSong(item)}
              onIconPress={() => dispatch(removeFavorite(item))}
              item={item}
              key={index}
            />
          );
        }}
      />
    </View>
  );
};

const FavoritePlayLists = ({navigation}) => {
  const playlistData = useSelector(state => state.playlist.playList);
  // console.log('playlistData is ', playlistData);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={playlistData}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingBottom: 60,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          // console.log('item recommended ', item);
          return (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onLongPress={() => dispatch(removePlayList(item))}
              onPress={() => {
                navigation.navigate('FavPlayList', {item});
              }}>
              <View style={styles.imageCard}>
                <Image
                  source={{uri: item?.images[0]?.url}}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
                <LinearGradient
                  style={styles.playlist}
                  colors={['transparent', colors.dark]}>
                  <Text style={styles.tracks}>
                    Tracks {item?.tracks?.total}
                  </Text>
                </LinearGradient>
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{item?.name} </Text>
                <Text numberOfLines={2} style={styles.subtitle}>
                  {item?.description}
                </Text>
                <Text style={{marginTop: 6}}>
                  {item?.type === 'playlist' ? (
                    <View style={styles.playlistStyle}>
                      <Icon name="folder1" color={colors.light_text} />
                      <Text
                        style={[
                          styles.listen,
                          {
                            textTransform: 'capitalize',
                            marginTop: 0,
                            marginLeft: 6,
                          },
                        ]}>
                        {item?.type}
                      </Text>
                    </View>
                  ) : (
                    ''
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default function Favorite({navigation}) {
  // handle component rendering
  const [value, setValue] = useState(0);
  // console.log(value);
  const renderComponent = () => {
    if (value === 0) {
      return <FavoriteSongs />;
    }
    return <FavoritePlayLists navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={colors.light_dark} />
      <View style={styles.header}>
        <Text style={styles.favorite}>Favorites</Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.touchableBtn}
          onPress={() => setValue(0)}>
          <Text
            style={[
              styles.btnText,
              {color: value === 0 ? 'chocolate' : colors.light_text},
            ]}>
            Songs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableBtn}
          onPress={() => setValue(1)}>
          <Text
            style={[
              styles.btnText,
              {color: value === 1 ? 'chocolate' : colors.light_text},
            ]}>
            Playlist
          </Text>
        </TouchableOpacity>
      </View>
      {renderComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_dark,
    paddingTop: 10,
  },
  header: {paddingHorizontal: 14, marginBottom: 10},
  favorite: {
    fontSize: 24,
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
  },
  imageContainer: {
    height: ITEM_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  card: {
    marginVertical: 6,
    flexDirection: 'row',
  },
  details: {
    width: '80%',
    paddingLeft: 12,
  },
  listen: {
    fontSize: 10,
    color: colors.light_text,
    marginTop: 6,
    fontFamily: font.Montserrat_Medium,
  },
  imageCard: {
    position: 'relative',
  },
  playlist: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 4,
    width: '100%',
    paddingVertical: 6,
  },
  playlistStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tracks: {
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
    fontSize: 12,
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
    fontSize: 16,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  subtitle: {
    fontSize: 12,
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    marginTop: 4,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  touchableBtn: {
    paddingHorizontal: 24,
    backgroundColor: '#222',
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 50,
  },
  btnText: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    fontSize: 12,
  },
});
