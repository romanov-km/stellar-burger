import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getFeeds } from '../thunk/feed';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      });
  }
});

export const feedReducer = feedSlice.reducer;
export const actionsFeed = feedSlice.actions;
