const path = require('path')
const HtmlWebapckPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',// 选择打包模式 development，production
    //devtool:'cheap-module-eval-source-map', //传入source-map，即为开启。none为关闭 development模式下自动打开，报错会定位到开发代码，而不是压缩后的代码
    // 最佳实践 开发 'cheap-module-eval-source-map' 生产 'cheap-module-source-map'
    // sourcemap 相关文档 https://segmentfault.com/a/1190000008315937
    // https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
    // http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    // https://www.youtube.com/watch?v=NkVes0UMe9Y
    entry:{
        main:'./src/main.js'// 入口文件地址
    },
    devServer: {
        //contentBase:'./dist', // webpack4写法
        static:'./dist',
        open: true, // 会自动的打开浏览器
        port: 5589, // webpack服务启动端口
        // proxy:{ // 跨域代理
        //     'api':'http:127.0.0.1:3000'
        // }
    },
    module:{ //模块
        rules: [  //规则
            {
                test: /\.(css)$/, // 打包CSS文件
                use:[ // 打包需要同时使用两个loader,css-loader会分析几个css文件之间的引用关系，进而打包。
                    'style-loader',// style-loader是打包后将css挂在到header上,数组内loader执行顺序的从后向前
                    {
                        loader:'css-loader', // css-loader 打包css
                        options: {
                            importLoaders:2, //通过import引入的文件，在此之前要被前两个loader打包一遍
                            //modules:true   // CSS 模块化
                        }
                    },
                    'postcss-loader' // post-loader 自动增加厂商前缀，用来支持css新特性,需要postcss.config.js配置文件
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, 
                use:{
                    loader: 'url-loader', //使用url-loader时，要安装好file-loader // 使用file-loader打包jpg图片  url-loader能实现file-loader的所有功能，将图片打包成base64
                    options:{
                        name: '[name]_[hash].[ext]', // 打包后的名称，name为图片原始名称，ext为图片原始格式后缀
                        outputPath:'images/', //打包输出路径
                        //publicPath: path.join(__dirname,'./dist/images/'), //引用打包输出路径，使用绝对路径，否则会在html相对路径下寻找
                        limit:2048 // 大于2048字节，即2KB，小于2KB打包成base64，大于2KB会被打包进dist
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(), // 每次打包之前，把dist目录先删除
        new HtmlWebapckPlugin({
            template:'src/view/index.html', // 模板文件
            cache: false // 关闭内存
        }), // 会在打包结束后，自动生成一个html文件，并把大后生成的js引入到这个html文件中
    ],
    output:{
        //publicPath: '/',  //会在html模板中，引入的js的地址前生成前缀
        filename: 'bundle.js', // 文件名，这里可以使用占位符
        path: path.join(__dirname, 'dist') // 打包出口地址
    }
}