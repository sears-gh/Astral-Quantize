import { BASE_COST, INITIAL_THRESHOLD, LAYER_COUNT } from './config';

export const gs = $state({
  astral: 0,
  astralMult: 1,
  // bonusFromAbove[i] = multiplier on layer[i]'s trigger addition, starts at 1
  // provided by layer[i+1] triggers; indices 0..8 (9 entries)
  bonusFromAbove: Array.from({ length: LAYER_COUNT - 1 }, () => 1),
  layerCounts: Array.from({ length: LAYER_COUNT }, () => 0),
  layerCosts: [...BASE_COST],
  // Astral accumulated since last trigger for each layer
  layerProgress: Array.from({ length: LAYER_COUNT }, () => 0),
  layerThresholds: [...INITIAL_THRESHOLD],
  layerTriggerCounts: Array.from({ length: LAYER_COUNT }, () => 0),
  lastTick: Date.now(),
});
