import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { loadState, saveState } from './storage';

const store = configureStore({
  reducer: rootReducer,
});
//store.dispatch({ type: 'LOAD_GAME_STATE', payload: loadState() });
console.log('Initial state after loading:', store.getState());

store.subscribe(() => {
  console.log("state updated", store.getState())
  if (store.getState() == undefined) {
    saveState({game: {games: []}})
  }
  saveState(loadState());
});
export type RootState = ReturnType<typeof rootReducer>;
export default store;