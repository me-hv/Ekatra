export interface WritingPiece {
  id: string;
  slug: string;
  title: string;
  category: 'Rap Lyrics' | 'Poetry' | 'Essays' | 'Notebook' | 'Fragments';
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  archiveNumber: string;
  annotations?: { text: string; line: number }[];
  featured?: boolean;
}

export const WRITING_PIECES: WritingPiece[] = [
  {
    id: 'wr-01',
    slug: 'the-architecture-of-unseen-signals',
    title: 'THE ARCHITECTURE OF UNSEEN SIGNALS',
    category: 'Essays',
    date: '2026-02-10',
    readTime: '6 MIN READ',
    archiveNumber: 'TXT-2026-001',
    excerpt: 'Why making art as a creative technologist means refusing the polished veneer of consumer software in favor of raw signal archives.',
    content: `I don't make music to get added to algorithmic playlists designed for passive background noise. I make music to carve out a permanent artifact in a digital universe that forgets everything every 48 hours.

When I write lyrics, I'm calculating cadence the same way I structure code—every syllable has a weight, every pause is a buffer overflow, every rhyme scheme is an optimization loop.

We live in an age where artists are asked to behave like content managers. Publish daily. Follow trends. Fit inside 15-second vertical video containers. But real underground culture has never existed inside corporate UI grids. It exists in dusty attics, underground basements, unlisted FTP servers, tape swaps, and raw personal archives.

This website is not a portfolio. It is an archive of who I am becoming.`,
    annotations: [
      { line: 3, text: 'Written in my studio notebook during the monsoon storm in Gurgaon.' }
    ],
    featured: true
  },
  {
    id: 'wr-02',
    slug: 'dust-and-freq-cadence-04',
    title: 'DUST & FREQ: CADENCE 04',
    category: 'Rap Lyrics',
    date: '2025-11-28',
    readTime: '3 MIN READ',
    archiveNumber: 'TXT-2025-089',
    excerpt: 'Verse manuscript from unreleased project "TERRAIN". Dissecting urban decay and computational rhythm.',
    content: `[VERSE 1]
Static on the wire, frequency high
Walking under shadows of a zinc-gray sky
Microphone calibrated, breath on the mesh
Trading code for soul, turning spirit into flesh
No ghost in the machine, just blood on the keys
Spitting 16 bars over sub-bass frequencies.

[HOOK]
They wanted easy answers, I gave 'em complex math
They wanted simple stories, I walked the narrow path
From Gurgaon to the grid, from the tape to the screen
EKATRA in the realm of the unseen.

[VERSE 2]
Overclocked mind in a low-power world
Watch the analog tape as the memories uncurl
Every beat is an anchor, every line is a sign
That the rhythm in my chest isn't owned by design.`,
    annotations: [
      { line: 2, text: 'Metaphor for high-tension power lines near old industrial complexes.' }
    ],
    featured: true
  },
  {
    id: 'wr-03',
    slug: 'notes-on-algorithmic-rebellion',
    title: 'NOTES ON ALGORITHMIC REBELLION',
    category: 'Notebook',
    date: '2025-08-14',
    readTime: '4 MIN READ',
    archiveNumber: 'TXT-2025-042',
    excerpt: 'Fragmented thoughts from my personal creative notebook regarding creative autonomy, modular synths, and hip-hop.',
    content: `1. Hip-hop is the original creative technology. DJs sampled broken turntables, producers pushed Akai MPCs beyond intended manufacturer specs. We hack systems to create rhythm.

2. A modular synth is non-deterministic. You patch cables, set control voltages, and listen to the machine negotiate with electricity. Rap works the same way—you set strict cadence rules, then let human breath break them.

3. Reject the polished perfection of modern AI generation. AI gives you the average of everything already created. True art lives in the error: the tape hiss, the off-beat snare, the voice cracking under raw emotion.`,
    featured: false
  },
  {
    id: 'wr-04',
    slug: 'nocturne-for-a-broken-synthesizer',
    title: 'NOCTURNE FOR A BROKEN SYNTHESIZER',
    category: 'Poetry',
    date: '2025-04-19',
    readTime: '2 MIN READ',
    archiveNumber: 'TXT-2025-015',
    excerpt: 'Short poetic piece written after a 14-hour studio recording session.',
    content: `The oscillator hums at 60 Hertz,
A hum that sounds like memory.
The wires hang like weeping willow branches over copper plates.
We press the key—
Not for the sound it makes,
But for the silence it interrupts.`,
    featured: false
  }
];
