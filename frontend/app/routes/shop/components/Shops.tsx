import { useEffect, useRef } from 'react';
import bulb from 'public/bulb.jpg';
import type { IStore } from '~/types';
import { useShopStore } from '~/store/shopStore';

const Stores = () => {
  const { shops, fetchShops, loading } = useShopStore();

  useEffect(() => {
    fetchShops(1);
  }, []);
  return (
    <div className="bg-gray-100">
      <h1 className="text-center py-20 text-3xl">VISIT OUR STORES</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading stores...</p>
      ) : (
        <div className="px-20 flex flex-wrap gap-y-12">
          {shops.map((shop, index) => {
            return (
              <div
                key={shop._id || index}
                className="w-[25%] p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={shop.storeImage}
                  alt={shop.name}
                  className="w-full h-[250px] object-cover mb-4"
                />

                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-light">{shop.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Stores;
