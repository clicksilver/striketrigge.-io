export enum CellStates {
  // Whether a team may spawn or respawn here
  RED_SPAWN,
  BLU_SPAWN,
  
  // The permanent spawn location for a team
  RED_HOME,
  BLU_HOME,

  // A capture-able zone
  NEU_ZONE,
  RED_ZONE,
  BLU_ZONE
};

export enum ActionType {
  NONE,
  MOVE,
};

export interface GameCell {
  id: number;
  players: number[];
  states: CellStates[]; 
};

export interface GameState {
  scores: Record<string, number>;
  cells: Array<GameCell>; 
  // player_pos[player] = cell_index
  player_pos: number[];
}

export interface MatchResult {
  winner: string;
}

export interface MapCoord {
  x: number;
  y: number;
}