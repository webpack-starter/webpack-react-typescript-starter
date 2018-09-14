const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

const bableLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      [
        'env',
        {
          modules: false, // 保留es6模块化的语句，为了tree shaking
        },
      ],
      'stage-2',
      'react'
    ],
    plugins: [
      [
        'transform-runtime',
        {
          "polyfill": true
        }
      ],
    ]
  },
};

module.exports = function (err, webpackConfig) {
  if (err) {
    console.log('err:', err);
    return;
  }
  const prod = webpackConfig.mode === 'production';
  return {
    entry: './src/index.tsx',
    output: {
      filename: '[name]_[hash:8].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: prod ? false : 'source-map',
    watchOptions: {
      ignored: /node_modules/,
    },
    devServer: {
      hot: true,
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve('src'),
        components: path.resolve('src', 'components'),
        containers: path.resolve('src', 'containers'),
        utils: path.resolve('src', 'utils'),
        config: path.resolve('src', 'utils', 'config'),
      },
      extensions: ['.ts', '.tsx', '.js'],
      modules: [path.resolve(__dirname, 'node_modules')],
      // 因为使用webpack4的tree shaking功能了，所以针对npm的第三方模块，优先使用es6模块语法
      mainFields: ['jsnext:main', 'browser', 'main'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            bableLoader,
            {
              loader: 'ts-loader'
            }
          ],
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: /\.js$/,
          use: [
            bableLoader,
          ],
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: [
            /\.css$/,
            /\.less$/,
          ],
          exclude: /node_modules/,
          use: [
            // MiniCssExtractPlugin.loader,
            {
              loader: 'style-loader',
              options: {
                singleton: true,
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: true, // css支持css-modules模块功能
                ocalIdentName: '[name]__[local]-[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-preset-env')(),
                  require('precss')(),
                  require('postcss-cssnext')(),
                ]
              }
            },
          ],
        }
      ]
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      // 缓存插件，提升性能
      new HardSourceWebpackPlugin(),
      new htmlWebpackPlugin({
        title: '首页',
        filename: 'index.html',
        template: './entry.ejs',
      }),
      // new MiniCssExtractPlugin({
      //   filename: '[name].css',
      //   chunkFilname: '[id].css',
      // })
    ]
  }
}
