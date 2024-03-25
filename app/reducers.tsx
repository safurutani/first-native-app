import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Game {
    id: number,
    score: number;
    letters: string;
    criticalLetter: string;
    foundWords: string[];
    dateCreated: string;
}
interface GameState {
  games: Game[],
};
const initialState: GameState = {
    games: [],
}

const gameSlice = createSlice({
    initialState,
    reducers: {
        addGame(state, action: PayloadAction<Game>) {
            if (!state.games.some((game) => game.letters === action.payload.letters && game.criticalLetter === action.payload.criticalLetter)) {
                state.games.push(action.payload);
            }
            else {
                alert("A game with this combination already exists.")
                return;
            }
        },
        removeGame(state, action: PayloadAction<number>) {
            state.games = state.games.filter((game) => game.id !== action.payload);
        },
        updateGame(state, action: PayloadAction<Game>) {
            const index = state.games.findIndex((game) => game.id === action.payload.id);
            if (index !== -1) {
                state.games[index] = action.payload;
            }
        }
        // Add other reducers here
    },
    name: 'gameList'
});

export const { addGame, removeGame, updateGame } = gameSlice.actions;
export default gameSlice.reducer;