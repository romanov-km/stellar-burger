import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrder } from '../thunk/order';

type TOrderState = {
  info: TOrder | null;
  status: RequestStatus;
};

const initialState: TOrderState = {
  info: null,
  status: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.fulfilled, (state, action) => {
        state.info = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const actionsOrder = orderSlice.actions;
