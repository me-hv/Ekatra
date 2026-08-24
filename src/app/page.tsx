import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { MusicSection } from '@/components/home/MusicSection';
import { WritingSection } from '@/components/home/WritingSection';
import { VisualsSection } from '@/components/home/VisualsSection';
import { VaultSection } from '@/components/home/VaultSection';
import { AboutSection } from '@/components/home/AboutSection';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <HeroSection />
      <MusicSection />
      <WritingSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <VisualsSection />
        <VaultSection />
      </div>
      <AboutSection />
    </div>
  );
}
