export default function average(arr: number[]) {
  if (!arr) {
    return 0;
  }
  
  let sum = 0;
  arr.forEach((i) => {
    sum += i;
  });

  return sum / arr.length;
}