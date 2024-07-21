import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as _ from '../../../node_modules/@reduxjs/toolkit/dist/query/react/buildHooks'
import { ICatalog, IProduct, UserCredsType, UserType } from '../../types/types';
import { BASE_URL } from './urlApi';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProductById: builder.query<IProduct, string>({
      query: (params) => ({
        url: `product/${params}`,
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
    }),
  }),
});

  export const { useGetProductByIdQuery } = productApi;

  export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
      getCatalog: builder.query<ICatalog, {search: string, limit: number}>({
        query: ({ search, limit }) => ({
          url: `products/search?q=${search}&limit=${limit}`,
          method: "GET",
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
      }),
    }),
  });

  export const { useGetCatalogQuery } = catalogApi;

  export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
      loginUser: builder.mutation<UserType, UserCredsType>({
        query: (args) => ({
          url: 'auth/login',
          method: 'POST',
          body: args,
        }),
      }),
    }),
  });

  export const { useLoginUserMutation } = loginApi;

  export const currentUserApi = createApi({
    reducerPath: 'currentUser',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
      getCurrentUser: builder.mutation<UserType, string>({
        query: (token) => ({
          url: 'auth/me',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
    }),
  });

  export const { useGetCurrentUserMutation } = currentUserApi;

