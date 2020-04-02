const https = require("https");
const path = require("path");
const fs = require("fs");

let req = https.request("https://www.baidu.com", res => {
  if (
    (res.statusCode >= 200 && res.statusCode < 300) ||
    res.statusCode === 304
  ) {
    console.log("ok", res.statusCode);
    let stream;
    res.on("data", data => {
      stream = data; // 流的形式传递
    });
    res.on("end", () => {
      let dataPath = path.resolve(__dirname, "data") + "/spider.html";
      // 创建流
      let write = fs.createWriteStream(dataPath);
      // 编码
      write.write(stream, "UTF8");
      // 标记文件末尾
      write.end();

      // 处理流
      write.on("finish", () => {
        console.log("success");
      });

      // 处理出错
      req.on("error", err => {
        console.log(err);
      });
    });
  } else {
    console.log("error", res.statusCode);
  }
});

// 发送post请求，模拟人的真实请求
req.write("");

// 正式发送
req.end();
