import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/components/useColorScheme';
import TabLayout from './(tabs)/_layout';
import GameScreen from './GameScreen';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { loadState } from './storage';
import { PersistGate } from 'redux-persist/integration/react';


const Stack = createStackNavigator();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    OxygenMono: require('../assets/fonts/OxygenMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  React.useEffect(() => {

    const loadGameState = async () => {
      const gameState = await loadState();
      if (gameState) {
        store.dispatch({ type: 'LOAD_GAME_STATE', payload: gameState });
      }
    };
    loadGameState();
    return () => {
      // Cleanup if needed
    };

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false}} />
          <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerTitle: 'Wordsmith', headerTitleAlign: 'center',
    }} initialParams={{ selectedLetters: '' }} />
        </Stack.Navigator>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
