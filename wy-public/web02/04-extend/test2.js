/**
 * 观察者模式
 */
var Observer = {
    _message: {},
    regist: function (type, fn) {
        // 订阅消息
        if (!this._message[type]) {
            this._message[type] = fn
        } else {
            this._message[type], push(fn)
        }
    },
    fire: function (type) {
        // 触发
        var len = this._message[type].length
        for (var i = 0; i < len; i++) {
            this._message[type][i].call(this)
        }
    },
    remove: function () {
        // 删除
        var i = this._message[type].length - 1
        for (; i >= 0; i--) {
            this._message[type][i] === fn && this._message[type].splice(i, 1)
        }
    }
}
Observer.regist("model1sendmodel2",function(){
    console.log("this is model1 send model2");
})
Observer.fire("model1sendmodel2")
// 低耦合