import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Tag } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { IMAGE_ASSETS } from '../assets/images';

interface HeroProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOrderNow }) => {
  const { brand } = RESTAURANT_CONFIG;

  return (
    <section id="hero" className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-[#F5F1E8]">
      {/* Subtle organic background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9A928]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A94D32]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Small Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A94D32] mb-4">
              <span className="w-6 h-[1.5px] bg-[#A94D32]" />
              <span>{brand.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#171714] leading-[1.08] mb-6 text-balance">
              {brand.headline.part1}<br />
              <span className="italic font-editorial font-normal text-[#D9A928]">{brand.headline.part2Highlight}</span><br />
              {brand.headline.part3}<span className="text-[#A94D32]">{brand.headline.part3Highlight}</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#20201C]/80 leading-relaxed max-w-xl mb-8 font-sans">
              {brand.description} From early morning crispy dosas to late-evening wok fast food.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#171714] hover:bg-[#20201C] text-[#F5F1E8] text-sm font-semibold tracking-wide rounded-md shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group cursor-pointer"
              >
                <span>VIEW MENU</span>
                <ArrowRight className="w-4 h-4 text-[#D9A928] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOrderNow}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D9A928] hover:bg-[#C99724] text-[#171714] text-sm font-semibold tracking-wide rounded-md shadow hover:shadow-md transition-all duration-200 active:scale-95 group cursor-pointer"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 text-[#171714] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust bullet markers */}
            <div className="pt-6 border-t border-[#EAE3D5] grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-[#171714]/80 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D9A928] shrink-0" />
                <span className="truncate">Freshly Prepared</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A94D32] shrink-0" />
                <span className="truncate">Quality Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#171714] shrink-0" />
                <span className="truncate">Affordable Prices</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Cinematic Food Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Photo Frame Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#20201C] group">
                <img
                  src={IMAGE_ASSETS.heroBanner}
                  alt="Traditional South Indian Tiffin platter with crisp dosa, steaming idly, vada and fresh chutneys"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle gradient overlay at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Badge / Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#171714]/90 backdrop-blur-md rounded-xl border border-white/10 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#D9A928] font-semibold">Morning to Night</p>
                    <p className="font-serif-title text-base sm:text-lg font-bold text-[#F5F1E8]">Hot Tiffins & Wok Specials</p>
                  </div>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#D9A928] pointer-events-none rounded-tr-xl" />
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#A94D32] pointer-events-none rounded-bl-xl" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
