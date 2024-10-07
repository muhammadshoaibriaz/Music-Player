import React from 'react';
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

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useState} from 'react';
// import {View, Text, Button, ActivityIndicator} from 'react-native';

// const App = () => {
//   const [orderStatus, setOrderStatus] = useState(
//     'Order has not been placed yet.',
//   );
//   const [loading, setLoading] = useState(false);

//   const orderFood = async () => {
//     setLoading(true);
//     const token = await AsyncStorage.getItem('token');
//     return new Promise((resolve, reject) => {
//       fetch(
//         'https://api.spotify.com/v1/artists/6U5BSRuKoLbpIoYJMdmNT2/top-tracks',
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       )
//         .then(res => {
//           if (!res.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return res.json();
//         })
//         .then(data => {
//           console.log(data);
//           setOrderStatus('Request Accepted and we are preparing your order!');
//           setTimeout(() => {
//             if (data) {
//               return resolve('Order has been placed successfully!');
//             } else {
//               return reject('Request failed');
//             }
//           }, 2000);
//         })
//         .catch(error => {
//           console.log('Error while fetching data:', error);
//           reject('Failed to fetch data');
//         });
//     });
//   };

//   const handleOrder = () => {
//     setOrderStatus('Sending request...');
//     orderFood()
//       .then(message => {
//         setOrderStatus(message);
//       })
//       .catch(error => {
//         setOrderStatus(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <View style={{padding: 20}}>
//       <Text style={{fontSize: 20, marginBottom: 20}}>{orderStatus}</Text>
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}
//       {!loading && <Button title="Order Food" onPress={handleOrder} />}
//     </View>
//   );
// };

// export default App;
