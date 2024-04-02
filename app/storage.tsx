import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialState } from './reducers';

const STORAGE_KEY = '@MyApp:state';

export const saveState = async (state: any) => {
  if (state == null || state == undefined) {
    console.warn('State is null or undefined. Not saving.');
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    console.log("saved" + serializedState);
    await AsyncStorage.setItem(STORAGE_KEY, serializedState);
    console.log("saved successfully")
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return initialState;
    }
    console.log("loaded: ", serializedState);
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
};
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};
