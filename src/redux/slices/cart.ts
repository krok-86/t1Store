import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getItemsCart } from '../api';
import { CartDataType, ErrorWithMessageType, IProductCart, IRejectValue } from '../../types/types';

type CartStateType = {
  items: IProductCart[];
  totalQuantity: number;
  total: number,
  discountedTotal: number;
  status?: string | null;
  error?: string | null;
};

export const getCartsByAUser = createAsyncThunk<
    CartDataType,
    string,
    { rejectValue: IRejectValue }
>('users/getFromCart', async (params, { rejectWithValue }) => {
  try {
    return await getItemsCart(params);
  } catch (err: unknown) {
    return rejectWithValue({
      data: (err as ErrorWithMessageType).response.data.message,
    });
  }
});

const initialState: CartStateType = {
  items: [],
  total: 0,
  discountedTotal: 0,
  totalQuantity: 0,
  status: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get imems from cart
    builder.addCase(getCartsByAUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.items = action.payload.data.carts[0].products;
      state.totalQuantity = action.payload.data.carts[0].totalQuantity;
      state.total = action.payload.data.carts[0].total;
      state.discountedTotal = action.payload.data.carts[0].discountedTotal;
    });
    builder.addCase(getCartsByAUser.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(getCartsByAUser.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const cartReducer = cartSlice.reducer;
