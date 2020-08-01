const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config'); // webpack配置

// 编译
const compiler = webpack(webpackConfig);

// 创建一个server
const server = new webpackDevServer(compiler, {
    open: true,
    contentBase: path.join(__dirname, 'dist'),
    stats: { colors: true },
});

// 监听
server.listen('8080', '127.0.0.1', function (error) {
    console.log('start succuess！');
});
