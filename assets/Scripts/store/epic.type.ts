import { AnyAction } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { RootState } from ".";

export type CommandImplEpic = Epic<AnyAction, AnyAction, RootState>

// event-handler disable state
export type EventHandlerEpic = Epic<AnyAction,AnyAction, unknown>