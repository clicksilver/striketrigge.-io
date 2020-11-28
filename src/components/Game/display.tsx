import React from "react";
import { GameCell, MapCoord } from "./types";
import { indexToCoord } from "./logic";
import { ActionContext, ActionType } from "./actions";
import { getCellStyle } from "./action_helpers";

// Map Rendering parameters
const map_width = 700;
const map_height = 400;
const cell_width = 200;
const cell_height = 75;
const padding = 5;

interface DisplayProps {
  game_cells: GameCell[];
  onSelectCell: (cell_id: number) => void;
  action: ActionType,
  action_context: ActionContext,
}

const Display = ({game_cells, onSelectCell, action, action_context}: DisplayProps) => {
  return (
      <div style={{
            width: map_width + 'px',
            height: map_height + 'px',
            position: 'relative',
          }}>
        { 
          game_cells.map((game_cell) => {
            const coord = indexToCoord(game_cell.id) as MapCoord;
            // Tile the map cells:
            //   0
            //  1 2
            // 3 4 5
            //  6 7
            //   8
            const num_row_cells = 3 - Math.abs(coord.x - 2);
            const leftmost_edge = (map_width - num_row_cells * (cell_width + padding)) / 2;
            return (
              <div style = {{
                    border: '1px solid black',
                    lineHeight: 0,
                    textIndent: 5,
                    width: cell_width + 'px',
                    height: cell_height + 'px',
                    position: 'absolute',
                    left: (leftmost_edge + coord.y * (cell_width + padding)) + 'px',
                    top: (padding + coord.x * (cell_height + padding)) + 'px',
                    ...getCellStyle(action, action_context, game_cell.id),
                  }}
                  key={game_cell.id}
                  onClick={() => onSelectCell(game_cell.id)}>
                <p>Cell: {game_cell.id}</p>
                <p>States: {game_cell.states.toString()}</p>
                <p>Player: {game_cell.players.toString()}</p>
              </div>
            );
          })
        }
      </div>
  );
}

export default Display;