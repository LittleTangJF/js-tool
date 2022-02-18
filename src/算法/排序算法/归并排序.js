function merge(left, right) {
  let i = 0,
    j = 0;
  let result = [];

  while (left.length > i && right.length > j) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    }
    if (left[i] > right[j]) {
      result.push(right[j]);
      j++;
    }
  }

  if (left.length > i) {
    result.push(...left.slice(i));
  }
  if (right.length > j) {
    result.push(...right.slice(j));
  }
  return result;
}

function mergeSort(array) {
  if (array.length < 2) {
    // 拆分到2就不用拆了
    return array;
  }
  let m = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, m));
  let right = mergeSort(array.slice(m));
  return merge(left, right);
}

let arr = [94, 23, 1, 3, 5, 44, 99, 12, 20];

console.log(mergeSort(arr), "*******mergeSort(arr) 打印*******");
