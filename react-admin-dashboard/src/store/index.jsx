import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from '../scenes/auth/api/authApi';
import { userApi } from '../scenes/auth/api/userApi';
import { bookApi } from '../scenes/book/api/bookApi';
import userReducer from '../scenes/auth/slice/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    userState: userReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware, bookApi.middleware]),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
