/* eslint-disable react/react-in-jsx-scope */
import {Provider} from 'react-redux';
import store from './src/components/reduxtolkit/store';
import {PlayingProvider} from './src/components/context/PlayingContext';
import {AppNavigator} from './src/components/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PlayingProvider>
        <AppNavigator />
      </PlayingProvider>
    </Provider>
  );
}

// import React, {useEffect, useRef, useState} from 'react';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// import {StyleSheet, View, Button, Text, Alert} from 'react-native';

// const App = () => {
//   const camera = useRef(null);
//   const [hasPermission, setHasPermission] = useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back; // Use the back camera if available

//   useEffect(() => {
//     const requestPermission = async () => {
//       const status = await Camera.requestCameraPermission();
//       if (status === 'denied') {
//         Alert.alert(
//           'Permission Denied',
//           'Camera permission is required to use this feature.',
//         );
//       }
//       setHasPermission(status === 'authorized');
//     };

//     requestPermission();
//   }, []);

//   useEffect(() => {
//     console.log('Available devices:', devices); // Log all devices
//   }, [devices]);

//   // Handle the loading state while the camera is being fetched
//   if (device == null) {
//     return <Text>Loading...</Text>;
//   }

//   const takePhoto = async () => {
//     if (camera.current) {
//       try {
//         const photo = await camera.current.takePhoto({
//           flash: 'on',
//           qualityPrioritization: 'quality',
//         });
//         console.log(photo); // Log the photo data
//       } catch (error) {
//         console.error('Error taking photo:', error); // Log any errors
//       }
//     }
//   };

//   // Check if permission has been granted
//   if (!hasPermission) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         ref={camera}
//         device={device}
//         isActive={true}
//         photo={true}
//       />
//       <Button title="Take Photo" onPress={takePhoto} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
// });

// export default App;
