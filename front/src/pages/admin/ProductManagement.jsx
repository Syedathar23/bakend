import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

export default function ProductManagement() {
  const [products] = useState([
    { id: 1, name: 'Whey Protein Isolate 2kg', category: 'Supplements', price: '₹2,999', stock: 150, image: '/images/whey-protein.webp' },
    { id: 2, name: 'Resistance Band Set (5pc)', category: 'Equipment', price: '₹1,299', stock: 85, image: '/images/resistance-bands.webp' },
    { id: 3, name: 'Premium Yoga Mat', category: 'Accessories', price: '₹999', stock: 42, image: '/images/yoga-mat.webp' },
    { id: 4, name: 'Adjustable Dumbbells 24kg', category: 'Equipment', price: '₹12,499', stock: 12, image: '/images/dumbbells.webp' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-h2 font-bold text-on-surface">Product Management</h1>
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <div className="p-4 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-outline-variant/40 rounded-lg text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-outline-variant/40 rounded-lg px-4 py-2 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Categories</option>
              <option>Supplements</option>
              <option>Equipment</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-dim text-label-caps text-on-surface-variant">
                <th className="px-6 py-4 font-semibold uppercase">Product</th>
                <th className="px-6 py-4 font-semibold uppercase">Category</th>
                <th className="px-6 py-4 font-semibold uppercase">Price</th>
                <th className="px-6 py-4 font-semibold uppercase">Stock</th>
                <th className="px-6 py-4 font-semibold uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-sm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-dim/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-surface-dim overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-on-surface">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-on-surface">{product.price}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{product.stock}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-primary hover:text-primary-dark p-1.5 rounded bg-primary/10 transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-error hover:text-error p-1.5 rounded bg-error-container transition-colors" title="Delete">
                      <Trash2 size={16} />
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
