# webpack-react-typescript-starter
>基于`webpack`4 + `typescript`的`react`脚手架

## 介绍

-  基于[webpack](https://github.com/webpack/webpack)4来作为构建工具，执行`build`命令时自动进行`tree shaking`和`scope hoisting`优化
-  基于[ts-load](https://github.com/TypeStrong/ts-loader)解析`typescript`
-  基于[postcss](https://github.com/postcss/postcss)管理css，使用了[precss](https://github.com/jonathantneal/precss)和[cssnext](https://github.com/MoOx/postcss-cssnext)插件
-  除了[webpack](https://github.com/webpack/webpack)自带的优化外，本框架还用了[hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin)插件进行了缓存处理
-  基于[rimraf](https://github.com/isaacs/rimraf)，解决了每次`npm run build`后dist文件夹里会残留之前的文件问题

## 存在的问题

-  因为[webpack-dev-server](https://github.com/webpack/webpack-dev-server)打开浏览器是直接使用[opn](https://github.com/sindresorhus/opn)，而非[create-react-app](https://github.com/facebook/create-react-app)会使用[react-dev-utils/openBrowser](https://github.com/facebook/create-react-app/blob/next/packages/react-dev-utils/openBrowser.js)对苹果谷歌做优化处理，所以每次重启服务时都会重新打开一个浏览器tab页。
