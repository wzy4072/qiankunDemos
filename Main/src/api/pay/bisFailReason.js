import request from '@/utils/request'

// 新增交易失败原因
export function addBisFailReason (data) {
    return request({
        url: '/pay/bisFailReason',
        method: 'post',
        data: data
    })
}

// 删除交易失败原因
export function deleteBisFailReason (ids) {
    return request({
        url: '/pay/bisFailReason/delete',
        method: 'post',
        data: ids
    })
}

// 修改交易失败原因
export function updateBisFailReason (data) {
    return request({
        url: '/pay/bisFailReason/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchBisFailReason (query) {
    return request({
        url: '/pay/bisFailReason/conditions',
        method: 'post',
        data: query
    })
}

// 查询交易失败原因列表
export function listBisFailReason (query) {
    return request({
        url: '/pay/bisFailReason/list',
        method: 'get',
        params: query
    })
}

// 查询交易失败原因详细
export function getBisFailReason (id) {
    return request({
        url: '/pay/bisFailReason/' + id,
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
