import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../../../redux/api/index.rtkQuery';
import { countInCart, errorToast, formRatingArray, LocalStorageUtil, makeDiscountedPrice } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';

import { IProductCart } from '../../../types/types';
import { updateACart } from '../../../redux/slices/cart';

import Gallery from '../../organisms/Gallery';
import Spinner from '../../atoms/Spinner';
import Button from '../../../stories/atoms/Button';
import NotFoundPage from '../NotFoundPage';
import Counter from '../../molecules/Counter';

import styles from './product.module.css'

const Product = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { items, addStatus } = useAppSelector((state) => state.cart);

  const count = useMemo(() => countInCart(items, +id), [items, id]);

  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  const dispatch = useAppDispatch();

  const sendCart = (idProduct: number, num: number) => {
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
      updatedItems = [...items, { id: +id, title: data?.title, price: data?.price, quantity: num }];
    }
    const userId = LocalStorageUtil.getItem('userId');
    if (!userId) return;
    dispatch(updateACart({
      userId,
      cart: updatedItems,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    errorToast('Item not found!');
    return <NotFoundPage />;
  }

  const ratingArray = formRatingArray(data.rating);

  const discountedPrice = makeDiscountedPrice(data.price, data.discountPercentage);

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const newCount = count + 1;
    sendCart(+id, newCount);
  };

  const handleChangeCount = (number: number) => {
    sendCart(+id, number);
  };

  return (
    <article className={styles.product}>
      <title>{data.title} | Goods4you</title>
      <Gallery images={data.images} title ={data.title}/>
      <section className={styles.info}>
        <h1 className={styles.name}>{data.title}</h1>
        <div className={styles.marks}>
          <div className={styles.stars}>
            {ratingArray.map((rate) => <img className={styles.star} src={rate} alt='rating star' />)}
          </div>
          <div className={styles.tags}>
            {data.tags.join(", ")}
          </div>
        </div>
        <div className={styles.stock}>
          In Stock - Only {data.stock} left!
        </div>
        <p className={styles.description}>
          {data.description}
        </p>
        <div className={styles.terms}>
          <p>{data.warrantyInformation}</p>
          <p>{data.shippingInformation}</p>
        </div>
        <div className={styles.buy}>
          <div className={styles.price}>
            <div className={styles.costs}>
              <p className={styles.total}>{discountedPrice}$</p>
              <p className={styles.previous}>{data.price}$</p>
            </div>
            <p className={styles.discount}>
              Your discount:
              <p className={styles.discount_bold}>
              {(data.discountPercentage).toFixed(2)}%
              </p>
            </p>
          </div>

          { count ?
            <Counter
              count={count}
              setCount = {handleChangeCount}
              limit={data.stock}
              isLoading={addStatus === 'loading'}
            />
            :
            <Button
              onClick={addToCart}
              className={styles.button}
              label='Add to cart'
              disabled={addStatus === 'loading'}
            />
          }
        </div>
      </section>
    </article>
  )
}

export default Product;