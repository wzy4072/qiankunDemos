import request from '@/utils/request'

// 新增单位限额
export function addCorpLimitQuota (data) {
    return request({
        url: '/account/corpLimitQuota',
        method: 'post',
        data: data
    })
}

// 删除单位限额
export function deleteCorpLimitQuota (ids) {
    return request({
        url: '/account/corpLimitQuota/delete',
        method: 'post',
        data: ids
    })
}

// 修改单位限额
export function updateCorpLimitQuota (data) {
    return request({
        url: '/account/corpLimitQuota/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchCorpLimitQuota (query) {
    return request({
        url: '/account/corpLimitQuota/conditions',
        method: 'post',
        data: query
    })
}

// 查询单位限额列表
export function listCorpLimitQuota (query) {
    return request({
        url: '/account/corpLimitQuota/list',
        method: 'get',
        params: query
    })
}

// 查询单位限额详细
export function getCorpLimitQuota (id) {
    return request({
        url: '/account/corpLimitQuota/' + id,
        method: 'get'
    })
}

// 查询单位限额详细
export function getCorpLimit (data) {
    return request({
        url: '/account/corpLimitQuota/getCorpLimit',
        method: 'post',
        data
    })
}
