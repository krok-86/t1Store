import { useState } from 'react';

import { arrGallery } from '../../../mocks';

import styles from './gallery.module.css';

type GallaryType = {
  id: number,
  src: string,
  alt: string,
}
const Gallery = () => {

  const [activeIndex, setActivIndex] = useState(arrGallery[0]);

  const handleChange = (el: GallaryType) => {
    setActivIndex(el)
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.mainPictureWrap}>
        <img
          className={styles.mainPicture}
          src={activeIndex.src}
          alt={activeIndex.alt}
        />
      </div>
      <div className={styles.pictureWrap}>
        {arrGallery.map((item, index) => {
          const bordered = activeIndex.id === item.id ? styles.pictureBorder : '';
          return (
            <img
              className={`${styles.picture} ${bordered}`}
              onClick={() => handleChange(item)}
              key={index}
              src={item.src}
              alt={item.alt}
            />
          )}
        )}
      </div>
    </section>
  );
};

export default Gallery;

