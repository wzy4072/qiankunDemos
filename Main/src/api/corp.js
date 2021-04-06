import request from '@/utils/request'

/**
 * 新增单位
 * @param data
 * @returns {AxiosPromise}
 */
export function addCorp (data) {
    return request({
        url: '/system/corp',
        method: 'post',
        data: data
    })
}

/**
 * 删除单位
 * @param ids 单位id数组
 * @returns {AxiosPromise}
 */
export function deleteCorp (ids) {
    return request({
        url: '/system/corp/delete',
        method: 'post',
        data: ids
    })
}

/**
 * 修改单位
 * @param data
 * @returns {AxiosPromise}
 */
export function updateCorp (data) {
    return request({
        url: '/system/corp/' + data.id,
        method: 'put',
        data: data
    })
}

/**
 * 获取单位树
 * @returns {AxiosPromise}
 */
export function getCorpTree () {
    return request({
        url: '/system/corp/tree',
        method: 'get'
    })
}

/**
 * 获取单位树
 * @returns {AxiosPromise}
 */
export function search (data) {
    return request({
        url: '/system/corp/conditions',
        method: 'POST',
        data
    })
}

/**
 * 修改单位
 * @param id
 * @returns {AxiosPromise}
 */
export function getCorp (id) {
    return request({
        url: '/system/corp/' + id,
        method: 'get'
    })
}

/**
 * 获取单位树
 * @returns {AxiosPromise}
 */
export function getTopCorp () {
    return request({
        url: '/system/corp/getTopCorp',
        method: 'get'
    })
}

/**
 * 获取单位树
 * @returns {AxiosPromise}
 */
export function queryByParentId (parentId) {
    return request({
        url: '/system/corp/parent/' + parentId,
        method: 'get'
    })
}
