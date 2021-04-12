// 方法1 reduce 
function flatten1(ary) {
    return ary.reduce((pre, cur) => {
        console.log(1, '***********打印 1 ***********');
     return pre.concat(Array.isArray(cur) ? flatten1(cur) : cur);
    }, [])
}
    // let ary = [1, 2, [3, 4], [5, [6, 7]]]
    // console.log(ary.MyFlat(Infinity))

//方法二 while
// ary.some()   一个返回是true则返回true
function flatten(ary) {
    while (ary.some(d=>Array.isArray(d))) {
        console.log(1, '***********打印 1 ***********');
        ary = [].concat(...ary);
        }
    return ary
}
let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))
