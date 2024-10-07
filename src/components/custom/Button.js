import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import IonsIcon from 'react-native-vector-icons/Ionicons';
import {font} from '../constants/font';
import {colors} from '../constants/color';
export default function Button({icon, title, onPress}) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View style={styles.icon}>
        <IonsIcon name={icon} size={24} color="white" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light,
    marginLeft: 12,
  },
});
