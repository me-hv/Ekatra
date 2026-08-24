'use client';

import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { RELEASES } from '@/data/music';
import { useAudio } from '@/context/AudioContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EditorialLink } from '@/components/ui/EditorialLink';

export function MusicSection() {
  const { playTrack } = useAudio();

  return (
    <section className="py-12 space-y-10 border-b border-border">
      <SectionHeader
        number="01"
        category="MUSIC ARCHIVE"
        title="SONIC DISCOGRAPHY"
        subtitle="Music releases treated as physical record sleeves. Tracklists, studio manuscripts, modular synthesis equipment specs, and audio monitoring."
        linkHref="/music"
        linkText="BROWSE ALL RELEASES"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {RELEASES.slice(0, 2).map((release) => (
          <div
            key={release.id}
            className="group border border-border bg-background-card p-6 space-y-6 hover:border-border-bright transition-all"
          >
            <div className="relative aspect-square border border-border bg-background-surface overflow-hidden">
              <Image
                src={release.coverImage}
                alt={release.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => release.tracks[0] && playTrack(release.tracks[0], release)}
                  className="px-5 py-2.5 bg-[#080909]/90 border border-border hover:border-accent text-foreground font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  aria-label={`Play ${release.title}`}
                >
                  <Play className="w-4 h-4 fill-current text-accent" />
                  <span>PLAY RELEASE →</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-foreground-dim border-b border-border/40 pb-2">
                <span className="text-accent uppercase font-bold">{release.type}</span>
                <span>{release.catalogNumber} · {release.releaseDate}</span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                {release.title}
              </h3>

              <p className="font-sans text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                {release.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border/40 flex items-center justify-between font-mono text-[11px]">
              <span className="text-foreground-dim">
                {release.tracks.length} TRACKS · {release.equipmentUsed[0]}
              </span>
              <EditorialLink href={`/music/${release.slug}`}>
                MANUSCRIPT & SPECS
              </EditorialLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
