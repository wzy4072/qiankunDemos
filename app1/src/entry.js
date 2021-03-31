import '。./public-path';
// import './app';
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from  './routers'
import VueRouter from 'vue-router'
Vue.use(Antd);
Vue.use(VueRouter);
Vue.config.productionTip = false
export async function bootstrap() {
  console.log('react app bootstraped');
}
 
export async function mount(props) {
  new Vue({ router, render: h => h(App),}).$mount(props.container ? props.container.querySelector('#root') : document.getElementById('root'))
}

export async function unmount(props) {
  console.log('react app bootstraped',props);
}

export async function update(props) {
  console.log('update props', props);
}
