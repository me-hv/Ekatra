'use client';

import React from 'react';
import Link from 'next/link';
import { User, Cpu, Terminal, Radio, Mail, Github, ExternalLink, Disc, BookOpen } from 'lucide-react';
import { ARTIST_DATA } from '@/data/artist';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Profile Section */}
      <div className="space-y-6 border-b border-border pb-12">
        <span className="font-mono-tech text-xs text-accent tracking-widest block">05 / ARTIST PROFILE</span>
        <h1 className="font-editorial text-5xl sm:text-7xl font-bold text-foreground">
          {ARTIST_DATA.name}
        </h1>
        <p className="font-mono text-sm text-accent tracking-widest">
          {ARTIST_DATA.roles.join(' • ')}
        </p>

        <div className="p-8 rounded-2xl bg-background-card border border-border font-serif text-lg sm:text-xl text-foreground leading-relaxed italic space-y-4">
          {ARTIST_DATA.manifesto.map((line, idx) => (
            <p key={idx}>&ldquo;{line}&rdquo;</p>
          ))}
        </div>
      </div>

      {/* Main Bio & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6 font-sans text-base text-foreground-muted leading-relaxed">
          <h2 className="font-editorial text-3xl font-bold text-foreground">
            BIOGRAPHY & PHILOSOPHY
          </h2>
          <p>{ARTIST_DATA.bio}</p>
          <p>
            Operating from {ARTIST_DATA.location}, EKATRA continuously challenges the passive consumption of modern digital streaming by treating web software as an active canvas for artistic expression.
          </p>
        </div>

        {/* Quick Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-background-card border border-border font-mono text-xs space-y-4">
            <div className="flex items-center gap-2 text-accent font-bold tracking-wider border-b border-border pb-3">
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
        <h2 className="font-editorial text-3xl font-bold text-foreground border-b border-border pb-4">
          EQUIPMENT & CREATIVE TOOLING STACK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTIST_DATA.gearStack.map((group, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-background-card border border-border space-y-4">
              <h3 className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                {group.category}
              </h3>
              <ul className="space-y-2 font-mono text-xs text-foreground-muted">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
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
        <h2 className="font-editorial text-3xl font-bold text-foreground border-b border-border pb-4">
          ARTISTIC INFLUENCES
        </h2>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          {ARTIST_DATA.influences.map((inf, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-full bg-background-card border border-border text-foreground-muted">
              {inf}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
