'use client';

import React from 'react';
import { ARTIST_DATA } from '@/data/artist';
import { EditorialLink } from '@/components/ui/EditorialLink';

export function AboutSection() {
  return (
    <section className="py-12 border-t border-border border-b border-border bg-background-card p-8 sm:p-14 space-y-6 text-center">
      <div className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
        05 / ARTIST STATEMENT · EKATRA
      </div>
      <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-foreground">
        ABOUT EKATRA
      </h2>
      <p className="font-sans text-base text-foreground-muted max-w-3xl mx-auto leading-relaxed font-normal">
        {ARTIST_DATA.bio}
      </p>
      <div className="pt-2">
        <EditorialLink href="/about">
          READ ARTIST MANIFESTO & STUDIO TOOLING STACK
        </EditorialLink>
      </div>
    </section>
  );
}
