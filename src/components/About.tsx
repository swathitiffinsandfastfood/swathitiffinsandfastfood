import React from 'react';
import { Heart, Sparkles, Coffee } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';
import { IMAGE_ASSETS } from '../assets/images';

export const About: React.FC = () => {
  const { story } = RESTAURANT_CONFIG;

  return (
    <section id="about" className="py-20 md:py-32 bg-[#EAE3D5]/35 border-y border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Photography */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#20201C]">
              <img
                src={IMAGE_ASSETS.dosa}
                alt="Chefs working with passion in the kitchen"
                className="w-full h-[400px] sm:h-[460px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold text-[#D9A928] uppercase tracking-wider block mb-1">
                  Local Kitchen
                </span>
                <p className="font-serif-title text-base text-[#F5F1E8]">
                  From morning batter to evening fire
                </p>
              </div>
            </div>

            {/* Accent badge */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#D9A928] rounded-tl-xl pointer-events-none" />
          </div>

          {/* Right Column: Editorial Prose */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A94D32] mb-3 block font-sans">
              {story.label}
            </span>

            <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#171714] tracking-tight leading-[1.1] mb-6 text-balance">
              {story.headline}<br />
              <span className="italic font-editorial font-normal text-[#D9A928]">{story.italicHighlight}</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#20201C]/80 leading-relaxed font-sans max-w-xl">
              {story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Values Minimal Row */}
            <div className="mt-8 pt-8 border-t border-[#EAE3D5] grid grid-cols-2 sm:grid-cols-3 gap-4">
              {story.values.map((val, idx) => (
                <div key={idx} className={idx === 2 ? 'col-span-2 sm:col-span-1' : ''}>
                  <p className="font-serif-title text-lg font-bold text-[#171714]">{val.title}</p>
                  <p className="text-xs text-[#20201C]/70 mt-0.5">{val.description}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
