'use client';

import React from 'react';
import Image from 'next/image';
import { VISUAL_ITEMS } from '@/data/visuals';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function VisualsSection() {
  return (
    <section className="py-12 space-y-8">
      <SectionHeader
        number="03"
        category="VISUAL GALLERY"
        title="CONTACT SHEETS & EXIF"
        linkHref="/visuals"
        linkText="VIEW GALLERY"
      />

      <div className="relative aspect-video border border-border bg-background-card overflow-hidden group">
        <Image
          src={VISUAL_ITEMS[0].imageUrl}
          alt={VISUAL_ITEMS[0].title}
          fill
          className="object-cover grayscale contrast-125 opacity-85 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-black/20 to-transparent p-6 flex flex-col justify-end space-y-1">
          <span className="font-mono text-[10px] text-accent">{VISUAL_ITEMS[0].archiveCode} · {VISUAL_ITEMS[0].category}</span>
          <h3 className="font-editorial text-xl font-bold text-foreground">{VISUAL_ITEMS[0].title}</h3>
          <p className="font-mono text-[11px] text-foreground-muted">{VISUAL_ITEMS[0].exif?.medium || VISUAL_ITEMS[0].exif?.camera}</p>
        </div>
      </div>
    </section>
  );
}
