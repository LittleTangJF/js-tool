// 对插入排序的优化
let arr = [94, 23, 1, 3, 5, 44, 99, 12, 20];

function shellSort(array) {
  let len = array.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < array.length; i++) {
      let j = i;
      let current = array[j];
      while (j > 0 && current < array[j - gap]) {
        array[j] = array[j - gap];
        array[j - gap] = current;
        j -= gap;
      }
    }
  }
  return array;
}
console.log(shellSort(arr), "*******insetSort(arr) 打印*******");
