/**
 * 快速排序
 * 要点：先从数列中取出一个数作为基准数。
 *      分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边。
 *      再对左右区间重复第二步，直到各区间只有一个数。
 */
function quickSort(arr) {
  //如果数组<=1,则直接返回
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  //找基准，并把基准从原数组删除
  var pivot = arr.splice(pivotIndex, 1)[0];
  //定义左右数组
  var left = [];
  var right = [];

  //比基准小的放在left，比基准大的放在right
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //递归
  return quickSort(left).concat([pivot], quickSort(right));
}

console.log(quickSort(asss), "***********打印 quickSort() ***********");
