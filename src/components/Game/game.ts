import { Ctx, Game } from "boardgame.io";
import {
  GameState,
  MatchResult, 
  GameCell, 
  CellStates
} from "./types";

const setup = (): GameState => {
  var cells: GameCell[] = [];
  for(var i=0; i<9; i++) {
    cells.push({id: i, players: [], states: []})
  }

  // Red Team
  cells[0].players = [0];
  cells[0].states = [CellStates.RED_HOME];

  // Blue Team
  cells[8].players = [1];
  cells[8].states = [CellStates.BLU_HOME];

  // Neutral capture zones
  cells[1].states = [CellStates.NEU_ZONE]
  cells[5].states = [CellStates.NEU_ZONE]
  cells[6].states = [CellStates.NEU_ZONE]

  var gameState: GameState = { 
    scores: { '0': 0, '1': 0 },
    cells: cells,
  };
  return gameState;
};

const rollDice = (gameState: GameState, ctx: Ctx) => {
  const player = ctx.currentPlayer as string;
  const value = ctx.random!.D6();
  console.log("Player " + player + " rolled a " + value);
  let score = gameState.scores[player] as number;
  score = score + value;
  console.log("Player " + player + " score: " + score);
  gameState.scores[player] = score;
};

const endIf = (gameState: GameState, ctx: Ctx): MatchResult | void => {
  const players = ["0", "1"];
  for (const player of players) {
    let score = gameState.scores[player] as number;
    if (score > 10) {
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