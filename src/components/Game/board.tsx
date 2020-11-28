import React, {useState} from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./types";

import Display from "./display";
import Controls from "./control";
import {
  ActionContext,
  ActionType, 
} from "./actions";
import {
  canDispatchAction, 
  updateActionContext 
} from "./action_helpers";

const MyBoard = ({G, ctx, moves, isActive}: BoardProps<GameState>) => {
  var [selected_cell, setSelectedCell] = useState<number | undefined>();
  var [action, setAction] = useState(ActionType.NONE);
  var [action_context, setActionContext] = useState<ActionContext>(undefined);

  const onSelectCell = (cell_id: number) => {
    if (selected_cell === cell_id) {
      setSelectedCell(undefined);
    } else {
      setSelectedCell(cell_id);
      setActionContext(updateActionContext(action, action_context, cell_id));
    }
  };

  const onConfirmCb = () => {
    if (canDispatchAction(action, action_context)) {
      const cell_id = action_context?.destination_cell as number;
      moves.moveToken!(cell_id);
      setAction(ActionType.NONE);
      setActionContext(undefined);
      setSelectedCell(undefined);
    } else {
      alert("Incomplete action");
    }
  };

  const localG = G as GameState;
  
  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          <Display
            game_cells={localG.cells}
            onSelectCell={action !== ActionType.NONE ? onSelectCell : ()=>{} }
            action={action}
            action_context={action_context}
          />
        </div>
      </div>
      <Controls 
        setAction={(action: ActionType) => { 
          setAction(action); 
        }} 
        onConfirm={onConfirmCb}
      />
    </div>
  );
};

export default MyBoard;
