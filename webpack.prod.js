const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

const prodConfig = {
    mode: 'production',// 选择打包模式 development，production
    //devtool:'cheap-module-eval-source-map', //传入source-map，即为开启。none为关闭 development模式下自动打开，报错会定位到开发代码，而不是压缩后的代码
    // 最佳实践 开发 'cheap-module-eval-source-map' 生产 'cheap-module-source-map'
    // sourcemap 相关文档 https://segmentfault.com/a/1190000008315937
    // https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
    // http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    // https://www.youtube.com/watch?v=NkVes0UMe9Y
}

module.exports = merge(commonConfig, prodConfig)