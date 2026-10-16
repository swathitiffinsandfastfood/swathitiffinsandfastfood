import React, { useState, useRef } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, CheckCircle2, ArrowRight, ShoppingBag, AlertCircle } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

export interface CartItemType {
  item: MenuItem;
  size?: 'half' | 'full';
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (itemId: string, size: 'half' | 'full' | undefined, newQty: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
}) => {
  const { orderPolicy, contact, brand } = RESTAURANT_CONFIG;
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<{ id: string; total: number } | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  const getItemPrice = (ci: CartItemType) => {
    if (ci.item.hasSizes && ci.item.prices && ci.size) {
      return ci.item.prices[ci.size];
    }
    return ci.item.price;
  };

  const subtotal = items.reduce((sum, ci) => sum + getItemPrice(ci) * ci.quantity, 0);
  const grandTotal = subtotal;

  const validateAddress = () => {
    if (!customerAddress.trim()) {
      setAddressError(true);
      addressInputRef.current?.focus();
      addressInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    setAddressError(false);
    return true;
  };

  const generateWhatsAppMessage = () => {
    const orderNumber = `ST-${Math.floor(1000 + Math.random() * 9000)}`;
    let msg = `*🍽️ NEW ORDER #${orderNumber}*\n`;
    msg += `*${brand.name.toUpperCase()}*\n`;
    msg += `📍 Branch: ${contact.fullAddress}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*📋 ORDER TYPE:* ${orderType === 'delivery' ? '🚚 DOORSTEP DELIVERY' : '🛍️ TAKEAWAY / COUNTER PICKUP'}\n`;
    if (customerName.trim()) msg += `*👤 Customer Name:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) msg += `*📞 Phone:* ${customerPhone.trim()}\n`;
    msg += `*📍 ${orderType === 'delivery' ? 'Delivery Address' : 'Address / Locality'}:* ${customerAddress.trim()}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*🛒 ITEMS ORDERED (${items.reduce((s, i) => s + i.quantity, 0)} items):*\n`;

    items.forEach((ci, idx) => {
      const sizeText = ci.size ? ` (${ci.size.toUpperCase()})` : '';
      const price = getItemPrice(ci) * ci.quantity;
      msg += `${idx + 1}. *${ci.item.name}${sizeText}* x ${ci.quantity} = ${orderPolicy.currencySymbol}${price}\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*💰 BILL BREAKDOWN:*\n`;
    msg += `• Items Subtotal: ${orderPolicy.currencySymbol}${subtotal}\n`;
    msg += `*👉 GRAND TOTAL: ${orderPolicy.currencySymbol}${grandTotal}*\n`;
    msg += `• Payment: Cash on Delivery / UPI upon arrival\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm this order and let me know the preparation/delivery time. Thank you!`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    if (!validateAddress()) return;
    const msg = generateWhatsAppMessage();
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${msg}`, '_blank');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validateAddress()) return;
    const newOrderId = `ST-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderPlaced({ id: newOrderId, total: grandTotal });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F5F1E8] border-l border-[#20201C] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-[#171714] text-[#F5F1E8] flex items-center justify-between border-b border-[#2A2A24]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D9A928]" />
              <h2 className="font-serif-title text-xl font-bold">Your Order Cart</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#20201C] text-[#D9A928] tabular-nums font-semibold">
                {items.length} {items.length === 1 ? 'dish' : 'dishes'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content */}
          {orderPlaced ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-[#171714] mb-2">
                Order Received!
              </h3>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#A94D32] mb-3">
                Order ID: #{orderPlaced.id}
              </p>
              <p className="text-sm text-[#20201C]/80 mb-6 max-w-xs">
                Our kitchen has received your order. We are preparing it fresh and hot. Pay <strong className="text-[#171714]">₹{orderPlaced.total}</strong> via Cash or UPI upon arrival.
              </p>
              
              <div className="w-full p-4 bg-white rounded-xl border border-[#EAE3D5] mb-4 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Service:</span>
                  <span className="font-semibold text-stone-800 capitalize">{orderType}</span>
                </div>
                {customerName && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Customer:</span>
                    <span className="font-semibold text-stone-800">{customerName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Time:</span>
                  <span className="font-semibold text-emerald-700">15–25 mins</span>
                </div>
              </div>

              {/* Order Confirmation Screen */}
              <div className="w-full space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow cursor-pointer active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order Details on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOrderPlaced(null);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-2.5 bg-[#171714] text-white text-xs font-semibold rounded-lg hover:bg-[#20201C]"
                >
                  Close & Back to Menu
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#EAE3D5] flex items-center justify-center text-[#171714]/40 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif-title text-xl font-bold text-[#171714] mb-1">
                Your cart is empty
              </p>
              <p className="text-xs text-[#20201C]/60 mb-6 max-w-xs">
                Explore our traditional tiffins, flavourful biryanis, and wok fast food to add items.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#171714] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#D9A928] hover:text-[#171714] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              
              {/* Delivery vs Pickup switch */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#EAE3D5] rounded-lg">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#171714] text-white shadow'
                      : 'text-[#171714]/70 hover:text-[#171714]'
                  }`}
                >
                  Doorstep Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[#171714] text-white shadow'
                      : 'text-[#171714]/70 hover:text-[#171714]'
                  }`}
                >
                  Takeaway / Pickup
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((ci) => {
                  const price = getItemPrice(ci);
                  return (
                    <div
                      key={`${ci.item.id}-${ci.size || 'default'}`}
                      className="p-3.5 bg-white rounded-xl border border-[#EAE3D5] flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif-title text-base font-bold text-[#171714] truncate">
                            {ci.item.name}
                          </h4>
                          {ci.size && (
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#F5F1E8] text-[#A94D32]">
                              {ci.size}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#20201C]/60 tabular-nums">
                          ₹{price} each
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#EAE3D5] rounded-md bg-[#F5F1E8]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.item.id, ci.size, ci.quantity - 1)}
                            className="p-1 hover:bg-[#EAE3D5] rounded-l text-[#171714] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#171714] tabular-nums">
                            {ci.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.item.id, ci.size, ci.quantity + 1)}
                            className="p-1 hover:bg-[#EAE3D5] rounded-r text-[#171714] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right min-w-[50px]">
                          <span className="font-serif-title text-sm font-bold text-[#171714] tabular-nums">
                            ₹{price * ci.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer Contact Inputs */}
              <div className="p-4 bg-white rounded-xl border border-[#EAE3D5] space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#A94D32]">
                    Order & Delivery Details
                  </p>
                  <span className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    Address is mandatory
                  </span>
                </div>

                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="w-full px-3 py-2 text-xs bg-[#F5F1E8] border border-[#EAE3D5] rounded-lg text-[#171714] focus:outline-none focus:border-[#D9A928]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone Number for confirmation"
                    className="w-full px-3 py-2 text-xs bg-[#F5F1E8] border border-[#EAE3D5] rounded-lg text-[#171714] focus:outline-none focus:border-[#D9A928]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                      {orderType === 'delivery' ? 'Delivery Address' : 'Address / Locality'}{' '}
                      <span className="text-red-500 font-bold">* (Mandatory)</span>
                    </label>
                    {addressError && (
                      <span className="text-[11px] font-semibold text-red-600 animate-pulse">
                        Required to proceed!
                      </span>
                    )}
                  </div>
                  <textarea
                    ref={addressInputRef}
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => {
                      setCustomerAddress(e.target.value);
                      if (e.target.value.trim()) setAddressError(false);
                    }}
                    placeholder={
                      orderType === 'delivery'
                        ? 'Enter complete delivery address (House/Flat no, Street, Landmark) in Ramesampeta *'
                        : 'Enter your address or locality in Ramesampeta *'
                    }
                    className={`w-full px-3 py-2 text-xs bg-[#F5F1E8] border rounded-lg text-[#171714] focus:outline-none transition-colors resize-none ${
                      addressError
                        ? 'border-red-500 ring-2 ring-red-200 bg-red-50/70 placeholder-red-400'
                        : 'border-[#EAE3D5] focus:border-[#D9A928]'
                    }`}
                    required
                  />
                  {addressError && (
                    <p className="text-[11px] font-semibold text-red-600 mt-1 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Address is mandatory to place your order. Please fill in your address.</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 bg-[#EAE3D5]/50 rounded-xl space-y-2 text-xs text-[#20201C]/80">
                <div className="flex justify-between">
                  <span>Item Subtotal:</span>
                  <span className="font-semibold tabular-nums text-[#171714]">₹{subtotal}</span>
                </div>
                <div className="pt-2 border-t border-[#EAE3D5] flex justify-between text-sm font-bold text-[#171714]">
                  <span>Total Amount:</span>
                  <span className="font-serif-title text-base text-[#171714] tabular-nums">₹{grandTotal}</span>
                </div>
              </div>

            </div>
          )}

          {/* Footer Actions */}
          {!orderPlaced && items.length > 0 && (
            <div className="p-5 bg-white border-t border-[#EAE3D5] space-y-2.5">
              {addressError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span className="font-medium">Please enter your delivery address above to place order.</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow hover:shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant Order via WhatsApp (₹{grandTotal})</span>
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-[#171714] hover:bg-[#20201C] text-[#F5F1E8] text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
              >
                <span>Confirm Order (Cash / UPI)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9A928]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
