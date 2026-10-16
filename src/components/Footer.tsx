import React from 'react';
import { ArrowUp, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

export const Footer: React.FC = () => {
  const { brand, timings, socials } = RESTAURANT_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171714] text-[#F5F1E8] border-t border-[#20201C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2A2A24]">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#D9A928] flex items-center justify-center text-[#171714] font-serif-title font-bold text-lg">
                  {brand.monogram}
                </div>
                <span className="font-serif-title text-2xl font-bold tracking-tight text-[#F5F1E8]">
                  {brand.name}
                </span>
              </div>
              <p className="text-xs tracking-widest uppercase text-[#D9A928] font-semibold mb-4">
                {brand.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[#EAE3D5]/70 max-w-sm leading-relaxed font-sans mb-6">
                Authentic South Indian breakfast tiffins and flavour-packed evening street fast food. Cooked fresh with pure ingredients and genuine passion.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#20201C] hover:bg-[#D9A928] hover:text-[#171714] text-[#EAE3D5] flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#20201C] hover:bg-[#D9A928] hover:text-[#171714] text-[#EAE3D5] flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#20201C] hover:bg-[#25D366] hover:text-white text-[#EAE3D5] flex items-center justify-center transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D9A928] mb-4 font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#EAE3D5]/80">
              <li>
                <a href="#hero" className="hover:text-[#D9A928] transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D9A928] transition-colors">Menu & Pricing</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D9A928] transition-colors">About Our Story</a>
              </li>
              <li>
                <a href="#specials" className="hover:text-[#D9A928] transition-colors">Chef Specials</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D9A928] transition-colors">Food Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D9A928] transition-colors">Contact & Location</a>
              </li>
            </ul>
          </div>

          {/* Quick Timings & Order Info */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D9A928] mb-4 font-sans">
              Kitchen Timings
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#EAE3D5]/80">
              {timings.map((shift, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-white">{shift.label}</p>
                  <p className="text-xs text-[#EAE3D5]/60">{shift.displayHours} (All Days)</p>
                </div>
              ))}
              <div className="pt-2 text-xs text-[#A94D32] font-semibold">
                Parcel Packing & WhatsApp Ordering Available
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EAE3D5]/50 gap-4">
          <p>
            © 2026 {brand.shortName}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Fresh Ingredients Everyday</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-[#D9A928] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

