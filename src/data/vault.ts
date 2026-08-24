export interface VaultItem {
  id: string;
  title: string;
  type: 'Demo' | 'Beat Sketch' | 'Voice Note' | 'Unfinished Lyric' | 'Code Fragment' | 'Abandoned Idea';
  dateCreated: string;
  vaultCode: string;
  status: 'Raw Fragment' | 'Abandoned' | 'In Progress' | 'Archived';
  description: string;
  audioFrequency?: number;
  snippetText?: string;
  tags: string[];
}

export const VAULT_ITEMS: VaultItem[] = [
  {
    id: 'vlt-01',
    title: 'DEMO_42Hz_SUB_BAP_SKETCH.wav',
    type: 'Beat Sketch',
    dateCreated: '2026-02-01',
    vaultCode: 'VLT-8812',
    status: 'In Progress',
    description: 'Raw MPC drum loop recorded through a distorted preamp. Heavy sub bass swing at 87 BPM.',
    audioFrequency: 94,
    tags: ['MPC 2000XL', 'Boom Bap', 'Sub Bass', 'Distortion']
  },
  {
    id: 'vlt-02',
    title: 'VOICE_MEMO_BUS_STOP_LYRICS.m4a',
    type: 'Voice Note',
    dateCreated: '2026-01-14',
    vaultCode: 'VLT-7401',
    status: 'Raw Fragment',
    description: 'Muffled humming and rhyme cadence recorded on phone mic while waiting for the night bus in rain.',
    snippetText: '"The traffic sounds like white noise filters... rhythm in the windshield wipers..."',
    audioFrequency: 140,
    tags: ['Cadence', 'Raw Voice', 'Night Thoughts']
  },
  {
    id: 'vlt-03',
    title: 'UNRELEASED_TRACK_PARALLEL_REALITIES.mp3',
    type: 'Demo',
    dateCreated: '2025-11-09',
    vaultCode: 'VLT-6390',
    status: 'Archived',
    description: 'Unfinished 2nd verse collaboration attempt. Mixed down to cassette, missing final vocal hook.',
    audioFrequency: 160,
    tags: ['Cassette Master', 'Unreleased Rap', 'Feature']
  },
  {
    id: 'vlt-04',
    title: 'DSP_POLYRHYTHM_GENERATOR.rs',
    type: 'Code Fragment',
    dateCreated: '2025-10-30',
    vaultCode: 'VLT-5120',
    status: 'Raw Fragment',
    description: 'Rust audio DSP experiment calculating Euclidean rhythm distributions for web-synthesizers.',
    snippetText: `fn euclidean_rhythm(steps: u32, pulses: u32) -> Vec<bool> {
    let mut pattern = vec![false; steps as usize];
    // Polyrhythmic distribution formula for 808 hi-hat placement
    pattern
}`,
    tags: ['Rust', 'Audio DSP', 'Euclidean Rhythms', 'Code']
  },
  {
    id: 'vlt-05',
    title: 'ABANDONED_ALBUM_CONCEPT_TERRAIN.txt',
    type: 'Abandoned Idea',
    dateCreated: '2025-06-20',
    vaultCode: 'VLT-4091',
    status: 'Abandoned',
    description: 'Outline for a 14-track conceptual album exploring geographical satellite data translated into musical keys.',
    snippetText: 'Track 01: Elevation 216m (Key of D Minor)\nTrack 02: Latitude 28.4595 (Granular Synthesis)',
    tags: ['Album Concept', 'Geography', 'Data Art']
  }
];
