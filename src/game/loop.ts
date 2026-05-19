import {
  ASTRAL_RATE, BASE_ADDITION, BASE_COST, CLICK_ASTRAL,
  COST_MULT, LAYER_COUNT, LAYER_PROD_RATE, THRESHOLD_MULT,
} from './config';
import { gs } from './state.svelte';

export function tick(): void {
  const now = Date.now();
  const dt = Math.min((now - gs.lastTick) / 1000, 0.1);
  gs.lastTick = now;

  // Higher layers generate lower layer units (process top-down using start-of-tick values)
  const deltas = new Array<number>(LAYER_COUNT).fill(0);
  for (let i = LAYER_COUNT - 1; i >= 1; i--) {
    deltas[i - 1] += gs.layerCounts[i] * LAYER_PROD_RATE * dt;
  }
  for (let i = 0; i < LAYER_COUNT; i++) {
    gs.layerCounts[i] += deltas[i];
  }

  // Layer 1 generates Astral
  const astralGained = gs.layerCounts[0] * ASTRAL_RATE * gs.astralMult * dt;
  gs.astral += astralGained;

  // Advance trigger progress for each layer by the raw base generation
  // (use the same astralGained for all layers — each layer watches total Astral income)
  for (let i = 0; i < LAYER_COUNT; i++) {
    gs.layerProgress[i] += astralGained;

    while (gs.layerProgress[i] >= gs.layerThresholds[i]) {
      gs.layerProgress[i] -= gs.layerThresholds[i];
      gs.layerThresholds[i] *= THRESHOLD_MULT;
      gs.layerTriggerCounts[i]++;

      // Compute effective addition (multiplied by bonus from the layer above)
      const upperBonus = i < LAYER_COUNT - 1 ? gs.bonusFromAbove[i] : 1;
      const effectiveAdd = BASE_ADDITION * upperBonus;

      if (i === 0) {
        gs.astralMult += effectiveAdd;
      } else {
        gs.bonusFromAbove[i - 1] += effectiveAdd;
      }
    }
  }
}

export function buyLayer(i: number): void {
  const cost = gs.layerCosts[i];
  if (gs.astral < cost) return;
  gs.astral -= cost;
  gs.layerCounts[i] += 1;
  gs.layerCosts[i] *= COST_MULT;
}

export function clickAstral(): void {
  gs.astral += CLICK_ASTRAL;
  gs.layerProgress.forEach((_, i) => {
    gs.layerProgress[i] += CLICK_ASTRAL;
    while (gs.layerProgress[i] >= gs.layerThresholds[i]) {
      gs.layerProgress[i] -= gs.layerThresholds[i];
      gs.layerThresholds[i] *= THRESHOLD_MULT;
      gs.layerTriggerCounts[i]++;
      const upperBonus = i < LAYER_COUNT - 1 ? gs.bonusFromAbove[i] : 1;
      const effectiveAdd = BASE_ADDITION * upperBonus;
      if (i === 0) {
        gs.astralMult += effectiveAdd;
      } else {
        gs.bonusFromAbove[i - 1] += effectiveAdd;
      }
    }
  });
}

export function astralPerSec(): number {
  return gs.layerCounts[0] * ASTRAL_RATE * gs.astralMult;
}
