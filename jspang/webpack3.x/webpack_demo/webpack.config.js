const path = require("path")
const glob = require("glob")
const uglifyPlugin = require("uglifyjs-webpack-plugin")
const htmlPlugin = require("html-webpack-plugin")
const extractTextPlugin = require("extract-text-webpack-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")

var website = {
    publicPath: "http://192.168.0.103:4444/"
}

module.exports = {
    entry: {
        entry: "./src/entry.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"],
                // use: [
                //     {
                //         loader: "style-loader",
                //         // module: true
                //     },
                //     {
                //         loader: "css-loader",
                //         // module: true
                //     }
                // ]
                use: extractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { importLoaders: 1 },
                        },
                        "postcss-loader"

                    ],
                    fallback: "style-loader",
                })
                // include:
                // exclude:
                // query:
            }, {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 5000,
                        /**
                        * url-loader对未设置或者小于limit设置的图片进行转换，以base64的格式被img的src所使用；
                        * 而对于大于limit byte的图片用file-loader进行解析。
                        */
                        outputPath: "images/",
                        esModule: false
                    }
                }]
            }, {
                test: /\.(htm|html)$/i,
                use: ["html-withimg-loader"]
            }, {
                test: /\.less$/,
                // use: [{
                //     loader: "style-loader",
                // }, {
                //     loader: "css-loader",
                // }, {
                //     loader: "less-loader"
                // }]
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })
            }, {
                test: /\.scss$/,
                // use: [{
                //     loader: "style-loader"
                // }, {
                //     loader: "css-loader"
                // }, {
                //     loader: "sass-loader"
                // }]
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }, {
                test: /\.(jsx|js)$/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     presets: ["es2015", "react"]
                    // }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new uglifyPlugin()
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: "./src/index.html"
        }),
        new extractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, "src/*.html"))
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "192.168.0.103",
        compress: true,
        port: 4444
    }
}