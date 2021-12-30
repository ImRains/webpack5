const path = require('path')
const HtmlWebapckPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: './src/main.js'// 入口文件地址
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
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: {
                    loader: 'url-loader', //使用url-loader时，要安装好file-loader // 使用file-loader打包jpg图片  url-loader能实现file-loader的所有功能，将图片打包成base64
                    options: {
                        name: '[name]_[hash].[ext]', // 打包后的名称，name为图片原始名称，ext为图片原始格式后缀
                        outputPath: 'images/', //打包输出路径
                        //publicPath: path.join(__dirname,'./dist/images/'), //引用打包输出路径，使用绝对路径，否则会在html相对路径下寻找
                        limit: 2048 // 大于2048字节，即2KB，小于2KB打包成base64，大于2KB会被打包进dist
                        // 好处是减少http请求
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // 将ES6转为ES5，需要babel-loader @babel/core
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {   // 使用babel插件 需要安装corejs
                                useBuiltIns: 'usage', //存疑？？？ 改为usage，使用require就存在报错 
                                // 使用entry的时候，需要在入口文件引入 import "@babel/polyfill"
                                corejs: 3
                            }
                        ],
                        [
                            '@babel/preset-react' // 编译react代码,由下网上执行
                        ]
                    ],
                    sourceType: 'unambiguous', // 解决ES6和CommonJS模块导出的问题: https://babeljs.io/docs/en/options#sourcetype
                    // 让babel和webpack一样严格区分commonJS文件和ES6文件。
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 每次打包之前，把dist目录先删除
        new HtmlWebapckPlugin({   // 会在打包结束后，自动生成一个html文件，并把大后生成的js引入到这个html文件中
            template: 'src/view/index.html', // 模板文件
            cache: false // 关闭内存
        })
    ],
    optimization: {
        splitChunks: { // code splitting 代码分割 ，lodash这种库就会被区分
            chunks: 'all', // async 异步代码分割 all 所有代码分割
            minSize: 20000, // 引入的包的大小大于2000字节，即20kb，则才开始代码分割
            minChunks: 1, // 因为最少2次，才进行代码分割
            maxAsyncRequests: 30, // 最多可以代码分割30个文件，超出后则不分割
            maxInitialRequests: 30, // 入口文件代码分割不超过30个文件
            enforceSizeThreshold: 50000,
            name:(module, chunks, cacheGroupKey) => {
                const allChunksNames = chunks.map((chunk) => chunk.name).join('~');
                const prefix = cacheGroupKey === 'defaultVendors' ? 'vendors' : cacheGroupKey;
                return `${prefix}~${allChunksNames}`;
            },
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, // 优先级 -10 > -20
                    reuseExistingChunk: true, // 如果一个模块已经打包过，则不重复打包，直接复用
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true, // 如果一个模块已经打包过，则不重复打包，直接复用
                    filename: 'common.js'
                },
            },
        }
    },
    output: {
        //publicPath: '/',     //会在html模板中，引入的js的地址前生成前缀
        filename: '[name].js',   // 文件名，这里可以使用占位符
        path: path.join(__dirname, 'dist') // 打包出口地址
    }
}