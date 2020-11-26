export type ClickedCell = number;
export type ClickedToken = number;
export type PlayerInput = ClickedCell | ClickedToken;

export enum ActionType {
  NONE,
  MOVE,
};

export interface NullActionContext {
};

export interface MoveActionContext {
  destination_cell: number;
};

export type ActionContext = MoveActionContext | NullActionContext;

export function canDispatchAction(
    action: ActionType, 
    action_ctx: ActionContext
    ): boolean {
    if (action === ActionType.MOVE) {
        var move_ctx = action_ctx as MoveActionContext;
        if (move_ctx.destination_cell) {
            return true;
        }
    }
    return false;
}

export function updateActionContext(
    action_type: ActionType,
    action_ctx: ActionContext,
    player_input: PlayerInput, 
    ): ActionContext {
    if (action_type === ActionType.MOVE) {
        var move_ctx = action_ctx as MoveActionContext;
        return {
            ...move_ctx,
            destination: player_input as ClickedCell as number
        };
    }
    return {};
}