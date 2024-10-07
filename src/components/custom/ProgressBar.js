import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';
import {colors} from '../constants/color';

const ProgressBar = ({duration}) => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [duration]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBar}>
      <Animated.View
        style={[styles.animatedBar, {width: widthInterpolation}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 3,
    width: '100%',
    // backgroundColor: colors.light_dark,
    borderRadius: 50,
    overflow: 'hidden',
  },
  animatedBar: {
    height: '100%',
    // backgroundColor: colors.light,
    borderRadius: 50,
  },
});

export default ProgressBar;
