const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const baseConfig = require("./webpack.base.config");
const {baseDir, distDir, landingPagesDir} = require("./buildParameter");

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        path: distDir, // hier geht das JS file hin (relativ zur Konfig)
        publicPath: "/",                           // das wird im script-tag davorgestellt
        filename: "[hash].bundle.js"               // so heißt das JS file
    },
    plugins: [
        new CleanWebpackPlugin([distDir], {root: baseDir, exclude: [".gitkeep"]}),
        new HtmlWebpackPlugin({
            template: path.resolve(landingPagesDir, "src/index.html"), // hier kommt das index.html her (relativ zur Konfig)
            filename: "./index.html"  // hier geht das index.html hin (relativ zum output-Directory)
        }),
        new webpack.DefinePlugin({
            "process.env": {
                IS_IN_WEBPACK: true,
                NODE_ENV: '"production"'
            }
        }),
        new CopyWebpackPlugin([
            {from: path.resolve(baseDir, "/public/images"), to: path.resolve(distDir, "images")},
        ])
    ],
    optimization: {
        minimize: true
    },
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
                test: /\.css$/, use: [
                    {loader: "style-loader"},
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            {test: /\.(eot|png|svg|ttf|woff|woff2)$/, use: [{loader: "url-loader"}]}
        ]
    }
});
