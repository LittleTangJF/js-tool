/*
 * @Author: tjf
 * @Date: 2021-11-12 17:24:34
 * @LastEditTime: 2021-11-12 17:27:38
 * @LastEditors: tjf
 * @Description: 
 * @FilePath: /js-tool/src/node学习/events.js
 */
const EventEmitter = require('events')

class Person extends EventEmitter {
    constructor() {
        super()
    }
}
const developer = new Person()
developer.on('dev', function (data) {
    setImmediate(() => {
        console.log(data)
    })
})
developer.on('dev', function (data) {
    process.nextTick(() => {
        console.log(data, 1)
    })
})
developer.emit('dev', 'hello nodeJs')

console.log(`hello developer`)

// hello developer
// hello nodeJs
// hello nodeJs
