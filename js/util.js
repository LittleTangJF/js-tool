"use strict";
/**
 * 去掉为空或者空数组的请求参数
 */
function formatParams(params) {
    for (var key in params) {
        // for 变量 in 对象 变量是对象的下标 即key
        var value = params[key];
        // Object.prototype.toString.call(value) // 判断类型 [object 类型]
        if (Object.prototype.toString.call(value) === "[object Array]" &&
            !value.length) {
            // 当空数组
            delete params[key];
        }
        else if (!value) {
            // 当空 ‘’
            delete params[key];
        }
    }
    return params;
}
/**
 * 到某一个时间的倒计时，传入的参数以 (YYYY/MM/DD H:mm:ss)
 */
function getEndTime(endTime, onOk) {
    var startDate = new Date(); //开始时间，当前时间
    var endDate = new Date(endTime); //结束时间，需传入时间参数
    var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    var d = 0, h = 0, m = 0, s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor((t / 1000 / 60 / 60) % 24);
        m = Math.floor((t / 1000 / 60) % 60);
        s = Math.floor((t / 1000) % 60);
    }
    else {
        onOk();
    }
    return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
}
/**
 * 拼接参数成为url
 */
function setQueryUrl(obj) {
    var url;
    url = Object.keys(obj).reduce(function (pre, cur) {
        if (pre == "") {
            return cur + "=" + obj[cur];
        }
        return pre + ("&" + cur + "=" + obj[cur]);
    }, "");
    return url;
}
/**
 * 解析url参数
 */
function getUrlPrmt(url) {
    url = url ? url : window.location.href;
    var pa = url.substring(url.indexOf("?") + 1), arrS = pa.split("&"), rs = {};
    for (var i = 0, len = arrS.length; i < len; i++) {
        var pos = arrS[i].indexOf("=");
        if (pos == -1) {
            continue; // 跳过此循环
        }
        var name_1 = arrS[i].substring(0, pos), value = decodeURIComponent(arrS[i].substring(pos + 1));
        rs[name_1] = value;
    }
    return rs;
}
/**
 * 怎么判断一个对象是不是数组类型？
 */
function getClass(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}
/**
 * 排序算法：冒泡排序
 */
function bubbleSort(arr) {
    var _a;
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                //相邻元素两两对比
                _a = [arr[j + 1], arr[j]], arr[j] = _a[0], arr[j + 1] = _a[1]; //元素交换
            }
        }
    }
    return arr;
}
/**
 * 生成图片二维码：canvas
 * poster:背景  qr： 要贴上的图 cb：callback
 */
function createImgWithQr(poster, qr, cb) {
    var ratio = 2;
    var width = 300 * ratio, height = 533 * ratio, qrSize = 104 * ratio, gap = 14 * ratio, padding = 10 * ratio; // 375 667 130
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = width + padding;
    canvas.height = height + padding;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    img.src = poster;
    img.crossOrigin = "anonymous";
    try {
        img.onload = function () {
            ctx.drawImage(img, padding, padding, width - padding, height - padding);
            function createUrl() {
                var url = canvas.toDataURL("image/png");
                cb && cb(url);
            }
            function createQr() {
                var qrImg = new Image();
                qrImg.src = qr;
                qrImg.crossOrigin = "anonymous";
                var dx = width - qrSize - gap;
                var dy = height - qrSize - gap;
                qrImg.onload = function () {
                    ctx.drawImage(qrImg, dx, dy, qrSize, qrSize);
                    createUrl();
                };
            }
            if (qr) {
                createQr();
            }
            else {
                createUrl();
            }
        };
    }
    catch (e) {
        cb && cb(false);
        console.log("----e----", e);
    }
}
/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    var match = ua.match(/MicroMessenger/i);
    return match && match[0] === 'micromessenger';
}
console.log(isWeiXin());
/**
 * 取url的参数
 */
function getQuery(key) {
    var params = new URLSearchParams(location.search);
    // params.append(key, value)
    params.get(key);
}
/**
 * 高阶函数compose
 * 函数会被当成参数传入
 */
function compose(...funcs) {
    // 没有传入函数运行直接返回参数
    if (funcs.length === 0) {
        return arg => arg
    }
    // 只传入一个函数，就返回其本身
    if (funcs.length === 1) {
        return funcs[0]
    }
    // 核心代码其实就是一句reduce, reduce特性就是按顺序执行，并且将结果传递给下一次执行, 这里多说一句, reduce顺序执行多个相依赖的promise也很好用
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

/**
 * 实现Array.flat
 * 扁平化数组
 */
let sum = 0;let arr1 = [[0, 1], [2, 3], [4, [5, 6, 7]]]
const flattenArr = function (arr) {
    return arr.reduce((acc, cur) => { sum++
        return acc.concat(Array.isArray(cur) ? flattenArr(cur) : cur)
    }, [])
}
console.log(flattenArr(arr1),sum)

/**
 * 判断视图出现在屏幕内
 * ref: ref = React.createRef();
 * node : const node = this.ref.current;
 */
checkVisible = (node) => {
    if (node) {
      const { top, bottom, left, right } = node.getBoundingClientRect();
      return bottom > 0 
        && top < window.innerHeight
        && left < window.innerWidth
        && right > 0;
    }
    return false;
  }
/**
 * 电话号码设置间隔
 */
filterPhone=(phone= '00000000000')=> {
    let res = phone.replace(/^(.{3})(.*)(.{4})$/, '$1 $2 $3');
    console.log(res); // 888 8888 8888
    return res;
}
/**
 * 解决图片翻转
 * auto-orient： 0：保持原图方向，不进行自适应旋转。1：将图片进行自适应旋转。
 * 阿里云的 ?x-oss-process=image/auto-orient,1
 * 腾讯云的 ?imageMogr2/auto-orient
 */
const ossAutoOrientPath = (path) => {
    if (path.toString().indexOf('?x-oss-process=image') < 0) {
      path += '?x-oss-process=image/auto-orient,1'
    } else if (path.toString().indexOf('/auto-orient,1') < 0) {
      path += '/auto-orient,1'
    }
    return path
  }