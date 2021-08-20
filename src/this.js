/** 浏览器中全局是window 在node中全局是global */
// https://bingxl.cn/js%E4%B8%AD%E7%9A%84this.html
// global['who'] = 'window‘s World'
var who = '外面的World'
const object = {
    who: '里面的World',
    greet() {
        return `Hello, ${this.who}!`;
    },
    farewell: () => {
        return `Goodbye, ${this.who}!`;
    }
};
var fn = object.greet
var fn1 = object.farewell
console.log(fn()); //=> ? 
console.log(fn1()); //=> ? 
console.log(object.greet()); // => ? 
console.log(object.farewell()); // => ?  