export function diffDays(d1: Date, d2: Date) {
  if (!d1 || !d2) return 0;
  if (!d2.getDay()) return 0;
  
  return ((d1.getDay() - d2.getDay() % 365) + 365) % 365;
}