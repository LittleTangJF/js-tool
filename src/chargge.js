const st = 120343;
export const changeToVision = (s) => {
  s = JSON.stringify(s);
  if (s?.length) {
    let res = s[0];
    for (let index = 1; index < s?.length; index++) {
      const element = s[index];
      if (index % 2 === 0 && index < 5) {
        res = `${res}.${element}`;
      } else {
        res = res + element;
      }
    }
    let arr = res?.split(".");
    arr = arr?.map((item) => Number(item));
    return arr?.join(".");
  }
};

export const changeToVision1 = (str) => {
  str = JSON.stringify(str);
  let arr = [],
    num = "";
  let i = 0;
  while (i < str.length) {
    num = str.slice(i, i + 2);
    arr.push(parseInt(num));
    i += 2;
  }
  const res = arr.join(".");
  return res;
};
export const changeVisionToStr = (s) => {
  if (s?.length) {
    let arr = s?.split(".")?.map((item) => {
      if (Number(item) > 9) {
        return item;
      } else {
        return `0${item}`;
      }
    });
    return arr?.join("");
  }
};
console.log(changeVisionToStr("1.1.4"), "*******changeToVision1() 打印*******");
