var obj = {
    a: 1,
    b: 2
}
// 对象
var _value = obj.a
Object.defineProperty(obj, "a", {
    // writable: true,
    // enumerable: true,
    // configurable: true,
    get: function () {
        console.log("get");
        return _value
    },
    set: function (newValue) {
        console.log("set");
        _value = newValue
        return _value
    }
})

console.log(Object.getOwnPropertyDescriptor(obj, "a"));