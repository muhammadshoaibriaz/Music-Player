export const categories = {
  musicCategories: {
    genres: [
      'Pop',
      'Rock',
      'Hip-Hop',
      'R&B',
      'Country',
      'Electronic',
      'Jazz',
      'Classical',
      'Indie',
      'Reggae',
      'Metal',
      'Blues',
    ],
    moods: [
      'Happy',
      'Sad',
      'Chill',
      'Energetic',
      'Romantic',
      'Focus',
      'Workout',
      'Sleep',
      'Party',
      'Stress Relief',
    ],
    activities: [
      'Running',
      'Studying',
      'Gaming',
      'Cooking',
      'Road Trip',
      'Yoga',
      'Celebrations',
      'Commuting',
    ],
    decades: ['60s', '70s', '80s', '90s', '2000s', '2010s'],
    newReleases: ['New Music Friday', 'Fresh Finds'],
    featuredPlaylists: [
      'Curated playlists for various themes, events, or seasons.',
    ],
    spotifyOriginalContent: [
      'Podcasts and exclusive content produced by Spotify.',
    ],
  },
};

// import React, {useState} from 'react';
// import {Button, Text, View, Image} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';

// export default function App() {
//   const [image, setImage] = useState(null);
//   const [emotion, setEmotion] = useState(null);

//   const imagePicker = async () => {
//     const response = await launchImageLibrary({
//       mediaType: 'photo',
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 1,
//       selectionLimit: 1,
//     });

//     if (response.assets && response.assets.length > 0) {
//       const imageUri = response.assets[0].uri;
//       setImage(imageUri);

//       // Call the Google Vision API with the selected image
//       detectEmotion(imageUri);
//     }
//   };

//   const detectEmotion = async imageUri => {
//     try {
//       const apiKey = 'YOUR_GOOGLE_CLOUD_VISION_API_KEY';
//       const body = JSON.stringify({
//         requests: [
//           {
//             image: {
//               source: {imageUri: imageUri},
//             },
//             features: [{type: 'FACE_DETECTION'}],
//           },
//         ],
//       });

//       const response = await fetch(
//         `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: body,
//         },
//       );

//       const result = await response.json();
//       const emotions = result.responses[0]?.faceAnnotations[0]?.joyLikelihood;
//       setEmotion(emotions);
//       console.log('Emotions:', emotions);
//     } catch (error) {
//       console.error('Error detecting emotions:', error);
//     }
//   };

//   return (
//     <View>
//       <Text>Emotion Detection</Text>
//       <Button title="Pick Image" onPress={imagePicker} />
//       {image && (
//         <View>
//           <Image source={{uri: image}} style={{width: 200, height: 200}} />
//         </View>
//       )}
//       {emotion && <Text>{`Detected emotion: ${emotion}`}</Text>}
//     </View>
//   );
// }
