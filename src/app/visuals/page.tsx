'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { VISUAL_ITEMS, VisualItem } from '@/data/visuals';
import { SectionHeader } from '@/components/ui/SectionHeader';

const CATEGORIES = ['ALL', 'Photography', 'Artwork', 'Video Still', 'Studio', 'Tech Experiment'];

export default function VisualsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalItem, setActiveModalItem] = useState<VisualItem | null>(null);

  const filteredItems = selectedCategory === 'ALL'
    ? VISUAL_ITEMS
    : VISUAL_ITEMS.filter((v) => v.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-6">
        <SectionHeader
          number="03"
          category="ARTWORK & EXIF"
          title="VISUAL ARCHIVE"
          subtitle="Editorial gallery of film photography, album artwork, 16mm video stills, studio contact sheets, and audio-reactive WebGL experiments."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 font-mono text-xs border-b border-border pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border transition-colors ${
                selectedCategory === cat
                  ? 'border-accent bg-accent/10 text-accent font-bold'
                  : 'border-border bg-background-card text-foreground-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Gallery Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group relative border border-border bg-background-card p-4 hover:border-accent transition-all cursor-pointer space-y-3"
          >
            <div className="relative aspect-[4/3] border border-border overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover grayscale contrast-125 opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                <span className="px-3 py-1.5 border border-accent bg-[#080909] font-mono text-xs text-foreground font-bold">
                  INSPECT EXIF METADATA →
                </span>
              </div>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-foreground-dim">
                <span className="text-accent uppercase font-bold">{item.category}</span>
                <span>{item.archiveCode}</span>
              </div>
              <h3 className="font-editorial text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* EXIF Lightbox Modal */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-12 flex items-center justify-center overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#080909] border border-border p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setActiveModalItem(null)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 p-2 border border-border text-foreground-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 relative aspect-square sm:aspect-video border border-border">
                <Image
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div>
                  <span className="px-2 py-0.5 border border-accent/40 text-accent font-bold uppercase text-[10px]">
                    {activeModalItem.category}
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-foreground mt-3">
                    {activeModalItem.title}
                  </h2>
                  <p className="font-sans text-sm text-foreground-muted mt-2 leading-relaxed">
                    {activeModalItem.description}
                  </p>
                </div>

                <div className="p-4 border border-border bg-background-card space-y-3">
                  <div className="flex items-center gap-2 text-accent font-bold tracking-widest border-b border-border pb-2">
                    <Camera className="w-4 h-4" />
                    <span>EXIF METADATA & SPECS</span>
                  </div>

                  {activeModalItem.exif?.camera && (
                    <div className="flex justify-between border-b border-border/40 pb-1.5">
                      <span className="text-foreground-dim">CAMERA BODY</span>
                      <span className="text-foreground">{activeModalItem.exif.camera}</span>
                    </div>
                  )}

                  {activeModalItem.exif?.medium && (
                    <div className="flex justify-between border-b border-border/40 pb-1.5">
                      <span className="text-foreground-dim">MEDIUM / SHADER</span>
                      <span className="text-foreground">{activeModalItem.exif.medium}</span>
                    </div>
                  )}

                  {activeModalItem.exif?.location && (
                    <div className="flex justify-between border-b border-border/40 pb-1.5">
                      <span className="text-foreground-dim">LOCATION</span>
                      <span className="text-foreground">{activeModalItem.exif.location}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-foreground-dim">DATE ARCHIVED</span>
                    <span className="text-foreground">{activeModalItem.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
