let arr = [94, 23, 1, 3, 5, 44, 99, 12, 20];

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
console.log(insetSort(arr), "*******insetSort(arr) 打印*******");
