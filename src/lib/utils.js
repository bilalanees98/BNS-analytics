export async function binarySearch(min = 0, max = 5000, condition) {
  let left = min;
  let right = max;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (await condition(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
