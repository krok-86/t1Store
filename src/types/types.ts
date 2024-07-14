export type ErrorWithMessageType = {
  response: {
    data: {
      message: string;
    };
  };
};
export interface IRejectValue {
  data: string;
}

export interface IProductCart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  dicountPercentage: number;
  dicountedTotal: number;
  thumbnail: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  warrantyInformation: string;
  shippingInformation: string;
  rating: number;
  stock: number;
  tags: string[];
  images: string[];
  thumbnail: string;
}
export interface ICatalog {
  products: CatalogItemType[],
  total: number,
  skip: number,
  limit: number,
}
export type CatalogItemType = {
  id: number,
  title: string,
  price: number,
  thumbnail: string,
}
export type CartItemType = {
  products: IProductCart[];
  totalQuantity: number;
  total: number;
  discountedTotal: number;
};
export type CartType = {
  carts: CartItemType[];
};

export type ProductDataType = {
  data: ProductType;
}
export type ProductType = {
  products: ProductItemType[];
}
export type ProductItemType = {
  products: IProductCart[];
};
export type CartDataType = {
  data: CartType;
};

export type CartItemDataType = {
  data: CartItemType;
};