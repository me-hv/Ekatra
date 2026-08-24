'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { VAULT_ITEMS } from '@/data/vault';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function VaultSection() {
  return (
    <section className="py-12 space-y-8">
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
  );
}
