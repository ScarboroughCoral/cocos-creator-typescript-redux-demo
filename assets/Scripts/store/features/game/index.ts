import { createSlice } from "@reduxjs/toolkit";
import { GameState, RoadBlock } from "./state.types";
import { gameLoadSuccessEvent } from "./events";
type State = {
    gameState: GameState
    road: RoadBlock[]
}
const initialState: State = {
    gameState: GameState.GameInit,
    road: []
}
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(gameLoadSuccessEvent, (state, action) => {
            const { map } = action.payload
            state.road = map
        })
    }
})