import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

export const selectGame = (state: RootState) => state.game
export const selectGameRoad = createSelector(selectGame, state => state.road)
export const selectLoadGameRoadLength = createSelector(selectGame, state => state.loadGameRoadLength)