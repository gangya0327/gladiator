// const os = require("os");
// const cpus = os.cpus();
// console.log(cpus.length);

// const total = os.totalmem(); // 内存数 bytes
// console.log(total / 1024 / 1024 / 1024); // gb

// const free = os.freemem(); // 剩余内存
// console.log(free);

const http = require("http");
const server = http.createServer((req, res) => {
  res.end("stay at home");
});
server.listen(3000, "127.0.0.1", () => {
  console.log("server is running");
});
