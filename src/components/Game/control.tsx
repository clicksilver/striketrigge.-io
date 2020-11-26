import React from "react";
import { ActionType } from "./types";

interface ControlsProps {
  setAction: ((action: ActionType) => void);
}

const Controls = ({setAction}: ControlsProps) => {
    return (
      <div>
        <div>
          <button type="button" onClick={() => setAction(ActionType.MOVE)}>
            Move
          </button>
        </div>
        <div>
          <button type="button" onClick={() => setAction(ActionType.NONE)}>
            Cancel
          </button>
        </div>
      </div>
    );
}

export default Controls;