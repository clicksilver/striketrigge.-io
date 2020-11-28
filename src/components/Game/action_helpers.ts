import CSS from 'csstype';
import {
    ActionType,
    ActionDef,
    ActionContext,
    PlayerInput
} from "./actions";
import { MovementDef } from "./movement";

export const ActionLookup: Record<ActionType, ActionDef> = {
    [ActionType.NONE]: {
        action: ActionType.NONE,
        canDispatch: (context: ActionContext) => { return false; },
        updateContext: (context: ActionContext, input: PlayerInput) => { return undefined; },
        getCellStyle: (context: ActionContext, id: number) => { return {}; },
    },
    [ActionType.MOVE]: MovementDef,
};

export function canDispatchAction(
    action: ActionType, 
    context: ActionContext
    ): boolean {
    return ActionLookup[action].canDispatch(context);
}

export function updateActionContext(
    action: ActionType,
    context: ActionContext,
    input: PlayerInput, 
    ): ActionContext {
    return ActionLookup[action].updateContext(context, input);
}

export function getCellStyle(
    action: ActionType,
    context: ActionContext,
    id: number): CSS.Properties {
    return ActionLookup[action].getCellStyle(context, id);
}
