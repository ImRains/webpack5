const webpack = require('webpack')
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

const devConfig = {
    mode: 'development',// 选择打包模式 development，production
    //devtool:'cheap-module-eval-source-map', //传入source-map，即为开启。none为关闭 development模式下自动打开，报错会定位到开发代码，而不是压缩后的代码
    // 最佳实践 开发 'cheap-module-eval-source-map' 生产 'cheap-module-source-map'
    // sourcemap 相关文档 https://segmentfault.com/a/1190000008315937
    // https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
    // http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    // https://www.youtube.com/watch?v=NkVes0UMe9Y
    devServer: {
        //contentBase:'./dist', // webpack4写法
        static: './dist', // 编译后，html所在目录地址
        open: true, // 会自动的打开浏览器
        port: 5589, // webpack服务启动端口
        // hot:true, // 开启 HotModuleReplacement 热模块更新 引用HotModuleReplacementPlugin插件自动配置，无须手动添加
        // hot:'only' 启用热模块替换功能，在构建失败时不刷新页面作为回退
        // proxy:{ // 跨域代理
        //     'api':'http:127.0.0.1:3000'
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()   // HRM，热更新插件，webpack内置插件
    ],
    optimization: { //开发模式下增加tree shaking，同时配置packagejson里面配置sideEffects，配置项为需要不需要treeshaking的模块，配置项数组
        usedExports: true           // 因为 @babel/polyfill-fill没有导出，所以会被tree shaking给丢弃，这里要配置一下
        // production 模式下不需要添加该配置项
    }
}

module.exports = merge(commonConfig, devConfig)