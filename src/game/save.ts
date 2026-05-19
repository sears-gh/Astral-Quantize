import { gs } from './state.svelte';
import { INITIAL_THRESHOLD, LAYER_COUNT } from './config';

const SAVE_KEY = 'astral-quantize-v1';

export function saveGame(): void {
  const data = {
    astral: gs.astral,
    layerCounts: [...gs.layerCounts],
    layerPurchased: [...gs.layerPurchased],
    layerProgress: [...gs.layerProgress],
    layerThresholds: [...gs.layerThresholds],
    layerTriggerCounts: [...gs.layerTriggerCounts],
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (e.g. private browsing quota exceeded)
  }
}

export function loadGame(): void {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    if (typeof d.astral === 'number') gs.astral = d.astral;
    if (Array.isArray(d.layerCounts))        gs.layerCounts        = d.layerCounts;
    if (Array.isArray(d.layerPurchased))     gs.layerPurchased     = d.layerPurchased;
    if (Array.isArray(d.layerProgress))      gs.layerProgress      = d.layerProgress;
    if (Array.isArray(d.layerThresholds))    gs.layerThresholds    = d.layerThresholds;
    if (Array.isArray(d.layerTriggerCounts)) gs.layerTriggerCounts = d.layerTriggerCounts;
    gs.lastTick = Date.now();
  } catch {
    // Corrupted save — leave default state intact
  }
}

export function resetGame(): void {
  localStorage.removeItem(SAVE_KEY);
  gs.astral             = 10;
  gs.layerCounts        = Array.from({ length: LAYER_COUNT }, () => 0);
  gs.layerPurchased     = Array.from({ length: LAYER_COUNT }, () => 0);
  gs.layerProgress      = Array.from({ length: LAYER_COUNT }, () => 0);
  gs.layerThresholds    = [...INITIAL_THRESHOLD];
  gs.layerTriggerCounts = Array.from({ length: LAYER_COUNT }, () => 0);
  gs.lastTick           = Date.now();
}
