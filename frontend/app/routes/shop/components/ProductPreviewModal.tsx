import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { IProduct } from '~/types';
import { useProductStore } from '~/store/productStore';
import { useAuthStore } from '~/store/authStore';
import { getShopById } from '~/api/shop';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const ProductPreviewModal = ({
  product,
  onClose,
  onAddToCart,
}: {
  product: IProduct;
  onClose: () => void;
  onAddToCart: () => void;
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const [storeNames, setStoreNames] = useState<{ [key: string]: string }>({});

  const { products, fetchProducts, loading } = useProductStore();

  const {user, fetchUser} = useAuthStore();

  const navigate = useNavigate();

  const isLoading = !storeNames[product.storeId];

  useEffect(() => {
    const fetchStoreNames = async () => {
      const uniqueStoreIds = [...new Set(products.map((p) => p.storeId))];

      const storeData = await Promise.all(
        uniqueStoreIds.map(async (id) => {
          try {
            const store = await getShopById(id);
            return { id, name: store.name };
          } catch {
            return { id, name: 'Unknown Store' };
          }
        })
      );

      const map = Object.fromEntries(storeData.map(({ id, name }) => [id, name]));
      setStoreNames(map);
    };

    fetchStoreNames();
  }, [products]);


  const handleClick = () => {
    if(!user){
      toast.error("Please log in first!")
      navigate("/login")
    }
    else{
      onAddToCart();
      setIsAdded(true);
  
      setTimeout(() => {
        setIsAdded(false);
      }, 2500);
    }

  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center bg-opacity-50">
        <div className="bg-white rounded-lg w-[80%] max-w-4xl p-6 relative animate-pulse">
          <div className="flex items-center gap-8">
            {/* Image Skeleton */}
            <div className="w-1/2 h-80 bg-gray-200 rounded-lg" />

            {/* Details Skeleton */}
            <div className="w-1/2 flex flex-col gap-4">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="flex gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-10 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="h-10 bg-gray-300 rounded w-1/2 mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-50  bg-black/50 backdrop-blur-sm flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg w-[80%] max-w-4xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <X />
        </button>

        <div className="flex items-center gap-8">
          <div className="w-1/2 space-y-4">
            <img src={product.productImage} alt={product.name} className="w-full  object-contain" />
          </div>

          <div className="w-1/2 space-y-3 flex flex-col h-full justify-between">
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">${product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm text-gray-600">
                Seller: {storeNames[product.storeId] || 'Loading...'}
              </p>{' '}
            </div>

            {/* Dummy sizes */}
            <div className="flex gap-2 mt-4">
              {['XS', 'S', 'M', 'L'].map((size) => (
                <span
                  key={size}
                  className="border px-3 py-1 rounded text-sm cursor-pointer hover:bg-gray-100"
                >
                  {size}
                </span>
              ))}
            </div>

            <button
              className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 cursor-pointer"
              onClick={handleClick}
            >
              {isAdded ? 'ADDED! ' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewModal;
