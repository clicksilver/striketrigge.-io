import React from "react";
import { ActionType } from "./actions";

interface ControlsProps {
  setAction: ((action: ActionType) => void);
  onConfirm: (() => void);
}

const Controls = ({setAction, onConfirm}: ControlsProps) => {
  return (
    <div>
      <div>
        <button type="button" onClick={() => setAction(ActionType.MOVE)}>
          Move
        </button>
      </div>
      <div>
        <button type="button" onClick={onConfirm}>
          Confirm
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setAction(ActionType.NONE)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Controls;