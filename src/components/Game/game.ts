import { Ctx, Game } from "boardgame.io";
import { G, MatchResult } from "./types";

const setup = (): G => {
  let scores = new Map<string, number>();
  scores.set("0", 0);
  scores.set("1", 0);
  return { scores };
};

const rollDice = (G: G, ctx: Ctx) => {
  const player = ctx.currentPlayer as string;
  const value = Math.floor(Math.random() * Math.floor(6));
  let score = G.scores.get(player);
  score = (score === undefined ? 0 : score) + value;
  console.log("Player " + player + " rolled a " + value + "(score: " + score + ")")
  G.scores.set(player, score);
};

const endIf = (G: G, ctx: Ctx): MatchResult | void => {
  const players = ["0", "1"];
  for (const player of players) {
    let score = G.scores.get(player);
    if (score !== undefined && score > 10) {
      return { winner: player };
    }
  }
};

/** Represents a game. */
export const game: Game<G, Ctx> = {
  name: "game",
  setup: setup,
  moves: { rollDice },
  turn: { moveLimit: 1 },
  endIf: endIf,
};
