import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../redux/api/index.rtkQuery';
import { countInCart, errorToast, formRatingArray } from '../../../utils';
import Gallery from '../../organisms/Gallery';
import Spinner from '../../atoms/Spinner';

import styles from './product.module.css'
import Button from '../../../stories/atoms/Button';
import NotFoundPage from '../NotFoundPage';
import { useAppSelector } from '../../../hooks/hook';
import Counter from '../../molecules/Counter';
import { useMemo } from 'react';

const Product = () => {
  const { id = '-1' } = useParams<{ id: string }>();

  const { items } = useAppSelector((state) => state.cart);

  const count = useMemo(() => countInCart(items, +id), [items, id])

  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <Spinner />;
  };

  if (isError || !data) {
    errorToast('Товар не найден!');
    return <NotFoundPage />;
  };

  const ratingArray = formRatingArray(data.rating);

  const discountedPrice = (data.price * (100-data.discountPercentage)/100).toFixed(2);

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
              Your discount:<p className={styles.discount_bold}>{(data.discountPercentage).toFixed(2)}%</p>
            </p>
          </div>

          {count ?
            <Counter
              count={count}
              // setCount={setCount}
            />
            :
            <Button
              className={styles.button}
              label='Add to cart'
            />
          }
        </div>
      </section>
    </article>
  )
}

export default Product;