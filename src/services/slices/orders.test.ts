import { describe, expect, test } from '@jest/globals';
import { getOrders } from '../thunk/orders';
import { initialState, ordersReducer } from '../slices/orders';
import { TOrder, RequestStatus } from '@utils-types';

describe('тестируем ordersReducer', () => {
  const mockOrder: TOrder = {
    _id: '66995433119d45001b4f9dd5',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-07-18T17:43:15.754Z',
    updatedAt: '2024-07-18T17:43:16.215Z',
    number: 46361
  };
  test('тестируем экшен fulfilled', () => {
    const action = {
      payload: [],
      type: getOrders.fulfilled.type
    };
    const expectState = {
      ...initialState,
      status: RequestStatus.Success
    };
    const newState = ordersReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тестируем экшен rejected', () => {
    const action = {
      type: getOrders.rejected.type
    };
    const expectState = {
      ...initialState,
      status: RequestStatus.Failed
    };
    const newState = ordersReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тестируем экшен pending', () => {
    const action = {
      type: getOrders.pending.type
    };
    const expectState = {
      ...initialState,
      status: RequestStatus.Loading
    };
    const newState = ordersReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
});
