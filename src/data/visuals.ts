export interface VisualItem {
  id: string;
  title: string;
  category: 'Photography' | 'Artwork' | 'Video Still' | 'Studio' | 'Tech Experiment';
  imageUrl: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  date: string;
  archiveCode: string;
  exif?: {
    camera?: string;
    lens?: string;
    location?: string;
    medium?: string;
  };
  description: string;
  featured?: boolean;
}

export const VISUAL_ITEMS: VisualItem[] = [
  {
    id: 'vis-01',
    title: 'ANALOG TAPE HEAD MATRIX',
    category: 'Studio',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'landscape',
    date: '2026-01-18',
    archiveCode: 'VIS-2026-004',
    exif: {
      camera: 'Leica M6',
      lens: '35mm Summicron',
      location: 'Studio Vault, Gurgaon',
      medium: '35mm Tri-X 400 Film'
    },
    description: 'Macro view of the Tascam 424 tape read head showing magnetic oxide build-up after 100 hours of recording.',
    featured: true
  },
  {
    id: 'vis-02',
    title: 'GENERATIVE FREQUENCY RESONANCE',
    category: 'Tech Experiment',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'portrait',
    date: '2025-12-04',
    archiveCode: 'VIS-2025-098',
    exif: {
      location: 'Custom WebGL Shader / TouchDesigner',
      medium: 'Generative Audio-Reactive Shader'
    },
    description: 'Visualizing sub-bass resonance at 42Hz captured live during NEURAL ARCHIVE recording session.',
    featured: true
  },
  {
    id: 'vis-03',
    title: 'METROPOLIS AT 03:00 AM',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'landscape',
    date: '2025-10-22',
    archiveCode: 'VIS-2025-072',
    exif: {
      camera: 'Fujifilm X-Pro3',
      lens: '23mm F1.4',
      location: 'Cyber City Flyover',
      medium: 'Digital Raw with Grain Offset'
    },
    description: 'Solitary reflections on wet asphalt during late night urban lyric walk.',
    featured: true
  },
  {
    id: 'vis-04',
    title: 'CIRCUIT BOARD ETCHING #09',
    category: 'Artwork',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'square',
    date: '2025-07-11',
    archiveCode: 'VIS-2025-041',
    exif: {
      medium: 'Copper PCB, Acid Etch, Silkscreen'
    },
    description: 'Custom PCB design etched for a standalone Eurorack beat sequencer built in-house.',
    featured: false
  },
  {
    id: 'vis-05',
    title: 'VIDEO STILL: VOID CONVERSATIONS',
    category: 'Video Still',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'wide',
    date: '2025-09-15',
    archiveCode: 'VIS-2025-064',
    exif: {
      camera: 'RED Komodo 6K',
      location: 'Abandoned Warehouse, Okhla',
      medium: '16mm Anamorphic Lens'
    },
    description: 'Frame extract from official music video for Void Conversations.',
    featured: true
  }
];
