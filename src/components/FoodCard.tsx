import React from 'react';
import { MenuItem } from '../data/menuData';

interface FoodCardProps {
  item: MenuItem;
  index: number;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, index }) => {
  return (
    <div
      className={`food-card food-card-reveal relative w-full overflow-hidden rounded-xl bg-[#171714] cursor-pointer border border-[#171714]/15 shadow-sm ${item.desktopSpan} ${item.tabletSpan} ${item.minHeightDesktop} h-[280px] sm:h-[320px] md:h-auto`}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Background Food Photography (Fills Complete Card) */}
      <img
        src={item.image}
        alt={item.name}
        className="food-img absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {/* Dark Gradient Overlay at the Bottom */}
      <div className="food-gradient absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-85 pointer-events-none" />

      {/* Top Category Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-[#171714]/80 text-[#D9A928] border border-[#D9A928]/30">
          {item.category}
        </span>
        {item.tag && (
          <span className="text-[10px] font-semibold text-white/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs hidden sm:inline-block">
            {item.tag}
          </span>
        )}
      </div>

      {/* Card Information Overlay */}
      <div className="food-text absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end pointer-events-none">
        
        {/* Food Name & Price Line */}
        <div className="flex items-end justify-between gap-3 mb-1.5">
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
            {item.name}
          </h3>

          {/* Price In Warm Gold */}
          {!item.hasSizes && (
            <div className="shrink-0 text-right">
              <span className="font-serif-title text-2xl sm:text-3xl font-bold text-[#D9A928] tabular-nums drop-shadow-sm">
                {item.priceDisplay}
              </span>
            </div>
          )}
        </div>

        {/* Portion Display for Chicken Noodles (Half ₹50 / Full ₹100) */}
        {item.hasSizes && (
          <div className="inline-flex items-center gap-2 mb-2 bg-black/60 border border-[#D9A928]/40 px-3 py-1 rounded-md self-start">
            <span className="text-xs font-semibold text-white/90">Half:</span>
            <span className="font-serif-title text-base sm:text-lg font-bold text-[#D9A928] tabular-nums">
              ₹{item.halfPrice}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs font-semibold text-white/90">Full:</span>
            <span className="font-serif-title text-base sm:text-lg font-bold text-[#D9A928] tabular-nums">
              ₹{item.fullPrice}
            </span>
          </div>
        )}

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#EAE3D5]/80 font-sans leading-relaxed line-clamp-2 max-w-sm">
          {item.description}
        </p>

      </div>
    </div>
  );
};
