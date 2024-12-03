/* eslint-disable react/react-in-jsx-scope */
import {Provider} from 'react-redux';
import {persistor, store} from './src/components/reduxtolkit/store';
import {PlayingProvider} from './src/components/context/PlayingContext';
import {AppNavigator} from './src/components/navigation/AppNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import CustomInfiniteScroll from './src/components/custom/CustomInfinitScroll';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PlayingProvider>
          <AppNavigator />
        </PlayingProvider>
      </PersistGate>
    </Provider>
    // <CustomInfiniteScroll />
  );
}
