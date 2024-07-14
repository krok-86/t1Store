import { FC, useState } from 'react';
import styles from './imageWrapper.module.css';

const ImageWrapper: FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      {loading &&
        <div className={styles.shimmer} />
      }
      <img
        className={`${styles.image} ${loading ? styles.hided : styles.visible}`}
        onLoad={handleImageLoaded}
        {...props}
      />
    </div>
  );
};

export default ImageWrapper;
