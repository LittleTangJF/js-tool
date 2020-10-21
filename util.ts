/**
 * 去掉为空或者空数组的请求参数
 */
function formatParams(params: any): object {
  for (let key in params) {
    // for 变量 in 对象 变量是对象的下标 即key
    let value = params[key];
    // Object.prototype.toString.call(value) // 判断类型 [object 类型]
    if (
      Object.prototype.toString.call(value) === "[object Array]" &&
      !value.length
    ) {
      // 当空数组
      delete params[key];
    } else if (!value) {
      // 当空 ‘’
      delete params[key];
    }
  }
  return params;
}
/**
 * 到某一个时间的倒计时，传入的参数以 (YYYY/MM/DD H:mm:ss)
 */
function getEndTime(endTime: string, onOk: Function) {
  var startDate = new Date(); //开始时间，当前时间
  var endDate = new Date(endTime); //结束时间，需传入时间参数
  var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
  var d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  } else {
    onOk();
  }
  return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
}
/**
 * 拼接参数成为url
 */
function setQueryUrl(obj: any): string {
  let url: string;
  url = Object.keys(obj).reduce((pre, cur) => {
    if (pre == "") {
      return `${cur}=${obj[cur]}`;
    }
    return pre + `&${cur}=${obj[cur]}`;
  }, "");
  return url;
}
/**
 * 解析url参数
 */
function getUrlPrmt(url:string) {

  url = url ? url : window.location.href;
  let pa = url.substring(url.indexOf('?') + 1), arrS = pa.split('&'), rs:any = {};
  for (let i = 0, len = arrS.length; i < len; i++) {
      let pos = arrS[i].indexOf('=');
      if (pos == -1) {
          continue; // 跳过此循环
      }
      let name = arrS[i].substring(0, pos), value = decodeURIComponent(arrS[i].substring(pos + 1));
      rs[name] = value;
  }
  return rs;
}
/**
 * 怎么判断一个对象是不是数组类型？
 */
function getClass(o:any){
  return Object.prototype.toString.call(o).slice(8,-1);
}
/**
 * 排序算法：冒泡排序
 */
function bubbleSort(arr: any) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {        //相邻元素两两对比
              [arr[j],arr[j + 1]] = [arr[j+1],arr[j]]  //元素交换
          }
      }
  }
  return arr;
}

console.log(bubbleSort([2,8,6,4]));