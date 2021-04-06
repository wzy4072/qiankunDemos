import request from '@/utils/request'
import qs from 'qs'

const userApi = {
    LoginToken: '/auth/oauth/loginToken',
    Login: '/auth/oauth/token',
    Logout: '/auth/logout',
    ForgePassword: '/auth/forge-password',
    Register: '/auth/register',
    twoStepCode: '/auth/2step-code',
    SendSms: '/account/sms',
    SendSmsErr: '/account/sms_err',
    // get my info
    // UserInfo: '/user/info',
    UserInfo: '/system/user',
    UserMenu: '/user/nav',
    permission: '/app/conditions'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (data) {
    const form = {
        username: data.username,
        password: data.password,
        pubKey: data.pubKey,
        grant_type: 'password',
        scope: 'read'
    }
    return request({
        url: userApi.Login,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-client-bytter-tenant': data.tenant,
            'Authorization': 'Basic dGVzdF9jbGllbnQ6dGVzdF9zZWNyZXQ='
        },
        method: 'post',
        data: qs.stringify(form)
    })
}

export function getLoginToken (parameter) {
    return request({
        url: userApi.LoginToken,
        method: 'get'
    })
}

export function getSmsCaptcha (parameter) {
    return request({
        url: userApi.SendSms,
        method: 'post',
        data: parameter
    })
}

export function getInfo () {
    return request({
        url: userApi.UserInfo,
        method: 'get'
    })
}

export function getCurrentUserNav () {
    return request({
        url: userApi.UserMenu,
        method: 'get'
    })
}

export function logout () {
    return request({
        url: userApi.Logout,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
    return request({
        url: userApi.twoStepCode,
        method: 'post',
        data: parameter
    })
}

/**
 * 获取权限
 * @param parameter {*}
 */
export function getPermissions () {
    return request({
        url: userApi.permission,
        method: 'get'
    })
}
