import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Spinner from '../../atoms/Spinner';
import { useGetCatalogQuery } from '../../../redux/api/index.rtkQuery';

import { useAppSelector } from '../../../hooks/hook';
import { countInCart, errorToast, SessionStorageUtil, useDebounce } from '../../../utils';

import { CatalogItemType, IProductCart } from '../../../types/types';

import Introduction from '../../templates/Introduction';
import Input from '../../../stories/atoms/Input';
import Card from '../../../stories/molecules/Card';
import Button from '../../../stories/atoms/Button';
import FAQ from '../../../stories/molecules/FAQ';
import NotFoundPage from '../NotFoundPage';

import styles from './Catalog.module.css';

const Catalog: FC = () => {
  const firstRender = useRef<boolean>(true);

  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState(() => {
    const savedAmount = SessionStorageUtil.getItem('catalogAmount');
    return savedAmount ? parseInt(savedAmount, 10) : 12;
  });

  const { items } = useAppSelector((state) => state.cart);

  const debouncedSearch = useDebounce(search, 900);
  const queryData = useMemo(() => ({ search: debouncedSearch, limit: amount }), [debouncedSearch, amount]);
  const { data, isLoading, isError } = useGetCatalogQuery(queryData);

  useEffect(() => {
    SessionStorageUtil.setItem('catalogAmount', amount.toString());
  }, [amount]);

  if (isLoading) {
    return <Spinner />;
  };

  if (isError || !data) {
    firstRender.current && errorToast('Ошибка получения товаров каталога');
    firstRender.current = false;
    return <NotFoundPage />;
  };

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
                defaultCounter={countInCart(items, item.id)}
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

