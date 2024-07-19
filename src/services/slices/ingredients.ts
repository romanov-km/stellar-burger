import { TIngredient } from '@utils-types';
import { RequestStatus } from '@utils-types';
import { getIngredients } from '../thunk/ingredients';
import { createSlice } from '@reduxjs/toolkit';

export type TIngredientState = {
  data: TIngredient[];
  status: RequestStatus;
};

export const initialState: TIngredientState = {
  data: [],
  status: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorIngredientsData: (state: TIngredientState) => state.data,
    selectorIngredientsStatus: (state: TIngredientState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
