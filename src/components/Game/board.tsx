import React from "react";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "./types";

import Display from "./display";

const MyBoard = ({G, ctx, moves, isActive}: BoardProps<GameState>) => {
  return (
    <div>
      <div className="row flex-center">
        <div className="col no-padding">
          <Display G={G} />
        </div>
      </div>
    </div>
  );
};

export default MyBoard;
