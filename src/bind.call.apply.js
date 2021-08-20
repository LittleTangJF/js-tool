/**
 * 实现bind、 call、 apply函数
 * 思路：
 * https://www.bilibili.com/video/BV1RT4y177cT?from=search&seid=12403627456716371971
 */
 Function.prototype.mycall = function (ctx, ...args) {
    if(typeof this !== 'function') {
        throw new TypeError('error')
    }
    // 1 将this挂载到对象上
    // 2 执行fn
    // 3 删除fn
    // 优化 symbel('s')
    let fn = Symbol('s')
    console.log(this, '***********打印 this ***********');
    ctx[fn] = this
    ctx[fn](...args)
    delete ctx[fn]
}
Function.prototype.myapply = function (ctx, args= []) {
    // 1 将this挂载到对象上
    // 2 执行fn
    // 3 删除fn
    ctx.fn = this
    ctx.fn(...args)
    delete ctx.fn
}
Function.prototype.mybind = function (ctx, ...args) {
    // 1 将this挂载到对象上
    // 2 执行fn
    // 3 删除fn
    // 4返回一个函数 ， 因为可能还有赋值，需要拼接起来
    return (...arg2)=>{
        ctx.fn = this
        ctx.fn(...args.concat(arg2))
        delete ctx.fn
    }
    
}



function show(...arg) {
    console.log(arg, '***********打印 arg ***********');
    console.log(this.name, '***********打印 this.name ***********');
}
show.mycall({name: 'hhah'}, 'sss', 'sssfgg')
let bind = show.mybind({name: 'hhah'}, 'sss', 'sssfgg')
bind('sdfasdf')
show.myapply({name: 'hhah'}, ['sss', 'sssfgg'])