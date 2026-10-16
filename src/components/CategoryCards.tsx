import React from 'react';
import { ArrowUpRight, Flame, UtensilsCrossed, Sparkles, ChefHat } from 'lucide-react';
import { IMAGE_ASSETS } from '../assets/images';

interface CategoryCardsProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'tiffins',
      title: 'Tiffins',
      subtitle: 'Traditional South Indian favourites',
      tag: 'Morning & Evening',
      count: '7 Items',
      image: IMAGE_ASSETS.dosa,
      color: '#D9A928',
    },
    {
      id: 'fast-food',
      title: 'Fast Food',
      subtitle: 'Hot & flavourful favourites',
      tag: 'Wok-Tossed',
      count: 'Rice & Noodles',
      image: IMAGE_ASSETS.chickenFriedRice,
      color: '#A94D32',
    },
    {
      id: 'chicken-specials',
      title: 'Chicken Specials',
      subtitle: 'Rich, spicy & satisfying',
      tag: 'Biryani & Starters',
      count: 'Dum & Fry',
      image: IMAGE_ASSETS.chickenFryBiryani,
      color: '#D9A928',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#EAE3D5]/40 border-y border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#A94D32] mb-2 block font-sans">
              DISCOVER OUR MENU
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#171714] leading-tight">
              Something delicious<br />
              <span className="italic font-editorial font-normal text-[#171714]/80">for every craving.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#20201C]/70 max-w-xs font-sans">
            Freshly ground spices, sizzling hot pans, and pure authentic ingredients prepared upon every order.
          </p>
        </div>

        {/* Horizontal Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-[#FFFFFF] rounded-xl overflow-hidden p-5 shadow-sm hover:shadow-xl border border-[#EAE3D5] hover:border-[#D9A928] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Top Meta info */}
              <div>
                <div className="flex items-center justify-between text-xs text-[#20201C]/60 mb-3 font-medium">
                  <span>{cat.tag}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#F5F1E8] text-[#171714] font-semibold">
                    {cat.count}
                  </span>
                </div>

                <div className="relative h-44 w-full rounded-lg overflow-hidden mb-4 bg-[#20201C]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Subtle accent bar on card hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>

                <h3 className="font-serif-title text-xl font-bold text-[#171714] group-hover:text-[#A94D32] transition-colors mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#20201C]/70 leading-relaxed font-sans mb-4">
                  {cat.subtitle}
                </p>
              </div>

              {/* Action trigger */}
              <div className="pt-3 border-t border-[#F5F1E8] flex items-center justify-between text-xs font-semibold text-[#171714] group-hover:text-[#D9A928] transition-colors">
                <span>View Selection</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
