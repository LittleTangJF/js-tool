var memo = function (func) {
    let mem = []
    return function(n) {
        if(mem[n]=== undefined) {
            mem[n] = func(n)
        }
        return mem[n]
    }
}

var fib = memo(function(n){
    if(n==1|| n ==2){
        return 1
    }
    return fib(n-1) + fib(n-2)
}) 

console.log(fib(30), fibonacci(30), '***********打印  ***********');