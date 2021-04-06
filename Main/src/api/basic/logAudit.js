import request from '@/utils/request'

/**
 * 查询
 * @param data
 * @returns {AxiosPromise}
 */
export function searchLog (data) {
    return request({
        url: '/basic/logAudit/conditions',
        method: 'post',
        data
    })
}
