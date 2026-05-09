import React, { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';

export default function OrderManagement() {
  const [orders] = useState([
    { id: '#1001', customer: 'John Doe', date: '05/05/2026', products: '3 items', total: '₹5,999', status: 'Pending' },
    { id: '#1002', customer: 'Jane Smith', date: '04/05/2026', products: '1 item', total: '₹2,499', status: 'Processing' },
    { id: '#1003', customer: 'Alex Johnson', date: '02/05/2026', products: '2 items', total: '₹8,999', status: 'Shipped' },
    { id: '#1004', customer: 'Sarah Williams', date: '01/05/2026', products: '5 items', total: '₹12,499', status: 'Delivered' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-h2 font-bold text-on-surface">Order Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full pl-10 pr-4 py-2 border border-outline-variant/40 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-surface-dim border border-outline-variant/40 hover:bg-outline-variant/20 text-on-surface font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors text-body-sm">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-dim text-label-caps text-on-surface-variant">
                <th className="px-6 py-4 font-semibold uppercase">Order ID</th>
                <th className="px-6 py-4 font-semibold uppercase">Customer</th>
                <th className="px-6 py-4 font-semibold uppercase">Date</th>
                <th className="px-6 py-4 font-semibold uppercase">Products</th>
                <th className="px-6 py-4 font-semibold uppercase">Total</th>
                <th className="px-6 py-4 font-semibold uppercase">Status</th>
                <th className="px-6 py-4 font-semibold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-dim/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-on-surface">{order.id}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{order.customer}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{order.date}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{order.products}</td>
                  <td className="px-6 py-4 font-medium text-on-surface">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Processing' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-dark p-1.5 rounded bg-primary/10 transition-colors" title="View Order">
                      <Eye size={16} />
                    </button>
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
