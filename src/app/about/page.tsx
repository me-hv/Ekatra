'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { ARTIST_DATA } from '@/data/artist';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-mono text-xs">
      
      {/* Header Profile Section */}
      <div className="space-y-6 border-b border-border pb-12">
        <span className="text-accent tracking-[0.2em] font-bold block">05 / ARTIST PROFILE</span>
        <h1 className="font-editorial text-5xl sm:text-7xl font-bold text-foreground">
          {ARTIST_DATA.name}
        </h1>
        <p className="text-accent tracking-widest uppercase">
          {ARTIST_DATA.roles.join(' · ')}
        </p>

        <div className="p-8 border border-border bg-background-card font-serif text-lg sm:text-xl text-foreground leading-relaxed italic space-y-4 font-normal">
          {ARTIST_DATA.manifesto.map((line, idx) => (
            <p key={idx}>&ldquo;{line}&rdquo;</p>
          ))}
        </div>
      </div>

      {/* Main Bio & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6 font-sans text-base text-foreground-muted leading-relaxed font-normal">
          <h2 className="font-editorial text-3xl font-bold text-foreground">
            BIOGRAPHY & PHILOSOPHY
          </h2>
          <p>{ARTIST_DATA.bio}</p>
          <p>
            Operating from {ARTIST_DATA.location}, EKATRA continuously challenges the passive consumption of modern digital streaming by treating web software as an active canvas for artistic expression.
          </p>
        </div>

        {/* Specifications Inventory Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 border border-border bg-background-card space-y-4">
            <div className="flex items-center gap-2 text-accent font-bold tracking-widest border-b border-border pb-3 uppercase">
              <Terminal className="w-4 h-4" />
              <span>ARTIST SPECIFICATIONS</span>
            </div>

            <div className="flex justify-between border-b border-border/40 pb-2">
              <span className="text-foreground-dim">LOCATION</span>
              <span className="text-foreground">{ARTIST_DATA.location}</span>
            </div>

            <div className="flex justify-between border-b border-border/40 pb-2">
              <span className="text-foreground-dim">ACTIVE TIMELINE</span>
              <span className="text-foreground">{ARTIST_DATA.activeSince}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-foreground-dim">DIRECT SIGNAL</span>
              <a href={`mailto:${ARTIST_DATA.socials.email}`} className="text-accent hover:underline">
                {ARTIST_DATA.socials.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gear & Technology Stack */}
      <div className="space-y-8">
        <h2 className="font-editorial text-3xl font-bold text-foreground border-b border-border pb-4 font-normal">
          EQUIPMENT & CREATIVE TOOLING STACK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTIST_DATA.gearStack.map((group, idx) => (
            <div key={idx} className="p-6 border border-border bg-background-card space-y-4">
              <h3 className="text-accent font-bold uppercase tracking-wider text-[11px]">
                {group.category}
              </h3>
              <ul className="space-y-2 text-foreground-muted">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Influences */}
      <div className="space-y-6">
        <h2 className="font-editorial text-3xl font-bold text-foreground border-b border-border pb-4 font-normal">
          ARTISTIC INFLUENCES
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {ARTIST_DATA.influences.map((inf, idx) => (
            <span key={idx} className="px-3 py-1.5 border border-border bg-background-card text-foreground-muted">
              {inf}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
