// eslint-disable-next-line
import {BasicLayout, EditTabView, UserLayout, LoadApp} from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
import t2Routes from './asyncRoutes'

const RouteView = {
    name: 'RouteView',
    render: (h) => h('router-view')
}

export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: 'menu.home' },
        redirect: '/MainDemos/demo1',
        children: [
            {
                path: '/apps',
                component: LoadApp,
                name: 'apps',
                meta: { title: 'Apps' },
                children: [
                    {
                        path: '/app1/',
                        name: 'App1',
                        meta: { title: '/app1-/' }
                    },
                    {
                        path: '/app1/*',
                        name: 'App1All',
                        meta: { title: '/app1-/' }
                    },
                    ...t2Routes

                ]
                },
                {
                path: '/MainDemos',
                component: RouteView,
                name: 'MainDemo',
                meta: { title: 'DEMO', icon: bxAnaalyse, permission: ['dashboard'] },
                children: [
                    {
                        path: '/MainDemos/demo1',
                        name: 'Maindemo1',
                        component: () => import('@/views/Demos/demo1'),
                        meta: {
                            title: 'DEMO1',
                            keepAlive: true
                        }
                    },
                    {
                        path: '/MainDemos/demo2',
                        name: 'Maindemo2',
                        component: () => import('@/views/Demos/demo2'),
                        meta: {
                            title: 'DEMO2',
                            keepAlive: false
                        }
                    }

                ]
            }

        ]
    },
    {
        path: '*',
        redirect:
            '/404',
        hidden:
            true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
            },
            {
                path: 'register-result',
                name: 'registerResult',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
            },
            {
                path: 'recover',
                name: 'recover',
                component: undefined
            }
        ]
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    }

]
