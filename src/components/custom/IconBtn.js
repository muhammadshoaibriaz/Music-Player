import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
export default function IconBtn({
  onPress,
  icon,
  size,
  color,
  name,
  style,
  iconStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.iconBtn, style]}
      activeOpacity={0.6}>
      <Icon name={icon} color={color} size={size} style={iconStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
