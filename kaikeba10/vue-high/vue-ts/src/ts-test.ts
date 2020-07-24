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

// 重载：参数数量或者类型或者返回类型不同，函数名相同
// 先声明后实现
function info(a: object): string;
function info(a: string): object;
function info(a: any): any {
  if (typeof a === "object") {
    return a.name;
  } else {
    return { name: a };
  }
}
info({ name: "tom" });
info("tome");

// class 面向对象
class Shape {
  public area: number;
  protected color: string;
  constructor(color: string, width: number, height: number) {
    this.area = width * height;
    this.color = color;
  }
  public shoutout() {
    return (
      "I'm " + this.color + " with an area of " + this.area + " cm squared."
    );
  }
}

class Square extends Shape {
  constructor(color: string, side: number) {
    super(color, side, side);
    // console.log(this.color);
  }
  public shoutout() {
    return "我是" + this.color + "面积是" + this.area + "平方厘米。";
  }
}

const square = new Square("blue", 2);
// console.log(square.shoutout());
square.shoutout();

// 接口
interface Person {
  firstName: string;
  lastName: string;
}
function greeting1(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
const user = { firstName: "peter", lastName: "jack" };
// console.log(user);
// console.log(greeting1(user));
greeting1(user);
