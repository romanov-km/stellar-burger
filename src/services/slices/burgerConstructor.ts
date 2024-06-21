import { TConstructorIngredient, RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export type TBurgerConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
  status: RequestStatus;
  order: TOrder | null;
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
  status: RequestStatus.Idle,
  order: null
};

type TOrderBurgerArgs = string[];

export const orderBurger = createAsyncThunk<TOrder, TOrderBurgerArgs>(
  'burgerConstructor/orderBurger',
  async (ingredientIds) => {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructorSlice',
  initialState,
  reducers: {
    add: (state, action) => {
      const ingredient = { ...action.payload, id: crypto.randomUUID() };
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    delete: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    clear: (state) => {
      state.ingredients = [];
      state.bun = null;
      state.status = RequestStatus.Idle;
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.order = action.payload;
          state.status = RequestStatus.Success;
          state.bun = initialState.bun;
          state.ingredients = initialState.ingredients;
        }
      )
      .addCase(orderBurger.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const burgerConstructorActions = burgerConstructorSlice.actions;
