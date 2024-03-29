import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { loadState, saveState } from './storage';

const persistedState = loadState();
const store = configureStore({
  reducer: rootReducer,
});
store.dispatch({ type: 'LOAD_GAME_STATE', payload: persistedState });

store.subscribe(() => {
  saveState(store.getState());
});
export type RootState = ReturnType<typeof rootReducer>;
export default store;