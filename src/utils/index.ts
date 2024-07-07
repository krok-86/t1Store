import { ItemType } from "../components/pages/Catalog";

export const createMocks = (size: number, name: string, img: string) => {
  const arrCatalog: ItemType[] = new Array(size).fill({
    name,
    img,
    price: '110',
    alt: 'sneakers',
  });

  return arrCatalog;
}
