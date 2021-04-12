var num = [10,5,11,7,8,9]
function getMaxProfit(arr) {
      var minn = arr[0]
      var maxn = 0
      for(let i= 1;i<=arr.length;i++){
             let currentPrice = arr[i];
             minn = Math.min(minn, currentPrice)
            let maxpro = currentPrice - minn
            maxn = Math.max(maxpro ,maxn)
      }
      console.log(maxn, '***********打印 maxn ***********');
     return maxn
}

console.log(getMaxProfit(num), '***********打印  ***********');