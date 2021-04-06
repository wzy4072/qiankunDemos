import request from '@/utils/request'

// 新增银行账号
export function addBankAcc (data) {
    return request({
        url: 'account/bankAcc',
        method: 'post',
        data: data
    })
}

// 删除银行账号
export function deleteBankAcc (ids) {
    return request({
        url: 'account/bankAcc/delete',
        method: 'post',
        data: ids
    })
}

// 修改银行账号
export function updateBankAcc (data) {
    return request({
        url: 'account/bankAcc/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBankAcc (query) {
    return request({
        url: 'account/bankAcc/conditions',
        method: 'post',
        data: query
    })
}

// 查询银行账号列表
export function listBankAcc (query) {
    return request({
        url: 'account/bankAcc/list',
        method: 'get',
        params: query
    })
}

// 查询银行账号详细
export function getBankAcc (id) {
    return request({
        url: 'account/bankAcc/' + id,
        method: 'get'
    })
}

// 账号授权银行账号集合 DaiQ
export function getBankAccPage (query) {
    return request({
        url: 'account/bankAcc/getBankAccPage',
        method: 'post',
        data: query
    })
}
