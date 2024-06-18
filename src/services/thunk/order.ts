import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

//export const getOrder = createAsyncThunk('order/getOrder', getOrderByNumberApi);

export const getOrder = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);
