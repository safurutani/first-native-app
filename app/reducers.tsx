import { Reducer, combineReducers } from '@reduxjs/toolkit';

export interface Game {
  id: string;
  score: number;
  letters: string;
  criticalLetter: string;
  foundWords: string[];
  dateCreated: string;
}

export interface GameState {
  games: Game[];
}
export const initialState: GameState = {
  games: [],
};

export const ADD_GAME = 'ADD_GAME';
export const REMOVE_GAME = 'REMOVE_GAME';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_FOUND_WORDS = 'UPDATE_FOUND_WORDS';
export const LOAD_GAME_STATE = 'LOAD_GAME_STATE';

export interface AddGameAction {
  type: typeof ADD_GAME;
  payload: Game;
}

export interface RemoveGameAction {
  type: typeof REMOVE_GAME;
  payload: string;
}

export interface UpdateScoreAction {
  type: typeof UPDATE_SCORE;
  payload: { id: string; score: number };
}

export interface UpdateFoundWordsAction {
  type: typeof UPDATE_FOUND_WORDS;
  payload: { id: string; foundWords: string[] };
}

export interface LoadGameStateAction {
  type: typeof LOAD_GAME_STATE;
  payload: GameState;
}

export type GameAction =
  | AddGameAction
  | RemoveGameAction
  | UpdateScoreAction
  | UpdateFoundWordsAction
  | LoadGameStateAction;


const gameReducer: Reducer<GameState, GameAction> = (state:GameState = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case ADD_GAME:
      return {
        ...state,
        games: [...state.games, action.payload],
      };
    case REMOVE_GAME:
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload),
      };
      case UPDATE_SCORE:
        const { id, score } = action.payload;
        return {
          ...state,
          games: state.games.map((game) =>
            game.id === id ? { ...game, score: score } : game
          ),
        };
      case UPDATE_FOUND_WORDS:
        const { id: foundWordsId, foundWords } = action.payload;
        return {
          ...state,
          games: state.games.map((game) =>
            game.id === foundWordsId ? { ...game, foundWords: foundWords } : game
          ),
        };
      case LOAD_GAME_STATE:
        return {
          ...state,
          games: action.payload.games,
        }
    default:
      return state;
  }
};

const rootReducer: Reducer<{ game: GameState; }, GameAction, Partial<{ game: never; }>> = combineReducers({
  game: gameReducer,
});
export type RootState = ReturnType<Reducer< { game: GameState; }, GameAction, Partial<{ game: never; }>>>;
export default rootReducer;