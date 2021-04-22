//给定一个只包括 ‘(’，’)’，’{’，’}’，’[’，’]’ 的字符串，判断字符串是否有效。
/**
 * - 左括号必须用相同类型的右括号闭合。

- 左括号必须以`正确的顺序`闭合。

- 注意空字符串可被认为是有效字符串
 */
// 解法1
var isVs = function (s) {
	let obj = {
    	'(' : ')',
    	'[' : ']',
    	'{' : '}'
  }
  	let leftArr = []
    for (let a of s){
      if(a in obj){ // 左边就pu sh
        leftArr.push(a)
      }else{ // 右边的话就对比数组中有没有它，没有就返回false
        if(a !== obj[leftArr.pop()]) return false;
      }
    }
  return !leftArr.length
}

console.log(isVs('{}[]()'), '***********打印 isV***********');
console.log(isVs('{}([])'), '***********打印 isV***********');
console.log(isVs('{}[(])'), '***********打印 isV***********');