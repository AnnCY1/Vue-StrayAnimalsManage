import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router';

import App from './App.vue';

import store from "./store"

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,//配置router！
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
  },

  render: h => h(App),
}).$mount('#app')
