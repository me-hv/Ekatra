export interface Track {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
  synthFrequency?: number; // Fallback audio synth tone
  lyrics?: string;
  credits?: string[];
  bpm?: number;
  key?: string;
  isExplicit?: boolean;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  type: 'Album' | 'EP' | 'Single' | 'Beat Tape';
  releaseDate: string;
  catalogNumber: string;
  coverImage: string;
  description: string;
  tracks: Track[];
  credits: {
    production: string[];
    mixing: string[];
    mastering: string[];
    artwork: string;
  };
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    bandcamp?: string;
    soundcloud?: string;
    youtube?: string;
  };
  equipmentUsed: string[];
  featured?: boolean;
}

export const RELEASES: Release[] = [
  {
    id: 'rel-01',
    slug: 'neural-archive-vol-1',
    title: 'NEURAL ARCHIVE VOL. 1',
    type: 'Album',
    releaseDate: '2025-11-14',
    catalogNumber: 'EKT-001',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    description: 'A 10-track sonic exploration dissecting the border between human spoken-word rap, modular synthesis, and generative neural feedback loops. Recorded late nights between Delhi and London.',
    tracks: [
      {
        id: 'tr-101',
        title: '01. SYNAPSE DRIFT (INTRO)',
        duration: '02:45',
        synthFrequency: 110,
        bpm: 88,
        key: 'A Minor',
        lyrics: `[INTRO: ANALOG TAPE HISS & REVERB]\nStatic in the satellite, frequencies align\nTracing broken circuits till the signal becomes mine\nZeroes and ones in the bloodline flow\nWhat the code doesn't capture is the spark down below.`,
        credits: ['Written & Produced by EKATRA']
      },
      {
        id: 'tr-102',
        title: '02. VOID CONVERSATIONS',
        duration: '03:52',
        synthFrequency: 146,
        bpm: 92,
        key: 'D Minor',
        lyrics: `Echoes in the server room, midnight thoughts\nCounting up the lessons that the quiet hours taught\nThey built machines to imitate the soul\nI built a ritual out of control.\n\n[CHORUS]\nWe talk to the void till the void speaks back\nDark matter rhythm on an 808 track\nNo ghost in the shell, just blood on the keys\nEKATRA in the dynamic frequencies.`,
        credits: ['Written & Produced by EKATRA', 'Co-produced by Vektor']
      },
      {
        id: 'tr-103',
        title: '03. METROPOLIS GHOSTS',
        duration: '04:15',
        synthFrequency: 164,
        bpm: 96,
        key: 'F Minor',
        lyrics: `Neon reflection on asphalt rain\nConcrete jungle with an electric brain\nWe spit fire in the alleyways\nLost in the digital maze.`,
        credits: ['Written & Produced by EKATRA']
      },
      {
        id: 'tr-104',
        title: '04. SILICON & SOUL',
        duration: '03:30',
        synthFrequency: 130,
        bpm: 90,
        key: 'G Minor',
        lyrics: `Breathe in the frequency, let the tape roll\nBalancing the silicon against the raw soul\nNot a portfolio, an archive of the flame\nEKATRA carved forever in the signal frame.`,
        credits: ['Written & Produced by EKATRA']
      }
    ],
    credits: {
      production: ['EKATRA', 'Vektor'],
      mixing: ['EKATRA'],
      mastering: ['Abbey Road Analog Lab'],
      artwork: 'EKATRA Generative Lab'
    },
    streamingLinks: {
      spotify: 'https://spotify.com',
      bandcamp: 'https://bandcamp.com',
      soundcloud: 'https://soundcloud.com'
    },
    equipmentUsed: ['Ableton Live 12', 'Moog Subsequent 37', 'Elektron Digitakt', 'Neumann U87', 'Custom WebGL Audio Shaders'],
    featured: true
  },
  {
    id: 'rel-02',
    slug: 'analog-diaries',
    title: 'ANALOG DIARIES',
    type: 'EP',
    releaseDate: '2025-05-02',
    catalogNumber: 'EKT-002',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
    description: 'Raw, unpolished 4-track cassette recordings combining lo-fi hip-hop boom bap with stream-of-consciousness rap poetry.',
    tracks: [
      {
        id: 'tr-201',
        title: '01. MIDNIGHT IN GURGAON',
        duration: '02:58',
        synthFrequency: 98,
        bpm: 84,
        key: 'C Minor'
      },
      {
        id: 'tr-202',
        title: '02. TAPE HEAD BLEED',
        duration: '03:12',
        synthFrequency: 123,
        bpm: 86,
        key: 'E Minor'
      },
      {
        id: 'tr-203',
        title: '03. UNFINISHED SENTENCE',
        duration: '03:40',
        synthFrequency: 138,
        bpm: 88,
        key: 'A Minor'
      }
    ],
    credits: {
      production: ['EKATRA'],
      mixing: ['EKATRA'],
      mastering: ['EKATRA Studio Tape Master'],
      artwork: '35mm Film scan by EKATRA'
    },
    streamingLinks: {
      bandcamp: 'https://bandcamp.com',
      youtube: 'https://youtube.com'
    },
    equipmentUsed: ['Tascam Portastudio 424', 'Roland SP-404MKII', 'Custom Cassette Loops'],
    featured: true
  },
  {
    id: 'rel-03',
    slug: 'circuit-poetry',
    title: 'CIRCUIT POETRY',
    type: 'Single',
    releaseDate: '2024-12-19',
    catalogNumber: 'EKT-003',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000',
    description: 'An experimental single merging oral hip-hop cadences with real-time algorithmic audio processing.',
    tracks: [
      {
        id: 'tr-301',
        title: 'CIRCUIT POETRY (FEAT. ALGORITHM)',
        duration: '03:44',
        synthFrequency: 174,
        bpm: 120,
        key: 'F# Minor'
      }
    ],
    credits: {
      production: ['EKATRA'],
      mixing: ['EKATRA'],
      mastering: ['EKATRA'],
      artwork: 'EKATRA'
    },
    streamingLinks: {
      spotify: 'https://spotify.com',
      appleMusic: 'https://apple.com'
    },
    equipmentUsed: ['Max/MSP', 'Ableton Push 3', 'Buchla Modular'],
    featured: false
  }
];
