import storage from 'store'
import { login, getInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { roleObj } from '@/constant/permissions'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: [],
        info: {},
        username: '',
        tenantId: ''
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_INFO: (state, info) => {
            state.info = info
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_TENANT_ID: (state, tenantId) => {
            state.tenantId = tenantId
        }
    },

    actions: {
        // 登录
        Login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    storage.set(ACCESS_TOKEN, response.access_token)
                    commit('SET_TOKEN', response.access_token)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo ({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    // const result = response.result
                    const result = {
                        role: roleObj
                    }
                    if (result.role && result.role.permissions.length > 0) {
                        const role = result.role
                        role.permissions = result.role.permissions
                        role.permissions.map(per => {
                            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                                const action = per.actionEntitySet.map(action => {
                                    return action.action
                                })
                                per.actionList = action
                            }
                        })
                        role.permissionList = role.permissions.map(permission => {
                            return permission.permissionId
                        })
                        commit('SET_ROLES', result.role)
                        commit('SET_INFO', result)
                    } else {
                        reject(new Error('getInfo: roles must be a non-null array !'))
                    }

                    commit('SET_NAME', { name: response.data.name, welcome: welcome() })
                    commit('SET_AVATAR', result.avatar)
                    commit('SET_USERNAME', response.data.username)
                    commit('SET_TENANT_ID', response.data.tenantId)
                    resolve({ result: result })
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        Logout ({ commit, state }) {
            return new Promise((resolve) => {
                // logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                storage.remove(ACCESS_TOKEN)
                resolve()
                // }).catch(() => {
                //   resolve()
                // }).finally(() => {
                // })
            })
        }

    }
}

export default user
