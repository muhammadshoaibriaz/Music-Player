import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import IconBtn from '../custom/IconBtn';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArtistAlbum} from '../custom/ArtistAlbum';
import {fetchArtistAlbums} from '../../db/musicDb';
import * as Animatable from 'react-native-animatable';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {PlayingContext} from '../context/PlayingContext';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 4;
const SPACING = 14;

export default function ArtistDetails({route, navigation}) {
  const {item, details} = route.params;
  const id = item?.id;
  const artistId = details?.album?.artists[0]?.id;
  console.log('artist data is ', details?.album);
  // console.log('artist id is ', id);

  useEffect(() => {
    fetchTracks();
    fetchRelatedArtists();
  }, []);

  const [tracks, setTracks] = useState([]);
  const fetchTracks = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = await fetchArtistAlbums(token, id || artistId);
    // console.log('data is', data);
    setTracks(data?.items);
  };

  const [artists, setArtists] = useState([]);
  const fetchRelatedArtists = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id || artistId}/related-artists`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    setArtists(data?.artists);
    // console.log('artists are ', data);
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const backgroundColors = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['transparent', '#00000030'],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={colors.light_dark} translucent={false} />
      <Animated.View style={[styles.icon, {backgroundColor: backgroundColors}]}>
        <IonIcons
          name={'arrow-back'}
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </Animated.View>
      <View style={{flex: 1}}>
        {tracks?.length < 1 ? (
          <View style={[styles.activityIndicator, {height: 400}]}>
            <ActivityIndicator
              style={{bottom: 40}}
              size={30}
              color={'chocolate'}
            />
          </View>
        ) : (
          <Animated.FlatList
            data={tracks}
            bounces={false}
            removeClippedSubviews={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: false},
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60}}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <View style={styles.imageWrapper}>
                <LinearGradient
                  style={[
                    styles.imageWrapper,
                    {position: 'absolute', zIndex: 1},
                  ]}
                  colors={['transparent', colors.light_dark]}></LinearGradient>
                <Animated.Image
                  source={{
                    uri: item?.images[0]?.url || details?.album?.images[0]?.url,
                  }}
                  style={[styles.artistImage]}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    paddingHorizontal: 14,
                    width: '100%',
                  }}>
                  <Text numberOfLines={2} style={styles.artistName}>
                    {item?.name || details?.album?.name}
                  </Text>
                  <Text numberOfLines={2} style={styles.type}>
                    {item?.type}
                  </Text>
                  <Text numberOfLines={2} style={styles.description}>
                    Popularity: {item?.popularity || '67'}
                  </Text>
                  <Text numberOfLines={2} style={styles.description}>
                    Followers: {item?.followers?.total || '423545'}
                  </Text>
                  <Text numberOfLines={2} style={styles.description}>
                    Genres:{' '}
                    {item?.genres?.map((item, index) => (
                      <Text
                        numberOfLines={2}
                        style={styles.description}
                        key={index}>
                        {item + ', '}
                      </Text>
                    ))}
                  </Text>
                </View>
              </View>
            }
            renderItem={({item, index}) => {
              return (
                <Animatable.View
                  animation={'fadeInUp'}
                  delay={index * 60}
                  key={index}
                  duration={1000}>
                  <ArtistAlbum
                    onPress={() => navigation.navigate('ArtistTracks', {item})}
                    item={item}
                    key={index}
                  />
                </Animatable.View>
              );
            }}
            ListFooterComponent={
              artists?.length > 0 && (
                <View style={{marginTop: 20}}>
                  <Text style={styles.relatedArtistsTitle}>
                    Related Artists
                  </Text>
                  <FlatList
                    data={artists}
                    horizontal
                    contentContainerStyle={{paddingLeft: 14}}
                    removeClippedSubviews={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      // console.log('Artist is', item);
                      return (
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() =>
                            navigation.push('ArtistDetails', {item})
                          }>
                          <Animatable.View
                            style={styles.card}
                            animation="fadeInRight"
                            delay={index * 100}
                            duration={1000}>
                            <Image
                              source={{uri: item?.images[0]?.url}}
                              style={styles.cardImage}
                            />

                            <View style={styles.details}>
                              <Text numberOfLines={1} style={styles.title}>
                                {item?.name}{' '}
                              </Text>
                              <Text style={styles.followers}>{item?.type}</Text>
                            </View>
                          </Animatable.View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artistImage: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  artistName: {
    fontSize: 34,
    fontFamily: font.Montserrat_Bold,
    color: colors.light,
    zIndex: 11,
    width: '100%',
  },
  description: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light_text,
    zIndex: 1,
    marginBottom: 2,
  },
  type: {
    fontSize: 18,
    color: colors.light,
    zIndex: 11,
    textTransform: 'capitalize',
    fontFamily: font.Montserrat_SemiBold,
    marginBottom: 4,
  },

  // artist card
  cardImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 100,
  },
  card: {
    width: ITEM_WIDTH,
    marginVertical: 6,
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
  title: {
    fontSize: 12,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
    textAlign: 'center',
  },
  followers: {
    fontSize: 12,
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  header: {
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 11,
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 50,
    marginLeft: 8,
  },
});
