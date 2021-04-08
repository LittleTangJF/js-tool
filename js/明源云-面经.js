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
// LazyMan('tjf').eat('hahah').sleepFirst(3)

// 第六题 第二种题解
function _Lazy (name) {
    // 保证this指向_Lazy的实例
    if(!(this instanceof _Lazy)){
        return new _Lazy(name)
      }
    this.name = name
    const satName = (next)=>{
        console.log(this.name, '***********打印 this.name ***********');
        next()
    }
    this.task= [satName]
    setTimeout(() => {
       this.next() 
    }, 0);
}
_Lazy.prototype.next = function (){
    if(this.task.length<0)return
   const tasks = this.task.shift()
   tasks && tasks(this.next.bind(this))
}
_Lazy.prototype.eat = function (food){
    this.task.push((next)=>{
        console.log( `'***********打印 ${food} ***********'`);
        next()
    })
    return this
}
_Lazy.prototype.sleep = function (time){
    const st = (next)=>{
        console.log( `'***********打印 等待${time}秒 ***********'`);
        setTimeout(() => {
            next()
        }, time * 1000);
    }
    this.task.push(st)
    return this
 }
//  _Lazy('888').sleep(2).eat('999')
// console.log(new _Lazy('22'), ' ***********');
// const aaa = []
// aaa.push(2)
// aaa.push(3)
// const bb = aaa.shift()
// console.log(aaa,bb, '***********打印 aaa ***********');

// 实现一个new
function newMethod (constructor, ...arg) {
    // 1 新建空对象
    var result = {}
    // 2 把函数的原型挂载到对象的_proto_上
    result.__proto__ = constructor.prototype
    console.log(result, '***********打印 result ***********');
    // 或者 var result= Object.create(constructor.prototype); 1和2合并
    // 3 将空对象作为this的上下文
    let res  = constructor.apply(result, arg)
    console.log(res, '***********打印 res ***********');
    // todo因为new关键字--返回对象 后内部属性是被对象的覆盖 https://blog.csdn.net/yzhean/article/details/109990987
    // 如果函数没有返回对象就返回this
    return Object.prototype.toString.call(res) ==='[object Object]'? res: result
}
const Fun = function(name) {
    this.name = name;
    return [1,3]
  };
  
//   console.log(newMethod(Fun, '小明'));

// 实现instanceof
function instanceofs (left, right) {
    // 1取右边的prototype
    let r = right.prototype
    while(true){
        // 到底了
        if(left === null){
            return false
        }
        // 如果找到了就返回
        if(left === r){
            return true
        }
        // 循环赋值__proto__
        left = left.__proto__
    }
}

/**
 * 实现bind、 call、 apply函数
 * 思路：
 * https://www.bilibili.com/video/BV1RT4y177cT?from=search&seid=12403627456716371971
 */
Function.prototype.mycall = function (ctx, ...args) {
    if(typeof this !== 'function') {
        throw new TypeError('error')
    }
    // 1 将this挂载到对象上
    // 2 执行fn
    // 3 删除fn
    // 优化 symbel('s')
    let fn = Symbol('s')
    ctx[fn] = this
    ctx[fn](...args)
    delete ctx[fn]
}
Function.prototype.myapply = function (ctx, args= []) {
    // 1 将this挂载到对象上
    // 2 执行fn
    // 3 删除fn
    ctx.fn = this
    ctx.fn(...args)
    delete ctx.fn
}
Function.prototype.mybind = function (ctx, ...args) {
    // 1 将this挂载到对象上
    // 2 执行fn
    // 3 删除fn
    // 4返回一个函数 ， 因为可能还有赋值，需要拼接起来
    return (...arg2)=>{
        ctx.fn = this
        ctx.fn(...args.concat(arg2))
        delete ctx.fn
    }
    
}
function show(...arg) {
    console.log(arg, '***********打印 arg ***********');
    console.log(this.name, '***********打印 this.name ***********');
}
show.mycall({name: 'hhah'}, 'sss', 'sssfgg')
let bind = show.mybind({name: 'hhah'}, 'sss', 'sssfgg')
bind('sdfasdf')
show.myapply({name: 'hhah'}, ['sss', 'sssfgg'])