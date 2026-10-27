import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Phone, Plus, Minus, AlertCircle } from 'lucide-react';
import { getDeliveryChargeAt, RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDish?: MenuItem | null;
  selectedSize?: 'half' | 'full';
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  selectedDish,
  selectedSize,
}) => {
  const { brand, contact, orderPolicy } = RESTAURANT_CONFIG;
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | null>(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [customerName, setCustomerName] = useState(() => {
    try {
      return localStorage.getItem('swathi_cust_name') || '';
    } catch {
      return '';
    }
  });
  const [customerPhone, setCustomerPhone] = useState(() => {
    try {
      return localStorage.getItem('swathi_cust_phone') || '';
    } catch {
      return '';
    }
  });
  const [customerAddress, setCustomerAddress] = useState(() => {
    try {
      return localStorage.getItem('swathi_cust_address') || '';
    } catch {
      return '';
    }
  });
  const [addressError, setAddressError] = useState(false);
  const [orderTypeError, setOrderTypeError] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const addressInputRef = useRef<HTMLTextAreaElement>(null);
  const [activeItems, setActiveItems] = useState<{ [itemId: string]: number }>(() => {
    if (selectedDish) {
      return { [selectedDish.id]: 1 };
    }
    return {};
  });

  // Reset or initialize items whenever modal opens or selectedDish changes
  useEffect(() => {
    if (isOpen) {
      setOrderType(null);
      if (selectedDish) {
        setActiveItems({ [selectedDish.id]: 1 });
        if (selectedDish.hasSizes && selectedSize) {
          setCustomNotes(`Portion: ${selectedSize.toUpperCase()}`);
        }
      } else {
        setActiveItems({});
      }
      setAddressError(false);
      setOrderTypeError(false);

      // Focus address field for quick input since it is mandatory
      const timer = setTimeout(() => {
        if (!customerAddress.trim()) {
          addressInputRef.current?.focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedDish, selectedSize]);

  useEffect(() => {
    if (!isOpen) return;

    const updateCurrentTime = () => setCurrentTime(new Date());
    updateCurrentTime();
    const timer = window.setInterval(updateCurrentTime, 60_000);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const validateAddress = () => {
    if (!orderType) {
      setOrderTypeError(true);
      return false;
    }

    setOrderTypeError(false);
    if (!customerAddress.trim()) {
      setAddressError(true);
      addressInputRef.current?.focus();
      addressInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    setAddressError(false);
    return true;
  };

  const getItemPrice = (item: MenuItem) => {
    if (item.id === selectedDish?.id && selectedSize && item.hasSizes && item.prices) {
      return item.prices[selectedSize];
    }
    return item.price;
  };

  // Selected dish price calculation
  const selectedList = Object.entries(activeItems)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      return { item, qty };
    })
    .filter((entry): entry is { item: MenuItem; qty: number } => entry.item !== undefined);

  const subtotal = selectedList.reduce((sum, entry) => sum + getItemPrice(entry.item) * entry.qty, 0);
  const deliveryCharge = orderType === 'delivery' ? getDeliveryChargeAt(currentTime) : 0;
  const total = subtotal + deliveryCharge;

  const generateWhatsAppMessage = () => {
    const orderNumber = `ST-${Math.floor(1000 + Math.random() * 9000)}`;

    let msg = `*🍽️ NEW ORDER #${orderNumber}*\n`;
    msg += `*${brand.name.toUpperCase()}*\n`;
    msg += `📍 Branch: ${contact.fullAddress}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*📋 ORDER TYPE:* ${orderType === 'delivery' ? '🚚 DOORSTEP DELIVERY' : '🛍️ TAKEAWAY / COUNTER PICKUP'}\n`;
    if (customerName.trim()) msg += `*👤 Customer Name:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) msg += `*📞 Contact Phone:* ${customerPhone.trim()}\n`;
    msg += `*📍 ${orderType === 'delivery' ? 'Delivery Address' : 'Address / Locality'}:* ${customerAddress.trim()}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*🛒 ITEMS ORDERED:*\n`;

    if (selectedList.length > 0) {
      selectedList.forEach((entry, idx) => {
        const sizeTag = (entry.item.id === selectedDish?.id && selectedSize && entry.item.hasSizes)
          ? ` (${selectedSize.toUpperCase()})`
          : '';
        const price = getItemPrice(entry.item);
        msg += `${idx + 1}. *${entry.item.name}${sizeTag}* x ${entry.qty} = ${orderPolicy.currencySymbol}${price * entry.qty}\n`;
      });
      msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `*💰 BILL DETAILS:*\n`;
      msg += `• Items Subtotal: ${orderPolicy.currencySymbol}${subtotal}\n`;
      if (orderType === 'delivery') {
        msg += `• Delivery Charge: ${orderPolicy.currencySymbol}${deliveryCharge}\n`;
      }
      msg += `• Total Amount: ${orderPolicy.currencySymbol}${total}\n`;
    } else {
      msg += `(Inquiry regarding available dishes today)\n`;
    }

    if (customNotes.trim()) {
      msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `*📝 Special Cooking Notes:* ${customNotes.trim()}\n`;
    }

    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*💳 Payment Mode:* Cash on Delivery / UPI upon arrival\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm this order and let me know the preparation/delivery time. Thank you!`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    if (!validateAddress()) return;
    const rawMsg = generateWhatsAppMessage();
    const encoded = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const toggleItemQuantity = (itemId: string, delta: number) => {
    setActiveItems((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F5F1E8] rounded-2xl overflow-hidden border border-[#20201C] shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#171714] text-[#F5F1E8] flex items-center justify-between border-b border-[#2A2A24] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D9A928] text-[#171714] font-serif-title font-bold flex items-center justify-center text-sm">
              S
            </div>
            <div>
              <h3 className="font-serif-title text-lg sm:text-xl font-bold leading-tight">
                Quick Order on WhatsApp
              </h3>
              <p className="text-[11px] text-[#D9A928] tracking-wider uppercase font-semibold">
                {brand.name} • Direct WhatsApp Ordering
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Delivery or Takeaway */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#EAE3D5] rounded-xl">
            <button
              type="button"
              aria-pressed={orderType === 'delivery'}
              onClick={() => {
                setOrderType('delivery');
                setOrderTypeError(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                orderType === 'delivery'
                  ? 'bg-[#171714] text-white shadow-sm'
                  : 'text-[#171714]/70 hover:text-[#171714]'
              }`}
            >
              🚚 Doorstep Delivery
            </button>
            <button
              type="button"
              aria-pressed={orderType === 'takeaway'}
              onClick={() => {
                setOrderType('takeaway');
                setOrderTypeError(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                orderType === 'takeaway'
                  ? 'bg-[#171714] text-white shadow-sm'
                  : 'text-[#171714]/70 hover:text-[#171714]'
              }`}
            >
              🛍️ Takeaway / Counter Pickup
            </button>
          </div>
          {orderTypeError ? (
            <p role="alert" className="text-[11px] font-semibold text-red-600">
              Please choose doorstep delivery or takeaway to continue.
            </p>
          ) : !orderType ? (
            <p className="text-[11px] text-[#20201C]/60">
              Choose doorstep delivery or takeaway to continue with your order.
            </p>
          ) : null}

          {/* Quick Dish Selection Chips */}
          <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#EAE3D5] shadow-xs space-y-3.5 my-1">
            <div className="flex items-center justify-between pb-1 border-b border-[#EAE3D5]/60">
              <label className="text-xs font-bold uppercase tracking-wider text-[#A94D32]">
                Select Dishes to Include:
              </label>
              <span className="text-[11px] text-[#20201C]/60">
                {selectedList.length > 0
                  ? `${selectedList.reduce((s, i) => s + i.qty, 0)} items selected`
                  : 'Click + to add dishes'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-2 bg-[#FAF7F2] rounded-xl border border-[#EAE3D5]">
              {MENU_ITEMS.map((item) => {
                const qty = activeItems[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                      qty > 0
                        ? 'bg-[#D9A928]/15 border-[#D9A928] shadow-xs'
                        : 'bg-white border-[#EAE3D5] hover:border-stone-300'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-serif-title text-xs font-bold text-[#171714] truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[#20201C]/70">
                        ₹{item.price} • <span className={item.isVeg ? 'text-emerald-700 font-semibold' : 'text-[#A94D32] font-semibold'}>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-[#F5F1E8] border border-[#EAE3D5] rounded-md shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleItemQuantity(item.id, -1)}
                        aria-label={`Decrease ${item.name}`}
                        className="p-1.5 hover:bg-[#EAE3D5] text-[#171714] transition-colors rounded-l cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold tabular-nums text-[#171714]">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleItemQuantity(item.id, 1)}
                        aria-label={`Increase ${item.name}`}
                        className="p-1.5 hover:bg-[#EAE3D5] text-[#171714] transition-colors rounded-r cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="p-4 bg-white rounded-xl border border-[#EAE3D5] space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-[#A94D32]">
                Customer Information
              </p>
              <span className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Address field is mandatory
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  try {
                    localStorage.setItem('swathi_cust_name', e.target.value);
                  } catch {
                    // ignore
                  }
                }}
                placeholder="Your Name (e.g. Ramesh)"
                className="w-full px-3 py-2 text-xs bg-[#F5F1E8] border border-[#EAE3D5] rounded-lg text-[#171714] focus:outline-none focus:border-[#D9A928]"
              />
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  try {
                    localStorage.setItem('swathi_cust_phone', e.target.value);
                  } catch {
                    // ignore
                  }
                }}
                placeholder="Phone Number (e.g. 91331 17272)"
                className="w-full px-3 py-2 text-xs bg-[#F5F1E8] border border-[#EAE3D5] rounded-lg text-[#171714] focus:outline-none focus:border-[#D9A928]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                  {orderType === 'delivery' ? 'Delivery Address' : 'Address / Locality'}{' '}
                  <span className="text-red-500 font-bold">* (Mandatory to fill)</span>
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
                  try {
                    localStorage.setItem('swathi_cust_address', e.target.value);
                  } catch {
                    // ignore
                  }
                }}
                placeholder={
                  orderType === 'delivery'
                    ? 'Enter complete delivery address (House/Flat no, Street, Landmark in Ramesampeta) *'
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

            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Special instructions (e.g. extra chutney, less spicy)"
              className="w-full px-3 py-2 text-xs bg-[#F5F1E8] border border-[#EAE3D5] rounded-lg text-[#171714] focus:outline-none focus:border-[#D9A928]"
            />
          </div>

          {/* Total Summary */}
          {selectedList.length > 0 ? (
            <div className="p-3.5 bg-[#EAE3D5]/60 rounded-xl flex items-center justify-between text-xs text-[#171714]">
              <div>
                <span className="font-semibold">{selectedList.length} dish types selected ({selectedList.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="text-[#20201C]/60 block text-[11px]">
                  Subtotal: ₹{subtotal}
                </span>
                {orderType === 'delivery' && (
                  <span className="text-[#20201C]/60 block text-[11px]">
                    Delivery charge: ₹{deliveryCharge}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#20201C]/60 block uppercase font-bold">Total</span>
                <span className="font-serif-title text-xl font-bold text-[#171714] tabular-nums">
                  ₹{total}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-dashed border-[#EAE3D5] text-center text-xs text-[#20201C]/70">
              No dishes pre-selected. Tap <span className="font-bold text-[#A94D32]">+</span> above to select items, or continue directly to order.
            </div>
          )}

        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#EAE3D5] space-y-3 shrink-0">
          {addressError && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="font-medium">Please enter your delivery address above to send order.</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full py-3 px-2 sm:px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] text-center"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">
                {selectedList.length > 0 ? `WhatsApp (₹${total})` : 'Order on WhatsApp'}
              </span>
            </button>

            <a
              href={`tel:${contact.phone}`}
              className="w-full py-3 px-2 sm:px-4 bg-white hover:bg-[#F5F1E8] border border-[#EAE3D5] text-[#171714] text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-colors text-center cursor-pointer shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#A94D32] shrink-0" />
              <span className="truncate">Call {contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
