const path = require("path")

module.exports = {
    context: path.join(__dirname, "src/main/web"),
    mode: "development",
    devtool: "source-map",
    output: {
        path: path.resolve("./src/main/resources/assets/bundle/"),
        filename: "[name].js"
    },
    node: {
        process: false,
        Buffer: false
    },
    resolve: {
        alias: { "./dist/cpexcel.js": "" }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            }
        ],
        noParse: [
            /xlsx.core.min.js/,
            /xlsx.full.min.js/
        ]
    },
    entry: {
        entry: "./js/entry.js"
    }
}