'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Clock, MessageSquare } from 'lucide-react';
import { WRITING_PIECES } from '@/data/writing';
import { EditorialLink } from '@/components/ui/EditorialLink';

export default function WritingDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const piece = WRITING_PIECES.find((p) => p.slug === slug);

  if (!piece) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6 font-mono text-xs">
        <h1 className="font-editorial text-4xl font-bold">MANUSCRIPT ENTRY NOT FOUND</h1>
        <p className="text-foreground-muted">The requested writing entry does not exist in the manuscript archive.</p>
        <EditorialLink href="/writing">RETURN TO WRITING ARCHIVE</EditorialLink>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Back link */}
      <EditorialLink href="/writing" showArrow={false}>
        ← BACK TO WRITING ARCHIVE
      </EditorialLink>

      {/* Manuscript Header */}
      <header className="space-y-6 border-b border-border pb-8 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="px-2 py-0.5 border border-accent/40 text-accent font-bold uppercase text-[10px]">
            {piece.category}
          </span>
          <span className="text-foreground-dim">{piece.archiveNumber} · {piece.date}</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground leading-tight">
          {piece.title}
        </h1>

        <div className="flex items-center gap-4 text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            {piece.readTime}
          </span>
          <span>· BY EKATRA</span>
        </div>
      </header>

      {/* Main Manuscript Surface */}
      <div className="border border-border bg-background-card p-8 sm:p-14 space-y-8 font-serif text-lg sm:text-xl text-foreground leading-loose relative">
        <div className="whitespace-pre-wrap font-serif font-normal">
          {piece.content}
        </div>

        {/* Annotations */}
        {piece.annotations && piece.annotations.length > 0 && (
          <div className="pt-8 border-t border-border mt-8 space-y-3 font-mono text-xs font-normal">
            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>MARGIN ANNOTATIONS & NOTES</span>
            </div>
            {piece.annotations.map((ann, idx) => (
              <div key={idx} className="p-3 border border-border bg-background-surface text-foreground-muted">
                <span className="text-accent font-bold mr-2">[LINE {ann.line}]</span>
                {ann.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Footer */}
      <div className="flex justify-between items-center pt-6 font-mono text-[10px] text-foreground-dim border-t border-border tracking-widest">
        <span>ARCHIVE REF: {piece.archiveNumber}</span>
        <span>EKATRA MANUSCRIPT VAULT</span>
      </div>
    </article>
  );
}
