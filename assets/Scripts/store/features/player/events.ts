import { createAction } from "@reduxjs/toolkit";
import { RoadBlock } from "../game/entity";


type PlayerJumpEndEvent = {
    moveSteps: number
    currentBlock: RoadBlock
}
export const playerJumpEndEvent = createAction<PlayerJumpEndEvent>('playerJumpEndEvent')