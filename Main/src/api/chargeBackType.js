import request from '@/utils/request'

// 新增退单类型
export function addChargeBackType (data) {
    return request({
        url: '/pay/chargeBackType',
        method: 'post',
        data: data
    })
}

// 删除退单类型
export function deleteChargeBackType (ids) {
    return request({
        url: '/pay/chargeBackType/delete',
        method: 'post',
        data: ids
    })
}

// 修改退单类型
export function updateChargeBackType (data) {
    return request({
        url: '/pay/chargeBackType/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchChargeBackType (query) {
    return request({
        url: '/pay/chargeBackType/conditions',
        method: 'post',
        data: query
    })
}

// 查询退单类型列表
export function listChargeBackType (query) {
    return request({
        url: '/pay/chargeBackType/list',
        method: 'get',
        params: query
    })
}

// 查询退单类型详细
export function getChargeBackType (id) {
    return request({
        url: '/pay/chargeBackType/' + id,
        method: 'get'
    })
}
