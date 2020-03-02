/**
 * 装饰者模式：当已有方法不满足新的需求，需要复用并迭代开发
 */
function a() {
    console.log("aaa")
}
function b() {
    a()
    console.log("bbb")
}

// 对ajax请求添加loading功能
$.ajax()
var ajax = function () {
    ajax.call(this)
    loading()
}

/**
 * 适配器模式：当一个对象的api参数，不满足另一个api方法的使用
 */
function dog() {

}
dog.prototype.run = function () {
    console.log("run");
}
dog.prototype.bark = function () {
    console.log("bark");
}
function bird() {

}
bird.prototype.sing = function () {
    console.log("sing");
}
bird.prototype.fly = function () {
    console.log("fly");
}
function dogAdapter(dogObj){
    this.dogObj = dogObj
}
dogAdapter.prototype = new bird()
dogAdapter.prototype.fly()