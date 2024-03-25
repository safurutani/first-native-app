import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers'

const store = configureStore({
  reducer: {
    game: gameReducer,
    // Add other reducers here
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;