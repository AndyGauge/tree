<script>
  import { onNavigate } from '$app/navigation';
  import { track, TRACKS } from '$lib/track.svelte.js';
  import '../app.css';

  let { children } = $props();

  // Reflect the active track on <html data-track="..."> for any CSS hooks.
  $effect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.track = track.current;
  });

  // Honour ?track=<t> from a shared link. Apply once on mount, then strip
  // the param so it doesn't follow the user around.
  $effect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    const t = url.searchParams.get('track');
    if (t && TRACKS.includes(t)) {
      track.set(t);
      url.searchParams.delete('track');
      window.history.replaceState({}, '', url.toString());
    }
  });

  onNavigate((navigation) => {
    if (typeof document === 'undefined' || !document.startViewTransition) return;

    const fromIdx = orderFromUrl(navigation.from?.url?.pathname);
    const toIdx = orderFromUrl(navigation.to?.url?.pathname);
    const back = fromIdx !== null && toIdx !== null && toIdx < fromIdx;
    document.documentElement.dataset.direction = back ? 'back' : 'forward';

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  function orderFromUrl(path) {
    if (!path) return null;
    if (path === '/' || path === '') return -1;
    const m = path.match(/\/(\d{2,})/);
    return m ? parseInt(m[1], 10) : null;
  }
</script>

{@render children()}
