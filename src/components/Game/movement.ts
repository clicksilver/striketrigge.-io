import CSS from 'csstype';
import {
    ActionType,
    ActionContext,
    MoveActionContext,
    PlayerInput,
    ActionDef,
} from "./actions";

export const MovementDef: ActionDef = {
    action: ActionType.MOVE,
    canDispatch: (context: ActionContext): boolean => {
        const move_ctx = context as MoveActionContext;
        if (!move_ctx) { return false; }
        const dst_cell = move_ctx.destination_cell as number;
        if (dst_cell && dst_cell < 10 && dst_cell > 0) {
            return true;
        }
        return false;
    },
    updateContext: (context: ActionContext, 
                    input: PlayerInput
                    ): MoveActionContext => {
        return {
            destination_cell: input as number
        };
    },
    getCellStyle: (context: ActionContext,
                   id: number
                   ): CSS.Properties => {
        var move_ctx = context as MoveActionContext;
        if (move_ctx !== undefined &&
            move_ctx.destination_cell === id) {
            var ret: CSS.Properties = {
                border: '2px solid green'
            }
            return ret;
        }
        return {};
    }
}