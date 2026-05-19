import { BASE_ADDITION, BASE_COST, INITIAL_THRESHOLD, LAYER_COUNT } from './config';

export const gs = $state({
  astral: 10,
  layerCounts: Array.from({ length: LAYER_COUNT }, () => 0),
  layerCosts: [...BASE_COST],
  layerProgress: Array.from({ length: LAYER_COUNT }, () => 0),
  layerThresholds: [...INITIAL_THRESHOLD],
  layerTriggerCounts: Array.from({ length: LAYER_COUNT }, () => 0),
  lastTick: Date.now(),
});

// Functions reading $state are reactive when called inside $derived or other reactive contexts.
// Retroactively reflects upper-layer bonuses: bonusFromAbove[i] recomputes from all trigger counts,
// so a Layer n+2 trigger instantly updates bonusFromAbove[n] through the chain.
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
