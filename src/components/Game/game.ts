import { Ctx, Game } from "boardgame.io";
import { GameState, MatchResult } from "./types";

const setup = (): GameState => {
  var G: GameState = { scores: { '0': 0, '1': 0 } };
  return G;
};

const rollDice = (G: GameState, ctx: Ctx) => {
  const player = ctx.currentPlayer as string;
  const value = Math.floor(Math.random() * Math.floor(6));
  console.log("Player " + player + " rolled a " + value);
  let score = G.scores[player] as number;
  score = (score === undefined ? 0 : score) + value;
  console.log("Player " + player + " score: " + score);
  G.scores[player] = score;
};

const endIf = (G: GameState, ctx: Ctx): MatchResult | void => {
  const players = ["0", "1"];
  for (const player of players) {
    let score = G.scores.player;
    if (score !== undefined && score > 10) {
      return { winner: player };
    }
  }
};

/** Represents a game. */
export const game: Game<GameState, Ctx> = {
  name: "game",
  setup: setup,
  moves: { rollDice },
  turn: { moveLimit: 1 },
  endIf: endIf,
};
