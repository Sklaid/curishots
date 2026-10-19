// src/context/GameContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Player, Card } from '../types';

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  deck: [],
  used: [],
  started: false,
};

type Action =
  | { type: 'ADD_PLAYERS'; payload: Player[] }
  | { type: 'START_GAME'; payload: Card[] }
  | { type: 'DRAW_CARD' }
  | { type: 'RESET_GAME' };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return { ...state, players: action.payload };
    case 'START_GAME':
      return {
        ...state,
        deck: action.payload,
        used: [],
        currentPlayerIndex: 0,
        started: true,
      };
    case 'DRAW_CARD':
      if (!state.started || state.deck.length === 0) return state;
      const [next, ...rest] = state.deck;
      return {
        ...state,
        deck: rest,
        used: [...state.used, next],
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      };
    case 'RESET_GAME':
      // Sólo reinicia la partida y el mazo, **no toca** `players`
      return {
        ...state,
        deck: [],
        used: [],
        currentPlayerIndex: 0,
        started: false,
      };
    default:
      return state;
  }
}

const GameContext = createContext<
  { state: GameState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
