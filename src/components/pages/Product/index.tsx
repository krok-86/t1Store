import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../redux/api/index.rtkQuery';
import { formRatingArray } from '../../../utils';
import Button from '../../atoms/Button';
import Gallery from '../../atoms/Gallery';
import Spinner from '../../atoms/Spinner';

import styles from './product.module.css'

// import Spinner from '../../atoms/Spinner';
// import { useParams } from 'react-router-dom';
// import { getItemsProduct } from '../../../redux/api';

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetProductByIdQuery(id);
  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {//доделать назад и тосты
    return <p>error</p>;
  }

  const ratingArray = formRatingArray(data.rating);

  const discountedPrice = (data.price * (100-data.discountPercentage)/100).toFixed(2);
console.log('>>>>>>>>>>>',data)
  return (
    <article className={styles.product}>
      <title>{data.title} | Goods4you</title>
      <Gallery images={data.images} title ={data.title}/>
      <section className={styles.info}>
        <h1 className={styles.name}>{data.title}</h1>
        <div className={styles.marks}>
          {/* <img className={styles.stars} src='/pictures/stars.svg' alt='rating'/> */}
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
          <Button
            className={styles.button}
            label='Add to cart'
          />
        </div>
      </section>
    </article>
  )
}

export default Product;