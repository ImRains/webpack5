const path = require('path')
const HtmlWebapckPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

const commonConfig = {
    entry: {
        main: './src/main.ts'// 入口文件地址
    },
    module: { //模块
        rules: [  //规则
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
                    //plugins: ["@babel/plugin-syntax-dynamic-import"] 目前没有安装
                }
            },
            {
                test: /\.(tsx|ts)?$/,
                exclude: /node_modules/,
                use: 'ts-loader', // 需要同时安装ts—loader 和 typescript
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 每次打包之前，把dist目录先删除
        new HtmlWebapckPlugin({   // 会在打包结束后，自动生成一个html文件，并把大后生成的js引入到这个html文件中
            template: 'src/view/index.html', // 模板文件
            cache: false // 关闭内存
        }),
        new webpack.ProvidePlugin({  // Shimming
            $: 'jquery' // 当文件匹配到 $ 符号时，会自动引入jquery模块
        })
    ],
    optimization: {
        usedExports: true,           // 因为 @babel/polyfill-fill没有导出，所以会被tree shaking给丢弃，这里要配置一下
        splitChunks: { // code splitting 代码分割 ，lodash这种库就会被区分
            chunks: 'all', // async 异步代码分割 all 所有代码分割
            minSize: 20000, // 引入的包的大小大于2000字节，即20kb，则才开始代码分割
            minChunks: 1, // 引用最少1次，才进行代码分割
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
        filename: '[name].[contenthash].js',   // 文件名，这里可以使用占位符 ，入口文件取filename
        chunkFilename: '[name].[contenthash].chunk.js', // 文件名 , chunk 文件取 chunkFilename  contenehash 为了防止缓存
        path: path.join(__dirname, 'dist') // 打包出口地址
        //library: 'library', // 打包生成的方法挂载到library，可以供script标签直接引用
        //libraryTarget:'umd',// 打包生成的library支持各种模块引用 // this window global umd
        //搭配externals:'lodash'，可以把引入的lodash模块排除打包
    }
}

module.exports = ()=>{
    if(process.env.NODE_ENV === 'dev'){
        return merge(commonConfig, devConfig)
    }else{
        return merge(commonConfig, prodConfig)
    }
}