export interface GameState {
  scores: Record<string, number>;
}

export interface MatchResult {
  winner: string;
}
