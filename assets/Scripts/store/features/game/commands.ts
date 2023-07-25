import rtk from "@reduxjs/toolkit";
const { createAction } = rtk
import { RoadBlock } from "./entity";

export const loadGameCommand = createAction('loadGameCommand')

export const startGameCommand = createAction('startGameCommand')

type CheckGameResultCommandArgs = {
    moveSteps: number,
    currentBlock: RoadBlock
}
export const checkGameResultCommand = createAction<CheckGameResultCommandArgs>('checkGameResultCommand')