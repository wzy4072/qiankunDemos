import request from '@/utils/request'

// 新增银行账号
export function addBankAccHandle (data) {
    return request({
        url: '/account/bankAccHandle',
        method: 'post',
        data: data
    })
}

// 删除银行账号
export function deleteBankAccHandle (ids) {
    return request({
        url: '/account/bankAccHandle/delete',
        method: 'post',
        data: ids
    })
}

// 修改银行账号
export function updateBankAccHandle (data) {
    return request({
        url: '/account/bankAccHandle/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBankAccHandle (query) {
    return request({
        url: '/account/bankAccHandle/conditions',
        method: 'post',
        data: query
    })
}

// 查询银行账号列表
export function listBankAccHandle (query) {
    return request({
        url: '/account/bankAccHandle/list',
        method: 'get',
        params: query
    })
}

// 查询银行账号详细
export function getBankAccHandle (id) {
    return request({
        url: '/account/bankAccHandle/' + id,
        method: 'get'
    })
}
