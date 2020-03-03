var domArr = []
var father = document.getElementById("div1")
function init() {
    var dom = document.createElement("div")
    dom.setAttribute("class", "div2")
    father.appendChild(dom)
    domArr.push(dom)
}
for (var i = 0; i < 10; i++) {
    init()
}

function run() {
    var nowStop = 0
    var finalNum = Math.floor(Math.random() * 10)
    var stopNum = 30 + finalNum
    var timer = setInterval(() => {
        var domStop = nowStop % 10
        if (domStop === 0) {
            domArr[9].setAttribute("class", "div2")
        } else {
            domArr[domStop - 1].setAttribute("class", "div2")
        }
        domArr[domStop].setAttribute("class", "div2 divon")
        if (nowStop > stopNum) {
            clearInterval(timer)
        } else {
            nowStop++
        }
    }, 100);
}
run()