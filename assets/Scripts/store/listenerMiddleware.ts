// listenerMiddleware.ts
import rtk, { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit'
const { createListenerMiddleware, addListener } = rtk
import type { RootState, AppDispatch } from './'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>
