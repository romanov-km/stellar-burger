import { describe, expect, test } from '@jest/globals';
import {
  burgerConstructorReducer,
  burgerConstructorActions,
  orderBurger,
  initialState
} from '../slices/burgerConstructor';
import { TConstructorIngredient, RequestStatus, TOrder } from '@utils-types';

describe('burgerConstructor reducer', () => {
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

  const mockIngredient: TConstructorIngredient = {
    _id: '1',
    id: 'уникальный айди',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 150,
    price: 100,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  };

  const mockBun: TConstructorIngredient = {
    _id: '2',
    id: 'уникальный айди',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 150,
    price: 50,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  };

  test('инишиал', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  test('должен добавить булку', () => {
    const newState = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.add(mockBun)
    );
    expect(newState.bun).toMatchObject({
      _id: '2',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 150,
      price: 50,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
    });
  });

  test('должен добавить ингредиент', () => {
    const newState = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.add(mockIngredient)
    );
    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toMatchObject({
      _id: '1',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 150,
      price: 100,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
    });
  });

  test('должен удалить ингредиент', () => {
    const stateWithIngredient = {
      ...initialState,
      ingredients: [mockIngredient]
    };
    const newState = burgerConstructorReducer(
      stateWithIngredient,
      burgerConstructorActions.delete(0)
    );
    expect(newState.ingredients.length).toBe(0);
  });

  test('должен очистить', () => {
    const stateWithIngredientsAndBun = {
      ...initialState,
      ingredients: [mockIngredient],
      bun: mockBun,
      status: RequestStatus.Loading,
      order: {
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
      }
    };
    const newState = burgerConstructorReducer(
      stateWithIngredientsAndBun,
      burgerConstructorActions.clear()
    );
    expect(newState).toEqual(initialState);
  });

  test('orderBurger pending', () => {
    const action = { type: orderBurger.pending.type };
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.status).toBe(RequestStatus.Loading);
  });

  test('orderBurger fulfilled', () => {
    const action = { type: orderBurger.fulfilled.type, payload: mockOrder };
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.status).toBe(RequestStatus.Success);
    expect(newState.order).toEqual(mockOrder);
    expect(newState.ingredients).toEqual([]);
    expect(newState.bun).toBe(null);
  });

  test('orderBurger rejected', () => {
    const action = { type: orderBurger.rejected.type };
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.status).toBe(RequestStatus.Failed);
  });
});
