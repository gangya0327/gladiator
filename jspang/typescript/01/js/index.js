"use strict";
var n = 12;
var s = "abc";
var arr1 = [22, 44, 55, 76, 78];
var arr2 = [12, 24, 45, 63];
// 元组类型，属于数组
var arr3 = ["aa", 22];
// 枚举类型
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["error"] = 2] = "error";
})(Flag || (Flag = {}));
var f = Flag.error;
console.log(f);
// 任意类型 :any
var oBox = document.getElementById("box");
oBox.style.color = "red";
// 可能是number，可能是null，可能是undefined
var num;
console.log(num);
// 方法没有返回值，没有类型
function run() {
    console.log("run");
}
// 函数声明式
function go1() {
    return 123;
}
// 函数表达式
var go2 = function () {
    return "gogo";
};
// 函数可选参数
function getinfo(name, age) {
    if (age) {
        console.log(name + " -- " + age);
    }
    else {
        console.log(name + " -- \u4FDD\u5BC6");
    }
}
getinfo("mark", 15);
getinfo("jack");
// 函数默认参数
function getinfo1(name, age) {
    if (age === void 0) { age = 21; }
    console.log(name + " -- " + age);
}
getinfo1("kate");
function getInfo(str) {
    if (typeof str === "string") {
        return str;
    }
    else {
        return str;
    }
}
console.log(getInfo("sam"));
console.log(getInfo(33));
// 箭头函数
