import { Ctx, Game } from "boardgame.io";
import { GameState, MatchResult } from "./types";

const setup = (): GameState => {
  var gameState: GameState = { scores: { '0': 0, '1': 0 } };
  return gameState;
};

const rollDice = (gameState: GameState, ctx: Ctx) => {
  const player = ctx.currentPlayer as string;
  const value = Math.floor(Math.random() * Math.floor(6));
  console.log("Player " + player + " rolled a " + value);
  let score = gameState.scores[player] as number;
  score = (score === undefined ? 0 : score) + value;
  console.log("Player " + player + " score: " + score);
  gameState.scores[player] = score;
};

const endIf = (gameState: GameState, ctx: Ctx): MatchResult | void => {
  const players = ["0", "1"];
  for (const player of players) {
    let score = gameState.scores[player];
    if (score !== undefined && score > 10) {
      return { winner: player };
    }
  }
};

/** Represents a game. */
const MyGame: Game<GameState, Ctx> = {
  name: "game",
  setup: setup,
  moves: { rollDice },
  turn: { moveLimit: 1 },
  endIf: endIf,
};

export default MyGame;