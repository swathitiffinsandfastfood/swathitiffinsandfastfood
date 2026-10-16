import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { IMAGE_ASSETS } from '../assets/images';

interface SpecialSectionProps {
  onOrderSpecial: () => void;
}

export const SpecialSection: React.FC<SpecialSectionProps> = ({ onOrderSpecial }) => {
  return (
    <section id="specials" className="py-20 md:py-32 bg-[#171714] text-[#F5F1E8] relative overflow-hidden">
      {/* Background warm glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#D9A928]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A94D32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D9A928] mb-4">
              <Flame className="w-4 h-4 text-[#A94D32]" />
              <span>CHEF'S SIGNATURE CREATION</span>
            </div>

            <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#F5F1E8] leading-[1.08] mb-6 text-balance">
              Made fresh.<br />
              <span className="italic font-editorial font-normal text-[#D9A928]">Served hot.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#EAE3D5]/80 leading-relaxed font-sans max-w-lg mb-8">
              Rich flavours, fresh ingredients and the taste you come back for. Our Chicken Fry Biryani is slow-layered with whole roasted garam spices, fragrant aged basmati, and crown-topped with golden spiced chicken fries cooked fresh per order.
            </p>

            {/* Special highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-xs sm:text-sm text-[#EAE3D5]/70 border-y border-[#2A2A24] py-4">
              <div>
                <span className="block text-[#D9A928] font-serif-title text-xl font-bold mb-0.5">100% Fresh</span>
                <span>Never re-heated or pre-cooked</span>
              </div>
              <div>
                <span className="block text-[#D9A928] font-serif-title text-xl font-bold mb-0.5">Authentic Masalas</span>
                <span>Ground in-house every morning</span>
              </div>
            </div>

            {/* Call to action */}
            <div>
              <button
                type="button"
                onClick={onOrderSpecial}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#D9A928] hover:bg-[#C99724] text-[#171714] text-sm font-semibold tracking-wide rounded-md shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group cursor-pointer"
              >
                <span>ORDER THE SPECIAL</span>
                <ArrowRight className="w-4 h-4 text-[#171714] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Large Cinematic Biryani Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2A2A24] bg-[#20201C] group">
              <img
                src={IMAGE_ASSETS.chickenFryBiryani}
                alt="Aromatic Chicken Fry Biryani with golden spiced chicken and fresh coriander"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Overlaid Special Details */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#171714]/85 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#D9A928] uppercase tracking-wider block">Chef's Special</span>
                  <p className="font-serif-title text-lg font-bold text-white">Chicken Fry Biryani</p>
                  <p className="text-xs text-[#EAE3D5]/70">Includes cooling raita & salna</p>
                </div>
              </div>
            </div>

            {/* Subtle decorative gold corner */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#D9A928]/60 rounded-tr-lg pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
