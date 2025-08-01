import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import type { IProduct } from '~/types';

const Index = () => {
  React.useEffect(() => {
    document.title = 'Shop';
  }, []);

  const [cart, setCart] = useState<IProduct[]>([]);

  return (
    <div>
      <Navbar cart={cart} />
      <Hero />
      <Products cart={cart} setCart={setCart} />
    </div>
  );
};

export default Index;
