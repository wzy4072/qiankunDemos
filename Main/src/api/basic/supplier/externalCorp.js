import request from '@/utils/request'

// 新增客商
export function addExternalCorp (data) {
    return request({
        url: '/basic/externalCorp',
        method: 'post',
        data: data
    })
}

// 删除客商
export function deleteExternalCorp (ids) {
    return request({
        url: '/basic/externalCorp/delete',
        method: 'post',
        data: ids
    })
}

// 批量客商
export function batchSubmit (ids) {
    return request({
        url: '/basic/externalCorp/batchSubmit',
        method: 'post',
        data: ids
    })
}

// 修改客商
export function updateExternalCorp (data) {
    return request({
        url: '/basic/externalCorp/' + data.id,
        method: 'put',
        data: data
    })
}

// 批量客商
export function audit (data) {
    return request({
        url: '/basic/externalCorp/audit',
        method: 'post',
        data: data
    })
}

// 查询数据源列表
export function searchExternalCorp (query) {
    return request({
        url: '/basic/externalCorp/conditions',
        method: 'post',
        data: query
    })
}

// 查询待审核列表
export function auditConditions (query) {
    return request({
        url: '/basic/externalCorp/auditConditions',
        method: 'post',
        data: query
    })
}

// 查询客商列表
export function listExternalCorp (query) {
    return request({
        url: '/basic/externalCorp/list',
        method: 'get',
        params: query
    })
}

// 查询客商详细
export function getExternalCorp (id) {
    return request({
        url: '/basic/externalCorp/' + id,
        method: 'get'
    })
}

// 查询数据源列表
export function searchExternalCorpInfo (query) {
    return request({
        url: '/basic/basic/externalCorpBankacc/select',
        method: 'post',
        data: query
    })
}
