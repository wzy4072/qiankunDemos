import request from '@/utils/request'

// 新增付款通知单
export function addNisBillhead (data) {
    return request({
        url: '/pay/nisBillhead/',
        method: 'post',
        data: data
    })
}

// 删除付款通知单
export function deleteNisBillhead (query) {
    return request({
        url: '/pay/nisBillhead/delete',
        method: 'post',
        data: query
    })
}

// 查询数据源列表
export function searchNisBillhead (query) {
    return request({
        url: '/pay/nisBillhead/conditions',
        method: 'post',
        data: query
    })
}

// 查看付款单信息
export function viewNisBillheadById (id) {
    return request({
        url: '/pay/nisBillhead/' + id,
        method: 'get'
    })
}

// 获取有效的退单类型
export function getValidChargeBackType () {
    return request({
        url: '/pay/chargeBackType/getValidChargeBackType',
        method: 'get'
    })
}

// 根据单位ID或者收付款标识获取有效的业务类别信息
export function getBusType (corpId, cdSign) {
    return request({
        url: '/pay/nisBusType/' + corpId + '/' + cdSign,
        method: 'get'
    })
}

// 根据单位id和用途类型查询用途信息
export function getPurpose (corpId, sysBusType) {
    return request({
        url: '/basic/purpose/' + corpId + '/' + sysBusType,
        method: 'get'
    })
}

// 重复付款校验
export function rePay (query) {
    return request({
        url: '/pay/nisBillhead/rePay',
        method: 'post',
        data: query
    })
}
