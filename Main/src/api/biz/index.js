import request from '@/utils/request'

/**
 * 获取省市
 * @returns {AxiosPromise}
 */
export function getRegion (id) {
    return request({
        url: '/sys/region',
        method: 'get'
    })
}
