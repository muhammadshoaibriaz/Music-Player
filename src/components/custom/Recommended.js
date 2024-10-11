import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {memo, useContext} from 'react';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {PlayingContext} from '../context/PlayingContext';
import {useDispatch} from 'react-redux';
import {addPlayList} from '../reduxtolkit/slices/playListSlice';
const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3;
const ITEM_HEIGHT = ITEM_WIDTH * 1.3;

export const Recommended = memo(({title, data, navigation}) => {
  const dispatch = useDispatch();
  const {setPlayListName, setBackgroundColor} = useContext(PlayingContext);
  const getRandomColor = () => {
    const getComponent = () => Math.floor(Math.random() * 156);
    const r = getComponent();
    const g = getComponent();
    const b = getComponent();
    const bgColor = `rgb(${r}, ${g}, ${b})`;
    setBackgroundColor(bgColor);
    // console.log('bgColor', bgColor);
  };

  return (
    <View style={{marginTop: 20}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          // console.log('item recommended ', item);
          return (
            <TouchableOpacity
              style={styles.card}
              onLongPress={() => {
                dispatch(addPlayList(item));
                ToastAndroid.show('PlayList added to favorites ', 3000);
              }}
              key={index}
              onPress={() => {
                navigation.navigate('PlayList', {item});
                setPlayListName(item?.name);
                getRandomColor();
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
                <Text numberOfLines={1} style={styles.title}>
                  {item?.name}{' '}
                </Text>
                {item?.description ? (
                  <Text numberOfLines={2} style={styles.subtitle}>
                    {item?.description}
                  </Text>
                ) : null}
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
});

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
    marginVertical: 12,
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    paddingLeft: 12,
    // backgroundColor: 'red',
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
});
