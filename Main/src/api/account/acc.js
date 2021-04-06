import request from '@/utils/request'

// 新增内部账户信息
export function addAcc (data) {
    return request({
        url: '/account/acc',
        method: 'post',
        data: data
    })
}

// 删除内部账户信息
export function deleteAcc (ids) {
    return request({
        url: '/account/acc/delete',
        method: 'post',
        data: ids
    })
}

// 修改内部账户信息
export function updateAcc (data) {
    return request({
        url: '/account/acc/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchAcc (query) {
    return request({
        url: '/account/acc/conditions',
        method: 'post',
        data: query
    })
}

// 查询内部账户信息列表
export function listAcc (query) {
    return request({
        url: '/account/acc/list',
        method: 'get',
        params: query
    })
}

// 查询内部账户信息详细
export function getAcc (id) {
    return request({
        url: '/account/acc/' + id,
        method: 'get'
    })
}

// 币别
export function getCurName () {
    return request({
        url: '/basic/currency/currencyOutApi',
        method: 'get'
    })
}

// 获取科目
export function getSubject (accType) {
    return request({
        url: '/account/acc/getSubject/' + accType,
        method: 'get'
    })
}

// 查询顺序号的生成
export function createSequence (query) {
    return request({
        url: '/account/acc/createSequence',
        method: 'post',
        data: query
    })
}

// 根据币别，网点 [可空]获取有效的内部账户。
export function getAccountTableData (query) {
    return request({
        url: '/account/acc/getAccountTableData',
        method: 'post',
        data: query
    })
}

// 内部账号查询
export function searchInnerAccPageList (params) {
    return request({
        url: '/account/acc/searchInnerAccPageList',
        method: 'post',
        data: params
    })
}

// 查询可以注销的数据源列表
export function searchAccClean (query) {
    return request({
        url: '/account/accClean/conditions',
        method: 'post',
        data: query
    })
}

// 校验能否注销
export function cancellation (data) {
    return request({
        url: '/account/accClean/cancellation',
        method: 'post',
        data: data
    })
}

// 查询内部账户注销信息详细
export function getAccClean (id) {
    return request({
        url: '/account/accClean/' + id,
        method: 'get'
    })
}

// 注销内部账户信息
export function updateAccClean (data) {
    return request({
        url: '/account/accClean/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询可以注销的数据源列表
export function queryAccClean (query) {
    return request({
        url: '/account/accClean/conditionsQuery',
        method: 'post',
        data: query
    })
}
