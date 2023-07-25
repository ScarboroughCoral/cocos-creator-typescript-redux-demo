import rtk from "@reduxjs/toolkit";
const { createAction } = rtk
import { RoadBlock } from "../game/entity";


type PlayerJumpEndEvent = {
    moveSteps: number
    currentBlock: RoadBlock
}
export const playerJumpEndEvent = createAction<PlayerJumpEndEvent>('playerJumpEndEvent')