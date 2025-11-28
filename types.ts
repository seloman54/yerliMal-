export type GamePhase = 'welcome' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'transition' | 'completed';

export interface GameState {
  currentLevel: number;
  totalScore: number;
  phase: GamePhase;
  playerName: string;
}

export interface LevelProps {
  onComplete: (score: number) => void;
  onFail: () => void;
  addScore: (amount: number) => void;
  currentScore: number;
}

export interface FallingItem {
  id: number;
  type: 'good' | 'bad';
  emoji: string;
  x: number; // percentage 0-100
  speed: number;
}

export interface ShoppingItem {
  id: number;
  name: string;
  price: number;
  isDomestic: boolean;
  emoji: string;
}

export interface RoomItem {
  id: number;
  name: string;
  isOn: boolean; // true means wasting energy/water
  type: 'light' | 'water' | 'device';
  room: string;
}

export interface FactoryItem {
  id: number;
  type: 'correct' | 'wrong';
  emoji: string;
  processed: boolean; // if clicked/sorted
}
