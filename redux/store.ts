import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from "redux/features/loader/loaderSlice";
import globalAlertReducer from "redux/features/globalAlert/globalAlertSlice";
import { Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';

const resetMiddleware = (_: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
  if (action.type === 'globalAlert/setErrorMsg' ||
      action.type === 'globalAlert/setWarningMsg' ||
      action.type === 'globalAlert/setInfoMsg' ||
      action.type === 'globalAlert/setSuccessMsg'
    ) {
    store.dispatch({ type: 'globalAlert/resetMsg' });
  }
  return next(action);
}

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    globalAlert: globalAlertReducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(resetMiddleware);
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch