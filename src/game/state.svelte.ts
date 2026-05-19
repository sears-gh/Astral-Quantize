import { BASE_ADDITION, BASE_COST, INITIAL_THRESHOLD, LAYER_COUNT } from './config';

export const gs = $state({
  astral: 10,
  layerCounts: Array.from({ length: LAYER_COUNT }, () => 0),
  // Integer count of manually purchased units (excludes auto-generated fractions)
  layerPurchased: Array.from({ length: LAYER_COUNT }, () => 0),
  layerProgress: Array.from({ length: LAYER_COUNT }, () => 0),
  layerThresholds: [...INITIAL_THRESHOLD],
  layerTriggerCounts: Array.from({ length: LAYER_COUNT }, () => 0),
  lastTick: Date.now(),
});

// Cost for the next unit of layer i.
// Price is fixed within each batch of 10; after every 10 purchases: ×10^(i+1)
export function currentCost(i: number): number {
  const batch = Math.floor(gs.layerPurchased[i] / 10);
  return BASE_COST[i] * Math.pow(10, (i + 1) * batch);
}

// Functions reading $state are reactive when called inside $derived or other reactive contexts.
// Retroactively reflects upper-layer bonuses: bonusFromAbove[i] recomputes from all trigger counts,
// so a Layer n+2 trigger instantly updates bonusFromAbove[n] through the full chain.
export function getBonusFromAbove(): number[] {
  const bfa = new Array<number>(LAYER_COUNT - 1).fill(1);
  bfa[8] = 1 + gs.layerTriggerCounts[9] * BASE_ADDITION;
  for (let i = 7; i >= 0; i--) {
    bfa[i] = 1 + gs.layerTriggerCounts[i + 1] * BASE_ADDITION * bfa[i + 1];
  }
  return bfa;
}

export function getAstralMult(): number {
  const bfa = getBonusFromAbove();
  return 1 + gs.layerTriggerCounts[0] * BASE_ADDITION * bfa[0];
}
