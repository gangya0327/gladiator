function getme() {
    var men = process.memoryUsage()
    var format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + "MB"
    }
    console.log("heapTotal", format(men.heapTotal), "heapUsed", format(men.heapUsed));
}
getme()