function printPivotElements (arr) {
    // 从右往左，寻找每个位置及其之后的最小数
      var arrs = []
      var right = arr[arr.length - 1]
      for(let i = arr.length - 1 ; i>=0; --i){
              if(right > arr[i]){
                right = arr[i]
                arrs[i] = right
          }
          // 从左往右，寻找比左边大且比右边小的数
      var left = arr[0]
      for(let i= 1;i<arr.length-1;++i){
            if(arr[i]>left){
                left =arr[i] 
                if(left<arrs[i+1]){
                    console.log(arr[i] )
              }
          }
      }
    }
}
console.log(printPivotElements([1,8,6,9,10,15,12,20]), '***********打印 、 ***********');
