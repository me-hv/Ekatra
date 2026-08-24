'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowRight, Sliders, ExternalLink } from 'lucide-react';
import { RELEASES } from '@/data/music';
import { useAudio } from '@/context/AudioContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EditorialLink } from '@/components/ui/EditorialLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function MusicPage() {
  const { playTrack } = useAudio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <SectionHeader
        number="01"
        category="SONIC DISCOGRAPHY"
        title="MUSIC & RELEASES"
        subtitle="Music releases treated as physical record sleeves. Tracklists, studio manuscripts, modular synthesis equipment specs, and audio monitoring."
      />

      {/* Release List */}
      <div className="space-y-16">
        {RELEASES.map((release) => (
          <div
            key={release.id}
            className="border border-border bg-background-card p-6 sm:p-10 space-y-8 hover:border-border-bright transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Record Sleeve Cover Artwork */}
              <div className="lg:col-span-5 relative aspect-square border border-border bg-background-surface overflow-hidden group">
                <Image
                  src={release.coverImage}
                  alt={release.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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

              {/* Release Metadata & Tracklist */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 border border-accent/40 text-accent font-bold uppercase text-[10px]">
                      {release.type}
                    </span>
                    <span className="text-foreground-muted">{release.catalogNumber}</span>
                  </div>
                  <span className="text-foreground-dim">RELEASE DATE: {release.releaseDate}</span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-foreground">
                  {release.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-foreground-muted leading-relaxed">
                  {release.description}
                </p>

                {/* Tracklist */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-foreground-dim uppercase tracking-widest text-[10px] pb-1 border-b border-border/40 flex justify-between">
                    <span>MANUSCRIPT TRACKLIST ({release.tracks.length})</span>
                    <span>DURATION</span>
                  </div>
                  {release.tracks.map((track) => (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track, release)}
                      className="p-3 border border-border/50 bg-background-surface hover:border-accent/60 transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <Play className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-foreground font-medium group-hover:text-accent transition-colors">
                          {track.title}
                        </span>
                      </div>
                      <span className="text-foreground-dim">{track.duration}</span>
                    </div>
                  ))}
                </div>

                {/* Equipment Specs & Detail Link */}
                <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
                    <Sliders className="w-4 h-4 text-accent" />
                    <span>SPECS: {release.equipmentUsed.slice(0, 3).join(', ')}</span>
                  </div>

                  <EditorialLink href={`/music/${release.slug}`}>
                    FULL MANUSCRIPT & SPECS
                  </EditorialLink>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
