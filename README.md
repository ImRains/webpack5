# webpack5
webpack5 配置


webpack 性能优化
1. 跟上技术的迭代（更新node、webpack）
2. 尽可能少的模块上应用loader，给loader限定压缩范围
3. Plugin尽可能少的使用，并确保其可靠性和性能
4. 尽可能的写清晰引用路径，减少resolve的配置
5. 使用DllPlugin提高打包速度
6. 控制包文件大小
7. 多进程打包 thread-loader,parallel-webpack,happypack
8. 合理使用sourceMap
9. 开发环境内存编译
10. 开发环境无用插件剔除