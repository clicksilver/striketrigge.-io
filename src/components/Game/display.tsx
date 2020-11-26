import React, {useState} from "react";
import { GameState, MapCoord } from "./types";
import { indexToCoord } from "./logic";
import Controls from "./control";
import { ActionContext, ActionType, canDispatchAction, updateActionContext } from "./actions";

// Map Rendering parameters
const map_width = 700;
const map_height = 400;
const cell_width = 200;
const cell_height = 75;
const padding = 5;

interface DisplayProps {
  G: GameState;
}

const Display = ({G}: DisplayProps) => {
  var [selected_cell, setSelectedCell] = useState<number | undefined>();
  // var [selected_token, setSelectedToken] = useState<string | undefined>();
  var [action, setAction] = useState(ActionType.NONE);
  var [action_ctx, setActionContext] = useState<ActionContext>({});
  
  const onSelectCell = (cell_id: number) => {
    console.log(`cell ${cell_id} clicked`);
    if (selected_cell && selected_cell === cell_id) {
      console.log('deselected');
      setSelectedCell(undefined);
    } else {
      console.log('selected');
      setSelectedCell(cell_id);
    }
    setActionContext(updateActionContext(action, action_ctx, cell_id));
  };

  if (canDispatchAction(action, action_ctx)) {
    alert("Action Dispatched!");
    setActionContext({});
  }

  // const onSelectToken = (token_id: string) {
  //   if (selected_token && selected_token == token_id) {
  //     setSelectedToken(undefined);
  //   } else {
  //     setSelectedToken(token_id);
  //   }
  // };

  return (
    <div>
      <div style={{
            width: map_width + 'px',
            height: map_height + 'px',
            position: 'relative',
          }}>
        { 
          G.cells.map((game_cell) => {
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
      <Controls setAction={(action: ActionType) => { setAction(action); }} />
    </div>
  );
}

export default Display;