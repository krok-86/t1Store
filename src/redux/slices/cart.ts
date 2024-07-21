import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItemsCart, updateItemsCart } from '../api';
import { CartDataType, CartItemDataType, ErrorWithMessageType, IProductCart, IRejectValue } from '../../types/types';
import { errorToast } from '../../utils';

type CartStateType = {
  items: IProductCart[];
  totalQuantity: number;
  total: number,
  discountedTotal: number;
  status?: string | null;
  error?: string | null;
  addStatus: string | null;
};
export type ObjParamsType = {
  userId: string;
  cart: IProductCart[],
};

export const getCartsByAUser = createAsyncThunk<
    CartDataType,
    number,
    { rejectValue: IRejectValue }
>('cart/getFromCart', async (params, { rejectWithValue }) => {
  try {
    return await getItemsCart(params);
  } catch (err: unknown) {
    return rejectWithValue({
      data: (err as ErrorWithMessageType).response.data.message,
    });
  }
});

export const updateACart = createAsyncThunk<
    CartItemDataType,
    ObjParamsType,
    { rejectValue: IRejectValue }
    >('cart/updateCart', async (params, { rejectWithValue }) => {
      try {
        return await updateItemsCart(params);
      } catch (err: unknown) {
        return rejectWithValue({
          data: (err as ErrorWithMessageType).response.data.message,
        });
      }
    });

    export const updateProductQuantity = createAction<{ productId: number, newQuantity: number }>('updateProductQuantity');

const initialState: CartStateType = {
  items: [],
  total: 0,
  discountedTotal: 0,
  totalQuantity: 0,
  status: '',
  addStatus: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get cart by user
    builder.addCase(getCartsByAUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.items = action.payload.data.carts[0]?.products;
      state.totalQuantity = action.payload.data.carts[0]?.totalQuantity;
      state.total = action.payload.data.carts[0]?.total;
      state.discountedTotal = action.payload.data.carts[0]?.discountedTotal;
    });
    builder.addCase(getCartsByAUser.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(getCartsByAUser.rejected, (state) => {
      state.status = 'error';
      state.items = [];
      errorToast('Unable to get your cart. Please try again later or check your internet connection');
    });
    // update cart
    builder.addCase(updateACart.fulfilled, (state, action) => {
      state.addStatus = 'loaded';
      state.items = action.payload.data.products;
      state.totalQuantity = action.payload.data.totalQuantity;
      state.total = action.payload.data.total;
      state.discountedTotal = action.payload.data.discountedTotal;
    });
    builder.addCase(updateACart.pending, (state) => {
      state.addStatus = 'loading';
    });
    builder.addCase(updateACart.rejected, (state) => {
      state.addStatus = 'error';
      errorToast('Unable to add or remove the item to your cart. Please try again later or check your internet connection');
    });
  },
});

export const cartReducer = cartSlice.reducer;
