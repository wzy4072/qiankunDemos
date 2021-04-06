// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
// import { VueAxios } from './utils/request'
// import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import ProLayout, { PageHeaderWrapper } from '@/components/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import KFormItem from '@/components/FormDesign/KFormItem'
import { STable } from '@/components'

// 解决关闭所有时，draggable报错
import draggable from 'vuedraggable' // global style
import Storage from 'vue-ls'
import DictSelect from '@/components/Dict/DictSelect'
import DictMultiSelect from '@/components/Dict/DictMultiSelect'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'
import { dict } from '@/components/Dict/dictUtil'
import { registerMicroApps, start } from 'qiankun'

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
Vue.use(KFormItem)
Vue.use(draggable)

// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('dict-select', DictSelect)
Vue.component('dict-multi-select', DictMultiSelect)
Vue.component('STable', STable)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

window.Vue2 = window.Vue; window.Vue = undefined

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
  }
])
