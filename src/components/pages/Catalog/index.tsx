import { FC, useEffect, useMemo, useState } from 'react';
import Spinner from '../../atoms/Spinner';
import { useGetCatalogQuery } from '../../../redux/api/index.rtkQuery';

import { useAppSelector } from '../../../hooks/hook';

import Input from '../../atoms/Input';
import Card from '../../organisms/Card';
import Button from '../../atoms/Button';
import Introduction from '../../templates/Introduction';
import FAQ from '../../molecules/FAQ';

import styles from './catalog.module.css';

import { CatalogItemType, IProductCart } from '../../../types/types';
import { SessionStorageUtil, useDebounce } from '../../../utils';

const Catalog: FC = () => {
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
  }

  if (isError || !data) {
    return <p>error</p>;//доделать назад и тосты
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget?.value);
  };

  const handleAmount = () => {
    setAmount(amount + 12);
  }
  console.log(search)

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
        <div className={styles.catalogList} tabIndex={2} role="list">
          {data.products.map((item: CatalogItemType, index) => {
            const quantityInCart = items.find((el: IProductCart) => el.id == item.id)?.quantity || 0;
            // console.log(items,items.find((el: IProductCart) => el.id === item.id))
            console.log(items)
            console.log(quantityInCart)
            return (
              <Card
                key={index}
                cardData={item}
                defaultCounter={quantityInCart}
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

