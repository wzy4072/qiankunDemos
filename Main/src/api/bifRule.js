import request from '@/utils/request'

// 新增接口代码业务规则
export function addBisBifRule (data) {
    return request({
        url: '/basic/bifRule',
        method: 'post',
        data: data
    })
}

// 删除接口代码业务规则
export function deleteBisBifRule (ids) {
    return request({
        url: '/basic/bifRule/delete',
        method: 'post',
        data: ids
    })
}

// 修改接口代码业务规则
export function updateBisBifRule (data) {
    return request({
        url: '/basic/bifRule/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBisBifRule (query) {
    return request({
        url: '/basic/bifRule/conditions',
        method: 'post',
        data: query
    })
}

// 查询接口代码业务规则列表
export function listBisBifRule (query) {
    return request({
        url: '/basic/bifRule/list',
        method: 'get',
        params: query
    })
}

// 查询接口代码业务规则详细
export function getBisBifRule (id) {
    return request({
        url: '/basic/bifRule/' + id,
        method: 'get'
    })
}

// 查询接口代码列表
export function loadBifInitData () {
    return request({
        url: '/basic/bisbif/list',
        method: 'get'
    })
}
