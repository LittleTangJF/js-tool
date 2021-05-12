// 深clone 实现一个clone能复制js的基本几种类型
/**
 * 
 * @param {浅拷贝}：第一层是基本数据类型则新、原对象不会影响，如果是复杂数据类型时则指向同一块地址
 * @returns 
 */
 function deepClone(obj) {
    // 不是对象返回
    if(typeof obj !== 'object' && !obj){
        return obj
    } 
    var deepC = Array.isArray(obj) ? [] : {}
    // 非空判断
    if(obj&& typeof obj === 'object'){
        for( key in obj) {
            // 为了忽略掉对象怼原型链上的属性hasOwnProperty
            if(obj.hasOwnProperty(key)){
                // 如果还存在对象的引用
                // typeof 判断null array object 都是返回object
                if(obj[key] && typeof obj[key] === 'object'){
                    console.log(obj[key], '***********打印 obj[key] ***********');
                    deepC[key] = deepClone(obj[key])
                }else{
                    deepC[key] = obj[key]
                }
            }
        }
    }
    return deepC
}
let a = [1,2,[3,4]]
let b = deepClone(a)
a[2][0]= 1
console.log(a, b, '***********打印 deepClone() ***********');
// console.log(deepClone(a), '***********打印 deepClone() ***********');
