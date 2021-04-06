import request from '@/utils/request'

// 新增账户性质
export function addNature (data) {
    return request({
        url: '/account/nature',
        method: 'post',
        data: data
    })
}

// 删除账户性质
export function deleteNature (ids) {
    return request({
        url: '/account/nature/delete',
        method: 'post',
        data: ids
    })
}

// 修改账户性质
export function updateNature (data) {
    return request({
        url: '/account/nature/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchNature (query) {
    return request({
        url: '/account/nature/conditions',
        method: 'post',
        data: query
    })
}

// 查询账户性质列表s
export function listNature (query) {
    return request({
        url: '/account/nature/list',
        method: 'get',
        params: query
    })
}

// 查询账户性质详细
export function getNature (id) {
    return request({
        url: '/account/nature/' + id,
        method: 'get'
    })
}
