import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {font} from '../constants/font';
import {colors} from '../constants/color';
import LinearGradient from 'react-native-linear-gradient';
import IconBtn from '../custom/IconBtn';
import {SearchPlayListComponent} from '../custom/SearchPlayListComponent';

export default function SearchPlayList({route, navigation}) {
  // console.log('SearchPlaylist ', route.params?.item);
  const {item} = route.params;
  const {id} = item;

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const [playlists, setPlaylists] = useState([]);
  const fetchPlaylists = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setPlaylists(data?.playlists?.items);
      // console.log(data);
    } catch (error) {
      console.log('Error while fetching data', error.message);
    }
  };
  // console.log('SearchPlayList component render');
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {playlists?.length < 1 ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              style={{bottom: 40}}
              size={30}
              color={'chocolate'}
            />
          </View>
        ) : (
          <FlatList
            data={playlists}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <View style={styles.imageWrapper}>
                <IconBtn
                  icon="arrow-back"
                  size={24}
                  color="white"
                  style={{position: 'absolute', zIndex: 11}}
                  onPress={() => navigation.goBack()}
                />
                <LinearGradient
                  style={[
                    styles.imageWrapper,
                    {position: 'absolute', zIndex: 1},
                  ]}
                  colors={['transparent', colors.light_dark]}></LinearGradient>
                <Animated.Image
                  source={{uri: item?.icons[0]?.url}}
                  style={styles.artistImage}
                />
                <View style={styles.details}>
                  <Text numberOfLines={2} style={styles.artistName}>
                    {item?.name}
                  </Text>
                  <Text numberOfLines={2} style={styles.description}>
                    Total tracks: {playlists && playlists?.length}
                  </Text>
                </View>
              </View>
            }
            renderItem={({item, index}) => {
              // console.log('item is ', item);
              return (
                <SearchPlayListComponent
                  onPress={() => navigation.navigate('BrowseTrack', {item})}
                  item={item}
                  key={index}
                />
              );
            }}
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
    marginTop: 4,
  },
  playList: {
    paddingHorizontal: 14,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playing: {
    fontSize: 16,
    fontFamily: font.Montserrat_Bold,
    color: 'white',
    zIndex: 11,
    top: 10,
  },
  details: {
    position: 'absolute',
    bottom: 24,
    paddingHorizontal: 14,
    width: '100%',
  },
});
