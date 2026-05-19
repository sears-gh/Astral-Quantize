import {
  ASTRAL_RATE, CLICK_ASTRAL,
  LAYER_COUNT, LAYER_PROD_RATE, THRESHOLD_MULT,
} from './config';
import { gs, getAstralMult, currentCost } from './state.svelte';

export function tick(): void {
  const now = Date.now();
  const dt = Math.min((now - gs.lastTick) / 1000, 0.1);
  gs.lastTick = now;

  // Higher layers generate lower layer units (top-down, start-of-tick values)
  const deltas = new Array<number>(LAYER_COUNT).fill(0);
  for (let i = LAYER_COUNT - 1; i >= 1; i--) {
    deltas[i - 1] += gs.layerCounts[i] * LAYER_PROD_RATE * dt;
  }
  for (let i = 0; i < LAYER_COUNT; i++) {
    gs.layerCounts[i] += deltas[i];
  }

  const astralGained = gs.layerCounts[0] * ASTRAL_RATE * getAstralMult() * dt;
  gs.astral += astralGained;

  applyProgress(astralGained);
}

function applyProgress(amount: number): void {
  for (let i = 0; i < LAYER_COUNT; i++) {
    gs.layerProgress[i] += amount;
    while (gs.layerProgress[i] >= gs.layerThresholds[i]) {
      gs.layerProgress[i] -= gs.layerThresholds[i];
      gs.layerThresholds[i] *= THRESHOLD_MULT;
      gs.layerTriggerCounts[i]++;
    }
  }
}

export function buyLayer(i: number): void {
  const cost = currentCost(i);
  if (gs.astral < cost) return;
  gs.astral -= cost;
  gs.layerCounts[i] += 1;
  gs.layerPurchased[i] += 1;

  // Every 10 purchases: halve the current bonus threshold for this layer
  if (gs.layerPurchased[i] % 10 === 0) {
    gs.layerThresholds[i] /= 2;
  }
}

export function clickAstral(): void {
  gs.astral += CLICK_ASTRAL;
  applyProgress(CLICK_ASTRAL);
}

export function astralPerSec(): number {
  return gs.layerCounts[0] * ASTRAL_RATE * getAstralMult();
}
