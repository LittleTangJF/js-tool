function find7(n){
	var arr = []
	for(let i = 0; i<=n;i++){
   		 let  a = 10;
            if(i>100){
				var l=i.toString().length - 1
				a= 	Math.pow(10,l)  // 10的n次方
            }
		if(i%7==0|| i===7||Math.floor(i/a)===7){
			arr.push(i)
		}
	}
	return arr
}

find7(1000)