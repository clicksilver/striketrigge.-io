import CSS from 'csstype';

export type ClickedCell = number;
export type ClickedToken = number;
export type PlayerInput = ClickedCell | ClickedToken;

export enum ActionType {
  NONE,
  MOVE,
};

export type MoveActionContext = {
  destination_cell: number;
};

export type ActionContext = MoveActionContext | undefined;

export type ActionDef = {
    action: ActionType;

    // Whether or not an action has all the necessary player inputs.
    canDispatch: (context: ActionContext) => boolean;

    // Accepts a player input, and decides based on current context what to update.
    // Note: player input is currently assumed to be a number that reflect a player
    // ID or a cell ID.
    updateContext: (context: ActionContext, input: PlayerInput) => ActionContext;

    // Determines what CSS styles to apply to a given map cell (by ID) based on
    // the currently accumulated action context. This helps the player figure out
    // the "preview" of their action.
    getCellStyle: (context: ActionContext, id: number) => CSS.Properties;
};