import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
// import Index from './src';
import RootNavigation from './src/navigation';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { PersistGate } from 'redux-persist/integration/react';
import { NetworkProvider } from 'react-native-offline';

// Uncomment this when you need to clear the persisted store
// TODO: Does not work if this does not exist?
// persistor.purge();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <View />;
  }
  
  return (
    <Provider store={store}>
      <NetworkProvider pingInterval={5000}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle = 'dark-content' />
          <RootNavigation />
        </PersistGate>
      </NetworkProvider>
    </Provider>
  );
}
