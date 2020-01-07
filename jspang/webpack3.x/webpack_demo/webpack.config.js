const path = require("path")
const uglify = require("uglifyjs-webpack-plugin")

module.exports = {
    entry: {
        entry: "./src/entry.js",
        entrymany: "./src/entrymany.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"]
                // loader: ["style-loader", "css-loader"]
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            }
        ]
    },
    plugins: [
        new uglify()
    ],
    // optimization: {
    //     minimizer: [new uglify()]
    // },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: '192.168.108',
        compress: true,
        port: 1414
    }
}