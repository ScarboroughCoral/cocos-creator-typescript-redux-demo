import { EventHandlerEpic } from "../../epic.type";

import rob from 'redux-observable'
import rxjs from 'rxjs'
const { filter, map } = rxjs
import { playerJumpEndEvent } from "./events";
import { checkGameResultCommand } from "../game/commands";
const { combineEpics } = rob
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