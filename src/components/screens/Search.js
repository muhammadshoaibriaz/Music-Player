import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {colors} from '../constants/color';
import GenresCard from '../custom/GenresCard';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchBar} from '../custom/SearchBar';
import SoundPlayer from 'react-native-sound-player';
import {debounce} from 'lodash';
import {PlayingContext} from '../context/PlayingContext';
import BottomSheet from 'react-native-raw-bottom-sheet';
const {width, height} = Dimensions.get('screen');
import {Dialog} from 'react-native-elements';

export default function Search({navigation}) {
  const bottomRef = useRef();
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const {isPlaying, playingTitle, setIsPlaying, setPlayingTitle} =
    useContext(PlayingContext);

  const [genres, setGenres] = useState([
    {
      name: 'Pop',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/song-album-cover-design-template-87f7c73d92f5fc49b0aa00ca92b22fa9_screen.jpg?ts=1727937028',
      backgroundColor: '#FF4081',
    },
    {
      name: 'Rock',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cd-mixtape-album-cover-artwork-template-design-8b822499d890f428474042072bea60c3_screen.jpg?ts=1719437490',
      backgroundColor: '#607D8B',
    },
    {
      name: 'Jazz',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cd-mixtape-album-cover-artwork-template-design-f0b04be7f7dba335ecb03b5bc950d101_screen.jpg?ts=1715317370',
      backgroundColor: '#3F51B5',
    },
    {
      name: 'Classical',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/blue-sea-album-cover-design-template-d0222b99e290042ca166bbcd815641fe_screen.jpg?ts=1561488420',
      backgroundColor: '#9C27B0',
    },
    {
      name: 'Hip Hop',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/album-cover-design-template-77f08cdaf8a830be32824d77b03b17f5_screen.jpg?ts=1727271307',
      backgroundColor: '#FF9800',
    },
    {
      name: 'Electronic',
      image:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/broken-%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0-%D0%B0%D0%BB%D1%8C%D0%B1%D0%BE%D0%BC%D0%B0-design-template-5ff60c3af23df6701913e4e5381c6923_screen.jpg?ts=1718908235',
      backgroundColor: '#4CAF50',
    },
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setSearchResults([]);
    }
    // console.log('render again and again');
  }, [query]);

  const onChange = text => {
    setQuery(text);
    // console.log(text);
  };

  const fetchCategories = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(
      'https://api.spotify.com/v1/browse/categories',
      {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    setCategories(data?.categories);
    // console.log(categories);
  };

  // We have three urls
  // https://api.spotify.com/v1/search?q=${query}&type=track&limit=150
  // https://api.spotify.com/v1/search?q=${query}%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Cplaylist%2Cartist%2Ctrack

  const fetchSearchResults = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    if (query) {
      setQuery('');
      bottomRef.current.open();
    } else {
      ToastAndroid.show('Please enter something!', 3000);
    }
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setSearchResults(data?.tracks?.items);
      console.log('query data is ', data);
    } catch (error) {
      console.log('Error while fetching songs', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const playSong = async track => {
    try {
      // console.log(track?.preview_url);
      const trackIs = await track?.preview_url;
      if (trackIs && trackIs !== null) {
        SoundPlayer.playUrl(trackIs);
        setIsPlaying(true);
        // console.log(track?.name);
        setPlayingTitle(track?.name);
        SoundPlayer.addEventListener('FinishedPlaying', () => {
          setIsPlaying(false);
        });
      } else {
        ToastAndroid.show('Song url not found!', 3000);
      }
    } catch (err) {
      console.log('Error is ', err);
    }
  };

  // https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Cplaylist%2Cartist%2Ctrack
  // console.log('Search component rerender');
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        animated={true}
        backgroundColor={colors.light_dark}
        showHideTransition={'fade'}
      />
      <View style={{paddingVertical: 10, width: '100%'}}>
        <SearchBar
          value={query}
          onChangeText={onChange}
          onPress={fetchSearchResults}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}>
        <View>
          <Text style={styles.title}>Top genres</Text>
          <View style={styles.genres}>
            {genres.map((item, index) => (
              <GenresCard
                key={index}
                item={item}
                image={item?.image}
                title={item?.name}
                navigation={navigation}
                style={{backgroundColor: item?.backgroundColor}}
              />
            ))}
          </View>
        </View>
        <View>
          <Text onPress={fetchCategories} style={styles.title}>
            Browse All
          </Text>
        </View>
        {categories?.length < 1 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
            }}>
            <ActivityIndicator size={30} color={'chocolate'} />
          </View>
        ) : (
          <View style={styles.genres}>
            {categories?.items?.map((item, index) => (
              <TouchableOpacity
                style={[styles.card]}
                onPress={() => navigation.navigate('SearchPlayList', {item})}
                activeOpacity={0.8}
                key={index}>
                <Text style={[styles.name]}>{item?.name}</Text>
                <Image
                  source={{uri: item?.icons[0].url}}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomSheet
        openDuration={700}
        closeOnPressBack={true}
        customStyles={{
          container: {
            backgroundColor: colors.light_dark,
            height: height,
          },
          draggableIcon: {display: 'none'},
        }}
        ref={bottomRef}
        height={height}>
        <View style={{width: '100%', height: '100%'}}>
          {loading ? (
            <View style={styles.container}>
              <ActivityIndicator size={40} />
            </View>
          ) : (
            <View style={{flex: 1, paddingHorizontal: 14}}>
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 60}}
                renderItem={({item, index}) => {
                  // console.log('item is ', item);
                  return (
                    <TouchableOpacity
                      style={styles.track}
                      key={index}
                      onPress={() => {
                        playSong(item);
                        console.log(console.log(item));
                      }}>
                      <Image
                        source={{uri: item?.album?.images[0]?.url}}
                        style={styles.trackImage}
                      />
                      <View style={styles.trackDetails}>
                        <Text
                          numberOfLines={2}
                          style={[
                            styles.trackTitle,
                            {
                              color:
                                isPlaying && playingTitle === item?.name
                                  ? 'chocolate'
                                  : 'white',
                            },
                          ]}>
                          {item?.album?.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                          }}>
                          {item?.album?.artists?.map((item, index) => (
                            <Text
                              key={index}
                              style={[styles.artistName, {fontFamily: 'Arial'}]}
                              numberOfLines={1}>
                              {item?.name + ', '}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_dark,
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  genres: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
    fontSize: 16,
    marginVertical: 16,
  },
  card: {
    width: '48%',
    height: 70,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#ffffff06',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  image: {
    width: '50%',
    height: '100%',
    borderRadius: 2,
  },
  name: {
    padding: 8,
    fontFamily: font.Montserrat_SemiBold,
    color: colors.light,
    width: '50%',
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 2,
  },
  track: {
    flexDirection: 'row',
    paddingVertical: 6,
    width: '100%',
  },
  trackDetails: {
    paddingLeft: 12,
    width: '82%',
  },
  trackTitle: {
    fontSize: 14,
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
  },
  artistName: {
    fontSize: 14,
    fontFamily: font.Montserrat_Regular,
    color: colors.light_text,
  },
});
