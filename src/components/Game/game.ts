import { Ctx, Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import {
  GameState,
  MatchResult, 
  GameCell, 
  CellStates,
  MapCoord
} from "./types";
import { indexToCoord } from "./logic";

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

  var game_state: GameState = { 
    scores: { '0': 0, '1': 0 },
    cells: cells,
    player_pos: [0, 8],
  };
  return game_state;
};

const rollDice = (game_state: GameState, ctx: Ctx) => {
  const player = ctx.currentPlayer as string;
  const value = ctx.random!.D6();
  console.log("Player " + player + " rolled a " + value);
  let score = game_state.scores[player] as number;
  score = score + value;
  console.log("Player " + player + " score: " + score);
  game_state.scores[player] = score;
};

const moveToken = (game_state: GameState, ctx: Ctx, dst_index: number) => {
  const player = ctx.currentPlayer === '0' ? 0 : 1;
  const src_index = game_state.player_pos[player];
  console.log(`player ${player} at ${src_index} attempts to enter ${dst_index}`);

  const src_coord = indexToCoord(src_index) as MapCoord;
  const dst_coord = indexToCoord(dst_index) as MapCoord;

  if (Math.abs(src_coord.x - dst_coord.x) <= 1 &&
      Math.abs(src_coord.y - dst_coord.y) <= 1) {
    // Update the player's tracking.
    game_state.player_pos[player] = dst_index;
    // Remove from source position.
    game_state.cells[src_index].players = 
      game_state.cells[src_index].players.filter( (p) => {
        return p !== player;
      });
    // Add to destination position.
    game_state.cells[dst_index].players.push(player);
  } else {
    return INVALID_MOVE;
  }
};

const endIf = (game_state: GameState, ctx: Ctx): MatchResult | void => {
  const players = ["0", "1"];
  for (const player of players) {
    let score = game_state.scores[player] as number;
    if (score > 10) {
      return { winner: player };
    }
  }
};

/** Represents a game. */
const MyGame: Game<GameState, Ctx> = {
  name: "game",
  setup: setup,
  moves: { rollDice, moveToken },
  turn: { moveLimit: 1 },
  endIf: endIf,
};

export default MyGame;