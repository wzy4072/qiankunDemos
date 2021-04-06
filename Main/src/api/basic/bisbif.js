import request from '@/utils/request'

// 新增接口代码
export function addBisbif (data) {
    return request({
        url: '/basic/bisbif',
        method: 'post',
        data: data
    })
}

// 删除接口代码
export function deleteBisbif (ids) {
    return request({
        url: '/basic/bisbif/delete',
        method: 'post',
        data: ids
    })
}

// 修改接口代码
export function updateBisbif (data) {
    return request({
        url: '/basic/bisbif/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBisbif (query) {
    return request({
        url: '/basic/bisbif/conditions',
        method: 'post',
        data: query
    })
}

// 查询接口代码列表
export function listBisbif (query) {
    return request({
        url: '/basic/bisbif/list',
        method: 'get',
        params: query
    })
}

// 查询接口代码详细
export function getBisbif (id) {
    return request({
        url: '/basic/bisbif/' + id,
        method: 'get'
    })
}

// 查询银行类别
export function listBankType () {
    return request({
        url: '/basic/bankType/list',
        method: 'get'
    })
}
