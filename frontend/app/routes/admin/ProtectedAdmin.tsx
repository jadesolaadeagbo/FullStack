import AdminRoute from '../AdminRoute';
import Sidebar from './Sidebar';
import ProductsDashboard from './ProductsDashboard';
import ShopDashboard from './ShopDashboard';
import Dashboard from './Dashboard';
import CreateAdmin from './CreateAdmin';

export default function ProtectedAdmin() {
  return (
    <AdminRoute>
      <Sidebar />
      <ProductsDashboard />
      <ShopDashboard />
      <Dashboard />
      <CreateAdmin />
    </AdminRoute>
  );
}
