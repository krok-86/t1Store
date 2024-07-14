import React from 'react';

import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>404 - Страница не найдена</h2>
      <p>Извините, запрашиваемая страница не существует.</p>
    </div>
  );
};

export default NotFoundPage;