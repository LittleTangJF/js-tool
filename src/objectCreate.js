// Object.create实现
// 思路：将传入的对象作为原型
function create(obj) {
    function F () {}
    F.prototype = obj
    F.prototype.constructor = F
    return new F
}

