import { combineEpics } from "redux-observable";
import { CommandImplEpic } from "../../epic.type";
import { filter,map } from 'rxjs/operators'
import { loadGameCommand } from "./commands";
import { gameLoadSuccessEvent } from "./events";
const loadGameCommandImpl: CommandImplEpic = actions$ => 
actions$.pipe(
    filter(loadGameCommand.match),
    map(() => {
        return gameLoadSuccessEvent({
            map: []
        })
    })
)

export const gameCommandImplEpics: CommandImplEpic = combineEpics(loadGameCommandImpl)