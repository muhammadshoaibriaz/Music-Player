import {View, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import React from 'react';
import {font} from '../constants/font';
import * as Animatable from 'react-native-animatable';
import {colors} from '../constants/color';
import LinearGradient from 'react-native-linear-gradient';

export default function Splash() {
  return (
    <LinearGradient
      style={[StyleSheet.absoluteFillObject, {zIndex: -1}]}
      colors={['transparent', '#00000090']}>
      <StatusBar translucent={false} backgroundColor={colors.light_dark} />
      <ImageBackground
        source={require('../../assets/images/background.jpeg')}
        style={[StyleSheet.absoluteFillObject, {zIndex: -1}]}>
        <View style={styles.container}>
          {/* <StatusBar translucent={true} backgroundColor={'transparent'} /> */}
          <Animatable.Image
            animation="fadeIn"
            duration={3000}
            source={require('../../assets/png/music.png')}
            style={styles.iconImage}
          />
          <Animatable.Text animation="slideInUp" style={styles.name}>
            Moodify
          </Animatable.Text>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 40,
    fontFamily: font.Montserrat_Bold,
    color: colors.light,
    zIndex: 11,
  },
});
