import { describe, expect, test } from '@jest/globals';
import { ingredientsReducer, initialState } from './ingredients';
import { getIngredients } from '../thunk/ingredients';
import { RequestStatus } from '@utils-types';

describe('тесты ingredientsReducer', () => {
  const mockIngredients = {
    ...initialState,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0
      }
    ]
  };
  test('тест экшен fulfilled', () => {
    const expectState = {
      ...initialState,
      data: mockIngredients,
      status: RequestStatus.Success
    };
    const action = {
      payload: mockIngredients,
      type: getIngredients.fulfilled.type
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тест экшен rejected', () => {
    const expectState = {
      ...initialState,
      data: [],
      status: RequestStatus.Failed
    };
    const action = {
      type: getIngredients.rejected.type
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
  test('тест экшен pending', () => {
    const expectState = {
      ...initialState,
      data: [],
      status: RequestStatus.Loading
    };
    const action = {
      type: getIngredients.pending.type
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
});
