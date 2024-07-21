import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CustomFooter from './components/organisms/Footer';
import CustomHeader from './components/organisms/Header';
import NotFoundPage from './components/pages/NotFoundPage';
import Spinner from './components/atoms/Spinner';

import styles from './App.module.css';

const Catalog = lazy(() => import('./components/pages/Catalog'));
const Cart = lazy(() => import('./components/pages/Cart'));
const Product = lazy(() => import('./components/pages/Product'));

const App = () => {
  return (
    <>
      <CustomHeader />
      <main className={styles.content}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
      <CustomFooter />
    </>
  );
};

export default App;