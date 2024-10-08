import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {screen} from '../custom/screens';
import Splash from '../screens/Splash';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import CustomTabBar from '../custom/CustomTabBar';
import {colors} from '../constants/color';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
// const Stack = createSharedElementStackNavigator();

const getFocusedRouteName = route => {
  const focusedRoute = getFocusedRouteNameFromRoute(route);
  if (focusedRoute === 'Player') {
    return 'none';
  }
  return 'flex';
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.light_dark},
        animation: 'slide_from_right',
        animationEnabled: true,
      }}>
      <Stack.Screen name="Home" component={screen.Home} />
      <Stack.Screen name="PlayList" component={screen.PlayList} />
      <Stack.Screen name="AllArtist" component={screen.AllArtist} />
      <Stack.Screen name="ArtistDetails" component={screen.ArtistDetails} />
      <Stack.Screen name="SongDetails" component={screen.SongDetails} />
      <Stack.Screen name="ArtistTracks" component={screen.ArtistTracks} />
      <Stack.Screen name="NewSongTracks" component={screen.NewSongTracks} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: colors.light_dark},
      }}>
      <Stack.Screen name="Search" component={screen.Search} />
      <Stack.Screen name="SearchPlayList" component={screen.SearchPlayList} />
      <Stack.Screen name="Genres" component={screen.Genres} />
      <Stack.Screen name="Tracks" component={screen.Tracks} />
      <Stack.Screen name="BrowseTrack" component={screen.BrowseTrack} />
    </Stack.Navigator>
  );
};

const FavoriteStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.light_dark},
      }}>
      <Stack.Screen name="Favorites" component={screen.Favorite} />
      <Stack.Screen name="FavPlayList" component={screen.FavPlayList} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(myTimeout);
  }, []);

  if (visible) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        detachInactiveScreens={false}
        initialRouteName="Home "
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home "
          component={HomeStack}
          options={({route}) => ({
            headerShown: false,
            tabBarStyle: {display: getFocusedRouteName(route)},
          })}
        />
        <Tab.Screen
          name="Playlists"
          component={screen.PlayLists}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Search1"
          component={SearchStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteStack}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export {AppNavigator};
