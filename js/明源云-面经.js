// 第一题 this指向问题
var User = {
    a: 1,
    getData: function() {
        return this.a
    }
}
console.log(User.getData(), '***********打印 User.getData() ***********');
var a1 = User.getData // this指向window,没有a所以打印undefined
console.log(a1(), '***********打印 a1 ***********');

console.log('***********打印 第二题 ***********');
// 深clone

function deepClone(obj) {
    // 不是对象返回
    if(typeof obj !== 'object' && !obj){
        return obj
    } 
    var deepC = Array.isArray(obj) ? [] : {}
    // 非空判断
    if(obj&& typeof obj === 'object'){
        for( key in obj) {
            if(obj.hasOwnProperty(key)){
                // 如果还内嵌对象
                if(obj[key] && typeof obj[key] === 'object'){
                    deepC[key] = deepClone(obj[key])
                }else{
                    deepC[key] = obj[key]
                }
            }
        }
    }
    return deepC
}
console.log(deepClone({ a:1, arr: [2,3] }), '***********打印 deepClone() ***********');
console.log( '***********打印 第三题 数组范围和***********');
var nums = [0, 3, 4, 5, 8, -5, -6, 2, 9, 10]
function sumRange(pre, final) {
    var sum = 0;
    let arr = nums.slice(pre, final +1)
    console.log(arr, '***********打印 arr ***********');
    arr.map(d =>{
        sum+=d
    })
    console.log(sum, '***********打印 sum ***********');
}
sumRange(3, 6)
console.log('***********打印 第四题 ***********');
// 千分位 格式化问题
var num = 10000000.01
function changeQ () {
    let arr = num.toString().split('.')
    console.log(arr, '***********打印 arr ***********');
    // (?=)会作为匹配校验，但不会出现在匹配结果字符串里面
    // (?:)会作为匹配校验，并出现在匹配结果字符里面，
    let re = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    console.log(re, '***********打印 re ***********');
    return re+ '.' +arr[1]
}
console.log(changeQ(), '***********打印 changeQ() ***********');
console.log('***********打印 第四题 ***********');
var arr4 = [
    {
        id: 1,
        children: [
            {
                id: 2,
                children: null
            }
        ]
    },
    {
        id: 3,
        children: [
            {
                id: 4,
                children: null
            }
        ]
    }
]

var arrss = [];
function getArrId (arr) {
    let arrssss= []
    if(arr&&arr.length){
        arr.map(d=>{
            arrssss.push(d.id)
            if(d.children&&d.children.length>0){
                arrssss =  arrssss.concat(getArrId(d.children))
            }
        })
    }
<ZA>À</ZA>
    return arrssss
}
console.log(getArrId(arr4), '***********打印 getArrId() ***********');