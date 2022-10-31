/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let m = haystack.length,
    n = needle.length;
  if (n == 0) return 0;
  // 先找到next，也就是返回去的地方,
  const next = new Array(n).fill(0);
  for (let i = 1, j = 0; i < n; i++) {
    // 如果不相等，j = 0, 则next[i] = 0
    // 若不相等，j > 0, 则返回到上个相同的地方,此处举例"aabaaac"
    while (j > 0 && needle[i] !== needle[j]) j = next[j - 1];
    // 如果相等，那i，j都像后移一位
    if (needle[i] == needle[j]) j++;
    // 更新next数组
    next[i] = j;
  }
  //那同样的问题，这边可以改成if吗。
  console.log(next, "*******next 打印*******");

  for (let i = 0, j = 0; i < m; i++) {
    while (j > 0 && haystack[i] !== needle[j]) j = next[j - 1];
    if (haystack[i] == needle[j]) j++;
    if (j === n) return i - n + 1;
  }
  return -1;
};
console.log(
  strStr("ababcdbaafqsbaaabaaacwfqefqgqefqefs", "aabaaac"),
  "******* 打印*******"
);
