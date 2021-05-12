 function compose(...func) {
    if(func.length===0){
        return arg => arg
    } 
    if(func.length===1){
        return func[0]
    }
    return function (...args) {
        return func.reduce((a, b)=>{
                return typeof a === 'function' ? b(a(...args)) : b(a)
        
        })
    } 
}


function fn1(x){
    return x + 1
}

function fn2(x){
    return x * 10
}

function fn3(x){
    return x - 1
}
let x = 10
let fn = compose(fn1,fn2,fn3)
let result = fn(x)
console.log(result, '***********打印 result ***********');
