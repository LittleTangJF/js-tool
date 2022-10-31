const arr = [];

function toMap(arr) {
  return arr.reduce((pre, cur) => {
    pre[cur["Form"]] = cur["URL"];
    return pre;
  }, {});
}

const map = toMap([
  {
    Form: "360p",
    URL: "http1",
  },
  {
    Form: "480p",
    URL: "http2",
  },
]);
console.log(map, "*******map 打印*******");
