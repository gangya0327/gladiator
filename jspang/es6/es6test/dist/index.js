var a = 1;
console.log("a1:", a);
{
    var _a = 2;
    console.log("a2:", _a);
}

var prox = new Proxy({
    add: function add(val) {
        return val + 1;
    },
    name: "yml"
}, {
    get: function get(target, key, property) {
        console.log(target[key]);
        return target[key];
    },
    set: function set(target, key, value, receiver) {
        console.log(target, key, value, receiver);
        return target[key] = value;
    }
});

console.log("name1: ", prox.name);
prox.name = "raven";
console.log("name2: ", prox.name);

function step1(resolve, reject) {
    console.log("1 开始做饭");
    if (state == 1) {
        resolve("做饭完成");
    } else {
        reject("做饭取消");
    }
}
function step2(resolve, reject) {
    console.log("2 开始吃饭");
    if (state == 1) {
        resolve("吃饭完成");
    } else {
        reject("吃饭取消");
    }
}
function step3(resolve, reject) {
    console.log("3 开始洗碗");
    state = 2;
    if (state == 1) {
        resolve("洗碗完成");
    } else {
        reject("洗碗取消");
    }
}
var state = 1;
new Promise(step1).then(function (val) {
    console.log(val);
    return new Promise(step2);
}).then(function (val) {
    console.log(val);
    return new Promise(step3);
}).then(function (val) {
    console.log(val);
});
