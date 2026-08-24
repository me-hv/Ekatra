'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Layers, X, Sparkles, Sliders } from 'lucide-react';
import { VISUAL_ITEMS, VisualItem } from '@/data/visuals';

const CATEGORIES = ['ALL', 'Photography', 'Artwork', 'Video Still', 'Studio', 'Tech Experiment'];

export default function VisualsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalItem, setActiveModalItem] = useState<VisualItem | null>(null);

  const filteredItems = selectedCategory === 'ALL'
    ? VISUAL_ITEMS
    : VISUAL_ITEMS.filter((v) => v.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <span className="font-mono-tech text-xs text-accent tracking-widest block">03 / ARTWORK & EXIF</span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground">
          VISUAL ARCHIVE
        </h1>
        <p className="font-sans text-base sm:text-lg text-foreground-muted max-w-3xl leading-relaxed">
          Editorial gallery of film photography, album artwork, 16mm video stills, studio artifacts, and audio-reactive WebGL experiments.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-accent text-[#09090b] font-bold'
                  : 'bg-background-card border border-border text-foreground-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Gallery Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group relative rounded-xl overflow-hidden bg-background-card border border-border hover:border-accent transition-all cursor-pointer space-y-3 p-4"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border/60">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                <span className="px-4 py-2 rounded-full bg-accent text-[#09090b] font-mono text-xs font-bold">
                  INSPECT EXIF & DETAILS
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-foreground-muted">
                <span className="text-accent">{item.category}</span>
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-12 flex items-center justify-center overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-background-card border border-border rounded-2xl overflow-hidden p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setActiveModalItem(null)}
              aria-label="Close Lightbox Modal"
              className="absolute top-6 right-6 p-2 rounded-full bg-background border border-border text-foreground hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 relative aspect-square sm:aspect-video rounded-xl overflow-hidden border border-border">
                <Image
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-5 space-y-6 font-mono text-xs">
                <div>
                  <span className="px-2.5 py-1 rounded bg-accent-glow/10 border border-accent/30 text-accent font-bold">
                    {activeModalItem.category}
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-foreground mt-3">
                    {activeModalItem.title}
                  </h2>
                  <p className="font-sans text-sm text-foreground-muted mt-2">
                    {activeModalItem.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-background border border-border space-y-3">
                  <div className="flex items-center gap-2 text-accent font-bold tracking-wider">
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
