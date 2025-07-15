import { ShoppingBag, Store, Users2 } from 'lucide-react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useShopStore } from '~/store/shopStore';
import { useProductStore } from '~/store/productStore';
import AdminRoute from '../AdminRoute';

interface SummaryCardProps {
  icon: ReactNode;
  label: string;
  value: number;
}

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const { shops } = useShopStore();
  const { products } = useProductStore();
  const shopsLength = shops.length;
  const productsLength = products.length;

  return (
    <AdminRoute>
      <div className="flex flex-col w-[75vw] space-y-5">
        <h1 className="text-xl">Dashboard</h1>

        <div className="flex flex-col gap-10">
          <div className="flex justify-between gap-10">
            <SummaryCard icon={<ShoppingBag />} label="Total Orders" value={1250} />
            <SummaryCard icon={<Users2 />} label="Products" value={productsLength} />
            <SummaryCard icon={<Store />} label="Stores" value={shopsLength} />
            {/* <SummaryCard icon={<Wallet />} label="Net Profit" value="$45,360" /> */}
          </div>

          <div className="bg-white rounded shadow p-4 w-full">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b pb-1">
                <span>#3210 Jenny Wilson</span>
                <span>Jul 24, 2023</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>#3209 Jacob Jones</span>
                <span className="text-yellow-600">Pending</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>#3309 Kristin Watson</span>
                <span className="text-green-600">Completed</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>#3207 Cody Fisher</span>
                <span className="text-red-600">Canceled</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Sales</h3>
            <div className="h-32 flex items-center justify-center text-gray-400">
              [Donut Chart Placeholder]
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Dashboard;

function SummaryCard({ icon, label, value }: SummaryCardProps) {
  return (
    <div className="bg-white rounded shadow w-250 p-4 flex flex-col gap-4">
      <div className="p-2 rounded text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}
