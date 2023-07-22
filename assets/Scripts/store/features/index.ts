import { combineReducers } from "@reduxjs/toolkit";
import { gameSlice } from "./game";
import { combineEpics } from "redux-observable";
import { gameCommandImplEpics } from "./game/commands.impl";
import { playerEventHandlerEpics } from "./player/events.handler";

export const rootReducer = combineReducers({
    game: gameSlice.reducer

})

export const rootEpic = combineEpics(gameCommandImplEpics, playerEventHandlerEpics)