'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Tag, MessageSquare } from 'lucide-react';
import { WRITING_PIECES } from '@/data/writing';

export default function WritingDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const piece = WRITING_PIECES.find((p) => p.slug === slug);

  if (!piece) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="font-editorial text-4xl font-bold">MANUSCRIPT NOT FOUND</h1>
        <p className="font-mono text-sm text-foreground-muted">The requested writing entry does not exist in the archive index.</p>
        <Link href="/writing" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent text-[#09090b] font-mono text-xs font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO WRITING ARCHIVE</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Back link */}
      <Link href="/writing" className="inline-flex items-center gap-2 font-mono text-xs text-foreground-muted hover:text-accent transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO WRITING ARCHIVE</span>
      </Link>

      {/* Manuscript Header */}
      <header className="space-y-6 border-b border-border pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-accent-glow/10 border border-accent/30 text-accent font-bold">
            {piece.category}
          </span>
          <span className="text-foreground-dim">{piece.archiveNumber} • {piece.date}</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground leading-tight">
          {piece.title}
        </h1>

        <div className="flex items-center gap-4 font-mono text-xs text-foreground-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent" />
            {piece.readTime}
          </span>
          <span>• BY EKATRA</span>
        </div>
      </header>

      {/* Main Reading Manuscript Surface */}
      <div className="rounded-2xl bg-background-card border border-border p-8 sm:p-14 space-y-8 font-sans text-base sm:text-lg text-foreground-muted leading-relaxed relative">
        <div className="whitespace-pre-wrap font-serif text-foreground font-normal leading-loose">
          {piece.content}
        </div>

        {/* Annotations / Studio Notes */}
        {piece.annotations && piece.annotations.length > 0 && (
          <div className="pt-8 border-t border-border mt-8 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>MARGIN ANNOTATIONS & NOTES</span>
            </div>
            {piece.annotations.map((ann, idx) => (
              <div key={idx} className="p-3 rounded bg-background border border-border text-foreground-muted">
                <span className="text-accent font-bold mr-2">[LINE {ann.line}]</span>
                {ann.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Footer */}
      <div className="flex justify-between items-center pt-6 font-mono text-xs text-foreground-dim border-t border-border">
        <span>ARCHIVE REF: {piece.archiveNumber}</span>
        <span>EKATRA MANUSCRIPT VAULT</span>
      </div>
    </article>
  );
}
