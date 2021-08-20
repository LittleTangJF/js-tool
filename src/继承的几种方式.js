function Parent (name) {
    this.name = 'bbb'
}

function Child () {

}
// todo 默认方式
Child.prototype = new Parent()

// 借用构造函数
function Child1 () {
    Parent.call(this)
}
// 组合 借用和设置原型
// todo 用object.create
var child = Object.create(Parent, {
    name: { value: "Benjamin"},
    url : { value: "http://www.zuojj.com"}
});


// todo es class extends方法
https://zhuanlan.zhihu.com/p/142027824
/**
 * 原型链继承
 * 将父类的实例作为子类的原型
 *
 */

Parent.prototype.getName = function() {
    return this.name
}
Child.prototype = new Parent()

// var child = new Child()
// console.log(child.getName(), '***********打印  ***********');
// child('hahah').getName()

/***
 *构造函数继承 ： 
 修改父类构造函数的this指向子类的this
 */
function Parent1 (name) {
    this.name = 'bbb'
}
var child = new Child1()
// console.log(child.name, '***********打印  ***********');
/**
 * 组合继承：同时结合原型链、构造函数继承 
 */
function Parent2 (name) {
    this.name = 'bbb'
}
Parent2.prototype.getName = function() {
    return this.name
}
function Child2 () {
    Parent2.call(this)
}
Child2.prototype = new Parent2()
// 给child2 的
Child2.prototype.constructor = child2
var child2 = new Child2()
console.log(child2.getName(), '***********打印  ***********');
/**
 * 寄生继承：实现复杂
 */

