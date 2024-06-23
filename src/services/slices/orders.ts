import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrders } from '../thunk/orders';

type TOrderState = {
  orders: TOrder[];
  status: RequestStatus;
};

const initialState: TOrderState = {
  orders: [],
  status: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const actionsOrders = ordersSlice.actions;
