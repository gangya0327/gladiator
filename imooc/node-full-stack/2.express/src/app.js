const express = require("express");
const userRouter = require("./router/user_router");

const app = express();

app.use("/error", (req, res) => {
  throw new Error("异常处理");
});

function error_handler_middleware(err, req, res, next) {
  if (err) {
    console.log(err);
    let { message } = err;
    res.status = 500;
    res.json({
      message: `${message}` || "异常"
    });
  } else {
    next();
  }
}

function notFound_handler(req, res, next) {
  res.json({
    message: "api不存在"
  });
}

app.use(notFound_handler);
app.use(error_handler_middleware);

app.use("/user", userRouter);

// 静态资源
app.use(
  express.static("./static", {
    extensions: ["html", "htm"]
  })
);

/**
 * 中间件，是一个函数function(err,req,res,next)
 * 1. 处理异常
 * 2. 处理业务功能，转交控制权给next
 * 3. 响应请求，响应结束，当做路由的处理函数
 * */

function valid_name_middleware(req, res, next) {
  let { name } = req.query;
  if (!name || !name.length) {
    res.json({
      message: "没有name参数"
    });
  } else {
    next();
  }
}

app.all("*", valid_name_middleware);

app.get("/test/:age", (req, res) => {
  let { age } = req.params;
  res.json({
    name: "peter",
    age
  });
});

// app.post("/name", (req, res) => {
//   res.send("peter post");
// });

app.listen(3001, () => {
  console.log("express is running");
});
