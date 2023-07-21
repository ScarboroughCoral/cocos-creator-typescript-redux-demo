import { Action } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { RootState } from ".";

export type CommandImplEpic = Epic<Action<unknown>, Action<unknown>, RootState>

// event-handler disable state
export type EventHandlerEpic = Epic<Action<unknown>,Action<unknown>, unknown>