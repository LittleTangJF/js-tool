function time(target: any, name: any, descriptor: any) {
    console.log(target, name, '***********打印 target,name ***********');
    const func = descriptor.value;
    if (typeof func === 'function') {
        descriptor.value = function (...args: any) {
            console.time();
            const results = func.apply(this, args);
            console.timeEnd();
            return results;
        }
    }
}
class Person {
    @time
    say() {
        console.log('hello')
    }
}
const person = new Person();
person.say();