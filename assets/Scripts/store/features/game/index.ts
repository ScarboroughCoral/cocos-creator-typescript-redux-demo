import rtk from "@reduxjs/toolkit";
const { createSlice } = rtk
import { GameState, RoadBlock } from "./entity";
import { gameLoadSuccessEvent, gameOverEvent, gameStartedEvent } from "./events";
type State = {
    gameState: GameState
    road: RoadBlock[]
    readonly loadGameRoadLength: number
}
const initialState: State = {
    gameState: GameState.GameInit,
    road: [],
    loadGameRoadLength: 50
}
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(gameLoadSuccessEvent, (state, action) => {
                const { gameRoad: map } = action.payload
                state.road = map
                state.gameState = GameState.GameLoaded
            })
            .addCase(gameStartedEvent, state => {
                state.gameState = GameState.GamePlaying
            })
            .addCase(gameOverEvent, state => {
                state.gameState = GameState.GameInit
            })
    }
})