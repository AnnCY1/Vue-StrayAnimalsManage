const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
    devServer: {
      proxy: {
          '/api': {
              target: 'http://yingyan.baidu.com/api/v3/',
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  },

})



