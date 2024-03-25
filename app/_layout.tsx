import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/components/useColorScheme';
import TabLayout from './(tabs)/_layout';
import GameScreen from './GameScreen';
import { GameProvider } from './GameContext';
import { Provider } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  React.useEffect(() => {
    const loadFonts = async () => {
      await SplashScreen.hideAsync();
    };

    if (loaded) {
      loadFonts();
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GameProvider>
      <Provider store={store}>

      
        <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} />
            <Stack.Screen name="GameScreen" component={GameScreen} initialParams={{ selectedLetters: '' }} />
          </Stack.Navigator>
        </ThemeProvider>
      </Provider>
    </GameProvider>
    
  );
}
