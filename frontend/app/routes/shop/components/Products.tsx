import { useRef, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { IProduct } from '~/types';
import { useProductStore } from '~/store/productStore';

type ProductsProps = {
  cart: IProduct[];
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const Products: React.FC<ProductsProps> = ({ cart, setCart }) => {
  const LOCAL_STORAGE_KEY = 'cartItems';

  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {
        console.error('Could not parse cart from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: IProduct) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="bg-gray-100 pb-20">
      <h1 className="text-center py-20 text-3xl">LATEST PRODUCTS</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="px-20 flex flex-wrap justify-between gap-y-12">
          {products.map((product, index) => {
            return (
              <div
                key={product._id || index}
                className="w-[25%] p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-full h-[250px] object-cover mb-4"
                />

                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-light">{product.name}</p>
                    <p className="text-black text-xl font-medium">#{product.price}</p>
                  </div>
                  <motion.div
                    whileTap={{ scale: 1.2, rotate: 20 }}
                    className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <ShoppingCart onClick={() => handleAddToCart(product)} />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
