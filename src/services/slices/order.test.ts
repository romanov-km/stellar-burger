import { describe, expect, test } from '@jest/globals';
import { getOrder } from '../thunk/order';
import { orderReducer, initialState } from '../slices/order';
import { TOrder, RequestStatus } from '@utils-types';

describe('тест orderReducer', () => {
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
  test('тест экшен fulfilled', () => {
    const action = {
      payload: mockOrder,
      type: getOrder.fulfilled.type
    };
    const expectState = {
      ...initialState,
      info: mockOrder,
      status: RequestStatus.Success
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тест экшен rejected', () => {
    const action = {
      type: getOrder.rejected.type
    };
    const expectState = {
      ...initialState,
      info: null,
      status: RequestStatus.Failed
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тест экшен pending', () => {
    const action = {
      type: getOrder.pending.type
    };
    const expectState = {
      ...initialState,
      info: null,
      status: RequestStatus.Loading
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
});
