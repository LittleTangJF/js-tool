import { randomArr, sameArr } from "./index.js";

function insetSort(array) {
  for (let j = 0; j < array.length; j++) {
    for (let i = j + 1; i > 0; i--) {
      if (array[i] < array[i - 1]) {
        let temp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = temp;
      } else {
        break;
      }
    }
  }
  return array;
}
// 排查相同
var qsort = sameArr();
console.time("sort");
let result = insetSort(qsort);
console.timeEnd("sort");
// 测试数据

const arr = randomArr();

console.time("sort");
insetSort(arr);
console.timeEnd("sort");
