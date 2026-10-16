import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/menuData';
import { X, ChevronLeft, ChevronRight, Maximize2, LayoutGrid, Columns } from 'lucide-react';

interface GalleryProps {
  onOrderDish?: (dishName: string) => void;
}

export const Gallery: React.FC<GalleryProps> = () => {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'bento' | 'grid'>('bento');

  // Filter categories
  const filterTabs = [
    { id: 'all', label: 'All Dishes', count: GALLERY_ITEMS.length },
    { id: 'tiffin', label: 'Tiffins', count: 4 },
    { id: 'fast-food', label: 'Fast Food', count: 3 },
    { id: 'biryani', label: 'Biryanis', count: 2 },
    { id: 'kitchen', label: 'Kitchen Craft', count: 1 },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'tiffin') return item.category.toLowerCase().includes('tiffin') || item.category.toLowerCase().includes('snack') || item.category.toLowerCase().includes('crepe');
    if (selectedFilter === 'fast-food') return item.category.toLowerCase().includes('fast food') || item.category.toLowerCase().includes('indo-chinese');
    if (selectedFilter === 'biryani') return item.category.toLowerCase().includes('biryani') || item.category.toLowerCase().includes('special');
    if (selectedFilter === 'kitchen') return item.category.toLowerCase().includes('kitchen');
    return true;
  });

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalItem) return;
      if (e.key === 'Escape') setActiveModalItem(null);
      if (e.key === 'ArrowRight') navigateModal(1);
      if (e.key === 'ArrowLeft') navigateModal(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem, filteredItems]);

  const navigateModal = (direction: number) => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeModalItem.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  };

  /**
   * Screen-optimized, mathematically balanced grid classes:
   * 9 items total:
   * - Row 1 (Hero cards): 2 cards (6 cols + 6 cols = 12)
   * - Row 2 (Trio cards): 3 cards (4 cols + 4 cols + 4 cols = 12)
   * - Row 3 (Trio cards): 3 cards (4 cols + 4 cols + 4 cols = 12)
   * - Down Portion (Grand Finale Showcase): 1 full-screen width card (12 cols = 12)
   * On tablets (sm: breakpoint): Row 1 & Down portion are balanced, trio rows adapt cleanly.
   * On mobile: Every card is col-span-12 with responsive aspect ratios.
   */
  const getBentoLayoutClass = (idx: number, isFiltered: boolean) => {
    // Row 4 / Down portion (Item 9, idx 8): Full-width cinematic showcase
    if (idx === 8 && !isFiltered) {
      return 'col-span-12 sm:col-span-12 lg:col-span-12 h-80 sm:h-96 lg:h-[440px]';
    }

    if (isFiltered || layoutMode === 'grid') {
      if (idx === 8 && !isFiltered) {
        return 'col-span-12 sm:col-span-12 lg:col-span-12 h-80 sm:h-96 lg:h-[440px]';
      }
      return 'col-span-12 sm:col-span-6 lg:col-span-4 h-72 sm:h-80 lg:h-84';
    }

    // Row 1: 2 items (6 + 6 = 12)
    if (idx === 0 || idx === 1) {
      return 'col-span-12 sm:col-span-6 lg:col-span-6 h-72 sm:h-84 lg:h-96';
    }

    // Row 2: 3 items (4 + 4 + 4 = 12)
    if (idx >= 2 && idx <= 4) {
      return 'col-span-12 sm:col-span-6 lg:col-span-4 h-64 sm:h-76 lg:h-80';
    }

    // Row 3: 3 items (4 + 4 + 4 = 12)
    if (idx >= 5 && idx <= 7) {
      return 'col-span-12 sm:col-span-6 lg:col-span-4 h-64 sm:h-76 lg:h-80';
    }

    return 'col-span-12 sm:col-span-12 lg:col-span-12 h-80 sm:h-96 lg:h-[440px]';
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-[#F5F1E8] relative overflow-hidden">
      {/* Background architectural grid guide accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE3D5_1px,transparent_1px),linear-gradient(to_bottom,#EAE3D5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EAE3D5] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#A94D32] mb-2 font-sans">
              <span className="w-2 h-2 rounded-full bg-[#D9A928]" />
              <span>VISUAL JOURNAL & KITCHEN GALLERY</span>
            </div>
            <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold text-[#171714] tracking-tight">
              Food Gallery
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-[#20201C]/75 max-w-xs font-sans leading-relaxed">
              Steaming morning tiffins, high-flame wok sizzlers, and fragrant chicken biryanis prepared fresh per order.
            </p>

            {/* Layout Mode Switcher */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-[#EAE3D5]/80 rounded-xl border border-[#EAE3D5]">
              <button
                type="button"
                onClick={() => setLayoutMode('bento')}
                title="Architectural Bento Grid"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'bento'
                    ? 'bg-[#171714] text-[#F5F1E8] shadow-xs'
                    : 'text-[#171714]/70 hover:text-[#171714]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="text-[11px]">Bento</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                title="Uniform Grid"
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-[#171714] text-[#F5F1E8] shadow-xs'
                    : 'text-[#171714]/70 hover:text-[#171714]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="text-[11px]">Uniform</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === tab.id
                  ? 'bg-[#171714] text-[#F5F1E8] shadow-sm'
                  : 'bg-white/80 hover:bg-white text-[#171714]/75 border border-[#EAE3D5]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedFilter === tab.id ? 'bg-[#D9A928] text-[#171714]' : 'bg-[#EAE3D5] text-[#171714]/70'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Symmetrical, Pixel-Perfect Responsive Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {filteredItems.map((item, idx) => {
            const layoutClass = getBentoLayoutClass(idx, selectedFilter !== 'all');

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className={`group relative rounded-2xl overflow-hidden bg-[#20201C] cursor-pointer border border-[#EAE3D5] hover:border-[#D9A928] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:ring-4 hover:ring-[#D9A928]/15 ${layoutClass}`}
              >
                {/* Background Food Photography */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Overlaid Details */}
                <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-between z-10 pointer-events-none">
                  
                  {/* Top Bar: Sequence index number & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-serif-title font-bold text-[#D9A928] bg-black/60 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs tracking-wider uppercase px-2.5 py-1 rounded bg-[#171714]/85 text-[#F5F1E8] font-bold backdrop-blur-md border border-white/10">
                        {item.category}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 sm:bg-white/20 backdrop-blur-md text-white text-xs font-semibold sm:opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-md border border-white/10">
                      <Maximize2 className="w-3.5 h-3.5 text-[#D9A928]" />
                      <span className="text-[11px]">Full Screen</span>
                    </div>
                  </div>

                  {/* Bottom Bar: Title, Expanding Divider, and Description */}
                  <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <h3 className="font-serif-title text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F1E8] mb-1.5 group-hover:text-white transition-colors">
                          {item.name}
                        </h3>
                        
                        {/* Animated Gold Divider Line */}
                        <div className="w-8 h-[2px] bg-[#D9A928] mb-2.5 transform origin-left group-hover:w-20 transition-all duration-500 ease-out" />
                        
                        <p className="text-xs sm:text-sm text-[#EAE3D5]/85 line-clamp-2 max-w-2xl font-sans leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {idx === 8 && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 hover:bg-[#D9A928] text-white hover:text-[#171714] text-xs font-semibold backdrop-blur-md border border-white/20 transition-all shadow-md self-start sm:self-end">
                          <Maximize2 className="w-4 h-4 text-[#D9A928]" />
                          <span>Full Screen View</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-12 text-center text-xs text-[#20201C]/65 flex flex-col sm:flex-row items-center justify-center gap-2 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9A928]" />
            <span>Click any food photograph to open full-screen view & navigate</span>
          </div>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span>Prepared fresh with authentic spices & traditional flavors</span>
        </div>

      </div>

      {/* Lightbox Modal with Next / Prev Navigation */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#171714] rounded-2xl overflow-hidden border border-[#2A2A24] shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="w-full md:w-3/5 h-64 sm:h-80 md:h-[500px] bg-[#20201C] relative">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.name}
                className="w-full h-full object-cover"
              />

              {/* Prev / Next Navigation overlay buttons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateModal(-1);
                }}
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#171714]/85 text-white flex items-center justify-center hover:bg-[#D9A928] hover:text-[#171714] transition-colors shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateModal(1);
                }}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#171714]/85 text-white flex items-center justify-center hover:bg-[#D9A928] hover:text-[#171714] transition-colors shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Details & Action */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-[#F5F1E8] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#D9A928]">
                    {activeModalItem.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(null)}
                    aria-label="Close modal"
                    className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-3">
                  {activeModalItem.name}
                </h3>
                <p className="text-sm text-[#EAE3D5]/80 leading-relaxed font-sans mb-6">
                  {activeModalItem.description}
                </p>

                <div className="p-4 rounded-xl bg-[#20201C] border border-white/10 text-xs text-[#EAE3D5]/80 space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[#D9A928]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9A928]" />
                    <span className="font-semibold">Cooked hot per order in Ramesampeta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Includes fresh accompaniments, chutneys & gravies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A94D32]" />
                    <span>Prepared fresh per order with high-quality ingredients</span>
                  </div>
                </div>

                {/* Thumbnails row for rapid navigation */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    All Dishes ({filteredItems.length})
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {filteredItems.map((thumb) => (
                      <button
                        key={thumb.id}
                        type="button"
                        onClick={() => setActiveModalItem(thumb)}
                        className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          thumb.id === activeModalItem.id
                            ? 'border-[#D9A928] scale-105 shadow'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={thumb.image} alt={thumb.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#2A2A24]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalItem(null);
                    const menuEl = document.getElementById('menu');
                    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-[#D9A928] hover:bg-[#c29622] text-[#171714] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center cursor-pointer shadow-md"
                >
                  View on Complete Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
