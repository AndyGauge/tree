// Reader-track preference for the tree research book. Two tracks:
//   mba — readers thinking about decisions, payoffs, capital allocation
//   cs  — readers thinking about data structures, algorithms, storage
// Persisted in localStorage. ELI5 is rendered separately and always.

import { browser } from '$app/environment';

const KEY = 'tree-track';
const DEFAULT = 'mba';
export const TRACKS = ['mba', 'cs'];
const VALID = new Set(TRACKS);

// If the current track has no content for a field, try the other one before
// giving up. eli5 is the safety net the renderer always shows.
const FALLBACKS = {
  mba: ['cs'],
  cs: ['mba']
};

function read() {
  if (!browser) return DEFAULT;
  const v = localStorage.getItem(KEY);
  return VALID.has(v) ? v : DEFAULT;
}

let value = $state(read());

export const track = {
  get current() { return value; },
  set(next) {
    if (!VALID.has(next)) return;
    value = next;
    if (browser) localStorage.setItem(KEY, next);
  },
  cycle() {
    const i = TRACKS.indexOf(value);
    this.set(TRACKS[(i + 1) % TRACKS.length]);
  }
};

export function pickTrack(field, current) {
  if (field == null) return null;
  if (typeof field === 'string') return field;
  if (field[current] != null) return field[current];
  for (const fb of FALLBACKS[current] || []) {
    if (field[fb] != null) return field[fb];
  }
  for (const k of Object.keys(field)) {
    if (field[k] != null) return field[k];
  }
  return null;
}

export const TRACK_LABEL = {
  mba: 'MBA',
  cs:  'CS'
};

export const TRACK_FULL = {
  mba: 'For readers thinking in decisions, payoffs, capital',
  cs:  'For readers thinking in nodes, pointers, asymptotics'
};

export const TRACK_BLURB = {
  mba: 'Trees as decision diagrams. Each idea framed by what it does for the manager weighing options under uncertainty.',
  cs:  'Trees as data structures. Each idea framed by what it does for memory, search, and the cost of an operation.'
};
