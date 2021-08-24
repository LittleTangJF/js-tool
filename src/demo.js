
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

console.log('*********************打印');
console.log('**************aa*******打印');
console.log('**************cc*******打印');
// function removeRepeat(str) {
//     let arr = str.split('')
//     let newArr = Array.from(new Set(arr))
//     let newStr = newArr.join('')
//     return newStr
// }
// console.log(removeS('aabbcc'), '**********************打印');
