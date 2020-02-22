function vue() {
    this.$data = { a: 1 }
    this.el = document.getElementById("app")
    this.virtualdom = ""
    this.observer(this.$data)
    this.render()
}
// 注册get与set
vue.prototype.observer = function (obj) {
    // var value
    // var self = this
    // for (var key in obj) {
    //     value = obj[key]
    //     if (typeof value === "object") {
    //         this.observer(value)
    //     } else {
    //         Object.defineProperty(this.$data, key, {
    //             get: function () {
    //                 // 进行依赖收集
    //                 return value
    //             },
    //             set: function (newValue) {
    //                 value = newValue
    //                 self.render()
    //             }
    //         })
    //     }
    // }
    var self = this
    this.$data = new Proxy(this.$data, {
        get(target, key, receiver) {
            return target[key]
        },
        set(target, key, value, receiver) {
            target[key] = value
            self.render()
        }
    })
}
vue.prototype.render = function () {
    this.virtualdom = "i am " + this.$data.a
    this.el.innerHTML = this.virtualdom
}


// 数组监听 装饰者模式
var arraypro = Array.prototype
var arrob = Object.create(arraypro)
var arr = ["push", "pop", "shift"]
arr.forEach(function (method, index) {
    arrob[method] = function () {
        var ret = arraypro[method].apply(this, arguments)
        dep.notify()
    }
})


// Proxy

var ob = {
    a: 1,
    b: 2
}
var obj = new Proxy(ob, {
    get: function (target, key, receiver) {
        console.log(target[key], receiver);
        return target[key]

        // return Reflect.get(target.key)
    },
    set: function (target, key, value, receiver) {
        // return target[key] = value
        return Reflect.set(target.key, value)
    }
})

console.log("原对象 ", ob.a);
console.log("代理对象 ", obj.a);

/**
 * defineProperty只能监听某个属性，不能全对象监听
 * 省去for in步骤
 * 可以监听数组，不再单独对数组监听
 */

 /**
  * proxy的优点
  * 1 类型验证
  * 2 私有变量
  */