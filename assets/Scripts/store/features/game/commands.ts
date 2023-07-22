import { createAction } from "@reduxjs/toolkit";
import { RoadBlock } from "./entity";

export const loadGameCommand = createAction('loadGameCommand')

export const startGameCommand = createAction('startGameCommand')

type CheckGameResultCommandArgs = {
    moveSteps: number,
    currentBlock: RoadBlock
}
export const checkGameResultCommand = createAction<CheckGameResultCommandArgs>('checkGameResultCommand')