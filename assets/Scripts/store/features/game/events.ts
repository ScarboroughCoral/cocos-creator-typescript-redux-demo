import { createAction } from "@reduxjs/toolkit";
import { RoadBlock } from "./state.types";

type GameLoadSuccessEventArgs = {
    map: RoadBlock[]
}

export const gameLoadSuccessEvent = createAction<GameLoadSuccessEventArgs>('gameLoadSuccessEvent')