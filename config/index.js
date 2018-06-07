'use strict'
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/': {
              target: 'http://192.168.1.73:8888',
              changeOrigin: true,
              pathRewrite: {
                '^/': '/'
              },
      //获取排行榜
      // '/rank': {
      //   target: 'http://m.kugou.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/rank': '/rank'
      //   },
      // },
      // //获取单首音乐
      // '/app/i': {
      //   target: ' http://m.kugou.com',
      //   changeOrigin:true,
      //   pathRewrite: {
      //     '^/app/i': '/app/i'
      //   }
      // },
      // //搜索音乐
      // '/song_search_v2': {
      //   target: ' http://songsearch.kugou.com',
      //   changeOrigin:true,
      //   pathRewrite: {
      //     '^/song_search_v2': '/song_search_v2'
      //   }
      // },
      // //获取音乐地址
      // '/yy': {
      //   target: ' http://www.kugou.com',
      //   changeOrigin:true,
      //   pathRewrite: {
      //     '^/yy': '/yy'
      //   }
      },
    },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'eval-source-map',
    devtool: 'source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
