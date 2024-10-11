import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import faceDetection from '@react-native-ml-kit/face-detection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import {PlayList} from '../custom/facedetection/Playlist';
import {Artist} from '../custom/facedetection/Artist';
import {Albums} from '../custom/facedetection/Albums';
import {Tracks} from '../custom/facedetection/Tracks';
import IconBtn from '../custom/IconBtn';
import Button from '../custom/Button';

const FaceDetection = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [faceData, setFaceData] = useState(null);
  const [mood, setMood] = useState('');

  // mood Data
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageUri) {
      detectFace(imageUri);
    }
  }, [imageUri]);

  useEffect(() => {
    const setUserMood = async () => {
      if (mood) {
        try {
          await AsyncStorage.setItem('userMood', mood);
          console.log('Mood saved:', mood);
        } catch (error) {
          console.error('Error saving mood to AsyncStorage:', error);
        }
      }
    };
    setUserMood();
  }, [mood]);

  const uploadImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
      maxHeight: 300,
      maxWidth: 300,
    });

    if (result) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      detectFace(uri);
    }
  };

  const openCamera = async () => {
    const result = await launchCamera({
      cameraType: 'front',
      durationLimit: 4000,
      mediaType: 'photo',
      videoQuality: 'medium',
      quality: 1,
      saveToPhotos: false,
    });

    if (result) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      detectFace(uri);
    }
  };

  const detectFace = async imageUri => {
    try {
      const faces = await faceDetection.detect(imageUri, {
        contourMode: 'all',
        classificationMode: 'all',
        landmarkMode: 'all',
        performanceMode: 'accurate',
      });

      if (faces.length > 0) {
        const face = faces[0];
        setFaceData(face);
        determineMood(face);
      } else {
        setFaceData(null);
        setMood('');
      }
    } catch (error) {
      console.error('Face detection error:', error);
    }
  };

  const determineMood = async face => {
    setPlaylist([]);
    setAlbums([]);
    setArtists([]);
    setTracks([]);
    const smilingProbability = face.smilingProbability ?? 0;
    const leftEyeOpenProbability = face.leftEyeOpenProbability ?? 0;
    const rightEyeOpenProbability = face.rightEyeOpenProbability ?? 0;
    // In JavaScript, the ?? operator is called the nullish coalescing operator.
    // It is used to provide a default value when the left - hand side expression
    // is either null or undefined.If the left - hand side expression is any other
    // falsy value(like false, 0, NaN, or an empty string), the left - hand side value
    // is returned.

    await new Promise(resolve => {
      if (smilingProbability > 0.6) {
        setMood('Very Happy');
      } else if (smilingProbability > 0.3) {
        setMood('Happy');
      } else if (
        leftEyeOpenProbability < 0.2 &&
        rightEyeOpenProbability < 0.2
      ) {
        setMood('Very Angry or Stressed');
      } else if (
        leftEyeOpenProbability < 0.4 &&
        rightEyeOpenProbability < 0.4
      ) {
        setMood('Angry or Stressed');
      } else if (smilingProbability < 0.1) {
        setMood('Very Sad');
      } else if (smilingProbability < 0.3) {
        setMood('Sad');
      } else {
        setMood('Neutral');
      }
      resolve();
    });
    await fetchResults();
  };

  const fetchResults = async () => {
    setPlaylist([]);
    setAlbums([]);
    setArtists([]);
    setTracks([]);
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const mood = await AsyncStorage.getItem('userMood');
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          mood,
        )} songs&type=track,album,playlist,artist&limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setPlaylist(data?.playlists?.items);
      setAlbums(data?.albums?.items);
      setArtists(data?.artists?.items);
      setTracks(data?.tracks?.items);

      if (data) {
        setLoading(false);
      }
    } catch (error) {
      console.log('Error while', error);
    }
  };

  const array = [
    {name: 'Playlists'},
    {name: 'Artists'},
    {name: 'Albums'},
    {name: 'Tracks'},
  ];

  const [value, setValue] = useState(0);
  const renderComponent = () => {
    if (value === 0) {
      return <PlayList data={playlist} navigation={navigation} />;
    } else if (value === 1) {
      return <Artist data={artists} navigation={navigation} />;
    } else if (value === 2) {
      return <Albums data={albums} navigation={navigation} />;
    } else {
      return <Tracks data={tracks} navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.light_dark} translucent={false} />
      {!mood ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.buttonContainer}>
            <Button
              icon={'image-outline'}
              color={'white'}
              onPress={uploadImage}
              title={'Choose Image'}
              style={{
                borderWidth: 1,
                borderColor: '#222',
                paddingHorizontal: 14,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            <Button
              icon={'camera-outline'}
              color={'white'}
              onPress={openCamera}
              title={'Open Camera'}
              style={{
                borderWidth: 1,
                borderColor: '#222',
                paddingHorizontal: 14,
                borderRadius: 40,
                backgroundColor: 'chocolate',
              }}
            />
          </View>
        </View>
      ) : (
        <>
          {loading ||
          (!faceData &&
            albums.length === 0 &&
            artists.length === 0 &&
            playlist.length === 0 &&
            tracks.length === 0) ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="chocolate" />
            </View>
          ) : (
            <>
              <View style={styles.types}>
                <IconBtn
                  icon={'arrow-back'}
                  color={colors.light}
                  size={20}
                  onPress={() => navigation.goBack()}
                />
                {array.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.toggleBtn}
                    onPress={() => {
                      setValue(index);
                    }}>
                    <Text
                      style={[
                        styles.text,
                        {
                          color:
                            value === index ? 'chocolate' : colors.light_text,
                        },
                      ]}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <ScrollView
                contentContainerStyle={{paddingHorizontal: 14}}
                removeClippedSubviews={false}
                showsVerticalScrollIndicator={false}>
                {renderComponent()}
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_dark,
  },
  header: {
    paddingHorizontal: 6,
    backgroundColor: colors.light_dark,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 6,
    paddingRight: 14,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 40,
    backgroundColor: '#ffffff10',
  },
  text: {
    fontFamily: font.Montserrat_Medium,
    color: colors.light,
    fontSize: 12,
  },
  noResult: {
    fontSize: 20,
    color: colors.light,
    fontFamily: font.Montserrat_SemiBold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FaceDetection;
