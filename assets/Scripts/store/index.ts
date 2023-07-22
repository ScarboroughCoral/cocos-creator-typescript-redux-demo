import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic, rootReducer } from './features'
// ...
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, any>()
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: false}), epicMiddleware]
})

epicMiddleware.run(rootEpic)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
