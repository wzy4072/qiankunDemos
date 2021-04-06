import request from '@/utils/request'

// 新增账户属性
export function addAttribute (data) {
    return request({
        url: '/account/attribute',
        method: 'post',
        data: data
    })
}

// 删除账户属性
export function deleteAttribute (ids) {
    return request({
        url: '/account/attribute/delete',
        method: 'post',
        data: ids
    })
}

// 修改账户属性
export function updateAttribute (data) {
    return request({
        url: '/account/attribute/data.id',
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchAttribute (query) {
    return request({
        url: '/account/attribute/conditions',
        method: 'post',
        data: query
    })
}

// 查询账户属性列表
export function listAttribute (query) {
    return request({
        url: '/account/attribute/list',
        method: 'get',
        params: query
    })
}

// 查询账户属性详细
export function getAttribute (id) {
    return request({
        url: '/account/attribute/' + id,
        method: 'get'
    })
}
