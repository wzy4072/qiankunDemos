import request from '@/utils/request'

// 新增账号限额
export function addAccLimitQuota (data) {
    return request({
        url: '/account/accLimitQuota',
        method: 'post',
        data: data
    })
}

// 删除账号限额
export function deleteAccLimitQuota (ids) {
    return request({
        url: '/account/accLimitQuota/delete',
        method: 'post',
        data: ids
    })
}

// 修改账号限额
export function updateAccLimitQuota (data) {
    return request({
        url: '/account/accLimitQuota/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchAccLimitQuota (query) {
    return request({
        url: '/account/accLimitQuota/conditions',
        method: 'post',
        data: query
    })
}

// 查询线上账号
export function searchAcc (query) {
    return request({
        url: '/account/accLimitQuota/searchAcc',
        method: 'post',
        data: query
    })
}

// 查询账号限额列表
export function listAccLimitQuota (query) {
    return request({
        url: '/account/accLimitQuota/list',
        method: 'get',
        params: query
    })
}

// 查询账号限额详细
export function getAccLimitQuota (data) {
    return request({
        url: '/account/accLimitQuota/getAccLimit',
        method: 'post',
        data
    })
}

// 查询数据源列表
export function getAccLimitQuotaList(query) {
    return request({
        url: '/account/accLimitQuota/getAccLimitQuotaList',
        method: 'post',
        data: query
    })
}

// 查询未设置限额数据源列表
export function getAccLimitByAndCurId(query) {
    return request({
        url: '/account/accLimitQuota/getAccLimitByAndCurId',
        method: 'post',
        data: query
    })
}
