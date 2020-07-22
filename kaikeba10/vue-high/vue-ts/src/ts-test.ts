// 类型注解
let name1: string | object;
name1 = "tom";
name1 = { name: "tom" };

// 类型推论
let name2 = "jerry";

// 数组类型
let names: string[];
names = [];
names.push("mike");

// 任意类型
let foo: any = "sss";
foo = 123;

// 函数类型
function greeting(person: string): string {
  return "hello " + person;
}
greeting("peter");

// 常见内置类型：string，number，boolean，void，any

// 函数
// name和age是必传参数，要变成可选，加?，可选参数在必选参数后面
function sayhello(name: string, age: number = 18, addr?: string): string {
  return "你好 " + name + " " + age;
}

sayhello("peter");
sayhello("peter", 21);
sayhello("peter", 21, "china");
