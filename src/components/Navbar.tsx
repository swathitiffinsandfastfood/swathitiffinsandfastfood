import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, ArrowUpRight } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../data/restaurantConfig';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOrderNow: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOrderNow,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Specials', href: '#specials' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#171714]/95 backdrop-blur-md border-b border-[#2A2A24] py-3.5 shadow-xl'
          : 'bg-[#171714] py-4 md:py-5 border-b border-[#20201C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#D9A928] flex items-center justify-center text-[#171714] font-serif-title font-bold text-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
              {RESTAURANT_CONFIG.brand.monogram}
            </div>
            <div className="flex flex-col">
              <span className="font-serif-title text-xl md:text-2xl font-bold tracking-tight text-[#F5F1E8] group-hover:text-[#D9A928] transition-colors">
                {RESTAURANT_CONFIG.brand.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#D9A928] font-sans font-semibold -mt-0.5">
                {RESTAURANT_CONFIG.brand.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-[#EAE3D5]/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`relative py-1 transition-colors duration-200 hover:text-[#D9A928] ${
                    isActive ? 'text-[#D9A928] font-semibold' : ''
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D9A928] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action Zone: Cart + Order Now */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="relative p-2.5 text-[#F5F1E8] hover:text-[#D9A928] rounded-full hover:bg-[#20201C] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#A94D32] text-white text-[11px] font-bold flex items-center justify-center tabular-nums shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now Button */}
            <button
              type="button"
              onClick={onOrderNow}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold tracking-wide text-[#171714] bg-[#D9A928] hover:bg-[#C99724] rounded-md transition-all duration-200 shadow-sm hover:shadow active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>ORDER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-[#F5F1E8] hover:text-[#D9A928] rounded-lg hover:bg-[#20201C] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down / Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#171714] border-b border-[#2A2A24] px-6 py-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base font-medium text-[#F5F1E8] hover:text-[#D9A928] py-2 border-b border-[#20201C] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderNow();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#171714] bg-[#D9A928] rounded-md shadow cursor-pointer"
            >
              <span>ORDER NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
