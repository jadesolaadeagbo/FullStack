import { useEffect, useState } from 'react';
import type { IProduct, CartItem, CreateCartData } from '~/types';
import { useProductStore } from '~/store/productStore';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import ProductSkeleton from '~/components/Product Skeleton';
import ProductPreviewModal from './ProductPreviewModal';
import { addToCart } from '~/api/cart';
import { useCartStore } from '~/store/cartStore';

type ProductsProps = {
  cart: IProduct[];
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

const Products: React.FC<ProductsProps> = ({ cart, setCart }) => {
  const LOCAL_STORAGE_KEY = 'cartItems';

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { products, fetchProducts, totalPages, page, total, loading } = useProductStore();
  const { fetchCart } = useCartStore();
  const itemsPerPage = 20;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = (product: IProduct): void => {
    const data = {
      productId: product._id,
      quantity: 1,
    };

    addToCart(data);
  };

  return (
    <div className="bg-gray-100 pb-20">
      <h1 className="text-center py-20 text-3xl">Recommended</h1>

      {loading ? (
        <div className="px-20 flex flex-wrap justify-between space-y-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="px-20 flex flex-wrap justify-between space-y-10">
            {products.map((product, index) => {
              return (
                <div
                  key={product._id || index}
                  onClick={() => setSelectedProduct(product)}
                  className="w-[18%] cursor-pointer"
                >
                  <div className=" bg-white w-full">
                    <img
                      src={product.productImage}
                      alt={product.name}
                      className="w-full h-[330px] object-contain"
                    />
                  </div>

                  <p className="font-light truncate w-full max-w-[250px] hover:underline">
                    {product.name}
                  </p>
                  <div className="flex justify-between items-center  cursor-pointer p-2 rounded-full ">
                    <p className="text-black text-xl font-medium">${product.price}</p>

                    <ShoppingCart onClick={() => handleAddToCart(product)} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-10 justify-end pr-20">
            <p className="text-sm text-gray-600">
              Showing <strong>{itemsPerPage}</strong> of <strong>{total}</strong> products
            </p>

            <div className="flex items-center gap-2">
              <button
                className="bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                disabled={page <= 1}
                onClick={() => fetchProducts(page - 1)}
              >
                <ChevronLeft />
              </button>
              <span className="text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                className=" bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                disabled={page >= totalPages}
                onClick={() => fetchProducts(page + 1)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {selectedProduct && (
            <ProductPreviewModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={() => {
                handleAddToCart(selectedProduct);
                setTimeout(() => {
                  setSelectedProduct(null);
                }, 1000);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Products;
