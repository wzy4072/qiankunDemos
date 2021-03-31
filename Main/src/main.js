import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from  './routers'
import VueRouter from 'vue-router'
Vue.use(Antd);
Vue.use(VueRouter);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'app1', // app name registered
    entry: '//localhost:5001',
    container: '#app-container',
    activeRule: '/app1',
  },
]);
start();
