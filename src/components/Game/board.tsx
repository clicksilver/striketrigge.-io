import React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState, CellStates, MapCoord } from "./types";
import { indexToCoord } from "./logic";

import CSS from "csstype";

// Map Rendering parameters
const map_width = 700;
const map_height = 400;
const cell_width = 200;
const cell_height = 75;
const padding = 5;

interface MapCell {
  id: number;
  contents: any[];
  // for rendering the box and position
  css: Readonly<CSS.Properties>;
};

interface Map {
  cells: MapCell[];
  css: Readonly<CSS.Properties>;
};

function getCellContents(
  states: CellStates[], 
  players: number[]): {
    states: string, 
    players: string
  } {
  var state_str: string = '';
  states.forEach((s, i) => {
    state_str += `${s}` + (i === states.length-1 ? '' : ', '); 
  })
  var player_str: string = '';
  players.forEach((p, i) => {
    player_str += `${p}` + (i === players.length-1 ? '' : ',');
  })
  return {
    states: state_str,
    players: player_str
  };
}

function createMap(G: GameState): Map {
  let cell_list: MapCell[] = [];

  G.cells.forEach((game_cell) => {
    const coord = indexToCoord(game_cell.id) as MapCoord;
    // Tile the map cells 1-2-3-2-1 vertically.
    const num_row_cells = 3 - Math.abs(coord.x - 2);
    const leftmost_edge = (map_width - num_row_cells * (cell_width + padding))/2;
    const statesAndPlayers = getCellContents(game_cell.states, game_cell.players);
    const map_cell: MapCell = {
      id: game_cell.id,
      // Represent the contents of the cell as text.
      contents: [
        <p>Cell: {game_cell.id}</p>,
        <p>States: {statesAndPlayers.states}</p>,
        <p>Player: {statesAndPlayers.players}</p>,
      ],
      // Defines a rectangular box that represents a single cell.
      css: {
        border: '1px solid black',
        lineHeight: 0,
        textIndent: "5",
        width: cell_width + 'px',
        height: cell_height + 'px',
        position: 'absolute',
        left: (leftmost_edge + coord.y * (cell_width + padding)) + 'px',
        top: (padding + coord.x * (cell_height + padding)) + 'px',
      }
    };
    cell_list.push(map_cell);
  })

  return {
    cells: cell_list,
    css: {
      width: map_width + 'px',
      height: map_height + 'px',
      position: 'relative',
    }
  }
}

const MyBoard = ({G, ctx, moves, isActive}: BoardProps<GameState>) => {
  const game_map: Map = createMap(G);

  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          <div style={game_map.css}>
            {
              game_map.cells.map((cell) => 
                <div 
                  key={cell.id}
                  style={cell.css}
                  onClick={ 
                    () => console.log(`${cell.id} was clicked.`) 
                  }
                >
                  {cell.contents}
                </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBoard;
