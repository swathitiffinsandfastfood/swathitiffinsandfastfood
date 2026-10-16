import React, { useState, useMemo } from 'react';
import { TIFFIN_ITEMS, FAST_FOOD_ITEMS, MenuItem } from '../data/menuData';
import { MenuCard } from './MenuCard';
import { Search, Flame, Utensils, Check, FileText, X, MessageCircle, Download } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

interface MenuProps {
  onAddToCart: (item: MenuItem, size?: 'half' | 'full') => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  cartItems: { item: MenuItem; size?: 'half' | 'full'; quantity: number }[];
  initialCategory?: string;
  onDirectOrder?: (item: MenuItem, size?: 'half' | 'full') => void;
}

export const Menu: React.FC<MenuProps> = ({
  onAddToCart,
  favorites,
  onToggleFavorite,
  cartItems,
  onDirectOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  const getItemCartQuantity = (itemId: string) => {
    return cartItems
      .filter((ci) => ci.item.id === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  const filterItem = (item: MenuItem) => {
    if (vegOnlyFilter && !item.isVeg) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.categoryLabel?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  };

  const filteredTiffins = useMemo(
    () => TIFFIN_ITEMS.filter(filterItem),
    [vegOnlyFilter, searchQuery]
  );

  const filteredFastFood = useMemo(
    () => FAST_FOOD_ITEMS.filter(filterItem),
    [vegOnlyFilter, searchQuery]
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A94D32] mb-2 block font-sans">
            OUR COMPLETE MENU
          </span>
          <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#171714] tracking-tight mb-3">
            Crafted With Care
          </h2>
          <p className="text-base text-[#20201C]/75 font-sans leading-relaxed">
            Freshly prepared favourites for every time of the day. Explore our traditional morning tiffins and flavour-packed evening fast food below.
          </p>
        </div>

        {/* Quick Section Anchors & Search Bar */}
        <div className="mb-14 flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#EAE3D5]">
          
          {/* Quick Jump Buttons */}
          <div className="flex items-center gap-2 p-1 bg-[#EAE3D5]/70 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollToSection('section-tiffins')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#171714] text-[#F5F1E8] shadow-sm hover:bg-[#20201C] transition-all cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5 text-[#D9A928]" />
              <span>1. TIFFINS ({TIFFIN_ITEMS.length})</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('section-fast-food')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#171714] text-[#F5F1E8] shadow-sm hover:bg-[#20201C] transition-all cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-[#A94D32]" />
              <span>2. FAST FOOD ({FAST_FOOD_ITEMS.length})</span>
            </button>
          </div>

          {/* Search & Veg Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-[#171714]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tiffins or fast food..."
                className="w-full pl-9 pr-7 py-2 text-xs bg-white border border-[#EAE3D5] rounded-lg text-[#171714] focus:outline-none focus:border-[#D9A928] placeholder:text-[#171714]/40 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                vegOnlyFilter
                  ? 'bg-emerald-800 text-white border-emerald-900'
                  : 'bg-white text-[#171714]/75 border-[#EAE3D5] hover:border-stone-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${vegOnlyFilter ? 'bg-white' : 'bg-emerald-600'}`} />
              <span>Veg Only</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1 — TIFFINS */}
        {/* ========================================================================= */}
        <div id="section-tiffins" className="scroll-mt-24 mb-20">
          
          {/* Section 1 Visual Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2 border-[#171714]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#D9A928] mb-1 font-sans">
                <Utensils className="w-4 h-4 text-[#171714]" />
                <span>TIFFINS</span>
              </div>
              <h3 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#171714] tracking-tight">
                Fresh South Indian Favourites
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#20201C]/70 max-w-md font-sans">
              Soft steamed rice cakes, crisp golden ghee dosas, and crunchy lentil vadas made with stone-ground batter and served with fresh chutneys & piping hot sambar.
            </p>
          </div>

          {/* Tiffins Cards Grid */}
          {filteredTiffins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTiffins.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={onAddToCart}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={onToggleFavorite}
                  cartQuantity={getItemCartQuantity(item.id)}
                  onDirectOrder={onDirectOrder}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/60 rounded-xl border border-dashed border-[#EAE3D5]">
              <p className="font-serif-title text-lg text-[#171714] mb-1">No tiffins match your search</p>
              <p className="text-xs text-[#20201C]/60">Try clearing the search query or veg filter.</p>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* ELEGANT VISUAL SEPARATOR BETWEEN TIFFINS & FAST FOOD */}
        {/* ========================================================================= */}
        <div className="my-16 md:my-24 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#EAE3D5]" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-[#F5F1E8] px-6 py-2 rounded-full border border-[#EAE3D5] flex items-center gap-3 shadow-sm text-xs text-[#20201C]/75 font-serif-title italic">
              <span className="w-2 h-2 rounded-full bg-[#D9A928]" />
              <span>From morning tawa roasts to evening wok sizzles</span>
              <span className="w-2 h-2 rounded-full bg-[#A94D32]" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2 — FAST FOOD */}
        {/* ========================================================================= */}
        <div id="section-fast-food" className="scroll-mt-24">
          
          {/* Section 2 Visual Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2 border-[#171714]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#A94D32] mb-1 font-sans">
                <Flame className="w-4 h-4 text-[#A94D32]" />
                <span>FAST FOOD</span>
              </div>
              <h3 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#171714] tracking-tight">
                Bold Flavours, Made Fresh
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#20201C]/70 max-w-md font-sans">
              High-flame wok tossed fried rice, street-style chicken noodles, spiced chicken fry biryani, and fiery chilli chicken prepared hot upon every single order.
            </p>
          </div>

          {/* Fast Food Cards Grid */}
          {filteredFastFood.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFastFood.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={onAddToCart}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={onToggleFavorite}
                  cartQuantity={getItemCartQuantity(item.id)}
                  onDirectOrder={onDirectOrder}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/60 rounded-xl border border-dashed border-[#EAE3D5]">
              <p className="font-serif-title text-lg text-[#171714] mb-1">No fast food items match your filter</p>
              <p className="text-xs text-[#20201C]/60">Note: Most fast food dishes contain chicken. Disable 'Veg Only' to see all items.</p>
            </div>
          )}
        </div>

        {/* Freshness Reassurance Footnote */}
        <div className="mt-16 pt-8 border-t border-[#EAE3D5] text-center text-xs text-[#20201C]/65 flex flex-col sm:flex-row items-center justify-center gap-3 font-sans">
          <span className="flex items-center gap-1.5 font-medium text-[#171714]">
            <Check className="w-4 h-4 text-emerald-600" />
            100% Prepared Fresh Per Order
          </span>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span>Dine-in, takeaway parcel packing & instant WhatsApp orders available</span>
        </div>

      </div>
    </section>
  );
};
