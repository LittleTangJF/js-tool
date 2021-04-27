// var a = function(){ this.b = 3; }
// var c = new a();
// a.prototype.b = 9;
// var b = 7;
// a();
// console.log(b);
// console.log(c.b);
// 第二题
// var result = [];
// var a = 3;
// var total = 0;
// function foo(a) {
//     var i = 0;
//     for(; i < 3; i++) {
//         result[i] = function() {
//             console.log(total);
//             total += i * a;
//             console.log(i, a, total);
//         }
//     }
// }
// foo(1);
// result[0](); // 3
// result[1](); // 6
// result[2](); // 9

const { reject } = require("lodash");

// 第三题
var list = [1, 2, 3];
var squeak = num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(num * num);
        }, 1000)
    })
}

// 下面输出结果是什么？如何让他每1s中输出一个？不能改动squeak函数
function count(){
    for (let i=0; i<3; i++) {
        (function () {
          setTimeout(() => squeak(i+1), 1000*i)
        })()
      }
  }
// count()

// 第四题  反转字符串
var name = "My city is WH";
var nameArr = name.split('');
var result=[];
var resultStr = '';
// for (var i = 0, l = nameArr.length; i < l; i++) {
//     result.unshift(nameArr[i]);

// }
for(var i = nameArr.length-1; i>=0; i--){
    resultStr += name.charAt(i)
}
// var resultStr = name.split('').reverse().join(''); 
// console.log(result.join(''), '***********打印 result ***********');
console.log(resultStr, '***********打印 result ***********');
//  第五题 实现一个Observer观察者，并写出on、emit、off方法。

class EventEmitter {
    constructor() {
        this._events = {}
    }
    on(event, cb) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(cb);
        return this;
    }
    emit(event, ...args) {
        let arr = this._events[event];
        for (let cb of arr) {
            cb(...args);
        }
        return this;
    }
    off(event, cb) {
        if (!cb) {
            return;
        }
        if (this._events[event]) {
            this._events[event] = this._events[event].filter((cbitem) => {
                return cb !== cbitem;
            })
        }
        return this;
 
    }
    once(event, cb) {
        let fn = function(...args) {
            cb.apply(this,...args);
            this.off(event,fn);
        }
        fn = fn.bind(this)
        this.on(event,fn);
        return this;
    }
}
 
//测试
function fn(val){
    console.log("Tom" + val);
}
function fn1(val){
    console.log("Mary" + val);
}
function fn2(val){
    console.log("Jack" + val);
}
var emitter = new EventEmitter();
emitter.on("change",fn);
emitter.on("change",fn1);
emitter.on("change",fn2);
emitter.off("change",fn);
emitter.emit("change",123);
