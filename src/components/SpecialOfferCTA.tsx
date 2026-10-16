import React from 'react';
import { Utensils, MessageCircle, ArrowRight } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

interface SpecialOfferCTAProps {
  onViewMenu: () => void;
  onWhatsAppOrder: () => void;
}

export const SpecialOfferCTA: React.FC<SpecialOfferCTAProps> = ({
  onViewMenu,
  onWhatsAppOrder,
}) => {
  const { orderPolicy } = RESTAURANT_CONFIG;

  return (
    <section className="py-20 md:py-28 bg-[#171714] text-[#F5F1E8] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#D9A928]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#A94D32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <span className="text-xs font-bold tracking-widest uppercase text-[#D9A928] mb-4 block font-sans">
          FRESH, HOT & PACKED WITH CARE
        </span>

        <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F1E8] tracking-tight mb-4">
          Hungry already?
        </h2>

        <p className="text-base sm:text-lg text-[#EAE3D5]/80 font-sans max-w-xl mx-auto mb-10 leading-relaxed">
          Your favourite tiffins and fast food are just one order away. Quick pickup or doorstep delivery via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onViewMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D9A928] hover:bg-[#C99724] text-[#171714] text-sm font-bold tracking-wide rounded-md shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>VIEW MENU</span>
          </button>

          <button
            type="button"
            onClick={onWhatsAppOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#20201C] hover:bg-[#2A2A24] border border-[#D9A928]/50 text-[#F5F1E8] hover:text-[#D9A928] text-sm font-semibold tracking-wide rounded-md shadow transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WHATSAPP ORDER</span>
          </button>
        </div>

        {/* Small footer reassurance */}
        <div className="mt-8 text-xs text-[#EAE3D5]/50 flex items-center justify-center gap-4">
          <span>● {orderPolicy.acceptedPaymentMethods.join(' / ')}</span>
          <span>● Fresh parcel packaging</span>
        </div>

      </div>
    </section>
  );
};

