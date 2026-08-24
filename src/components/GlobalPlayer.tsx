'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2, Music, AlignLeft, X } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export function GlobalPlayer() {
  const {
    currentTrack,
    currentRelease,
    isPlaying,
    progress,
    currentTime,
    totalTime,
    volume,
    isMuted,
    isExpanded,
    togglePlay,
    seek,
    setVolumeLevel,
    toggleMute,
    toggleExpanded,
    playNextTrack,
    playPrevTrack,
    getAudioAnalyser,
  } = useAudio();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render Web Audio frequency visualizer when playing
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = getAudioAnalyser();

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isPlaying || !analyser) {
        // Draw static minimal audio line when paused
        ctx.fillStyle = '#333339';
        for (let i = 0; i < 16; i++) {
          const x = i * 4;
          const h = 2 + Math.sin(i * 0.5) * 2;
          ctx.fillRect(x, canvas.height / 2 - h / 2, 2, h);
        }
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = 3;
      let x = 0;

      for (let i = 0; i < 16; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.85 + 2;
        ctx.fillStyle = '#e23812';
        ctx.fillRect(x, canvas.height - barHeight, 2, barHeight);
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, getAudioAnalyser]);

  if (!currentTrack) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Bottom Docked Persistent HUD */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0f]/95 backdrop-blur-lg border-t border-border shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Release & Track Metadata */}
          <div className="flex items-center gap-3 w-1/3 min-w-[200px]">
            {currentRelease?.coverImage ? (
              <div className="relative w-12 h-12 rounded overflow-hidden border border-border flex-shrink-0 group">
                <Image
                  src={currentRelease.coverImage}
                  alt={currentRelease.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Music className="w-4 h-4 text-accent" />
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 rounded bg-background-card border border-border flex items-center justify-center flex-shrink-0">
                <Music className="w-5 h-5 text-accent" />
              </div>
            )}

            <div className="overflow-hidden">
              <div className="font-editorial text-sm font-semibold text-foreground truncate">
                {currentTrack.title}
              </div>
              <div className="font-mono text-[10px] text-foreground-muted truncate mt-0.5">
                {currentRelease?.title || 'SINGLE RELEASE'} • {currentTrack.bpm ? `${currentTrack.bpm} BPM` : 'AUDIO ARCHIVE'}
              </div>
            </div>
          </div>

          {/* Controls & Scrubber */}
          <div className="flex flex-col items-center justify-center w-1/3 max-w-md">
            <div className="flex items-center gap-4 mb-1.5">
              <button
                onClick={playPrevTrack}
                aria-label="Previous Track"
                className="text-foreground-muted hover:text-foreground transition-colors p-1"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-9 h-9 rounded-full bg-accent text-[#09090b] flex items-center justify-center shadow-[0_0_12px_var(--accent-glow)] hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={playNextTrack}
                aria-label="Next Track"
                className="text-foreground-muted hover:text-foreground transition-colors p-1"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Seek Bar */}
            <div className="w-full flex items-center gap-2">
              <span className="font-mono text-[10px] text-foreground-dim w-8 text-right">
                {formatTime(currentTime)}
              </span>

              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = ((e.clientX - rect.left) / rect.width) * 100;
                  seek(pct);
                }}
                className="flex-1 h-1.5 bg-background-muted rounded cursor-pointer relative overflow-hidden group"
              >
                <div
                  className="h-full bg-accent shadow-[0_0_8px_var(--accent-primary)] relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <span className="font-mono text-[10px] text-foreground-dim w-8">
                {formatTime(totalTime)}
              </span>
            </div>
          </div>

          {/* Canvas Audio Visualizer & Expansion Tools */}
          <div className="flex items-center justify-end gap-4 w-1/3">
            <div className="hidden md:block">
              <canvas ref={canvasRef} width={64} height={20} className="rounded opacity-80" />
            </div>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-foreground-muted hover:text-foreground transition-colors p-1"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-accent" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
                aria-label="Volume level"
                className="w-16 h-1 bg-background-muted rounded appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Expand Lyrics / HUD */}
            <button
              onClick={toggleExpanded}
              aria-label="Toggle Player Details & Lyrics"
              className={`p-2 rounded border transition-colors ${
                isExpanded ? 'border-accent text-accent bg-accent-glow/10' : 'border-border text-foreground-muted hover:text-foreground'
              }`}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Player Overlay (Lyrics & Full Spectrum Visualizer) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#09090b]/98 backdrop-blur-2xl overflow-y-auto p-6 md:p-12 flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-border pb-6">
              <div>
                <span className="font-mono-tech text-xs text-accent tracking-widest block">
                  GLOBAL AUDIO MONITOR
                </span>
                <h2 className="font-editorial text-2xl md:text-4xl text-foreground font-bold mt-1">
                  {currentTrack.title}
                </h2>
              </div>
              <button
                onClick={toggleExpanded}
                aria-label="Close Expanded Player"
                className="p-3 rounded-full bg-background-card border border-border text-foreground hover:text-accent transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Content: Artwork & Synchronized Lyrics */}
            <div className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto w-full">
              
              {/* Artwork & Specs */}
              <div className="space-y-6">
                {currentRelease?.coverImage && (
                  <div className="relative aspect-square rounded-lg overflow-hidden border border-border shadow-2xl">
                    <Image
                      src={currentRelease.coverImage}
                      alt={currentRelease.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-background-card border border-border font-mono text-xs text-foreground-muted">
                  <div>
                    <span className="text-foreground-dim block">CATALOG CODE</span>
                    <span className="text-foreground font-semibold">{currentRelease?.catalogNumber}</span>
                  </div>
                  <div>
                    <span className="text-foreground-dim block">KEY & TEMPO</span>
                    <span className="text-foreground font-semibold">{currentTrack.key || 'N/A'} @ {currentTrack.bpm || 90} BPM</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-foreground-dim block">EQUIPMENT SPECS</span>
                    <span className="text-foreground">{currentRelease?.equipmentUsed?.join(', ') || 'Analog Synthesizers & Tape'}</span>
                  </div>
                </div>
              </div>

              {/* Lyrics Panel */}
              <div className="p-6 rounded-xl bg-background-card border border-border space-y-4">
                <div className="flex items-center gap-2 text-accent font-mono text-xs tracking-wider border-b border-border pb-3">
                  <AlignLeft className="w-4 h-4" />
                  <span>MANUSCRIPT LYRICS</span>
                </div>
                {currentTrack.lyrics ? (
                  <pre className="font-sans text-foreground-muted leading-relaxed whitespace-pre-wrap font-medium text-sm md:text-base">
                    {currentTrack.lyrics}
                  </pre>
                ) : (
                  <div className="py-12 text-center text-foreground-dim font-mono text-sm">
                    [INSTRUMENTAL AUDIO TRACK — NO WRITTEN MANUSCRIPT]
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Monitor Status */}
            <div className="text-center font-mono text-xs text-foreground-dim pt-4 border-t border-border">
              EKATRA AUDIO FREQUENCY MONITOR • STREAMING SIGNAL ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
