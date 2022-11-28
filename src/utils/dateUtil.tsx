export function diffDays(d1: Date, d2: Date) {
  return ((Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24)) % 365) + 365) % 365;
}