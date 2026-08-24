'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Disc, Feather, Image as ImageIcon, ShieldAlert, User, Terminal, Volume2, Sparkles } from 'lucide-react';
import { RELEASES } from '@/data/music';
import { WRITING_PIECES } from '@/data/writing';
import { VISUAL_ITEMS } from '@/data/visuals';
import { VAULT_ITEMS } from '@/data/vault';
import { ARTIST_DATA } from '@/data/artist';
import { useAudio } from '@/context/AudioContext';

export default function HomePage() {
  const [hasEntered, setHasEntered] = useState(false);
  const { playTrack } = useAudio();

  const handleEnterArchive = () => {
    setHasEntered(true);
    // Trigger initial atmospheric beat preview
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
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#070709] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden"
          >
            {/* Background scanned lines grid */}
            <div className="absolute inset-0 scanned-line opacity-40 pointer-events-none" />

            {/* Top metadata badge */}
            <div className="w-full max-w-5xl flex items-center justify-between font-mono text-[11px] text-foreground-muted border-b border-border/40 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>ARCHIVE SIGNAL: ONLINE</span>
              </div>
              <div className="tracking-widest">EKATRA • 1997 — ∞</div>
            </div>

            {/* Main Entrance Title & Philosophy */}
            <div className="my-auto text-center max-w-4xl space-y-8 z-10 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-mono-tech text-xs sm:text-sm text-accent tracking-[0.3em]"
              >
                RAPPER • MUSIC PRODUCER • WRITER • CREATIVE TECHNOLOGIST
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-editorial text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-foreground leading-none"
              >
                EKATRA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-serif italic text-lg sm:text-2xl text-foreground-muted max-w-2xl mx-auto leading-relaxed"
              >
                &ldquo;This isn&apos;t a portfolio of things I&apos;ve done. It&apos;s an archive of who I&apos;m becoming.&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-6"
              >
                <button
                  onClick={handleEnterArchive}
                  className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-accent text-[#09090b] font-mono text-xs font-bold tracking-widest uppercase hover:bg-accent-hover transition-all shadow-[0_0_25px_var(--accent-glow)] hover:scale-105 active:scale-95"
                >
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>[ ENTER CREATIVE ARCHIVE ]</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Bottom section index hints */}
            <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-[10px] text-foreground-dim border-t border-border/40 pt-4">
              <div>01. MUSIC</div>
              <div>02. WRITING</div>
              <div>03. VISUALS</div>
              <div>04. VAULT</div>
              <div className="col-span-2 sm:col-span-1 text-right sm:text-left">05. ABOUT</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN ARCHIVE HOMEPAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-24">
        
        {/* Hero Banner Section */}
        <section className="relative rounded-2xl bg-gradient-to-b from-background-card to-background border border-border p-8 sm:p-14 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none font-editorial text-9xl font-bold">
            ARCHIVE
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-glow/10 border border-accent/30 text-accent font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIGITAL ART INSTALLATION & SOUND VAULT</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground leading-tight">
              RAW CADENCE. MODULAR SYNTHESIS. UNFILTERED MANUSCRIPTS.
            </h2>

            <p className="font-sans text-base sm:text-lg text-foreground-muted leading-relaxed">
              Step into EKATRA&apos;s personal domain—an underground fusion of oral hip-hop storytelling, analog sound design, digital technology experiments, and personal creative journals.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/music"
                className="px-6 py-3 rounded-lg bg-accent text-[#09090b] font-mono text-xs font-bold tracking-wider uppercase hover:bg-accent-hover transition-colors flex items-center gap-2"
              >
                <Disc className="w-4 h-4" />
                <span>EXPLORE MUSIC RELEASES</span>
              </Link>
              <Link
                href="/vault"
                className="px-6 py-3 rounded-lg bg-background-card border border-border hover:border-accent text-foreground font-mono text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-accent" />
                <span>ENTER UNRELEASED VAULT</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED MUSIC SECTION */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-border pb-4">
            <div>
              <span className="font-mono-tech text-xs text-accent tracking-widest block">01 / SONIC DISCOGRAPHY</span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-foreground mt-1">FEATURED RELEASES</h3>
            </div>
            <Link href="/music" className="font-mono text-xs text-foreground-muted hover:text-accent flex items-center gap-1">
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RELEASES.slice(0, 2).map((release) => (
              <div
                key={release.id}
                className="group relative rounded-xl bg-background-card border border-border p-6 hover:border-border-bright transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
                    <Image
                      src={release.coverImage}
                      alt={release.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => release.tracks[0] && playTrack(release.tracks[0], release)}
                      className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-accent text-[#09090b] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      aria-label={`Play ${release.title}`}
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs text-foreground-muted">
                    <span className="px-2 py-0.5 rounded bg-background border border-border">{release.type}</span>
                    <span>{release.catalogNumber} • {release.releaseDate}</span>
                  </div>

                  <h4 className="font-editorial text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {release.title}
                  </h4>

                  <p className="font-sans text-sm text-foreground-muted line-clamp-2">
                    {release.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground-dim">
                    {release.tracks.length} TRACKS • {release.equipmentUsed[0]}
                  </span>
                  <Link
                    href={`/music/${release.slug}`}
                    className="font-mono text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <span>DETAILS & LYRICS</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WRITING ARCHIVE PREVIEW */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-border pb-4">
            <div>
              <span className="font-mono-tech text-xs text-accent tracking-widest block">02 / MANUSCRIPT NOTEBOOK</span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-foreground mt-1">RECENT WRITING</h3>
            </div>
            <Link href="/writing" className="font-mono text-xs text-foreground-muted hover:text-accent flex items-center gap-1">
              <span>EXPLORE MANUSCRIPTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WRITING_PIECES.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/writing/${item.slug}`}
                className="group rounded-xl bg-background-card border border-border p-6 hover:border-accent transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-foreground-muted">
                    <span className="text-accent">{item.category}</span>
                    <span>{item.archiveNumber}</span>
                  </div>

                  <h4 className="font-editorial text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="font-sans text-xs text-foreground-muted line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between font-mono text-[10px] text-foreground-dim">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* VISUALS & VAULT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* VISUAL GALLERY HIGHLIGHT */}
          <section className="space-y-6">
            <div className="flex items-end justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono-tech text-xs text-accent tracking-widest block">03 / ARTWORK & EXIF</span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-foreground mt-1">VISUAL ARCHIVE</h3>
              </div>
              <Link href="/visuals" className="font-mono text-xs text-foreground-muted hover:text-accent">
                VIEW GALLERY →
              </Link>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden border border-border group">
              <Image
                src={VISUAL_ITEMS[0].imageUrl}
                alt={VISUAL_ITEMS[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end space-y-1">
                <span className="font-mono text-[10px] text-accent">{VISUAL_ITEMS[0].archiveCode} • {VISUAL_ITEMS[0].category}</span>
                <h4 className="font-editorial text-xl font-bold text-white">{VISUAL_ITEMS[0].title}</h4>
                <p className="font-mono text-xs text-neutral-300">{VISUAL_ITEMS[0].exif?.medium || VISUAL_ITEMS[0].exif?.camera}</p>
              </div>
            </div>
          </section>

          {/* VAULT UNRELEASED TEASER */}
          <section className="space-y-6">
            <div className="flex items-end justify-between border-b border-border pb-4">
              <div>
                <span className="font-mono-tech text-xs text-accent tracking-widest block">04 / DISCOVERED FRAGMENTS</span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-foreground mt-1">THE UNRELEASED VAULT</h3>
              </div>
              <Link href="/vault" className="font-mono text-xs text-foreground-muted hover:text-accent">
                ENTER VAULT →
              </Link>
            </div>

            <div className="rounded-xl bg-background-card border border-border p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-accent">
                <Terminal className="w-4 h-4" />
                <span className="font-bold">FILE_SYSTEM // RAW_SKETCHES</span>
              </div>
              <div className="space-y-3">
                {VAULT_ITEMS.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded bg-background border border-border/60 hover:border-accent/60 transition-colors flex items-center justify-between"
                  >
                    <div className="space-y-0.5 truncate max-w-[240px]">
                      <div className="text-foreground font-semibold truncate">{item.title}</div>
                      <div className="text-[10px] text-foreground-dim">{item.vaultCode} • {item.type}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-accent-glow/10 border border-accent/30 text-accent">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* ARTIST MANIFESTO FOOTER CARD */}
        <section className="rounded-2xl bg-background-card border border-border p-8 sm:p-12 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent text-accent flex items-center justify-center mx-auto">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-3xl sm:text-5xl font-bold text-foreground">
            ABOUT EKATRA
          </h3>
          <p className="font-sans text-base text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            {ARTIST_DATA.bio}
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-background border border-border hover:border-accent text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
            >
              <span>READ ARTIST MANIFESTO & GEAR STACK</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
