import request from '@/utils/request'

// 新增币别汇率
export function addAdjust (data) {
    return request({
        url: '/basic/adjust',
        method: 'post',
        data: data
    })
}

// 批量提交
export function batchCommit (data) {
    return request({
        url: '/basic/adjust/batchCommit',
        method: 'post',
        data: data
    })
}

// 删除币别汇率
export function deleteAdjust (ids) {
    return request({
        url: '/basic/adjust/delete',
        method: 'post',
        data: ids
    })
}

// 修改币别汇率
export function updateAdjust (data) {
    return request({
        url: '/basic/adjust/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchAdjust (query) {
    return request({
        url: '/basic/adjust/conditions',
        method: 'post',
        data: query
    })
}

// 查询数据源列表 复核
export function searchAdjustCheck (query) {
    return request({
        url: '/basic/adjust/conditionsCheck',
        method: 'post',
        data: query
    })
}

// 查询币别汇率列表
export function listAdjust (query) {
    return request({
        url: '/basic/adjust/list',
        method: 'get',
        params: query
    })
}

// 查询币别汇率详细
export function getAdjust (id) {
    return request({
        url: '/basic/adjust/' + id,
        method: 'get'
    })
}

// 查询汇率类型
export function listRateType () {
    return request({
        url: '/basic/adjust/listRateType',
        method: 'get'
    })
}

// 查询币种类型
export function listCruId () {
    return request({
        url: '/basic/adjust/listCruId',
        method: 'get'
    })
}

// 计算原汇率
export function getOldRate (data) {
    return request({
        url: '/basic/adjust/getOldRate',
        method: 'post',
        data: data
    })
}

// 复核
export function checkAdjust (ids) {
    return request({
        url: '/basic/adjust/checkAdjust',
        method: 'post',
        data: ids
    })
}

// 打回
export function checkAdjustBack (ids) {
    return request({
        url: '/basic/adjust/checkAdjustBack',
        method: 'post',
        data: ids
    })
}
