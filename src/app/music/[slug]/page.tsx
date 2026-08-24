'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowLeft, Sliders, ExternalLink } from 'lucide-react';
import { RELEASES } from '@/data/music';
import { useAudio } from '@/context/AudioContext';
import { EditorialLink } from '@/components/ui/EditorialLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function ReleaseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const release = RELEASES.find((r) => r.slug === slug);
  const { playTrack } = useAudio();

  if (!release) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6 font-mono text-xs">
        <h1 className="font-editorial text-4xl font-bold">CATALOG ENTRY NOT FOUND</h1>
        <p className="text-foreground-muted">The specified music release catalog entry does not exist in the archive index.</p>
        <EditorialLink href="/music">RETURN TO MUSIC DISCOGRAPHY</EditorialLink>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <EditorialLink href="/music" showArrow={false}>
        ← BACK TO MUSIC DISCOGRAPHY
      </EditorialLink>

      {/* Header Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-border pb-12">
        <div className="md:col-span-5 relative aspect-square border border-border bg-background-card">
          <Image
            src={release.coverImage}
            alt={release.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-7 space-y-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 border border-accent/40 text-accent font-bold uppercase text-[10px]">
              {release.type}
            </span>
            <span className="text-foreground-muted">{release.catalogNumber}</span>
            <span className="text-foreground-dim">· {release.releaseDate}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground">
            {release.title}
          </h1>

          <p className="font-sans text-base text-foreground-muted leading-relaxed">
            {release.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <PrimaryButton
              variant="solid"
              size="lg"
              icon={<Play className="w-4 h-4 fill-current text-accent" />}
              onClick={() => release.tracks[0] && playTrack(release.tracks[0], release)}
            >
              PLAY RELEASE AUDIO
            </PrimaryButton>

            {release.streamingLinks.bandcamp && (
              <a
                href={release.streamingLinks.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 border border-border hover:border-accent text-foreground font-mono text-xs flex items-center gap-2 transition-colors no-underline"
              >
                <span>BANDCAMP</span>
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tracklist & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
        
        {/* Tracklist Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-accent tracking-[0.2em] font-bold uppercase border-b border-border pb-2">
            MANUSCRIPT TRACKLIST
          </div>
          <div className="space-y-2">
            {release.tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track, release)}
                className="p-4 border border-border bg-background-card hover:border-accent transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground font-medium group-hover:text-accent transition-colors">
                      {track.title}
                    </span>
                  </div>
                  <span className="text-foreground-dim">{track.duration}</span>
                </div>
                {track.bpm && (
                  <div className="text-[10px] text-foreground-dim pl-5">
                    {track.key} · {track.bpm} BPM
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Studio Credits & Equipment Specs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-accent tracking-[0.2em] font-bold uppercase border-b border-border pb-2">
            STUDIO CREDITS & EQUIPMENT SPECS
          </div>
          
          <div className="p-6 border border-border bg-background-card space-y-6">
            <div className="grid grid-cols-2 gap-4 border-b border-border pb-4">
              <div>
                <span className="text-foreground-dim block text-[10px] mb-1">PRODUCED BY</span>
                <span className="text-foreground font-medium">{release.credits.production.join(', ')}</span>
              </div>
              <div>
                <span className="text-foreground-dim block text-[10px] mb-1">MIXED BY</span>
                <span className="text-foreground font-medium">{release.credits.mixing.join(', ')}</span>
              </div>
              <div>
                <span className="text-foreground-dim block text-[10px] mb-1">MASTERING LAB</span>
                <span className="text-foreground font-medium">{release.credits.mastering.join(', ')}</span>
              </div>
              <div>
                <span className="text-foreground-dim block text-[10px] mb-1">ARTWORK</span>
                <span className="text-foreground font-medium">{release.credits.artwork}</span>
              </div>
            </div>

            <div>
              <span className="text-foreground-dim block text-[10px] mb-2">SYNTHESIZERS & HARDWARE STACK</span>
              <div className="flex flex-wrap gap-2">
                {release.equipmentUsed.map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 border border-border bg-background-surface text-foreground-muted text-[11px]">
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
