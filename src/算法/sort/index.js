// 生成10万条 随机数组
export const randomArr = () => {
  return shuffle([...new Uint8Array(1000000)].map((item, i) => i + 1));
};

function shuffle(arr) {
  let m = arr.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [arr[m], arr[index]] = [arr[index], arr[m]];
  }
  return arr;
}

// 生成10条 相同数字数组
export const sameArr = () => {
  return new Array(1000000).fill(2);
};
