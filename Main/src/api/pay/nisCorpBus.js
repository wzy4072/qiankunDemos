import request from '@/utils/request'

// 新增单位业务类别对照
export function addNisCorpBus (data) {
    return request({
        url: '/pay/nisCorpBus',
        method: 'post',
        data: data
    })
}

// 删除单位业务类别对照
export function deleteNisCorpBus (ids) {
    return request({
        url: '/pay/nisCorpBus/delete',
        method: 'post',
        data: ids
    })
}

// 修改单位业务类别对照
export function updateNisCorpBus (data) {
    return request({
        url: '/pay/nisCorpBus/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchNisCorpBus (query) {
    return request({
        url: '/pay/nisCorpBus/conditions',
        method: 'post',
        data: query
    })
}

// 查询单位业务类别对照列表
export function listNisCorpBus (query) {
    return request({
        url: '/pay/nisCorpBus/list',
        method: 'get',
        params: query
    })
}

// 查询业务种类列表
export function searchNisBusType (query) {
    return request({
        url: '/pay/nisCorpBus/searchNisBusType',
        method: 'post',
        data: query
    })
}

// 查询单位业务类别对照详细
export function getNisCorpBus (id) {
    return request({
        url: '/pay/nisCorpBus/' + id,
        method: 'get'
    })
}

// 根据单位查询已分配付款方式
export function getBusTypeByCorp (corpId) {
    return request({
        url: '/pay/nisCorpBus/corpId/' + corpId,
        method: 'get'
    })
}
