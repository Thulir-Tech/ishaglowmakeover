"use client"; 

import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Our Services', href: '/#services' },
    { name: 'Packages', href: '/#packages' },
    { name: 'FAQs', href: '/#faqs' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200 py-3'
          : 'bg-white border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left Aligned: Brand Name */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <a href="/" className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-rose-500 font-serif">
                ISHA GLOW
              </span>
              <span className="text-xs tracking-[0.3em] text-slate-500 uppercase">
                Makeover
              </span>
            </a>
          </div>

          {/* Right Aligned: Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {/* Insta Logo */}
            <a
              href="https://www.instagram.com/ishaglow_makeover"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
              aria-label="Visit Instagram Profile"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
             <a
              href="https://www.instagram.com/ishaglow_makeover"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 text-rose-500"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-rose-500 hover:bg-rose-50 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Drawer) */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-100 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-rose-500 hover:bg-rose-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;