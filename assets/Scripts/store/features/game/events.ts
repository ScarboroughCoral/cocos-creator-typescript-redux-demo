import { createAction } from "@reduxjs/toolkit";
import { RoadBlock } from "./entity";

type GameLoadSuccessEventArgs = {
    gameRoad: RoadBlock[]
}

export const gameLoadSuccessEvent = createAction<GameLoadSuccessEventArgs>('gameLoadSuccessEvent')

export const gameStartedEvent = createAction('gameStartedEvent')

type GameOverEvent = {
    passed: boolean // 是否通关了
}
export const gameOverEvent = createAction<GameOverEvent>('gameOverEvent')
