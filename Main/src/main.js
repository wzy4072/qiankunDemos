// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import themePluginConfig from '../config/themePluginConfig'

import Storage from 'vue-ls'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'
import { dict } from '@/components/Dict/dictUtil'
import { registerMicroApps } from 'qiankun'
const options = {
    namespace: 'vuejs__', // key键前缀
    name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
    storage: 'session' // 存储名称: session, local, memory
}
Vue.prototype.$dict = function (code, value) {
    return dict(code, value)
}
// eslint-disable-next-line no-undef
 typeof globalThis !== 'undefined' ? (globalThis.Vue = Vue) : (window.Vue = Vue) //   "@fullcalendar/vue": "^5.5.0" 找不到Vue的兼容处理

Vue.use(Storage, options)

// mount axios to `V
// ue.$http` and `this.$http`
// Vue.use(VueAxios)
Vue.config.productionTip = false

// use pro-layout components

window.umi_plugin_ant_themeVar = themePluginConfig.theme

window.Vue2 = window.Vue
delete window.Vue

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')

registerMicroApps([
  {
    name: 'app1', // app name registered
    entry: '//localhost:5001',
    container: '#app-container',
    activeRule: '/app1'
  },
  {
    name: 'appT2', // app name registered
    entry: '//localhost:5002',
    container: '#app-container',
    activeRule: '/appT2'
  }
])
