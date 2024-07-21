import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cart'
import { catalogApi, currentUserApi, loginApi, productApi } from './api/index.rtkQuery';

const defaultMiddlewareConfig = {
  serializableCheck: false
};

export const store = configureStore({
  reducer: {
    cart: cartReducer, 
    [productApi.reducerPath]: productApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [currentUserApi.reducerPath]: currentUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig).concat(productApi.middleware, catalogApi.middleware, loginApi.middleware, currentUserApi.middleware),
})

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
