import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Animated, Button, StyleSheet} from 'react-native';

const AnimatedProgressBar = ({duration, currentTime, isPlaying}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isPlaying) {
      Animated.timing(animatedValue, {
        toValue: currentTime / duration,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [currentTime, duration, isPlaying]);

  const progressBarWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.progressBar, {width: progressBarWidth}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: 340,
    height: 4,
    backgroundColor: 'red',
    borderRadius: 50,
    overflow: 'hidden',
  },
  progressBar: {
    width: 40,
    height: '100%',
    backgroundColor: 'blue',
    position: 'absolute',
    zIndex: 111,
  },
});

export default AnimatedProgressBar;
