var sortColors = function (nums) {
  // 题目只有0 ， 1 ， 2, 三指针
  let l = 0,
    index = 0,
    r = nums.length - 1;
  while (index <= r) {
    if (nums[index] === 0) {
      sw(nums, l++, index++);
      console.log(l, index, "*******l, index 打印*******");
      //    l++
      //    index++
    } else if (nums[index] == 2) {
      sw(nums, r--, index);
      console.log(r, "*******r 打印*******");
      //   r--
      //    r--
    } else {
      index++;
    }
  }
};
function sw(nums, temp1, temp2) {
  console.log(temp1, temp2, "*******temp1, temp2 打印*******");
  let temp = nums[temp1];
  nums[temp1] = nums[temp2];
  nums[temp2] = temp;
}

sortColors([2, 1, 0, 2, 1]);
