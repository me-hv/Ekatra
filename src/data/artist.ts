export interface ArtistProfile {
  name: string;
  alias: string;
  roles: string[];
  manifesto: string[];
  bio: string;
  location: string;
  activeSince: string;
  socials: {
    spotify?: string;
    bandcamp?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
    email?: string;
  };
  gearStack: {
    category: string;
    items: string[];
  }[];
  influences: string[];
}

export const ARTIST_DATA: ArtistProfile = {
  name: 'EKATRA',
  alias: 'Ekatra / Ek-a-tra',
  roles: ['Rapper', 'Music Producer', 'Writer', 'Creative Technologist'],
  manifesto: [
    "This isn't a portfolio of things I've done. It's an archive of who I'm becoming.",
    "Rhythm is code. Rap is syntax. Sound is spatial engineering.",
    "Reject generic template containers. Build art with weight and intention.",
    "Not everything created must be polished to have value—the raw fragment holds the truest spark."
  ],
  bio: 'EKATRA is an independent rapper, sound architect, writer, and creative technologist merging raw underground hip-hop cadences with modular synthesis, generative audio code, and editorial literature. Operating outside the constraints of traditional music industry pipelines, EKATRA designs custom software, builds physical synthesizers, and writes stream-of-consciousness rap poetry reflecting the collision between human emotion and digital infrastructure.',
  location: 'Gurgaon / New Delhi',
  activeSince: '1997 — ∞',
  socials: {
    spotify: 'https://spotify.com',
    bandcamp: 'https://ekatra.bandcamp.com',
    github: 'https://github.com/me-hv',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    email: 'ekatra.archive@gmail.com'
  },
  gearStack: [
    {
      category: 'Audio Production & Synths',
      items: ['Ableton Live 12 Suite', 'Moog Subsequent 37', 'Elektron Digitakt & Digitone', 'Tascam Portastudio 424 (4-Track Tape)', 'Roland SP-404MKII', 'Neumann U87 Ai']
    },
    {
      category: 'Software & Creative Code',
      items: ['Max/MSP', 'TouchDesigner', 'WebGL / Web Audio API', 'TypeScript / Next.js', 'Rust (Audio DSP)', 'Python (Sonic Data Scraping)']
    },
    {
      category: 'Writing & Archiving',
      items: ['Physical Field Notebooks', 'Obsidian (Markdown Vault)', 'Leica M6 (35mm Film)', 'Tascam DR-40X (Field Recorder)']
    }
  ],
  influences: ['El-P / Run The Jewels', 'MF DOOM', 'Ka', 'Flying Lotus', 'Burial', 'Aphex Twin', 'William Gibson', 'Nietzsche', 'Indian Classical Rhythm Systems (Konnakol)']
};
