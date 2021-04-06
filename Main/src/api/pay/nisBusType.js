import request from '@/utils/request'

// 新增业务种类
export function addNisBusType (data) {
    return request({
        url: '/pay/nisBusType',
        method: 'post',
        data: data
    })
}

// 删除业务种类
export function deleteNisBusType (ids) {
    return request({
        url: '/pay/nisBusType/delete',
        method: 'post',
        data: ids
    })
}

// 修改业务种类
export function updateNisBusType (data) {
    return request({
        url: '/pay/nisBusType/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchNisBusType (query) {
    return request({
        url: '/pay/nisBusType/conditions',
        method: 'post',
        data: query
    })
}

// 查询业务种类列表
export function listNisBusType (query) {
    return request({
        url: '/pay/nisBusType/list',
        method: 'post',
        params: query
    })
}

// 查询业务种类详细
export function getNisBusType (id) {
    return request({
        url: '/pay/nisBusType/' + id,
        method: 'get'
    })
}
