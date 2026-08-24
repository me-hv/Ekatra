'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowRight, Disc, Sliders, ExternalLink } from 'lucide-react';
import { RELEASES } from '@/data/music';
import { useAudio } from '@/context/AudioContext';

export default function MusicPage() {
  const { playTrack } = useAudio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <span className="font-mono-tech text-xs text-accent tracking-widest block">01 / SONIC DISCOGRAPHY</span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground">
          MUSIC & RELEASES
        </h1>
        <p className="font-sans text-base sm:text-lg text-foreground-muted max-w-3xl leading-relaxed">
          Music releases treated as important artistic objects. Each release contains full tracklists, production equipment notes, studio manuscripts, and audio previews.
        </p>
      </div>

      {/* Release List */}
      <div className="space-y-16">
        {RELEASES.map((release) => (
          <div
            key={release.id}
            className="rounded-2xl bg-background-card border border-border p-6 sm:p-10 space-y-8 hover:border-border-bright transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Cover Artwork & Direct Play */}
              <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-border group">
                <Image
                  src={release.coverImage}
                  alt={release.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => release.tracks[0] && playTrack(release.tracks[0], release)}
                    className="w-16 h-16 rounded-full bg-accent text-[#09090b] flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                    aria-label={`Play ${release.title}`}
                  >
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </button>
                </div>
              </div>

              {/* Release Metadata & Tracklist */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-accent-glow/10 border border-accent/30 font-mono text-xs text-accent font-semibold">
                      {release.type}
                    </span>
                    <span className="font-mono text-xs text-foreground-muted ml-3">
                      {release.catalogNumber}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-foreground-dim">
                    RELEASE DATE: {release.releaseDate}
                  </span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-foreground">
                  {release.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-foreground-muted leading-relaxed">
                  {release.description}
                </p>

                {/* Tracklist */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-foreground-dim uppercase tracking-wider text-[10px] pb-1 border-b border-border/40 flex justify-between">
                    <span>TRACKLIST ({release.tracks.length})</span>
                    <span>DURATION</span>
                  </div>
                  {release.tracks.map((track) => (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track, release)}
                      className="p-3 rounded-lg bg-background border border-border/40 hover:border-accent/60 transition-colors flex items-center justify-between cursor-pointer group"
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

                {/* Equipment & Links */}
                <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
                    <Sliders className="w-4 h-4 text-accent" />
                    <span>SYNTHS & SPECS: {release.equipmentUsed.slice(0, 3).join(', ')}</span>
                  </div>

                  <Link
                    href={`/music/${release.slug}`}
                    className="px-4 py-2 rounded bg-accent text-[#09090b] font-mono text-xs font-bold tracking-wider uppercase hover:bg-accent-hover transition-colors flex items-center gap-1.5"
                  >
                    <span>FULL ARTWORK & MANUSCRIPT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
