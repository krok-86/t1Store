import { CartType } from '../../types/types';
import { axiosInstance } from './urlApi';

const cartUrl = 'carts/user/15';
// const productUrl = 'products/';

export const getItemsCart = (params: string) => {
  return axiosInstance.get<CartType>(
    `${cartUrl}${params}`,
  );
};
