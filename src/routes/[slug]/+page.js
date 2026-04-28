import { error } from '@sveltejs/kit';
import QRCode from 'qrcode';
import { flat } from '$lib/outline.js';
import { SITE_URL } from '$lib/config.js';
import { TRACKS } from '$lib/track.svelte.js';

export const prerender = true;

export function entries() {
  return flat.map((s) => ({ slug: s.num }));
}

async function makeQr(text) {
  return QRCode.toString(text, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 0,
    color: { dark: '#14110d', light: '#00000000' }
  });
}

export async function load({ params }) {
  const section = flat.find((s) => s.num === params.slug);
  if (!section) throw error(404, 'Not found');

  // One QR per track. Each encodes ${selfUrl}?track=<t> so a scanner lands
  // on the same page in the same track the sender was reading.
  const selfUrl = `${SITE_URL}/${section.num}`;
  const qr = {};
  for (const t of TRACKS) {
    const url = `${selfUrl}?track=${t}`;
    qr[t] = { url, svg: await makeQr(url) };
  }

  return { section, qr };
}
