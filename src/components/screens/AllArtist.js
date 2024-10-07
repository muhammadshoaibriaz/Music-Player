import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants/color';
import {font} from '../constants/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function AllArtist({navigation}) {
  const [artist, setArtist] = useState([
    {
      id: 1,
      name: 'Taylor Swift',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/taylorswift.jpg',
      songs: [
        {title: 'Love Story', duration: '3:55'},
        {title: 'Shake It Off', duration: '3:39'},
        {title: 'Blank Space', duration: '3:51'},
      ],
    },
    {
      id: 2,
      name: 'Ed Sheeran',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/edsheeran.jpg',
      songs: [
        {title: 'Shape of You', duration: '3:53'},
        {title: 'Perfect', duration: '4:23'},
        {title: 'Castle on the Hill', duration: '4:21'},
      ],
    },
    {
      id: 3,
      name: 'Drake',
      genre: 'Hip-Hop',
      imageUrl: 'https://linktoimage.com/drake.jpg',
      songs: [
        {title: "God's Plan", duration: '3:19'},
        {title: 'In My Feelings', duration: '3:37'},
        {title: 'Hotline Bling', duration: '3:40'},
      ],
    },
    {
      id: 4,
      name: 'Ariana Grande',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/arianagrande.jpg',
      songs: [
        {title: 'Thank U, Next', duration: '3:27'},
        {title: '7 Rings', duration: '2:58'},
        {title: 'No Tears Left to Cry', duration: '3:25'},
      ],
    },
    {
      id: 5,
      name: 'Kendrick Lamar',
      genre: 'Hip-Hop',
      imageUrl: 'https://linktoimage.com/kendricklamar.jpg',
      songs: [
        {title: 'HUMBLE.', duration: '2:57'},
        {title: 'DNA.', duration: '3:06'},
        {title: 'Alright', duration: '3:39'},
      ],
    },
    {
      id: 6,
      name: 'Billie Eilish',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/billieeilish.jpg',
      songs: [
        {title: 'Bad Guy', duration: '3:14'},
        {title: "When the Party's Over", duration: '3:16'},
        {title: 'Ocean Eyes', duration: '3:20'},
      ],
    },
    {
      id: 7,
      name: 'Bruno Mars',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/brunomars.jpg',
      songs: [
        {title: 'Just the Way You Are', duration: '3:40'},
        {title: 'Uptown Funk', duration: '4:30'},
        {title: '24K Magic', duration: '3:46'},
      ],
    },
    {
      id: 8,
      name: 'Post Malone',
      genre: 'Hip-Hop',
      imageUrl: 'https://linktoimage.com/postmalone.jpg',
      songs: [
        {title: 'Rockstar', duration: '3:38'},
        {title: 'Circles', duration: '3:35'},
        {title: 'Sunflower', duration: '2:38'},
      ],
    },
    {
      id: 9,
      name: 'Lady Gaga',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/ladygaga.jpg',
      songs: [
        {title: 'Shallow', duration: '3:35'},
        {title: 'Bad Romance', duration: '4:54'},
        {title: 'Rain on Me', duration: '3:02'},
      ],
    },
    {
      id: 10,
      name: 'The Weeknd',
      genre: 'R&B',
      imageUrl: 'https://linktoimage.com/theweeknd.jpg',
      songs: [
        {title: 'Blinding Lights', duration: '3:20'},
        {title: 'Starboy', duration: '3:50'},
        {title: 'Heartless', duration: '3:18'},
      ],
    },
    {
      id: 11,
      name: 'Shawn Mendes',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/shawnmendes.jpg',
      songs: [
        {title: 'Stitches', duration: '3:27'},
        {title: 'Treat You Better', duration: '3:05'},
        {title: 'Señorita', duration: '3:11'},
      ],
    },
    {
      id: 12,
      name: 'Halsey',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/halsey.jpg',
      songs: [
        {title: 'Without Me', duration: '3:21'},
        {title: 'Bad at Love', duration: '3:01'},
        {title: 'Nightmare', duration: '3:50'},
      ],
    },
    {
      id: 13,
      name: 'Charlie Puth',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/charlieputh.jpg',
      songs: [
        {title: 'See You Again', duration: '3:49'},
        {title: 'Attention', duration: '3:13'},
        {title: 'One Call Away', duration: '3:12'},
      ],
    },
    {
      id: 14,
      name: 'Imagine Dragons',
      genre: 'Rock',
      imageUrl: 'https://linktoimage.com/imagine_dragons.jpg',
      songs: [
        {title: 'Believer', duration: '3:24'},
        {title: 'Thunder', duration: '3:07'},
        {title: 'Radioactive', duration: '3:06'},
      ],
    },
    {
      id: 15,
      name: 'Coldplay',
      genre: 'Rock',
      imageUrl: 'https://linktoimage.com/coldplay.jpg',
      songs: [
        {title: 'Fix You', duration: '4:55'},
        {title: 'Viva La Vida', duration: '4:02'},
        {title: 'Yellow', duration: '4:26'},
      ],
    },
    {
      id: 16,
      name: 'Dua Lipa',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/dualipa.jpg',
      songs: [
        {title: 'New Rules', duration: '3:29'},
        {title: "Don't Start Now", duration: '3:03'},
        {title: 'Levitating', duration: '3:23'},
      ],
    },
    {
      id: 17,
      name: 'Lil Nas X',
      genre: 'Hip-Hop',
      imageUrl: 'https://linktoimage.com/lilnasx.jpg',
      songs: [
        {title: 'Old Town Road', duration: '2:37'},
        {title: 'Panini', duration: '2:57'},
        {title: 'Montero (Call Me By Your Name)', duration: '2:18'},
      ],
    },
    {
      id: 18,
      name: 'Sia',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/sia.jpg',
      songs: [
        {title: 'Chandelier', duration: '3:36'},
        {title: 'Cheap Thrills', duration: '3:31'},
        {title: 'Elastic Heart', duration: '4:16'},
      ],
    },
    {
      id: 19,
      name: 'Maroon 5',
      genre: 'Pop',
      imageUrl: 'https://linktoimage.com/maroon5.jpg',
      songs: [
        {title: 'Sugar', duration: '3:55'},
        {title: 'Girls Like You', duration: '3:31'},
        {title: 'Memories', duration: '3:10'},
      ],
    },
    {
      id: 20,
      name: 'Nicki Minaj',
      genre: 'Hip-Hop',
      imageUrl: 'https://linktoimage.com/nickiminaj.jpg',
      songs: [
        {title: 'Super Bass', duration: '3:20'},
        {title: 'Anaconda', duration: '4:01'},
        {title: 'Starships', duration: '3:30'},
      ],
    },
  ]);

  const fetchMultipleArtists = async artistIds => {
    const accessToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`https://api.spotify.com/v1/artists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          ids: artistIds.join(','), // Join the array of artist IDs into a comma-separated string
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };
  // Example usage:
  const artistIds = ['1vCWHaC5f2uS3yhpwWbIA6', '3TVXtAsR1Inumwj472S9r4']; // Replace with actual artist IDs
  fetchMultipleArtists(artistIds);

  console.log('AllArtist component render');
  return (
    <View style={styles.artist}>
      <View style={styles.header}>
        <Text onPress={() => {}} style={styles.headerTitle}>
          All Artist
        </Text>
      </View>
      <FlatList
        data={artist}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: 14,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.card}>
              <Image
                source={require('../../assets/images/hero-dynamic.jpg')}
                style={styles.cardImage}
              />
              <View style={styles.details}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.role}>{item?.genre} </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  headerSubtitle: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Medium,
  },
  name: {
    // fontSize: 1,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  role: {
    color: colors.light_text,
    fontFamily: font.Montserrat_Regular,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  card: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: 12,
    flex: 1,
  },
});
