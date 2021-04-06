import request from '@/utils/request'

// 新增汇率类型
export function addType (data) {
    return request({
        url: '/basic/btratetype',
        method: 'post',
        data: data
    })
}

// 删除汇率类型
export function deleteType (ids) {
    return request({
        url: '/basic/btratetype/delete',
        method: 'post',
        data: ids
    })
}

// 修改汇率类型
export function updateType (data) {
    return request({
        url: '/basic/btratetype/data.id',
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchType (query) {
    return request({
        url: '/basic/btratetype/conditions',
        method: 'post',
        data: query
    })
}

// 查询汇率类型列表
export function listType (query) {
    return request({
        url: '/basic/btratetype/list',
        method: 'get',
        params: query
    })
}

// 查询汇率类型详细
export function getType (id) {
    return request({
        url: '/basic/btratetype/' + id,
        method: 'get'
    })
}
