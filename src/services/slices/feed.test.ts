import { describe, expect, test } from '@jest/globals';
import { getFeeds } from '../thunk/feed';
import { initialState, feedReducer } from '../slices/feed';
import { TOrdersData, RequestStatus } from '@utils-types';

describe('тест ленты заказов feedReducer', () => {
  const mockOrders: TOrdersData = {
    totalToday: 10,
    total: 14,
    orders: [
      {
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
      },
      {
        _id: '669951da119d45001b4f9dcd',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный бессмертный метеоритный бургер',
        createdAt: '2024-07-18T17:33:14.115Z',
        updatedAt: '2024-07-18T17:33:14.528Z',
        number: 46360
      }
    ]
  };
  test('тестируем экшен fulfilled', () => {
    const action = {
      payload: mockOrders,
      type: getFeeds.fulfilled.type
    };
    const expectState = {
      ...initialState,
      total: mockOrders.total,
      totalToday: mockOrders.totalToday,
      orders: mockOrders.orders,
      status: RequestStatus.Success
    };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тестируем экшен rejected', () => {
    const action = {
      type: getFeeds.rejected.type
    };
    const expectState = {
      ...initialState,
      total: 0,
      totalToday: 0,
      orders: [],
      status: RequestStatus.Failed
    };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тестируем экшен pending', () => {
    const action = {
      type: getFeeds.pending.type
    };
    const expectState = {
      ...initialState,
      total: 0,
      totalToday: 0,
      orders: [],
      status: RequestStatus.Loading
    };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
});
