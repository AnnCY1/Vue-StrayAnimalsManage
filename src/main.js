

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import router from './router';

import App from './App.vue';

import store from "./store"

Vue.use(ElementUI);
Vue.config.productionTip = false

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '5N11WdFHkBVfCUnCpH423jqVXea1OQ6I'
})


new Vue({
  router,//配置router！
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
  },

  render: h => h(App),
}).$mount('#app')
