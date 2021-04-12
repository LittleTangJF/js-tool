// 方法1
var arr = [2,4,7,3,5,2,8,7]
var setArr =new Set(arr);
var newArr = Array.from(setArr)
console.log(newArr, '***********打印 newArr ***********');


//方法2
function fn(arr){
    var obj = {}
    var arr1 = []
    for(let i = 0; i<arr.length;i++){
          if(!obj[arr[i]]){
              obj[arr[i]] = 1
              arr1.push(arr[i])
        }
    }
    return arr1
  }

  console.log(fn(arr), '***********打印 fn() ***********');