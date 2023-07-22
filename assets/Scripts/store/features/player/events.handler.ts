import { EventHandlerEpic } from "../../epic.type";
import { filter,map } from 'rxjs/operators'
import { playerJumpEndEvent } from "./events";
import { checkGameResultCommand } from "../game/commands";
import { combineEpics } from "redux-observable";
const playerJumpEndEventHandler: EventHandlerEpic = actions$ =>
    actions$.pipe(
        filter(playerJumpEndEvent.match),
        map(action => {
            const { moveSteps, currentBlock } = action.payload
            return checkGameResultCommand({
                moveSteps,
                currentBlock
            })
        })
    )

export const playerEventHandlerEpics: EventHandlerEpic = combineEpics(playerJumpEndEventHandler)