import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { userActions } from '../slices/user';
import { setCookie } from '../../utils/cookie';
import { deleteCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk<
  TUser,
  { email: string; password: string; name: string }
>('user/registerUser', async (user) => {
  const data = await registerUserApi(user);
  return data.user;
});

export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string }
>('user/login', async (user) => {
  const res = await loginUserApi(user);
  //localStorage.setItem('accessToken', res.accessToken);
  //localStorage.setItem('refreshToken', res.refreshToken);
  setCookie('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      getUserApi()
        .then((res) => dispatch(userActions.setUser(res.user)))
        .catch(() => {
          //localStorage.removeItem('accessToken');
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => {
          dispatch(userActions.setAuthChecked(true));
        });
    } else {
      dispatch(userActions.setAuthChecked(true));
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  //localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ name, email, password }: TRegisterData) => {
    const data = await updateUserApi({ name, email, password });
    return data.user;
  }
);
