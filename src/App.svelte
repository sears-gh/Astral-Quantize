<script lang="ts">
  import { onMount } from 'svelte';
  import { tick, astralPerSec } from './game/loop';
  import { gs, getAstralMult } from './game/state.svelte';
  import { fmt, fmtMult } from './game/format';
  import { LAYER_COUNT } from './game/config';
  import { saveGame, loadGame, resetGame } from './game/save';
  import LayerCard from './components/LayerCard.svelte';

  loadGame();

  let confirmingReset = $state(false);

  function handleReset() {
    if (!confirmingReset) {
      confirmingReset = true;
      return;
    }
    resetGame();
    confirmingReset = false;
  }

  onMount(() => {
    let rafId: number;
    function frame() {
      tick();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    const saveInterval = setInterval(saveGame, 10_000);
    window.addEventListener('beforeunload', saveGame);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(saveInterval);
      window.removeEventListener('beforeunload', saveGame);
    };
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
      <div class="reset-wrap">
        {#if confirmingReset}
          <span class="reset-confirm-label">本当にリセットしますか？</span>
          <button class="reset-btn confirm" onclick={handleReset}>はい</button>
          <button class="reset-btn cancel" onclick={() => confirmingReset = false}>いいえ</button>
        {:else}
          <button class="reset-btn" onclick={handleReset}>リセット</button>
        {/if}
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

  .reset-wrap {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .reset-confirm-label {
    font-size: 0.75rem;
    color: #ff8080;
  }

  .reset-btn {
    background: transparent;
    border: 1px solid #3a2a2a;
    border-radius: 6px;
    color: #806060;
    padding: 6px 12px;
    font-size: 0.75rem;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
  }

  .reset-btn:hover {
    border-color: #804040;
    color: #ff8080;
  }

  .reset-btn.confirm {
    border-color: #804040;
    color: #ff6060;
  }

  .reset-btn.confirm:hover {
    background: rgba(200, 50, 50, 0.15);
  }

  .reset-btn.cancel {
    border-color: #2a3a2a;
    color: #608060;
  }

  .reset-btn.cancel:hover {
    border-color: #408040;
    color: #80c080;
  }
</style>
