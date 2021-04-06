// todo 运行node js/明源云-面经.js

// 第一题 this指向问题 运行User.getData()和 a1() 输出什么
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
// 深clone 实现一个clone能复制js的基本几种类型

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
// 第三题  sumRange(1, 3) 输出数组第1到第3个范围内数据的和
console.log( '***********打印 第三题   数组范围和***********');
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
//第四题  10000000.01 =====> 10,000,000.01  千分位就加个,号
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
//  第五题  把arr4格式的数组内所有的id取出来，====> [1, 2, 3, 4 ]
console.log('***********打印 第五题 ***********');
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
    return arrssss
}
console.log(getArrId(arr4), '***********打印 getArrId() ***********');
// 第六题  
/**
 * LazyMan(‘tom’)
输出:
“this is tom”
LazyMan(‘tom’).sleep(10).eat(‘apple’)
输出:
“this is tom”
等待10秒…
“eat apple”
LazyMan(‘tom’).eat(‘apple’).eat(‘banana’)
输出:
“this is tom”
“eat apple”
“eat banana”
LazyMan(‘tom’).eat(‘banana’).sleepFirst(5)
输出:
等待 5 秒…
“this is tom”
“eat banana”
 */
class _LazyMan {
    constructor(name){
        this.name = name
        this.tasks = [this.sayName]
        setTimeout(() => {  // 宏任务队列 ， 再所有的方法执行完后再执行
            this.next()
        }, 0);
    }
    next= ()=>{
        let task = this.tasks.shift()
        task && task()
    }

    // 任务队列 addTofinal 添加到数组最后一个 push
    addTasks(task, addTofinal = true) {
        if(addTofinal) {
            this.tasks.push(task)
        }else{
            this.tasks.unshift(task)
        }
    }
    // sayName 
    sayName =() =>{
        console.log(this.name, '***********打印 this.name ***********');
        this.next()
    }
    // sleep
    sleep = (time) =>{
         this.addTasks(this.sleepTask(time))
         return this
    }
    // sleepFirst
    sleepFirst = (time) =>{
         this.addTasks(this.sleepTask(time), false)
         return this
    }

    // function sleepTask
    sleepTask = (time) =>{
        return ()=> {
            console.log( `'***********打印 等待${time}秒 ***********'`);
            setTimeout(() => {
            this.next()
        }, time * 1000);}
    }
    // eat
    eat =(food)=>{
        this.addTasks(()=>{
            console.log( `'***********打印 ${food} ***********'`);
        })
        return this
    }
}
function LazyMan (name) {
    return new _LazyMan(name)
}
// console.log(, '***********打印  ***********');
LazyMan('tjf').sleepFirst(3).eat('hahah')