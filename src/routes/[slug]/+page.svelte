<script>
  import { goto, afterNavigate } from '$app/navigation';
  import { base } from '$app/paths';
  import { next, prev, flat } from '$lib/outline.js';
  import { createPager } from 'sveltekitbook/gestures';
  import { md } from 'sveltekitbook/md';
  import Giscus from 'sveltekitbook/Giscus.svelte';
  import Timeline from '$lib/Timeline.svelte';
  import { TITLE, GISCUS } from '$lib/config.js';
  import { GLOSSARY } from '$lib/glossary.js';
  import { track, pickTrack, TRACK_LABEL, TRACK_FULL, TRACKS } from '$lib/track.svelte.js';

  // qr is { [track]: { url, svg } } from +page.js — only available client-side
  // after hydration, but the SVG markup is part of the prerendered HTML.

  let { data } = $props();
  let section = $derived(data.section);
  let activeTrack = $derived(track.current);
  let resolvedGesture = $derived(pickTrack(section.gesture, activeTrack));
  let resolvedBody = $derived(pickTrack(section.body, activeTrack));
  let nextSection = $derived(next(section.num));
  let prevSection = $derived(prev(section.num));
  let position = $derived(section.orderIndex + 1);
  let total = flat.length;

  let dragOffset = $state(0);
  let dragging = $derived(dragOffset !== 0);
  let bodyEl = $state();

  afterNavigate(() => { bodyEl?.scrollTo({ top: 0, behavior: 'instant' }); });

  const pager = createPager({
    onNext: () => { if (nextSection) goto(base + '/' + nextSection.num); },
    onPrev: () => {
      if (prevSection) goto(base + '/' + prevSection.num);
      else goto(base + '/');
    },
    setOffset: (v) => { dragOffset = v; }
  });

  function key(e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); if (nextSection) goto(base + '/' + nextSection.num); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); if (prevSection) goto(base + '/' + prevSection.num); else goto(base + '/'); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); bodyEl?.scrollBy({ top: 180, behavior: 'smooth' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); bodyEl?.scrollBy({ top: -180, behavior: 'smooth' }); }
    else if (e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); bodyEl?.scrollBy({ top: bodyEl.clientHeight * 0.85, behavior: 'smooth' }); }
    else if (e.key === 'PageUp') { e.preventDefault(); bodyEl?.scrollBy({ top: -bodyEl.clientHeight * 0.85, behavior: 'smooth' }); }
    else if (e.key === 'Escape') { goto(base + '/'); }
  }

  let hintProgress = $derived(Math.min(1, Math.abs(dragOffset) / 70));
  let mdOpts = $derived({ glossary: GLOSSARY, glossaryBase: base + '/glossary' });
</script>

<svelte:window onkeydown={key} />

<main
  class="page"
  class:dragging
  onwheel={pager.onWheel}
  ontouchstart={pager.onTouchStart}
  ontouchmove={pager.onTouchMove}
  ontouchend={pager.onTouchEnd}
  ontouchcancel={pager.onTouchCancel}
  style:transform="translateX({dragOffset}px)"
