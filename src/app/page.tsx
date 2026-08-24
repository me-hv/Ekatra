'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Disc, Feather, Image as ImageIcon, ShieldAlert, User, Terminal } from 'lucide-react';
import { RELEASES } from '@/data/music';
import { WRITING_PIECES } from '@/data/writing';
import { VISUAL_ITEMS } from '@/data/visuals';
import { VAULT_ITEMS } from '@/data/vault';
import { ARTIST_DATA } from '@/data/artist';
import { useAudio } from '@/context/AudioContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EditorialLink } from '@/components/ui/EditorialLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function HomePage() {
  const [hasEntered, setHasEntered] = useState(false);
  const { playTrack } = useAudio();

  const handleEnterArchive = () => {
    setHasEntered(true);
    if (RELEASES[0]?.tracks[0]) {
      playTrack(RELEASES[0].tracks[0], RELEASES[0]);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      
      {/* 1. CONCEPTUAL ENTRANCE OVERLAY SEQUENCE */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#080909] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden"
          >
            {/* Scanned line background */}
            <div className="absolute inset-0 scanned-line opacity-30 pointer-events-none" />

            {/* Top metadata rule */}
            <div className="w-full max-w-6xl flex items-center justify-between font-mono text-[10px] text-foreground-dim border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>SIGNAL: ACTIVE</span>
              </div>
              <div className="tracking-[0.25em]">EKATRA · 1997 — ∞</div>
            </div>

            {/* Main Asymmetrical Entrance Title */}
            <div className="my-auto text-center max-w-4xl space-y-8 z-10 px-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-xs text-accent tracking-[0.25em] uppercase"
              >
                01 / ARTIST ARCHIVE · RAPPER · MUSIC PRODUCER · WRITER · CREATIVE TECHNOLOGIST
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-editorial text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-none"
              >
                EKATRA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-serif italic text-lg sm:text-2xl text-foreground-muted max-w-2xl mx-auto leading-relaxed"
              >
                &ldquo;This isn&apos;t a portfolio of things I&apos;ve done. It&apos;s an archive of who I&apos;m becoming.&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-6"
              >
                <button
                  onClick={handleEnterArchive}
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-border bg-background-card hover:border-accent text-foreground font-mono text-xs tracking-widest uppercase transition-all group hover:bg-accent/10"
                >
                  <span>ENTER ARCHIVE</span>
                  <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Bottom section index hints */}
            <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-[10px] text-foreground-dim border-t border-border pt-4">
              <div>01. MUSIC</div>
              <div>02. WRITING</div>
              <div>03. VISUALS</div>
              <div>04. VAULT</div>
              <div className="col-span-2 sm:col-span-1 text-right sm:text-left">05. ABOUT</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN EDITORIAL ARCHIVE HOMEPAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-24">
        
        {/* HERO SECTION — ASYMMETRICAL EDITORIAL COMPOSITION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-border pb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs text-accent tracking-[0.2em]">
              01 / ARTIST ARCHIVE · CREATIVE DIRECTORY
            </div>

            <h1 className="font-editorial text-5xl sm:text-7xl font-bold text-foreground leading-[0.95]">
              SOUND IS MY DIALECT. WORD IS MY ANCHOR.
            </h1>

            <p className="font-sans text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl">
              An independent digital archive documenting oral hip-hop cadences, analog synthesizer recordings, stream-of-consciousness writing manuscripts, and unreleased studio fragments.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs">
              <Link href="/music" className="no-underline">
                <PrimaryButton variant="solid" size="lg" icon={<Disc className="w-4 h-4" />}>
                  EXPLORE RELEASES
                </PrimaryButton>
              </Link>
              <Link href="/vault" className="no-underline">
                <PrimaryButton variant="outline" size="lg" icon={<ShieldAlert className="w-4 h-4 text-accent" />}>
                  UNRELEASED VAULT
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Documentary Studio Visual Placeholder */}
          <div className="lg:col-span-5 relative aspect-[4/5] border border-border bg-background-card overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000"
              alt="EKATRA Studio Recording Session"
              fill
              className="object-cover grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] text-foreground-dim flex justify-between border-t border-border/40 pt-2">
              <span>FIG 01. ANALOG STUDIO TAPE DECK</span>
              <span>GURGAON · 2026</span>
            </div>
          </div>
        </section>

        {/* 01 / MUSIC RELEASES — EDITORIAL RECORD SLEEVE PRESENTATION */}
        <section className="space-y-10">
          <SectionHeader
            number="01"
            category="MUSIC ARCHIVE"
            title="SONIC DISCOGRAPHY"
            subtitle="Music releases treated as physical artistic objects. Record sleeves, tracklists, DAW specs, and studio manuscripts."
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
                  <button
                    onClick={() => release.tracks[0] && playTrack(release.tracks[0], release)}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-[#080909]/90 border border-border hover:border-accent text-foreground font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                    aria-label={`Play ${release.title}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-accent" />
                    <span>PLAY →</span>
                  </button>
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

        {/* 02 / WRITING — MANUSCRIPT ARCHIVE */}
        <section className="space-y-10">
          <SectionHeader
            number="02"
            category="WRITING ARCHIVE"
            title="RECENT MANUSCRIPTS"
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
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-foreground-dim">
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold">{item.archiveNumber}</span>
                    <span>·</span>
                    <span className="text-foreground-muted">{item.category}</span>
                  </div>
                  <div>{item.date} · {item.readTime}</div>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-foreground-muted line-clamp-2 leading-relaxed">
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

        {/* 03 / VISUALS & 04 / VAULT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* VISUAL ARCHIVE */}
          <section className="space-y-8">
            <SectionHeader
              number="03"
              category="VISUAL GALLERY"
              title="CONTACT SHEETS & EXIF"
              linkHref="/visuals"
              linkText="VIEW GALLERY"
            />

            <div className="relative aspect-video border border-border bg-background-card overflow-hidden group">
              <Image
                src={VISUAL_ITEMS[0].imageUrl}
                alt={VISUAL_ITEMS[0].title}
                fill
                className="object-cover grayscale contrast-125 opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-black/20 to-transparent p-6 flex flex-col justify-end space-y-1">
                <span className="font-mono text-[10px] text-accent">{VISUAL_ITEMS[0].archiveCode} · {VISUAL_ITEMS[0].category}</span>
                <h3 className="font-editorial text-xl font-bold text-foreground">{VISUAL_ITEMS[0].title}</h3>
                <p className="font-mono text-[11px] text-foreground-muted">{VISUAL_ITEMS[0].exif?.medium || VISUAL_ITEMS[0].exif?.camera}</p>
              </div>
            </div>
          </section>

          {/* UNRELEASED VAULT */}
          <section className="space-y-8">
            <SectionHeader
              number="04"
              category="PRIVATE SIGNALS"
              title="THE UNRELEASED VAULT"
              linkHref="/vault"
              linkText="ENTER VAULT"
            />

            <div className="border border-border bg-background-card p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-accent border-b border-border/40 pb-3">
                <Terminal className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">DIRECTORY // RAW_SKETCHES</span>
              </div>
              <div className="space-y-3">
                {VAULT_ITEMS.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border border-border/60 bg-background-surface hover:border-accent/60 transition-colors flex items-center justify-between"
                  >
                    <div className="space-y-0.5 truncate max-w-[220px]">
                      <div className="text-foreground font-semibold truncate">{item.title}</div>
                      <div className="text-[10px] text-foreground-dim">{item.vaultCode} · {item.type}</div>
                    </div>
                    <span className="px-2 py-0.5 border border-border text-[9px] text-accent">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* 05 / ABOUT EKATRA */}
        <section className="border border-border bg-background-card p-8 sm:p-14 space-y-6 text-center">
          <div className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            05 / ARTIST STATEMENT · EKATRA
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-foreground">
            ABOUT EKATRA
          </h2>
          <p className="font-sans text-base text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            {ARTIST_DATA.bio}
          </p>
          <div className="pt-2">
            <EditorialLink href="/about">
              READ ARTIST MANIFESTO & STUDIO TOOLING STACK
            </EditorialLink>
          </div>
        </section>

      </div>
    </div>
  );
}
