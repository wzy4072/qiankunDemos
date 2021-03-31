import VueRouter from 'vue-router'
import page1 from '@/views/page1'
import page2 from '@/views/page2'
import page3 from '@/views/page3'

export const routes = [
  {title:  'home', path: '/app2/', component: page1 },
  {title:'page1', path: '/app2/page1', component: page1 },
  {title:'page2', path: '/app2/page2', component: page2 },
  {title:'page3', path: '/app2/page3', component: page3 },
]
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


export default router