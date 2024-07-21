// userSlice.test.ts
import { userReducer, userActions, initialState } from './user';
import { registerUser, loginUser, logoutUser, updateUser } from '../thunk/user';
import { RequestStatus } from '@utils-types';

describe('userSlice', () => {
  const mockUser = { email: 'test1111@test11.com', name: 'TestUser' };
  const sampleError = new Error('Failed request');
  test('setAuthChecked', () => {
    const action = { type: userActions.setAuthChecked.type, payload: true };
    const newState = userReducer(initialState, action);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('setUser', () => {
    const action = { type: userActions.setUser.type, payload: mockUser };
    const newState = userReducer(initialState, action);
    expect(newState.data).toEqual(mockUser);
  });

  test('тест logout', () => {
    const action = { type: userActions.logout.type };
    const newState = userReducer({ ...initialState, data: mockUser }, action);
    expect(newState.data).toBeNull();
  });

  test('тест registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.RequestStatus).toBe(RequestStatus.Loading);
  });

  test('тест registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(
      { ...initialState, RequestStatus: RequestStatus.Loading },
      action
    );
    expect(newState.data).toEqual(mockUser);
    expect(newState.RequestStatus).toBe(RequestStatus.Success);
  });

  test('тест registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: sampleError.message }
    };
    const newState = userReducer(
      { ...initialState, RequestStatus: RequestStatus.Loading },
      action
    );
    expect(newState.data).toBeNull();
    expect(newState.RequestStatus).toBe(RequestStatus.Failed);
  });

  test('тест loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.RequestStatus).toBe(RequestStatus.Loading);
  });

  test('тест loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(
      { ...initialState, RequestStatus: RequestStatus.Loading },
      action
    );
    expect(newState.data).toEqual(mockUser);
    expect(newState.RequestStatus).toBe(RequestStatus.Success);
  });

  test('тест loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: sampleError.message }
    };
    const newState = userReducer(
      { ...initialState, RequestStatus: RequestStatus.Loading },
      action
    );
    expect(newState.data).toBeNull();
    expect(newState.RequestStatus).toBe(RequestStatus.Failed);
  });

  test('тест logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.RequestStatus).toBe(RequestStatus.Loading);
  });

  test('тест logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const newState = userReducer(
      {
        ...initialState,
        RequestStatus: RequestStatus.Idle,
        data: mockUser
      },
      action
    );
    expect(newState.data).toBeNull();
    expect(newState.RequestStatus).toBe(RequestStatus.Idle);
  });

  test('тест logoutUser.rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: sampleError.message }
    };
    const newState = userReducer(
      { ...initialState, RequestStatus: RequestStatus.Loading },
      action
    );
    expect(newState.RequestStatus).toBe(RequestStatus.Failed);
  });

  test('тест updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const newState = userReducer(initialState, action);
    expect(newState.RequestStatus).toBe(RequestStatus.Loading);
  });

  test('тест updateUser.fulfilled', () => {
    const action = { type: updateUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(
      { ...initialState, RequestStatus: RequestStatus.Loading },
      action
    );
    expect(newState.data).toEqual(mockUser);
    expect(newState.RequestStatus).toBe(RequestStatus.Success);
  });

  test('тест updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: sampleError.message }
    };
    const newState = userReducer(
      { ...initialState, RequestStatus: RequestStatus.Loading },
      action
    );
    expect(newState.data).toBeNull();
    expect(newState.RequestStatus).toBe(RequestStatus.Failed);
  });
});
