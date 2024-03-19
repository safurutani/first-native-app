import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/components/useColorScheme';
import TabLayout from './(tabs)/_layout';
import GameScreen from './gamescreen';

const Stack = createStackNavigator();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  React.useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    const hideSplash = async () => {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="index">
          <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} />
          <Stack.Screen name="modal" component={GameScreen} options={{ presentation: 'modal' }} />
        </Stack.Navigator>
    </ThemeProvider>
  );
}
