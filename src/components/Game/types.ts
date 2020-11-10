export interface GameState {
  // TODO: why does everything break when I use Map<string, number> instead?
  scores: Record<string, number>;
}

export interface MatchResult {
  winner: string;
}
