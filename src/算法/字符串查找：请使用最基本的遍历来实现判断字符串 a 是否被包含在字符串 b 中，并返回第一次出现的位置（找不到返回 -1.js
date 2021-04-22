// 例如
// a='34';b='1234567'; // 返回 2
// a='35';b='1234567'; // 返回 -1
// a='355';b='12354355'; // 返回 5
// isContain(a,b);

// 题解
function isContain(a, b) {
  for(let i in b){
    	if(a[0] == b[i]){
        	let tmp = true
          	for(let j in a){
              	if(a[j] !== b[(+i) + (+j)]){
                   tmp = false
                }
              if(tmp){
                return i
              }
            }
      }
  }
  return -1;
}
console.log(isContain('34', '1234567'), '***********打印  ***********');
