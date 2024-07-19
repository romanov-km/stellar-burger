import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser, RequestStatus } from '@utils-types';
import { loginUser, logoutUser, registerUser, updateUser } from '../thunk/user';

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  RequestStatus: RequestStatus;
};

export const initialState: TUserState = {
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
    //login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.RequestStatus = RequestStatus.Success;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.RequestStatus = RequestStatus.Loading;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.RequestStatus = RequestStatus.Failed;
    });
    //register
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.RequestStatus = RequestStatus.Success;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.RequestStatus = RequestStatus.Loading;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.RequestStatus = RequestStatus.Failed;
    });
    //logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.data = null;
      state.isAuthChecked = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.RequestStatus = RequestStatus.Loading;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.RequestStatus = RequestStatus.Failed;
    });
    //update
    builder.addCase(updateUser.pending, (state) => {
      state.RequestStatus = RequestStatus.Loading;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.RequestStatus = RequestStatus.Success;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.RequestStatus = RequestStatus.Failed;
    });
  },
  selectors: {
    getUser: (state: TUserState) => state.data,
    getAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
