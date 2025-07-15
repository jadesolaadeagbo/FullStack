import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    quantity: 1,
  },
  { id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts', price: 22.3, quantity: 1 },
];

export default function ViewCart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'View Cart';
  });

  const increment = (id: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrement = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="p-20">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>

        <div className="bg-white shadow rounded mb-6 mt-10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Quantity</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b items-center">
                  <td className="p-4">${item.title}</td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="text-blue-500 cursor-pointer"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="text-blue-500 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white bg-gray-300 rounded-2xl cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-lg font-bold">
            ${total},{' '}
            <span className="font-normal text-gray-600">
              {itemCount} item{itemCount > 1 ? 's' : ''}
            </span>
          </p>
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Go Back
          </button>
          <button
            onClick={() => alert('Proceeding to checkout...')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 cursor-pointer"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </>
  );
}
