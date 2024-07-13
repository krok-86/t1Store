import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cart'
import { catalogApi, productApi } from './api/index.rtkQuery';

export const store = configureStore({
  reducer: {
    cart: cartReducer, 
    [productApi.reducerPath]: productApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, catalogApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch;
