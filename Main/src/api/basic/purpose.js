import request from '@/utils/request'

// 新增用途管理
export function addPurpose (data) {
    return request({
        url: '/basic/purpose',
        method: 'post',
        data: data
    })
}

// 删除用途管理
export function deletePurpose (ids) {
    return request({
        url: '/basic/purpose/delete',
        method: 'post',
        data: ids
    })
}

// 修改用途管理
export function updatePurpose (data) {
    return request({
        url: '/basic/purpose/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchPurpose (query) {
    return request({
        url: '/basic/purpose/conditions',
        method: 'post',
        data: query
    })
}

// 查询用途管理列表
export function listPurpose (query) {
    return request({
        url: '/basic/purpose/list',
        method: 'get',
        params: query
    })
}

// 查询用途管理详细
export function getPurpose (id) {
    return request({
        url: '/basic/purpose/' + id,
        method: 'get'
    })
}
