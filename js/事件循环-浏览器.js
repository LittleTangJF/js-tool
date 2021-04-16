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


console.log( '***********打印 第二题***********');

console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
