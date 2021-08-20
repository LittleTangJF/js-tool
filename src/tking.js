
// 视频地址 https://www.bilibili.com/video/BV1EV411i7MV?from=search&seid=8584862981194727440

const PENDDING = 'PENDDING'
const REJECTED = 'REJECTED'
const FULFILLED = 'FULFILLED'

class Promise  {
    constructor(executor){
        this.status = PENDDING
        this.value = null
        this.reason = null
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        try{
            executor(this.resolve.bind(this), this.reject.bind(this))
        }catch(err)    {     
            this.reject(err)
        }
        

    }

    resolve (value){
        if(this.status === PENDDING){
            this.value = value
            this.status = FULFILLED
            if(this.resolveCallbacks){
                this.resolveCallbacks.forEach(d=>{
                    // d(this.value)
                    d()
                })
            }
        }
    }
    reject(reason){
        if(this.status === PENDDING){
            this.reason = reason
            this.status = REJECTED
            if(this.rejectCallbacks){
                this.rejectCallbacks.forEach(d=>{
                    // d(this.reason)
                    d()
                })
            }
        }
    }
    then (onFulfilled, onRejected) {
        console.log(this.status, '***********打印 this.status ***********');
        onFulfilled =typeof onFulfilled === 'function' ? onFulfilled : data=>data
        onRejected =typeof onRejected   === 'function' ? onRejected : err => {throw err}
        let promise2 = new Promise((resolve, reject)=>{
            if(this.status === 'PENDDING'){
                // this.rejectCallbacks.push(onFulfilled)
                this.resolveCallbacks.push(()=>{
                    // 宏任务拿到promise2
                setTimeout(() => {
                    // 如果抛出错误
                          try{
                            console.log(promise2, '***********打印 promise2 ***********');
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                       
                        }catch(err){
                            reject(err)
                       }
                    });
                })
                this.rejectCallbacks.push(()=>{
                     // 宏任务拿到promise2
                 setTimeout(() => {
                    // 如果抛出错误
                          try{
                            console.log(promise2, '***********打印 promise2 ***********');
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                       
                        }catch(err){
                            reject(err)
                       }
                    });
                })
            }
            if(this.status === 'FULFILLED'){
                // 宏任务拿到promise2
                setTimeout(() => {
                // 如果抛出错误
                      try{
                        console.log(promise2, '***********打印 promise2 ***********');
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                   
                    }catch(err){
                        reject(err)
                   }
                });
            }
            if(this.status === 'REJECTED'){
                 // 宏任务拿到promise2
                 setTimeout(() => {
                    // 如果抛出错误
                          try{
                            console.log(promise2, '***********打印 promise2 ***********');
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                       
                        }catch(err){
                            reject(err)
                       }
                    });
                
            }
        })

        return promise2
       
    }
    
}

function resolvePromise (x, promise2, resolve, reject){
    if(x === promise2){
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    let called
    if(x&& (typeof x === 'function'|| typeof x === 'object')){
        try{
            let {then} = x
            if(typeof then === 'function'){
                then.call(x, y=>{
                    if(called) return
                    called = true
                    resolvePromise(y, promise2, resolve, reject)
                }, r=>{
                    if(called) return
                    called = true
                    reject(r)
                })
            }else{
                resolve(x)
            }
        }catch(er){
            if(called) return
            called = true
            reject(er)
        }
    }else{
        resolve(x)
    }
}


module.exports = Promise=>{
    
}