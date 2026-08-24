'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Disc, Feather, Image, ShieldAlert, User, Terminal } from 'lucide-react';
import { ARTIST_DATA } from '@/data/artist';

const NAV_ITEMS = [
  { href: '/music', label: 'MUSIC', number: '01', icon: Disc },
  { href: '/writing', label: 'WRITING', number: '02', icon: Feather },
  { href: '/visuals', label: 'VISUALS', number: '03', icon: Image },
  { href: '/vault', label: 'VAULT', number: '04', icon: ShieldAlert },
  { href: '/about', label: 'ABOUT', number: '05', icon: User },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-[#09090b] font-mono text-xs font-bold shadow-[0_0_12px_var(--accent-glow)] group-hover:scale-105 transition-transform">
            E
          </div>
          <div>
            <span className="font-editorial text-xl sm:text-2xl font-bold tracking-widest text-foreground block leading-none">
              {ARTIST_DATA.name}
            </span>
            <span className="font-mono-tech text-[9px] text-foreground-muted block tracking-widest mt-0.5">
              CREATIVE ARCHIVE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-mono text-xs tracking-wider transition-colors py-2 flex items-center gap-2 group ${
                  isActive ? 'text-accent font-semibold' : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                <span className="text-[10px] opacity-40 group-hover:text-accent font-mono">
                  {item.number}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent shadow-[0_0_8px_var(--accent-primary)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Status Indicator & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-background-card border border-border text-[10px] font-mono text-foreground-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <Terminal className="w-3 h-3 text-accent" />
            <span>SIGNAL: ACTIVE</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg bg-background-card border border-border text-foreground hover:text-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#09090b] border-b border-border overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="font-mono-tech text-[10px] text-foreground-muted tracking-widest mb-4">
                ARCHIVE INDEX
              </div>
              <div className="space-y-4">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        isActive
                          ? 'border-accent bg-accent-glow/10 text-accent font-semibold'
                          : 'border-border/40 hover:border-border text-foreground-muted hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-accent" />
                        <span className="font-editorial text-lg tracking-wider">{item.label}</span>
                      </div>
                      <span className="font-mono text-xs text-foreground-dim">{item.number}</span>
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
