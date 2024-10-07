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
    console.log('Searchbar');
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
