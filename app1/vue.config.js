const { name } = require('./package');
module.exports = {
  devServer: {
    port: 5001,
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://192.168.1.243:8443`,
        // target: `http://192.168.2.155:8443`,// wrc
        // target: `http://192.168.2.96:8443`, // ky
        // target: `http://192.168.2.230:8443`, // dq
        target: `http://192.168.1.128:8443`, // fcf
        // target: `http://192.168.2.154:8443`, // hyl
        // target: `http://192.168.1.51:8443`, // hx
        // target: `http://192.168.2.197:8443`, // ax
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `app2`,
      libraryTarget: 'umd',// 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};

