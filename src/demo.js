// 过滤函数 key就是传入的id
let aa   = [ '', '', '', 222]
let remark  = aa.filter(d=>d!=='').join(',')
console.log(remark, '***********打印  ***********'); //打印 '欢乐'