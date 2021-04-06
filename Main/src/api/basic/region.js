import request from '@/utils/request'

/**
 * 新增区域
 * @param data
 * @returns {AxiosPromise}
 */
export function addRegion (data) {
    return request({
        url: '/basic/region',
        method: 'post',
        data: data
    })
}

/**
 * 删除区域
 * @param ids
 * @returns {AxiosPromise}
 */
export function deleteRegion (ids) {
    return request({
        url: '/basic/region/delete',
        method: 'post',
        data: ids
    })
}

/**
 * 修改区域
 * @param data
 * @returns {AxiosPromise}
 */
export function updateRegion (data) {
    return request({
        url: '/basic/region/' + data.id,
        method: 'put',
        data: data
    })
}

/**
 * 查询区域
 * @param data
 * @returns {AxiosPromise}
 */
export function searchRegion (data) {
    return request({
        url: '/basic/region/list?id=' + data.id,
        method: 'post'
    })
}

/**
 * 根据id获取区域
 * @param data
 * @returns {AxiosPromise}
 */
export function getRegion (id) {
    return request({
        url: '/basic/region/' + id,
        method: 'get'
    })
}
