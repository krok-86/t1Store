import { FC } from 'react';


import { createMocks } from '../../../utils';

import Input from '../../atoms/Input';
import Card from '../../organisms/Card';
import Button from '../../atoms/Button';
import Introduction from '../../templates/Introduction';
import FAQ from '../../molecules/FAQ';

import styles from './catalog.module.css';

export type ItemType = {
  name: string,
  img: string,
  price: number,
  alt: string,
}

const Catalog: FC = () => {

  const arrCatalog = createMocks(12, 'Essence Mascara Lash  Princess', '/pictures/image.png');

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
        tabIndex={1}
        className={styles.catalogInput}
        placeholder='Search by title'
        aria-description="Find product by name"
        role="search"
      />
      <div className={styles.catalogList} tabIndex={2} role="list">
        {arrCatalog.map((item: ItemType, index) => (
          <Card
            key={index}
            cardData={item}
            //temporary props to be figmaconvenient
            defaultCounter={index===5? 1 : 0}
          />
        ))}
      </div>
        <Button
          className={styles.catalogButton}
          label='Show more'
          tabIndex={3}
        />
    </section>
    <FAQ />
    </>
  );
};

export default Catalog;

