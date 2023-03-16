import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NProgress from 'nprogress';
import tokenService from '../../../utils/token.service';

const BASEURL = 'http://localhost:8080/books';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query(book) {
        return {
          url: '/',
          method: 'POST',
          credentials: 'include',
          body: book,
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
      transformResponse: (result) => result,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    updateBook: builder.mutation({
      query({ book }) {
        return {
          url: ``,
          method: 'PATCH',
          credentials: 'include',
          body: book,
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Books', id },
              { type: 'Books', id: 'LIST' },
            ]
          : [{ type: 'Books', id: 'LIST' }],
      transformResponse: (response) => response,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    getBook: builder.query({
      query(id) {
        return {
          url: `/${id}`,
          credentials: 'include',
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),
    getAllBooks: builder.query({
      query({ pageNumber, pageSize }) {
        return {
          url: `?pageNumber=${pageNumber}&pageSize=${pageSize}`,
          credentials: 'include',
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      providesTags: (result) =>
        result.data
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Books',
                id,
              })),
              { type: 'Books', id: 'LIST' },
            ]
          : [{ type: 'Books', id: 'LIST' }],
      transformResponse: (results) => {
        return results;
      },
      onQueryStarted(arg, api) {
        NProgress.start();
      },
      keepUnusedDataFor: 5,
    }),

    getAllLanguages: builder.query({
      query() {
        return {
          url: `languages`,
          credentials: 'include',
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Languages',
                id,
              })),
              { type: 'Languages', id: 'LIST' },
            ]
          : [{ type: 'Languages', id: 'LIST' }],
      transformResponse: (results) => {
        return results;
      },
      onQueryStarted(arg, api) {
        NProgress.start();
      },
      keepUnusedDataFor: 5,
    }),

    getAllGenres: builder.query({
      query() {
        return {
          url: `genres`,
          credentials: 'include',
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Genres',
                id,
              })),
              { type: 'Genres', id: 'LIST' },
            ]
          : [{ type: 'Genres', id: 'LIST' }],
      transformResponse: (results) => {
        return results;
      },
      onQueryStarted(arg, api) {
        NProgress.start();
      },
      keepUnusedDataFor: 5,
    }),
    deleteBook: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: tokenService.getUser(),
          },
        };
      },
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
  }),
});

export const {
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetAllBooksQuery,
  useGetBookQuery,
  useDeleteBookMutation,
} = bookApi;
