import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  FlatList,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../constants/color';
import {font} from '../constants/font';

let data = [];
for (let i = 0; i < 100; i++) {
  data.push(i);
}
export default function CustomInfiniteScroll() {
  // console.log('Explore component render');

  // const [playList, setPlayList] = useState([]);
  // const [playListName, setPlayListName] = useState('');
  const [scrollViewHeight, setHeight] = useState(1);
  const [mainHeight, setMainHeight] = useState(1);
  let panValue = {x: 0, y: 0};
  const pan = useRef(new Animated.ValueXY(panValue)).current;
  useEffect(() => {
    pan.addListener(value => {
      panValue = value;
    });
  }, []);
  const scrolling = Animated.diffClamp(
    pan.y,
    scrollViewHeight / 0 ? -scrollViewHeight + mainHeight : 1,
    0,
  );
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({x: panValue.x, y: panValue.y});
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        pan.flattenOffset();
        Animated.decay(pan, {
          velocity: {x: 0, y: g.vy},
          deceleration: 0.99999,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <View
      style={styles.container}
      onLayout={e => setMainHeight(e.nativeEvent.layout.height)}>
      <Animated.View
        style={[styles.scrollView, {transform: [{translateY: scrolling}]}]}
        {...panResponder.panHandlers}
        onLayout={e => setHeight(e.nativeEvent.layout.height)}>
        {data.map((item, index) => (
          <View style={styles.item} key={index.toString()}>
            <Text style={styles.text}>
              This is not scrollView / FlatList - {index + 1}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_dark,
  },
  header: {
    width: '100%',
    paddingVertical: 10,
  },
  headerTitle: {
    color: colors.light,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'blue',
    paddingVertical: 20,
    marginTop: 10,
  },
  text: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light,
  },
});
