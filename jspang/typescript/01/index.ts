var n: number = 12
var s: string = "abc"
var arr1: number[] = [22, 44, 55, 76, 78]
var arr2: Array<number> = [12, 24, 45, 63]
// 元组类型，属于数组
var arr3: [string, number] = ["aa", 22]
// 枚举类型
enum Flag { success = 1, error = 2 }
var f = Flag.error
console.log(f)
// 任意类型 :any
var oBox: any = document.getElementById("box")
oBox.style.color = "red"
// 可能是number，可能是null，可能是undefined
var num: number | null | undefined
console.log(num);
// 方法没有返回值，没有类型
function run(): void {
    console.log("run");
}
// 函数声明式
function go1(): number {
    return 123
}
// 函数表达式
var go2 = function (): string {
    return "gogo"
}
// 函数可选参数
function getinfo(name: string, age?: number) {
    if (age) {
        console.log(`${name} -- ${age}`);
    } else {
        console.log(`${name} -- 保密`);
    }
}
getinfo("mark", 15)
getinfo("jack")
// 函数默认参数
function getinfo1(name: string, age: number = 21) {
    console.log(`${name} -- ${age}`);
}
getinfo1("kate")
// 三点运算符
// 函数重载
function getInfo(name: string): string;
function getInfo(age: number): number;
function getInfo(str: any): any {
    if (typeof str === "string") {
        return str
    } else {
        return str
    }
}
console.log(getInfo("sam"));
console.log(getInfo(33));
// 箭头函数

