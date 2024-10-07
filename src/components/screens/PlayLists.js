import {useState} from 'react';
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
} from 'react-native';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import {Dialog} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconBtn from '../custom/IconBtn';

export default function PlayLists() {
  // console.log('Explore component render');

  const [playList, setPlayList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('PlayList Name #1');

  const handleChange = text => {
    setInputValue(text);
  };

  const createPlayList = newPlayList => {
    setPlayList(prevPlayLists => [...prevPlayLists, newPlayList]);
    console.log('playList ares ', playList);
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
        <View style={styles.authorNameIcon}>
          <Text style={styles.author}>S</Text>
        </View>
        <View style={styles.iconLinks}>
          <IconBtn
            icon={'search-outline'}
            color={colors.light_text}
            size={26}
          />
          <IconBtn
            icon={'add'}
            color={colors.light_text}
            size={26}
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      {playList?.length < 1 ? (
        <View style={styles.renderPlaylist}>
          <Ionicons
            name={'musical-notes-outline'}
            size={50}
            color={colors.light_text}
          />
          <Text style={styles.noPlaylist}>No Playlist</Text>
        </View>
      ) : (
        <View>
          {playList.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.playlist}
              key={index}>
              <View style={styles.icon}>
                <Ionicons
                  name={'musical-notes'}
                  size={30}
                  color={colors.light}
                />
              </View>
              <View style={styles.details}>
                <Text style={styles.playlistTitleName}>{item}</Text>
                <Text style={styles.authorName}>{'Shabii'} · PlayList</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Dialog
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        animationType="fade"
        overlayStyle={styles.overlayStyle}>
        <View style={styles.wrapper}>
          <Text style={styles.playlistName}>Give your playList a name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={inputValue}
            defaultValue={inputValue}
            autoFocus={true}
            numberOfLines={1}
            showSoftInputOnFocus={true}
            placeholderTextColor={colors.light_text}
          />
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              createPlayList(inputValue);
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

  // Playlist styles
});
