// eslint-disable-next-line
import {BasicLayout, EditTabView, UserLayout, LoadApp} from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

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
        redirect: '/demos',
        children: [
            {
                path: '/apps',
                component: LoadApp,
                name: 'apps',
                meta: { title: 'Apps' },
                children: [
                    {
                        path: '/app1/',
                        name: 'App1/',
                        meta: { title: '/app1-/' }
                    },
                    {
                        path: '/app1/*',
                        name: 'App1/',
                        meta: { title: '/app1-/' }
                    },
                    {
                        path: '/appT2/system',
                        name: 'SystemPlatform',
                        redirect: '/system/platform',
                        component: RouteView,
                        meta: { title: '基础平台', icon: 'form', permission: ['form'] },
                        children: [
                            {
                                path: '/appT2/system',
                                name: 'dataManager',
                                component: RouteView,
                                meta: { title: '数据管理', keepAlive: true, permission: ['form'] },
                                children: []
                            },
                            {
                                path: '/appT2/system/config',
                                name: 'SystemConfig',
                                component: RouteView,
                                meta: { title: '系统配置', keepAlive: true, permission: ['form'] },
                                children: [
                                    {
                                        path: '/appT2/system/menu',
                                        name: 'menuAdjust',
                                        meta: {
                                            title: '菜单管理',
                                            keepAlive: false,
                                            permission: ['form']
                                        }
                                    }
                                ]
                            },
                            {
                                path: '/appT2/system/permissionManager',
                                name: 'PermissionManager',
                                component: RouteView,
                                meta: { title: '权限管理', keepAlive: true, permission: ['form'] },
                                children: [
                                    {
                                        path: '/appT2/system/role',
                                        name: 'RoleIndex',
                                        meta: {
                                            title: '角色管理',
                                            keepAlive: false,
                                            permission: ['form']
                                        }
                                    },
                                    {
                                        path: '/appT2/system/role/assignResource',
                                        name: 'RoleAssignResource',
                                        hidden: true,
                                        meta: {
                                            title: '分配资源',
                                            keepAlive: false,
                                            permission: ['form'],
                                            parentPath: '/system/role',
                                            parentTitle: '角色管理'
                                        }
                                    },
                                    {
                                        path: '/appT2/system/role/dataScope',
                                        name: 'RoleDataScope',
                                        hidden: true,
                                        meta: {
                                            title: '数据权限',
                                            keepAlive: false,
                                            permission: ['form'],
                                            parentPath: '/system/role',
                                            parentTitle: '角色管理'
                                        }
                                    },
                                    {
                                        path: '/appT2/system/corp',
                                        name: 'CorpsManagement',
                                        meta: { title: '单位管理', keepAlive: false, permission: ['form'] }
                                    },
                                    {
                                        path: '/appT2/system/user',
                                        name: 'User',
                                        meta: { title: '用户管理', keepAlive: false, permission: ['form'] }
                                    }
                                ]
                            }
                        ]
                      }

                ]
                },
                {
                path: '/demos',
                component: RouteView,
                redirect: '/demos/demo1',
                name: 'Demo',
                meta: { title: 'DEMO', icon: bxAnaalyse, permission: ['dashboard'] },
                children: [
                    {
                        path: 'demo1',
                        name: 'demo1',
                        component: () => import('@/views/Demos/demo1'),
                        meta: {
                            title: 'DEMO1',
                            keepAlive: true
                        }
                    },
                    {
                        path: 'demo2',
                        name: 'demo2',
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
