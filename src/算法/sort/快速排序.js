/**
 * 快速排序
 * 要点：先从数列中取出一个数作为基准数。
 *      分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边。
 *      再对左右区间重复第二步，直到各区间只有一个数。
 */

import { randomArr, sameArr } from "./index.js";

function minNumber(left, min, right) {
  let res = [left];
  min > left ? res.push(min) : res.unshift(min);

  if (right > res[1]) {
    res.push(right);
  } else if (right < res[0]) {
    res.unshift(right);
  } else {
    res.splice(1, 0, right);
  }
  return res[1];
}

function quickSort(arr) {
  //如果数组<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  //找基准，并把基准从原数组删除
  var pivot = arr.splice(pivotIndex, 1)[0];
  // var pivot = minNumber(arr[0], arr[pivotIndex], arr[arr.length - 1]);
  //定义左右数组
  var left = [];
  var right = [];
  let same = [];
  //比基准小的放在left，比基准大的放在right
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      same.push(pivot);
    }
  }
  //递归
  return quickSort(left).concat(same, quickSort(right));
}

var qsort = randomArr();
// var qsort = sameArr();
console.time("sort");
let result = quickSort(qsort);
console.timeEnd("sort");
// 优化版
