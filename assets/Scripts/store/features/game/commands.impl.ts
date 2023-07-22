import { combineEpics } from "redux-observable";
import { CommandImplEpic } from "../../epic.type";
import { filter,map,switchMap } from 'rxjs/operators'
import { checkGameResultCommand, loadGameCommand } from "./commands";
import { gameLoadSuccessEvent, gameOverEvent } from "./events";
import { selectGameRoad } from "./selector";
import { RoadBlock } from "./entity";
import {EMPTY,of} from 'rxjs'
import { GameService } from "../../../service/Game.service";
const loadGameCommandImpl: CommandImplEpic = actions$ => 
actions$.pipe(
    filter(loadGameCommand.match),
    map(() => {
        const gameRoad = GameService.generateMap(50)
        return gameLoadSuccessEvent({
            gameRoad
        })
    })
)
const checkGameResultCommandImpl: CommandImplEpic = (action$, state$) =>
action$.pipe(
    filter(checkGameResultCommand.match),
    switchMap(action => {
        const { moveSteps, currentBlock } = action.payload
        const gameRoad = selectGameRoad(state$.value)
        if (moveSteps>=gameRoad.length) return of(gameOverEvent({ passed: true}))
        if (currentBlock === RoadBlock.None) return of(gameOverEvent({ passed: false}))
        return EMPTY
    })
)

export const gameCommandImplEpics: CommandImplEpic = combineEpics(loadGameCommandImpl,checkGameResultCommandImpl)