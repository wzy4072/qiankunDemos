import request from '@/utils/request'

// 修改账户授权实体类
export function updateAccountGrant (data) {
    return request({
        url: '/account/AccountGrant/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchAccountGrant (query) {
    return request({
        url: '/account/accountGrant/searchBankAcc',
        method: 'post',
        data: query
    })
}

// 已有权限回显
export function checkList (params) {
    return request({
        url: 'account/accountGrant/listAssigned',
        method: 'post',
        data: params
    })
}

// 批量授权
export function batchAddGrant (params) {
    return request({
        url: 'account/accountGrant/batchAddGrant',
        method: 'post',
        data: params
    })
}
