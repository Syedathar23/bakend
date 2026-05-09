import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, Home, Briefcase, Plane, Edit2, Trash2, Plus, X } from 'lucide-react';
import useToastStore from '../store/toastStore';

export default function AddressesPage() {
  const navigate = useNavigate();
  const addToast = useToastStore(s => s.addToast);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Home',
    label: '',
    fullName: '',
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      label: 'Main Residence',
      fullName: 'Alexander Sterling',
      street: '742 Evergreen Terrace',
      suite: 'Apt 2B',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'United States',
      phone: '+1 (555) 012-3456',
      isDefault: true
    },
    {
      id: 2,
      type: 'Gym/Studio',
      label: 'Studio Office',
      fullName: 'Alexander Sterling',
      street: '100 Fitness Ave',
      suite: 'Suite 405, North Wing',
      city: 'Seattle',
      state: 'WA',
      zip: '98104',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ]);

  const handleLogout = () => {
    addToast('Logged out successfully', 'success');
    navigate('/');
  };

  const getIcon = (type) => {
    if (type === 'Home') return <Home size={20} />;
    if (type === 'Office') return <Briefcase size={20} />;
    if (type === 'Gym/Studio') return <Briefcase size={20} />;
    return <Plane size={20} />;
  };

  const handleDelete = (id, isDefault) => {
    if (isDefault) {
      addToast('Cannot delete your default address.', 'error');
      return;
    }
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(a => a.id !== id));
      addToast('Address deleted successfully', 'success');
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
    addToast('Default address updated', 'success');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    const newAddress = { ...formData, id: Date.now() };
    if (newAddress.isDefault) {
      setAddresses([...addresses.map(a => ({ ...a, isDefault: false })), newAddress]);
    } else {
      setAddresses([...addresses, newAddress]);
    }
    setIsModalOpen(false);
    addToast('Address saved successfully', 'success');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-manrope py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDEBAR */}
          <aside className="lg:w-1/5 shrink-0 h-fit">
            <h2 className="text-[14px] uppercase tracking-wider font-bold text-[#777587] mb-6 px-4">Account Settings</h2>
            
            <nav className="flex flex-col space-y-2">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium text-[#191c1d] hover:bg-white transition-colors">
                <User size={20} />
                Profile
              </Link>
              
              <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium text-[#191c1d] hover:bg-white transition-colors">
                <Package size={20} />
                Orders
              </Link>
              
              <Link to="/addresses" className="flex items-center gap-3 px-4 py-3 rounded-lg text-body-md font-medium bg-[#4f46e5] text-white shadow-sm transition-colors">
                <MapPin size={20} />
                Addresses
              </Link>
            </nav>

            <div className="mt-8 pt-6 border-t border-[#c7c4d8]/40 px-4">
              <button onClick={handleLogout} className="flex items-center gap-3 py-3 w-full text-body-md font-bold text-[#ef4444] hover:text-red-700 transition-colors">
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="lg:w-4/5 bg-[#ffffff] rounded-lg p-8 shadow-sm border border-[#c7c4d8]/20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 pb-6 border-b border-[#c7c4d8]/30 gap-4">
              <div>
                <h2 className="text-[24px] font-bold text-[#191c1d]">Saved Addresses</h2>
                <p className="text-[16px] text-[#777587] mt-1">Manage your shipping and billing locations for faster checkout.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#4f46e5] hover:bg-[#3525cd] text-white font-bold py-2.5 px-6 rounded-[0.5rem] transition-colors shrink-0">
                + Add New Address
              </button>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {addresses.map(addr => (
                <div key={addr.id} className="bg-white border border-[#c7c4d8]/40 rounded-[0.75rem] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col h-full relative">
                  {addr.isDefault && (
                    <div className="absolute top-6 right-6 bg-[#e0e7ff] text-[#4f46e5] text-[12px] font-bold px-3 py-1 rounded-full">
                      DEFAULT
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[#464555] font-bold mb-4">
                    {getIcon(addr.type)}
                    <span className="text-[16px]">{addr.label}</span>
                  </div>
                  
                  <div className="flex-1 space-y-1 text-[16px] text-[#191c1d]">
                    <p className="font-bold">{addr.fullName}</p>
                    <p>{addr.street}</p>
                    {addr.suite && <p>{addr.suite}</p>}
                    <p>{addr.city}, {addr.state} {addr.zip}</p>
                    <p>{addr.country}</p>
                    <p className="pt-2 text-[#464555]">{addr.phone}</p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#c7c4d8]/30">
                    <div className="flex gap-4">
                      <button className="text-[#4f46e5] font-bold text-[14px] flex items-center gap-1 hover:underline">
                        <Edit2 size={14} /> Edit
                      </button>
                      <button onClick={() => handleDelete(addr.id, addr.isDefault)} className="text-[#6b7280] font-bold text-[14px] flex items-center gap-1 hover:text-red-600 transition-colors">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                    {!addr.isDefault && (
                      <button onClick={() => handleSetDefault(addr.id)} className="text-[#4f46e5] font-bold text-[14px] hover:underline">
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Empty State / Add Card */}
              <button onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-[#c7c4d8] rounded-[0.75rem] p-6 flex flex-col items-center justify-center min-h-[280px] hover:bg-[#f8f9fa] transition-colors group">
                <div className="w-16 h-16 rounded-full bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5] mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={28} />
                </div>
                <h3 className="text-[20px] font-bold text-[#191c1d]">New Destination?</h3>
                <p className="text-[14px] text-[#777587] mt-2">Add another address for shipping</p>
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[0.75rem] shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#c7c4d8]/30 sticky top-0 bg-white z-10">
              <h3 className="text-[20px] font-bold text-[#191c1d]">Add New Address</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#777587] hover:text-[#191c1d]">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveAddress} className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">Address Type</label>
                  <select name="type" required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none">
                    <option>Home</option>
                    <option>Gym/Studio</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">Address Label</label>
                  <input required type="text" placeholder="e.g. Main Residence" value={formData.label} onChange={(e) => setFormData({...formData, label: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">Full Name</label>
                <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">Street Address</label>
                  <input required type="text" value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
                </div>
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">Apartment/Suite (Optional)</label>
                  <input type="text" value={formData.suite} onChange={(e) => setFormData({...formData, suite: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">City</label>
                  <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
                </div>
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">State/Province</label>
                  <input required type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
                </div>
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">ZIP/Postal Code</label>
                  <input required type="text" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">Country</label>
                  <select required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] uppercase text-[#777587] font-bold mb-1.5 block">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full bg-[#f3f4f5] border border-[#c7c4d8]/30 rounded-[0.5rem] px-4 py-3 text-[#191c1d] focus:ring-2 focus:ring-[#4f46e5]/50 outline-none" />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer py-2">
                <input type="checkbox" checked={formData.isDefault} onChange={(e) => setFormData({...formData, isDefault: e.target.checked})} className="w-5 h-5 rounded border-[#c7c4d8] text-[#4f46e5] focus:ring-[#4f46e5]" />
                <span className="text-[16px] text-[#191c1d] font-bold">Set as default address</span>
              </label>

              <div className="flex justify-end gap-4 pt-6 border-t border-[#c7c4d8]/30">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-[#f3f4f5] hover:bg-[#e2e4e6] text-[#191c1d] font-bold py-3 px-6 rounded-[0.5rem] transition-colors border border-[#c7c4d8]/40">
                  Cancel
                </button>
                <button type="submit" className="bg-[#4f46e5] hover:bg-[#3525cd] text-white font-bold py-3 px-8 rounded-[0.5rem] transition-colors">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
