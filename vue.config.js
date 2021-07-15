'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const CopyWebpackPlugin = require("copy-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || '2U商城-商铺管理系统' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: './', //基本路径  /打包配置优化时加 点 .
  outputDir: 'dist',  //配置文件中的值，用于修改打包文件名称
  filenameHashing: false,     // build之后生成的静态资源默认情况下加了hash值以控制静态资源的缓存，默认是true
  assetsDir: 'static', //输出的资源，所在的文件夹
  lintOnSave: process.env.NODE_ENV === 'development',// 配置文件中的值，用于修改打包文件名称
  productionSourceMap: false,// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    open: true,   // 配置自动启动浏览器 true/false.
    overlay: {
      warnings: false,
      errors: true
    },
    host: "0.0.0.0",
    port: 8888, //端口号
    https: false, //Boolean
    hotOnly: true, //热更新
    proxy: {
      "/dev-api": {
            // target: 'http://192.168.31.99:9006',
            // jxh466480    15803466480
            target: 'http://2utest.2uchat.cn/2umallanminapi',
            changeOrigin: true, //允许跨域
            ws: true, //websocket支持
            pathRewrite: { //表示需要rewrite重写的
                '^/dev-api': '',
            }
        },
    },
    // 假数据 测试数据
       // before: require('./mock/mock-server.js'),
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: "./static", to: 'static' }
      ]),
    ]
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
