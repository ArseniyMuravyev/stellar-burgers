import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { getUser, loginUser, register } from './actions';

interface UserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  error: SerializedError | null;
  loginUserRequest: boolean;
  loading: boolean;
  userOrders: TOrder[];
}

export const initialState: UserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
  loginUserRequest: false,
  loading: false,
  userOrders: JSON.parse(localStorage.getItem('userOrders') ?? '[]')
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export default userSlice.reducer;
