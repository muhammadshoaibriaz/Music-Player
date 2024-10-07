import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native';
import {StyleSheet, TouchableOpacity, View, Keyboard} from 'react-native';
import AntDesign from 'react-native-vector-icons/Ionicons';
import {font} from '../constants/font';
import {useState, useEffect} from 'react';
export default function CustomTabBar({state, descriptors, navigation}) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null; // Hide tab bar when keyboard is visible
  }

  return (
    <View style={styles.tabBarContainer}>
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)', '#000']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.gradientBackground}>
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label = options.tabBarLabel || route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            // Assign icons based on the route name
            let iconName;
            if (route.name === 'Home ') {
              iconName = isFocused ? 'home' : 'home-outline';
            } else if (route.name === 'Playlists') {
              iconName = isFocused ? 'musical-notes' : 'musical-notes-outline';
            } else if (route.name === 'Search1') {
              iconName = isFocused ? 'search' : 'search-outline';
            } else if (route.name === 'Favorite') {
              iconName = isFocused ? 'heart' : 'heart-outline';
            }

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}>
                <AntDesign
                  name={iconName}
                  size={22}
                  color={isFocused ? '#fff' : '#aaa'}
                />
                <Text
                  style={{
                    color: isFocused ? '#fff' : '#aaa',
                    fontFamily: font.Montserrat_Medium,
                    fontSize: 9,
                    marginTop: 4,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  gradientBackground: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
