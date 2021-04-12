function bubbleSort(arr){
      var len=arr.length;
      for(let i=len-1;i>0;i--){
        for(let j=0;j<i;j++){
          if(arr[j]>arr[j+1]){
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
    //         var tmp = arr[j];
    //         arr[j]=arr[j+1];
    //         arr[j+1]=tmp
          }
        }
      }
      return arr;
    }
    // 优化
    function bubbleSort1(arr){
      var len=arr.length;
      for(var i=len-1;i>0;i--){
         var flag = 0  // 如果下一趟没有排序了，已经完全顺序了就不要再循环了
        for(var j=0;j<i;j++){
          if(arr[j]>arr[j+1]){
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            flag = 1
          }
          if(flag==0){
            return
          }
        }
      }
      return arr;
    }

    var asss = [1, 2,7, 3, 6 ,5]
    console.log(bubbleSort(asss), '***********打印 bubbleSort ***********');