<script lang="ts">
  import { onMount } from 'svelte';
  import { tick, astralPerSec } from './game/loop';
  import { gs, getAstralMult } from './game/state.svelte';
  import { fmt, fmtMult } from './game/format';
  import { LAYER_COUNT } from './game/config';
  import LayerCard from './components/LayerCard.svelte';

  onMount(() => {
    let rafId: number;
    function frame() {
      tick();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  });
</script>

<main>
  <header>
    <h1>✦ Astral Quantize</h1>
    <div class="resource-row">
      <div class="astral-display">
        <span class="astral-value">{fmt(gs.astral)}</span>
        <span class="astral-label">Astral</span>
      </div>
      <div class="rate-info">
        <span>{fmt(astralPerSec())}/s</span>
        <span class="mult">{fmtMult(getAstralMult())} multiplier</span>
      </div>
    </div>
  </header>

  <div class="layers">
    {#each Array(LAYER_COUNT) as _, i}
      <LayerCard index={i} />
    {/each}
  </div>
</main>

<style>
  main {
    max-width: 640px;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  header {
    background: #0a0a1e;
    border: 1px solid #1a1a3a;
    border-radius: 10px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  h1 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #9090ff;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .resource-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .astral-display {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .astral-value {
    font-size: 2rem;
    font-weight: 700;
    color: #e0e0ff;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 20px rgba(140, 140, 255, 0.5);
  }

  .astral-label {
    font-size: 0.75rem;
    color: #606090;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .rate-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    color: #8080b0;
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
  }

  .mult {
    color: #a0a0e0;
    font-size: 0.75rem;
  }

.layers {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
