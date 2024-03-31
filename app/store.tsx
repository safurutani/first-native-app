import { Reducer, applyMiddleware, configureStore } from '@reduxjs/toolkit';
import rootReducer, { GameAction, GameState, RootState } from './reducers';
import { loadState, saveState } from './storage';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';

const persistedState = loadState();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
//store.dispatch({ type: 'LOAD_GAME_STATE', payload: persistedState });

store.subscribe(() => {
  saveState(store.getState());
});

export const persistor = persistStore(store);