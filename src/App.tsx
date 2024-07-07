import { Routes, Route } from 'react-router-dom'

import CustomFooter from './components/organisms/Footer'
import CustomHeader from './components/organisms/Header'
import Catalog from './components/pages/Catalog'
import Cart from './components/pages/Cart'
import Product from './components/pages/Product'

import styles from'./App.module.css';

const App = () => {
  return (
    <>
    <CustomHeader />
    <main className={styles.content}>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      </main>
    <CustomFooter />
    </>
  );
};

export default App;

