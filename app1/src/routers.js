import VueRouter from 'vue-router'

import page1 from '@/views/page1'
import page2 from '@/views/page2'
import page3 from '@/views/page3'
import home from '@/views/home'
export const routes =  [
  {title:  'home', path: '/', component: home },
  {title:'page1', path: '/page1', component: page1 },
  {title:'page2', path: '/page2', component: page2 },
  {title:'page3', path: '/page3', component: page3 },
]
const router = new VueRouter({
  base: '/portal/app1',
  mode: 'history',
  routes,
});
router.beforeEach((to, from, next) => {
  console.log('app1 route change',to)
  next()
 })

export default router
