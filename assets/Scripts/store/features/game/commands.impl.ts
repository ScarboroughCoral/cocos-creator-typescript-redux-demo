
import rob from 'redux-observable'
const { combineEpics } = rob
import { CommandImplEpic } from "../../epic.type";
import rxjs from 'rxjs'
const { EMPTY, of, filter, map, switchMap } = rxjs
import { checkGameResultCommand, loadGameCommand, startGameCommand } from "./commands";
import { gameLoadSuccessEvent, gameOverEvent, gameStartedEvent, startGameFailedEvent } from "./events";
import { selectGame, selectGameRoad } from "./selector";
import { GameState, RoadBlock } from "./entity";
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
const startGameCommandImpl: CommandImplEpic = (actions$, state$) =>
    actions$.pipe(
        filter(startGameCommand.match),
        switchMap(() => {
            const { gameState } = selectGame(state$.value)
            if (gameState !== GameState.GameLoaded) return of(startGameFailedEvent({ reason: 'game not loaded' }))
            return of(gameStartedEvent())
        })
    )
const checkGameResultCommandImpl: CommandImplEpic = (action$, state$) =>
    action$.pipe(
        filter(checkGameResultCommand.match),
        switchMap(action => {
            const { moveSteps, currentBlock } = action.payload
            const gameRoad = selectGameRoad(state$.value)
            if (moveSteps >= gameRoad.length) return of(gameOverEvent({ passed: true }))
            if (currentBlock === RoadBlock.None) return of(gameOverEvent({ passed: false }))
            return EMPTY
        })
    )

export const gameCommandImplEpics: CommandImplEpic = combineEpics(loadGameCommandImpl, checkGameResultCommandImpl, startGameCommandImpl)