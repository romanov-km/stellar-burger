import {
  TConstructorIngredient,
  RequestStatus,
  TOrder,
  TIngredient
} from '@utils-types';
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

export const initialState: TBurgerConstructorState = {
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
    add: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },
    delete: (state, { payload }: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== payload
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
