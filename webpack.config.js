const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/script/app.jsx',
    output: {
        filename: 'bundle.js?[hash]',
        path: 'dist/script'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    cacheDirectory: './src/cache'
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    devServer: {
        inline: true,
        contentBase:'./src'
    },
    devtool: "source-map",
    plugins: [
        new ExtractTextPlugin("../css/[name].css?[hash]"),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        }),
    ]
};