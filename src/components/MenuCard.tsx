import React, { useState } from 'react';
import { Heart, Plus, Check, MessageCircle } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, size?: 'half' | 'full') => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  cartQuantity: number;
  onDirectOrder?: (item: MenuItem, size?: 'half' | 'full') => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  cartQuantity,
  onDirectOrder,
}) => {
  const [selectedSize, setSelectedSize] = useState<'half' | 'full'>('half');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(item, item.hasSizes ? selectedSize : undefined);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 800);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDirectOrder) {
      onDirectOrder(item, item.hasSizes ? selectedSize : undefined);
    } else {
      const sizeNote = item.hasSizes ? ` (${selectedSize.toUpperCase()})` : '';
      const msg = encodeURIComponent(
        `*ORDER INQUIRY - ${RESTAURANT_CONFIG.brand.name.toUpperCase()}*\n📍 Branch: ${RESTAURANT_CONFIG.contact.fullAddress}\n━━━━━━━━━━━━━━━━━━━━━━\n• Dish: *${item.name}${sizeNote}*\n• Category: ${item.category.toUpperCase()}\n• Price: ₹${currentPrice}\n• Preference: ${item.isVeg ? '🌱 Pure Veg' : '🍗 Non-Veg'}\n━━━━━━━━━━━━━━━━━━━━━━\nHello! I would like to order this dish for delivery/takeaway. Please confirm current availability and prep time. Thank you!`
      );
      window.open(`https://wa.me/${RESTAURANT_CONFIG.contact.whatsappNumber}?text=${msg}`, '_blank');
    }
  };

  const currentPrice = item.hasSizes && item.prices
    ? item.prices[selectedSize]
    : item.price;

  return (
    <div className="group relative bg-[#FFFFFF] rounded-xl overflow-hidden border border-[#EAE3D5] hover:border-[#D9A928] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Top Image Container with generous height */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#20201C]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Favorite Icon Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          aria-label={isFavorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#171714]/65 backdrop-blur-md text-white hover:bg-[#171714] transition-all cursor-pointer shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#A94D32] text-[#A94D32]' : 'text-white/80 hover:text-white'
            }`}
          />
        </button>

        {/* Veg / Non-veg indicator tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-[#171714]/75 backdrop-blur-md text-[10px] font-semibold text-[#F5F1E8]">
          <span
            className={`w-2 h-2 rounded-full ${
              item.isVeg ? 'bg-emerald-500' : 'bg-[#A94D32]'
            }`}
          />
          <span>{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
        </div>

        {/* Ready time indicator */}
        {item.prepTime && (
          <div className="absolute bottom-2.5 left-3 text-[11px] text-white/90 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A928]" />
            <span>Ready in {item.prepTime}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Kicker */}
          <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-[#A94D32] mb-1 font-sans">
            <span>{item.categoryLabel}</span>
            {item.isSpecial && (
              <span className="text-[#D9A928] text-[10px] font-semibold tracking-normal">
                ★ Chef Pick
              </span>
            )}
          </div>

          {/* Dish Name */}
          <h4 className="font-serif-title text-xl font-bold text-[#171714] group-hover:text-[#A94D32] transition-colors mb-1.5">
            {item.name}
          </h4>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#20201C]/75 leading-relaxed font-sans mb-3 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Portion Selector for Chicken Noodles (Half ₹50 / Full ₹100) */}
        {item.hasSizes && item.prices && (
          <div className="mb-3.5 pt-2 border-t border-[#F5F1E8]">
            <div className="flex items-center justify-between text-xs mb-1.5 text-[#20201C]/75">
              <span className="font-semibold text-[11px] uppercase tracking-wider text-[#A94D32]">Portion</span>
              <span className="text-[11px] text-[#20201C]/60">Select size</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedSize('half')}
                className={`py-1.5 px-2 text-xs font-semibold rounded border transition-all cursor-pointer text-center ${
                  selectedSize === 'half'
                    ? 'border-[#D9A928] bg-[#D9A928]/15 text-[#171714] font-bold shadow-xs'
                    : 'border-[#EAE3D5] text-[#20201C]/70 hover:border-stone-400 bg-white'
                }`}
              >
                Half: <span className="tabular-nums font-bold text-[#171714]">₹{item.prices.half}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSize('full')}
                className={`py-1.5 px-2 text-xs font-semibold rounded border transition-all cursor-pointer text-center ${
                  selectedSize === 'full'
                    ? 'border-[#D9A928] bg-[#D9A928]/15 text-[#171714] font-bold shadow-xs'
                    : 'border-[#EAE3D5] text-[#20201C]/70 hover:border-stone-400 bg-white'
                }`}
              >
                Full: <span className="tabular-nums font-bold text-[#171714]">₹{item.prices.full}</span>
              </button>
            </div>
          </div>
        )}

        {/* Price & Add to Cart Row */}
        <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-[#20201C]/60 block leading-none mb-0.5 uppercase tracking-wider">
              {item.hasSizes ? `Price (${selectedSize.toUpperCase()})` : 'Price'}
            </span>
            <div className="font-serif-title text-2xl font-bold text-[#171714] tabular-nums">
              ₹{currentPrice}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick WhatsApp order button */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              aria-label={`Order ${item.name} via WhatsApp (Customer address mandatory)`}
              title={`Order ${item.name} via WhatsApp (Customer address mandatory)`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:shadow active:scale-95 border border-[#25D366]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Order</span>
            </button>

            {/* Add to local cart stepper */}
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${item.name} to cart`}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white scale-105'
                  : 'bg-[#171714] hover:bg-[#D9A928] text-white hover:text-[#171714] shadow-sm hover:shadow active:scale-95'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{cartQuantity > 0 ? `Add (${cartQuantity})` : 'Add'}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
