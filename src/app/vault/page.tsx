'use client';

import React from 'react';
import { ShieldAlert, Play, Terminal, FileCode, Radio, Cpu } from 'lucide-react';
import { VAULT_ITEMS } from '@/data/vault';
import { useAudio } from '@/context/AudioContext';

export default function VaultPage() {
  const { playTrack } = useAudio();

  const handlePlayVaultSketch = (title: string, freq: number = 120) => {
    playTrack(
      {
        id: `vault-${title}`,
        title: `[VAULT] ${title}`,
        duration: '01:45',
        synthFrequency: freq,
        lyrics: `[UNRELEASED VAULT AUDIO FRAGMENT]\nTitle: ${title}\nPhilosophy: "Not everything I create has to be finished to have value."`,
      },
      {
        id: 'vlt-rel',
        slug: 'vault-archive',
        title: 'UNRELEASED VAULT SKETCHES',
        type: 'Single',
        releaseDate: '2026',
        catalogNumber: 'VLT-RAW',
        coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600',
        description: 'Raw unreleased vault audio fragments and beat experiments.',
        tracks: [],
        credits: { production: ['EKATRA'], mixing: ['EKATRA'], mastering: ['Unmastered'], artwork: 'EKATRA Vault' },
        streamingLinks: {},
        equipmentUsed: ['MPC', 'Modular Synth', 'Tascam Tape']
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-b from-background-card to-background border border-border p-8 sm:p-12 space-y-6 relative overflow-hidden">
        <div className="flex items-center gap-3 text-accent font-mono text-xs font-bold tracking-widest">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span>DISCOVERED FRAGMENTS // CLASSIFIED UNRELEASED ARCHIVE</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground">
          THE UNRELEASED VAULT
        </h1>

        <blockquote className="font-serif italic text-lg sm:text-xl text-foreground-muted border-l-2 border-accent pl-4 py-1">
          &ldquo;Not everything I create has to be finished to have value.&rdquo;
        </blockquote>

        <p className="font-sans text-sm sm:text-base text-foreground-muted max-w-3xl leading-relaxed">
          This area contains raw beat sketches, voice memos, unfinished verse manuscripts, audio DSP code fragments, and abandoned album concepts. It is an intentional peak behind the curtain.
        </p>
      </div>

      {/* Vault Items List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between font-mono text-xs text-foreground-dim border-b border-border pb-3">
          <span>DIRECTORY CONTENTS ({VAULT_ITEMS.length} FRAGMENTS)</span>
          <span>SYSTEM CODE: EKT-VLT-ROOT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VAULT_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-background-card border border-border p-6 space-y-6 hover:border-accent/80 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-accent-glow/10 border border-accent/30 text-accent font-bold">
                    {item.type}
                  </span>
                  <span className="text-foreground-dim">{item.vaultCode} • {item.dateCreated}</span>
                </div>

                <h3 className="font-mono text-base font-bold text-foreground truncate">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-foreground-muted leading-relaxed">
                  {item.description}
                </p>

                {/* Snippet text or code view */}
                {item.snippetText && (
                  <div className="p-3 rounded bg-background border border-border/60 font-mono text-xs text-foreground-muted overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{item.snippetText}</pre>
                  </div>
                )}
              </div>

              {/* Action trigger */}
              <div className="pt-4 border-t border-border/40 flex items-center justify-between font-mono text-xs">
                <span className="text-foreground-dim">STATUS: {item.status}</span>

                <button
                  onClick={() => handlePlayVaultSketch(item.title, item.audioFrequency)}
                  className="px-4 py-2 rounded bg-accent text-[#09090b] font-bold hover:bg-accent-hover transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY SKETCH</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
