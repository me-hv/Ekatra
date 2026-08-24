'use client';

import React from 'react';
import { ShieldAlert, Play, Terminal } from 'lucide-react';
import { VAULT_ITEMS } from '@/data/vault';
import { useAudio } from '@/context/AudioContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

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
      <div className="border border-border bg-background-card p-8 sm:p-12 space-y-6 relative overflow-hidden font-mono text-xs">
        <div className="flex items-center gap-2 text-accent font-bold tracking-widest uppercase">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>CLASSIFIED UNRELEASED ARCHIVE · PRIVATE SIGNALS</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-foreground">
          THE UNRELEASED VAULT
        </h1>

        <blockquote className="font-serif italic text-lg sm:text-xl text-foreground-muted border-l border-accent pl-4 py-1">
          &ldquo;Not everything I create has to be finished to have value.&rdquo;
        </blockquote>

        <p className="font-sans text-sm sm:text-base text-foreground-muted max-w-3xl leading-relaxed">
          Raw beat sketches, voice memos, unfinished verse manuscripts, audio DSP Rust code fragments, and abandoned album concepts.
        </p>
      </div>

      {/* Directory contents */}
      <div className="space-y-6 font-mono text-xs">
        <div className="flex items-center justify-between text-foreground-dim border-b border-border pb-3">
          <span>DIRECTORY CONTENTS ({VAULT_ITEMS.length} UNRELEASED FRAGMENTS)</span>
          <span>SYSTEM CODE: EKT-VLT-ROOT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VAULT_ITEMS.map((item) => (
            <div
              key={item.id}
              className="border border-border bg-background-card p-6 space-y-6 hover:border-accent transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 border border-accent/40 text-accent font-bold uppercase">
                    {item.type}
                  </span>
                  <span className="text-foreground-dim">{item.vaultCode} · {item.dateCreated}</span>
                </div>

                <h3 className="font-mono text-sm font-bold text-foreground truncate">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-foreground-muted leading-relaxed">
                  {item.description}
                </p>

                {item.snippetText && (
                  <div className="p-3 border border-border/60 bg-background-surface font-mono text-[11px] text-foreground-muted overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{item.snippetText}</pre>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-foreground-dim text-[10px]">STATUS: {item.status}</span>

                <PrimaryButton
                  variant="solid"
                  size="sm"
                  icon={<Play className="w-3.5 h-3.5 fill-current text-accent" />}
                  onClick={() => handlePlayVaultSketch(item.title, item.audioFrequency)}
                >
                  PLAY SKETCH
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
