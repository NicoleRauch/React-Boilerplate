const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.base.config");

const localPort = "3000";

module.exports = (env = {}) => {
    const proxiedServer = env.PROXIED_SERVER;

    return merge(baseConfig, {
        mode: "development",
        devServer: {
            contentBase: "./build",
            lazy: false,     // always compile immediately in order to save time
            compress: false, // do not spend time on this
            host: "0.0.0.0", // server is also available externally
            overlay: {       // overlay for compiler issues
                warnings: true,
                errors: true
            },
            port: localPort,
            hot: true,       // hot module replacement
            historyApiFallback: true,
            proxy: {"/": proxiedServer}
        },
        devtool: "source-map",
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html"
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    IS_IN_WEBPACK: true,
                    NODE_ENV: '"development"'
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{loader: "babel-loader"}]
                },
                { test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [{loader: "ts-loader"}]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {loader: "style-loader"},
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: "style-loader"},
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {test: /\.(eot|png|svg|ttf|woff|woff2)$/, use: [{loader: "url-loader"}]}
            ]
        }
    })
};
