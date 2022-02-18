/*
 * @Author: tjf
 * @Date: 2021-08-24 13:58:42
 * @LastEditTime: 2021-09-26 18:08:11
 * @LastEditors: tjf
 * @Description: 
 * @FilePath: /js-tool/src/demo.js
 */

// const value = { a: 1 }
// const mul = (x = { ...value }) => {
//     console.log((x.a *= 2))
// }
// mul()
// mul()
// mul(value)
// mul(value)

// const pro = Promise.resolve(Promise.resolve('Pro'))
// function one() {
//     pro.then(res => res).then(res => console.log(res, '************res**********打印'))
//     setTimeout(() => {
//         console.log('************time1**********打印');
//     }, 0);
//     console.log('************last 1**********打印');
// }
// async function two() {
//     const res = await pro
//     console.log(await res);
//     setTimeout(() => {
//         console.log('************time2**********打印');
//     }, 0);
//     console.log('************last2**********打印');
// }
// one()
// two()

// function delay(fn, config) {
//     var start = new Date();
//     var zero_interval = null;
//     var h = function () {
//         if (new Date() - start >= 1000) {
//             clearInterval(zero_interval);
//             fn();
//         }
//     }

//     zero_interval = setInterval(h, 0);

//     if (config) {
//         clearInterval(zero_interval);
//     }
// }

// delay(() => console.log('************hah**********打印'))

// console.log('*********************打印');
// console.log('**************aa*******打印');
// console.log('**************cc*******打印');
// function removeRepeat(str) {
//     let arr = str.split('')
//     let newArr = Array.from(new Set(arr))
//     let newStr = newArr.join('')
//     return newStr
// }
// console.log(removeS('aabbcc'), '**********************打印');
// function transNum(num) {
//     let str = num.toString()
//     let reg = /^(\d+)(e)([\-]?\d+)$/
//     let arr, len,
//         zero = '';
//     if (!reg.test(str)) {
//         return num
//     } else {
//         arr = reg.exec(str)
//         console.log(arr)
//         len = Math.abs(arr[3]) - 1
//         for (let i = 0; i < len; i++) {
//             zero += '0'
//         }
//         return '0.' + zero + arr[1]
//     }
// }
// console.log(transNum(1.23457E+15), '************toFixed(**********打印');
var value = 1234567890123450;
var p = Math.floor(Math.log(value) / Math.LN10);
var n = value * Math.pow(10, -p);
console.log(n + 'e' + p);