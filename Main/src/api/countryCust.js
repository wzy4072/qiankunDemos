import request from '@/utils/request'

// 新增自定义国家
export function addCountryCust (data) {
    return request({
        url: '/basic/countryCust',
        method: 'post',
        data: data
    })
}

// 删除自定义国家
export function deleteCountryCust (ids) {
    return request({
        url: '/basic/countryCust/delete',
        method: 'post',
        data: ids
    })
}

// 修改自定义国家
export function updateCountryCust (data) {
    return request({
        url: '/basic/countryCust/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchCountryCust (query) {
    return request({
        url: '/basic/countryCust/conditions',
        method: 'post',
        data: query
    })
}

// 查询自定义国家列表
export function listCountryCust (query) {
    return request({
        url: '/basic/countryCust/list',
        method: 'get',
        params: query
    })
}

// 查询自定义国家详细
export function getCountryCust (id) {
    return request({
        url: '/basic/countryCust/' + id,
        method: 'get'
    })
}

// 查询币种
export function getTapByStripeid () {
    return request({
        url: '/basic/countryCust/curId',
        method: 'post'
    })
}

// 查询时区
export function getTimePlace () {
    return request({
        url: '/basic/countryCust/getTime',
        method: 'post'
    })
}

// 查询国家集合
export function getNameZhs (countryId) {
    return request({
        url: '/basic/countryCust/getCountryNames',
        method: 'post',
        data: countryId
    })
}
