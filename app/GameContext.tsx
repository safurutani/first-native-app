// GameContext.tsx

import React, { ReactNode, createContext, useContext, useReducer } from 'react';

interface Game {
  id: number;
  score: number;
  letters: string;
  criticalLetter: string;
  foundWords: string[];
}

interface GameState {
  games: Game[];
}

interface GameProviderProps {
  children: ReactNode
}

const initialState: GameState = {
  games: [],
};

export const GameContext = createContext<{
  state: GameState;
  addGame: (game: Game) => void;
  removeGame: (id: number) => void;
  updateGame: (id: number, updatedGame: Partial<Game>) => void;
  checkDuplicate: (letters: string, criticalLetter: string) => boolean;
}>({
  state: initialState,
  addGame: () => {},
  removeGame: () => {},
  updateGame: () => {},
  checkDuplicate: () => false,
});

const gameReducer = (state: GameState, action: { type: string; payload: any }): GameState => {
  switch (action.type) {
    case 'ADD_GAME':
      return { ...state, games: [...state.games, action.payload] };
    case 'REMOVE_GAME':
      return { ...state, games: state.games.filter((game) => game.id !== action.payload) };
    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.id ? { ...game, ...action.payload.updatedGame } : game
        ),
      };
    default:
      return state;
  }
};

let nextId = 1;
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const addGame = (game: Game) => {
    dispatch({ type: 'ADD_GAME', payload: { ...game, id: state.games.length + 1 } });
    nextId++;
  };

  const removeGame = (id: number) => {
    dispatch({ type: 'REMOVE_GAME', payload: id });
  };

  const updateGame = (id: number, updatedGame: Partial<Game>) => {
    dispatch({ type: 'UPDATE_GAME', payload: { id, updatedGame } });
  };

  const checkDuplicate = (letters: string, criticalLetter: string) => {
    return state.games.some((game) => game.letters === letters && game.criticalLetter === criticalLetter);
  };

  return (
    <GameContext.Provider value={{ state, addGame, removeGame, updateGame, checkDuplicate }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
