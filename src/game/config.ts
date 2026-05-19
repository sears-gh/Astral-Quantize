export const LAYER_COUNT = 10;

export const LAYER_NAMES = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon',
  'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
];

export const ASTRAL_RATE = 1;
export const LAYER_PROD_RATE = 0.1;

// Cost per unit for the first batch of 10.
// After every 10 purchases: cost *= 10^(layer index + 1)
export const BASE_COST = [
  1, 100, 5_000, 2e5, 1e7, 5e8, 2.5e10, 1.2e12, 6e13, 3e15,
];

export const BASE_ADDITION = 0.1;

// First bonus trigger threshold for each layer.
// Must be > BASE_COST so the bonus fires after you've already purchased the layer.
export const INITIAL_THRESHOLD = [
  20, 1_000, 50_000, 2e6, 1e8, 5e9, 2.5e11, 1.2e13, 6e14, 3e16,
];
export const THRESHOLD_MULT = 2;

export const CLICK_ASTRAL = 1;

export const LAYER_COLORS = [
  '#ffd700', '#a0c0ff', '#40ffcc', '#60ffaa',
  '#c0ff60', '#ffaa40', '#ff7070', '#ff50ff',
  '#aa60ff', '#50b0ff',
];
