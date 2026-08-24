'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Disc } from 'lucide-react';
import { EditorialLink } from '@/components/ui/EditorialLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { RELEASES } from '@/data/music';
import { useAudio } from '@/context/AudioContext';

export function HeroSection() {
  const { playTrack } = useAudio();

  const handleEnterArchive = () => {
    if (RELEASES[0]?.tracks[0]) {
      playTrack(RELEASES[0].tracks[0], RELEASES[0]);
    }
  };

  return (
    <section className="py-8 sm:py-12 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column — Editorial Copy & Hierarchy */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Level 3: Metadata & Section Identifier */}
          <div className="flex items-center gap-3 font-mono text-xs text-accent tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>01 / ARTIST ARCHIVE</span>
            <span className="text-foreground-dim">·</span>
            <span className="text-foreground-dim tracking-widest">1997 — ∞</span>
          </div>

          {/* Level 1: Primary EKATRA Wordmark (No overlapping absolute positioning) */}
          <div className="space-y-2">
            <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95] block">
              EKATRA
            </h1>
            <div className="font-mono text-xs text-foreground-dim tracking-[0.25em] uppercase">
              CREATIVE ARCHIVE · SOUND / WORD / CODE
            </div>
          </div>

          {/* Level 2: Artist Philosophy Statement */}
          <blockquote className="font-serif italic text-lg sm:text-2xl text-foreground-muted leading-relaxed border-l border-accent/50 pl-4 py-1">
            &ldquo;This isn&apos;t a portfolio of things I&apos;ve done. It&apos;s an archive of who I&apos;m becoming.&rdquo;
          </blockquote>

          <p className="font-sans text-sm sm:text-base text-foreground-muted leading-relaxed max-w-xl font-normal">
            Independent rap artist, sound architect, writer, and creative technologist merging raw boom-bap cadences with modular synthesis, generative code, and published manuscripts.
          </p>

          {/* Level 4: Minimal Editorial CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
            <PrimaryButton
              variant="solid"
              size="lg"
              onClick={handleEnterArchive}
              icon={<Disc className="w-4 h-4 text-accent" />}
            >
              ENTER ARCHIVE →
            </PrimaryButton>

            <Link href="/music" className="no-underline">
              <PrimaryButton variant="outline" size="lg">
                BROWSE RELEASES
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Right Column — Documentary Studio Visual */}
        <div className="lg:col-span-5 space-y-2">
          <div className="relative aspect-[4/5] border border-border bg-background-card overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000"
              alt="EKATRA Studio Setup & Tape Recorder"
              fill
              className="object-cover grayscale contrast-125 opacity-85 group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-4 right-4 font-mono text-[10px] text-foreground-dim flex justify-between border-t border-border/40 pt-2">
              <span>FIG 01. ANALOG TAPE DECK</span>
              <span>GURGAON · 2026</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
