import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useGetCatalogQuery } from '../../../redux/api/index.rtkQuery';

import { errorToast, LocalStorageUtil, SessionStorageUtil, useDebounce } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { updateACart } from '../../../redux/slices/cart';

import { CatalogItemType, IProductCart } from '../../../types/types';

import Introduction from '../../templates/Introduction';
import Input from '../../../stories/atoms/Input';
import Card from '../../../stories/molecules/Card';
import Button from '../../../stories/atoms/Button';
import FAQ from '../../../stories/molecules/FAQ';
import NotFoundPage from '../NotFoundPage';
import Spinner from '../../atoms/Spinner';

import styles from './catalog.module.css';

const Catalog:FC = () => {

  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.cart);

  const sendCart = (idProduct: number, num: number, cardData: CatalogItemType) => {
    const existingItem = items.find(item => item.id === idProduct);
    let updatedItems: IProductCart[] = [];
    if (existingItem) {
      updatedItems = items.map(item => {
        if (item.id === idProduct) {
          return { ...item, quantity: num };
        }
        return item;
      });
    } else {
      updatedItems = [...items, { id: cardData.id, title: cardData.title, price: cardData.price, quantity: num }];
    }
    const userId = LocalStorageUtil.getItem('userId');
    if (!userId) return;
    dispatch(updateACart({
      userId,
      cart: updatedItems,
    }));
  };

  const firstRender = useRef<boolean>(true);

  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState(() => {
    const savedAmount = SessionStorageUtil.getItem('catalogAmount');
    return savedAmount ? parseInt(savedAmount, 10) : 12;
  });

  const debouncedSearch = useDebounce(search, 900);
  const queryData = useMemo(() => ({ search: debouncedSearch, limit: amount }), [debouncedSearch, amount]);
  const { data, isLoading, isError } = useGetCatalogQuery(queryData);

  useEffect(() => {
    SessionStorageUtil.setItem('catalogAmount', amount.toString());
  }, [amount]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    firstRender.current && errorToast('Ошибка получения товаров каталога');
    firstRender.current = false;
    return <NotFoundPage />;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget?.value);
  };

  const handleAmount = () => {
    setAmount(amount + 12);
  };

  return (
    <>
      <title>Catalog | Goods4you</title>
      <Introduction />
      <section className={styles.catalog}>
        <h1
          id='catalog'
          className={styles.catalogTitle}
        >
          Catalog
        </h1>
        <Input
          type = 'search'
          tabIndex={1}
          value={search}
          onChange={(e) => handleSearch(e)}
          className={styles.catalogInput}
          placeholder='Search by title'
          aria-description="Find product by name"
          role="search"
        />
        <div
          className={styles.catalogList}
          tabIndex={2}
          role="list"
        >
          {data.products.map((item: CatalogItemType, index) => {
            return (
              <Card
                key={index}
                cardData={item}
                sendCart={sendCart}
              />
            )
          })}
        </div>
        {amount < data.total && <Button
          className={styles.catalogButton}
          label='Show more'
          tabIndex={3}
          onClick = {handleAmount}
        />}
      </section>
      <FAQ />
    </>
  );
};

export default Catalog;

