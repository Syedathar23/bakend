import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Trash2, Plus, Minus, ChevronRight, CreditCard, Truck, Zap, Check } from "lucide-react";
import useCartStore from "../store/cartStore";
import useToastStore from "../store/toastStore";

export default function CheckoutPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    toggleItemSelection, 
    toggleAllSelection, 
    getSelectedCount, 
    getSubtotal, 
    getTax, 
    getTotal, 
    clearSelectedItems 
  } = useCartStore();
  
  const addToast = useToastStore((s) => s.addToast);
  const navigate = useNavigate();
  const [step, setStep] = useState('cart'); // 'cart' or 'checkout'
  
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [billingSame, setBillingSame] = useState(true);

  const allSelected = items.length > 0 && items.every(item => item.isSelected);
  const selectedCount = getSelectedCount();
  const subtotal = getSubtotal();
  const shipping = step === 'checkout' ? (delivery === "express" ? 25 : 0) : 0;
  const tax = getTax();
  const total = getTotal(shipping);

  const fmt = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(v);

  const handleProceedToBuy = () => {
    if (selectedCount === 0) {
      addToast("Please select at least one item to proceed.", "error");
      return;
    }
    setStep('checkout');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    addToast("Payment successful! Order placed.", "success");
    clearSelectedItems(); // Remove only purchased items
    navigate('/');
  };

  // ---------------------------------------------------------------------------
  // CART VIEW
  // ---------------------------------------------------------------------------
  if (step === 'cart') {
    return (
      <div className="min-h-screen bg-surface-container py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-h2 font-extrabold text-on-surface mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm text-center">
              <h2 className="text-h3 font-bold mb-4">Your cart is empty</h2>
              <p className="text-body-md text-on-surface-variant mb-8">Looks like you haven't added any fitness gear yet.</p>
              <Link to="/shop" className="btn-primary py-3 px-8 text-body-md inline-flex">Start Shopping</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Side: Cart Items */}
              <div className="lg:col-span-3 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-dim">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={allSelected} 
                      onChange={(e) => toggleAllSelection(e.target.checked)} 
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" 
                    />
                    <span className="text-body-md font-semibold text-on-surface">Select All Items</span>
                  </label>
                  <span className="text-body-sm text-on-surface-variant font-medium">Price</span>
                </div>
                
                <div className="divide-y divide-outline-variant/20">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className={`p-6 flex gap-6 transition-colors ${!item.isSelected ? 'opacity-60 bg-surface-dim/30' : 'bg-white'}`}>
                      <div className="flex items-start pt-1">
                        <input 
                          type="checkbox" 
                          checked={item.isSelected} 
                          onChange={() => toggleItemSelection(item.id, item.selectedColor, item.selectedSize)} 
                          className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" 
                        />
                      </div>
                      
                      <div className="w-32 h-32 bg-surface-dim rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-body-lg font-bold text-on-surface">{item.name}</h3>
                            <p className="text-h3 font-bold text-on-surface">{fmt(item.price)}</p>
                          </div>
                          <p className="text-body-sm text-success font-medium mt-1">In Stock</p>
                          <div className="text-body-sm text-on-surface-variant mt-2 space-y-1">
                            {item.selectedColor && <p>Color: <span className="font-semibold">{item.selectedColor}</span></p>}
                            {item.selectedSize && <p>Size: <span className="font-semibold">{item.selectedSize}</span></p>}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-outline-variant/40 rounded-lg bg-surface-dim">
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center text-body-sm font-semibold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => removeItem(item.id, item.selectedColor, item.selectedSize)}
                            className="text-body-sm font-semibold text-error hover:text-red-700 flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 size={16} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="text-h3 font-bold text-on-surface mb-4">Summary</h3>
                  
                  <div className="space-y-3 mb-6 pb-6 border-b border-outline-variant/20 text-body-md">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Subtotal ({selectedCount} items)</span>
                      <span className="font-medium">{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Estimated Tax</span>
                      <span className="font-medium">{fmt(tax)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-body-lg font-bold text-on-surface">Total</span>
                    <span className="text-h2 font-extrabold text-primary">{fmt(total)}</span>
                  </div>
                  
                  <button 
                    onClick={handleProceedToBuy}
                    disabled={selectedCount === 0}
                    className={`w-full py-4 rounded-lg font-bold text-white transition-all ${selectedCount === 0 ? 'bg-outline-variant cursor-not-allowed' : 'bg-primary hover:bg-primary-dark shadow-md hover:-translate-y-0.5'}`}
                  >
                    Proceed to Buy
                  </button>
                  
                  <p className="text-center text-label-caps text-outline mt-4 flex items-center justify-center gap-1.5">
                    <Lock size={14} /> Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // CHECKOUT VIEW
  // ---------------------------------------------------------------------------
  const selectedItems = items.filter(item => item.isSelected);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-outline-variant/20">
        <div className="max-w-container mx-auto px-6 py-4">
          <nav className="flex items-center justify-center gap-2" aria-label="Checkout progress">
            <button onClick={() => setStep('cart')} className="text-body-sm font-medium text-primary hover:underline">Cart</button>
            <ChevronRight size={16} className="text-outline-variant" />
            <span className="text-body-sm font-medium text-primary">Checkout</span>
            <ChevronRight size={16} className="text-outline-variant" />
            <span className="text-body-sm font-medium text-outline">Payment</span>
          </nav>
        </div>
      </div>

      <div className="max-w-container mx-auto px-6 py-8 lg:py-12">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3 space-y-8">
              
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-outline-variant/20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary text-white text-body-sm font-bold flex items-center justify-center">1</span>
                  <h2 className="text-h3 text-on-surface font-bold">Delivery Method</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "standard", icon: Truck, title: "Standard Shipping", desc: "3–5 business days", price: "Free", priceClass: "text-success" },
                    { key: "express", icon: Zap, title: "Express Delivery", desc: "1–2 business days", price: "$25.00", priceClass: "text-on-surface" },
                  ].map((opt) => (
                    <button key={opt.key} type="button" onClick={() => setDelivery(opt.key)}
                      className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${delivery === opt.key ? "border-primary bg-primary/5" : "border-outline-variant/30 hover:border-outline-variant"}`}>
                      <opt.icon size={22} className={delivery === opt.key ? "text-primary" : "text-outline"} />
                      <div>
                        <p className="text-body-md font-semibold text-on-surface">{opt.title}</p>
                        <p className="text-body-sm text-on-surface-variant mt-0.5">{opt.desc}</p>
                        <p className={`text-body-md font-bold mt-2 ${opt.priceClass}`}>{opt.price}</p>
                      </div>
                      {delivery === opt.key && <Check size={18} className="text-primary ml-auto flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-outline-variant/20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary text-white text-body-sm font-bold flex items-center justify-center">2</span>
                  <h2 className="text-h3 text-on-surface font-bold">Payment Details</h2>
                </div>
                <div className="flex gap-3 mb-6">
                  <button type="button" onClick={() => setPayment("apple")} className={`flex-1 py-3 rounded-lg text-body-sm font-semibold transition-all ${payment === "apple" ? "bg-on-surface text-white" : "bg-surface-dim text-on-surface-variant border border-outline-variant/30"}`}>
                     Apple Pay
                  </button>
                  <button type="button" onClick={() => setPayment("card")} className={`flex-1 py-3 rounded-lg text-body-sm font-semibold transition-all flex items-center justify-center gap-2 ${payment === "card" ? "bg-on-surface text-white" : "bg-surface-dim text-on-surface-variant border border-outline-variant/30"}`}>
                    <CreditCard size={16} /> Credit Card
                  </button>
                </div>
                {payment === "card" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div>
                      <label className="text-label-caps text-on-surface-variant mb-1.5 block uppercase">Card Number</label>
                      <div className="relative">
                        <input type="text" className="w-full bg-white border border-outline-variant/40 rounded-lg px-4 py-3 pr-12 text-body-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="1234 5678 9012 3456" required />
                        <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-label-caps text-on-surface-variant mb-1.5 block uppercase">Expiry Date</label>
                         <input type="text" className="w-full bg-white border border-outline-variant/40 rounded-lg px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="MM/YY" required />
                       </div>
                       <div>
                         <label className="text-label-caps text-on-surface-variant mb-1.5 block uppercase">CVV</label>
                         <input type="text" className="w-full bg-white border border-outline-variant/40 rounded-lg px-4 py-3 text-body-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="123" required />
                       </div>
                    </div>
                  </motion.div>
                )}
              </motion.section>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-outline-variant/20 sticky top-24">
                <h2 className="text-h3 font-bold text-on-surface mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                  {selectedItems.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-16 h-16 bg-surface-dim rounded-lg overflow-hidden flex-shrink-0 border border-outline-variant/20">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-body-sm font-bold text-on-surface truncate">{item.name}</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">Qty: {item.quantity}</p>
                        <p className="text-body-sm font-bold text-primary mt-1">{fmt(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-outline-variant/20 pt-4 space-y-3">
                  <div className="flex justify-between text-body-sm"><span className="text-on-surface-variant">Subtotal</span><span className="font-medium text-on-surface">{fmt(subtotal)}</span></div>
                  <div className="flex justify-between text-body-sm"><span className="text-on-surface-variant">Shipping</span><span className="font-medium text-on-surface">{shipping === 0 ? "Free" : fmt(shipping)}</span></div>
                  <div className="flex justify-between text-body-sm"><span className="text-on-surface-variant">Taxes</span><span className="font-medium text-on-surface">{fmt(tax)}</span></div>
                  <div className="border-t border-outline-variant/20 pt-3 flex justify-between items-end">
                    <span className="text-body-lg font-bold text-on-surface">Total</span>
                    <span className="text-h2 font-extrabold text-primary">{fmt(total)}</span>
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-lg mt-6 transition-all shadow-md hover:-translate-y-0.5">Pay {fmt(total)}</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
