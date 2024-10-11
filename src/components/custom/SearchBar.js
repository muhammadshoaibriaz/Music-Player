import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/color';
import {font} from '../constants/font';
export const SearchBar = memo(
  ({onChangeText, value, onPress, style, onFocus, onBlur}) => {
    // const [query, setQuery] = useState('');
    // const [categories, setCategories] = useState([]);
    // const [searchResults, setSearchResults] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const {isPlaying, playingTitle, setIsPlaying, setPlayingTitle} =
    //   useContext(PlayingContext);
    // const fetchSearchResults = useCallback(async () => {
    //   const token = await AsyncStorage.getItem('token');
    //   setLoading(true);
    //   if (!query) {
    //     s;
    //     ToastAndroid.show('Please enter something!', 3000);
    //   }
    //   try {
    //     const response = await fetch(
    //       `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`,
    //       {
    //         method: 'GET',
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           'Content-Type': 'application/json',
    //         },
    //       },
    //     );
    //     const data = await response.json();
    //     setSearchResults(data?.tracks?.items);
    //     console.log('query data is ', data);
    //   } catch (error) {
    //     console.log('Error while fetching songs', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }, [query]);
    // console.log('Searchbar');
    return (
      <View style={[styles.searchBar, style]}>
        <TextInput
          placeholder="Search..."
          onChangeText={onChangeText}
          value={value}
          style={[styles.input]}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor={colors.light_text}
        />
        <TouchableOpacity onPress={onPress}>
          <Icon name="search1" color={colors.light} size={20} />
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#ffffff10',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
});
