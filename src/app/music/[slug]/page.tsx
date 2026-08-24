'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowLeft, Disc, Sliders, AlignLeft, ExternalLink } from 'lucide-react';
import { RELEASES } from '@/data/music';
import { useAudio } from '@/context/AudioContext';

export default function ReleaseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const release = RELEASES.find((r) => r.slug === slug);
  const { playTrack } = useAudio();

  if (!release) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="font-editorial text-4xl font-bold">RELEASE NOT FOUND</h1>
        <p className="font-mono text-sm text-foreground-muted">The specified music release catalog entry does not exist.</p>
        <Link href="/music" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent text-[#09090b] font-mono text-xs font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MUSIC DISCOGRAPHY</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <Link href="/music" className="inline-flex items-center gap-2 font-mono text-xs text-foreground-muted hover:text-accent transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO MUSIC DISCOGRAPHY</span>
      </Link>

      {/* Header Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-border shadow-2xl">
          <Image
            src={release.coverImage}
            alt={release.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-7 space-y-6">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-accent-glow/10 border border-accent/30 text-accent font-bold">
              {release.type}
            </span>
            <span className="text-foreground-muted">{release.catalogNumber}</span>
            <span className="text-foreground-dim">• {release.releaseDate}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground">
            {release.title}
          </h1>

          <p className="font-sans text-base text-foreground-muted leading-relaxed">
            {release.description}
          </p>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <button
              onClick={() => release.tracks[0] && playTrack(release.tracks[0], release)}
              className="px-6 py-3 rounded-lg bg-accent text-[#09090b] font-mono text-xs font-bold tracking-wider uppercase hover:bg-accent-hover transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY RELEASE AUDIO</span>
            </button>

            {release.streamingLinks.bandcamp && (
              <a
                href={release.streamingLinks.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-background-card border border-border hover:border-accent text-foreground font-mono text-xs flex items-center gap-2"
              >
                <span>BANDCAMP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tracks & Synced Lyrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tracklist Column */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-mono-tech text-xs text-accent tracking-widest">TRACKLIST MANUSCRIPT</h3>
          <div className="space-y-3 font-mono text-xs">
            {release.tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track, release)}
                className="p-4 rounded-xl bg-background-card border border-border hover:border-accent transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground font-semibold group-hover:text-accent transition-colors">
                      {track.title}
                    </span>
                  </div>
                  <span className="text-foreground-dim">{track.duration}</span>
                </div>
                {track.bpm && (
                  <div className="text-[10px] text-foreground-dim pl-5">
                    {track.key} • {track.bpm} BPM
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Credits & Equipment Specs */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-mono-tech text-xs text-accent tracking-widest">PRODUCTION & EQUIPMENT CREDITS</h3>
          
          <div className="p-6 rounded-xl bg-background-card border border-border space-y-6 font-mono text-xs">
            <div className="grid grid-cols-2 gap-4 border-b border-border pb-4">
              <div>
                <span className="text-foreground-dim block mb-1">PRODUCED BY</span>
                <span className="text-foreground font-medium">{release.credits.production.join(', ')}</span>
              </div>
              <div>
                <span className="text-foreground-dim block mb-1">MIXED BY</span>
                <span className="text-foreground font-medium">{release.credits.mixing.join(', ')}</span>
              </div>
              <div>
                <span className="text-foreground-dim block mb-1">MASTERING LAB</span>
                <span className="text-foreground font-medium">{release.credits.mastering.join(', ')}</span>
              </div>
              <div>
                <span className="text-foreground-dim block mb-1">ARTWORK</span>
                <span className="text-foreground font-medium">{release.credits.artwork}</span>
              </div>
            </div>

            <div>
              <span className="text-foreground-dim block mb-2">SYNTHESIZERS & HARDWARE SPECS</span>
              <div className="flex flex-wrap gap-2">
                {release.equipmentUsed.map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-background border border-border text-foreground-muted text-[11px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
