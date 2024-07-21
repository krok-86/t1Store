import { Suspense, lazy, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CustomFooter from './components/organisms/Footer';
import CustomHeader from './components/organisms/Header';
import NotFoundPage from './components/pages/NotFoundPage';
import Spinner from './components/atoms/Spinner';
import SingIn from './components/pages/SignIn';
import ProtectedRoute from './ProtectedRoute';

import styles from './App.module.css';


const Catalog = lazy(() => import('./components/pages/Catalog'));
const Cart = lazy(() => import('./components/pages/Cart'));
const Product = lazy(() => import('./components/pages/Product'));

const App = () => {
  const [isLoggin, setIsLoggin] = useState('');

  const handleLogin = (value: string) => {
    setIsLoggin(value);
  }

  return (
    <>
      <CustomHeader
        handleLogin={handleLogin}
        isLoggin={isLoggin}
      />
      <main className={styles.content}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/"
              element={
                (<ProtectedRoute isLoggin={isLoggin}>
                  <Catalog />
                </ProtectedRoute>)
              } />

            <Route path="/cart"
              element={
                (<ProtectedRoute isLoggin={isLoggin}>
                  <Cart />
                </ProtectedRoute>)
              }
            />
            <Route path="/product/:id"
              element={
                (<ProtectedRoute isLoggin={isLoggin}>
                  <Product />
                </ProtectedRoute>)
              } />
            <Route path="/singIn" element={
              isLoggin === 'not logged' ? <SingIn handleLogin={handleLogin}/> :
              <Navigate to="/" replace />} />
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