>
  <header class="top">
    <a class="mark vt-title" href="{base}/">{TITLE}</a>
    <nav class="top-nav" aria-label="Reader controls">
      <div class="track-segment" role="radiogroup" aria-label="Reader track">
        {#each TRACKS as t (t)}
          <button
            type="button"
            class="track-seg"
            class:active={activeTrack === t}
            role="radio"
            aria-checked={activeTrack === t}
            title={TRACK_FULL[t]}
            onclick={() => track.set(t)}
          >{TRACK_LABEL[t]}</button>
        {/each}
      </div>
      <a href="{base}/contents">Contents</a>
      <a href="{base}/glossary">Glossary</a>
    </nav>
  </header>

  <div class="body" bind:this={bodyEl}>
    <div class="meta vt-partlabel">
      <span class="year">{section.year}</span>
    </div>

    <div class="number">{section.num}</div>

    <h1 class="title">{section.title}</h1>

    {#if resolvedGesture}
      <p class="gesture">{@html md(resolvedGesture, mdOpts)}</p>
    {/if}

    {#if resolvedBody}
      <p class="body-text">{@html md(resolvedBody, mdOpts)}</p>
    {/if}

    {#if section.citation || section.link}
      <footer class="source">
        {#if section.citation}
          <span class="cite">{@html md(section.citation, mdOpts)}</span>
        {/if}
        {#if section.link}
          <a class="source-link" href={section.link} target="_blank" rel="noopener noreferrer">Source →</a>
        {/if}
      </footer>
    {/if}

    {#if section.eli5}
      <aside class="eli5">
        <div class="eli5-label">In plain terms</div>
        <p class="eli5-body">{@html md(section.eli5, mdOpts)}</p>
      </aside>
    {/if}

    {#if data.qr?.[activeTrack]}
      {@const active = data.qr[activeTrack]}
      <aside class="page-qr">
        <a class="page-qr-link" href={active.url} title={active.url}>
          <span class="page-qr-svg">{@html active.svg}</span>
          <span class="page-qr-meta">
            <span class="page-qr-label">Permalink · {TRACK_LABEL[activeTrack]}</span>
            <span class="page-qr-url">{active.url.replace(/^https?:\/\//, '')}</span>
            <span class="page-qr-hint">Scan or tap to share this view in this track</span>
          </span>
        </a>
      </aside>
    {/if}

    <Giscus term={section.num} mode="light" {...GISCUS} />
  </div>

  <footer class="bottom">
    <Timeline currentNum={section.num} />

    <div class="nav">
      {#if prevSection}
        <a href="{base}/{prevSection.num}" class="nav-link">
          <span class="arrow">←</span>
          <span class="nav-meta">
            <span class="nav-num">{prevSection.num} · {prevSection.year}</span>
            <span class="nav-title">{prevSection.title}</span>
          </span>
        </a>
      {:else}
        <a href="{base}/" class="nav-link">
          <span class="arrow">←</span>
          <span class="nav-meta"><span class="nav-num">Cover</span></span>
        </a>
      {/if}

      <div class="progress">
        <span>{position}</span><span class="divider">/</span><span>{total}</span>
      </div>

      {#if nextSection}
        <a href="{base}/{nextSection.num}" class="nav-link right">
          <span class="nav-meta">
            <span class="nav-num">{nextSection.num} · {nextSection.year}</span>
            <span class="nav-title">{nextSection.title}</span>
          </span>
          <span class="arrow">→</span>
        </a>
      {:else}
        <span class="nav-link right disabled">
          <span class="nav-meta"><span class="nav-num">End</span></span>
        </span>
      {/if}
    </div>

    <div class="drag-hint" style:opacity={hintProgress}>
      <span class="bar" style:transform="scaleX({hintProgress})"></span>
    </div>
  </footer>
</main>

<style>
  .page {
    height: 100vh; height: 100dvh;
    padding: 3vw 5vw;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 2vw;
    transition: transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
    touch-action: pan-y;
    will-change: transform;
    overflow: hidden;
  }
  .page.dragging { transition: none; }

  .top { display: flex; justify-content: space-between; align-items: center; font-family: var(--sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.24em; color: var(--muted); gap: 1rem; }
  .mark { font-family: var(--serif); font-style: italic; font-size: 1rem; letter-spacing: 0; text-transform: none; color: var(--ink); }
  .top-nav { display: flex; gap: 0.9rem; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
  .top-nav :global(a) { border-bottom: 1px solid transparent; transition: border-color 160ms ease, color 160ms ease; }
  .top-nav :global(a:hover) { color: var(--ink); border-bottom-color: var(--ink); }

  .track-segment { display: inline-flex; border: 1px solid var(--rule); background: rgba(20, 17, 13, 0.03); }
  .track-seg {
    font-family: var(--sans);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--muted);
    background: transparent;
    border: none;
    padding: 0.4rem 0.7rem;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;
    border-right: 1px solid var(--rule);
  }
  .track-seg:last-child { border-right: none; }
  .track-seg:hover { color: var(--ink); background: rgba(20, 17, 13, 0.05); }
  .track-seg.active { color: var(--bg); background: var(--ink); font-weight: 600; }

  .body {
    display: grid;
    grid-template-columns: minmax(180px, 1fr) 3fr;
    gap: 4vw;
    align-items: start;
    padding: 2vw 0;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .meta {
    font-family: var(--sans);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.24em;
    color: var(--muted);
    border-top: 1px solid var(--rule);
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .year {
    font-family: var(--serif);
    font-style: italic;
    font-weight: 300;
    font-size: 1.6rem;
    text-transform: none;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-top: 0.3rem;
  }

  .number {
    grid-column: 1;
    font-family: var(--serif);
    font-weight: 200;
    font-size: clamp(4rem, 9vw, 9rem);
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: var(--muted);
    font-variant-numeric: lining-nums tabular-nums;
    margin-top: 0.5rem;
  }

  .title {
    grid-column: 2;
    font-family: var(--serif);
    font-weight: 300;
    font-style: italic;
    font-size: clamp(2.4rem, 6vw, 6rem);
    line-height: 0.97;
    letter-spacing: -0.025em;
    color: var(--ink);
    max-width: 18ch;
  }

  .gesture {
    grid-column: 2;
    font-family: var(--serif);
    font-weight: 300;
    font-size: clamp(1.1rem, 1.5vw, 1.4rem);
    line-height: 1.4;
    color: var(--ink);
    max-width: 44ch;
    margin-top: 1.6rem;
    border-left: 2px solid var(--accent);
    padding-left: 1.3rem;
  }

  .body-text {
    grid-column: 2;
    font-family: var(--serif);
    font-weight: 300;
    font-size: clamp(0.95rem, 1.05vw, 1.05rem);
    line-height: 1.55;
    color: var(--ink);
    max-width: 56ch;
    margin-top: 1.2rem;
    padding-left: 1.3rem;
  }

  .source {
    grid-column: 2;
    margin-top: 1.4rem;
    padding: 0.8rem 0 0 1.3rem;
    border-top: 1px dotted var(--rule);
    max-width: 56ch;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .cite { font-family: var(--serif); font-style: italic; font-size: 0.82rem; color: var(--muted); line-height: 1.4; }

  .source-link {
    font-family: var(--sans);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: var(--accent);
    border-bottom: 1px solid transparent;
    white-space: nowrap;
    transition: border-color 180ms ease;
  }
  .source-link:hover { border-color: var(--accent); }

  .eli5 {
    grid-column: 2;
    margin-top: 2rem;
    max-width: 56ch;
    padding: 1.2rem 1.3rem;
    border-left: 2px solid var(--accent);
    background: rgba(20, 17, 13, 0.04);
  }
  .eli5-label {
    font-family: var(--sans);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--accent);
    margin-bottom: 0.6rem;
  }
  .eli5-body { font-family: var(--serif); font-weight: 300; font-size: clamp(0.95rem, 1.05vw, 1.05rem); line-height: 1.55; color: var(--ink); }

  .page-qr { grid-column: 2; margin-top: 1.6rem; max-width: 56ch; }
  .page-qr-link {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.1rem;
    align-items: center;
    padding: 0.9rem 1rem;
    border: 1px solid var(--rule);
    background: rgba(20, 17, 13, 0.02);
    color: var(--ink);
    transition: border-color 180ms ease, background 180ms ease;
  }
  .page-qr-link:hover { border-color: var(--accent); background: rgba(20, 17, 13, 0.04); }
  .page-qr-svg :global(svg) { display: block; width: 84px; height: 84px; }
  .page-qr-meta { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
  .page-qr-label {
    font-family: var(--sans);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--accent);
  }
  .page-qr-url {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.78rem;
    color: var(--ink);
    overflow-wrap: anywhere;
    word-break: break-all;
  }
  .page-qr-hint {
    font-family: var(--sans);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: var(--muted);
  }

  .bottom { font-family: var(--sans); }

  .nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;
    border-top: 1px solid var(--rule);
    padding-top: 1.2rem;
    margin-top: 1rem;
  }

  .nav-link { display: flex; align-items: center; gap: 1rem; color: var(--muted); transition: color 180ms ease; }
  .nav-link:hover { color: var(--ink); }
  .nav-link.disabled { opacity: 0.35; }
  .nav-link.right { justify-self: end; text-align: right; }

  .arrow { font-family: var(--serif); font-size: 1.4rem; }
  .nav-meta { display: flex; flex-direction: column; gap: 0.15rem; }
  .nav-num { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.24em; }
  .nav-title { font-family: var(--serif); font-style: italic; font-size: 0.95rem; color: var(--ink); }

  .progress { font-size: 0.72rem; letter-spacing: 0.24em; color: var(--muted); display: flex; gap: 0.4rem; align-items: baseline; }
  .progress .divider { color: var(--rule); }

  .drag-hint { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; pointer-events: none; transition: opacity 140ms ease; }
  .drag-hint .bar { display: block; height: 100%; background: var(--accent); transform-origin: center; transition: transform 80ms linear; }

  @media (max-width: 720px) {
    .body { grid-template-columns: 1fr; gap: 2.5vw; padding: 1.5vw 0; }
    .number, .title, .gesture, .body-text, .source, .eli5, .page-qr { grid-column: 1; max-width: none; }
    .title, .gesture, .body-text, .cite, .eli5-body { overflow-wrap: break-word; word-break: break-word; hyphens: auto; }
    .number { font-size: clamp(3rem, 12vw, 5rem); margin-top: 0.2rem; }
    .title { font-size: clamp(1.9rem, 7vw, 3rem); }
    .gesture { font-size: clamp(1rem, 3.8vw, 1.2rem); padding-left: 0.9rem; }
    .body-text { padding-left: 0.9rem; }
    .source { padding-left: 0.9rem; }
    .nav { gap: 0.8rem; }
  }
</style>
