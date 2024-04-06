import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/components/useColorScheme';
import TabLayout from './(tabs)/_layout';
import GameScreen from './gamescreen';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import ModalScreen from './modal';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    OxygenMono: require('../assets/fonts/OxygenMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false, }} />
          <Stack.Screen
              name="gamescreen"
              component={GameScreen}
              options={({ navigation }) => ({
                headerTitle: 'Wordsmith',
                headerTitleAlign: 'center',
                headerLeft: () => (
                  <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                     <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                ),
              })}
              initialParams={{ selectedLetters: '' }}
            />
          <Stack.Screen name="modal" component={ModalScreen} options={({ navigation }) => ({
                headerTitle: '',
                headerLeft: () => (
                  <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                     <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                ),
              })} /> 
        </Stack.Navigator>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  back: {
    height: 48, 
    width: 48, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})