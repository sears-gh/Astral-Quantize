export const LAYER_COUNT = 10;

export const LAYER_NAMES = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon',
  'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
];

export const ASTRAL_RATE = 1;
export const LAYER_PROD_RATE = 0.1;

export const BASE_COST = [
  10, 200, 3_000, 50_000, 8e5, 1.2e7, 1.8e8, 2.7e9, 4e10, 6e11,
];
export const COST_MULT = 1.15;

export const BASE_ADDITION = 0.1;

// Each threshold is ~5× the layer's base cost, so bonuses trigger after you can already buy the layer
export const INITIAL_THRESHOLD = [
  50, 1_000, 15_000, 250_000, 4e6, 6e7, 9e8, 1.35e10, 2e11, 3e12,
];
export const THRESHOLD_MULT = 2;

export const CLICK_ASTRAL = 1;

export const LAYER_COLORS = [
  '#ffd700', '#a0c0ff', '#40ffcc', '#60ffaa',
  '#c0ff60', '#ffaa40', '#ff7070', '#ff50ff',
  '#aa60ff', '#50b0ff',
];
