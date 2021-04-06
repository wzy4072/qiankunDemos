import request from '@/utils/request'

// 新增单位付款方式分配
export function addAssignPayWayCorp (data) {
    return request({
        url: '/pay/assignPayWay',
        method: 'post',
        data: data
    })
}

// 新增用户付款方式分配
export function addAssignPayWayUser (data) {
    return request({
        url: '/pay/assignPayWayUser',
        method: 'post',
        data: data
    })
}

// 查询付款方式分配列表
export function listAssignPayWay (query) {
    return request({
        url: '/pay/assignPayWay/list',
        method: 'post',
        data: query
    })
}

// 根据单位查询已分配付款方式
export function getAssignPayWayCorp (corpId) {
    return request({
        url: '/pay/assignPayWay/corpId/' + corpId,
        method: 'get'
    })
}

// 根据用戶查询已分配付款方式
export function getAssignPayWayUser (userId) {
    return request({
        url: '/pay/assignPayWay/userId/' + userId,
        method: 'get'
    })
}

// 查询所有有效供付款方式分配的付款方式
export function getVouCodeForAssign (query) {
    return request({
        url: '/pay/voucherType/getVouCodeForAssign',
        method: 'get'
    })
}

// 查询所有有效供付款方式分配的付款方式
export function getUserList () {
    return request({
        url: '/system/user/listUser',
        method: 'get'
    })
}

// 查询系统配置
export function searchConfig (service, type) {
    return request({
        url: '/basic/config/' + service + '/' + type,
        method: 'get'
    })
}
