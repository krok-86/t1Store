import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as _ from '../../../node_modules/@reduxjs/toolkit/dist/query/react/buildHooks'
import { ICatalog, IProduct } from '../../types/types';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
      getProductById: builder.query<IProduct, string>({
        query: (params) => `/product/${params}`,
      }),
    }),
  });

  export const { useGetProductByIdQuery } = productApi;

  export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
      getCatalog: builder.query<ICatalog, {search: string, limit: number}>({
        query: ({search, limit}) => `/products/search?q=${search}&limit=${limit}`,
      }),
    }),
  });

  export const { useGetCatalogQuery } = catalogApi;