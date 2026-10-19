// src/types/index.ts
export interface Card {
  id: number;
  level: 'PICANTE' | 'ROJA' | 'AMARILLA' | 'VERDE' | 'CELESTE';
  text: string;
  drinks: number;
  category: string;
  effect?:
    | 'reverse'
    | 'skip'
    | 'draw_two'
    | 'wild'
    | 'swap_players'
    | 'all_drink'
    | 'team_challenge'
    | 'cascade'
    | 'role_play';
}

export interface Player {
  id: string;
  name: string;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  deck: Card[];
  used: Card[];
  started: boolean;
}