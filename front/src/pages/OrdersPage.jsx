import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, ArrowRight, ShoppingBag } from 'lucide-react';
import useToastStore from '../store/toastStore';

export default function OrdersPage() {
  const navigate = useNavigate();
  const addToast = useToastStore(s => s.addToast);

  const handleLogout = () => {
    addToast('Logged out successfully', 'success');
    navigate('/');
  };

  const getExpectedDelivery = (status, orderDateStr) => {
    const date = new Date(orderDateStr);
    if (status === 'Processing') {
      date.setDate(date.getDate() + 7);
      return `Expected delivery: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (status === 'Shipped') {
      date.setDate(date.getDate() + 3);
      return `Expected delivery: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return null;
  };

  // Mock database fetch restricted to last 12 months
  const mockOrders = [
    {
      order_id: '1',
      order_number: 'LX-9201',
      product_image: '/images/whey-protein.webp',
      status: 'Processing',
      order_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      total_price: 49.99
    },
    {
      order_id: '2',
      order_number: 'LX-8542',
      product_image: '/images/dumbbells.webp',
      status: 'Shipped',
      order_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      total_price: 124.00
    },
    {
      order_id: '3',
      order_number: 'LX-7103',
      product_image: '/images/resistance-bands.webp',
      status: 'Delivered',
      order_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      total_price: 29.99
    }
  ];

  // Sort descending (newest first)
  const sortedOrders = [...mockOrders].sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-manrope">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDEBAR (20%) */}
          <aside className="lg:w-1/5 bg-[#f8f9fa] h-fit shrink-0">
            <h2 className="text-h3 font-bold text-[#191c1d] mb-6 px-4">Account</h2>
            
            <nav className="flex flex-col space-y-2">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium text-[#191c1d] hover:bg-white transition-colors">
                <User size={20} />
                Profile
              </Link>
              
              <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium bg-[#4f46e5] text-white transition-colors shadow-sm">
                <Package size={20} />
                Orders
              </Link>
              
              <Link to="/addresses" className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium text-[#191c1d] hover:bg-white transition-colors">
                <MapPin size={20} />
                Addresses
              </Link>
            </nav>

            <div className="mt-8 pt-6 border-t border-[#c7c4d8]/40 px-4">
              <button onClick={handleLogout} className="flex items-center gap-3 py-3 w-full text-body-md font-bold text-red-600 hover:text-red-700 transition-colors">
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT (80%) */}
          <main className="lg:w-4/5 bg-[#ffffff] rounded-lg p-8 shadow-sm border border-[#c7c4d8]/20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#c7c4d8]/30 pb-6 mb-8">
              <div>
                <h1 className="text-[32px] font-bold text-[#191c1d] leading-tight">Recent Orders</h1>
                <p className="text-body-md text-[#777587] mt-1">View and manage your purchase history from the last 12 months</p>
              </div>
              <div className="text-label-caps text-[#464555] uppercase tracking-wider font-bold bg-[#f3f4f5] px-4 py-2 rounded-lg self-start">
                {sortedOrders.length} TOTAL ORDERS
              </div>
            </div>

            {/* Orders List */}
            {sortedOrders.length > 0 ? (
              <div className="space-y-[24px]">
                {sortedOrders.map((order) => {
                  const orderDate = new Date(order.order_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  const expectedDelivery = getExpectedDelivery(order.status, order.order_date);
                  
                  return (
                    <div 
                      key={order.order_id} 
                      onClick={() => navigate(`/order-details/${order.order_id}`)}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg border border-[#c7c4d8]/40 hover:border-[#4f46e5]/40 hover:shadow-sm transition-all cursor-pointer group gap-6"
                    >
                      {/* Left (Image) & Middle (Info) */}
                      <div className="flex items-center gap-6 flex-1 min-w-0">
                        <div className="w-[80px] h-[80px] bg-[#f8f9fa] rounded-lg overflow-hidden shrink-0 border border-[#c7c4d8]/20">
                          <img src={order.product_image} alt={order.order_number} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="text-[12px] text-[#4f46e5] uppercase font-bold tracking-wider">
                            ORDER #{order.order_number}
                          </span>
                          
                          <span className={`text-[20px] font-bold ${
                            order.status === 'Delivered' ? 'text-[#10B981]' :
                            order.status === 'Processing' ? 'text-orange-500' :
                            order.status === 'Cancelled' ? 'text-[#BA1A1A]' :
                            'text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                          
                          <div className="flex flex-col mt-0.5">
                            <span className="text-[14px] text-[#777587]">
                              Placed on {orderDate}
                            </span>
                            {expectedDelivery && (
                              <span className="text-[14px] text-[#191c1d] font-semibold mt-0.5">
                                {expectedDelivery}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right (Price & Link) */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-2">
                        <span className="text-[24px] font-extrabold text-[#191c1d]">
                          ${order.total_price.toFixed(2)}
                        </span>
                        <span className="text-[14px] font-bold text-[#4f46e5] flex items-center gap-1 group-hover:underline">
                          View Details <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-[#f8f9fa] rounded-full flex items-center justify-center text-[#777587] mb-6">
                  <ShoppingBag size={40} />
                </div>
                <h3 className="text-[24px] font-bold text-[#191c1d] mb-2">Looking for something else?</h3>
                <p className="text-[16px] text-[#777587] mb-8 max-w-md">
                  You haven't placed any orders yet. Start shopping to add fitness gear to your history.
                </p>
                <Link to="/shop" className="bg-[#4f46e5] hover:bg-[#3525cd] text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block w-full sm:w-auto">
                  Continue Shopping
                </Link>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
