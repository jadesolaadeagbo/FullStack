import React, { useEffect } from 'react';
import { useProductStore } from '~/store/productStore';
import Pagination from './Pagination';
import AdminRoute from '../AdminRoute';

const ProductsDashboard = () => {
  React.useEffect(() => {
    document.title = 'Products Dashboard';
  }, []);

  const {
    products,
    fetchProducts,
    loading: productsLoading,
    totalPages,
    total,
    page,
  } = useProductStore();
  const itemsPerPage = products.length;

  useEffect(() => {
    fetchProducts(1, 10);
  }, []);

  return (
    <AdminRoute>
      <main className=" w-[98%]">
        {productsLoading ? (
          <div className="fixed inset-0 z-50 flex justify-center items-center ">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
          </div>
        ) : (
          <section className="space-y-5 w-[75vw]">
            <div className="flex ">
              <h3 className="text-xl font-semibold">Products</h3>
            </div>

            <table className="w-full bg-white rounded shadow h-[80vh]">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product.description}</td>
                      <td className="p-3">{product.price}</td>
                      <td className="p-3">{product.stock}</td>
                      <td className="p-3">
                        <button className="text-sm text-blue-600 hover:underline">Edit</button>
                      </td>
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

            <Pagination
              itemsPerPage={itemsPerPage}
              total={total}
              totalPages={totalPages}
              page={page}
              fetchProducts={fetchProducts}
              itemName="products"
            />
          </section>
        )}
      </main>
    </AdminRoute>
  );
};

export default ProductsDashboard;
