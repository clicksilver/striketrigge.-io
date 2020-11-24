import React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState, CellStates} from "./types";

import CSS from "csstype";

// Map Rendering parameters
const map_width = 700;
const map_height = 400;
const cell_width = 200;
const cell_height = 75;
const padding = 5;

interface MapCell {
  id: number;
  contents: string;
  // for rendering the box and position
  css: Readonly<CSS.Properties>;
};

interface Map {
  cells: MapCell[];
  css: Readonly<CSS.Properties>;
};

interface MapCoord {
  x: number;
  y: number;
}

function indexToCoord(index: number): MapCoord | undefined {
  switch(index) {
    case 0: { return {x:0, y:0}; }
    case 1: { return {x:1, y:0}; }
    case 2: { return {x:1, y:1}; }
    case 3: { return {x:2, y:0}; }
    case 4: { return {x:2, y:1}; }
    case 5: { return {x:2, y:2}; }
    case 6: { return {x:3, y:0}; }
    case 7: { return {x:3, y:1}; }
    case 8: { return {x:4, y:0}; }
  }  
  return undefined;
}

function getCellContents(states: CellStates[], players: number[]): string {
  var state_str: string = '';
  states.forEach((s, i) => {
    state_str += `${s}` + (i === states.length-1 ? '' : ', '); 
  })

  var player_str: string = '';
  players.forEach((p, i) => {
    player_str += `${p}` + (i === players.length-1 ? '' : ',');
  })

  return `States: [${state_str}] Players: [${player_str}]`;
}

function createMap(G: GameState): Map {
  let cell_list: MapCell[] = [];

  G.cells.forEach((game_cell) => {
    const coord = indexToCoord(game_cell.id) as MapCoord;
    // Tile the map cells 1-2-3-2-1 vertically.
    const num_row_cells = 3 - Math.abs(coord.x - 2);
    const leftmost_edge = (map_width - num_row_cells * (cell_width + padding))/2;
    const map_cell: MapCell = {
      id: game_cell.id,
      contents: getCellContents(game_cell.states, game_cell.players),
      css: {
        border: '1px solid black',
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
