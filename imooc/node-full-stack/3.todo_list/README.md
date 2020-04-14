# 需求说明

1. 根据不同参数（状态、页码）查询任务列表
2. 新增任务（名称，截止日期，内容）
3. 编辑任务（名称，截止日期，内容，ID）
4. 删除任务（ID)
5. 修改任务的状态（ID、状态-待办，完成）

# api 实现

## 数据库初始化

1. 创建数据库
2. 使用 sequelize-cli 初始化数据库配置信息 `npx sequelize init`
3. 生成模型文件（migrate，model 文件）`npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string`
4. 持久化模型对应的数据库表 `npx sequelize db:migrate`

## api 具体使用 ORM 模型
