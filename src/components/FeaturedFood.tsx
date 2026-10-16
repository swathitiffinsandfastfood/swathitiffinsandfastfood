import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IMAGE_ASSETS } from '../assets/images';

interface FeaturedFoodProps {
  onExploreMenu: () => void;
}

export const FeaturedFood: React.FC<FeaturedFoodProps> = ({ onExploreMenu }) => {
  return (
    <section className="py-20 md:py-32 bg-[#F5F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Food Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#20201C] border border-[#EAE3D5]">
              <img
                src={IMAGE_ASSETS.dosa}
                alt="Chef preparing crisp golden dosa on seasoned cast-iron tawa"
                className="w-full h-[380px] sm:h-[460px] md:h-[500px] object-cover transition-transform duration-700 ease-out hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs sm:text-sm tracking-wide font-sans">
                <span className="inline-block px-2.5 py-1 rounded bg-[#D9A928] text-[#171714] font-bold text-[11px] uppercase tracking-wider mb-2">
                  Artisanal Craft
                </span>
                <p className="font-serif-title text-base sm:text-lg text-[#F5F1E8] font-semibold">
                  Hand-roasted with pure ghee and freshly crushed spices
                </p>
              </div>
            </div>

            {/* Subtle floating quote or accent element */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#FFFFFF] p-5 rounded-xl shadow-xl border border-[#EAE3D5] max-w-xs">
              <p className="text-xs font-serif-title italic text-[#171714] leading-relaxed">
                "Real taste comes from patience, fresh batter, and fire-tossed woks."
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-6">
            
            {/* Small uppercase label */}
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A94D32] mb-3 block font-sans">
              FROM OUR KITCHEN
            </span>

            {/* Large Heading */}
            <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#171714] tracking-tight leading-[1.1] mb-6 text-balance">
              Simple food.<br />
              <span className="italic font-editorial font-normal text-[#D9A928]">Exceptional taste.</span>
            </h2>

            {/* Natural paragraph */}
            <p className="text-base sm:text-lg text-[#20201C]/80 leading-relaxed font-sans mb-8 max-w-lg">
              We believe food tastes best when made simply and eaten fresh. Our kitchen is dedicated to hot morning tiffins made from scratch, crisp golden dosas, and flavourful wok fast food tossed right when you order. No artificial shortcuts—just hearty Indian cooking made with honest care.
            </p>

            {/* CTA */}
            <div>
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-[#171714] hover:text-[#A94D32] group transition-colors cursor-pointer pb-1 border-b border-[#171714] hover:border-[#A94D32]"
              >
                <span>EXPLORE MENU</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
