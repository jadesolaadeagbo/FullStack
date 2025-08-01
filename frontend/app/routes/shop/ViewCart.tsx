import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from './components/Navbar';
import { Minus, Plus, Trash2, ChevronLeft } from 'lucide-react';
import { useCartStore } from '~/store/cartStore';
import Loader from '~/components/Loader';
import { toast } from 'react-toastify';

export default function ViewCart() {
  const navigate = useNavigate();
  const { fetchCart, items, loading, updateQuantity, removeItem } = useCartStore();
  const [loadingItems, setLoadingItems] = useState<{ [id: string]: boolean }>({});


  useEffect(() => {
    document.title = 'View Cart';
  }, []);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    console.log('CART ITEMS:', items);
  }, [items]);

  const increment = async (id: string, quantity: number) => {
setLoadingItems((prev) => ({ ...prev, [id]: true }));
    try {
      await updateQuantity(id, quantity + 1);
      toast.success("Cart updated")
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || 'Failed to update cart');
    } finally {
      setLoadingItems((prev) => ({ ...prev, [id]: false }));
    }
  };

  const decrement = async (id: string, quantity: number) => {
    if (quantity > 1) {
      setLoadingItems((prev) => ({ ...prev, [id]: true }));
      try {
        await updateQuantity(id, quantity - 1);
        toast.success("Cart updated")
      } catch (error: any) {
        toast.dismiss();
        toast.error(error.message || 'Failed to update cart');
      } finally {
        setLoadingItems((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) return <Loader />;



  return (
    <>
    <Navbar />
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className=" p-6 bg-gray-100 h-[90vh]">
            {/* Left Cart Items */}
            <button className='flex pl-36 hover:text-blue-400 cursor-pointer'>
            <ChevronLeft/>
            <p className='pb-5' onClick={() => navigate(-1)}>Go back</p>
            </button>
          <div className='flex flex-col md:flex-row justify-center  gap-4'>

          
            <div className="bg-white rounded-lg shadow p-6 flex-1 max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Cart ({items.length})</h2>
              {items.map((item) => (
                <div
                  key={item._id}
                  className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                >
                  <div className="flex gap-4">
                    <img src={item.product.productImage} alt={item.product.name} className="w-20 h-20 object-contain" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            ${item.product.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                        <button
  disabled={loadingItems[item.product._id]}
  className="bg-blue-800 text-white p-1.5 rounded shadow disabled:bg-gray-400 cursor-pointer"
  onClick={() => decrement(item.product._id, item.quantity)}
>
  <Minus size={16} />
</button>

<span className="px-2">{item.quantity}</span>

<button
  disabled={loadingItems[item.product._id]}
  className="bg-blue-800 text-white p-1.5 rounded shadow disabled:bg-gray-400 cursor-pointer"
  onClick={() => increment(item.product._id, item.quantity)}
>
  <Plus size={16} />
</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-1 text-blue-700 mt-3 text-sm cursor-pointer"
                    onClick={() => removeItem(item.product._id)}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-6 w-full md:w-80 h-fit">
              <h2 className="text-lg font-semibold mb-4">CART SUMMARY</h2>
              <div className="flex justify-between text-gray-700 font-medium mb-4">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium mb-4">
                <span>Number of items</span>
                <span>{items.length}</span>
              </div>
              <button className="bg-blue-700 text-white w-full py-2 rounded shadow font-semibold hover:bg-blue-700 transition cursor-pointer" onClick={() => alert('Proceeding to checkout...')}>
                Checkout (${total})
              </button>
            </div>
            {/* <button>Clear Cart</button> */}
            </div>
          </div>
        </>
      )}

    </>
  );
}
