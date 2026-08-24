'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Feather, BookOpen, Clock, Tag } from 'lucide-react';
import { WRITING_PIECES, WritingPiece } from '@/data/writing';

const CATEGORIES = ['ALL', 'Rap Lyrics', 'Poetry', 'Essays', 'Notebook', 'Fragments'];

export default function WritingPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredPieces = selectedCategory === 'ALL'
    ? WRITING_PIECES
    : WRITING_PIECES.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <span className="font-mono-tech text-xs text-accent tracking-widest block">02 / MANUSCRIPT NOTEBOOK</span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground">
          WRITING ARCHIVE
        </h1>
        <p className="font-sans text-base sm:text-lg text-foreground-muted max-w-3xl leading-relaxed">
          Rap lyrics, stream-of-consciousness poetry, creative technology essays, and notebook fragments. Styled like an artist&apos;s digital manuscript.
        </p>

        {/* Category Filters */}
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

      {/* Writing Grid / Editorial List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPieces.map((piece) => (
          <Link
            key={piece.id}
            href={`/writing/${piece.slug}`}
            className="group rounded-2xl bg-background-card border border-border p-8 hover:border-accent transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded bg-accent-glow/10 border border-accent/30 text-accent font-bold">
                  {piece.category}
                </span>
                <span className="text-foreground-dim">{piece.archiveNumber}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                {piece.title}
              </h2>

              <p className="font-sans text-sm text-foreground-muted leading-relaxed line-clamp-3">
                {piece.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 flex items-center justify-between font-mono text-xs text-foreground-dim">
              <div className="flex items-center gap-4">
                <span>{piece.date}</span>
                <span>• {piece.readTime}</span>
              </div>
              <span className="group-hover:translate-x-1 transition-transform text-accent flex items-center gap-1 font-bold">
                <span>READ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
