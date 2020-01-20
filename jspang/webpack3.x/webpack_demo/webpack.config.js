const path = require("path")
const uglifyPlugin = require("uglifyjs-webpack-plugin")
const htmlPlugin = require("html-webpack-plugin")

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
                use: ["style-loader", "css-loader"],
                use: [
                    {
                        loader: "style-loader",
                        // module: true
                    },
                    {
                        loader: "css-loader",
                        // module: true
                    }
                ]
                // include:
                // exclude:
                // query:
            },
        ]
    },
    plugins: [
        new uglifyPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "192.168.0.106",
        compress: true,
        port: 4444
    }
}