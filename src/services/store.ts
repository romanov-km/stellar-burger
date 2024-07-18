import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredients';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userReducer, userSlice } from './slices/user';
import { feedReducer } from './slices/feed';
import { burgerConstructorReducer } from './slices/burgerConstructor';
import { orderReducer } from './slices/order';
import { ordersReducer } from './slices/orders';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  user: userReducer,
  feed: feedReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  orders: ordersReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>; //

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
