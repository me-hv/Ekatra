'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WRITING_PIECES } from '@/data/writing';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EditorialLink } from '@/components/ui/EditorialLink';

const CATEGORIES = ['ALL', 'Rap Lyrics', 'Poetry', 'Essays', 'Notebook', 'Fragments'];

export default function WritingPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredPieces = selectedCategory === 'ALL'
    ? WRITING_PIECES
    : WRITING_PIECES.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-6">
        <SectionHeader
          number="02"
          category="MANUSCRIPT NOTEBOOK"
          title="WRITING ARCHIVE"
          subtitle="Rap lyrics, stream-of-consciousness poetry, creative technology essays, and studio notebook fragments."
        />

        {/* Category Filter bar */}
        <div className="flex flex-wrap gap-2 font-mono text-xs pt-2 border-b border-border pb-4">
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

      {/* Editorial Manuscript Index List */}
      <div className="space-y-6 font-mono text-xs">
        {filteredPieces.map((piece) => (
          <Link
            key={piece.id}
            href={`/writing/${piece.slug}`}
            className="group border border-border bg-background-card p-6 sm:p-8 hover:border-accent transition-all block space-y-4 no-underline"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] text-foreground-dim border-b border-border/40 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold">{piece.archiveNumber}</span>
                <span>·</span>
                <span className="text-foreground-muted uppercase">{piece.category}</span>
              </div>
              <div>DATE: {piece.date} · {piece.readTime}</div>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
              {piece.title}
            </h2>

            <p className="font-sans text-sm text-foreground-muted leading-relaxed max-w-4xl line-clamp-3">
              {piece.excerpt}
            </p>

            <div className="pt-3 flex justify-end border-t border-border/30">
              <span className="text-accent text-xs group-hover:translate-x-1 transition-transform flex items-center gap-1.5 font-bold">
                <span>READ MANUSCRIPT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
