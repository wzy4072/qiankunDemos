import request from '@/utils/request'

/**
 * 保存配置
 * @param data
 * @returns {AxiosPromise}
 */
export function saveConfig (params) {
    return request({
        url: '/basic/config',
        method: 'post',
        data: params
    })
}

/**
 * 查询区域
 * @returns {AxiosPromise}
 */
export function searchConfig (service, type) {
    return request({
        url: '/basic/config/' + service + '/' + type,
        method: 'get'
    })
}

/**
 * 查询配置
 * @returns {AxiosPromise}
 */
export function searchConfigValue (service, type, name) {
    return request({
        url: '/basic/config/' + service + '/' + type + '/' + name,
        method: 'get'
    })
}
