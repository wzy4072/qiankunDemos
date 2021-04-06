import request from '@/utils/request'

// 新增自定义付款方式
export function addType (data) {
    return request({
        url: '/pay/voucherType',
        method: 'post',
        data: data
    })
}

// 删除自定义付款方式
export function deleteType (ids) {
    return request({
        url: '/pay/voucherType/delete',
        method: 'post',
        data: ids
    })
}

// 修改自定义付款方式
export function updateType (data) {
    return request({
        url: '/pay/voucherType/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchType (query) {
    return request({
        url: '/pay/voucherType/conditions',
        method: 'post',
        data: query
    })
}

// 查询自定义付款方式详细
export function getType (id) {
    return request({
        url: '/pay/voucherType/' + id,
        method: 'get'
    })
}

// 查询系统结算方式列表
export function loadSysVoucherCodeData () {
    return request({
        url: '/pay/payType/list',
        method: 'get'
    })
}
