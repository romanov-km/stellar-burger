import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser, RequestStatus } from '@utils-types';
import { loginUser, logoutUser, registerUser } from '../thunk/user';

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  RequestStatus: RequestStatus;
};

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  RequestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isAuthChecked = true;
      state.RequestStatus = RequestStatus.Success;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isAuthChecked = true;
      state.RequestStatus = RequestStatus.Success;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.data = null;
    });
  },
  selectors: {
    getUser: (state: TUserState) => state.data,
    getIsAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
