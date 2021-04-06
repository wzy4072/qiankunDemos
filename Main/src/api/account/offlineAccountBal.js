import request from '@/utils/request'

// 查询离线银行账号余额列表
export function listOfflineAccBal (query) {
    return request({
        url: '/account/bal/listOfflineAccBal',
        method: 'post',
        data: query
    })
}

export function updateAccCloseDate (data) {
    return request({
        url: '/account/bal/updateAccCloseDate',
        method: 'post',
        data: data
    })
}
/*
// 新增银行账号余额
export function addBal (data) {
    return request({
        url: '/account/bal',
        method: 'post',
        data: data
    })
}

// 删除银行账号余额
export function deleteBal (ids) {
    return request({
        url: '/account/bal/delete',
        method: 'post',
        data: ids
    })
}

// 修改银行账号余额
export function updateBal (data) {
    return request({
        url: '/account/bal/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBal (query) {
    return request({
        url: '/account/bal/conditions',
        method: 'post',
        data: query
    })
}

// 查询银行账号余额详细
export function getBal (id) {
    return request({
        url: '/account/bal/' + id,
        method: 'get'
    })
} */
