const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkBoxPlugin = require('workbox-webpack-plugin')

const prodConfig = {
    mode: 'production',// 选择打包模式 development，production
    //devtool:'cheap-module-eval-source-map', //传入source-map，即为开启。none为关闭 development模式下自动打开，报错会定位到开发代码，而不是压缩后的代码
    // 最佳实践 开发 'cheap-module-eval-source-map' 生产 'cheap-module-source-map'
    // sourcemap 相关文档 https://segmentfault.com/a/1190000008315937
    // https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
    // http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    // https://www.youtube.com/watch?v=NkVes0UMe9Y
    module: { //模块
        rules: [  //规则
            {
                test: /\.(css)$/, // 打包CSS文件
                use: [ // 打包需要同时使用两个loader,css-loader会分析几个css文件之间的引用关系，进而打包。
                    MiniCssExtractPlugin.loader,// style-loader是打包后将css挂在到header上,数组内loader执行顺序的从后向前
                    // 这里 MiniCssExtractPlugin 替换style-loader,CSS 代码分割
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
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        }),
        new WorkBoxPlugin.GenerateSW({ // PWA插件
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}

module.exports = prodConfig