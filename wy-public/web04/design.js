// 外观模式：细分接口，但给别人调用的接口，必须集合起来

function a() {
  console.log('功能1')
  console.log('功能2')
}

function a1() {
  console.log('功能1')
}

function a2() {
  console.log('功能2')
}

function a() {
  a1()
  b1()
}

// 惰性模式：如果一个方法，他的状态一开始就决定了，而且后面还会多次调用

// a开始时随机传入，后面不会变动
var a = 10
// b在很多地方要被调用
function b() {
  if (a === 10) {
    return b = function () {
      console.log(1)
    }
  } else {
    return b = function () {
      console.log(2)
    }
  }
}
b()

// 装饰者模式
function add(a, b) {
  return a + b
}
function myadd(a, b) {
  var num = add(a, b)
  console.log(num)
  return num
}

dom.onClick = function () {
  dom.style.color = 'red'
}
function decorator(dom, fn) {
  var old = dom.onClick
  dom.onClick = function () {
    old()
    fn()
    dom.style.backGroundColor = 'blue'
  }
}

// 状态模式：解决if-else
function action(action) {
  // if (action === 'run') {
  //   console.log('run')
  // } else if (action === 'shoot') {
  //   console.log('shoot')
  // } else if (action === 'jump') {
  //   console.log('jump')
  // } else if (action === 'jump' && action === 'shoot') {
  //   console.log('jump && shoot')
  // }
  // actionState.actionList[action]()
  actionState.actionAdd(action)
  actionState.actionFire()
}

var actionState = {
  actionList: {
    run: function () { },
    jump: function () { },
    eat: function () { },
  },
  actionArr: [],
  actionAdd: function () {
    this.actionArr.push(action)
  },
  actionFire: function () {
    this.actionArr.forEach(item => {
      this.actionList[item]()
    })
    this.actionArr = []
  }
}

// 观察者模式：解决模块之间的沟通问题
var observe = {
  list: {},
  on: function (way, fn) {
    this.list[way] = fn
  },
  fire: function (way) {
    this.list[way]
  },
  delete: function (way) {
    this.list[way] = undefined
  }
}
var timeCounter = {
  time: 1000,
  timer: null,
  num: 0,
  hasCount: 0,
  run: function () {
    this.timer = setInterval(() => {
      this.count()
    }, time);
  },
  count: function () {
    this.num++
    this.hasCount++
    if (this.hasCount === 10) {
      this.hasCount = 0
      observe.fire('finish')
    }
  },
  begin: function () {
    this.run()
    this.observe.on('finish', () => {
      this.time += 1000
      clearInterval(this.timer)
      this.run()
    }, bind(this))
  }
}

