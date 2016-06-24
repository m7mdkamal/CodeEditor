var webpack = require('webpack');
var path = require('path');

var config = {
    entry: [
        'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://' + require("ip").address() + ':8001',
        './src/main.js'
    ],
    resolve: {
        root: [
            path.resolve(__dirname, './src')
        ],
        extensions: ['', '.js', '.json', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'

            }
        ]
    }
};

module.exports = config;