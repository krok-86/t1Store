import { CartItemType, CartType } from '../../types/types';
import { ObjParamsType } from '../slices/cart';

import { axiosInstance } from './urlApi';

const cartUrl = 'carts/user/';
const cartUpdateUrl = 'carts/';

export const getItemsCart = (params: number) => {
  return axiosInstance.get<CartType>(
    `${cartUrl}${params}`,
  );
};

export const updateItemsCart = (params: ObjParamsType) => {
  return axiosInstance.put<CartItemType>(
    `${cartUpdateUrl}${params.userId}`, {
        merge: false,
        products: params.cart
    }
  );
};
