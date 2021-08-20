// async function async1(){
//     console.log('async1 start')
//     await async2() //
//     console.log('async1 end')
//   }
// async function async2(){
//     console.log('async2')
// }
// console.log('script start')
// setTimeout(function(){
//     console.log('setTimeout0') 
// },3)  
// setTimeout(function(){
//     console.log('setTimeout3') 
// },0)  
// setImmediate(() => console.log('setImmediate'));// node
// process.nextTick(() => console.log('nextTick'));// node
// async1();
// new Promise(function(resolve){
//     console.log('promise1')
//     resolve();
//     console.log('promise2')
// }).then(function(){
//     console.log('promise3')
// })
// console.log('script end')



// console.log( '***********打印 第二题***********');

// console.log('script start')

// async function async1() {
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2 end')
// }
// async1()

// setTimeout(function() {
//   console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
//   .then(function() {
//     console.log('promise1')
//   })
//   .then(function() {
//     console.log('promise2')
//   })

// console.log('script end')
console.log( '***********打印 腾讯面试题***********');
// const promise1 = new Promise((resolve, reject)=>{
//   console.log(1, '***********打印 1 ***********');
//   resolve(1)
//   setTimeout(() => {
//       console.log('***********打印 1 final***********');
//   }, 0);
// })
// const promise2 = promise1.then(()=>{
//   console.log('***********打印 2 ***********');
//   return 666  // 返回的不是Promise 竟然没报错好家伙
// })
// const promise3 = promise2.then((res)=>{
//   console.log( '***********打印 3 ***********', res);
//   return Promise.resolve(888)
// })
// promise3.then((res)=>{
//   console.log( '***********打印 4 ***********', res);
// })
// setTimeout(() => {
//   console.log('***********打印 10 final***********');
// }, 10);
// setTimeout(() => {
//   console.log('***********打印 0 final***********');
// }, 0);
// console.log('***********打印 hahah ***********');

const p = function (){
  return new Promise((resolve, reject) => {
      const p1 = new Promise((resolve, reject) => {
          setTimeout(()=>{
            resolve(4)
          })
      })
      p1.then(res=>{
        console.log(res, '***********打印 res ***********');
      })
      console.log(2, '***********打印 2 ***********');
      resolve(3)
  })
}

p().then(res=>{
  console.log(res, '***********打印 res ***********');
})
console.log(1, '***********打印 1 ***********');