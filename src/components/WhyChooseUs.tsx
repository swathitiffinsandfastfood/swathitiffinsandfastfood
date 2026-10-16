import React from 'react';
import { ChefHat, ShieldCheck, BadgePercent, Clock3 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ChefHat,
      title: 'Freshly Prepared',
      description: 'Every dish is made fresh upon your order, never reheated from long batches.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Ingredients',
      description: 'Carefully selected whole spices, pure ghee, farm-fresh produce and quality meats.',
    },
    {
      icon: BadgePercent,
      title: 'Affordable Prices',
      description: 'Hearty, satisfying meals made accessible with everyday reasonable pricing.',
    },
    {
      icon: Clock3,
      title: 'Quick Service',
      description: 'Hot, freshly cooked food served promptly so you never have to wait hungry.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#A94D32] mb-2 block font-sans">
            OUR COMMITMENT
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#171714] tracking-tight">
            Why Choose Us
          </h2>
          <div className="w-12 h-0.5 bg-[#D9A928] mx-auto mt-4" />
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D5] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5F1E8] group-hover:bg-[#171714] transition-colors duration-300 flex items-center justify-center text-[#171714] group-hover:text-[#D9A928] mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                
                <h3 className="font-serif-title text-xl font-bold text-[#171714] group-hover:text-[#A94D32] transition-colors mb-2">
                  {feat.title}
                </h3>
                
                <p className="text-sm text-[#20201C]/75 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
