import request from '@/utils/request'

// 新增系统结算方式
export function addType (data) {
    return request({
        url: '/pay/payType',
        method: 'post',
        data: data
    })
}

// 删除系统结算方式
export function deleteType (ids) {
    return request({
        url: '/pay/payType',
        method: 'post',
        data: ids
    })
}

// 修改系统结算方式
export function updateType (data) {
    return request({
        url: '/pay/payType/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchType (query) {
    return request({
        url: '/pay/payType/conditions',
        method: 'post',
        data: query
    })
}

// 查询系统结算方式列表
export function listType (query) {
    return request({
        url: '/pay/payType/list',
        method: 'get',
        params: query
    })
}

// 查询系统结算方式详细
export function getType (id) {
    return request({
        url: '/pay/payType/' + id,
        method: 'get'
    })
}
