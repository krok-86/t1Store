import { FC, useState } from 'react';

import ImageWrapper from '../../atoms/ImageWrapper';

import styles from './gallery.module.css';

type GalleryType = {
  images: string[],
  title: string,
}
const Gallery:FC <GalleryType> = ({images, title}) => {

  const [active, setActive] = useState(images[0]);

  const handleChange = (el: string) => {
    setActive(el)
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.mainPictureWrap}>
        <ImageWrapper
          className={styles.mainPicture}
          src={active}
          alt={title}
        />
      </div>
      <div className={styles.pictureWrap}>
        {images.length > 1 && images.map((item, index) => {
          const bordered = active === item ? styles.pictureBorder : '';
          return (
            <ImageWrapper
              className={`${styles.picture} ${bordered}`}
              onClick={() => handleChange(item)}
              key={index}
              src={item}
              alt={title}
            />
          )}
        )}
      </div>
    </section>
  );
};

export default Gallery;

