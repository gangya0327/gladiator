### 1 用nodejs遍历文件夹打印文件路径
用js语法写的操作系统级别的平台

### 2 node版本升级
学习node原因，前端工程化
nvm，管理node版本，便于切换
> nvm ls
> nvm use v10.3.1
> nvm install v11.2.3

### 3 模块化的差异
AMD的特点，依赖前置define
CommonJS与CMD相似，耦合性比AMD高，运行时引用require()，动态引用
ESmodule是静态引入，不能写逻辑里，要在开头就引入import a from "a"，好处是可以做依赖图谱分析

### 4 图片上传
<input type="file" onchange=function(){} />
FileReader.readAsDataUrl() => base64字符串 => 预览图片src
以表单形式提交到服务器

### 5 token过期
后端页面重定向
