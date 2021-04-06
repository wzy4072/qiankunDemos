import request from '@/utils/request'

/**
 * 删除附件
 * @param ids
 * @returns {AxiosPromise}
 */
export function deleteAttachment (ids) {
    return request({
        url: '/basic/attachment/delete',
        method: 'post',
        data: ids
    })
}

/**
 * 下载附件
 * @param data
 * @returns {AxiosPromise}
 */
export function downloadAttachment (id) {
    return request({
        url: '/basic/attachment/download/' + id,
        method: 'get',
        responseType: 'blob'
    })
}

/**
 * 查询附件
 * @param data
 * @returns {AxiosPromise}
 */
export function searchAttachment (data) {
    return request({
        url: '/basic/attachment/conditions',
        method: 'post',
        data
    })
}
