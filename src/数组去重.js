var b;

(function a() {
    let d = '2'
    b()
    b = function () {
        console.log(d, '************d**********打印');
        let d = 3
    }
})()
