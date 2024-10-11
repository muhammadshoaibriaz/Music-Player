import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconBtn from '../custom/IconBtn';
const ITEM_WIDTH = 50;
export default function AllArtist({navigation}) {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    fetchMultipleArtists();
  }, []);

  const fetchMultipleArtists = async () => {
    const accessToken = await AsyncStorage.getItem('token');
    let drake = 'akcent';
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${drake}&type=artist&limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setArtist(data?.artists?.items);
      // console.log('data artist', data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconBtn
          color={colors.light}
          icon={'arrow-back'}
          size={22}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>All Artist</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={artist}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 14,
            paddingBottom: 60,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.card}
                key={index}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },

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
