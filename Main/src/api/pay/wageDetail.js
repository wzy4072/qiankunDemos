import request from '@/utils/request'

// 新增代发工资明细
export function addWageDetail (data) {
    return request({
        url: '/pay/wageDetail',
        method: 'post',
        data: data
    })
}

// 删除代发工资明细
export function deleteWageDetail (ids) {
    return request({
        url: '/pay/wageDetail/delete',
        method: 'post',
        data: ids
    })
}

// 修改代发工资明细
export function updateWageDetail (data) {
    return request({
        url: '/pay/wageDetail/' + data.id,
        method: 'put',
        data: data
    })
}

// 查询数据源列表
export function searchWageDetail (query) {
    return request({
        url: '/pay/wageDetail/conditions',
        method: 'post',
        data: query
    })
}

// 查询代发工资明细列表
export function listWageDetail (query) {
    return request({
        url: '/pay/wageDetail/list',
        method: 'get',
        params: query
    })
}

// 查询代发工资明细详细
export function getWageDetail (id) {
    return request({
        url: '/pay/wageDetail/' + id,
        method: 'get'
    })
}
