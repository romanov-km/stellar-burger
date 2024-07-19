import { expect, test, describe } from '@jest/globals';
import { userSlice } from './slices/user';
import { feedSlice } from './slices/feed';
import { burgerConstructorSlice } from './slices/burgerConstructor';
import { orderSlice } from './slices/order';
import { ordersSlice } from './slices/orders';
import { ingredientsSlice } from './slices/ingredients';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

const initialRootState = {
  ingredients: ingredientsSlice.getInitialState(),
  user: userSlice.getInitialState(),
  feed: feedSlice.getInitialState(),
  burgerConstructor: burgerConstructorSlice.getInitialState(),
  order: orderSlice.getInitialState(),
  orders: ordersSlice.getInitialState()
};

describe('тесты rootReducer', () => {
  test('проверка слияния состояний reducers', () => {
    const store = configureStore({ reducer: rootReducer });
    const newState = store.getState();
    expect(newState).toEqual(initialRootState);
  });
  test('проверка инициализации начального состояния', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(initialRootState, action);
    expect(newState).toEqual(initialRootState);
  });
});
