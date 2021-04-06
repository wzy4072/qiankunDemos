import request from '@/utils/request'

// 新增银行账号申请记录
export function addApp (data) {
    return request({
        url: '/account/app',
        method: 'post',
        data: data
    })
}

// 删除银行账号申请记录
export function deleteApp (ids) {
    return request({
        url: '/account/app/delete',
        method: 'post',
        data: ids
    })
}

// 修改银行账号申请记录
export function updateApp (data) {
    return request({
        url: '/account/app/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchApp (query) {
    return request({
        url: '/account/app/conditions',
        method: 'post',
        data: query
    })
}

// 查询银行账号申请记录列表
export function listApp (query) {
    return request({
        url: '/account/app/list',
        method: 'get',
        params: query
    })
}

// 查询银行账号申请记录详细
export function getApp (id) {
    return request({
        url: '/account/app/' + id,
        method: 'get'
    })
}

// 查询银行账号申请记录列表
export function getBankTypeData (vlaue) {
    return request({
        url: '/account/app/getBankTypeData',
        method: 'post',
        data: vlaue
    })
}

// 币别集合
export function getCurName () {
    return request({
        url: '/basic/currency/currencyOutApi',
        method: 'get'
    })
}

// 查询账户属性集合
export function getAttrs () {
    return request({
        url: '/account/attribute/list',
        method: 'get'
    })
}

// 查询账户性质集合
export function getNatureNames (query) {
    return request({
        url: '/account/nature/list',
        method: 'get'
    })
}
