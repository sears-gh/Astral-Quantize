<script lang="ts">
  import { buyLayer } from '../game/loop';
  import { gs } from '../game/state.svelte';
  import { fmt, fmtMult } from '../game/format';
  import {
    BASE_ADDITION, LAYER_NAMES, LAYER_COLORS, LAYER_PROD_RATE, ASTRAL_RATE,
  } from '../game/config';

  let { index }: { index: number } = $props();

  const color = LAYER_COLORS[index];
  const name = LAYER_NAMES[index];

  const prodLabel = $derived(
    index === 0
      ? `${fmt(gs.layerCounts[0] * ASTRAL_RATE)} Astral/s`
      : `${fmt(gs.layerCounts[index] * LAYER_PROD_RATE)} ${LAYER_NAMES[index - 1]}/s`
  );

  const bonusLabel = $derived(
    index === 0
      ? fmtMult(gs.astralMult)
      : fmtMult(gs.bonusFromAbove[index - 1])
  );

  const bonusTarget = $derived(
    index === 0 ? 'Astral Mult' : `${LAYER_NAMES[index - 1]} Bonus`
  );

  const nextAdd = $derived(() => {
    const upper = index < 9 ? gs.bonusFromAbove[index] : 1;
    return BASE_ADDITION * upper;
  });

  const progress = $derived(
    Math.min(gs.layerProgress[index] / gs.layerThresholds[index], 1)
  );

  const canBuy = $derived(gs.astral >= gs.layerCosts[index]);
</script>

<div class="layer-card" style="--layer-color: {color}">
  <div class="layer-header">
    <span class="layer-num">Layer {index + 1}</span>
    <span class="layer-name">{name}</span>
    <span class="layer-count">{fmt(gs.layerCounts[index])}</span>
  </div>

  <div class="layer-stats">
    <div class="stat">
      <span class="stat-label">Production</span>
      <span class="stat-value">{prodLabel}</span>
    </div>
    <div class="stat">
      <span class="stat-label">{bonusTarget}</span>
      <span class="stat-value glow">{bonusLabel}</span>
    </div>
  </div>

  <div class="trigger-section">
    <div class="trigger-bar-wrap">
      <div class="trigger-bar" style="width: {progress * 100}%"></div>
    </div>
    <div class="trigger-info">
      <span>{fmt(gs.layerProgress[index])} / {fmt(gs.layerThresholds[index])} Astral</span>
      <span class="trigger-add">+{fmt(nextAdd())} per trigger</span>
    </div>
  </div>

  <button
    class="buy-btn"
    class:can-buy={canBuy}
    disabled={!canBuy}
    onclick={() => buyLayer(index)}
  >
    Buy 1 — {fmt(gs.layerCosts[index])} Astral
  </button>
</div>

<style>
  .layer-card {
    background: #0a0a1e;
    border: 1px solid color-mix(in srgb, var(--layer-color) 30%, transparent);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.2s;
  }

  .layer-card:hover {
    border-color: color-mix(in srgb, var(--layer-color) 60%, transparent);
  }

  .layer-header {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .layer-num {
    font-size: 0.7rem;
    color: color-mix(in srgb, var(--layer-color) 70%, #888);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .layer-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--layer-color);
    flex: 1;
  }

  .layer-count {
    font-size: 1.4rem;
    font-weight: 700;
    color: #e0e0ff;
    font-variant-numeric: tabular-nums;
  }

  .layer-stats {
    display: flex;
    gap: 16px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-label {
    font-size: 0.65rem;
    color: #606090;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .stat-value {
    font-size: 0.9rem;
    color: #c0c0e0;
    font-variant-numeric: tabular-nums;
  }

  .glow {
    color: color-mix(in srgb, var(--layer-color) 80%, white);
    text-shadow: 0 0 8px color-mix(in srgb, var(--layer-color) 60%, transparent);
  }

  .trigger-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .trigger-bar-wrap {
    height: 4px;
    background: #15152a;
    border-radius: 2px;
    overflow: hidden;
  }

  .trigger-bar {
    height: 100%;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--layer-color) 40%, transparent),
      var(--layer-color)
    );
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  .trigger-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
    color: #505080;
    font-variant-numeric: tabular-nums;
  }

  .trigger-add {
    color: color-mix(in srgb, var(--layer-color) 60%, #505080);
  }

  .buy-btn {
    background: #0d0d22;
    border: 1px solid #2a2a50;
    border-radius: 6px;
    color: #606090;
    padding: 8px 12px;
    font-size: 0.8rem;
    cursor: not-allowed;
    font-family: inherit;
    transition: all 0.15s;
  }

  .buy-btn.can-buy {
    border-color: color-mix(in srgb, var(--layer-color) 50%, transparent);
    color: var(--layer-color);
    cursor: pointer;
    background: color-mix(in srgb, var(--layer-color) 8%, #0d0d22);
  }

  .buy-btn.can-buy:hover {
    background: color-mix(in srgb, var(--layer-color) 16%, #0d0d22);
    box-shadow: 0 0 10px color-mix(in srgb, var(--layer-color) 30%, transparent);
  }
</style>
