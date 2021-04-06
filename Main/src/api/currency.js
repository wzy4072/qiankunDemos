import request from '@/utils/request'

// 新增币别
export function addCurrency(data) {
    return request({
        url: '/basic/currency',
        method: 'post',
        data: data
    })
}

// 删除币别
export function deleteCurrency(ids) {
    return request({
        url: '/basic/currency/delete',
        method: 'post',
        data: ids
    })
}

// 修改币别
export function updateCurrency(data) {
    return request({
        url: '/basic/currency/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchCurrency(query) {
    return request({
        url: '/basic/currency/conditions',
        method: 'post',
        data: query
    })
}

// 查询币别列表
export function listCurrency(query) {
    return request({
        url: '/basic/currency/list',
        method: 'get',
        params: query
    })
}

// 查询币别详细
export function getCurrency(id) {
    return request({
        url: '/basic/currency/' + id,
        method: 'get'
    })
}
