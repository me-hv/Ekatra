'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Track, Release, RELEASES } from '@/data/music';

interface AudioContextType {
  currentTrack: Track | null;
  currentRelease: Release | null;
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: number; // in seconds
  totalTime: number; // in seconds
  volume: number; // 0 to 1
  isMuted: boolean;
  isExpanded: boolean;
  playTrack: (track: Track, release?: Release) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (percentage: number) => void;
  setVolumeLevel: (val: number) => void;
  toggleMute: () => void;
  toggleExpanded: () => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  getAudioAnalyser: () => AnalyserNode | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(RELEASES[0].tracks[0]);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(RELEASES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(180);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const webAudioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Web Audio Engine for fallback synth tones
  const initWebAudio = (freq: number = 110) => {
    try {
      if (!webAudioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        webAudioCtxRef.current = new AudioCtx();
        analyserNodeRef.current = webAudioCtxRef.current.createAnalyser();
        analyserNodeRef.current.fftSize = 64;
      }

      const ctx = webAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous oscillator if running
      if (oscNodeRef.current) {
        try { oscNodeRef.current.stop(); } catch {}
        oscNodeRef.current.disconnect();
      }

      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low pass filter for warm lo-fi tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      
      if (analyserNodeRef.current) {
        gain.connect(analyserNodeRef.current);
        analyserNodeRef.current.connect(ctx.destination);
      } else {
        gain.connect(ctx.destination);
      }

      gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      osc.start();

      oscNodeRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.warn('Web Audio synthesis fallback initialized:', e);
    }
  };

  const stopWebAudio = () => {
    if (oscNodeRef.current) {
      try {
        oscNodeRef.current.stop();
      } catch {}
      oscNodeRef.current.disconnect();
      oscNodeRef.current = null;
    }
  };

  // Playback timer ticker for placeholder audio
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            stopWebAudio();
            return 0;
          }
          const nextTime = prev + 1;
          setProgress((nextTime / totalTime) * 100);
          return nextTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, totalTime]);

  const playTrack = (track: Track, release?: Release) => {
    setCurrentTrack(track);
    if (release) setCurrentRelease(release);
    
    // Parse duration like "03:45"
    if (track.duration) {
      const parts = track.duration.split(':');
      if (parts.length === 2) {
        const durSec = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        setTotalTime(durSec);
      }
    }

    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(true);

    if (track.synthFrequency) {
      initWebAudio(track.synthFrequency);
    } else {
      initWebAudio(130);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      if (currentTrack) {
        playTrack(currentTrack, currentRelease || undefined);
      }
    }
  };

  const pause = () => {
    setIsPlaying(false);
    stopWebAudio();
  };

  const seek = (percentage: number) => {
    const targetSec = (percentage / 100) * totalTime;
    setCurrentTime(targetSec);
    setProgress(percentage);
  };

  const setVolumeLevel = (val: number) => {
    setVolume(val);
    if (gainNodeRef.current && webAudioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : val * 0.15, webAudioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current && webAudioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(!isMuted ? 0 : volume * 0.15, webAudioCtxRef.current.currentTime);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const playNextTrack = () => {
    if (!currentRelease || !currentTrack) return;
    const idx = currentRelease.tracks.findIndex((t) => t.id === currentTrack.id);
    if (idx !== -1 && idx < currentRelease.tracks.length - 1) {
      playTrack(currentRelease.tracks[idx + 1], currentRelease);
    } else {
      // Loop to first
      playTrack(currentRelease.tracks[0], currentRelease);
    }
  };

  const playPrevTrack = () => {
    if (!currentRelease || !currentTrack) return;
    const idx = currentRelease.tracks.findIndex((t) => t.id === currentTrack.id);
    if (idx > 0) {
      playTrack(currentRelease.tracks[idx - 1], currentRelease);
    }
  };

  const getAudioAnalyser = () => {
    return analyserNodeRef.current;
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        currentRelease,
        isPlaying,
        progress,
        currentTime,
        totalTime,
        volume,
        isMuted,
        isExpanded,
        playTrack,
        togglePlay,
        pause,
        seek,
        setVolumeLevel,
        toggleMute,
        toggleExpanded,
        playNextTrack,
        playPrevTrack,
        getAudioAnalyser
      }}
    >
      {children}
      <audio ref={audioRef} className="hidden" />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
