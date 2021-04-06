import request from '@/utils/request'

// 新增代发工资总
export function addWage (data) {
    return request({
        url: '/pay/wage',
        method: 'post',
        data: data
    })
}

// 删除代发工资总
export function deleteWage (ids) {
    return request({
        url: '/pay/wage/delete',
        method: 'post',
        data: ids
    })
}

// 批量提交代发工资总
export function batchSubmitWage (ids) {
    return request({
        url: '/pay/wage/batchSubmitWage',
        method: 'post',
        data: ids
    })
}

// 批量删除代发工资总
export function batchDeleteWage (ids, chargeBackType) {
    const formData = new FormData()
    formData.append('ids', ids)
    formData.append('chargeBackType', chargeBackType)
    return request({
        url: '/pay/wage/batchDeleteWage',
        method: 'post',
        data: formData
    })
}

// 修改代发工资总
export function updateWage (data) {
    return request({
        url: '/pay/wage/' + data.id,
        method: 'put',
        data: data
    })
}

export function loadChargeBackData () {
    return request({
        url: '/pay/payType/list',
        method: 'get'
    })
}

// 查询数据源列表
export function searchWage (query) {
    return request({
        url: '/pay/wage/conditions',
        method: 'post',
        data: query
    })
}

// 查询代发工资总列表
export function listWage (query) {
    return request({
        url: '/pay/wage/list',
        method: 'get',
        params: query
    })
}

// 查询代发工资总详细
export function getWage (id) {
    return request({
        url: '/pay/wage/' + id,
        method: 'get'
    })
}

// 查询数据源列表
export function searchWageQuery (query) {
    return request({
        url: '/pay/wage/searchWageQuery',
        method: 'post',
        data: query
    })
}
