import React from 'react';
import { TrendingUp, Users, Package, AlertCircle, IndianRupee } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Sales', value: '₹45,231', trend: '+12.5%', icon: IndianRupee, color: 'text-primary', bg: 'bg-primary/10' },
    { title: 'Total Orders', value: '342', trend: '+8.2%', icon: Package, color: 'text-success', bg: 'bg-success/10' },
    { title: 'Products', value: '1,204', trend: '+2.1%', icon: Package, color: 'text-secondary', bg: 'bg-secondary/10' },
    { title: 'Low Stock', value: '14', trend: '-3.4%', icon: AlertCircle, color: 'text-error', bg: 'bg-error-container' },
  ];

  const recentOrders = [
    { id: '#1001', customer: 'John Doe', products: '3 items', total: '₹5,999', status: 'Pending' },
    { id: '#1002', customer: 'Jane Smith', products: '1 item', total: '₹2,499', status: 'Shipped' },
    { id: '#1003', customer: 'Alex Johnson', products: '2 items', total: '₹8,999', status: 'Delivered' },
    { id: '#1004', customer: 'Sarah Williams', products: '5 items', total: '₹12,499', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h2 font-bold text-on-surface">Dashboard Overview</h1>
        <div className="text-body-sm text-on-surface-variant">Last updated: Today at 10:42 AM</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-body-sm font-medium text-on-surface-variant">{stat.title}</p>
                <h3 className="text-h2 font-bold text-on-surface mt-2">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp size={16} className={stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} />
              <span className={`text-body-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
              <span className="text-body-sm text-on-surface-variant ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder for Charts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/20 lg:col-span-2">
          <h3 className="text-h3 font-bold text-on-surface mb-6">Sales Overview</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-lg bg-surface-dim text-on-surface-variant">
            [ Line Chart Area - Sales last 7 days ]
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/20">
          <h3 className="text-h3 font-bold text-on-surface mb-6">Top Categories</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-lg bg-surface-dim text-on-surface-variant">
            [ Bar Chart Area ]
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between">
          <h3 className="text-h3 font-bold text-on-surface">Recent Orders</h3>
          <button className="text-primary text-body-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-dim text-label-caps text-on-surface-variant">
                <th className="px-6 py-4 font-semibold uppercase">Order ID</th>
                <th className="px-6 py-4 font-semibold uppercase">Customer</th>
                <th className="px-6 py-4 font-semibold uppercase">Products</th>
                <th className="px-6 py-4 font-semibold uppercase">Total</th>
                <th className="px-6 py-4 font-semibold uppercase">Status</th>
                <th className="px-6 py-4 font-semibold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-surface-dim/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-on-surface">{order.id}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{order.customer}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{order.products}</td>
                  <td className="px-6 py-4 font-medium text-on-surface">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-dark font-medium mr-3">View</button>
                    <button className="text-secondary hover:text-on-surface font-medium">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
