import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {font} from '../constants/font';
import {colors} from '../constants/color';

export default function GenresCard({style, title, navigation, item, image}) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Genres', {item})}>
      <Text style={styles.name}>{title}</Text>
      <Image
        // source={require('../../assets/images/hero-dynamic.jpg')}
        source={{uri: image}}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '31.5%',
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  image: {
    width: '70%',
    height: 65,
    transform: [{rotate: '-30deg'}],
    borderRadius: 4,
    right: -30,
    position: 'absolute',
  },
  name: {
    fontFamily: font.Montserrat_SemiBold,
    color: colors.light,
    zIndex: 11,
  },
});
