import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GenresTrack} from '../custom/GenresTrack';
import {font} from '../constants/font';
import {colors} from '../constants/color';
import IconBtn from '../custom/IconBtn';

export default function Genres({route, navigation}) {
  const {item} = route.params;
  // console.log('Item data is ', item?.name?.toLowerCase());

  useEffect(() => {
    fetchGenresData();
  }, []);

  const name = item?.name.toLowerCase();

  const [genresData, setGenresData] = useState([]);
  const fetchGenresData = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${name}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      // console.log('genres data ', data?.tracks);
      setGenresData(data?.tracks);
    } catch (error) {
      console.log('error is ', error);
    }
  };

  // console.log('Genres component render');
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={colors.light_dark} />
      <View style={styles.header}>
        <IconBtn
          icon={'arrow-back'}
          size={20}
          color={colors.light}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.name}>{item?.name}</Text>
      </View>
      {/* <View style={{flex: 1}}> */}
      {genresData.length < 1 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size={30}
            color={'chocolate'}
            style={{bottom: 30}}
          />
        </View>
      ) : (
        <FlatList
          data={genresData}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 130}}
          renderItem={({item, index}) => {
            return (
              <GenresTrack
                item={item}
                onPress={() => navigation.navigate('Tracks', {item})}
              />
            );
          }}
        />
      )}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    color: '#fff',
    fontFamily: font.Montserrat_SemiBold,
  },
  container: {
    paddingHorizontal: 14,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
