import {useRef, useState} from 'react';
import {
  TextInput,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Dimensions,
  Animated,
  LayoutAnimation,
} from 'react-native';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import {Dialog} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconBtn from '../custom/IconBtn';
import {useDispatch, useSelector} from 'react-redux';
import {createPlaylist} from '../reduxtolkit/slices/playlistSlices';

export default function PlayLists({navigation}) {
  // console.log('Explore component render');
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('PlayList Name #1');
  const [searchBarOpen, setSearchbarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const handleChange = text => {
    setName(text);
  };

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist({name}));
  };

  const playlists = useSelector(state => state.playlist.playlists);
  // console.log(playlists);

  const onSearch = text => {
    setQuery(text);
    const searchResults = playlists.filter(name =>
      name.name.toLowerCase().includes(text.toLowerCase()),
    );
    // console.log(searchResults);
    setFilteredResults(searchResults);
  };

  const value = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    Animated.timing(value, {
      toValue: !searchBarOpen ? 0 : 200,
      useNativeDriver: false,
      duration: 200,
    }).start();
    setSearchbarOpen(!searchBarOpen);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.light_dark}
        animated={true}
        showHideTransition={'fade'}
      />
      <View style={styles.authorDetails}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '70%',
          }}>
          <View style={styles.authorNameIcon}>
            <Text style={styles.author}>S</Text>
          </View>
          <Animated.View
            style={[
              styles.searchBar,
              {
                width: value,
              },
            ]}>
            <TextInput
              placeholder="Search..."
              value={query}
              onChangeText={onSearch}
              style={styles.searchInput}
              placeholderTextColor={colors.light_text}
            />
          </Animated.View>
        </View>
        <View style={styles.iconLinks}>
          <IconBtn
            icon={'search-outline'}
            color={colors.light_text}
            size={26}
            onPress={onPress}
          />
          <IconBtn
            icon={'add'}
            color={colors.light_text}
            size={26}
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      {playlists?.length < 1 ? (
        <View style={styles.renderPlaylist}>
          <Ionicons
            name={'musical-notes-outline'}
            size={50}
            color={colors.light_text}
          />
          <Text style={styles.noPlaylist}>No playlist found</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={filteredResults?.length > 0 ? filteredResults : playlists}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 60}}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.playlist}
                  onPress={() => navigation.navigate('PlayListSongs', {item})}
                  key={index}>
                  <View style={styles.icon}>
                    <Ionicons
                      name={'musical-notes'}
                      size={30}
                      color={colors.light}
                    />
                  </View>
                  <View style={styles.details}>
                    <View>
                      <Text style={styles.playlistTitleName}>{item?.name}</Text>
                      <Text style={styles.authorName}>
                        {'Shabii'} · PlayList
                      </Text>
                    </View>
                    <Text style={styles.songs}>
                      {item?.songs?.length} songs
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <Dialog
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        animationType="fade"
        removeClippedSubviews={false}
        overlayStyle={styles.overlayStyle}>
        <View style={styles.wrapper}>
          <Text style={styles.playlistName}>Give your playlist a name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={name}
            defaultValue={name}
            autoFocus={true}
            numberOfLines={1}
            showSoftInputOnFocus={true}
            placeholderTextColor={colors.light_text}
          />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              // createPlayList(inputValue);
              handleCreatePlaylist();
              setIsVisible(false);
            }}>
            <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>
        </View>
      </Dialog>
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
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerTitle: {
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
  },
  icon: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 2,
  },
  playlist: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  text: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light,
  },
  playlistTitleName: {
    fontFamily: font.Montserrat_Medium,
    fontSize: 14,
    color: colors.light,
  },
  details: {
    flex: 1,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    color: colors.light_text,
    fontSize: 12,
    fontFamily: font.Montserrat_SemiBold,
    marginTop: 4,
  },
  author: {
    fontFamily: font.Montserrat_Bold,
    color: colors.light,
    fontSize: 20,
  },
  authorNameIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: 'chocolate',
  },
  authorDetails: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconLinks: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  input: {
    fontSize: 20,
    fontFamily: font.Montserrat_SemiBold,
    height: 50,
    color: colors.light_text,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    width: '100%',
    minWidth: '100%',
    height: 50,
    textAlign: 'center',
  },
  btnContainer: {
    width: 140,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'chocolate',
    borderWidth: 2,
    borderColor: '#444',
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    fontFamily: font.Montserrat_SemiBold,
    color: colors.light,
  },
  overlayStyle: {
    width: '90%',
    paddingHorizontal: 12,
    paddingVertical: 44,
    backgroundColor: colors.light_dark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 0,
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistName: {
    fontSize: 20,
    fontFamily: font.Montserrat_Medium,
    color: colors.light_text,
    marginBottom: 30,
  },
  noPlaylist: {
    color: colors.light_text,
    fontSize: 20,
    marginTop: 10,
    fontFamily: font.Montserrat_Regular,
  },
  renderPlaylist: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  songs: {
    color: colors.light_text,
    position: 'absolute',
    right: 14,
    fontFamily: font.Montserrat_Medium,
  },
  searchBar: {
    borderRadius: 50,
    position: 'relative',
    height: 40,
    marginLeft: 8,
    backgroundColor: '#ffffff10',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingLeft: 12,
    fontFamily: font.Montserrat_Regular,
    color: colors.light,
  },
  // Playlist styles
});
