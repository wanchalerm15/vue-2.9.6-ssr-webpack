var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config')

const env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : require('../config/prod.env')

var webpackConfig = merge(baseWebpackConfig, {
    target: 'node',
    entry: {
        app: './src/entry-server.js'
    },
    devtool: false,
    output: {
        path: path.resolve(__dirname, '../', config.build.assetsRoot),
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: Object.keys(require('../package.json').dependencies),
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
})
module.exports = webpackConfig