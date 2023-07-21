import { combineReducers } from "@reduxjs/toolkit";
import { gameSlice } from "./game";
import { combineEpics } from "redux-observable";

export const rootReducer = combineReducers({
    game: gameSlice.reducer

})

export const rootEpic = combineEpics()