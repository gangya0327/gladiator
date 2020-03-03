class HistoryRoute {
    constructor() {
        this.current = null
    }
}

class vueRouter {
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || []
        this.history = new HistoryRoute()
        this.init()
    }
    init() {
        if (this.mode == "hash") {
            location.hash ? "" : location.hash = "/"
        }
    }
}