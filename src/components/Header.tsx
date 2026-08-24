'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ARTIST_DATA } from '@/data/artist';

const NAV_ITEMS = [
  { href: '/music', label: 'MUSIC', number: '01' },
  { href: '/writing', label: 'WRITING', number: '02' },
  { href: '/visuals', label: 'VISUALS', number: '03' },
  { href: '/vault', label: 'VAULT', number: '04' },
  { href: '/about', label: 'ABOUT', number: '05' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080909]/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity: Typographic wordmark (NO circular icon) */}
        <Link 
          href="/" 
          className="group flex flex-col justify-center transition-opacity hover:opacity-80"
        >
          <span className="font-editorial text-xl sm:text-2xl font-bold tracking-widest text-foreground block leading-none">
            {ARTIST_DATA.name}
          </span>
          <span className="font-mono text-[9px] text-foreground-dim block tracking-[0.25em] mt-1">
            CREATIVE ARCHIVE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-mono text-xs tracking-wider transition-colors py-2 flex items-center gap-2 group ${
                  isActive ? 'text-accent font-semibold' : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                <span className="text-[10px] text-foreground-dim group-hover:text-accent font-mono transition-colors">
                  {item.number}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quiet Status Indicator & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded border border-border/80 font-mono text-[10px] text-foreground-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-accent/80 animate-pulse" />
            <span>SIGNAL: ACTIVE</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 text-foreground-muted hover:text-foreground transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080909] border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="font-mono text-[10px] text-foreground-dim tracking-widest uppercase pb-2 border-b border-border/40">
                ARCHIVE INDEX
              </div>
              <div className="space-y-3">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-2 font-mono text-sm tracking-wider border-b border-border/20 transition-colors ${
                        isActive ? 'text-accent font-semibold' : 'text-foreground-muted hover:text-foreground'
                      }`}
                    >
                      <span className="font-editorial text-base">{item.label}</span>
                      <span className="text-xs text-foreground-dim">{item.number}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
