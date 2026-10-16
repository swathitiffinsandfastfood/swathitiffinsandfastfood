/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryCards } from './components/CategoryCards';
import { FeaturedFood } from './components/FeaturedFood';
import { Menu } from './components/Menu';
import { SpecialSection } from './components/SpecialSection';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SpecialOfferCTA } from './components/SpecialOfferCTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer, CartItemType } from './components/CartDrawer';
import { Toast, ToastMessage } from './components/Toast';
import { QuickOrderModal } from './components/QuickOrderModal';
import { SEOHead } from './components/SEOHead';
import { MenuItem, MENU_ITEMS } from './data/menuData';
import { RESTAURANT_CONFIG } from './data/restaurantConfig';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    try {
      const saved = localStorage.getItem('swathi_cart') || localStorage.getItem('dakshin_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('swathi_favorites') || localStorage.getItem('dakshin_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [quickOrderDish, setQuickOrderDish] = useState<MenuItem | null>(null);
  const [quickOrderSize, setQuickOrderSize] = useState<'half' | 'full' | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swathi_cart', JSON.stringify(cartItems));
    } catch {
      // LocalStorage fallback
    }
  }, [cartItems]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swathi_favorites', JSON.stringify(favorites));
    } catch {
      // LocalStorage fallback
    }
  }, [favorites]);

  // Track active scroll section for navigation highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'menu', 'about', 'specials', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  const handleAddToCart = (item: MenuItem, size?: 'half' | 'full') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.size === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { item, size, quantity: 1 }];
    });

    const sizeNote = size ? ` (${size.toUpperCase()})` : '';
    setToast({
      id: Date.now().toString(),
      type: 'cart',
      text: `Added ${item.name}${sizeNote} to your order.`,
    });
  };

  const handleUpdateQuantity = (
    itemId: string,
    size: 'half' | 'full' | undefined,
    newQty: number
  ) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter(
          (ci) => !(ci.item.id === itemId && ci.size === size)
        );
      }
      return prev.map((ci) => {
        if (ci.item.id === itemId && ci.size === size) {
          return { ...ci, quantity: newQty };
        }
        return ci;
      });
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleFavorite = (id: string) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    const itemName = item ? item.name : 'Item';

    setFavorites((prev) => {
      if (prev.includes(id)) {
        setToast({
          id: Date.now().toString(),
          type: 'favorite',
          text: `Removed ${itemName} from favourites.`,
        });
        return prev.filter((fId) => fId !== id);
      }
      setToast({
        id: Date.now().toString(),
        type: 'favorite',
        text: `Saved ${itemName} to your favourites!`,
      });
      return [...prev, id];
    });
  };

  const scrollToMenuWithCategory = (cat: string) => {
    const targetId = cat === 'tiffins' ? 'section-tiffins' : 'section-fast-food';
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const menuEl = document.getElementById('menu');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSpecial = () => {
    const biryaniItem = MENU_ITEMS.find((m) => m.id === 'chicken-fry-biryani');
    if (biryaniItem) {
      setQuickOrderDish(biryaniItem);
      setIsQuickOrderOpen(true);
    }
  };

  const handleWhatsAppQuickOrder = () => {
    setQuickOrderDish(null);
    setIsQuickOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#171714] font-sans flex flex-col selection:bg-[#D9A928]/30">
      {/* Dynamic SEO & Schema.org Metadata */}
      <SEOHead />
      
      {/* Top Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOrderNow={() => {
          setQuickOrderDish(null);
          setIsQuickOrderOpen(true);
        }}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onOrderNow={() => {
            setQuickOrderDish(null);
            setIsQuickOrderOpen(true);
          }}
        />

        {/* 2. Category Introduction Cards */}
        <CategoryCards onSelectCategory={scrollToMenuWithCategory} />

        {/* 3. Featured Food Split Section */}
        <FeaturedFood onExploreMenu={scrollToMenu} />

        {/* 4. Main Menu Section (Tiffins & Fast Food with React filtering) */}
        <Menu
          onAddToCart={handleAddToCart}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          cartItems={cartItems}
          initialCategory={selectedCategory}
          onDirectOrder={(item, size) => {
            setQuickOrderDish(item);
            setQuickOrderSize(size);
            setIsQuickOrderOpen(true);
          }}
        />

        {/* 5. Featured Special (Dark Section) */}
        <SpecialSection onOrderSpecial={handleOrderSpecial} />

        {/* 6. Food Gallery (Architectural Layout with Symmetrical Alignment) */}
        <Gallery
          onOrderDish={(dishName) => {
            const found = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(dishName.toLowerCase()));
            setQuickOrderDish(found || null);
            setQuickOrderSize(undefined);
            setIsQuickOrderOpen(true);
          }}
        />

        {/* 7. About Section (Editorial Story) */}
        <About />

        {/* 8. Why Choose Us (4 Minimal Features) */}
        <WhyChooseUs />

        {/* 9. Special Offer / CTA */}
        <SpecialOfferCTA
          onViewMenu={scrollToMenu}
          onWhatsAppOrder={handleWhatsAppQuickOrder}
        />

        {/* 10. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Cart & WhatsApp Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Instant WhatsApp Order Modal with Menu Card Photo */}
      <QuickOrderModal
        isOpen={isQuickOrderOpen}
        onClose={() => {
          setIsQuickOrderOpen(false);
          setQuickOrderDish(null);
          setQuickOrderSize(undefined);
        }}
        selectedDish={quickOrderDish}
        selectedSize={quickOrderSize}
      />

      {/* Subtle Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
