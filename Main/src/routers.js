import VueRouter from 'vue-router'
import page1 from '@/views/page1'
import page2 from '@/views/page2'
import page3 from '@/views/page3'
// import childRenRoute from '@/views/childRenRoute'

export const routes = [
  {name:'home', title:'home', path: '/', component: page1 },
  {name:'page1', title:'page1', path: '/page1', component: page1 },
  {name:'page2', title:'page2', path: '/page2', component: page2 },
  {name:'page3', title:'page3', path: '/page3', component: page3 },
  {name:'chidlApp1', title:'chidlApp1', path: '/app1' },
]
const router = new VueRouter({
  // base:'/main',
  mode:'history',
  routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  console.log('main app',to)
  next()
 })
export default router