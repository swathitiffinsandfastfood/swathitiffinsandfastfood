import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

export const Contact: React.FC = () => {
  const { contact, timings, brand } = RESTAURANT_CONFIG;

  const handleCall = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${brand.name}! I'd like to place an order from your Ramesampeta branch.\n\n📍 Branch: ${contact.fullAddress}\n📞 Phone: +91 91331 17272\n\nPlease share your current available dishes and today's specials for delivery/pickup!`
    );
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleDirections = () => {
    window.open(contact.googleMapsUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A94D32] mb-3 block font-sans">
              VISIT US OR ORDER
            </span>

            <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#171714] tracking-tight leading-[1.1] mb-6 text-balance">
              Come hungry.<br />
              <span className="italic font-editorial font-normal text-[#D9A928]">Leave happy.</span>
            </h2>

            <p className="text-base text-[#20201C]/80 font-sans leading-relaxed mb-8 max-w-lg">
              Drop by for a steaming plate of hot idlis and crisp dosa in the morning, or grab sizzling fast food and biryani on your way home.
            </p>

            {/* Structured Contact Data */}
            <div className="space-y-6 mb-8 text-sm text-[#171714]">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#EAE3D5] flex items-center justify-center text-[#171714] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#A94D32]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#20201C]/60 block mb-0.5">Address</span>
                  <p className="font-medium text-[#171714]">{contact.fullAddress}</p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#EAE3D5] flex items-center justify-center text-[#171714] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#D9A928]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#20201C]/60 block mb-0.5">Phone</span>
                    <a href={`tel:${contact.phone}`} className="font-semibold text-[#171714] hover:text-[#A94D32]">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#EAE3D5] flex items-center justify-center text-[#171714] shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#20201C]/60 block mb-0.5">WhatsApp</span>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="font-semibold text-[#171714] hover:text-[#25D366] text-left cursor-pointer"
                    >
                      {contact.whatsapp}
                    </button>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-[#EAE3D5]">
                <div className="w-9 h-9 rounded-lg bg-[#EAE3D5] flex items-center justify-center text-[#171714] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#171714]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#20201C]/60 block mb-1">Opening Hours</span>
                  <div className="space-y-1">
                    {timings.map((h, i) => (
                      <p key={i} className="text-xs sm:text-sm text-[#20201C]/90">
                        <span className="font-semibold">{h.label}:</span> {h.displayHours}
                      </p>
                    ))}
                    <p className="text-[11px] text-[#A94D32] font-semibold mt-1">Open 7 days a week</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Contact Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCall}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171714] hover:bg-[#20201C] text-[#F5F1E8] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D9A928]" />
                <span>CALL NOW</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WHATSAPP US</span>
              </button>

              <button
                type="button"
                onClick={handleDirections}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#EAE3D5] border border-[#EAE3D5] text-[#171714] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A94D32]" />
                <span>GET DIRECTIONS</span>
              </button>
            </div>

          </div>

          {/* Right Column: Google Maps Location Card */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#EAE3D5] shadow-xl">
              
              {/* Map Header */}
              <div className="p-4 bg-[#171714] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D9A928]" />
                  <span className="text-xs font-bold tracking-wider uppercase text-[#F5F1E8]">Location & Landmark</span>
                </div>
                <span className="text-[11px] text-[#EAE3D5]/70">Easily Accessible</span>
              </div>

              {/* Map Mock / Interactive Container */}
              <div className="relative h-72 sm:h-80 md:h-96 w-full bg-[#EAE3D5]/40 overflow-hidden">
                {/* Styled Map Background */}
                <div className="absolute inset-0 bg-[#f0eae1] flex items-center justify-center p-6 text-center">
                  <div className="relative z-10 max-w-sm">
                    <div className="w-14 h-14 rounded-full bg-[#171714] text-[#D9A928] mx-auto flex items-center justify-center shadow-lg mb-3 animate-bounce">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <p className="font-serif-title text-xl font-bold text-[#171714] mb-1">{brand.shortName}</p>
                    <p className="text-xs text-[#20201C]/75 mb-4">
                      {contact.fullAddress}
                    </p>
                    <button
                      type="button"
                      onClick={handleDirections}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D9A928] hover:bg-[#C99724] text-[#171714] text-xs font-bold rounded-lg shadow transition-colors cursor-pointer"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Stylized geometric grid map lines */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#171714_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>
              </div>

              {/* Map Footer Info */}
              <div className="p-4 bg-white border-t border-[#EAE3D5] text-xs text-[#20201C]/75 flex items-center justify-between">
                <span>Free two-wheeler parking available</span>
                <span className="text-[#A94D32] font-semibold">Dine-in • Takeaway • Delivery</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
