import request from '@/utils/request'

// 新增内部利率调整
export function addAdjust (data) {
    return request({
        url: '/account/instrateAdjust',
        method: 'post',
        data: data
    })
}

// 删除内部利率调整
export function deleteAdjust (ids) {
    return request({
        url: '/account/instrateAdjust/delete',
        method: 'post',
        data: ids
    })
}

// 修改内部利率调整
export function updateAdjust (data) {
    return request({
        url: '/account/instrateAdjust/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchAdjust (query) {
    return request({
        url: '/account/instrateAdjust/conditions',
        method: 'post',
        data: query
    })
}

// 查询内部利率调整列表
export function listAdjust (query) {
    return request({
        url: '/account/instrateAdjust/list',
        method: 'get',
        params: query
    })
}

// 查询内部利率调整详细
export function getAdjust (id) {
    return request({
        url: '/account/instrateAdjust/' + id,
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

// 查询内部利率调整table列表
export function dyncTable (query) {
    return request({
        url: '/account/instrateAdjust/dyncTable',
        method: 'post',
        data: query
    })
}

// 获取全部科目
export function getSubject (accType) {
    return request({
        url: '/account/acc/getSubject/all',
        method: 'get'
    })
}

// 查询调整时间
export function lastAdjust (query) {
    return request({
        url: '/account/instrateAdjust/lastAdjust',
        method: 'post',
        data: query
    })
}
