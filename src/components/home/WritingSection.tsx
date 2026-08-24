'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WRITING_PIECES } from '@/data/writing';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function WritingSection() {
  return (
    <section className="py-12 space-y-10 border-b border-border">
      <SectionHeader
        number="02"
        category="MANUSCRIPT NOTEBOOK"
        title="RECENT WRITING"
        subtitle="Rap lyrics, poetry, thought logs, and essays styled like pages from an artist's notebook."
        linkHref="/writing"
        linkText="EXPLORE MANUSCRIPTS"
      />

      <div className="space-y-4 font-mono text-xs">
        {WRITING_PIECES.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={`/writing/${item.slug}`}
            className="group border border-border bg-background-card p-6 hover:border-accent transition-all block space-y-3 no-underline"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-foreground-dim border-b border-border/40 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold">{item.archiveNumber}</span>
                <span>·</span>
                <span className="text-foreground-muted uppercase">{item.category}</span>
              </div>
              <div>{item.date} · {item.readTime}</div>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
              {item.title}
            </h3>

            <p className="font-sans text-xs text-foreground-muted line-clamp-2 leading-relaxed font-normal">
              {item.excerpt}
            </p>

            <div className="pt-2 flex justify-end">
              <span className="text-accent text-[11px] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>READ MANUSCRIPT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
