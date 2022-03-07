import fs from "fs";
import { exec } from "child_process";
/**
 *读取文件并生成text
 **/
async function readFileToTxt(pathName) {
  try {
    let files = await fs.readdirSync("/Users/tking/Pictures");
    console.log(files, "*******err1, files 打印*******");
    // if (!files) {
    //   return console.log("目录不存在");
    // }
    files = files.filter((d) => d.includes(".png"));

    let content = files.reduce((pre, cur) => {
      let last = `file '/Users/tking/Pictures/${cur}'\n`;
      return (pre += last);
    }, "");
    console.log(content);
    let res = await fs.writeFileSync(
      "/Users/tking/Pictures/test.txt",
      content,
      {
        flag: "w+",
        encoding: "utf8",
      }
    );
    console.log(res, "*******res 打印*******");
    // if (!res) {
    //   console.error(err);
    //   return;
    // }
    return "success";
  } catch (error) {
    console.log(error);
  }
}
let res = readFileToTxt();
if (res) {
  console.log(1111, "*******1111 打印*******");
  exec("ls", (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

// ffmpeg -f concat -i file.txt -c copy output.mp4
