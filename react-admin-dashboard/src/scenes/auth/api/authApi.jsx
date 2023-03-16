import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenService from '../../../utils/token.service';
import { userApi } from './userApi';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'authenticate',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
          const { data } = await queryFulfilled;
          tokenService.setUser(data.token);
        } catch (error) {}
      },
    }),

    logoutUser: builder.mutation({
      query() {
        return {
          url: 'logout',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = authApi;
