import React from 'react';
import { TIFFIN_ITEMS, FAST_FOOD_ITEMS } from '../data/menuData';
import { FoodCard } from './FoodCard';

export const MenuGrid: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#F5F1E8] text-[#171714] py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ========================================================================= */}
        {/* SECTION 1 — TIFFINS */}
        {/* ========================================================================= */}
        <section id="tiffins" className="mb-20 md:mb-32">
          
          {/* Section Header */}
          <div className="mb-8 sm:mb-12 border-b-2 border-[#171714] pb-5">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#A94D32] mb-1.5 block font-sans">
              TIFFINS
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#171714] tracking-tight leading-tight">
                Fresh South Indian Favourites
              </h1>
              <p className="text-xs sm:text-sm text-[#20201C]/75 max-w-md font-sans">
                Stone-ground batter, pure ghee roasted dosas, and fluffy steamed idlis prepared fresh upon every order.
              </p>
            </div>
          </div>

          {/* Asymmetric 3-Column Masonry Grid for Tiffins */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[135px] grid-flow-row-dense">
            {TIFFIN_ITEMS.map((item, idx) => (
              <FoodCard key={item.id} item={item} index={idx} />
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* VISUAL SEPARATION BETWEEN TIFFINS & FAST FOOD */}
        {/* ========================================================================= */}
        <div className="my-16 md:my-28 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#EAE3D5]" />
          </div>
          <div className="relative bg-[#F5F1E8] px-6 py-2.5 rounded-full border border-[#EAE3D5] flex items-center gap-3 text-xs sm:text-sm text-[#171714]/75 font-serif-title italic shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#D9A928]" />
            <span>From morning tawa roasts to evening wok sizzlers</span>
            <span className="w-2 h-2 rounded-full bg-[#A94D32]" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2 — FAST FOOD */}
        {/* ========================================================================= */}
        <section id="fast-food" className="mb-16">
          
          {/* Section Header */}
          <div className="mb-8 sm:mb-12 border-b-2 border-[#171714] pb-5">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#A94D32] mb-1.5 block font-sans">
              FAST FOOD
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#171714] tracking-tight leading-tight">
                Bold Flavours, Made Fresh
              </h2>
              <p className="text-xs sm:text-sm text-[#20201C]/75 max-w-md font-sans">
                High-flame wok tossed rice & noodles, spiced chicken fry biryanis, and fiery chilli chicken sizzled to perfection.
              </p>
            </div>
          </div>

          {/* Asymmetric 3-Column Masonry Grid for Fast Food */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[135px] grid-flow-row-dense">
            {FAST_FOOD_ITEMS.map((item, idx) => (
              <FoodCard key={item.id} item={item} index={idx} />
            ))}
          </div>

        </section>

      </div>
    </div>
  );
};
