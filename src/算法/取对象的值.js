/*
 * @Author: your name
 * @Date: 2021-09-10 09:16:55
 * @LastEditTime: 2021-09-10 09:22:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-tool/src/算法/取对象的值.js
 */
// 实现一个获取对象任意属性值的方法


// const getAttribute = (object /* 目标对象 */, attribute /*目标属性*/, defaultValue /*默认值*/) => {
//     // @return any
// }
example:
var obj = { a: { b: { c: 100 } }, d: [{ f: 'abc' }] };
// getAttribute(obj, 'a.b.c', 0) === 100
// getAttribute(obj, 'a.b.e', 'default') === 'default'
// getAttribute(obj, 'd.0.f') === 'abc'

console.log('***********答案**********打印');
function getAttribute(object, attribute, defaultValue) {
    if (defaultValue) return 'default'
    // @return any
    let a = attribute.split('.')
    function getValue(tar, key) {
        return tar[key]
    }
    let objs = object
    a.forEach(key => {
        objs = getValue(objs, key)
    });
    return objs
}
console.log(getAttribute(obj, 'd.0.f'), '**********************打印');
