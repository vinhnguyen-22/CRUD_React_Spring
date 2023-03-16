import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import tokenService from '../../../utils/token.service';
import { setUser } from '../slice/userSlice';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user/`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query() {
        return {
          url: 'me',
          credentials: 'include',
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});
