import Button from '../../atoms/Button';
import Gallery from '../../atoms/Gallery';

import styles from './product.module.css'

const Product = () => {
  return (
    <article className={styles.product}>
      <title>Essence Mascara Lash Princess | Goods4you</title>
      <Gallery />
      <section className={styles.info}>
        <h1 className={styles.name}>Essence Mascara Lash Princess</h1>
        <div className={styles.marks}>
          <img className={styles.stars} src='/pictures/stars.svg' alt='rating'/>
          <div className={styles.tags}>
            electronics, selfie accessories
          </div>
        </div>
        <div className={styles.stock}>
          In Stock - Only 5 left!
        </div>
        <p className={styles.description}>
          The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.
          Achieve dramatic lashes with this long-lasting and cruelty-free formula.
        </p>
        <div className={styles.terms}>
          <p>1 month warranty</p>
          <p>Ships in 1 month</p>
        </div>
        <div className={styles.buy}>
          <div className={styles.price}>
            <div className={styles.costs}>
              <p className={styles.total}>7.17$</p>
              <p className={styles.previous}>9.99$</p>
            </div>
            <p className={styles.discount}>
            Your discount:<p className={styles.discount_bold}>14.5%</p>
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