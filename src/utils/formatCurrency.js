export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "KES 0";
  return `KES ${Number(amount).toLocaleString()}`;
}