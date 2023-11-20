'use strict'

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./App/";

module.exports = {
    entry: [
        srcFolder + "index.jsx"
    ],
    output: {
        filename: "bundle.js",
        publicPath: "assets/",
        path: path.resolve(__dirname, bundleFolder),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /(node-modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-function-bind",
                        "@babel/plugin-transform-parameters",
                        "@babel/plugin-transform-spread"]
                }
            },
            {
                test: /\.css$/i,
                use: ['css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                loader: 'file-loader'
            },
        ],
    },
};
