
// const Promise = require('./tking.js')

let p = new Promise((resoleve, reject)=>{
    // resoleve(100)
    // throw '错误'
    setTimeout(() => {
        reject(11)
    }, 1000);
}).then(res=>{
    console.log(res, '***********打印 第一个 ***********');
    return res
},reason=>{
    console.log(reason, '***********打印 第一个reason ***********');
    return reason
}).then(res1=>{
    console.log(res1, '***********打印 第二个 ***********');
}, reason1=>{
    console.log(reason1, '***********打印 第二个reason1 ***********');
})









function promiseRace(promiseArr){
    if(!Array.isArray(promiseArr)){
      return "参数为数组"
    }
    return new Promise(function(resolve, reject){
      for (let i = 0 ; i < promiseArr.length; i++){
        Promise.resolve(promiseArr[i]).then((res)=>{
          resolve(res) // 和promise.all的主要差别
        },(err)=>{
          reject(err)
        })
      }
    })
  }
var p1 = Promise.resolve('a');
var p2 = Promise.resolve('b');
var p3 = Promise.reject('c');
promiseRace([p1, p2, p3]).then(function (value) {
	console.log(value);
})


// 实现Promise.all
// var myAll = function(arr) {
//     let len = arr.length
//     let result = []
//     let count = 0
//     return new Promise((resolve,reject)=>{
//         arr.forEach((data, index)=>{
//             Promise.resolve(data).then(res=>{
//                 result[index] = res
//                 count++
//                 if(count === len){
//                     resolve(result)
//                 }
//             },err=>{
//                 reject(err)
//             })
//         })
//     })
// }
// console.log( '***********打印 Promise.all ***********');
// var p1 = Promise.resolve('a');
// var p2 = Promise.resolve('b');
// var p3 = Promise.resolve('c');
// myAll([p1, p2, p3]).then(function (value) {
// 	console.log(value);
// })

// .catch(e=>{
//     console.log(e, '***********打印 e ***********');
// })