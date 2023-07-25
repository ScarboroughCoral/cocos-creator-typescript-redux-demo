import rtk from "@reduxjs/toolkit";
const { combineReducers } = rtk
import { gameSlice } from "./game";
import rob from 'redux-observable'
const { combineEpics } = rob
import { gameCommandImplEpics } from "./game/commands.impl";
import { playerEventHandlerEpics } from "./player/events.handler";

export const rootReducer = combineReducers({
    game: gameSlice.reducer

})

export const rootEpic = combineEpics(gameCommandImplEpics, playerEventHandlerEpics)