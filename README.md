# React SSR for dva

基于dva的React服务端渲染架构

### Feature

- 基于dva、react16、react-router4，commonjs风格的node代码
- server-side-rendering服务端渲染，最大程度复用client和server代码。
- 配置livereload和hotModuleReplacement，dev下server和client同步热更。
- 提取manifest，vendors，配置文件hash，便于使用cdn管理资源。
- 配置nodemon使得修改配置文件后自动重启，设置eslint钩子保证代码质量，代码压缩。
- 内置svg-sprite-loader、pxtorem等强大移动端配置




