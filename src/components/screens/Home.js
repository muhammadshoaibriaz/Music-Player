import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {font} from '../constants/font';
import {colors} from '../constants/color';
import AlbumCard from '../custom/AlbumCard';
import Artist from '../custom/Artist';
import Playing from '../custom/Playing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Recommended} from '../custom/Recommended';
import {fetchArtists, fetchRecentlyPlayed} from '../../db/musicDb';
import {PlayingContext} from '../context/PlayingContext';
import NewSongCard from '../custom/NewSongCard';
import BottomComponent from '../custom/BottomComponent';
import FontAwesome5 from 'react-native-vector-icons/Octicons';
import {
  ArtistShimmer,
  RecentShimmer,
  RecommendedShimmer,
} from './ShimmerExample';
import FavoriteAlbum from '../custom/FavoriteAlbum';
import ForyouAlbum from '../custom/FavoriteAlbum';

// spotifyAuthConfiguration
const CLIENT_ID = '6d06485cb50646159ee240e6a8262044';
const CLIENT_SECRET = '1e0aed3132494873be2e2e332888959b';
const REDIRECT_URI = 'myapp://callback';
const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export default function Home({navigation}) {
  const bottomRef = useRef();
  const time = new Date();
  const current_time = time.getHours();

  // States
  const [userProfile, setUserProfile] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  // mood Data
  const [artists1, setArtists1] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [userMood, setUserMood] = useState('');

  useEffect(() => {
    const getUserMood = async () => {
      try {
        const mood = await AsyncStorage.getItem('userMood');
        setUserMood(mood || 'No mood found');
      } catch (error) {
        console.error('Error fetching mood from AsyncStorage', error);
      }
    };
    getUserMood();
  }, [userMood, backgroundColor]);
  // console.log('mood from home is ', userMood);

  useEffect(() => {
    const fetchData = async () => {
      fetchResults();
      fetchRecentlyPlayedSongs();
      fetchUserProfile();
    };
    fetchData();
  }, [userMood]);

  const loginWithSpotify = async () => {
    const scopes =
      'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-recently-played user-follow-read user-read-playback-state user-modify-playback-state streaming'; // Add any other scopes you need
    const authUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&scope=${encodeURIComponent(scopes)}`;

    // Open the authorization URL
    Linking.openURL(authUrl);
  };

  const handleRedirect = async url => {
    const code = extractCodeFromUrl(url);
    if (code) {
      try {
        const tokenResponse = await axios.post(TOKEN_URL, null, {
          params: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        // Store the access token for future API requests
        const accessToken = tokenResponse.data.access_token;
        await AsyncStorage.setItem('token', accessToken);
        await fetchUserProfile(accessToken);
        console.log('accessToken is', accessToken);
      } catch (error) {
        console.log('Error while handling redirect url', error);
      }
    }
  };

  const extractCodeFromUrl = url => {
    const regex = /[?&]code=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const handleUrl = event => {
      const url = event.url;
      handleRedirect(url);
    };

    const unsubscribe = Linking.addEventListener('url', handleUrl);
    return () => {
      unsubscribe.remove();
    };
  }, []);

  // ------------------API REQUESTS----------------

  const fetchResults = async () => {
    const token = await AsyncStorage.getItem('token');
    const mood = await AsyncStorage.getItem('userMood');
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          mood,
        )} songs&type=track,album,playlist,artist&limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      // console.log('Search response is ', data);
      // setPlaylist(JSON.stringify(data?.playlists));
      setPlaylist(data?.playlists?.items);
      setAlbums(data?.albums?.items);
      setArtists1(data?.artists?.items);
      setTracks(data?.tracks?.items);
      // console.log('playlist is ', data?.playlists?.items);
    } catch (error) {
      console.log('Error while', error);
    }
  };

  const fetchUserProfile = async accessToken => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserProfile(response.data);
    } catch (error) {
      console.log('Error while fetching user profile', error);
    }
  };

  // fetch recently played songs
  const fetchRecentlyPlayedSongs = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = await fetchRecentlyPlayed(token);
    // console.log('recently played songs data is ', data);
    setRecentlyPlayed(data?.items);
  };

  // get artists
  const getArtists = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = await fetchArtists(token);
    console.log('Artist data is ', data);
    // setArtists(data?.artists?.items);
  };

  // Context Api
  const {
    playingTitle,
    artistName,
    playingImage,
    isPlaying,
    items,
    backgroundColor,
  } = useContext(PlayingContext);
  // console.log('Home color', backgroundColor);

  // Refresh component
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      fetchResults(), fetchRecentlyPlayedSongs();
      // fetchArtists(),
      // newReleases(),
      // featuredPlaylist(),
      // favoriteSongs();
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={[styles.container]}>
      <StatusBar translucent={false} backgroundColor={colors.light_dark} />
      <View style={[styles.header]}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../../assets/images/tolga.jpg')}
            style={styles.userImage}
            resizeMode="stretch"
          />
          <View style={styles.details}>
            <Text style={styles.name}>
              Welcome, {userProfile?.display_name}
            </Text>
            <Text style={styles.welcome}>
              {current_time < 12
                ? 'Good Morning'
                : current_time > 11 && current_time < 15
                ? 'Good Afternoon'
                : 'Good Evening'}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '25%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.btn} onPress={loginWithSpotify}>
            <FontAwesome5 name={'sign-in'} color={'#fff'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('FaceDetection')}>
            <MaterialCommunityIcons
              name={'face-recognition'}
              color={'#fff'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{paddingBottom: isPlaying ? 130 : 70}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {recentlyPlayed?.length < 1 ? (
            <RecentShimmer />
          ) : (
            <AlbumCard
              title={'Recent release'}
              // subtitle={'See All'}
              navigation={navigation}
              data={recentlyPlayed}
              bottomRef={bottomRef}
            />
          )}
          {tracks?.length < 1 ? (
            <RecentShimmer />
          ) : (
            <ForyouAlbum
              navigation={navigation}
              title={'For you'}
              // subtitle={'See All'}
              data={tracks}
            />
          )}
          {playlist?.length < 1 ? (
            <RecentShimmer />
          ) : (
            <NewSongCard
              navigation={navigation}
              title={'Songs playlist'}
              // subtitle={'See All'}
              data={albums}
            />
          )}

          {albums?.length < 1 ? (
            <RecommendedShimmer />
          ) : (
            <Recommended
              title={'Recommended For You'}
              data={playlist}
              navigation={navigation}
            />
          )}
          {artists1?.length < 1 ? (
            <ArtistShimmer />
          ) : (
            <View>
              <View style={styles.artistHeader}>
                <Text style={styles.headerTitle} onPress={fetchArtists}>
                  Artists
                </Text>
                <TouchableOpacity
                  style={styles.seeAll}
                  onPress={() => navigation.navigate('AllArtist')}>
                  <Text style={styles.headerSubtitle}>See All</Text>
                  <Icon name="arrowright" color={colors.light_text} size={20} />
                </TouchableOpacity>
              </View>
              <Artist data={artists1} navigation={navigation} />
            </View>
          )}
        </ScrollView>
      </View>
      <Playing
        style={{backgroundColor: backgroundColor}}
        artist={artistName}
        title={playingTitle}
        imageUrl={playingImage}
        onPress={() => {
          bottomRef.current.open();
          // console.log('item is', item?.track?.duration_ms);
        }}
      />
      <BottomComponent bottomRef={bottomRef} item={items} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_dark,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  header: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  name: {
    fontFamily: font.Montserrat_SemiBold,
    color: colors.light,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#222',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    paddingHorizontal: 14,
    // width: '70%',
  },
  welcome: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light_text,
  },
  artistHeader: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerTitle: {
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
    fontSize: 20,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
  },
  btn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
