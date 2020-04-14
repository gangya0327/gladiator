const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const models = require("../db/models");

app.use(express.json());
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * 1 所有错误 status 500
 */

// 查询任务列表
app.get("/list/:status/:page", async (req, res, next) => {
  //   next(new Error("自定义异常"));
  // status: 1-待办，2-完成，3-删除,-1-全部
  let { status, page } = req.params;
  let limit = 10;
  let offset = (page - 1) * limit;
  let where = {};
  if (status != -1) {
    where.status = status;
  }
  let list = await models.Todo.findAndCountAll({
    where,
    offset,
    limit,
  });
  res.json({
    list,
    message: "查询成功",
  });
});

// 创建
app.post("/create", async (req, res, next) => {
  try {
    let { name, deadline, content } = req.body;
    // 持久化到数据库
    let todo = await models.Todo.create({
      name,
      deadline,
      content,
    });
    res.json({
      todo,
      message: "创建成功",
    });
  } catch (error) {
    next(error);
  }
});

// 修改
app.post("/update", async (req, res, next) => {
  try {
    let { name, deadline, content, id } = req.body;
    let todo = await models.Todo.findOne({
      where: id,
    });
    if (todo) {
      // 执行更新操作
      todo = await todo.update({ name, deadline, content });
    }
    res.json({
      todo,
    });
  } catch (error) {
    next(error);
  }
});

// 修改状态，删除
app.post("/update_status", async (req, res, next) => {
  try {
    let { id, status } = req.body;
    let todo = await models.Todo.findOne({
      where: id,
    });
    if (todo && status !== todo.status) {
      todo = await todo.update({ status });
    }
    res.json({
      todo,
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(3002, () => {
  console.log("todo server is running");
});
