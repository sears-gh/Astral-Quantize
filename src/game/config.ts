export const LAYER_COUNT = 8;

export const LAYER_NAMES = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
];

export const ASTRAL_RATE = 1;
export const LAYER_PROD_RATE = 0.1;

// Cost per unit for the first batch of 10.
// After every 10 purchases: cost *= 10^(layer index + 2)
export const BASE_COST = [1e1, 1e2, 1e4, 1e7, 1e11, 1e16, 1e22, 1e29];

export const BASE_ADDITION = 0.1;

// First bonus trigger threshold (must be > BASE_COST for each layer)
export const INITIAL_THRESHOLD = [1e2, 1e3, 1e5, 1e8, 1e12, 1e17, 1e23, 1e30];
export const THRESHOLD_MULT = 2;

export const LAYER_COLORS = [
  '#ffd700', '#a0c0ff', '#40ffcc', '#60ffaa',
  '#c0ff60', '#ffaa40', '#ff7070', '#ff50ff',
];
