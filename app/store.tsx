import { Reducer, applyMiddleware, configureStore } from '@reduxjs/toolkit';
import rootReducer, { GameAction, GameState, RootState } from './reducers';
import { loadState, saveState } from './storage';
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { thunk } from 'redux-thunk';

const persistedState = loadState();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer<any, any >(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(thunk),
});

store.subscribe(() => {
  console.log("state updated", store.getState())
  const currentState = store.getState();
  if (currentState.game.games && currentState.game.games.length > 0) {
    saveState(currentState);
  } else {
    saveState({game: {games: [] }});
  }
  
});

export const persistor = persistStore(store);

export { RootState };
