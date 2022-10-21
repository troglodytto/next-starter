import {
  createSlice,
  SliceCaseReducers,
  createAction,
  createAsyncThunk,
  PrepareAction,
} from '@reduxjs/toolkit';
import { loginService } from 'app/services/auth';
import { googleLogin } from 'app/services/firebase';
import httpClient from 'app/services/http';
import { AuthState } from 'next-env';

export const loginAction = createAsyncThunk<Partial<AuthState>>(
  'AUTH/LOGIN',
  async () => {
    const idToken = await googleLogin();
    const data = await loginService(idToken);

    return {
      isOnline: data.isActive,
      profileImage: data.profileImage,
      email: data.email,
      username: data.username,
    };
  }
);

export const refreshAction = createAction<PrepareAction<string>, string>(
  'AUTH/REFRESH',
  () => ({ payload: null })
);

export const logoutAction = createAsyncThunk('AUTH/LOGOUT', async () => {
  await httpClient.get('/api/auth/logout');
});

export const setOnlineStatusAction = createAsyncThunk<boolean, boolean>(
  'AUTH/ONLINE_STATUS',
  status => status
);

export const initializeAuthState = createAsyncThunk<
  Partial<AuthState>,
  Partial<AuthState>
>('AUTH/INITIALIZE', data => {
  return {
    email: data.email,
    isOnline: data.isOnline,
    profileImage: data.profileImage,
    username: data.username,
  };
});

const initialState: AuthState = {
  isAuthorized: false,
  isOnline: false,
  profileImage: '',
  email: '',
  username: '',
  isLoading: false,
};

const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>>({
  name: 'AUTH',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAction.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(loginAction.fulfilled, (state, { payload }) => {
      state.isAuthorized = true;
      state.isOnline = payload.isOnline;
      state.profileImage = payload.profileImage;
      state.email = payload.email;
      state.username = payload.username;
      state.isLoading = false;
    });

    builder.addCase(loginAction.rejected, state => {
      state.isAuthorized = false;
      state.isOnline = false;
      state.isLoading = false;
      state.profileImage = '';
      state.email = '';
      state.username = '';
    });

    // builder.addCase(refreshAction, (state, { payload }) => {
    //   state.token = payload;
    // });

    builder.addCase(logoutAction.fulfilled, state => {
      state.isAuthorized = false;
      state.isOnline = false;
      state.isLoading = false;
      state.profileImage = '';
      state.email = '';
      state.username = '';
    });

    builder.addCase(setOnlineStatusAction.fulfilled, (state, { payload }) => {
      state.isOnline = payload;
    });

    builder.addCase(initializeAuthState.fulfilled, (state, { payload }) => {
      state.isAuthorized = true;
      state.isLoading = false;
      state.isOnline = payload.isOnline;
      state.email = payload.email;
      state.username = payload.username;
      state.profileImage = payload.profileImage;
    });

    builder.addCase(initializeAuthState.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(initializeAuthState.rejected, state => {
      state.isAuthorized = false;
      state.isOnline = false;
      state.isLoading = false;
      state.profileImage = '';
      state.email = '';
      state.username = '';
    });
  },
});

export default authSlice.reducer;
