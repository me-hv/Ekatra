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

  // Render subtle Web Audio frequency visualizer in faded olive tones
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
        ctx.fillStyle = '#292a27';
        for (let i = 0; i < 20; i++) {
          const x = i * 4;
          const h = 2 + Math.sin(i * 0.4) * 2;
          ctx.fillRect(x, canvas.height / 2 - h / 2, 2, h);
        }
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = 3;
      let x = 0;

      for (let i = 0; i < 20; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8 + 2;
        ctx.fillStyle = '#b9b36a'; // Faded olive accent
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
      {/* Bottom Docked Persistent HUD (Analog Tape Deck Aesthetic) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0e0e]/95 backdrop-blur-md border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 font-mono">
          
          {/* Release & Track Metadata */}
          <div className="flex items-center gap-3 w-1/3 min-w-[200px]">
            {currentRelease?.coverImage ? (
              <div className="relative w-11 h-11 border border-border flex-shrink-0">
                <Image
                  src={currentRelease.coverImage}
                  alt={currentRelease.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-11 h-11 bg-background-surface border border-border flex items-center justify-center flex-shrink-0 text-foreground-dim">
                <Music className="w-4 h-4" />
              </div>
            )}

            <div className="overflow-hidden">
              <div className="font-editorial text-sm font-bold text-foreground truncate">
                {currentTrack.title}
              </div>
              <div className="text-[10px] text-foreground-muted truncate mt-0.5 tracking-wider">
                {currentRelease?.title || 'SINGLE'} {currentTrack.bpm ? `· ${currentTrack.bpm} BPM` : ''}
              </div>
            </div>
          </div>

          {/* Analog Controls & Waveform Progress */}
          <div className="flex flex-col items-center justify-center w-1/3 max-w-md space-y-1.5">
            <div className="flex items-center gap-5">
              <button
                onClick={playPrevTrack}
                aria-label="Previous Track"
                className="text-foreground-muted hover:text-foreground transition-colors p-1"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-8 h-8 border border-border bg-background-surface hover:border-accent text-foreground flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current text-accent" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-accent" />
                )}
              </button>

              <button
                onClick={playNextTrack}
                aria-label="Next Track"
                className="text-foreground-muted hover:text-foreground transition-colors p-1"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-2 text-[10px] text-foreground-dim">
              <span className="w-9 text-right font-mono">
                {formatTime(currentTime)}
              </span>

              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = ((e.clientX - rect.left) / rect.width) * 100;
                  seek(pct);
                }}
                className="flex-1 h-1 bg-background-surface border border-border/40 cursor-pointer relative overflow-hidden group"
              >
                <div
                  className="h-full bg-accent relative"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="w-9 font-mono">
                {formatTime(totalTime)}
              </span>
            </div>
          </div>

          {/* Audio Spectrum & Expand Drawer */}
          <div className="flex items-center justify-end gap-5 w-1/3">
            <div className="hidden md:block">
              <canvas ref={canvasRef} width={80} height={18} className="opacity-90" />
            </div>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-foreground-muted hover:text-foreground transition-colors"
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
                className="w-14 h-1 bg-background-surface rounded appearance-none cursor-pointer accent-accent"
              />
            </div>

            {/* Expand Drawer */}
            <button
              onClick={toggleExpanded}
              aria-label="Toggle Lyrics & Studio Notes"
              className={`p-2 border transition-colors ${
                isExpanded ? 'border-accent text-accent bg-accent/10' : 'border-border text-foreground-muted hover:text-foreground'
              }`}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Studio Control & Lyrics Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-50 bg-[#080909]/98 backdrop-blur-xl overflow-y-auto p-6 md:p-12 flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-border pb-6">
              <div>
                <span className="font-mono text-xs text-accent tracking-[0.2em] block">
                  ANALOG TAPE DECK MONITOR
                </span>
                <h2 className="font-editorial text-2xl md:text-4xl text-foreground font-bold mt-1">
                  {currentTrack.title}
                </h2>
              </div>
              <button
                onClick={toggleExpanded}
                aria-label="Close Studio Monitor"
                className="p-2 border border-border text-foreground-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Grid */}
            <div className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto w-full">
              
              {/* Artwork & Studio Specs */}
              <div className="space-y-6">
                {currentRelease?.coverImage && (
                  <div className="relative aspect-square border border-border">
                    <Image
                      src={currentRelease.coverImage}
                      alt={currentRelease.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 p-4 border border-border bg-background-card font-mono text-xs text-foreground-muted">
                  <div>
                    <span className="text-foreground-dim block text-[10px]">CATALOG CODE</span>
                    <span className="text-foreground font-semibold">{currentRelease?.catalogNumber}</span>
                  </div>
                  <div>
                    <span className="text-foreground-dim block text-[10px]">TEMPO & KEY</span>
                    <span className="text-foreground font-semibold">{currentTrack.key || 'N/A'} @ {currentTrack.bpm || 90} BPM</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-foreground-dim block text-[10px]">STUDIO EQUIPMENT</span>
                    <span className="text-foreground">{currentRelease?.equipmentUsed?.join(', ') || 'Modular Synthesizer & Tascam 424'}</span>
                  </div>
                </div>
              </div>

              {/* Manuscript Lyrics */}
              <div className="p-6 border border-border bg-background-card space-y-4">
                <div className="flex items-center gap-2 text-accent font-mono text-xs tracking-wider border-b border-border pb-3">
                  <AlignLeft className="w-4 h-4" />
                  <span>MANUSCRIPT LYRICS</span>
                </div>
                {currentTrack.lyrics ? (
                  <pre className="font-sans text-foreground-muted leading-relaxed whitespace-pre-wrap text-sm md:text-base font-normal">
                    {currentTrack.lyrics}
                  </pre>
                ) : (
                  <div className="py-12 text-center text-foreground-dim font-mono text-xs">
                    [INSTRUMENTAL RECORDING — NO WRITTEN MANUSCRIPT]
                  </div>
                )}
              </div>
            </div>

            {/* Footer Status */}
            <div className="text-center font-mono text-[10px] text-foreground-dim pt-4 border-t border-border tracking-widest">
              EKATRA AUDIO FREQUENCY MONITOR · SIGNAL ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
