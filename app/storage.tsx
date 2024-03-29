import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@MyApp:state';

export const saveState = async (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log("saved" + serializedState);
    await AsyncStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    console.log("loaded" + serializedState);
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
};
