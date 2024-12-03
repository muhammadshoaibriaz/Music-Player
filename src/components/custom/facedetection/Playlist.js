import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MAterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../constants/color';
import {font} from '../../constants/font';
import {useContext} from 'react';
import {PlayingContext} from '../../context/PlayingContext';

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width / 3;

export const PlayList = ({data, navigation}) => {
  // console.log('data is ', data);
  // const {items} = data;
  // console.log();
  const {setBackgroundColor} = useContext(PlayingContext);
  const getRandomColor = () => {
    const getComponent = () => Math.floor(Math.random() * 156);
    const r = getComponent();
    const g = getComponent();
    const b = getComponent();
    const bgColor = `rgb(${r}, ${g}, ${b})`;
    setBackgroundColor(bgColor);
    // console.log('bgColor', bgColor);
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        contentContainerStyle={{paddingHorizontal: 14}}
        renderItem={({item, index}) => {
          // console.log('my data is is ', item);
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('PlayList', {item});
                getRandomColor();
              }}
              style={styles.iconImage}>
              <View>
                <LinearGradient
                  colors={['transparent', '#00000080']}
                  style={[
                    styles.image,
                    {position: 'absolute', zIndex: 111},
                  ]}></LinearGradient>
                <Image
                  source={{uri: item?.images[0].url}}
                  style={[styles.image]}
                />
              </View>
              <View style={styles.details}>
                <Text numberOfLines={3} style={styles.albumName}>
                  {item?.name}
                </Text>
                <Text numberOfLines={3} style={styles.total}>
                  {item?.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Entypo
                      name="folder-music"
                      size={18}
                      color={colors.light_text}
                    />
                    <Text style={styles.albumType}>
                      {item?.owner?.display_name}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.total}>
                      total {item?.tracks?.total}
                    </Text>
                    <MAterialCommunityIcons
                      name="playlist-music"
                      size={18}
                      color={colors.light_text}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconImage: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 2,
  },
  albumName: {
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
    fontSize: 16,
  },
  songDescription: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    fontSize: 12,
    marginTop: 4,
  },
  details: {
    paddingLeft: 12,
    flex: 1,
  },
  artists: {
    color: colors.light_text,
    fontSize: 12,
    fontFamily: font.Montserrat_Medium,
  },
  total: {
    color: colors.light_text,
    fontSize: 12,
    fontFamily: font.Montserrat_Medium,
    marginRight: 6,
  },
  albumType: {
    fontSize: 12,
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
    textTransform: 'capitalize',
    marginTop: 2,
    marginLeft: 6,
  },
});
