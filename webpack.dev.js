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
    module: { //模块
        rules: [  //规则
            {
                test: /\.(css)$/, // 打包CSS文件
                use: [ // 打包需要同时使用两个loader,css-loader会分析几个css文件之间的引用关系，进而打包。
                    'style-loader',// style-loader是打包后将css挂在到header上,数组内loader执行顺序的从后向前
                    {
                        loader: 'css-loader', // css-loader 打包css
                        options: {
                            importLoaders: 2, //通过import引入的文件，在此之前要被前两个loader打包一遍
                            //modules:true   // CSS 模块化
                        }
                    },
                    'postcss-loader' // post-loader 自动增加厂商前缀，用来支持css新特性,需要postcss.config.js配置文件
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()   // HRM，热更新插件，webpack内置插件
    ]
}

module.exports = merge(commonConfig, devConfig)