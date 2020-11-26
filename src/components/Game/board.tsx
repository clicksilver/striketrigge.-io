import React, { useState } from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState, ActionType } from "./types";

import Display from "./display";
import Controls from "./control";

const MyBoard = ({G, ctx, moves, isActive}: BoardProps<GameState>) => {
  const [action, setAction] = useState(ActionType.NONE);
  
  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          <Display G={G} />
          <Controls setAction={(action: ActionType) => {
            setAction(action);
          }}/>
        </div>
      </div>
    </div>
  );
};

export default MyBoard;
