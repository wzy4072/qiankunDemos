import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
// import { getPermissions } from '@/api/login'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
    if (route.meta && route.meta.permission) {
        let flag = false
        for (let i = 0, len = permission.length; i < len; i++) {
            flag = route.meta.permission.includes(permission[i])
            if (flag) {
                return true
            }
        }
        return false
    }
    return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(roles.id)
    } else {
        return true
    }
}

function filterAsyncRouter (routerMap, roles) {
    const accessedRouters = routerMap.filter(route => {
        if (hasPermission(roles.permissionList, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}
// 根据路由的name值与key进行匹配，判断是否有权限访问
function hasPermissionByKey (roles, route) {
    let hasPermission = false
    for (let i = 0; i < roles.length; i++) {
        if (route.name && roles[i] === route.name) {
            hasPermission = true
        }
    }
    return hasPermission
}
// 通过key值去过滤路由
function filterAsyncRouterByKey (routerMap, roles) {
    const accessedRouters = routerMap.filter(route => {
        if (hasPermissionByKey(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouterByKey(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}
// 获取用户角色的信息
function getUserRoles (roles, rolesArr) {
    let resourcesArr = []
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].id) {
            rolesArr.push(roles[i].id)
        }
        if (roles[i].resources) {
            resourcesArr = resourcesArr.concat(roles[i].resources)
        }
        if (roles[i] && Array.isArray(roles[i].children) && roles[i].children.length > 0) {
            resourcesArr = resourcesArr.concat(getUserRoles(roles[i].children, rolesArr))
        }
    }
    return resourcesArr
}

const permission = {
    state: {
        routers: constantRouterMap,
        menusPermission: [], // 菜单权限
        resources: [], // 资源
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        },
        SET_MENUSPERMISSION: (state, permission) => {
            state.menusPermission = permission
        },
        SET_RESOURCES: (state, resources) => {
            state.resources = resources
        }
    },
    actions: {
        GenerateRoutes ({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data
                // 获取权限
                // getPermissions().then(res => {
                //     let permissionArr = ['index'];
                //     if (res.data && res.data.menus) {
                //         let resourcesArr = getUserRoles(res.data.menus, permissionArr);
                //         const accessedRouters = filterAsyncRouterByKey(asyncRouterMap, permissionArr)
                //         commit('SET_ROUTERS', accessedRouters);
                //         commit('SET_MENUSPERMISSION', permissionArr);
                //         commit('SET_RESOURCES', resourcesArr);
                //         resolve()
                //
                //     }
                // })
                const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }

    }
}

export default permission
