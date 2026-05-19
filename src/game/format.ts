export function fmt(n: number): string {
  const abs = Math.abs(n);
  if (abs < 1000) return n.toFixed(abs < 10 ? 2 : 0);
  if (abs < 1e6)  return (n / 1e3).toFixed(2) + 'K';
  if (abs < 1e9)  return (n / 1e6).toFixed(2) + 'M';
  if (abs < 1e12) return (n / 1e9).toFixed(2) + 'B';
  if (abs < 1e15) return (n / 1e12).toFixed(2) + 'T';
  return n.toExponential(2);
}

export function fmtMult(n: number): string {
  return '×' + n.toFixed(2);
}
