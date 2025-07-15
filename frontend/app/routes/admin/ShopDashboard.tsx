import { useState, useEffect } from 'react';
import { useShopStore } from '~/store/shopStore';
import { useProductStore } from '~/store/productStore';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import type { IStore, IProduct } from '~/types';
import { updateShop, deleteShop } from '~/api/shop';
import { X } from 'lucide-react';
import AdminRoute from '../AdminRoute';

export default function ShopDashboard() {
  useEffect(() => {
    document.title = 'Stores';
  }, []);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<IStore | null>(null);
  const [editName, setEditName] = useState('');
  const [form, setForm] = useState({ name: '', description: '', location: '' });
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });
  const {
    shops,
    fetchSingleShop,
    fetchShops,
    loading: shopsLoading,
    createShop,
    totalPages,
    total,
    page,
  } = useShopStore();
  const { createProduct } = useProductStore();
  const itemsPerPage = shops.length;

  useEffect(() => {
    fetchShops();
  }, []);

  const handleCreateStore = async () => {
    try {
      await createShop(form);
      toast.success('Store created successfully');
      setShowCreateModal(false);
      setForm({ name: '', description: '', location: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to create store');
    }
  };

  const handleOpenStore = async (storeId: string) => {
    try {
      await fetchSingleShop(storeId);

      const store = useShopStore.getState().selectedShop;

      if (store) {
        setSelectedStore(store);
        setEditName(store.name);
        setShowStoreModal(true);
      } else {
        toast.error('Store not found');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch store');
    }
  };
  const handleUpdateStore = async () => {
    if (!selectedStore) return;

    try {
      await updateShop(selectedStore._id, {
        name: editName,
        description: selectedStore.description,
        location: selectedStore.location,
      });
      toast.success('Store name updated');
      fetchShops();
    } catch (err) {
      toast.error('Failed to update store');
    }
  };

  const handleDeleteStore = async () => {
    if (!selectedStore) return;

    try {
      await deleteShop(selectedStore._id);
      toast.success('Store deleted');
      setShowStoreModal(false);
      setSelectedStore(null);
      fetchShops();
    } catch (err) {
      toast.error('Failed to delete store');
    }
  };
  const createStoreProduct = async () => {
    if (!selectedStore) return; // ✅ ensures ._id access is safe

    try {
      const payload = {
        ...productForm,
        storeId: selectedStore._id,
      };
      await createProduct(payload);
      toast.success('Product created');
      setShowProductModal(false);
      setProductForm({ name: '', description: '', price: 0, stock: 0 });
      handleOpenStore(selectedStore._id);
    } catch (err: any) {
      toast.error(err.message || 'Failed to create product');
    }
  };

  return (
    <AdminRoute>
      <main className="w-[98%] ">
        {shopsLoading ? (
          <div className="fixed inset-0 z-50 flex justify-center items-center ">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
          </div>
        ) : (
          <section className="w-[75vw]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Stores</h3>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                + Create Store
              </button>
            </div>
            <table className="w-full bg-white rounded shadow h-[80vh]">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Date Created</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shops.length > 0 ? (
                  shops.map((shop, idx) => (
                    <tr key={idx} className="border-t">
                      <td
                        className="p-3 font-medium cursor-pointer"
                        onClick={() => handleOpenStore(shop._id)}
                      >
                        {shop.name}
                      </td>
                      <td className="p-3">{shop.description}</td>
                      <td className="p-3">{shop.location}</td>
                      <td className="p-3">
                        {new Date(shop.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="p-3">
                        <button
                          className="text-sm text-blue-600 hover:underline cursor-pointer"
                          onClick={() => handleOpenStore(shop._id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3 text-gray-500 italic text-center" colSpan={5}>
                      No stores available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              itemsPerPage={itemsPerPage}
              total={total}
              totalPages={totalPages}
              page={page}
              fetchProducts={fetchShops}
              itemName="shops"
            />
          </section>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-[400px] space-y-4">
              <h2 className="text-xl font-semibold">Create Store</h2>
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Store name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateStore}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showStoreModal && selectedStore && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-[80vw] space-y-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{selectedStore.name}</h2>
                <X onClick={() => setShowStoreModal(false)} className="cursor-pointer" />
              </div>

              <p className="text-gray-600">{selectedStore.description}</p>
              <table className="w-full bg-white rounded shadow h-[60vh]">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(selectedStore.products) && selectedStore.products.length > 0 ? (
                    selectedStore.products.map((product: IProduct, i: number) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3">{product.description}</td>
                        <td className="p-3">{product.price}</td>
                        <td className="p-3">{product.stock}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-3 text-gray-500 italic text-center" colSpan={5}>
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-between pt-4">
                <input
                  className="border px-2 py-1 rounded w-full mr-2"
                  placeholder="Edit store name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button
                  onClick={handleUpdateStore}
                  className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 cursor-pointer"
                >
                  Update
                </button>
              </div>
              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setShowProductModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                  Add Product
                </button>
                <button
                  onClick={handleDeleteStore}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                >
                  Delete Store
                </button>
              </div>
            </div>
          </div>
        )}

        {showProductModal && selectedStore && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-[400px] space-y-4">
              <h2 className="text-xl font-semibold">Add Product to {selectedStore.name}</h2>
              <label>Product Name:</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              />
              <label>Description:</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              />
              <label>Price:</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
              />
              <label>Stock:</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded"
                placeholder="Stock"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={createStoreProduct}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AdminRoute>
  );
}
