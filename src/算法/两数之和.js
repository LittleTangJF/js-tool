/**
 *   给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 示例:
 给定 nums = [2, 7, 11, 15], target = 9
 因为 nums[0] + nums[1] = 2 + 7 = 9
 所以返回 [2, 7]
 */

var num = [1, 3, 3, 4, 5, 6, 8, 0]
function twoSum(target) {
    var arr = [];
    var obj = {};
    for (let i = 0; i <= num.length; i++) {
        let a = num[i]
        let b = target - a
        // 如果差值有在obj里面，就返回
        if (obj[a] !== undefined) {
            return [obj[a], num[i]]
        } else {
            // 把差值的下标存起来
            obj[b] = num[i]
        }

    }
    return arr
}
console.log(twoSum(4), '***********打印  ***********');
