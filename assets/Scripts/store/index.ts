import rtk, { AnyAction } from "@reduxjs/toolkit";
const { configureStore } = rtk
import rob from 'redux-observable'
const { createEpicMiddleware } = rob
import { rootEpic, rootReducer } from './features'
import { listenerMiddleware } from "./listenerMiddleware";
// ...
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, any>()
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: false}), epicMiddleware, listenerMiddleware.middleware]
})

epicMiddleware.run(rootEpic)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
